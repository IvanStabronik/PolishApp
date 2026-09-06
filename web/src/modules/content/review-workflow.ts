/**
 * Author/reviewer content workflow (CNT-020).
 * PUBLISHED blocked until DEC-016 / JPJO publication gates close.
 *
 * Product CHANGES_REQUESTED → DB status REJECTED (see lifecycle.ts).
 */

import {
  assertAuthorNotReviewer,
  assertTransition,
  canTransition,
  CHANGES_REQUESTED_DB_STATUS,
} from "@/modules/content/lifecycle";
import type { ContentStatus } from "@/lib/enums";

export type ReviewVerdict = "approve" | "request_changes";

export type ReviewRecordView = {
  id: string;
  decision: "approve" | "reject";
  comment: string | null;
  reviewerUserId: string;
  createdAt: string;
};

export type ContentVersionView = {
  id: string;
  moduleId: string;
  title: string;
  status: ContentStatus;
  authorId: string;
  reviewerId?: string | null;
  version: number;
  provenanceNotes: string;
  curriculumLinks: string[];
  reviews?: ReviewRecordView[];
};

export type ReviewTransitionInput = {
  version: ContentVersionView;
  actorId: string;
  actorRoles: readonly string[];
  verdict?: ReviewVerdict;
  comment?: string;
};

export type ReviewTransitionResult = {
  ok: boolean;
  from: ContentStatus;
  to: ContentStatus | null;
  audit: {
    at: string;
    actorId: string;
    action: string;
    comment: string | null;
  } | null;
  error?: string;
};

const AUTHOR_ROLES = new Set(["author", "admin"]);
const REVIEWER_ROLES = new Set(["reviewer", "admin"]);

export function canAccessAuthorArea(roles: readonly string[]): boolean {
  return roles.some((r) => AUTHOR_ROLES.has(r) || REVIEWER_ROLES.has(r));
}

export function canAccessReviewerArea(roles: readonly string[]): boolean {
  return roles.some((r) => REVIEWER_ROLES.has(r));
}

/**
 * Submit DRAFT → IN_REVIEW (author).
 */
export function submitForReview(
  input: ReviewTransitionInput,
): ReviewTransitionResult {
  if (!input.actorRoles.some((r) => AUTHOR_ROLES.has(r))) {
    return fail(input.version.status, "forbidden_author");
  }
  if (input.version.authorId !== input.actorId && !input.actorRoles.includes("admin")) {
    return fail(input.version.status, "not_own_version");
  }
  return apply(input, "IN_REVIEW", "submit_for_review");
}

/**
 * Reviewer verdict: approve → APPROVED, request_changes → REJECTED
 * (product label: CHANGES_REQUESTED — DB enum has no separate value).
 * Author cannot approve own version.
 * request_changes requires a non-empty comment.
 * PUBLISHED is never applied here — gated by DEC-016.
 */
export function applyReviewVerdict(
  input: ReviewTransitionInput,
): ReviewTransitionResult {
  if (!canAccessReviewerArea(input.actorRoles)) {
    return fail(input.version.status, "forbidden_reviewer");
  }
  try {
    assertAuthorNotReviewer(input.version.authorId, input.actorId);
  } catch {
    return fail(input.version.status, "self_review_prohibited");
  }
  if (input.version.status !== "IN_REVIEW") {
    return fail(input.version.status, "not_in_review");
  }
  const verdict = input.verdict ?? "request_changes";
  if (verdict === "request_changes" && !input.comment?.trim()) {
    return fail(input.version.status, "comment_required");
  }
  const to: ContentStatus =
    verdict === "approve" ? "APPROVED" : CHANGES_REQUESTED_DB_STATUS;
  return apply(input, to, verdict === "approve" ? "approve" : "request_changes");
}

/**
 * Attempt PUBLISHED — always blocked until publication gates close.
 */
export function attemptPublish(
  input: ReviewTransitionInput,
): ReviewTransitionResult {
  if (!input.actorRoles.includes("admin")) {
    return fail(input.version.status, "forbidden_publish");
  }
  return {
    ok: false,
    from: input.version.status,
    to: null,
    audit: {
      at: new Date().toISOString(),
      actorId: input.actorId,
      action: "publish_blocked",
      comment:
        "PUBLICATION BLOCKED: DEC-016 / independent JPJO review / normative claims gates open",
    },
    error: "publication_gates_open",
  };
}

function apply(
  input: ReviewTransitionInput,
  to: ContentStatus,
  action: string,
): ReviewTransitionResult {
  const from = input.version.status;
  if (!canTransition(from, to)) {
    try {
      assertTransition(from, to);
    } catch {
      return fail(from, `illegal_transition_${from}_${to}`);
    }
  }
  return {
    ok: true,
    from,
    to,
    audit: {
      at: new Date().toISOString(),
      actorId: input.actorId,
      action,
      comment: input.comment ?? null,
    },
  };
}

function fail(
  from: ContentStatus,
  error: string,
): ReviewTransitionResult {
  return { ok: false, from, to: null, audit: null, error };
}

export function buildReviewPacketMarkdown(version: ContentVersionView): string {
  const reviewLines =
    version.reviews && version.reviews.length > 0
      ? version.reviews.map(
          (r) =>
            `- ${r.decision} by ${r.reviewerUserId} (${r.createdAt}): ${r.comment ?? "—"}`,
        )
      : ["- —"];

  return [
    `# Review packet — ${version.title}`,
    "",
    `- Version id: ${version.id}`,
    `- Module: ${version.moduleId}`,
    `- Status: ${version.status}`,
    `- Author: ${version.authorId || "—"}`,
    `- Reviewer: ${version.reviewerId ?? "—"}`,
    `- Curriculum links: ${version.curriculumLinks.join(", ") || "—"}`,
    "",
    "## Decisions / comments",
    ...reviewLines,
    "",
    "## Provenance",
    version.provenanceNotes || "—",
    "",
    "## Publication",
    "PUBLISHED is blocked pending independent JPJO review (DEC-016).",
    "This packet does not simulate an independent expert decision.",
    "REJECTED is the DB equivalent of CHANGES_REQUESTED.",
    "",
  ].join("\n");
}

export function buildReviewPacketJson(version: ContentVersionView): string {
  return JSON.stringify(
    {
      format: "slowarium.review-packet.v1",
      id: version.id,
      moduleId: version.moduleId,
      title: version.title,
      status: version.status,
      authorId: version.authorId,
      reviewerId: version.reviewerId ?? null,
      version: version.version,
      provenanceNotes: version.provenanceNotes,
      curriculumLinks: version.curriculumLinks,
      reviews: version.reviews ?? [],
      publication: {
        published: false,
        blockedReason: "DEC-016 / JPJO gates open",
      },
      notes: {
        changesRequestedDbStatus: CHANGES_REQUESTED_DB_STATUS,
      },
    },
    null,
    2,
  );
}
