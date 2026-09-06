import { NextResponse } from "next/server";
import { getRequestSession } from "@/modules/auth/session";
import {
  FeedbackCreateSchema,
  sanitizeFeedbackContext,
} from "@/modules/feedback/validation";
import { createFeedbackReport } from "@/modules/feedback/service";
import { trackAnalyticsEvent } from "@/modules/analytics/service";
import {
  assertSameOrigin,
  getCorrelationId,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "origin_rejected" }, { status: 403 });
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const rl = await consumeRateLimit({
    bucketKey: `feedback:create:${session.user.id}:${clientIpFromRequest(request)}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = FeedbackCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const result = await createFeedbackReport({
    reporterUserId: session.user.id,
    category: parsed.data.category,
    rating: parsed.data.rating,
    comment: parsed.data.comment,
    context: sanitizeFeedbackContext(parsed.data.context),
    idempotencyKey: parsed.data.idempotencyKey,
  });

  if (!result.deduped) {
    await trackAnalyticsEvent({
      eventKey: "feedback_rate",
      userId: session.user.id,
      dimensions: { category: parsed.data.category },
    });
  }

  return NextResponse.json({
    ok: true,
    id: result.id,
    deduped: result.deduped,
    correlationId,
  });
}
