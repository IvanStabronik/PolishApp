"use server";

/**
 * Closed-answer check for legacy single-choice lesson steps.
 * Prefer /api/learning/attempt + ExercisePlayer for all four types.
 */

import { findLessonById } from "@/lib/content/load-module";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import type { CheckAnswerInput, CheckAnswerResult } from "../types";
import { getRequestSession } from "@/modules/auth/session";
import { isPrivateAlphaPreviewEnv } from "@/lib/demo";

export async function checkClosedAnswer(
  input: CheckAnswerInput,
): Promise<CheckAnswerResult> {
  const session = await getRequestSession();
  const ctx = {
    roles: session?.roles ?? [],
    email: session?.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };

  const found = findLessonById(input.lessonId, ctx);
  if (!found) {
    return {
      correct: false,
      feedback: "Lesson unavailable",
      conceptId: "",
    };
  }

  const exercise = found.lesson.exercises.find(
    (ex) => ex.id === input.exerciseId || ex.canonicalId === input.exerciseId,
  );
  if (!exercise || exercise.type !== "single_choice") {
    return {
      correct: false,
      feedback: "Exercise unavailable",
      conceptId: "",
    };
  }

  const optionIndex = Number(input.optionId);
  const result = evaluateAnswer(exercise, {
    type: "single_choice",
    index: Number.isFinite(optionIndex) ? optionIndex : -1,
  });

  return {
    correct: result.correct,
    feedback: result.explanation,
    conceptId: result.conceptId ?? exercise.conceptIds[0] ?? "",
  };
}

/** Sync evaluator lives in ./evaluate — import from there, not this "use server" barrel. */
