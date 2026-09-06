import { NextResponse } from "next/server";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db/client";
import { account, user } from "@/db/schema";
import { isBetaModeEnabled } from "@/modules/admin/roles";
import {
  consumeInviteForUser,
  lookupInviteByRawToken,
} from "@/modules/beta";
import { trackAnalyticsEvent } from "@/modules/analytics/service";
import {
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
    bucketKey: `beta:register:${clientIpFromRequest(request)}`,
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

  const db = getDb();
  const existing = await db.query.user.findFirst({
    where: eq(user.email, parsed.data.email.toLowerCase()),
  });
  if (existing) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 });
  }

  const userId = randomUUID();
  const now = new Date();
  const passwordHash = await hashPassword(parsed.data.password);

  await db.insert(user).values({
    id: userId,
    name: parsed.data.name?.trim() || parsed.data.email.split("@")[0]!,
    email: parsed.data.email.toLowerCase(),
    emailVerified: false,
    roleFlags: ["learner", "previewer"],
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    issuer: "local:credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  const consumed = await consumeInviteForUser({
    rawToken: parsed.data.token,
    userId,
    correlationId,
  });

  if (!consumed.ok) {
    // Roll back user if invite lost the race
    await db.delete(account).where(eq(account.userId, userId));
    await db.delete(user).where(eq(user.id, userId));
    return NextResponse.json({ error: consumed.reason }, { status: 409 });
  }

  await trackAnalyticsEvent({
    eventKey: "activation_invite_to_onboarding",
    userId,
    dimensions: { stage: "registered" },
  }).catch((err) => {
    structuredLog("warn", "beta_register_analytics_failed", {
      correlationId,
      userId,
      error: err instanceof Error ? err.message : String(err),
    });
  });

  structuredLog("info", "beta_register_ok", { correlationId, userId });

  return NextResponse.json({
    ok: true,
    userId,
    next: "sign_in",
  });
}
