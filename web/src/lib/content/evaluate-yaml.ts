import type { ModuleExercise } from "@/lib/content/types";

export type AttemptAnswer =
  | { type: "single_choice"; index: number }
  | { type: "multiple_choice"; indices: number[] }
  | { type: "gap_fill"; values: string[] }
  | { type: "ordering"; order: number[] };

export type AttemptResult = {
  correct: boolean;
  explanation: string;
  evidenceWeight: number;
  conceptId?: string;
  preview: boolean;
};

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Deterministic evaluation for YAML draft exercises — never trust client. */
export function evaluateYamlExercise(
  exercise: ModuleExercise,
  answer: AttemptAnswer,
  options: { preview?: boolean } = {},
): AttemptResult {
  const base = {
    explanation: exercise.feedback.explanation,
    evidenceWeight: exercise.feedback.evidenceWeight,
    conceptId: exercise.feedback.conceptId ?? exercise.conceptIds[0],
    preview: Boolean(options.preview),
  };

  if (answer.type !== exercise.type) {
    return { ...base, correct: false };
  }

  switch (exercise.type) {
    case "single_choice": {
      const a = answer as Extract<AttemptAnswer, { type: "single_choice" }>;
      return { ...base, correct: a.index === exercise.correctIndex };
    }
    case "multiple_choice": {
      const a = answer as Extract<AttemptAnswer, { type: "multiple_choice" }>;
      const got = [...a.indices].sort((x, y) => x - y);
      const exp = [...exercise.correctIndices].sort((x, y) => x - y);
      return {
        ...base,
        correct:
          got.length === exp.length && got.every((v, i) => v === exp[i]),
      };
    }
    case "gap_fill": {
      const a = answer as Extract<AttemptAnswer, { type: "gap_fill" }>;
      if (a.values.length !== exercise.gaps.length) {
        return { ...base, correct: false };
      }
      return {
        ...base,
        correct: a.values.every((v, i) => norm(v) === norm(exercise.gaps[i]!)),
      };
    }
    case "ordering": {
      const a = answer as Extract<AttemptAnswer, { type: "ordering" }>;
      return {
        ...base,
        correct:
          a.order.length === exercise.correctOrder.length &&
          a.order.every((v, i) => v === exercise.correctOrder[i]),
      };
    }
    default:
      return { ...base, correct: false };
  }
}
