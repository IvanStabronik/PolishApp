import { describe, expect, it } from "vitest";
import {
  resolveAttemptLessonTitle,
  uiLocaleToConceptLabelLocale,
} from "@/lib/content/lesson-titles";
import { humanConceptLabel, resolveConceptLabelLocale } from "@/lib/content/concept-labels";
import {
  clearCurriculumTitleCache,
  curriculumTitleFor,
  isUsableCurriculumTitle,
} from "@/lib/content/curriculum-labels";
import {
  serializeLearnerExercise,
  toLearnerExercise,
} from "@/lib/content/learner-dto";
import {
  localizeSpeakingPrompt,
  localizeStepTitle,
  resolveStepChromeLang,
} from "@/lib/content/step-title-locale";
import { evaluationFromStoredResponse } from "@/modules/learning/persist-attempt";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import { ensureOpenLessonSession } from "@/modules/learning/lesson-session";
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
    expect(uiLocaleToConceptLabelLocale("be")).toBe("be");
    expect(humanConceptLabel("PRAG-PAN-01", "uk")).toMatch(/pan/i);
    expect(humanConceptLabel("PRAG-PAN-01", "uk")).not.toBe("PRAG-PAN-01");
    expect(humanConceptLabel("PRAG-PAN-01", "be")).toMatch(/pan/i);
    expect(humanConceptLabel("FN-A1-GREET-01", "be")).toMatch(/Прывітацца|папрашчацца/i);
  });

  it("never returns raw GR-/FN- IDs or markdown junk as primary labels", () => {
    clearCurriculumTitleCache();
    expect(humanConceptLabel("GR-CAS-NOM-01", "ru")).not.toBe("GR-CAS-NOM-01");
    expect(humanConceptLabel("FN-A1-IDENTIFY-01", "pl")).not.toBe(
      "FN-A1-IDENTIFY-01",
    );
    expect(humanConceptLabel("FN-A1-DIRECT-01", "ru")).not.toMatch(/\*\*/);
    expect(humanConceptLabel("FN-A1-DIRECT-01", "ru")).not.toMatch(/^FN-/);
    expect(humanConceptLabel("FN-A1-PURPOSE-01", "ru")).not.toContain("**ID:**");
    expect(humanConceptLabel("GR-UNKNOWN-99", "ru")).not.toMatch(/^GR-/);
    const sot = curriculumTitleFor("FN-A1-IDENTIFY-01", "pl");
    expect(sot).toBeTruthy();
    expect(sot).not.toContain("**");
    expect(isUsableCurriculumTitle(sot!, "FN-A1-IDENTIFY-01")).toBe(true);
    // UK/BEL must not fall back to Russian SoT titles
    expect(curriculumTitleFor("FN-A1-IDENTIFY-01", "uk")).toBeNull();
    expect(curriculumTitleFor("FN-A1-IDENTIFY-01", "be")).toBeNull();
    expect(humanConceptLabel("GR-UNKNOWN-99", "uk")).not.toMatch(/Грамматическ/i);
    expect(humanConceptLabel("GR-UNKNOWN-99", "be")).toMatch(/Граматычн|Тэма/i);
  });

  it("resolves concept label locale from L1 (BEL first-class)", () => {
    expect(resolveConceptLabelLocale({ uiLocale: "ru", l1: "bel" })).toBe("be");
    expect(resolveConceptLabelLocale({ uiLocale: "ru", l1: "ukr" })).toBe("uk");
    expect(resolveConceptLabelLocale({ uiLocale: "uk", l1: "rus" })).toBe("uk");
  });
});

describe("UK/BEL step title fallback", () => {
  it("localizes common step titles for ukr/bel L1", () => {
    expect(localizeStepTitle("Ситуация", "ukr")).toBe("Ситуація");
    expect(localizeStepTitle("Диалог", "bel")).toBe("Дыялог");
    expect(localizeStepTitle("Ситуация", "rus")).toBe("Ситуация");
  });

  it("uses UK chrome when UI is uk even if L1 is rus", () => {
    expect(resolveStepChromeLang("rus", "uk")).toBe("uk");
    expect(localizeStepTitle("Практика", "rus", "uk")).toBe("Практика");
    expect(
      localizeSpeakingPrompt(
        "Скажите заказ вслух. Распознавание — ориентир, не экзамен.",
        "rus",
        "uk",
      ),
    ).toMatch(/замовлення|вголос/);
  });

  it("localizes speaking prompts for bel L1", () => {
    expect(
      localizeSpeakingPrompt(
        "Скажите реплику вслух. Распознавание — ориентир, не экзамен и не оценка.",
        "bel",
      ),
    ).toMatch(/ўголас|рэпліку/);
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

describe("listening exercise evaluation + learner DTO integrity", () => {
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

  it("does not ship audioTextPl on learner DTO", () => {
    const dto = toLearnerExercise(listening);
    expect(dto.type).toBe("listening");
    if (dto.type === "listening") {
      expect(dto.hasTtsStimulus).toBe(true);
      expect("audioTextPl" in dto).toBe(false);
    }
    const json = serializeLearnerExercise(dto);
    expect(json).not.toContain("audioTextPl");
    expect(json).not.toContain("Nazywam się");
  });
});

describe("ensureOpenLessonSession export", () => {
  it("exports ensure helper for attempt/page race harden", () => {
    expect(typeof ensureOpenLessonSession).toBe("function");
  });
});
