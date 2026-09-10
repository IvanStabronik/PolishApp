import { NextResponse } from "next/server";
import { z } from "zod";
import { getExercise } from "@/lib/content/load-module";
import { isDraftLearningEnvEnabled } from "@/lib/demo";
import { getRequestSession } from "@/modules/auth/session";
import { assertBetaAccessActive } from "@/modules/auth/beta-access";
import { assertSameOrigin, getCorrelationId } from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

export const runtime = "nodejs";

const BodySchema = z.object({
  moduleId: z.string().min(1).max(128),
  exerciseId: z.string().min(1).max(128),
});

/**
 * Listening play stimulus — authenticated, same-origin, rate-limited.
 * Prefer studio `audioUrl` alone (no text). TTS interim may return `textPl`
 * only when there is no URL — client must not render it in the DOM.
 * Lesson DTO never embeds audioTextPl (hasTtsStimulus flag only).
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
    bucketKey: `listening:stimulus:${session.user.id}:${clientIpFromRequest(req)}`,
    limit: 60,
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

  const audioUrl = exercise.audioUrl?.trim() || null;
  if (audioUrl) {
    // Studio / recorded path — do not also ship TTS text.
    return NextResponse.json({ audioUrl });
  }

  const textPl = exercise.audioTextPl?.trim() ?? "";
  if (!textPl) {
    return NextResponse.json(
      { error: "not_found", correlationId },
      { status: 404 },
    );
  }

  // TTS interim only — unavoidable for browser speechSynthesis.
  return NextResponse.json({ textPl });
}
