/**
 * Deterministic closed-item evaluation (server-side only).
 * Do not import this module from client components — answer keys must stay server-bound.
 */

import type { ModuleExercise } from "@/lib/content/types";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";
import type { LearnerL1 } from "@/lib/enums";
import { isLearnerL1 } from "@/lib/content/types";

export type EvalResult = {
  correct: boolean;
  explanation: string;
  /** Optional L1 contrast note after evaluation (never on initial DTO). */
  l1Note?: string;
  evidenceWeight: number;
  conceptId?: string;
  /**
   * Pedagogical reveal after evaluation only — indexes of correct options.
   * Never include on initial learner exercise DTO.
   */
  revealCorrectIndexes?: number[];
};

export type EvaluateAnswerOptions = {
  /** Learner L1 for selecting feedback.l1Notes. */
  l1?: LearnerL1 | string | null;
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

function resolveFeedbackText(
  exercise: ModuleExercise,
  correct: boolean,
): string {
  const fb = exercise.feedback;
  if (correct) {
    return fb.correct || fb.explanation || "";
  }
  return fb.incorrect || fb.explanation || "";
}

function resolveL1Note(
  exercise: ModuleExercise,
  l1?: LearnerL1 | string | null,
): string | undefined {
  if (!l1 || !isLearnerL1(l1)) return undefined;
  const note = exercise.feedback.l1Notes?.[l1];
  return note?.trim() ? note : undefined;
}

/**
 * Evaluate a YAML / UI exercise payload (index-based answers).
 * Used by `/api/learning/attempt` and unit tests.
 */
export function evaluateAnswer(
  exercise: ModuleExercise,
  answer: AttemptAnswer,
  options: EvaluateAnswerOptions = {},
): EvalResult {
  const baseMeta = {
    evidenceWeight: exercise.feedback.evidenceWeight,
    conceptId: exercise.feedback.conceptId ?? exercise.conceptIds[0],
  };

  const finish = (correct: boolean, extra: Partial<EvalResult> = {}): EvalResult => {
    const explanation = resolveFeedbackText(exercise, correct);
    const l1Note = resolveL1Note(exercise, options.l1);
    return {
      ...baseMeta,
      correct,
      explanation,
      ...(l1Note ? { l1Note } : {}),
      ...extra,
    };
  };

  if (answer.type !== exercise.type) {
    return finish(false);
  }

  switch (exercise.type) {
    case "single_choice": {
      const a = answer as Extract<AttemptAnswer, { type: "single_choice" }>;
      return finish(a.index === exercise.correctIndex, {
        revealCorrectIndexes: [exercise.correctIndex],
      });
    }
    case "multiple_choice": {
      const a = answer as Extract<AttemptAnswer, { type: "multiple_choice" }>;
      const got = [...a.indices].sort((x, y) => x - y);
      const exp = [...exercise.correctIndices].sort((x, y) => x - y);
      return finish(
        got.length === exp.length && got.every((v, i) => v === exp[i]),
        { revealCorrectIndexes: [...exercise.correctIndices] },
      );
    }
    case "gap_fill": {
      const a = answer as Extract<AttemptAnswer, { type: "gap_fill" }>;
      if (a.values.length !== exercise.gaps.length) {
        return finish(false);
      }
      return finish(
        a.values.every(
          (v, i) => normalizeAnswer(v) === normalizeAnswer(exercise.gaps[i]!),
        ),
      );
    }
    case "ordering": {
      const a = answer as Extract<AttemptAnswer, { type: "ordering" }>;
      return finish(
        a.order.length === exercise.correctOrder.length &&
          a.order.every((v, i) => v === exercise.correctOrder[i]),
        { revealCorrectIndexes: [...exercise.correctOrder] },
      );
    }
    default:
      return finish(false);
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
