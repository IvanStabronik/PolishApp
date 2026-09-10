/**
 * Persist learning attempts → answers → evidence → scoped mastery (ADR-006).
 * Atomic transaction + idempotency key. Never marks content PUBLISHED.
 */

import { and, desc, eq } from "drizzle-orm";
import { getDb, type Db } from "@/db/client";
import {
  attemptAnswers,
  attempts,
  conceptMastery,
  contentUnits,
  contentVersions,
  evidenceRecords,
  exercises,
  learnerProfiles,
  modules,
  reviewSchedule,
} from "@/db/schema";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";
import type { ModuleExercise } from "@/lib/content/types";
import { peekModuleById } from "@/lib/content/load-module";
import type { EvalResult } from "@/modules/assessment/evaluate";
import {
  assertNoContentPublish,
  masteryScopeForMode,
  shouldWriteMastery,
  type AttemptMode,
  type MasteryScope,
} from "./attempt-mode";
import {
  recomputeMastery,
  type EvidenceRecord as MasteryEvidence,
  type MasteryStateName,
} from "@/modules/progress/mastery";
import { nextReviewDueAt } from "./review-queue";

export type PersistAttemptInput = {
  userId: string;
  moduleId: string;
  lessonId?: string | null;
  learningSessionId?: string | null;
  exerciseCanonicalId: string | null;
  exerciseUuid: string | null;
  contentVersionId: string | null;
  answer: AttemptAnswer;
  evaluation: EvalResult;
  mode: AttemptMode;
  exerciseType: ModuleExercise["type"];
  hinted?: boolean;
  idempotencyKey?: string | null;
};

export type PersistAttemptResult = {
  persisted: boolean;
  attemptId: string | null;
  masteryWritten: boolean;
  masteryState: MasteryStateName | null;
  masteryScope: MasteryScope | null;
  reviewDueAt: string | null;
  /** True when the same Idempotency-Key was replayed. */
  replayed?: boolean;
  /** @deprecated alias of replayed */
  idempotentReplay?: boolean;
  reason?: string;
  evaluation?: EvalResult;
  mode?: AttemptMode;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function getOrCreateLearnerProfile(
  db: Db,
  userId: string,
): Promise<{ id: string }> {
  const existing = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, userId),
    columns: { id: true },
  });
  if (existing) return existing;

  const [inserted] = await db
    .insert(learnerProfiles)
    .values({
      userId,
      l1: "ukr",
      uiLocale: "ru",
      ageConfirmed18: false,
      consents: { ageConfirmed18: false },
    })
    .returning({ id: learnerProfiles.id });
  return inserted!;
}

export async function resolveExerciseRow(
  db: Db,
  exerciseId: string,
): Promise<{
  id: string;
  canonicalId: string;
  contentVersionId: string | null;
} | null> {
  if (UUID_RE.test(exerciseId)) {
    const byId = await db.query.exercises.findFirst({
      where: eq(exercises.id, exerciseId),
      columns: {
        id: true,
        canonicalId: true,
        contentVersionId: true,
      },
    });
    if (byId) return byId;
  }

  const byCanonical = await db.query.exercises.findFirst({
    where: eq(exercises.canonicalId, exerciseId),
    columns: {
      id: true,
      canonicalId: true,
      contentVersionId: true,
    },
  });
  return byCanonical ?? null;
}

export async function resolveModuleContentVersionId(
  db: Db,
  moduleId: string,
): Promise<string | null> {
  const peeked = peekModuleById(moduleId);
  const candidates = [
    moduleId,
    peeked?.canonicalId,
    peeked?.id,
    moduleId === "mod-pierwsze-spotkanie" || moduleId === "pierwsze-spotkanie"
      ? "MOD-A1-PIERWSZE-SPOTKANIE"
      : null,
  ].filter(Boolean) as string[];

  for (const key of candidates) {
    const row = await db.query.modules.findFirst({
      where: eq(modules.canonicalId, key),
      columns: {
        contentVersionId: true,
        publishedVersionId: true,
      },
    });
    if (row?.contentVersionId) return row.contentVersionId;
    if (row?.publishedVersionId) return row.publishedVersionId;

    const bySlug = await db.query.modules.findFirst({
      where: eq(modules.slug, key),
      columns: {
        contentVersionId: true,
        publishedVersionId: true,
      },
    });
    if (bySlug?.contentVersionId) return bySlug.contentVersionId;
    if (bySlug?.publishedVersionId) return bySlug.publishedVersionId;
  }
  return null;
}

