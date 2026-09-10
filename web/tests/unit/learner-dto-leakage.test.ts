/**
 * Contract tests: learner exercise DTO must not leak answer keys.
 */

import { describe, expect, it } from "vitest";
import {
  ANSWER_KEY_FIELD_NAMES,
  LEARNER_EXERCISE_WHITELIST,
  assertNoAnswerKeyLeak,
  serializeLearnerExercise,
  toLearnerExercise,
  type LearnerExercise,
} from "@/lib/content/learner-dto";
import type { ModuleExercise } from "@/lib/content/types";
import { getExercise } from "@/lib/content/load-module";

/** Unique gap answer used only as answer key in EX-A1-PS-GF-01 / fixture. */
const GAP_ANSWER_SENTINEL = "Nazywam";

const authoredSingle: ModuleExercise = {
  id: "ex-test-sc",
  type: "single_choice",
  prompt: "Pick one",
  options: ["A", "B", "C"],
  correctIndex: 1,
  conceptIds: ["C1"],
  feedback: {
    correct: "B is right",
    incorrect: "Not B",
    evidenceWeight: 0.8,
  },
  retryPolicy: "unlimited",
};

const authoredGap: ModuleExercise = {
  id: "ex-test-gf",
  type: "gap_fill",
  prompt: "Fill ___",
  textWithGaps: "Fill ___",
  gaps: [GAP_ANSWER_SENTINEL],
  conceptIds: ["C1"],
  feedback: {
    correct: "ok",
    incorrect: "nope",
    evidenceWeight: 1,
  },
  retryPolicy: "unlimited",
};

describe("learner exercise DTO whitelist", () => {
  it("exposes an explicit whitelist of safe fields", () => {
    expect([...LEARNER_EXERCISE_WHITELIST].sort()).toEqual(
      [
        "id",
        "type",
        "prompt",
        "options",
        "items",
        "textWithGaps",
        "gapCount",
        "__learnerSafe",
      ].sort(),
    );
  });

  it("serializes only whitelist keys for each type", () => {
    const learner = toLearnerExercise(authoredSingle);
    const keys = Object.keys(learner).sort();
    for (const key of keys) {
      expect(LEARNER_EXERCISE_WHITELIST).toContain(key);
    }
  });

  it("serialized DTO has no answer-key fields", () => {
    for (const authored of [
      authoredSingle,
      authoredGap,
      {
        id: "ex-mc",
        type: "multiple_choice" as const,
        prompt: "multi",
        options: ["a", "b"],
        correctIndices: [0, 1],
        conceptIds: [],
        feedback: { correct: "x", incorrect: "y", evidenceWeight: 1 },
        retryPolicy: "unlimited",
      },
      {
        id: "ex-ord",
        type: "ordering" as const,
        prompt: "order",
        items: ["x", "y"],
        correctOrder: [1, 0],
        conceptIds: [],
        feedback: { correct: "x", incorrect: "y", evidenceWeight: 1 },
        retryPolicy: "unlimited",
      },
    ]) {
      const json = serializeLearnerExercise(toLearnerExercise(authored));
      assertNoAnswerKeyLeak(json);
      for (const field of ANSWER_KEY_FIELD_NAMES) {
        expect(json).not.toMatch(new RegExp(`"${field}"\\s*:`));
      }
    }
  });

  it("gap answers become gapCount — sentinel not in DTO", () => {
    const learner = toLearnerExercise(authoredGap);
    expect(learner.type).toBe("gap_fill");
    if (learner.type !== "gap_fill") return;
    expect(learner.gapCount).toBe(1);
    expect(JSON.stringify(learner)).not.toContain(GAP_ANSWER_SENTINEL);
    expect("gaps" in learner).toBe(false);
  });

  it("YAML gap exercise learner DTO omits unique answer-key sentinel", () => {
    const authored = getExercise("pierwsze-spotkanie", "ex-ps-05", {
      roles: ["previewer"],
      isPreviewEnv: true,
    });
    expect(authored).not.toBeNull();
    if (!authored || authored.type !== "gap_fill") {
      throw new Error("expected gap_fill authored exercise");
    }
    expect(authored.gaps).toContain(GAP_ANSWER_SENTINEL);
    const learner = toLearnerExercise(authored);
    const json = serializeLearnerExercise(learner);
    expect(json).not.toContain(GAP_ANSWER_SENTINEL);
    expect(json).not.toMatch(/"correctIndex"\s*:/);
    expect(json).not.toMatch(/"gaps"\s*:/);
  });

  it("TypeScript boundary: ExercisePlayer props reject authored keys", () => {
    const learner = toLearnerExercise(authoredSingle);
    expect(learner.__learnerSafe).toBe("LearnerExercise");
    expect("correctIndex" in learner).toBe(false);

    // Assigning ModuleExercise to LearnerExercise is a type error (missing brand):
    // @ts-expect-error server-only authored exercise must not flow to player
    const _bad: LearnerExercise = authoredSingle;
    void _bad;
  });
});

describe("client does not compute correctness", () => {
  it("learner DTO has no fields sufficient to score locally", () => {
    const learner = toLearnerExercise(authoredSingle);
    const json = serializeLearnerExercise(learner);
    expect(json).not.toMatch(/correct/i);
    expect(json).not.toMatch(/score/i);
    expect(json).not.toMatch(/evidence/i);
  });
});
