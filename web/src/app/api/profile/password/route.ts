import { NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/modules/auth/auth";
import { changeOwnPassword } from "@/modules/auth/change-password";
import { getRequestSession } from "@/modules/auth/session";
import {
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

const BodySchema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
      status: 403,
    });
  }

  const appSession = await getRequestSession();
  if (!appSession) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rl = await consumeRateLimit({
    bucketKey: `profile:change-pw:${appSession.user.id}:${clientIpFromRequest(request)}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(publicErrorBody("rate_limited", correlationId), {
      status: 429,
    });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const baSession = await auth.api.getSession({ headers: await headers() });
  const result = await changeOwnPassword({
    userId: appSession.user.id,
    currentPassword: parsed.data.currentPassword,
    newPassword: parsed.data.newPassword,
    currentSessionToken: baSession?.session?.token ?? null,
  });

  if (!result.ok) {
    const status = result.reason === "no_credential" ? 404 : 400;
    return NextResponse.json(
      { error: result.reason, correlationId },
      { status },
    );
  }

  return NextResponse.json({ ok: true, correlationId });
}
