import { NextResponse } from "next/server";
import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  attempts,
  feedbackReports,
  learnerProfiles,
  reviewSchedule,
  user,
} from "@/db/schema";
import { getRequestSession } from "@/modules/auth/session";
import { canAccessAdminArea } from "@/modules/admin/roles";
import { deactivateBetaAccess } from "@/modules/beta";
import { adminAnalyticsSnapshot } from "@/modules/analytics/service";
import {
  assertSameOrigin,
  getCorrelationId,
} from "@/modules/ops/runtime";
import { z } from "zod";

export const runtime = "nodejs";

export async function GET() {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  if (!canAccessAdminArea(session.roles)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const db = getDb();
  const invites = await db.query.betaInvites.findMany();
  const counts = {
    pending: invites.filter((i) => i.status === "pending").length,
    accepted: invites.filter((i) => i.status === "accepted").length,
    expired: invites.filter((i) => i.status === "expired").length,
    revoked: invites.filter((i) => i.status === "revoked").length,
    total: invites.length,
  };

  const learners = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      betaAccessRevokedAt: user.betaAccessRevokedAt,
      onboardingComplete: learnerProfiles.onboardingComplete,
      lastActivityAt: learnerProfiles.updatedAt,
    })
    .from(user)
    .leftJoin(learnerProfiles, eq(learnerProfiles.userId, user.id))
    .where(sql`${user.roleFlags}::text LIKE '%learner%'`)
    .orderBy(desc(user.createdAt))
    .limit(100);

  const attemptRows = await db
    .select({
      userId: learnerProfiles.userId,
      count: sql<number>`count(*)::int`,
    })
    .from(attempts)
    .innerJoin(
      learnerProfiles,
      eq(attempts.learnerProfileId, learnerProfiles.id),
    )
    .groupBy(learnerProfiles.userId);

  const attemptMap = new Map(attemptRows.map((r) => [r.userId, r.count]));

  const feedbackCount = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(feedbackReports);

  const reviewDue = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviewSchedule)
    .where(sql`${reviewSchedule.dueAt} <= now()`);

  const analytics = await adminAnalyticsSnapshot();

  return NextResponse.json({
    inviteCounts: counts,
    feedbackCount: feedbackCount[0]?.count ?? 0,
    reviewDueCount: reviewDue[0]?.count ?? 0,
    learners: learners.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      createdAt: l.createdAt.toISOString(),
      onboardingComplete: Boolean(l.onboardingComplete),
      lastActivityAt: l.lastActivityAt?.toISOString() ?? null,
      betaAccessRevoked: Boolean(l.betaAccessRevokedAt),
      attempts: attemptMap.get(l.id) ?? 0,
      // never password hashes / session tokens / full answers
    })),
    analytics,
  });
}

const DeactivateSchema = z.object({
  userId: z.string().min(1),
  reason: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "origin_rejected" }, { status: 403 });
  }
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  if (!canAccessAdminArea(session.roles)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = DeactivateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  await deactivateBetaAccess({
    actorUserId: session.user.id,
    userId: parsed.data.userId,
    reason: parsed.data.reason,
    correlationId,
  });

  return NextResponse.json({ ok: true });
}
