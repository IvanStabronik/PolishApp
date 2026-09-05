import { LEARNER_L1, type ContentStatus, type LearnerL1 } from "@/lib/enums";

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

export type SingleChoiceExercise = ExerciseBase & {
  type: "single_choice";
  options: string[];
  correctIndex: number;
};

export type MultipleChoiceExercise = ExerciseBase & {
  type: "multiple_choice";
  options: string[];
  correctIndices: number[];
};

export type GapFillExercise = ExerciseBase & {
  type: "gap_fill";
  textWithGaps: string;
  gaps: string[];
};

export type OrderingExercise = ExerciseBase & {
  type: "ordering";
  items: string[];
  correctOrder: number[];
};

export type ModuleExercise =
  | SingleChoiceExercise
  | MultipleChoiceExercise
  | GapFillExercise
  | OrderingExercise;

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
