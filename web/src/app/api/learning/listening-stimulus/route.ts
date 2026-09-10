import { NextResponse } from "next/server";
import { z } from "zod";
import { getExercise } from "@/lib/content/load-module";
import {
  canAccessDraftContent,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";
import { getRequestSession } from "@/modules/auth/session";

export const runtime = "nodejs";

const BodySchema = z.object({
  moduleId: z.string().min(1),
  exerciseId: z.string().min(1),
});

/**
 * Listening TTS stimulus fetch — authenticated, not embedded in lesson DTO.
 * Still an interim leak vector via network; do not render text in the DOM.
 * Never returns correctIndex / options answer keys.
 */
export async function POST(req: Request) {
  const session = await getRequestSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  };
  if (
    !canAccessDraftContent(accessCtx) &&
    !accessCtx.isPreviewEnv &&
    session.roles.length === 0
  ) {
    /* signed-in learners still get DRAFT when beta flag on via canAccess */
  }

  const exercise = getExercise(
    parsed.data.moduleId,
    parsed.data.exerciseId,
    accessCtx,
  );
  if (!exercise || exercise.type !== "listening") {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    textPl: exercise.audioTextPl,
    ...(exercise.audioUrl ? { audioUrl: exercise.audioUrl } : {}),
  });
}
