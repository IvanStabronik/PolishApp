import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { canAccessAdminArea } from "@/modules/admin/roles";
import {
  FEEDBACK_CATEGORIES,
  FEEDBACK_STATUSES,
} from "@/modules/feedback/validation";
import {
  getFeedbackHistory,
  listFeedbackForAdmin,
  transitionFeedbackStatus,
} from "@/modules/feedback/service";
import {
  assertSameOrigin,
  getCorrelationId,
} from "@/modules/ops/runtime";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  if (!canAccessAdminArea(session.roles)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;
  const feedbackId = url.searchParams.get("id");

  if (feedbackId) {
    const history = await getFeedbackHistory(feedbackId);
    return NextResponse.json({ history });
  }

  const rows = await listFeedbackForAdmin({
    status: FEEDBACK_STATUSES.includes(status as never)
      ? (status as (typeof FEEDBACK_STATUSES)[number])
      : undefined,
    category: FEEDBACK_CATEGORIES.includes(category as never)
      ? (category as (typeof FEEDBACK_CATEGORIES)[number])
      : undefined,
  });

  return NextResponse.json({
    feedback: rows.map((r) => ({
      id: r.id,
      category: r.category,
      status: r.status,
      rating: r.rating,
      comment: r.comment,
      context: r.context,
      reporterUserId: r.reporterUserId,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
  });
}

const PatchSchema = z.object({
  feedbackId: z.string().uuid(),
  toStatus: z.enum(FEEDBACK_STATUSES),
  note: z.string().max(1000).optional(),
});

export async function PATCH(request: Request) {
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
  const parsed = PatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const result = await transitionFeedbackStatus({
    actorUserId: session.user.id,
    feedbackId: parsed.data.feedbackId,
    toStatus: parsed.data.toStatus,
    note: parsed.data.note,
    correlationId,
  });

  if (!result.ok) {
    const status =
      result.reason === "not_found"
        ? 404
        : result.reason === "forbidden_transition"
          ? 409
          : 403;
    return NextResponse.json({ error: result.reason }, { status });
  }

  return NextResponse.json({ ok: true });
}
