import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import {
  contentVersions,
  exercises,
  lessonSteps,
  modules,
} from "./content";
import {
  attemptModeEnum,
  evidenceResultEnum,
  l1Enum,
  masteryStateEnum,
  timestamps,
  uiLocaleEnum,
} from "./enums";

export type ConsentSnapshot = {
  ageConfirmed18: boolean;
  termsAcceptedAt?: string;
  privacyAcceptedAt?: string;
  marketingOptIn?: boolean;
};

/**
 * Learner profile — 1:1 with Better Auth user.
 * ui_locale ≠ l1 (ADR-005); l1 uses ukr|rus|bel from enums.ts.
 */
export const learnerProfiles = pgTable(
  "learner_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    l1: l1Enum("l1").notNull(),
    uiLocale: uiLocaleEnum("ui_locale").notNull().default("ru"),
    level: text("level"),
    goal: text("goal"),
    weeklyGoal: integer("weekly_goal"),
    onboardingComplete: boolean("onboarding_complete").notNull().default(false),
    timezone: text("timezone").notNull().default("Europe/Warsaw"),
    /** Legacy jsonb goals blob (compat). */
    goals: jsonb("goals").$type<Record<string, unknown>>().default({}),
    /** Legacy weekly minutes target (compat). */
    weeklyMinutes: integer("weekly_minutes"),
    consents: jsonb("consents").$type<ConsentSnapshot>().notNull().default({
      ageConfirmed18: false,
    }),
    ageConfirmed18: boolean("age_confirmed_18").notNull().default(false),
    ...timestamps,
  },
  (table) => [uniqueIndex("learner_profiles_user_id_uidx").on(table.userId)],
);

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("active"),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("enrollments_learner_module_uidx").on(
      table.learnerProfileId,
      table.moduleId,
    ),
  ],
);

export const learningSessions = pgTable(
  "learning_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    moduleId: uuid("module_id").references(() => modules.id, {
      onDelete: "set null",
    }),
    startedAt: timestamp("started_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("learning_sessions_learner_profile_id_idx").on(table.learnerProfileId),
  ],
);

export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    learningSessionId: uuid("learning_session_id").references(
      () => learningSessions.id,
      { onDelete: "set null" },
    ),
    /** Nullable when attempt is against a lesson_step instead of an exercise. */
    exerciseId: uuid("exercise_id").references(() => exercises.id, {
      onDelete: "restrict",
    }),
    lessonStepId: uuid("lesson_step_id").references(() => lessonSteps.id, {
      onDelete: "restrict",
    }),
    /** Exact content version the learner saw (FUN-172). */
    contentVersionId: uuid("content_version_id")
      .notNull()
      .references(() => contentVersions.id, { onDelete: "restrict" }),
    /** Legacy single-response blob (compat); prefer attempt_answers. */
    response: jsonb("response").$type<Record<string, unknown>>().notNull().default({}),
    correct: boolean("correct"),
    hinted: boolean("hinted").notNull().default(false),
    mode: attemptModeEnum("mode").notNull().default("formative"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("attempts_learner_profile_id_idx").on(table.learnerProfileId),
    index("attempts_learning_session_id_idx").on(table.learningSessionId),
  ],
);

export const attemptAnswers = pgTable(
  "attempt_answers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    attemptId: uuid("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    response: jsonb("response").$type<Record<string, unknown>>().notNull().default({}),
    correct: boolean("correct"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("attempt_answers_attempt_id_idx").on(table.attemptId)],
);

/**
 * Normalized evidence rows (ADR-006).
 * Physical table: evidence_records. `evidence` is a compat export alias.
 */
export const evidenceRecords = pgTable(
  "evidence_records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    attemptId: uuid("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    conceptCanonicalId: text("concept_canonical_id").notNull(),
    skill: text("skill"),
    weight: numeric("weight", { precision: 5, scale: 2 }),
    hinted: boolean("hinted").notNull().default(false),
    examLike: boolean("exam_like").notNull().default(false),
    result: evidenceResultEnum("result").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("evidence_records_attempt_id_idx").on(table.attemptId),
    index("evidence_records_learner_profile_id_idx").on(table.learnerProfileId),
  ],
);

/** Compat alias — same table as evidenceRecords. */
export const evidence = evidenceRecords;

export const conceptMastery = pgTable(
  "concept_mastery",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    conceptCanonicalId: text("concept_canonical_id").notNull(),
    state: masteryStateEnum("state").notNull().default("NOT_STARTED"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    explanationSnapshot: jsonb("explanation_snapshot").$type<
      Record<string, unknown>
    >(),
  },
  (table) => [
    uniqueIndex("concept_mastery_learner_concept_uidx").on(
      table.learnerProfileId,
      table.conceptCanonicalId,
    ),
  ],
);

