/**
 * Author/reviewer content workflow (CNT-020).
 * PUBLISHED blocked until DEC-016 / JPJO publication gates close.
 */

import {
  assertAuthorNotReviewer,
  assertTransition,
  canTransition,
} from "@/modules/content/lifecycle";
import type { ContentStatus } from "@/lib/enums";

export type ReviewVerdict = "approve" | "request_changes";

export type ContentVersionView = {
  id: string;
  moduleId: string;
  title: string;
  status: ContentStatus;
  authorId: string;
  version: number;
  provenanceNotes: string;
  curriculumLinks: string[];
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
 * (product label: changes requested). Author cannot approve own version.
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
  const to: ContentStatus = verdict === "approve" ? "APPROVED" : "REJECTED";
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
  return [
    `# Review packet — ${version.title}`,
    "",
    `- Version id: ${version.id}`,
    `- Module: ${version.moduleId}`,
    `- Status: ${version.status}`,
    `- Author: ${version.authorId}`,
    `- Curriculum links: ${version.curriculumLinks.join(", ") || "—"}`,
    "",
    "## Provenance",
    version.provenanceNotes || "—",
    "",
    "## Publication",
    "PUBLISHED is blocked pending independent JPJO review (DEC-016).",
    "This packet does not simulate an independent expert decision.",
    "",
  ].join("\n");
}

export function buildReviewPacketJson(version: ContentVersionView): string {
  return JSON.stringify(
    {
      format: "slowarium.review-packet.v1",
      ...version,
      publication: {
        published: false,
        blockedReason: "DEC-016 / JPJO gates open",
      },
    },
    null,
    2,
  );
}