/**
 * Ensure a DRAFT content_versions row exists for YAML closed-beta learning.
 * Never marks PUBLISHED. Used when exercises are evaluated from YAML but the
 * DB has no imported version yet — avoids missing_content_version haunt.
 */
export async function ensureModuleContentVersionId(
  db: Db,
  moduleId: string,
): Promise<string | null> {
  const existing = await resolveModuleContentVersionId(db, moduleId);
  if (existing) return existing;

  const peeked = peekModuleById(moduleId);
  const canonicalId =
    peeked?.canonicalId ??
    (moduleId.startsWith("MOD-") ? moduleId : `MOD-YAML-${moduleId}`);
  const title =
    peeked?.titlePl ?? peeked?.title ?? moduleId;

  return db.transaction(async (tx) => {
    let unit = await tx.query.contentUnits.findFirst({
      where: eq(contentUnits.canonicalId, canonicalId),
      columns: { id: true },
    });
    if (!unit) {
      const [inserted] = await tx
        .insert(contentUnits)
        .values({
          canonicalId,
          kind: "module",
          title,
        })
        .returning({ id: contentUnits.id });
      unit = inserted!;
    }

    const latest = await tx
      .select({ id: contentVersions.id })
      .from(contentVersions)
      .where(eq(contentVersions.unitId, unit.id))
      .orderBy(desc(contentVersions.versionNo))
      .limit(1);
    if (latest[0]?.id) {
      await linkModuleContentVersion(tx as unknown as Db, moduleId, canonicalId, latest[0].id);
      return latest[0].id;
    }

    const [version] = await tx
      .insert(contentVersions)
      .values({
        unitId: unit.id,
        versionNo: 1,
        status: "DRAFT",
        provenance: {
          originality: "yaml_learning_ensure",
          note: "Auto-created for closed-beta YAML attempts. Not JPJO-approved. Not PUBLISHED.",
          moduleId,
        },
        payload: { yamlLearningStub: true, moduleId, slug: peeked?.id ?? moduleId },
      })
      .returning({ id: contentVersions.id });

    const versionId = version!.id;
    await linkModuleContentVersion(tx as unknown as Db, moduleId, canonicalId, versionId);
    return versionId;
  });
}

async function linkModuleContentVersion(
  db: Db,
  moduleId: string,
  canonicalId: string,
  contentVersionId: string,
): Promise<void> {
  const row =
    (await db.query.modules.findFirst({
      where: eq(modules.canonicalId, canonicalId),
      columns: { id: true, contentVersionId: true },
    })) ??
    (await db.query.modules.findFirst({
      where: eq(modules.slug, moduleId),
      columns: { id: true, contentVersionId: true },
    }));
  if (row && !row.contentVersionId) {
    await db
      .update(modules)
      .set({ contentVersionId })
      .where(eq(modules.id, row.id));
  }
}

async function loadEvidenceForMastery(
  db: Db,
  learnerProfileId: string,
  conceptCanonicalId: string,
  scope: MasteryScope,
): Promise<MasteryEvidence[]> {
  const rows = await db
    .select({
      conceptCanonicalId: evidenceRecords.conceptCanonicalId,
      result: evidenceRecords.result,
      hinted: evidenceRecords.hinted,
      examLike: evidenceRecords.examLike,
      createdAt: evidenceRecords.createdAt,
      skill: evidenceRecords.skill,
      mode: attempts.mode,
      response: attempts.response,
    })
    .from(evidenceRecords)
    .innerJoin(attempts, eq(evidenceRecords.attemptId, attempts.id))
    .where(
      and(
        eq(evidenceRecords.learnerProfileId, learnerProfileId),
        eq(evidenceRecords.conceptCanonicalId, conceptCanonicalId),
        eq(attempts.masteryScope, scope),
      ),
    )
    .orderBy(desc(evidenceRecords.createdAt));

  return rows.map((r) => {
    const responseType =
      r.response &&
      typeof r.response === "object" &&
      "type" in r.response &&
      typeof (r.response as { type?: unknown }).type === "string"
        ? String((r.response as { type: string }).type)
        : "unknown";
    return {
      conceptCanonicalId: r.conceptCanonicalId,
      evidenceType: responseType,
      skill: r.skill ?? undefined,
      result: r.result,
      hinted: r.hinted,
      examLike: r.examLike,
      createdAt: r.createdAt,
      mode: r.mode,
    };
  });
}

/** Reconstruct EvalResult from persisted attempt.response (incl. l1Note). */
export function evaluationFromStoredResponse(
  response: Record<string, unknown>,
  correct: boolean | null,
): EvalResult | null {
  return evaluationFromAttemptResponse(response, correct);
}

