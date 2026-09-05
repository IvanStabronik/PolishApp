export type ContentStatus = "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED";

export type LoreLabel = {
  hall: number;
  loreTitle: string;
  academicCode: string;
};

export type ModuleSummary = {
  id: string;
  status: ContentStatus;
  lore: LoreLabel;
  titlePl: string;
  summary: string;
  lessonIds: string[];
};

export type LessonStep =
  | {
      id: string;
      kind: "theory";
      title: string;
      body: string;
    }
  | {
      id: string;
      kind: "exercise";
      title: string;
      promptPl: string;
      promptUiKey?: string;
      options: { id: string; label: string }[];
      correctOptionId: string;
      feedbackCorrect: string;
      feedbackIncorrect: string;
      conceptId: string;
    };

export type LessonDetail = {
  id: string;
  moduleId: string;
  title: string;
  steps: LessonStep[];
};

export type ConceptMastery = {
  conceptId: string;
  label: string;
  status: "mastered" | "emerging" | "not_started";
};

const MODULE_PIERWSZE: ModuleSummary = {
  id: "mod-pierwsze-spotkanie",
  status: "DRAFT",
  lore: {
    hall: 1,
    loreTitle: "Знакомство",
    academicCode: "A1",
  },
  titlePl: "Pierwsze spotkanie",
  summary:
    "Przedstawianie się, powitania i podstawowy rejestr pan/pani — pierwszy hall Archiwum.",
  lessonIds: ["les-powitanie", "les-przedstawienie"],
};

const LESSONS: Record<string, LessonDetail> = {
  "les-powitanie": {
    id: "les-powitanie",
    moduleId: MODULE_PIERWSZE.id,
    title: "Powitanie",
    steps: [
      {
        id: "th-1",
        kind: "theory",
        title: "Dzień dobry",
        body: "W formalnym kontakcie z dorosłymi w Polsce używamy *Dzień dobry* oraz form *pan / pani*. To nie jest gra — to norma rejestru.",
      },
      {
        id: "ex-1",
        kind: "exercise",
        title: "Wybór powitania",
        promptPl: "W urzędzie mówisz do urzędniczki. Co powiesz?",
        options: [
          { id: "a", label: "Cześć!" },
          { id: "b", label: "Dzień dobry, pani." },
          { id: "c", label: "Hejka" },
        ],
        correctOptionId: "b",
        feedbackCorrect:
          "Tak. W urzędzie wybieramy formalne powitanie i formę pani.",
        feedbackIncorrect:
          "W urzędzie potrzebny jest rejestr formalny: Dzień dobry + pan/pani.",
        conceptId: "REG-A1-01",
      },
      {
        id: "ex-2",
        kind: "exercise",
        title: "Forma zwrotu",
        promptPl: "Uzupełnij: «Przepraszam, ___ Kowalska, czy to pani biurko?»",
        options: [
          { id: "a", label: "pani" },
          { id: "b", label: "ty" },
          { id: "c", label: "wy" },
        ],
        correctOptionId: "a",
        feedbackCorrect: "Poprawnie — zwrot pani w kontekście formalnym.",
        feedbackIncorrect:
          "W formalnym kontekście używamy pan / pani, nie ty.",
        conceptId: "ADDR-A1-01",
      },
    ],
  },
  "les-przedstawienie": {
    id: "les-przedstawienie",
    moduleId: MODULE_PIERWSZE.id,
    title: "Przedstawienie się",
    steps: [
      {
        id: "th-2",
        kind: "theory",
        title: "Nazywam się…",
        body: "Podstawowy schemat: *Nazywam się…* / *Jestem…* + imię. Unikamy kalk z L1 typu «ja jestem nazywać».",
      },
      {
        id: "ex-3",
        kind: "exercise",
        title: "Przedstawienie",
        promptPl: "Jak poprawnie przedstawisz się na spotkaniu?",
        options: [
          { id: "a", label: "Ja nazywać Olena." },
          { id: "b", label: "Nazywam się Olena." },
          { id: "c", label: "Moje imię jest Olena być." },
        ],
        correctOptionId: "b",
        feedbackCorrect: "Wzorzec: Nazywam się + imię.",
        feedbackIncorrect:
          "Unikaj kalki z L1. Kanoniczny wzorzec: Nazywam się…",
        conceptId: "ID-A1-01",
      },
    ],
  },
};

const CONCEPTS: ConceptMastery[] = [
  { conceptId: "REG-A1-01", label: "Rejestr pan/pani", status: "emerging" },
  { conceptId: "ADDR-A1-01", label: "Formy zwrotu", status: "not_started" },
  { conceptId: "ID-A1-01", label: "Przedstawianie się", status: "not_started" },
];

export function dualModuleLabel(
  lore: LoreLabel,
  loreTemplate: string,
  academicTemplate: string,
): { lore: string; academic: string; combined: string } {
  const loreText = loreTemplate
    .replace("{hall}", String(lore.hall))
    .replace("{loreTitle}", lore.loreTitle);
  const academic = academicTemplate.replace("{code}", lore.academicCode);
  return {
    lore: loreText,
    academic,
    combined: `${loreText} / ${academic}`,
  };
}

/** Local mock content — swap for `@/modules/content` when domain lands. */
export const mockContent = {
  listA1Modules(includeDraft: boolean): ModuleSummary[] {
    if (includeDraft) return [MODULE_PIERWSZE];
    return MODULE_PIERWSZE.status === "PUBLISHED" ? [MODULE_PIERWSZE] : [];
  },
  getModule(id: string): ModuleSummary | undefined {
    if (id === MODULE_PIERWSZE.id) return MODULE_PIERWSZE;
    return undefined;
  },
  getLesson(id: string): LessonDetail | undefined {
    return LESSONS[id];
  },
  listLessonsForModule(moduleId: string): LessonDetail[] {
    return Object.values(LESSONS).filter((l) => l.moduleId === moduleId);
  },
};

export const mockProgress = {
  listConcepts(): ConceptMastery[] {
    return CONCEPTS;
  },
  recentAttempts() {
    return [
      {
        id: "att-1",
        lessonTitle: "Powitanie",
        result: "correct" as const,
        at: "2026-09-05",
      },
    ];
  },
};
