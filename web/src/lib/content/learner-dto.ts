/**
 * Learner-safe exercise DTOs — whitelist only, no answer keys.
 * Server-only ModuleExercise must never be passed to ExercisePlayer.
 */

import type { ModuleExercise } from "./types";

/** Explicit whitelist of fields allowed on the learner client. */
export const LEARNER_EXERCISE_WHITELIST = [
  "id",
  "type",
  "prompt",
  "options",
  "items",
  "textWithGaps",
  "gapCount",
  "__learnerSafe",
] as const;

export type LearnerExerciseWhitelistKey =
  (typeof LEARNER_EXERCISE_WHITELIST)[number];

/**
 * Nominal brand string — ModuleExercise lacks this required field, so
 * assigning authored exercises to ExercisePlayer props is a type error.
 */
type LearnerSafeBrand = { readonly __learnerSafe: "LearnerExercise" };

type LearnerExerciseBase = LearnerSafeBrand & {
  id: string;
  prompt: string;
};

export type LearnerSingleChoice = LearnerExerciseBase & {
  type: "single_choice";
  options: string[];
};

export type LearnerMultipleChoice = LearnerExerciseBase & {
  type: "multiple_choice";
  options: string[];
};

export type LearnerGapFill = LearnerExerciseBase & {
  type: "gap_fill";
  textWithGaps: string;
  /** Number of empty gap fields — never accepted answers. */
  gapCount: number;
};

export type LearnerOrdering = LearnerExerciseBase & {
  type: "ordering";
  items: string[];
};

export type LearnerExercise =
  | LearnerSingleChoice
  | LearnerMultipleChoice
  | LearnerGapFill
  | LearnerOrdering;

/** Submitted answer — learner → server. */
export type SubmittedAnswerDto =
  | { type: "single_choice"; index: number }
  | { type: "multiple_choice"; indices: number[] }
  | { type: "gap_fill"; values: string[] }
  | { type: "ordering"; order: number[] };

/**
 * Evaluation returned after a saved attempt.
 * May include pedagogical reveal; never ship this on initial load.
 */
export type EvaluationResultDto = {
  correct: boolean;
  explanation: string;
  /** After attempt: indexes to highlight as correct (pedagogy only). */
  revealCorrectIndexes?: number[];
};

/** Answer-key / scoring field names that must never appear on learner DTOs. */
export const ANSWER_KEY_FIELD_NAMES = [
  "correctIndex",
  "correctIndices",
  "correctOrder",
  "correct_option_id",
  "correct_option_ids",
  "correct_order",
  "accepted_answers",
  "acceptedAnswers",
  "answerKey",
  "answer_key",
  "evidenceWeight",
  "evidence_weight",
  "conceptIds",
  "conceptId",
  "canonicalId",
  "feedback",
  "retryPolicy",
  "score",
  "contentVersion",
  "contentVersionId",
] as const;

/**
 * Strip server-only ModuleExercise → learner-safe whitelist DTO.
 * Gap answers become gapCount only.
 */
export function toLearnerExercise(ex: ModuleExercise): LearnerExercise {
  switch (ex.type) {
    case "single_choice":
      return {
        __learnerSafe: "LearnerExercise",
        id: ex.id,
        type: "single_choice",
        prompt: ex.prompt,
        options: [...ex.options],
      };
    case "multiple_choice":
      return {
        __learnerSafe: "LearnerExercise",
        id: ex.id,
        type: "multiple_choice",
        prompt: ex.prompt,
        options: [...ex.options],
      };
    case "gap_fill":
      return {
        __learnerSafe: "LearnerExercise",
        id: ex.id,
        type: "gap_fill",
        prompt: ex.prompt,
        textWithGaps: ex.textWithGaps,
        gapCount: ex.gaps.length,
      };
    case "ordering":
      return {
        __learnerSafe: "LearnerExercise",
        id: ex.id,
        type: "ordering",
        prompt: ex.prompt,
        items: [...ex.items],
      };
  }
}

/** JSON-serialize and assert no answer-key fields leak. */
export function serializeLearnerExercise(ex: LearnerExercise): string {
  const rest = { ...ex };
  delete (rest as { __learnerSafe?: string }).__learnerSafe;
  const json = JSON.stringify(rest);
  assertNoAnswerKeyLeak(json, "learner exercise DTO");
  return json;
}

export function assertNoAnswerKeyLeak(
  serialized: string,
  label = "payload",
): void {
  for (const field of ANSWER_KEY_FIELD_NAMES) {
    const re = new RegExp(`"${field}"\\s*:`);
    if (re.test(serialized)) {
      throw new Error(
        `Answer-key field "${field}" must not appear in ${label}`,
      );
    }
  }
}

/** ExercisePlayer props — TypeScript rejects ModuleExercise (missing brand). */
export type ExercisePlayerProps = {
  moduleId: string;
  exercise: LearnerExercise;
  nextHref: string;
  isLast: boolean;
};
