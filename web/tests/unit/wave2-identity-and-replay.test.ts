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
import {
  localizeHallLabel,
  localizeInstructionalBody,
} from "@/lib/content/instructional-body-locale";
import {
  localizeExerciseFeedback,
  localizeExercisePrompt,
} from "@/lib/content/exercise-chrome-locale";
import { draftLessonToDetail } from "@/modules/content/draft-lesson-to-detail";
import { evaluateAnswer } from "@/modules/assessment/evaluate";
import { loadAllModulesFromYaml } from "@/lib/content/load-module";
import { evaluationFromStoredResponse } from "@/modules/learning/persist-attempt";
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

describe("UK/BEL instructional body chrome", () => {
  it("localizes hall situation/objective for ukr and bel", () => {
    const situation =
      "Сосед на кладке или знакомый коллеги — первый короткий разговор со взрослым человеком в Польше. Нужно поздороваться нормально, назвать себя и сказать, откуда вы.";
    expect(localizeInstructionalBody(situation, "ukr")).toMatch(/Сусід|клітці/);
    expect(localizeInstructionalBody(situation, "bel")).toMatch(/Сусід|клетцы/);
    expect(localizeInstructionalBody(situation, "rus")).toBe(situation);
  });

  it("localizes café objective and leaves unknown RU intact", () => {
    const objective =
      "Поздороваться, заказать Poproszę… (+ Acc), спросить Czy jest…?, спросить Ile płacę? и оплатить kartą — на pan/pani, не на ty.";
    expect(localizeInstructionalBody(objective, "ukr")).toMatch(/Привітатися|замовити/);
    expect(localizeInstructionalBody(objective, "bel")).toMatch(/Павітацца|заказаць/);
    expect(localizeInstructionalBody("Неизвестная строка без карты", "ukr")).toBe(
      "Неизвестная строка без карты",
    );
  });

  it("localizes hall word in hub label", () => {
    expect(localizeHallLabel("Зал 1 · Pierwsze spotkanie", "ukr")).toMatch(
      /^Зала 1/,
    );
    expect(localizeHallLabel("Зал 2 · W kawiarni", "bel")).toMatch(/^Зала 2/);
    expect(localizeHallLabel("Зал 3 · W sklepie", "rus")).toBe(
      "Зал 3 · W sklepie",
    );
  });

  it("localizes café/sklep/urząd theory beyond situation (key line + pan + grammar)", () => {
    const keyLine =
      "Обычный заказ: Poproszę + винительный (Biernik). Не переводите «дайте мне» как резкое *Daj mi… к незнакомцу за стойкой.";
    expect(localizeInstructionalBody(keyLine, "ukr")).toMatch(
      /замовлення|знахідний/,
    );
    expect(localizeInstructionalBody(keyLine, "bel")).toMatch(
      /заказ|вінавальны/,
    );

    const pan =
      "К кассиру-незнакомцу по умолчанию — pan/pani и спокойный сервисный тон: Poproszę…, Ile to kosztuje?, Dziękuję. Форма ty и резкое *Daj… — не к незнакомцу у кассы.";
    expect(localizeInstructionalBody(pan, "ukr")).toMatch(/касира|замовчуванням/);
    expect(localizeInstructionalBody(pan, "bel")).toMatch(/касіра|змаўчанні/);

    const grammar =
      "Два коротких куска у окошка: цель визита (w sprawie + Gen) и документы (Oto…, prośba o formularz).";
    expect(localizeInstructionalBody(grammar, "ukr")).toMatch(/віконця|мета/);
    expect(localizeInstructionalBody(grammar, "bel")).toMatch(/акенца|мэта/);
  });

  it("covers all curated theory-extra RU keys for ukr and bel", async () => {
    const { THEORY_EXTRA_UK, THEORY_EXTRA_BEL } = await import(
      "@/lib/content/instructional-theory-extra"
    );
    const keys = Object.keys(THEORY_EXTRA_UK);
    expect(keys.length).toBeGreaterThanOrEqual(100);
    expect(Object.keys(THEORY_EXTRA_BEL).length).toBe(keys.length);
    for (const ru of keys) {
      expect(localizeInstructionalBody(ru, "ukr")).toBe(THEORY_EXTRA_UK[ru]);
      expect(localizeInstructionalBody(ru, "bel")).toBe(THEORY_EXTRA_BEL[ru]);
      expect(localizeInstructionalBody(ru, "ukr")).not.toBe(ru);
      expect(localizeInstructionalBody(ru, "bel")).not.toBe(ru);
    }
  });
});

