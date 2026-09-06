import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  getExercise,
  isInternalPreview,
  peekModuleById,
} from "@/lib/content/load-module";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";
import type { ContentStatus } from "@/lib/enums";
import { CONTENT_STATUSES } from "@/lib/enums";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { getRequestSession } from "@/modules/auth/session";
import {
  resolveAttemptMode,
  shouldWriteLiveMastery,
} from "@/modules/learning/attempt-mode";
import {
  persistLearningAttempt,
  resolveExerciseRow,
  resolveModuleContentVersionId,
} from "@/modules/learning/persist-attempt";
import { getDb } from "@/db/client";
import { contentVersions } from "@/db/schema";

export const runtime = "nodejs";

const BodySchema = z.object({
  moduleId: z.string().min(1).max(200),
  exerciseId: z.string().min(1).max(200),
  answer: z.record(z.string(), z.unknown()),
  hinted: z.boolean().optional(),
  idempotencyKey: z.string().uuid().optional(),
  // Explicitly ignored — never trusted from client:
  preview: z.boolean().optional(),
  mode: z.string().optional(),
  correct: z.boolean().optional(),
  score: z.number().optional(),
  contentVersion: z.union([z.string(), z.number()]).optional(),
  contentVersionId: z.string().optional(),
  revealCorrectIndexes: z.array(z.number()).optional(),
  explanation: z.string().optional(),
});

const MAX_BODY = 32_768;

/**
 * Learning attempt evaluation + persistence.
 * Server decides mode from content status. Client mode/preview/correct ignored.
 */
export async function POST(request: Request) {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const body = parsed.data;
  const headerKey = request.headers.get("idempotency-key");
  const idempotencyKey =
    body.idempotencyKey ??
    (headerKey && /^[0-9a-f-]{36}$/i.test(headerKey) ? headerKey : undefined);

  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const canDraft = canAccessDraftContent(accessCtx);

  const peeked = peekModuleById(body.moduleId);
  if (!peeked) {
    return NextResponse.json({ error: "module_not_found" }, { status: 404 });
  }
  if (isInternalPreview(peeked.status) && !canDraft) {
    return NextResponse.json({ error: "draft_forbidden" }, { status: 403 });
  }

  const exercise = getExercise(body.moduleId, body.exerciseId, accessCtx);
  if (!exercise) {
    return NextResponse.json({ error: "exercise_not_found" }, { status: 404 });
  }

  const evaluation = evaluateAnswer(
    exercise,
    body.answer as unknown as AttemptAnswer,
  );

  try {
    const db = getDb();
    const canonicalLookup = exercise.canonicalId ?? body.exerciseId;
    const exerciseRow =
      (await resolveExerciseRow(db, canonicalLookup)) ??
      (await resolveExerciseRow(db, body.exerciseId));

    const contentVersionId =
      exerciseRow?.contentVersionId ??
      (await resolveModuleContentVersionId(db, body.moduleId));

    let contentStatus: string | null = peeked.status;
    if (contentVersionId) {
      const ver = await db.query.contentVersions.findFirst({
        where: eq(contentVersions.id, contentVersionId),
        columns: { status: true },
      });
      if (ver?.status) contentStatus = ver.status;
    }

    if (isInternalPreview(contentStatus as ContentStatus) && !canDraft) {
      return NextResponse.json({ error: "draft_forbidden" }, { status: 403 });
    }

    const normalizedStatus: ContentStatus =
      contentStatus &&
      (CONTENT_STATUSES as readonly string[]).includes(contentStatus)
        ? (contentStatus as ContentStatus)
        : "DRAFT";

    const mode = resolveAttemptMode({
      contentStatus: normalizedStatus,
    });

    const persistResult = await persistLearningAttempt(
      {
        userId: session.user.id,
        moduleId: body.moduleId,
        exerciseCanonicalId:
          exerciseRow?.canonicalId ?? exercise.canonicalId ?? null,
        exerciseUuid: exerciseRow?.id ?? null,
        contentVersionId,
        answer: body.answer as unknown as AttemptAnswer,
        evaluation,
        mode,
        exerciseType: exercise.type,
        hinted: Boolean(body.hinted),
        idempotencyKey,
      },
      db,
    );

    if (!persistResult.persisted) {
      return NextResponse.json(
        {
          error: "persistence_failed",
          correct: evaluation.correct,
          explanation: evaluation.explanation,
          persisted: false,
          reason: persistResult.reason ?? "persistence_failed",
          mode,
        },
        { status: 503 },
      );
    }

    const evalOut = persistResult.evaluation ?? evaluation;

    return NextResponse.json({
      ...evalOut,
      preview: mode === "preview",
      mode: persistResult.mode ?? mode,
      masteryScope: persistResult.masteryScope,
      masteryWritten: persistResult.masteryWritten,
      masteryState: persistResult.masteryState,
      persisted: true,
      replayed: Boolean(persistResult.replayed ?? persistResult.idempotentReplay),
      idempotentReplay: Boolean(
        persistResult.replayed ?? persistResult.idempotentReplay,
      ),
      attemptId: persistResult.attemptId,
      exerciseCanonicalId:
        exerciseRow?.canonicalId ?? exercise.canonicalId ?? body.exerciseId,
      exerciseUuid: exerciseRow?.id ?? null,
      contentVersionId,
      reason: persistResult.reason,
      liveMasteryEligible: shouldWriteLiveMastery(mode),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "persistence_unavailable";
    return NextResponse.json(
      {
        error: "persistence_unavailable",
        reason: message,
        correct: evaluation.correct,
        explanation: evaluation.explanation,
        persisted: false,
      },
      { status: 503 },
    );
  }
}
