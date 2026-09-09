import { NextResponse } from "next/server";
import { hashPassword } from "better-auth/crypto";
import { z } from "zod";
import { isBetaModeEnabled } from "@/modules/admin/roles";
import {
  lookupInviteByRawToken,
  registerWithInviteToken,
} from "@/modules/beta";
import { trackAnalyticsEvent } from "@/modules/analytics/service";
import {
  RATE_LIMIT_BUCKETS,
  assertSameOrigin,
  getCorrelationId,
  structuredLog,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";
import { isDemoMode } from "@/modules/auth/demo";

export const runtime = "nodejs";

const RegisterSchema = z.object({
  token: z.string().min(16).max(200),
  email: z.string().email().max(320),
  password: z.string().min(8).max(200),
  name: z.string().min(1).max(120).optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  if (!token) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const found = await lookupInviteByRawToken(token);
  if (!found) {
    return NextResponse.json({ ok: false, reason: "invalid" });
  }
  if (!found.inspection.ok) {
    return NextResponse.json({
      ok: false,
      reason: found.inspection.reason,
      status: found.inspection.status,
    });
  }
  return NextResponse.json({
    ok: true,
    status: "pending",
    expiresAt: found.invite.expiresAt.toISOString(),
  });
}

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "origin_rejected" }, { status: 403 });
  }

  const rl = await consumeRateLimit({
    bucketKey: `${RATE_LIMIT_BUCKETS.inviteRedeem}:${clientIpFromRequest(request)}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = RegisterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  if (!isBetaModeEnabled() && !isDemoMode()) {
    // Outside beta mode, prefer Better Auth native sign-up.
    return NextResponse.json({ error: "invite_flow_disabled" }, { status: 400 });
  }

  const found = await lookupInviteByRawToken(parsed.data.token);
  if (!found || !found.inspection.ok) {
    return NextResponse.json(
      { error: found?.inspection.ok === false ? found.inspection.reason : "invalid" },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const name =
    parsed.data.name?.trim() || parsed.data.email.split("@")[0]!;

  const registered = await registerWithInviteToken({
    rawToken: parsed.data.token,
    email: parsed.data.email,
    passwordHash,
    name,
    correlationId,
  });

  if (!registered.ok) {
    const status =
      registered.reason === "email_taken" || registered.reason === "used"
        ? 409
        : 400;
    return NextResponse.json({ error: registered.reason }, { status });
  }

  // Analytics only after successful commit — never part of the registration txn.
  await trackAnalyticsEvent({
    eventKey: "activation_invite_to_onboarding",
    userId: registered.userId,
    dimensions: { stage: "registered" },
  });

  structuredLog("info", "beta_register_ok", {
    correlationId,
    userId: registered.userId,
  });

  return NextResponse.json({
    ok: true,
    userId: registered.userId,
    next: "sign_in",
  });
}
