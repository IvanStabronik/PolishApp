import {
  date,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth";
import { contentVersions } from "./content";

export const betaInviteStatusEnum = pgEnum("beta_invite_status", [
  "pending",
  "accepted",
  "expired",
  "revoked",
]);

export const feedbackCategoryEnum = pgEnum("feedback_category", [
  "bug",
  "confusing_content",
  "wrong_answer",
  "translation",
  "UX",
  "other",
]);

export const feedbackStatusEnum = pgEnum("feedback_status", [
  "new",
  "triaged",
  "resolved",
  "wont_fix",
]);

export const jpjoVerdictEnum = pgEnum("jpjo_verdict", [
  "approve",
  "changes_requested",
  "reject",
  "abstain",
]);

export const betaInvites = pgTable(
  "beta_invites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tokenHash: text("token_hash").notNull(),
    status: betaInviteStatusEnum("status").notNull().default("pending"),
    useLimit: integer("use_limit").notNull().default(1),
    useCount: integer("use_count").notNull().default(0),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdUserId: text("created_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdByUserId: text("created_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    label: text("label"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("beta_invites_token_hash_uidx").on(table.tokenHash),
    index("beta_invites_status_idx").on(table.status),
    index("beta_invites_created_user_idx").on(table.createdUserId),
  ],
);

export const adminEvents = pgTable(
  "admin_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    actorUserId: text("actor_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    subjectType: text("subject_type"),
    subjectId: text("subject_id"),
    details: jsonb("details").$type<Record<string, unknown>>().notNull().default({}),
    correlationId: text("correlation_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("admin_events_actor_idx").on(table.actorUserId),
    index("admin_events_action_idx").on(table.action),
    index("admin_events_created_idx").on(table.createdAt),
  ],
);

export const feedbackReports = pgTable(
  "feedback_reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reporterUserId: text("reporter_user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    category: feedbackCategoryEnum("category").notNull(),
    status: feedbackStatusEnum("status").notNull().default("new"),
    rating: integer("rating"),
    comment: text("comment"),
    context: jsonb("context").$type<Record<string, unknown>>().notNull().default({}),
    idempotencyKey: text("idempotency_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("feedback_reports_idempotency_uidx").on(
      table.reporterUserId,
      table.idempotencyKey,
    ),
    index("feedback_reports_status_idx").on(table.status),
    index("feedback_reports_reporter_idx").on(table.reporterUserId),
  ],
);

export const feedbackStatusHistory = pgTable(
  "feedback_status_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    feedbackId: uuid("feedback_id")
      .notNull()
      .references(() => feedbackReports.id, { onDelete: "cascade" }),
    fromStatus: feedbackStatusEnum("from_status"),
    toStatus: feedbackStatusEnum("to_status").notNull(),
    actorUserId: text("actor_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("feedback_status_history_feedback_idx").on(table.feedbackId)],
);

export const analyticsDailyAggregates = pgTable(
  "analytics_daily_aggregates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    metricKey: text("metric_key").notNull(),
    bucketDate: date("bucket_date").notNull(),
    dimensions: jsonb("dimensions").$type<Record<string, unknown>>().notNull().default({}),
    /** Deterministic hash of canonicalized dimensions — UPSERT conflict target. */
    dimensionsKey: text("dimensions_key").notNull().default(""),
    valueNum: doublePrecision("value_num").notNull().default(0),
    valueCount: integer("value_count").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("analytics_daily_metric_bucket_dims_key_uidx").on(
      table.metricKey,
      table.bucketDate,
      table.dimensionsKey,
    ),
    index("analytics_daily_metric_idx").on(table.metricKey, table.bucketDate),
  ],
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventKey: text("event_key").notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    dimensions: jsonb("dimensions").$type<Record<string, unknown>>().notNull().default({}),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("analytics_events_key_idx").on(table.eventKey),
    index("analytics_events_user_idx").on(table.userId),
  ],
);

export const jpjoReviewVerdicts = pgTable(
  "jpjo_review_verdicts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reviewerIdentity: text("reviewer_identity").notNull(),
    externalRef: text("external_ref").notNull().default(""),
    contentVersionId: uuid("content_version_id")
      .notNull()
      .references(() => contentVersions.id, { onDelete: "restrict" }),
    contentFingerprint: text("content_fingerprint").notNull(),
    verdict: jpjoVerdictEnum("verdict").notNull(),
    comment: text("comment"),
    evidence: jsonb("evidence").$type<Record<string, unknown>>().notNull().default({}),
    importedByUserId: text("imported_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    importedAt: timestamp("imported_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("jpjo_review_verdicts_version_ref_uidx").on(
      table.contentVersionId,
      table.reviewerIdentity,
      table.externalRef,
    ),
  ],
);

export const rateLimitBuckets = pgTable("rate_limit_buckets", {
  bucketKey: text("bucket_key").primaryKey(),
  windowStartedAt: timestamp("window_started_at", { withTimezone: true }).notNull(),
  hitCount: integer("hit_count").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const betaInvitesRelations = relations(betaInvites, ({ one }) => ({
  createdUser: one(user, {
    fields: [betaInvites.createdUserId],
    references: [user.id],
    relationName: "beta_invite_created_user",
  }),
  createdBy: one(user, {
    fields: [betaInvites.createdByUserId],
    references: [user.id],
    relationName: "beta_invite_created_by",
  }),
}));

export const feedbackReportsRelations = relations(feedbackReports, ({ one, many }) => ({
  reporter: one(user, {
    fields: [feedbackReports.reporterUserId],
    references: [user.id],
  }),
  history: many(feedbackStatusHistory),
}));

export const feedbackStatusHistoryRelations = relations(
  feedbackStatusHistory,
  ({ one }) => ({
    feedback: one(feedbackReports, {
      fields: [feedbackStatusHistory.feedbackId],
      references: [feedbackReports.id],
    }),
  }),
);

export const jpjoReviewVerdictsRelations = relations(jpjoReviewVerdicts, ({ one }) => ({
  contentVersion: one(contentVersions, {
    fields: [jpjoReviewVerdicts.contentVersionId],
    references: [contentVersions.id],
  }),
}));
