"use server";

import { getLessonById } from "@/modules/content/learner-content";
import type { CheckAnswerInput, CheckAnswerResult } from "../types";

export async function checkClosedAnswer(
  input: CheckAnswerInput,
): Promise<CheckAnswerResult> {
  const lesson = await getLessonById(input.lessonId);
  if (!lesson) {
    return {
      correct: false,
      feedback: "Lesson unavailable",
      conceptId: "",
    };
  }

  const step = lesson.steps.find(
    (s) => s.kind === "exercise" && s.id === input.exerciseId,
  );
  if (!step || step.kind !== "exercise") {
    return {
      correct: false,
      feedback: "Exercise unavailable",
      conceptId: "",
    };
  }

  const correct = step.correctOptionId === input.optionId;
  return {
    correct,
    feedback: correct ? step.feedbackCorrect : step.feedbackIncorrect,
    conceptId: step.conceptId,
  };
}

/** Sync evaluator lives in ./evaluate — import from there, not this "use server" barrel. */
