import { relations } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { concepts, levels } from "./curriculum";
import {
  contentKindEnum,
  contentStatusEnum,
  exerciseTypeEnum,
  timestamps,
} from "./enums";

/**
 * Stable content entity keyed by curriculum business ID.
 * Payload lives on content_versions — never mutate published rows in place.
 */
export const contentUnits = pgTable(
  "content_units",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    kind: contentKindEnum("kind").notNull(),
    title: text("title").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("content_units_canonical_id_uidx").on(table.canonicalId),
  ],
);

export type ContentVersionPayload = Record<string, unknown>;
export type ProvenanceSnapshot = Record<string, unknown>;

/**
 * Immutable snapshot of a content unit.
 * SELF-REVIEW BAN: authorUserId !== reviewerId (app-enforced via
 * assertIndependentReviewer). Never invent JPJO approval — status stays
 * DRAFT until a real independent methodological review exists.
 */
export const contentVersions = pgTable(
  "content_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    unitId: uuid("unit_id")
      .notNull()
      .references(() => contentUnits.id, { onDelete: "cascade" }),
    versionNo: integer("version_no").notNull(),
    status: contentStatusEnum("status").notNull().default("DRAFT"),
    authorUserId: text("author_user_id").references(() => user.id, {
      onDelete: "restrict",
    }),
    /** Independent reviewer; must differ from authorUserId. */
    reviewerId: text("reviewer_id").references(() => user.id, {
      onDelete: "restrict",
    }),
    provenance: jsonb("provenance").$type<ProvenanceSnapshot>().notNull().default({}),
    payload: jsonb("payload").$type<ContentVersionPayload>().notNull().default({}),
    contentHash: text("content_hash"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("content_versions_unit_version_uidx").on(
      table.unitId,
      table.versionNo,
    ),
  ],
);

/**
 * Throws if author and reviewer are the same person (self-review ban).
 * Call before transitioning to APPROVED / PUBLISHED.
 */
export function assertIndependentReviewer(
  authorUserId: string | null | undefined,
  reviewerId: string | null | undefined,
): void {
  if (
    authorUserId != null &&
    reviewerId != null &&
    authorUserId === reviewerId
  ) {
    throw new Error(
      "Self-review is prohibited: authorUserId must differ from reviewerId",
    );
  }
}

export const provenanceRecords = pgTable(
  "provenance_records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    contentVersionId: uuid("content_version_id")
      .notNull()
      .references(() => contentVersions.id, { onDelete: "cascade" }),
    kind: text("kind").notNull(),
    actorUserId: text("actor_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    details: jsonb("details").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("provenance_records_content_version_id_idx").on(table.contentVersionId),
  ],
);

export const sourceReferences = pgTable(
  "source_references",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    provenanceRecordId: uuid("provenance_record_id")
      .notNull()
      .references(() => provenanceRecords.id, { onDelete: "cascade" }),
    refType: text("ref_type").notNull(),
    refValue: text("ref_value").notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("source_references_provenance_record_id_idx").on(
      table.provenanceRecordId,
    ),
  ],
);

export const modules = pgTable(
  "modules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    canonicalId: text("canonical_id").notNull(),
    /** Optional FK to curriculum levels (nullable until linked). */
    levelId: uuid("level_id").references(() => levels.id, {
      onDelete: "restrict",
    }),
    /** Nullable until a published version exists. */
    publishedVersionId: uuid("published_version_id").references(
      () => contentVersions.id,
      { onDelete: "set null" },
    ),
    /** Working / draft version used for internal preview. */
    contentVersionId: uuid("content_version_id").references(
      () => contentVersions.id,
      { onDelete: "set null" },
    ),
    workingTitle: text("working_title").notNull(),
    slug: text("slug"),
    sortOrder: integer("sort_order").notNull().default(0),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("modules_canonical_id_uidx").on(table.canonicalId),
    uniqueIndex("modules_slug_uidx").on(table.slug),
  ],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    canonicalId: text("canonical_id").notNull(),
    title: text("title"),
    sortOrder: integer("sort_order").notNull().default(0),
    contentVersionId: uuid("content_version_id").references(
      () => contentVersions.id,
      { onDelete: "set null" },
    ),
    ...timestamps,
  },
  (table) => [uniqueIndex("lessons_canonical_id_uidx").on(table.canonicalId)],
);

