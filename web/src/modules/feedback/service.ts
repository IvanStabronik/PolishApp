import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { feedbackReports, feedbackStatusHistory } from "@/db/schema";
import { recordAdminEvent } from "@/modules/admin/audit";
import {
  canTransitionFeedback,
  sanitizeFeedbackContext,
  type FeedbackCategory,
  type FeedbackStatus,
} from "./validation";

export async function createFeedbackReport(input: {
  reporterUserId: string;
  category: FeedbackCategory;
  rating?: number;
  comment?: string;
  context?: Record<string, unknown>;
  idempotencyKey: string;
}): Promise<{ id: string; deduped: boolean }> {
  const db = getDb();
  const existing = await db.query.feedbackReports.findFirst({
    where: and(
      eq(feedbackReports.reporterUserId, input.reporterUserId),
      eq(feedbackReports.idempotencyKey, input.idempotencyKey),
    ),
  });
  if (existing) {
    return { id: existing.id, deduped: true };
  }

  const [row] = await db
    .insert(feedbackReports)
    .values({
      reporterUserId: input.reporterUserId,
      category: input.category,
      status: "new",
      rating: input.rating ?? null,
      comment: input.comment ?? null,
      context: sanitizeFeedbackContext(input.context),
      idempotencyKey: input.idempotencyKey,
    })
    .returning({ id: feedbackReports.id });

  await db.insert(feedbackStatusHistory).values({
    feedbackId: row!.id,
    fromStatus: null,
    toStatus: "new",
    actorUserId: input.reporterUserId,
    note: "created",
  });

  return { id: row!.id, deduped: false };
}

export async function transitionFeedbackStatus(input: {
  actorUserId: string;
  feedbackId: string;
  toStatus: FeedbackStatus;
  note?: string;
  correlationId?: string;
}): Promise<
  | { ok: true }
  | { ok: false; reason: "not_found" | "forbidden_transition" | "idor" }
> {
  const db = getDb();
  const row = await db.query.feedbackReports.findFirst({
    where: eq(feedbackReports.id, input.feedbackId),
  });
  if (!row) return { ok: false, reason: "not_found" };

  if (!canTransitionFeedback(row.status, input.toStatus)) {
    return { ok: false, reason: "forbidden_transition" };
  }

  await db
    .update(feedbackReports)
    .set({ status: input.toStatus, updatedAt: new Date() })
    .where(eq(feedbackReports.id, input.feedbackId));

  await db.insert(feedbackStatusHistory).values({
    feedbackId: input.feedbackId,
    fromStatus: row.status,
    toStatus: input.toStatus,
    actorUserId: input.actorUserId,
    note: input.note ?? null,
  });

  await recordAdminEvent({
    actorUserId: input.actorUserId,
    action: "feedback.status_changed",
    subjectType: "feedback_report",
    subjectId: input.feedbackId,
    details: { from: row.status, to: input.toStatus },
    correlationId: input.correlationId,
  });

  return { ok: true };
}

export async function listFeedbackForAdmin(filters?: {
  status?: FeedbackStatus;
  category?: FeedbackCategory;
}) {
  const db = getDb();
  const rows = await db.query.feedbackReports.findMany({
    orderBy: [desc(feedbackReports.createdAt)],
    limit: 200,
  });
  return rows.filter((r) => {
    if (filters?.status && r.status !== filters.status) return false;
    if (filters?.category && r.category !== filters.category) return false;
    return true;
  });
}

/** Learner-visible inbox — own reports only (no other users' PII). */
export async function listFeedbackForUser(userId: string) {
  const db = getDb();
  return db.query.feedbackReports.findMany({
    where: eq(feedbackReports.reporterUserId, userId),
    orderBy: [desc(feedbackReports.createdAt)],
    limit: 50,
    columns: {
      id: true,
      category: true,
      status: true,
      comment: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getFeedbackHistory(feedbackId: string) {
  const db = getDb();
  return db.query.feedbackStatusHistory.findMany({
    where: eq(feedbackStatusHistory.feedbackId, feedbackId),
    orderBy: [desc(feedbackStatusHistory.createdAt)],
  });
}
