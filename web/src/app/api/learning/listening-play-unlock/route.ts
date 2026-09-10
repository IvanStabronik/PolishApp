import { NextResponse } from "next/server";
import { z } from "zod";
import { getExercise } from "@/lib/content/load-module";
import { isDraftLearningEnvEnabled } from "@/lib/demo";
import { getRequestSession } from "@/modules/auth/session";
import { assertBetaAccessActive } from "@/modules/auth/beta-access";
import {
  LISTENING_TTS_UNLOCK_DOC,
  mintListeningPlayToken,
} from "@/modules/learning/listening-play-proof";
import { assertSameOrigin, getCorrelationId } from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

const BodySchema = z.object({
  moduleId: z.string().min(1).max(128),
  exerciseId: z.string().min(1).max(128),
  reason: z.literal("tts_unavailable"),
});

/**
 * Unlock listening submit when the browser cannot play audio/TTS.
 * Documented interim path — still requires the minted token on attempt.
 * See LISTENING_TTS_UNLOCK_DOC.
 */
export async function POST(req: Request) {
  const correlationId = getCorrelationId(req);
  if (!assertSameOrigin(req)) {
    return NextResponse.json(
      { error: "origin_rejected", correlationId },
      { status: 403 },
    );
  }

  const session = await getRequestSession();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "unauthorized", correlationId },
      { status: 401 },
    );
  }
  const denied = assertBetaAccessActive(session);
  if (denied) return denied;

  const rl = await consumeRateLimit({
    bucketKey: `listening:unlock:${session.user.id}:${clientIpFromRequest(req)}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "rate_limited", correlationId, retryAfterMs: rl.retryAfterMs },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
      },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", correlationId },
      { status: 400 },
    );
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_body", correlationId },
      { status: 400 },
    );
  }

  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  };

  const exercise = getExercise(
    parsed.data.moduleId,
    parsed.data.exerciseId,
    accessCtx,
  );
  if (!exercise || exercise.type !== "listening") {
    return NextResponse.json(
      { error: "not_found", correlationId },
      { status: 404 },
    );
  }

  const playToken = mintListeningPlayToken({
    userId: session.user.id,
    moduleId: parsed.data.moduleId,
    exerciseId: parsed.data.exerciseId,
    kind: "tts_unavailable",
  });

  return NextResponse.json({
    playToken,
    unlock: "tts_unavailable" as const,
    note: LISTENING_TTS_UNLOCK_DOC,
  });
}
