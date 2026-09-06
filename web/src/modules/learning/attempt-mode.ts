/**
 * Attempt mode + publication guards (pure — safe for unit tests).
 * Server decides mode from content status; client preview/mode are never authoritative.
 */

import type { ContentStatus } from "@/lib/enums";

export type AttemptMode = "formative" | "summative" | "preview";

export type MasteryScope = "preview" | "live";

export type ResolveAttemptModeInput = {
  /** Content lifecycle status — sole authority for preview vs live. */
  contentStatus?: ContentStatus | null;
  /**
   * @deprecated Client flags are ignored. Kept for call-site compatibility.
   */
  preview?: boolean;
  /** @deprecated Client mode is ignored unless allowClientMode (tests only). */
  mode?: AttemptMode;
  isDemoUser?: boolean;
  demoPreviewEnabled?: boolean;
  allowSummative?: boolean;
  /** Test-only: honour explicit client mode. */
  allowClientMode?: boolean;
};

/**
 * Resolve attempt mode for persistence.
 * - DRAFT / IN_REVIEW / APPROVED → preview (stored, no live mastery)
 * - PUBLISHED → formative (or summative when allowSummative)
 * - Client preview/mode/correct are never trusted
 */
export function resolveAttemptMode(input: ResolveAttemptModeInput): AttemptMode {
  if (input.allowClientMode && input.mode) {
    if (input.mode === "summative") {
      return input.allowSummative ? "summative" : "formative";
    }
    return input.mode;
  }

  const status = input.contentStatus;
  if (
    status === "DRAFT" ||
    status === "IN_REVIEW" ||
    status === "APPROVED"
  ) {
    return "preview";
  }

  if (status === "PUBLISHED") {
    if (input.mode === "summative" && input.allowSummative) {
      return "summative";
    }
    return "formative";
  }

  // Unknown / missing status: treat as preview (safe default for private alpha).
  return "preview";
}

export function masteryScopeForMode(mode: AttemptMode): MasteryScope {
  return mode === "preview" ? "preview" : "live";
}

export function shouldWriteMastery(mode: AttemptMode): boolean {
  // Preview attempts still write preview-scoped mastery for private-alpha UX.
  return mode === "formative" || mode === "summative" || mode === "preview";
}

/** Live (non-preview) mastery only. */
export function shouldWriteLiveMastery(mode: AttemptMode): boolean {
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
