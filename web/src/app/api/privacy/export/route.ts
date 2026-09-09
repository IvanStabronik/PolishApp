import { NextResponse } from "next/server";
import { getRequestSession } from "@/modules/auth/session";
import { exportLearnerData } from "@/modules/privacy/export";
import { createPrivacyExportStore } from "@/modules/privacy/db-store";
import {
  RATE_LIMIT_BUCKETS,
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
  structuredLog,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

/**
 * FUN-210 — export learner data for the authenticated user only.
 */
export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
      status: 403,
    });
  }

  const rl = await consumeRateLimit({
    bucketKey: `${RATE_LIMIT_BUCKETS.privacyExport}:${clientIpFromRequest(request)}`,
    limit: 5,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(publicErrorBody("rate_limited", correlationId), {
      status: 429,
    });
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json(publicErrorBody("unauthorized", correlationId), {
      status: 401,
    });
  }

  try {
    const body = await exportLearnerData(
      createPrivacyExportStore(),
      session.user.id,
    );
    if (!body) {
      return NextResponse.json(publicErrorBody("not_found", correlationId), {
        status: 404,
      });
    }

    structuredLog("info", "privacy_export_ok", {
      correlationId,
      userId: session.user.id,
    });

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": 'attachment; filename="slowarium-export.json"',
        "x-correlation-id": correlationId,
      },
    });
  } catch (err) {
    structuredLog("error", "privacy_export_failed", {
      correlationId,
      error: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(publicErrorBody("export_failed", correlationId), {
      status: 500,
    });
  }
}
