import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { contentVersions, jpjoReviewVerdicts } from "@/db/schema";
import { recordAdminEvent } from "@/modules/admin/audit";

export type JpjoVerdict = "approve" | "changes_requested" | "reject" | "abstain";

export function fingerprintContentPayload(payload: unknown): string {
  return createHash("sha256")
    .update(JSON.stringify(payload ?? null))
    .digest("hex");
}

/**
 * Import a structured JPJO reviewer verdict.
 * Never auto-flips content to PUBLISHED / JPJO-approved product flag.
 */
export async function importJpjoVerdict(input: {
  actorUserId: string;
  reviewerIdentity: string;
  externalRef?: string;
  contentVersionId: string;
  expectedFingerprint: string;
  verdict: JpjoVerdict;
  comment?: string;
  evidence?: Record<string, unknown>;
  correlationId?: string;
}): Promise<
  | { ok: true; id: string }
  | {
      ok: false;
      reason: "version_not_found" | "fingerprint_mismatch" | "conflict";
    }
> {
  const db = getDb();
  const version = await db.query.contentVersions.findFirst({
    where: eq(contentVersions.id, input.contentVersionId),
  });
  if (!version) return { ok: false, reason: "version_not_found" };

  const actual = fingerprintContentPayload(version.payload);
  if (actual !== input.expectedFingerprint) {
    return { ok: false, reason: "fingerprint_mismatch" };
  }

  const externalRef = input.externalRef ?? "";
  const existing = await db.query.jpjoReviewVerdicts.findFirst({
    where: and(
      eq(jpjoReviewVerdicts.contentVersionId, input.contentVersionId),
      eq(jpjoReviewVerdicts.reviewerIdentity, input.reviewerIdentity),
      eq(jpjoReviewVerdicts.externalRef, externalRef),
    ),
  });
  if (existing) return { ok: false, reason: "conflict" };

  try {
    const [row] = await db
      .insert(jpjoReviewVerdicts)
      .values({
        reviewerIdentity: input.reviewerIdentity,
        externalRef,
        contentVersionId: input.contentVersionId,
        contentFingerprint: actual,
        verdict: input.verdict,
        comment: input.comment ?? null,
        evidence: input.evidence ?? {},
        importedByUserId: input.actorUserId,
      })
      .returning({ id: jpjoReviewVerdicts.id });

    await recordAdminEvent({
      actorUserId: input.actorUserId,
      action: "jpjo.verdict_imported",
      subjectType: "content_version",
      subjectId: input.contentVersionId,
      details: {
        verdict: input.verdict,
        reviewerIdentity: input.reviewerIdentity,
        externalRef,
        // Explicit: does NOT approve public release
        publicReleaseStillBlocked: true,
      },
      correlationId: input.correlationId,
    });

    return { ok: true, id: row!.id };
  } catch {
    return { ok: false, reason: "conflict" };
  }
}
