import type { LearnerExercise } from "@/lib/content/learner-dto";
import type { LearnerL1 } from "@/lib/enums";

export type ContentStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "ARCHIVED"
  | "REJECTED";

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

export type LearnerDialogueTurn = {
  speaker: string;
  pl: string;
  gloss?: string;
};

export type LearnerKeyLine = {
  pl: string;
  explanation: string;
  l1Note?: string;
};

/**
 * Learner-safe lesson steps — never include answer keys.
 * Exercise steps carry LearnerExercise whitelist DTOs only.
 */
export type LessonStep =
  | {
      id: string;
      kind: "theory";
      title: string;
      body: string;
    }
  | {
      id: string;
      kind: "dialogue";
      title: string;
      turns: LearnerDialogueTurn[];
    }
  | {
      id: string;
      kind: "key_lines";
      title: string;
      lines: LearnerKeyLine[];
    }
  | {
      id: string;
      kind: "pan_pani";
      title: string;
      summary: string;
      form?: string;
      examples?: string[];
      l1Note?: string;
    }
  | {
      id: string;
      kind: "grammar";
      title: string;
      summary: string;
      form?: string;
      meaning?: string;
      use?: string;
      examples: string[];
      l1Note?: string;
    }
  | {
      id: string;
      kind: "exercise";
      title: string;
      exercise: LearnerExercise;
    };

export type LessonDetail = {
  id: string;
  moduleId: string;
  title: string;
  sortOrder: number;
  /** Profile L1 used when mapping notes into steps. */
  l1?: LearnerL1;
  steps: LessonStep[];
};

export type ConceptMastery = {
  conceptId: string;
  label: string;
  status: "mastered" | "emerging" | "not_started";
};

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
