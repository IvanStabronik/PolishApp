import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { assertBetaAccessActive } from "@/modules/auth/beta-access";
import {
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
} from "@/modules/ops/runtime";
import {
  completeLessonSession,
  ensureOpenLessonSession,
} from "@/modules/learning/lesson-session";

export const runtime = "nodejs";

const BodySchema = z.object({
  action: z.enum(["start", "complete"]),
  lessonId: z.string().min(1).max(200),
  moduleId: z.string().min(1).max(200),
  sessionId: z.string().uuid().optional().nullable(),
});

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
      status: 403,
    });
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const denied = assertBetaAccessActive(session);
  if (denied) return denied;

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

  const body = parsed.data;
  try {
    if (body.action === "start") {
      const started = await ensureOpenLessonSession({
        userId: session.user.id,
        lessonId: body.lessonId,
        moduleId: body.moduleId,
      });
      return NextResponse.json({ sessionId: started.sessionId });
    }

    const summary = await completeLessonSession({
      userId: session.user.id,
      sessionId: body.sessionId,
      lessonId: body.lessonId,
      moduleId: body.moduleId,
    });
    return NextResponse.json(summary);
  } catch (err) {
    const message = err instanceof Error ? err.message : "session_failed";
    return NextResponse.json(
      { error: "session_failed", reason: message },
      { status: 503 },
    );
  }
}
