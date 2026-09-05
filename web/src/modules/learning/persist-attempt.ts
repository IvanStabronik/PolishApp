/**
 * Persist learning attempts → evidence → concept_mastery (ADR-006).
 * Never marks content PUBLISHED. Preview mode may store rows but skips mastery.
 */

import { and, desc, eq } from "drizzle-orm";
import { getDb, type Db } from "@/db/client";
import {
  attempts,
  conceptMastery,
  evidenceRecords,
  exercises,
  learnerProfiles,
  modules,
} from "@/db/schema";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";
import type { ModuleExercise } from "@/lib/content/types";
import type { EvalResult } from "@/modules/assessment/evaluate";
import {
  assertNoContentPublish,
  shouldWriteMastery,
  type AttemptMode,
} from "./attempt-mode";
import {
  recomputeMastery,
  type EvidenceRecord as MasteryEvidence,
  type MasteryStateName,
} from "@/modules/progress/mastery";

export type PersistAttemptInput = {
  userId: string;
  moduleId: string;
  exerciseCanonicalId: string | null;
  exerciseUuid: string | null;
  contentVersionId: string | null;
  answer: AttemptAnswer;
  evaluation: EvalResult;
  mode: AttemptMode;
  exerciseType: ModuleExercise["type"];
  hinted?: boolean;
};

export type PersistAttemptResult = {
  persisted: boolean;
  attemptId: string | null;
  masteryWritten: boolean;
  masteryState: MasteryStateName | null;
  reason?: string;
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

/**
 * Resolve exercise row by UUID or curriculum canonical id (EX-…).
 */
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

/**
 * Resolve a content_version_id from module slug / canonical / alias.
 */
export async function resolveModuleContentVersionId(
  db: Db,
  moduleId: string,
): Promise<string | null> {
  const candidates = [
    moduleId,
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

async function loadEvidenceForMastery(
  db: Db,
  learnerProfileId: string,
  conceptCanonicalId: string,
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

/**
 * Write attempt (+ evidence) and optionally recompute concept_mastery.
 * Requires contentVersionId (FUN-172). Returns persisted:false when missing.
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
      reason: "missing_content_version",
    };
  }

  const profile = await getOrCreateLearnerProfile(db, input.userId);
  const writeMastery = shouldWriteMastery(input.mode);
  const conceptId = input.evaluation.conceptId;
  const resultLabel = input.evaluation.correct ? "correct" : "incorrect";

  const [attemptRow] = await db
    .insert(attempts)
    .values({
      learnerProfileId: profile.id,
      exerciseId: input.exerciseUuid,
      contentVersionId: input.contentVersionId,
      response: {
        type: input.answer.type,
        answer: input.answer,
        moduleId: input.moduleId,
        exerciseCanonicalId: input.exerciseCanonicalId,
        evidenceWeight: input.evaluation.evidenceWeight,
      },
      correct: input.evaluation.correct,
      hinted: Boolean(input.hinted),
      mode: input.mode,
    })
    .returning({ id: attempts.id });

  const attemptId = attemptRow!.id;

  if (conceptId) {
    await db.insert(evidenceRecords).values({
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

  if (!writeMastery || !conceptId) {
    return {
      persisted: true,
      attemptId,
      masteryWritten: false,
      masteryState: null,
      reason: writeMastery ? "no_concept" : "preview_mode",
    };
  }

  const evidence = await loadEvidenceForMastery(db, profile.id, conceptId);
  const snapshot = recomputeMastery(conceptId, evidence);
  const existing = await db.query.conceptMastery.findFirst({
    where: and(
      eq(conceptMastery.learnerProfileId, profile.id),
      eq(conceptMastery.conceptCanonicalId, conceptId),
    ),
    columns: { id: true },
  });

  if (existing) {
    await db
      .update(conceptMastery)
      .set({
        state: snapshot.state,
        explanationSnapshot: snapshot.explanation,
        updatedAt: new Date(),
      })
      .where(eq(conceptMastery.id, existing.id));
  } else {
    await db.insert(conceptMastery).values({
      learnerProfileId: profile.id,
      conceptCanonicalId: conceptId,
      state: snapshot.state,
      explanationSnapshot: snapshot.explanation,
    });
  }

  return {
    persisted: true,
    attemptId,
    masteryWritten: true,
    masteryState: snapshot.state,
  };
}
