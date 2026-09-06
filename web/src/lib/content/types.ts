import { LEARNER_L1, type ContentStatus, type LearnerL1 } from "@/lib/enums";

/**
 * Server-only authored exercise types (answer keys included).
 * Never pass ModuleExercise to client components — use LearnerExercise via toLearnerExercise().
 */

export type DialogueTurn = {
  speaker: string;
  pl: string;
  glossRu: string;
};

export type KeyLine = {
  pl: string;
  explanation: string;
  l1Notes?: Partial<Record<LearnerL1, string>>;
};

export type ExerciseFeedback = {
  explanation: string;
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

export type DraftModule = {
  id: string;
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
  dialogue: DialogueTurn[];
  keyLines: KeyLine[];
  pragmatics: {
    panPani: string;
    l1Notes?: Partial<Record<LearnerL1, string>>;
  };
  grammar: {
    title: string;
    explanation: string;
    examples: string[];
    conceptId: string;
    l1Notes?: Partial<Record<LearnerL1, string>>;
  };
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