export const moduleProgress = pgTable(
  "module_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    lessonsCompleted: integer("lessons_completed").notNull().default(0),
    percentComplete: integer("percent_complete").notNull().default(0),
    state: text("state").notNull().default("not_started"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("module_progress_learner_module_uidx").on(
      table.learnerProfileId,
      table.moduleId,
    ),
  ],
);

/**
 * Spaced-repetition schedule for learners.
 * Physical table: review_schedule. `reviewsQueue` is a compat export alias.
 */
export const reviewSchedule = pgTable(
  "review_schedule",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    learnerProfileId: uuid("learner_profile_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    conceptCanonicalId: text("concept_canonical_id").notNull(),
    dueAt: timestamp("due_at", { withTimezone: true }).notNull(),
    intervalDays: integer("interval_days").notNull().default(1),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("review_schedule_learner_concept_uidx").on(
      table.learnerProfileId,
      table.conceptCanonicalId,
    ),
  ],
);

/** Compat alias — same table as reviewSchedule. */
export const reviewsQueue = reviewSchedule;

export const learnerProfilesRelations = relations(
  learnerProfiles,
  ({ one, many }) => ({
    user: one(user, {
      fields: [learnerProfiles.userId],
      references: [user.id],
    }),
    enrollments: many(enrollments),
    learningSessions: many(learningSessions),
    attempts: many(attempts),
    evidenceRecords: many(evidenceRecords),
    conceptMastery: many(conceptMastery),
    moduleProgress: many(moduleProgress),
    reviewSchedule: many(reviewSchedule),
  }),
);

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  learner: one(learnerProfiles, {
    fields: [enrollments.learnerProfileId],
    references: [learnerProfiles.id],
  }),
  module: one(modules, {
    fields: [enrollments.moduleId],
    references: [modules.id],
  }),
}));

export const learningSessionsRelations = relations(
  learningSessions,
  ({ one, many }) => ({
    learner: one(learnerProfiles, {
      fields: [learningSessions.learnerProfileId],
      references: [learnerProfiles.id],
    }),
    module: one(modules, {
      fields: [learningSessions.moduleId],
      references: [modules.id],
    }),
    attempts: many(attempts),
  }),
);

export const attemptsRelations = relations(attempts, ({ one, many }) => ({
  learner: one(learnerProfiles, {
    fields: [attempts.learnerProfileId],
    references: [learnerProfiles.id],
  }),
  learningSession: one(learningSessions, {
    fields: [attempts.learningSessionId],
    references: [learningSessions.id],
  }),
  exercise: one(exercises, {
    fields: [attempts.exerciseId],
    references: [exercises.id],
  }),
  lessonStep: one(lessonSteps, {
    fields: [attempts.lessonStepId],
    references: [lessonSteps.id],
  }),
  contentVersion: one(contentVersions, {
    fields: [attempts.contentVersionId],
    references: [contentVersions.id],
  }),
  answers: many(attemptAnswers),
  evidenceRecords: many(evidenceRecords),
}));

export const attemptAnswersRelations = relations(attemptAnswers, ({ one }) => ({
  attempt: one(attempts, {
    fields: [attemptAnswers.attemptId],
    references: [attempts.id],
  }),
}));

export const evidenceRecordsRelations = relations(
  evidenceRecords,
  ({ one }) => ({
    attempt: one(attempts, {
      fields: [evidenceRecords.attemptId],
      references: [attempts.id],
    }),
    learner: one(learnerProfiles, {
      fields: [evidenceRecords.learnerProfileId],
      references: [learnerProfiles.id],
    }),
  }),
);

/** Compat alias for relations. */
export const evidenceRelations = evidenceRecordsRelations;

export const conceptMasteryRelations = relations(conceptMastery, ({ one }) => ({
  learner: one(learnerProfiles, {
    fields: [conceptMastery.learnerProfileId],
    references: [learnerProfiles.id],
  }),
}));

export const moduleProgressRelations = relations(moduleProgress, ({ one }) => ({
  learner: one(learnerProfiles, {
    fields: [moduleProgress.learnerProfileId],
    references: [learnerProfiles.id],
  }),
  module: one(modules, {
    fields: [moduleProgress.moduleId],
    references: [modules.id],
  }),
}));

export const reviewScheduleRelations = relations(reviewSchedule, ({ one }) => ({
  learner: one(learnerProfiles, {
    fields: [reviewSchedule.learnerProfileId],
    references: [learnerProfiles.id],
  }),
}));

/** Compat alias for relations. */
export const reviewsQueueRelations = reviewScheduleRelations;