export const lessonSteps = pgTable(
  "lesson_steps",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    canonicalId: text("canonical_id").notNull(),
    stepType: text("step_type").notNull(),
    title: text("title").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    contentVersionId: uuid("content_version_id").references(
      () => contentVersions.id,
      { onDelete: "set null" },
    ),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("lesson_steps_canonical_id_uidx").on(table.canonicalId),
  ],
);

export const exercises = pgTable(
  "exercises",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    lessonId: uuid("lesson_id")
      .notNull()
      .references(() => lessons.id, { onDelete: "cascade" }),
    canonicalId: text("canonical_id").notNull(),
    exerciseType: exerciseTypeEnum("exercise_type").notNull(),
    contentVersionId: uuid("content_version_id").references(
      () => contentVersions.id,
      { onDelete: "set null" },
    ),
    /** Server-only answer key; never send to learner clients. */
    answerKey: jsonb("answer_key").$type<Record<string, unknown>>().notNull().default({}),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("exercises_canonical_id_uidx").on(table.canonicalId),
  ],
);

/** Lives here (not curriculum.ts) so curriculum never imports content. */
export const moduleConcepts = pgTable(
  "module_concepts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    conceptId: uuid("concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("module_concepts_pair_uidx").on(table.moduleId, table.conceptId),
  ],
);

export const contentUnitsRelations = relations(contentUnits, ({ many }) => ({
  versions: many(contentVersions),
}));

export const contentVersionsRelations = relations(
  contentVersions,
  ({ one, many }) => ({
    unit: one(contentUnits, {
      fields: [contentVersions.unitId],
      references: [contentUnits.id],
    }),
    author: one(user, {
      fields: [contentVersions.authorUserId],
      references: [user.id],
      relationName: "content_versions_author",
    }),
    reviewer: one(user, {
      fields: [contentVersions.reviewerId],
      references: [user.id],
      relationName: "content_versions_reviewer",
    }),
    provenanceRecords: many(provenanceRecords),
  }),
);

export const provenanceRecordsRelations = relations(
  provenanceRecords,
  ({ one, many }) => ({
    contentVersion: one(contentVersions, {
      fields: [provenanceRecords.contentVersionId],
      references: [contentVersions.id],
    }),
    actor: one(user, {
      fields: [provenanceRecords.actorUserId],
      references: [user.id],
    }),
    sourceReferences: many(sourceReferences),
  }),
);

export const sourceReferencesRelations = relations(
  sourceReferences,
  ({ one }) => ({
    provenanceRecord: one(provenanceRecords, {
      fields: [sourceReferences.provenanceRecordId],
      references: [provenanceRecords.id],
    }),
  }),
);

export const modulesRelations = relations(modules, ({ one, many }) => ({
  level: one(levels, {
    fields: [modules.levelId],
    references: [levels.id],
  }),
  publishedVersion: one(contentVersions, {
    fields: [modules.publishedVersionId],
    references: [contentVersions.id],
    relationName: "modules_published_version",
  }),
  contentVersion: one(contentVersions, {
    fields: [modules.contentVersionId],
    references: [contentVersions.id],
    relationName: "modules_content_version",
  }),
  lessons: many(lessons),
  moduleConcepts: many(moduleConcepts),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  contentVersion: one(contentVersions, {
    fields: [lessons.contentVersionId],
    references: [contentVersions.id],
  }),
  exercises: many(exercises),
  lessonSteps: many(lessonSteps),
}));

export const lessonStepsRelations = relations(lessonSteps, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonSteps.lessonId],
    references: [lessons.id],
  }),
  contentVersion: one(contentVersions, {
    fields: [lessonSteps.contentVersionId],
    references: [contentVersions.id],
  }),
}));

export const exercisesRelations = relations(exercises, ({ one }) => ({
  lesson: one(lessons, {
    fields: [exercises.lessonId],
    references: [lessons.id],
  }),
  contentVersion: one(contentVersions, {
    fields: [exercises.contentVersionId],
    references: [contentVersions.id],
  }),
}));

export const moduleConceptsRelations = relations(moduleConcepts, ({ one }) => ({
  module: one(modules, {
    fields: [moduleConcepts.moduleId],
    references: [modules.id],
  }),
  concept: one(concepts, {
    fields: [moduleConcepts.conceptId],
    references: [concepts.id],
  }),
}));
