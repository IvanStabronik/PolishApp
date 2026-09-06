/**
 * Deterministic closed-item evaluation (server-side only).
 * Do not import this module from client components — answer keys must stay server-bound.
 */

import type { ModuleExercise } from "@/lib/content/types";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";

export type EvalResult = {
  correct: boolean;
  explanation: string;
  evidenceWeight: number;
  conceptId?: string;
  /**
   * Pedagogical reveal after evaluation only — indexes of correct options.
   * Never include on initial learner exercise DTO.
   */
  revealCorrectIndexes?: number[];
};

/** Normalize Polish learner text for closed matching (ASM-006). */
export function normalizeAnswer(raw: string): string {
  return raw
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.…]+$/g, "")
    .replace(/[!?,:;]+$/g, "")
    .toLocaleLowerCase("pl-PL");
}

/**
 * Evaluate a YAML / UI exercise payload (index-based answers).
 * Used by `/api/learning/attempt` and unit tests.
 */
export function evaluateAnswer(
  exercise: ModuleExercise,
  answer: AttemptAnswer,
): EvalResult {
  const base = {
    explanation: exercise.feedback.explanation,
    evidenceWeight: exercise.feedback.evidenceWeight,
    conceptId: exercise.feedback.conceptId ?? exercise.conceptIds[0],
  };

  if (answer.type !== exercise.type) {
    return { ...base, correct: false };
  }

  switch (exercise.type) {
    case "single_choice": {
      const a = answer as Extract<AttemptAnswer, { type: "single_choice" }>;
      return {
        ...base,
        correct: a.index === exercise.correctIndex,
        revealCorrectIndexes: [exercise.correctIndex],
      };
    }
    case "multiple_choice": {
      const a = answer as Extract<AttemptAnswer, { type: "multiple_choice" }>;
      const got = [...a.indices].sort((x, y) => x - y);
      const exp = [...exercise.correctIndices].sort((x, y) => x - y);
      return {
        ...base,
        correct:
          got.length === exp.length && got.every((v, i) => v === exp[i]),
        revealCorrectIndexes: [...exercise.correctIndices],
      };
    }
    case "gap_fill": {
      const a = answer as Extract<AttemptAnswer, { type: "gap_fill" }>;
      if (a.values.length !== exercise.gaps.length) {
        return { ...base, correct: false };
      }
      return {
        ...base,
        correct: a.values.every(
          (v, i) => normalizeAnswer(v) === normalizeAnswer(exercise.gaps[i]!),
        ),
      };
    }
    case "ordering": {
      const a = answer as Extract<AttemptAnswer, { type: "ordering" }>;
      return {
        ...base,
        correct:
          a.order.length === exercise.correctOrder.length &&
          a.order.every((v, i) => v === exercise.correctOrder[i]),
        revealCorrectIndexes: [...exercise.correctOrder],
      };
    }
    default:
      return { ...base, correct: false };
  }
}

/* --- Option-id based evaluation (DB answer_key JSON) --- */

export type DetailedEvalResult = {
  correct: boolean;
  partial: boolean;
  score: number;
  details: Record<string, unknown>;
};

export type SingleChoiceSpec = {
  type: "single_choice";
  correct_option_id: string;
};

export type MultipleChoiceSpec = {
  type: "multiple_choice";
  correct_option_ids: string[];
};

export type GapFillSpec = {
  type: "gap_fill";
  gaps: Array<{ id: string; accepted_answers: string[] }>;
  require_all?: boolean;
};

export type OrderingSpec = {
  type: "ordering";
  correct_order: string[];
};

export type ExerciseEvalSpec =
  | SingleChoiceSpec
  | MultipleChoiceSpec
  | GapFillSpec
  | OrderingSpec;

export type LearnerResponse =
  | { type: "single_choice"; option_id: string }
  | { type: "multiple_choice"; option_ids: string[] }
  | { type: "gap_fill"; answers: Record<string, string> }
  | { type: "ordering"; order: string[] };

function sameStringSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

