import type { ContentStatus } from "@/lib/enums";

/** Allowed status transitions (content-pipeline.md). DRAFT → PUBLISHED is forbidden. */
const ALLOWED: Record<ContentStatus, readonly ContentStatus[]> = {
  DRAFT: ["IN_REVIEW", "ARCHIVED"],
  IN_REVIEW: ["APPROVED", "REJECTED", "DRAFT"],
  APPROVED: ["PUBLISHED", "REJECTED", "IN_REVIEW"],
  PUBLISHED: ["ARCHIVED"],
  REJECTED: ["DRAFT"],
  ARCHIVED: [],
};

export function canTransition(
  from: ContentStatus,
  to: ContentStatus,
): boolean {
  return ALLOWED[from].includes(to);
}

export function assertTransition(
  from: ContentStatus,
  to: ContentStatus,
): void {
  if (!canTransition(from, to)) {
    throw new Error(`Illegal content lifecycle transition: ${from} → ${to}`);
  }
}

/** CNT-020 / FUN-175 — author must not approve their own version. */
export function assertAuthorNotReviewer(
  authorId: string,
  reviewerId: string,
): void {
  if (authorId === reviewerId) {
    throw new Error(
      "Self-review prohibited: authorId must not equal reviewerId",
    );
  }
}

export function isLearnerVisible(status: ContentStatus): boolean {
  return status === "PUBLISHED";
}

/**
 * Learner catalog visibility with optional DEMO_PREVIEW for draft packages.
 * Never treats DRAFT as published — preview is gated separately.
 */
export function isContentVisibleToLearner(
  status: ContentStatus,
  opts: { demoPreview?: boolean } = {},
): boolean {
  if (isLearnerVisible(status)) return true;
  if (
    opts.demoPreview &&
    (status === "DRAFT" || status === "IN_REVIEW" || status === "APPROVED")
  ) {
    return true;
  }
  return false;
}