describe("UK/BEL exercise prompt + feedback chrome", () => {
  it("localizes PS and café prompts for ukr L1 and UK UI", () => {
    const ps =
      "Сосед на кlatce, день. Вы видите его впервые. Чем открыть разговор?";
    expect(localizeExercisePrompt(ps, "ukr")).toMatch(/Сусід|відкрити/);
    expect(localizeExercisePrompt(ps, "bel")).toMatch(/Сусед|адкрыць/);
    expect(localizeExercisePrompt(ps, "rus")).toBe(ps);

    const cafe =
      "У стойки, первый контакт. Как спокойно заказать кофе?";
    expect(localizeExercisePrompt(cafe, "rus", "uk")).toMatch(
      /стійки|замовити/,
    );
  });

  it("localizes correct/incorrect feedback and leaves unknown RU intact", () => {
    const correct =
      "Да. Dzień dobry — спокойное дневное приветствие для незнакомца.";
    expect(localizeExerciseFeedback(correct, "ukr")).toMatch(/Так\.|спокійне/);
    expect(localizeExerciseFeedback(correct, "bel")).toMatch(/Так\.|спакойнае/);
    expect(
      localizeExerciseFeedback("Неизвестная строка без карты", "ukr"),
    ).toBe("Неизвестная строка без карты");
  });

  it("BEL feedback stays distinct Belarusian (no RU slurry)", () => {
    const samples = [
      "Нужен предлог z: Jestem z…",
      "Сначала поздороваться, потом имена, потом вежливо закрыть.",
      "Это представление (Nazywam się… A pani?), не прощание и не вопрос «откуда».",
      "Количество, цена и paragon — нужные куски у кассы.",
      "Cześć слишком своё; Witam serdecznie — канцелярски/письменно, не для кlatki.",
    ];
    for (const ru of samples) {
      const bel = localizeExerciseFeedback(ru, "bel");
      expect(bel).not.toBe(ru);
      expect(bel).not.toMatch(
        /слишком|сначала|Нужен |Это |Количество|прощание|своё/,
      );
      expect(bel).toMatch(
        /Патрэбн|Спачатку|Гэта |Колькасць|развітанне|занадта|сваё/,
      );
    }
  });

  it("draftLessonToDetail surfaces UK exercise prompts", () => {
    const mods = loadAllModulesFromYaml();
    const ps = mods.find((m) => m.id.includes("pierwsze-spotkanie"));
    expect(ps).toBeTruthy();
    const lesson = ps!.lessons[0]!;
    const detail = draftLessonToDetail(ps!, lesson, "ukr", "uk");
    const exStep = detail.steps.find((s) => s.kind === "exercise");
    expect(exStep?.kind).toBe("exercise");
    if (exStep?.kind === "exercise") {
      expect(exStep.exercise.prompt).not.toMatch(/^Сосед на к/);
      expect(exStep.exercise.prompt).toMatch(
        /Сусід|Як |Позначте|Доповніть|Послухайте/,
      );
    }
  });

  it("draftLessonToDetail surfaces BEL exercise prompts", () => {
    const mods = loadAllModulesFromYaml();
    const ps = mods.find((m) => m.id.includes("pierwsze-spotkanie"));
    expect(ps).toBeTruthy();
    const detail = draftLessonToDetail(ps!, ps!.lessons[0]!, "bel", "ru");
    const exStep = detail.steps.find((s) => s.kind === "exercise");
    expect(exStep?.kind).toBe("exercise");
    if (exStep?.kind === "exercise") {
      expect(exStep.exercise.prompt).toMatch(
        /Сусед|Як |Пазначце|Дапоўніце|Паслухайце/,
      );
    }
  });

  it("evaluateAnswer returns UK feedback when L1 is ukr", () => {
    const mods = loadAllModulesFromYaml();
    const ps = mods.find((m) => m.id.includes("pierwsze-spotkanie"));
    const ex = ps!.lessons[0]!.exercises.find((e) => e.type === "single_choice");
    expect(ex).toBeTruthy();
    if (!ex || ex.type !== "single_choice") throw new Error("expected SC");
    const result = evaluateAnswer(
      ex,
      { type: "single_choice", index: ex.correctIndex },
      { l1: "ukr" },
    );
    expect(result.explanation).toMatch(
      /Так\.|спокійн|pani|Dzień dobry|Nazywam|Skąd/,
    );
    expect(result.explanation).not.toMatch(/^Да\./);
  });

  it("evaluateAnswer returns BEL feedback when L1 is bel", () => {
    const mods = loadAllModulesFromYaml();
    const ps = mods.find((m) => m.id.includes("pierwsze-spotkanie"));
    const ex = ps!.lessons[0]!.exercises.find((e) => e.type === "single_choice");
    expect(ex).toBeTruthy();
    if (!ex || ex.type !== "single_choice") throw new Error("expected SC");
    const result = evaluateAnswer(
      ex,
      { type: "single_choice", index: ex.correctIndex },
      { l1: "bel" },
    );
    expect(result.explanation).toMatch(
      /Так\.|спакойн|pani|Dzień dobry|Nazywam|Skąd/,
    );
    expect(result.explanation).not.toMatch(/^Да\./);
    expect(result.explanation).not.toMatch(/спокойн/);
  });

  it("all A1 correct/incorrect explanations localize for bel", () => {
    const mods = loadAllModulesFromYaml();
    let checked = 0;
    let unmapped = 0;
    for (const mod of mods) {
      for (const lesson of mod.lessons) {
        for (const ex of lesson.exercises) {
          const fb = (ex as { feedback?: { correct?: string; incorrect?: string } })
            .feedback;
          if (!fb) continue;
          for (const raw of [fb.correct, fb.incorrect]) {
            if (!raw) continue;
            checked++;
            const bel = localizeExerciseFeedback(raw, "bel");
            if (bel === raw) unmapped++;
          }
        }
      }
    }
    expect(checked).toBeGreaterThan(200);
    expect(unmapped).toBe(0);
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