function evaluationFromAttemptResponse(
  response: Record<string, unknown>,
  correct: boolean | null,
): EvalResult | null {
  const evaluation = response.evaluation;
  if (evaluation && typeof evaluation === "object") {
    const e = evaluation as Record<string, unknown>;
    if (typeof e.correct === "boolean" && typeof e.explanation === "string") {
      return {
        correct: e.correct,
        explanation: e.explanation,
        evidenceWeight:
          typeof e.evidenceWeight === "number" ? e.evidenceWeight : 0.6,
        conceptId:
          typeof e.conceptId === "string" ? e.conceptId : undefined,
        ...(typeof e.l1Note === "string" && e.l1Note.trim()
          ? { l1Note: e.l1Note }
          : {}),
        ...(Array.isArray(e.revealCorrectIndexes)
          ? {
              revealCorrectIndexes: e.revealCorrectIndexes.filter(
                (n): n is number => typeof n === "number",
              ),
            }
          : {}),
      };
    }
  }
  if (correct === null) return null;
  return {
    correct,
    explanation: "",
    evidenceWeight: 0.6,
  };
}

function replayResult(
  existing: {
    id: string;
    correct: boolean | null;
    mode: string;
    masteryScope: string;
    response: Record<string, unknown>;
  },
  fallback: EvalResult,
  scope: MasteryScope,
): PersistAttemptResult {
  const priorEval = evaluationFromAttemptResponse(
    existing.response,
    existing.correct,
  );
  return {
    persisted: true,
    attemptId: existing.id,
    masteryWritten: false,
    masteryState: null,
    masteryScope: (existing.masteryScope as MasteryScope) ?? scope,
    reviewDueAt: null,
    replayed: true,
    idempotentReplay: true,
    reason: "idempotent_replay",
    evaluation: priorEval ?? fallback,
    mode: existing.mode as AttemptMode,
  };
}

/**
 * Write attempt (+ answers + evidence) and optionally recompute concept_mastery.
 * Wrapped in a DB transaction. Idempotent when idempotencyKey is provided.
 */
