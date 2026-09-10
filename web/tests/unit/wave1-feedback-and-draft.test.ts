import { describe, expect, it } from "vitest";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import type { ModuleExercise } from "@/lib/content/types";
import { loadAllModulesFromYaml } from "@/lib/content/load-module";
import { draftLessonToDetail } from "@/modules/content/draft-lesson-to-detail";
import {
  canAccessDraftContent,
  isClosedBetaDraftEnv,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";

function sampleChoice(): ModuleExercise {
  return {
    id: "ex-1",
    canonicalId: "EX-TEST-01",
    type: "single_choice",
    prompt: "Pick greeting",
    options: ["Dzień dobry", "Cześć"],
    correctIndex: 0,
    conceptIds: ["PRAG-PAN-01"],
    feedback: {
      correct: "Yes — Dzień dobry fits a stranger.",
      incorrect: "Cześć is too familiar here.",
      l1Notes: {
        ukr: "UKR note",
        rus: "RUS note",
        bel: "BEL note",
      },
      evidenceWeight: 1,
    },
    retryPolicy: "unlimited",
  };
}

describe("evaluateAnswer feedback selection", () => {
  it("returns correct explanation on right answer", () => {
    const result = evaluateAnswer(
      sampleChoice(),
      { type: "single_choice", index: 0 },
      { l1: "rus" },
    );
    expect(result.correct).toBe(true);
    expect(result.explanation).toContain("Dzień dobry");
    expect(result.l1Note).toBe("RUS note");
  });

  it("returns incorrect explanation + L1 on wrong answer", () => {
    const result = evaluateAnswer(
      sampleChoice(),
      { type: "single_choice", index: 1 },
      { l1: "ukr" },
    );
    expect(result.correct).toBe(false);
    expect(result.explanation).toContain("Cześć");
    expect(result.l1Note).toBe("UKR note");
  });

  it("selects bel L1 note when profile is bel", () => {
    const result = evaluateAnswer(
      sampleChoice(),
      { type: "single_choice", index: 1 },
      { l1: "bel" },
    );
    expect(result.l1Note).toBe("BEL note");
  });

  it("omits l1Note when L1 missing", () => {
    const result = evaluateAnswer(sampleChoice(), {
      type: "single_choice",
      index: 1,
    });
    expect(result.l1Note).toBeUndefined();
  });

  it("falls back to legacy explanation field", () => {
    const ex: ModuleExercise = {
      ...sampleChoice(),
      feedback: {
        correct: "",
        incorrect: "",
        explanation: "legacy only",
        evidenceWeight: 1,
      },
    };
    // Empty correct/incorrect → explanation fallback
    const ok = evaluateAnswer(ex, { type: "single_choice", index: 0 });
    const bad = evaluateAnswer(ex, { type: "single_choice", index: 1 });
    expect(ok.explanation).toBe("legacy only");
    expect(bad.explanation).toBe("legacy only");
  });
});

describe("YAML loader preserves incorrect feedback", () => {
  it("maps correct and incorrect separately", () => {
    const mods = loadAllModulesFromYaml();
    const first = mods[0]?.exercises[0];
    expect(first).toBeTruthy();
    expect(first!.feedback.correct.length).toBeGreaterThan(0);
    expect(first!.feedback.incorrect.length).toBeGreaterThan(0);
    expect(first!.feedback.correct).not.toBe(first!.feedback.incorrect);
  });
});

describe("draftLessonToDetail structured steps", () => {
  it("emits dialogue / key_lines / grammar kinds instead of theory walls", () => {
    const mods = loadAllModulesFromYaml();
    const mod = mods.find((m) => m.id === "pierwsze-spotkanie") ?? mods[0]!;
    const lesson = mod.lessons[0]!;
    const detail = draftLessonToDetail(mod, lesson, "rus");
    const kinds = new Set(detail.steps.map((s) => s.kind));
    expect(kinds.has("dialogue")).toBe(true);
    expect(kinds.has("key_lines")).toBe(true);
    expect(kinds.has("grammar") || kinds.has("pan_pani")).toBe(true);
    const dialogue = detail.steps.find((s) => s.kind === "dialogue");
    expect(dialogue && dialogue.kind === "dialogue" && dialogue.turns.length).toBeGreaterThan(0);
  });

  it("includes speaking_practice on Pierwsze spotkanie lesson 01", () => {
    const mods = loadAllModulesFromYaml();
    const mod = mods.find((m) => m.id === "pierwsze-spotkanie")!;
    const lesson = mod.lessons[0]!;
    const detail = draftLessonToDetail(mod, lesson, "ukr");
    const speaking = detail.steps.find((s) => s.kind === "speaking_practice");
    expect(speaking && speaking.kind === "speaking_practice").toBe(true);
    if (speaking && speaking.kind === "speaking_practice") {
      expect(speaking.lines.length).toBeGreaterThan(0);
    }
  });

  it("uses section titles for practice exercises — not sliced prompts", () => {
    const mods = loadAllModulesFromYaml();
    const mod = mods.find((m) => m.id === "pierwsze-spotkanie")!;
    const lesson = mod.lessons[0]!;
    const detail = draftLessonToDetail(mod, lesson, "rus");
    const exercises = detail.steps.filter((s) => s.kind === "exercise");
    expect(exercises.length).toBeGreaterThan(0);
    for (const step of exercises) {
      expect(step.kind).toBe("exercise");
      if (step.kind !== "exercise") continue;
      // Must not mid-truncate the learner prompt into the step h2.
      expect(["Практика", "Короткая проверка"]).toContain(step.title);
      expect(step.exercise.prompt.startsWith(step.title)).toBe(false);
      expect(step.title.endsWith("разгов")).toBe(false);
    }
  });
});

describe("closed-beta DRAFT flag", () => {
  it("enables draft learning via BETA_ALLOW_DRAFT without DEMO_PREVIEW", () => {
    const prev = {
      BETA_ALLOW_DRAFT: process.env.BETA_ALLOW_DRAFT,
      CLOSED_BETA_PREVIEW: process.env.CLOSED_BETA_PREVIEW,
      ALLOW_DRAFT_PREVIEW: process.env.ALLOW_DRAFT_PREVIEW,
      DEMO_PREVIEW: process.env.DEMO_PREVIEW,
      DEMO_MODE: process.env.DEMO_MODE,
    };
    try {
      process.env.BETA_ALLOW_DRAFT = "true";
      delete process.env.CLOSED_BETA_PREVIEW;
      delete process.env.ALLOW_DRAFT_PREVIEW;
      process.env.DEMO_PREVIEW = "false";
      process.env.DEMO_MODE = "false";
      expect(isClosedBetaDraftEnv()).toBe(true);
      expect(isDraftLearningEnvEnabled()).toBe(true);
      expect(
        canAccessDraftContent({
          roles: ["learner", "previewer"],
          isPreviewEnv: isDraftLearningEnvEnabled(),
        }),
      ).toBe(true);
      expect(
        canAccessDraftContent({
          roles: ["learner"],
          isPreviewEnv: isDraftLearningEnvEnabled(),
        }),
      ).toBe(false);
    } finally {
      for (const [k, v] of Object.entries(prev)) {
        if (v === undefined) delete process.env[k];
        else process.env[k] = v;
      }
    }
  });
});
