import { pgEnum, timestamp } from "drizzle-orm/pg-core";
import {
  CONTENT_STATUSES,
  CONCEPT_KINDS,
  LEARNER_L1,
  MASTERY_STATES,
  UI_LOCALES,
  USER_ROLES,
} from "@/lib/enums";

/** UI shell locale (next-intl). Not the same as L1. */
export const uiLocaleEnum = pgEnum("ui_locale", [...UI_LOCALES]);

/**
 * Methodological L1 (error bank / explanations).
 * Product codes: ukr | rus | bel — enums.ts is source of truth (not uk|ru|be).
 */
export const l1Enum = pgEnum("l1", [...LEARNER_L1]);

export const appRoleEnum = pgEnum("app_role", [...USER_ROLES]);

/** Content version lifecycle (ADR-004). */
export const contentStatusEnum = pgEnum("content_status", [
  ...CONTENT_STATUSES,
]);

export const contentKindEnum = pgEnum("content_kind", [
  "level",
  "module",
  "lesson",
  "lesson_step",
  "concept",
  "function",
  "scenario",
  "lexical_bundle",
  "exercise",
  "dialogue",
  "grammar_point",
  "other",
]);

export const conceptKindEnum = pgEnum("concept_kind", [...CONCEPT_KINDS]);

/** Mastery states from web/src/lib/enums.ts / ADR-006. */
export const masteryStateEnum = pgEnum("mastery_state", [...MASTERY_STATES]);

export const attemptModeEnum = pgEnum("attempt_mode", [
  "formative",
  "summative",
  "preview",
]);

export const evidenceResultEnum = pgEnum("evidence_result", [
  "correct",
  "incorrect",
  "partial",
  "pending",
]);

export const reviewDecisionEnum = pgEnum("review_decision", [
  "approve",
  "reject",
]);

export const exerciseTypeEnum = pgEnum("exercise_type", [
  "single_choice",
  "multiple_choice",
  "gap_fill",
  "ordering",
]);

/** Shared created_at / updated_at columns for curriculum & content tables. */
export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};
