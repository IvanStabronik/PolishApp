import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestSession } from "@/modules/auth/session";
import { canAccessAdminArea } from "@/modules/admin/roles";
import { importJpjoVerdict } from "@/modules/jpjo/service";
import {
  assertSameOrigin,
  getCorrelationId,
} from "@/modules/ops/runtime";

export const runtime = "nodejs";

const BodySchema = z.object({
  reviewerIdentity: z.string().min(2).max(200),
  externalRef: z.string().max(200).optional(),
  contentVersionId: z.string().uuid(),
  expectedFingerprint: z.string().min(16).max(128),
  verdict: z.enum(["approve", "changes_requested", "reject", "abstain"]),
  comment: z.string().max(5000).optional(),
  evidence: z.record(z.string(), z.unknown()).optional(),
});

/**
 * JPJO verdict intake only. Never auto-sets public release / PUBLISHED.
 */
export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "origin_rejected" }, { status: 403 });
  }
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  if (!canAccessAdminArea(session.roles)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed" }, { status: 400 });
  }

  const result = await importJpjoVerdict({
    actorUserId: session.user.id,
    ...parsed.data,
    correlationId,
  });

  if (!result.ok) {
    const status =
      result.reason === "version_not_found"
        ? 404
        : result.reason === "fingerprint_mismatch"
          ? 409
          : 409;
    return NextResponse.json(
      {
        error: result.reason,
        publicContentRelease: "BLOCKED PENDING INDEPENDENT JPJO REVIEW",
      },
      { status },
    );
  }

  return NextResponse.json({
    ok: true,
    id: result.id,
    publicContentRelease: "BLOCKED PENDING INDEPENDENT JPJO REVIEW",
    note: "Verdict stored as immutable evidence; does not unlock public release.",
  });
}