export function evaluateResponse(
  spec: ExerciseEvalSpec,
  response: LearnerResponse,
): DetailedEvalResult {
  if (spec.type !== response.type) {
    return {
      correct: false,
      partial: false,
      score: 0,
      details: {
        reason: "type_mismatch",
        expectedType: spec.type,
        gotType: response.type,
      },
    };
  }
  switch (spec.type) {
    case "single_choice": {
      const correct =
        (response as Extract<LearnerResponse, { type: "single_choice" }>)
          .option_id === spec.correct_option_id;
      return {
        correct,
        partial: false,
        score: correct ? 1 : 0,
        details: {
          expected: spec.correct_option_id,
          got: (response as Extract<LearnerResponse, { type: "single_choice" }>)
            .option_id,
        },
      };
    }
    case "multiple_choice": {
      const expected = [...new Set(spec.correct_option_ids)];
      const got = [
        ...new Set(
          (response as Extract<LearnerResponse, { type: "multiple_choice" }>)
            .option_ids,
        ),
      ];
      const correct = sameStringSet(expected, got);
      const overlap = got.filter((id) => expected.includes(id)).length;
      const score =
        expected.length === 0
          ? 0
          : Math.max(
              0,
              overlap / expected.length -
                (got.length - overlap) / expected.length,
            );
      return {
        correct,
        partial: !correct && overlap > 0,
        score: correct ? 1 : Math.min(1, Math.max(0, score)),
        details: { expected, got, overlap },
      };
    }
    case "gap_fill": {
      const answers = (
        response as Extract<LearnerResponse, { type: "gap_fill" }>
      ).answers;
      const requireAll = spec.require_all !== false;
      let matched = 0;
      const perGap: Record<string, boolean> = {};
      for (const gap of spec.gaps) {
        const given = answers[gap.id] ?? "";
        const ok = gap.accepted_answers.some(
          (a) => normalizeAnswer(a) === normalizeAnswer(given),
        );
        perGap[gap.id] = ok;
        if (ok) matched += 1;
      }
      const total = spec.gaps.length;
      const score = total === 0 ? 0 : matched / total;
      return {
        correct: requireAll ? matched === total : matched > 0,
        partial: matched > 0 && matched < total,
        score,
        details: { perGap, matched, total },
      };
    }
    case "ordering": {
      const got = (response as Extract<LearnerResponse, { type: "ordering" }>)
        .order;
      const expected = spec.correct_order;
      if (expected.length !== got.length) {
        return {
          correct: false,
          partial: false,
          score: 0,
          details: { expected, got, reason: "length_mismatch" },
        };
      }
      let correctPositions = 0;
      for (let i = 0; i < expected.length; i++) {
        if (expected[i] === got[i]) correctPositions += 1;
      }
      const correct = correctPositions === expected.length;
      return {
        correct,
        partial: !correct && correctPositions > 0,
        score: expected.length === 0 ? 0 : correctPositions / expected.length,
        details: { expected, got, correctPositions },
      };
    }
    default: {
      const _exhaustive: never = spec;
      return _exhaustive;
    }
  }
}

/** Build server-only answer key JSON stored on exercises.answer_key */
export function answerKeyFromExercise(ex: {
  type: ExerciseEvalSpec["type"];
  correct_option_id?: string;
  correct_option_ids?: string[];
  gaps?: Array<{ id: string; accepted_answers: string[] }>;
  correct_order?: string[];
}): ExerciseEvalSpec {
  switch (ex.type) {
    case "single_choice":
      return { type: "single_choice", correct_option_id: ex.correct_option_id! };
    case "multiple_choice":
      return {
        type: "multiple_choice",
        correct_option_ids: ex.correct_option_ids!,
      };
    case "gap_fill":
      return {
        type: "gap_fill",
        gaps: (ex.gaps ?? []).map((g) => ({
          id: g.id,
          accepted_answers: g.accepted_answers,
        })),
      };
    case "ordering":
      return { type: "ordering", correct_order: ex.correct_order! };
  }
}
