import { NextResponse } from "next/server";
import { getExercise } from "@/lib/content/load-module";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import { isDemoPreviewEnabled } from "@/lib/demo";
import { getRequestSession } from "@/modules/auth/session";
import {
  resolveAttemptMode,
  shouldWriteMastery,
} from "@/modules/learning/attempt-mode";
import {
  persistLearningAttempt,
  resolveExerciseRow,
  resolveModuleContentVersionId,
} from "@/modules/learning/persist-attempt";
import { getDb } from "@/db/client";
import type { AttemptMode } from "@/modules/learning/attempt-mode";

type Body = {
  moduleId: string;
  exerciseId: string;
  answer: AttemptAnswer;
  preview?: boolean;
  mode?: AttemptMode;
  hinted?: boolean;
  /** Ignored — server evaluates; never trust client correctness. */
  correct?: boolean;
};

/**
 * Learning attempt evaluation + persistence.
 * Always evaluates server-side. DRAFT content is never published here.
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.moduleId || !body.exerciseId || !body.answer) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  // Strip any client-supplied correctness before evaluation.
  const { correct: _clientCorrect, ...safeBody } = body;
  void _clientCorrect;

  const exercise = getExercise(safeBody.moduleId, safeBody.exerciseId);
  if (!exercise) {
    return NextResponse.json({ error: "exercise_not_found" }, { status: 404 });
  }

  const session = await getRequestSession();
  const demoPreview = isDemoPreviewEnabled();
  const mode = resolveAttemptMode({
    preview: Boolean(safeBody.preview),
    mode: safeBody.mode,
    isDemoUser: session?.isDemoUser ?? false,
    demoPreviewEnabled: demoPreview,
  });

  const evaluation = evaluateAnswer(exercise, safeBody.answer);

  const baseResponse = {
    ...evaluation,
    preview: mode === "preview" || demoPreview,
    mode,
    masteryWritten: false as boolean,
    persisted: false as boolean,
    attemptId: null as string | null,
    exerciseCanonicalId: exercise.canonicalId ?? safeBody.exerciseId,
    contentVersionId: null as string | null,
  };

  if (!session) {
    return NextResponse.json({
      ...baseResponse,
      reason: "unauthenticated",
    });
  }

  try {
    const db = getDb();
    const canonicalLookup =
      exercise.canonicalId ?? safeBody.exerciseId;
    const exerciseRow =
      (await resolveExerciseRow(db, canonicalLookup)) ??
      (await resolveExerciseRow(db, safeBody.exerciseId));

    const contentVersionId =
      exerciseRow?.contentVersionId ??
      (await resolveModuleContentVersionId(db, safeBody.moduleId));

    const persistResult = await persistLearningAttempt(
      {
        userId: session.user.id,
        moduleId: safeBody.moduleId,
        exerciseCanonicalId:
          exerciseRow?.canonicalId ?? exercise.canonicalId ?? null,
        exerciseUuid: exerciseRow?.id ?? null,
        contentVersionId,
        answer: safeBody.answer,
        evaluation,
        mode,
        exerciseType: exercise.type,
        hinted: Boolean(safeBody.hinted),
      },
      db,
    );

    return NextResponse.json({
      ...evaluation,
      preview: mode === "preview" || demoPreview,
      mode,
      masteryWritten: persistResult.masteryWritten,
      masteryState: persistResult.masteryState,
      persisted: persistResult.persisted,
      attemptId: persistResult.attemptId,
      exerciseCanonicalId:
        exerciseRow?.canonicalId ?? exercise.canonicalId ?? safeBody.exerciseId,
      exerciseUuid: exerciseRow?.id ?? null,
      contentVersionId,
      reason: persistResult.reason,
      // Explicit: preview never claims live mastery.
      liveMasteryEligible: shouldWriteMastery(mode),
    });
  } catch {
    // Evaluation still returned — persistence is best-effort when DB unavailable.
    return NextResponse.json({
      ...baseResponse,
      reason: "persistence_unavailable",
    });
  }
}
