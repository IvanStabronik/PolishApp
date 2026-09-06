import type { LearnerExercise } from "@/lib/content/learner-dto";

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
      kind: "exercise";
      title: string;
      exercise: LearnerExercise;
    };

export type LessonDetail = {
  id: string;
  moduleId: string;
  title: string;
  sortOrder: number;
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
