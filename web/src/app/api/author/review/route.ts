import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { getModuleById } from "@/lib/content/load-module";
import { isPrivateAlphaPreviewEnv } from "@/lib/demo";
import {
  applyReviewVerdict,
  attemptPublish,
  canAccessAuthorArea,
  submitForReview,
  type ContentVersionView,
} from "@/modules/content/review-workflow";
import { getDb } from "@/db/client";
import { privacyAudit } from "@/db/schema";

export const runtime = "nodejs";

const BodySchema = z.object({
  moduleId: z.string().min(1),
  action: z.enum(["submit_for_review", "verdict", "publish"]),
  verdict: z.enum(["approve", "request_changes"]).optional(),
  comment: z.string().max(2000).optional(),
});

/**
 * Author/reviewer transitions. Status changes are audited; YAML on disk stays DRAFT
 * until a future content-version store persists lifecycle (M3 closed beta).
 */
export async function POST(request: Request) {
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
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  });
  if (!mod) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const version: ContentVersionView = {
    id: `ver-${mod.id}-${mod.version}`,
    moduleId: mod.id,
    title: mod.titlePl,
    status: mod.status,
    authorId: session.user.id,
    version: Number(mod.version) || 1,
    provenanceNotes: mod.provenance.notes ?? "",
    curriculumLinks: mod.provenance.sources,
  };

  let result;
  if (parsed.data.action === "submit_for_review") {
    result = submitForReview({
      version,
      actorId: session.user.id,
      actorRoles: session.roles,
      comment: parsed.data.comment,
    });
  } else if (parsed.data.action === "verdict") {
    result = applyReviewVerdict({
      version: { ...version, status: "IN_REVIEW" },
      actorId: session.user.id,
      actorRoles: session.roles,
      verdict: parsed.data.verdict ?? "request_changes",
      comment: parsed.data.comment,
    });
  } else {
    result = attemptPublish({
      version: { ...version, status: "APPROVED" },
      actorId: session.user.id,
      actorRoles: session.roles,
    });
  }

  if (result.audit) {
    try {
      const db = getDb();
      await db.insert(privacyAudit).values({
        actorUserId: session.user.id,
        subjectUserId: session.user.id,
        action: `content_${result.audit.action}`,
        details: {
          moduleId: mod.id,
          from: result.from,
          to: result.to,
          comment: result.audit.comment,
          at: result.audit.at,
        },
      });
    } catch {
      /* audit best-effort */
    }
  }

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error, from: result.from },
      { status: 400 },
    );
  }
  return NextResponse.json({
    ok: true,
    from: result.from,
    to: result.to,
    note: "Lifecycle transition recorded; packaged YAML remains DRAFT until content-version persistence.",
  });
}
