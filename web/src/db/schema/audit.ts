import { relations } from "drizzle-orm";
import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { contentVersions } from "./content";
import { contentStatusEnum, reviewDecisionEnum } from "./enums";

/**
 * Linguistic / editorial review decisions.
 * reviewerUserId must not equal contentVersions.authorUserId (self-review ban).
 */
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  contentVersionId: uuid("content_version_id")
    .notNull()
    .references(() => contentVersions.id, { onDelete: "cascade" }),
  reviewerUserId: text("reviewer_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),
  decision: reviewDecisionEnum("decision").notNull(),
  comment: text("comment"),
  checklist: jsonb("checklist").$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Append-only status transition log. */
export const publicationEvents = pgTable("publication_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  contentVersionId: uuid("content_version_id")
    .notNull()
    .references(() => contentVersions.id, { onDelete: "cascade" }),
  actorUserId: text("actor_user_id").references(() => user.id, {
    onDelete: "restrict",
  }),
  fromStatus: contentStatusEnum("from_status"),
  toStatus: contentStatusEnum("to_status").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

/**
 * Optional privacy / compliance audit trail (export, delete, consent changes).
 * Append-only; not editable from UI (SEC-010).
 */
export const privacyAudit = pgTable("privacy_audit", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorUserId: text("actor_user_id").references(() => user.id, {
    onDelete: "set null",
  }),
  subjectUserId: text("subject_user_id").references(() => user.id, {
    onDelete: "set null",
  }),
  action: text("action").notNull(),
  details: jsonb("details").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  contentVersion: one(contentVersions, {
    fields: [reviews.contentVersionId],
    references: [contentVersions.id],
  }),
  reviewer: one(user, {
    fields: [reviews.reviewerUserId],
    references: [user.id],
  }),
}));

export const publicationEventsRelations = relations(
  publicationEvents,
  ({ one }) => ({
    contentVersion: one(contentVersions, {
      fields: [publicationEvents.contentVersionId],
      references: [contentVersions.id],
    }),
    actor: one(user, {
      fields: [publicationEvents.actorUserId],
      references: [user.id],
    }),
  }),
);

export const privacyAuditRelations = relations(privacyAudit, ({ one }) => ({
  actor: one(user, {
    fields: [privacyAudit.actorUserId],
    references: [user.id],
    relationName: "privacy_audit_actor",
  }),
  subject: one(user, {
    fields: [privacyAudit.subjectUserId],
    references: [user.id],
    relationName: "privacy_audit_subject",
  }),
}));
