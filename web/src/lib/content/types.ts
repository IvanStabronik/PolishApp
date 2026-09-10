import { LEARNER_L1, type ContentStatus, type LearnerL1 } from "@/lib/enums";

/**
 * Server-only authored exercise types (answer keys included).
 * Never pass ModuleExercise to client components — use LearnerExercise via toLearnerExercise().
 */

export type DialogueTurn = {
  speaker: string;
  pl: string;
  glossRu: string;
  audioUrl?: string;
};

export type KeyLine = {
  pl: string;
  explanation: string;
  l1Notes?: Partial<Record<LearnerL1, string>>;
  audioUrl?: string;
};

export type ExerciseFeedback = {
  /** Explanation shown after a correct answer. */
  correct: string;
  /** Explanation shown after an incorrect answer. */
  incorrect: string;
  /**
   * @deprecated Prefer `correct` / `incorrect`. Kept for older fixtures;
   * evaluate falls back when correct/incorrect are absent.
   */
  explanation?: string;
  l1Notes?: Partial<Record<LearnerL1, string>>;
  conceptId?: string;
  evidenceWeight: number;
};

type ExerciseBase = {
  id: string;
  /** Curriculum business key (EX-…); used for DB resolution. */
  canonicalId?: string;
  prompt: string;
  conceptIds: string[];
  feedback: ExerciseFeedback;
  retryPolicy: string;
};

/** @server-only — contains correctIndex */
export type SingleChoiceExercise = ExerciseBase & {
  type: "single_choice";
  options: string[];
  correctIndex: number;
};

/** @server-only — contains correctIndices */
export type MultipleChoiceExercise = ExerciseBase & {
  type: "multiple_choice";
  options: string[];
  correctIndices: number[];
};

/**
 * @server-only — `gaps` holds accepted answers for evaluation (not learner UI).
 */
export type GapFillExercise = ExerciseBase & {
  type: "gap_fill";
  textWithGaps: string;
  /** Accepted answers per gap (server-only). */
  gaps: string[];
};

/** @server-only — contains correctOrder */
export type OrderingExercise = ExerciseBase & {
  type: "ordering";
  items: string[];
  correctOrder: number[];
};

/**
 * Server-only authored exercise union (answer keys).
 * Alias kept for evaluate / persist / YAML load paths.
 */
export type ModuleExercise =
  | SingleChoiceExercise
  | MultipleChoiceExercise
  | GapFillExercise
  | OrderingExercise;

/** Explicit alias emphasizing server-only boundary. */
export type AuthoredExercise = ModuleExercise;

/** Server-side lesson step from YAML (exercise refs only — no answer keys). */
export type DraftLessonStep =
  | {
      id: string;
      kind: "situation" | "dialogue" | "key_lines" | "pan_pani" | "grammar" | "result";
      titleRu: string;
      bodyRu?: string;
      grammarPointId?: string;
    }
  | {
      id: string;
      kind: "speaking_practice";
      titleRu: string;
      promptRu?: string;
      linesPl: string[];
    }
  | {
      id: string;
      kind: "practice" | "mini_check";
      titleRu: string;
      exerciseIds: string[];
    };

/**
 * Real Course→Module→Lesson entity (canonical LES-* id).
 * Exercises here are server-only; strip via toLearnerExercise before client.
 */
export type DraftLesson = {
  id: string;
  slug: string;
  sortOrder: number;
  titlePl: string;
  situation: string;
  objective: string;
  dialogue: DialogueTurn[];
  keyLines: KeyLine[];
  pragmatics: {
    panPani: string;
    form?: string;
    examples?: string[];
    l1Notes?: Partial<Record<LearnerL1, string>>;
  };
  grammar: {
    title: string;
    explanation: string;
    form?: string;
    meaning?: string;
    use?: string;
    examples: string[];
    conceptId: string;
    l1Notes?: Partial<Record<LearnerL1, string>>;
  };
  steps: DraftLessonStep[];
  exercises: ModuleExercise[];
  miniCheckExerciseIds: string[];
};

export type DraftModule = {
  id: string;
  canonicalId: string;
  version: string;
  title: string;
  titlePl: string;
  level: string;
  status: ContentStatus;
  hallLabel: string;
  objective: string;
  situation: string;
  uiLocales: string[];
  l1Applicability: LearnerL1[];
  /** Overview from first lesson — for module card / flat adapter. */
  dialogue: DialogueTurn[];
  keyLines: KeyLine[];
  pragmatics: {
    panPani: string;
    form?: string;
    examples?: string[];
    l1Notes?: Partial<Record<LearnerL1, string>>;
  };
  grammar: {
    title: string;
    explanation: string;
    form?: string;
    meaning?: string;
    use?: string;
    examples: string[];
    conceptId: string;
    l1Notes?: Partial<Record<LearnerL1, string>>;
  };
  /** Real lessons (exactly 3 for A1 closed-beta modules). */
  lessons: DraftLesson[];
  /**
   * Flat adapter: union of all lesson exercises in curriculum order.
   * Not a second inventory — derived from lessons[].
   */
  exercises: ModuleExercise[];
  miniCheckExerciseIds: string[];
  provenance: {
    authorId: string;
    authorName: string;
    createdAt: string;
    sources: string[];
    notes?: string;
  };
};

export function isLearnerL1(value: string): value is LearnerL1 {
  return (LEARNER_L1 as readonly string[]).includes(value);
}
