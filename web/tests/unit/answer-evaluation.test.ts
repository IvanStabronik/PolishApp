import { describe, expect, it } from "vitest";
import {
  evaluateResponse,
  normalizeAnswer,
  type ExerciseEvalSpec,
} from "@/modules/assessment/evaluate";

describe("answer evaluation", () => {
  it("normalizes Polish learner text", () => {
    expect(normalizeAnswer("  Anna... ")).toBe("anna");
    expect(normalizeAnswer("Cześć!")).toBe("cześć");
  });

  it("scores single_choice by option id", () => {
    const spec: ExerciseEvalSpec = {
      type: "single_choice",
      correct_option_id: "opt-a",
    };
    expect(
      evaluateResponse(spec, { type: "single_choice", option_id: "opt-a" })
        .correct,
    ).toBe(true);
    expect(
      evaluateResponse(spec, { type: "single_choice", option_id: "opt-b" })
        .correct,
    ).toBe(false);
  });

  it("scores multiple_choice as a set", () => {
    const spec: ExerciseEvalSpec = {
      type: "multiple_choice",
      correct_option_ids: ["a", "c"],
    };
    expect(
      evaluateResponse(spec, {
        type: "multiple_choice",
        option_ids: ["c", "a"],
      }).correct,
    ).toBe(true);
    const partial = evaluateResponse(spec, {
      type: "multiple_choice",
      option_ids: ["a"],
    });
    expect(partial.correct).toBe(false);
    expect(partial.partial).toBe(true);
  });

  it("scores gap_fill with accepted answers + normalization", () => {
    const spec: ExerciseEvalSpec = {
      type: "gap_fill",
      gaps: [{ id: "g1", accepted_answers: ["się", "sie"] }],
    };
    expect(
      evaluateResponse(spec, {
        type: "gap_fill",
        answers: { g1: "  SIĘ " },
      }).correct,
    ).toBe(true);
    expect(
      evaluateResponse(spec, {
        type: "gap_fill",
        answers: { g1: "jestem" },
      }).correct,
    ).toBe(false);
  });

  it("scores ordering by id sequence", () => {
    const spec: ExerciseEvalSpec = {
      type: "ordering",
      correct_order: ["t1", "t2", "t3"],
    };
    expect(
      evaluateResponse(spec, {
        type: "ordering",
        order: ["t1", "t2", "t3"],
      }).correct,
    ).toBe(true);
    expect(
      evaluateResponse(spec, {
        type: "ordering",
        order: ["t2", "t1", "t3"],
      }).correct,
    ).toBe(false);
  });

  it("rejects mismatched response type", () => {
    const result = evaluateResponse(
      { type: "single_choice", correct_option_id: "a" },
      { type: "ordering", order: ["a"] },
    );
    expect(result.correct).toBe(false);
    expect(result.details.reason).toBe("type_mismatch");
  });
});
