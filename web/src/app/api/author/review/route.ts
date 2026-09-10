import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { getModuleById } from "@/lib/content/load-module";
import { isDraftLearningEnvEnabled } from "@/lib/demo";
import { canAccessAuthorArea } from "@/modules/content/review-workflow";
import { persistReviewTransition } from "@/modules/content/persist-review-transition";
import {
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
} from "@/modules/ops/runtime";

export const runtime = "nodejs";

const BodySchema = z.object({
  moduleId: z.string().min(1),
  action: z.enum(["submit_for_review", "verdict", "publish"]),
  verdict: z.enum(["approve", "request_changes"]).optional(),
  comment: z.string().max(2000).optional(),
});

/**
 * Author/reviewer transitions — persisted on content_versions / reviews /
 * publication_events. Never writes privacy_audit for content lifecycle.
 */
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
  if (!canAccessAuthorArea(session.roles)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
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

  const mod = getModuleById(parsed.data.moduleId, {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  });
  if (!mod) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const result = await persistReviewTransition({
    moduleId: parsed.data.moduleId,
    action: parsed.data.action,
    actorId: session.user.id,
    actorRoles: session.roles,
    verdict: parsed.data.verdict,
    comment: parsed.data.comment,
  });

  if (result.error === "not_found") {
    return NextResponse.json(
      { ok: false, error: "not_found", status: result.status },
      { status: 404 },
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: result.error,
        from: result.from,
        status: result.status,
        contentVersionId: result.contentVersionId,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    from: result.from,
    to: result.to,
    status: result.status,
    contentVersionId: result.contentVersionId,
  });
}
