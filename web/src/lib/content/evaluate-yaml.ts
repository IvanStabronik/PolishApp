import type { ModuleExercise } from "@/lib/content/types";
import type { LearnerL1 } from "@/lib/enums";
import { isLearnerL1 } from "@/lib/content/types";
import { evaluateAnswer } from "@/modules/assessment/evaluate";

export type AttemptAnswer =
  | { type: "single_choice"; index: number }
  | { type: "multiple_choice"; indices: number[] }
  | { type: "gap_fill"; values: string[] }
  | { type: "ordering"; order: number[] }
  | { type: "listening"; index: number };

export type AttemptResult = {
  correct: boolean;
  explanation: string;
  l1Note?: string;
  evidenceWeight: number;
  conceptId?: string;
  preview: boolean;
};

/** Deterministic evaluation for YAML draft exercises — never trust client. */
export function evaluateYamlExercise(
  exercise: ModuleExercise,
  answer: AttemptAnswer,
  options: { preview?: boolean; l1?: LearnerL1 | string | null } = {},
): AttemptResult {
  const evaluated = evaluateAnswer(exercise, answer, {
    l1: options.l1 && isLearnerL1(options.l1) ? options.l1 : options.l1,
  });
  return {
    correct: evaluated.correct,
    explanation: evaluated.explanation,
    ...(evaluated.l1Note ? { l1Note: evaluated.l1Note } : {}),
    evidenceWeight: evaluated.evidenceWeight,
    conceptId: evaluated.conceptId,
    preview: Boolean(options.preview),
  };
}
