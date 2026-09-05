/**
 * Attempt mode + publication guards (pure — safe for unit tests).
 * Preview attempts may be stored; only non-preview modes feed live mastery.
 */

export type AttemptMode = "formative" | "summative" | "preview";

export type ResolveAttemptModeInput = {
  /** Client preview flag (exercise player / internal preview). */
  preview?: boolean;
  /** Optional explicit mode from client; summative ignored unless allowSummative. */
  mode?: AttemptMode;
  isDemoUser: boolean;
  demoPreviewEnabled: boolean;
  allowSummative?: boolean;
};

/**
 * Resolve attempt mode for persistence.
 * - Demo users in DEMO_PREVIEW default to formative (progress works in demo).
 * - Other preview traffic defaults to preview (stored, but no live mastery).
 * - Never promotes content to PUBLISHED (orthogonal — see assertNoContentPublish).
 */
export function resolveAttemptMode(input: ResolveAttemptModeInput): AttemptMode {
  if (input.mode === "summative") {
    return input.allowSummative ? "summative" : "formative";
  }
  if (input.mode === "preview") return "preview";
  if (input.mode === "formative") return "formative";

  const previewContext =
    Boolean(input.preview) || input.demoPreviewEnabled;

  if (previewContext) {
    return input.isDemoUser ? "formative" : "preview";
  }
  return "formative";
}

export function shouldWriteMastery(mode: AttemptMode): boolean {
  return mode !== "preview";
}

/**
 * Hard guard: attempt / learning flows must never mark content PUBLISHED.
 * Throws if a caller tries to.
 */
export function assertNoContentPublish(action: {
  touchContentStatus?: string | null;
}): void {
  if (action.touchContentStatus === "PUBLISHED") {
    throw new Error(
      "Publication guard: learning attempts must not mark content PUBLISHED",
    );
  }
}

/** Map DB mastery_state → progress UI badge. */
export function masteryStateToBadge(
  state: string,
): "mastered" | "emerging" | "not_started" {
  switch (state) {
    case "MASTERED":
    case "DEMONSTRATED":
      return "mastered";
    case "LEARNING":
    case "PRACTICING":
    case "REVIEW_DUE":
      return "emerging";
    case "NOT_STARTED":
    default:
      return "not_started";
  }
}

export function isDemoAccountEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return (
    normalized.endsWith("@demo.slowarium.local") ||
    normalized.includes("demo.slowarium")
  );
}
