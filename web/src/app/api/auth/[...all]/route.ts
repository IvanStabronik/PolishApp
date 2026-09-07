import { NextResponse } from "next/server";
import { auth } from "@/modules/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";
import {
  RATE_LIMIT_BUCKETS,
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
  structuredLog,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

const { GET: authGet, POST: authPost } = toNextJsHandler(auth);

function isMutatingAuthPath(pathname: string): "login" | "register" | null {
  if (pathname.includes("/sign-in")) return "login";
  if (pathname.includes("/sign-up")) return "register";
  return null;
}

export const GET = authGet;

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  const url = new URL(request.url);
  const kind = isMutatingAuthPath(url.pathname);

  if (kind) {
    if (!assertSameOrigin(request)) {
      return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
        status: 403,
      });
    }

    const bucket =
      kind === "login" ? RATE_LIMIT_BUCKETS.login : RATE_LIMIT_BUCKETS.register;
    const isTestLike =
      process.env.CI === "true" ||
      process.env.CI === "1" ||
      process.env.DEMO_MODE === "true" ||
      process.env.ALLOW_PRODUCTION_DEMO === "true";
    const rl = await consumeRateLimit({
      bucketKey: `${bucket}:${clientIpFromRequest(request)}`,
      limit: isTestLike ? 200 : kind === "login" ? 30 : 10,
      windowMs: 60_000,
    });
    if (!rl.allowed) {
      structuredLog("warn", "auth_rate_limited", {
        correlationId,
        kind,
        retryAfterMs: rl.retryAfterMs,
      });
      return NextResponse.json(publicErrorBody("rate_limited", correlationId), {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000) || 1),
        },
      });
    }
  }

  try {
    return await authPost(request);
  } catch (err) {
    structuredLog("error", "auth_handler_failed", {
      correlationId,
      error: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(publicErrorBody("auth_failed", correlationId), {
      status: 500,
    });
  }
}
