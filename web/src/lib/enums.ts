/** Shared enums — UI locale ≠ learner L1 */
export const UI_LOCALES = ["ru", "uk", "pl", "be"] as const;
export type UiLocale = (typeof UI_LOCALES)[number];

export const LEARNER_L1 = ["ukr", "rus", "bel"] as const;
export type LearnerL1 = (typeof LEARNER_L1)[number];

/** Default menu language for a learner L1 — BEL prefers `be`, not RU. */
export function preferredUiLocaleForL1(l1: LearnerL1): UiLocale {
  if (l1 === "ukr") return "uk";
  if (l1 === "bel") return "be";
  return "ru";
}

export const CONTENT_STATUSES = [
  "DRAFT",
  "IN_REVIEW",
  "APPROVED",
  "PUBLISHED",
  "REJECTED",
  "ARCHIVED",
] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const MASTERY_STATES = [
  "NOT_STARTED",
  "LEARNING",
  "PRACTICING",
  "DEMONSTRATED",
  "MASTERED",
  "REVIEW_DUE",
] as const;
export type MasteryState = (typeof MASTERY_STATES)[number];

export const EXERCISE_TYPES = [
  "single_choice",
  "multiple_choice",
  "gap_fill",
  "ordering",
  "listening",
] as const;
export type ExerciseType = (typeof EXERCISE_TYPES)[number];

export const USER_ROLES = [
  "learner",
  "previewer",
  "author",
  "reviewer",
  "admin",
] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const CONCEPT_KINDS = [
  "grammar",
  "phonology",
  "orthography",
  "pragmatics",
  "lexis",
  "other",
] as const;
export type ConceptKind = (typeof CONCEPT_KINDS)[number];
