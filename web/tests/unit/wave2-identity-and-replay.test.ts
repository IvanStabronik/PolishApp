import { describe, expect, it } from "vitest";
import {
  resolveAttemptLessonTitle,
  uiLocaleToConceptLabelLocale,
} from "@/lib/content/lesson-titles";
import { humanConceptLabel } from "@/lib/content/concept-labels";
import { evaluationFromStoredResponse } from "@/modules/learning/persist-attempt";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import type { ListeningExercise } from "@/lib/content/types";

describe("attempt lesson titles", () => {
  it("resolves Pierwsze spotkanie lesson title from lessonId", () => {
    const title = resolveAttemptLessonTitle({
      lessonId: "LES-A1-PS-01",
      moduleId: "pierwsze-spotkanie",
      exerciseCanonicalId: "EX-A1-PS-SC-01",
    });
    expect(title).toMatch(/Powitanie|przedstawienie/i);
    expect(title.startsWith("EX-")).toBe(false);
  });

  it("never leads with EX- when only exercise id is present", () => {
    const title = resolveAttemptLessonTitle({
      exerciseCanonicalId: "EX-A1-PS-SC-01",
      moduleId: "pierwsze-spotkanie",
    });
    expect(title.startsWith("EX-")).toBe(false);
    expect(title.length).toBeGreaterThan(3);
  });

  it("maps ui locales for concept labels", () => {
    expect(uiLocaleToConceptLabelLocale("uk")).toBe("uk");
    expect(uiLocaleToConceptLabelLocale("pl-PL")).toBe("pl");
    expect(uiLocaleToConceptLabelLocale("ru")).toBe("ru");
    expect(humanConceptLabel("PRAG-PAN-01", "uk")).toMatch(/pan/i);
    expect(humanConceptLabel("PRAG-PAN-01", "uk")).not.toBe("PRAG-PAN-01");
  });

  it("never returns raw GR-/FN- IDs as primary labels", () => {
    expect(humanConceptLabel("GR-CAS-NOM-01", "ru")).not.toBe("GR-CAS-NOM-01");
    expect(humanConceptLabel("FN-A1-IDENTIFY-01", "pl")).not.toBe(
      "FN-A1-IDENTIFY-01",
    );
    expect(humanConceptLabel("GR-UNKNOWN-99", "ru")).not.toMatch(/^GR-/);
  });
});

describe("idempotent replay preserves l1Note", () => {
  it("reads l1Note from stored evaluation blob", () => {
    const evalResult = evaluationFromStoredResponse(
      {
        evaluation: {
          correct: false,
          explanation: "Wrong greeting",
          l1Note: "UKR note here",
          evidenceWeight: 1,
          conceptId: "PRAG-PAN-01",
        },
      },
      false,
    );
    expect(evalResult?.l1Note).toBe("UKR note here");
    expect(evalResult?.correct).toBe(false);
  });
});

describe("listening exercise evaluation", () => {
  const listening: ListeningExercise = {
    id: "ex-ps-listen-01",
    canonicalId: "EX-A1-PS-LIS-01",
    type: "listening",
    prompt: "Listen",
    audioTextPl: "Nazywam się Marek Nowak. A pani?",
    options: ["name", "bye", "coffee"],
    correctIndex: 0,
    conceptIds: ["GR-CAS-NOM-01"],
    feedback: {
      correct: "ok",
      incorrect: "no",
      evidenceWeight: 0.6,
    },
    retryPolicy: "unlimited",
  };

  it("scores listening like single choice by index", () => {
    expect(
      evaluateAnswer(listening, { type: "listening", index: 0 }).correct,
    ).toBe(true);
    expect(
      evaluateAnswer(listening, { type: "listening", index: 1 }).correct,
    ).toBe(false);
  });
});
