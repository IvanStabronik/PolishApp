import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { canAccessAdminArea } from "@/modules/admin/roles";
import { createBetaInvite, revokeBetaInvite, listBetaInvites } from "@/modules/beta";
import {
  assertSameOrigin,
  getCorrelationId,
  structuredLog,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

const CreateSchema = z.object({
  expiresInDays: z.number().int().min(1).max(90).default(14),
  /** Personal one-time invites only — omitted or literal 1. */
  useLimit: z.literal(1).optional(),
  label: z.string().max(120).optional(),
});

const RevokeSchema = z.object({
  inviteId: z.string().uuid(),
});

export async function GET() {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  if (!canAccessAdminArea(session.roles)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const invites = await listBetaInvites();
  return NextResponse.json({
    invites: invites.map((i) => ({
      id: i.id,
      status: i.status,
      useLimit: i.useLimit,
      useCount: i.useCount,
      expiresAt: i.expiresAt.toISOString(),
      acceptedAt: i.acceptedAt?.toISOString() ?? null,
      revokedAt: i.revokedAt?.toISOString() ?? null,
      createdUserId: i.createdUserId,
      label: i.label,
      createdAt: i.createdAt.toISOString(),
      // never include tokenHash or raw token
    })),
  });
}

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
    bucketKey: `admin:invite:create:${session.user.id}:${clientIpFromRequest(request)}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const expiresAt = new Date(
    Date.now() + parsed.data.expiresInDays * 24 * 60 * 60 * 1000,
  );
  const created = await createBetaInvite({
    actorUserId: session.user.id,
    expiresAt,
    useLimit: 1,
    label: parsed.data.label,
    correlationId,
  });

  structuredLog("info", "beta_invite_created", {
    correlationId,
    inviteId: created.inviteId,
  });

  return NextResponse.json({
    inviteId: created.inviteId,
    // plaintext only at creation moment
    token: created.rawToken,
    expiresAt: created.expiresAt.toISOString(),
    acceptPath: `/invite/${created.rawToken}`,
  });
}

export async function DELETE(request: Request) {
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
  const parsed = RevokeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const result = await revokeBetaInvite({
    actorUserId: session.user.id,
    inviteId: parsed.data.inviteId,
    correlationId,
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.reason }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
