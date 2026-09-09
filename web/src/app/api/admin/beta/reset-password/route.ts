import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { canAccessAdminArea } from "@/modules/admin/roles";
import { adminResetLearnerPassword } from "@/modules/beta/reset-password";
import {
  assertSameOrigin,
  getCorrelationId,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

const BodySchema = z.object({
  userId: z.string().min(1),
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

  const rl = await consumeRateLimit({
    bucketKey: `admin:reset-pw:${session.user.id}:${clientIpFromRequest(request)}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const result = await adminResetLearnerPassword({
    actorUserId: session.user.id,
    userId: parsed.data.userId,
    correlationId,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    temporaryPassword: result.temporaryPassword,
    correlationId,
  });
}
