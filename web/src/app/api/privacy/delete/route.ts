import { NextResponse } from "next/server";
import { getRequestSession } from "@/modules/auth/session";
import { deleteLearnerAccount } from "@/modules/privacy/delete-account";
import { createPrivacyDeleteStore } from "@/modules/privacy/db-store";
import {
  RATE_LIMIT_BUCKETS,
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
  structuredLog,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

/**
 * FUN-211 — delete / anonymize the authenticated user's account + learning data.
 */
export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
      status: 403,
    });
  }

  const rl = await consumeRateLimit({
    bucketKey: `${RATE_LIMIT_BUCKETS.privacyDelete}:${clientIpFromRequest(request)}`,
    limit: 3,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(publicErrorBody("rate_limited", correlationId), {
      status: 429,
    });
  }

  let confirm = "";
  try {
    const json = (await request.json()) as { confirm?: string };
    confirm = json.confirm ?? "";
  } catch {
    confirm = "";
  }

  if (confirm !== "DELETE") {
    return NextResponse.json(
      { ok: false, ...publicErrorBody("confirmation_required", correlationId) },
      { status: 400 },
    );
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, ...publicErrorBody("unauthorized", correlationId) },
      { status: 401 },
    );
  }

  try {
    const result = await deleteLearnerAccount(
      createPrivacyDeleteStore(),
      session.user.id,
    );
    structuredLog("info", "privacy_delete_ok", {
      correlationId,
      userId: session.user.id,
    });
    return NextResponse.json(
      { ok: true, ...result, correlationId },
      { status: 202 },
    );
  } catch (err) {
    structuredLog("error", "privacy_delete_failed", {
      correlationId,
      error: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { ok: false, ...publicErrorBody("delete_failed", correlationId) },
      { status: 500 },
    );
  }
}