export async function persistLearningAttempt(
  input: PersistAttemptInput,
  db: Db = getDb(),
): Promise<PersistAttemptResult> {
  assertNoContentPublish({ touchContentStatus: null });

  if (!input.contentVersionId) {
    return {
      persisted: false,
      attemptId: null,
      masteryWritten: false,
      masteryState: null,
      masteryScope: null,
      reviewDueAt: null,
      reason: "missing_content_version",
    };
  }

  const scope = masteryScopeForMode(input.mode);
  const writeMastery = shouldWriteMastery(input.mode);
  const conceptId = input.evaluation.conceptId;
  const resultLabel = input.evaluation.correct ? "correct" : "incorrect";
  const idempotencyKey = input.idempotencyKey?.trim() || null;

  return db.transaction(async (tx) => {
    const profile = await getOrCreateLearnerProfile(
      tx as unknown as Db,
      input.userId,
    );

    if (idempotencyKey) {
      const existing = await tx.query.attempts.findFirst({
        where: and(
          eq(attempts.learnerProfileId, profile.id),
          eq(attempts.idempotencyKey, idempotencyKey),
        ),
      });
      if (existing) {
        return replayResult(
          {
            id: existing.id,
            correct: existing.correct,
            mode: existing.mode,
            masteryScope: existing.masteryScope,
            response: existing.response as Record<string, unknown>,
          },
          input.evaluation,
          scope,
        );
      }
    }

    let attemptId: string;
    try {
      const [attemptRow] = await tx
        .insert(attempts)
        .values({
          learnerProfileId: profile.id,
          learningSessionId: input.learningSessionId ?? null,
          exerciseId: input.exerciseUuid,
          contentVersionId: input.contentVersionId!,
          response: {
            type: input.answer.type,
            answer: input.answer,
            moduleId: input.moduleId,
            lessonId: input.lessonId ?? null,
            exerciseCanonicalId: input.exerciseCanonicalId,
            evidenceWeight: input.evaluation.evidenceWeight,
            evaluation: input.evaluation,
          },
          correct: input.evaluation.correct,
          hinted: Boolean(input.hinted),
          mode: input.mode,
          idempotencyKey,
          masteryScope: scope,
        })
        .returning({ id: attempts.id });
      attemptId = attemptRow!.id;
    } catch (err) {
      if (idempotencyKey) {
        const existing = await tx.query.attempts.findFirst({
          where: and(
            eq(attempts.learnerProfileId, profile.id),
            eq(attempts.idempotencyKey, idempotencyKey),
          ),
        });
        if (existing) {
          return replayResult(
            {
              id: existing.id,
              correct: existing.correct,
              mode: existing.mode,
              masteryScope: existing.masteryScope,
              response: existing.response as Record<string, unknown>,
            },
            input.evaluation,
            scope,
          );
        }
      }
      throw err;
    }

    await tx.insert(attemptAnswers).values({
      attemptId,
      response: {
        type: input.answer.type,
        answer: input.answer,
      },
      correct: input.evaluation.correct,
      sortOrder: 0,
    });

    if (conceptId) {
      await tx.insert(evidenceRecords).values({
        attemptId,
        learnerProfileId: profile.id,
        conceptCanonicalId: conceptId,
        skill: input.exerciseType,
        weight: String(input.evaluation.evidenceWeight),
        hinted: Boolean(input.hinted),
        examLike: input.mode === "summative",
        result: resultLabel,
      });
    }

    let reviewDueAt: string | null = null;
    if (conceptId) {
      const priorEvidence = await loadEvidenceForMastery(
        tx as unknown as Db,
        profile.id,
        conceptId,
        scope,
      );
      const priorErrors = priorEvidence.filter(
        (e) => e.result === "incorrect",
      ).length;
      // Exclude the row we just inserted from "prior" for interval choice:
      const priorErrorCount = Math.max(
        0,
        priorErrors - (input.evaluation.correct ? 0 : 1),
      );
      reviewDueAt = await upsertReviewSchedule(
        tx as unknown as Db,
        profile.id,
        conceptId,
        scope,
        input.evaluation.correct,
        priorErrorCount,
      );
    }

    if (!writeMastery || !conceptId) {
      return {
        persisted: true,
        attemptId,
        masteryWritten: false,
        masteryState: null,
        masteryScope: scope,
        reviewDueAt,
        reason: writeMastery ? "no_concept" : "preview_mode",
        evaluation: input.evaluation,
        mode: input.mode,
      };
    }

    const evidence = await loadEvidenceForMastery(
      tx as unknown as Db,
      profile.id,
      conceptId,
      scope,
    );
    const snapshot = recomputeMastery(conceptId, evidence);
    const existingMastery = await tx.query.conceptMastery.findFirst({
      where: and(
        eq(conceptMastery.learnerProfileId, profile.id),
        eq(conceptMastery.conceptCanonicalId, conceptId),
        eq(conceptMastery.masteryScope, scope),
      ),
      columns: { id: true },
    });

    if (existingMastery) {
      await tx
        .update(conceptMastery)
        .set({
          state: snapshot.state,
          explanationSnapshot: snapshot.explanation,
          updatedAt: new Date(),
        })
        .where(eq(conceptMastery.id, existingMastery.id));
    } else {
      await tx.insert(conceptMastery).values({
        learnerProfileId: profile.id,
        conceptCanonicalId: conceptId,
        masteryScope: scope,
        state: snapshot.state,
        explanationSnapshot: snapshot.explanation,
      });
    }

    return {
      persisted: true,
      attemptId,
      masteryWritten: true,
      masteryState: snapshot.state,
      masteryScope: scope,
      reviewDueAt,
      evaluation: input.evaluation,
      mode: input.mode,
    };
  });
}

/**
 * Upsert review_schedule in the same transaction as attempt/evidence/mastery.
 * Idempotent replays never reach here (early return before insert).
 * Correct → +2d (if prior errors ≥2) or +4d; incorrect → +0.5d.
 */
async function upsertReviewSchedule(
  db: Db,
  learnerProfileId: string,
  conceptCanonicalId: string,
  masteryScope: MasteryScope,
  correct: boolean,
  priorErrorCount: number,
): Promise<string> {
  const now = new Date();
  const dueAt = nextReviewDueAt(now, correct, priorErrorCount);
  const intervalDays = correct ? (priorErrorCount >= 2 ? 2 : 4) : 1;
  const existing = await db.query.reviewSchedule.findFirst({
    where: and(
      eq(reviewSchedule.learnerProfileId, learnerProfileId),
      eq(reviewSchedule.conceptCanonicalId, conceptCanonicalId),
      eq(reviewSchedule.masteryScope, masteryScope),
    ),
    columns: { id: true },
  });
  if (existing) {
    await db
      .update(reviewSchedule)
      .set({
        dueAt,
        intervalDays,
        updatedAt: now,
      })
      .where(eq(reviewSchedule.id, existing.id));
  } else {
    await db.insert(reviewSchedule).values({
      learnerProfileId,
      conceptCanonicalId,
      masteryScope,
      dueAt,
      intervalDays,
    });
  }
  return dueAt.toISOString();
}
