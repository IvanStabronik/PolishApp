import type { UserRole } from "@/lib/enums";
import { DEMO_ACCOUNTS, isDemoMode } from "@/modules/auth/demo";
import { canPreviewDraft } from "@/modules/auth/roles";

/**
 * Build-time / docs flag only. NEVER authorize DRAFT content from this alone —
 * clients can forge NEXT_PUBLIC_* values.
 */
export function isPublicDemoPreviewEnv(): boolean {
  return (
    process.env.NEXT_PUBLIC_DEMO_PREVIEW === "1" ||
    process.env.NEXT_PUBLIC_DEMO_PREVIEW === "true"
  );
}

function envFlagTrue(name: string): boolean {
  const v = process.env[name];
  return v === "1" || v === "true";
}

/**
 * Closed-beta DRAFT learning without DEMO_MODE / DEMO_PREVIEW theater.
 * Safe to enable in production with BETA_MODE (invitees hold previewer).
 * Aliases: BETA_ALLOW_DRAFT, CLOSED_BETA_PREVIEW, ALLOW_DRAFT_PREVIEW.
 */
export function isClosedBetaDraftEnv(): boolean {
  return (
    envFlagTrue("BETA_ALLOW_DRAFT") ||
    envFlagTrue("CLOSED_BETA_PREVIEW") ||
    envFlagTrue("ALLOW_DRAFT_PREVIEW")
  );
}

/**
 * Server-side private-alpha preview *environment* gate (demo path).
 * Uses DEMO_PREVIEW / DEMO_MODE only — not NEXT_PUBLIC alone.
 * Explicit DEMO_PREVIEW=false|0 wins (e2e publish-gate).
 */
export function isPrivateAlphaPreviewEnv(): boolean {
  const demo = process.env.DEMO_PREVIEW;
  if (demo === "0" || demo === "false") return false;
  if (demo === "1" || demo === "true") return true;

  const mode = process.env.DEMO_MODE;
  if (mode === "0" || mode === "false") return false;
  if (mode === "1" || mode === "true") return true;

  return false;
}

/**
 * Environment allows DRAFT learning for authorized roles:
 * closed-beta flag OR classic DEMO_PREVIEW / DEMO_MODE.
 */
export function isDraftLearningEnvEnabled(): boolean {
  if (isClosedBetaDraftEnv()) return true;
  return isPrivateAlphaPreviewEnv();
}

/** @deprecated Prefer isDraftLearningEnvEnabled + canAccessDraftContent. */
export function isDemoPreviewEnabled(): boolean {
  return isDraftLearningEnvEnabled();
}

const SEEDED_DEMO_EMAILS = new Set(
  Object.values(DEMO_ACCOUNTS).map((a) => a.email.toLowerCase()),
);

export function isSeededDemoEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return SEEDED_DEMO_EMAILS.has(email.trim().toLowerCase());
}

export type DraftAccessInput = {
  roles: readonly UserRole[];
  /**
   * Draft-learning environment enabled (BETA_ALLOW_DRAFT / DEMO_PREVIEW / DEMO_MODE).
   * When false, DRAFT is denied even to staff (security e2e).
   */
  isPreviewEnv?: boolean;
  /** Optional email for DEMO_MODE seeded-account path. */
  email?: string | null;
};

/**
 * DRAFT access authorization (server-side).
 * - roles include previewer | author | reviewer | admin, and draft-learning env is on; OR
 * - DEMO_MODE && seeded demo email && role includes previewer
 *
 * Never trusts NEXT_PUBLIC alone.
 * Pass `isPreviewEnv: false` to force deny (publish-gate e2e).
 * Pass `isPreviewEnv: true` when the caller already resolved draft-learning env.
 * Omit `isPreviewEnv` to consult `isDraftLearningEnvEnabled()` (BETA_ALLOW_DRAFT / DEMO_*).
 */
export function canAccessDraftContent(input: DraftAccessInput): boolean {
  if (input.isPreviewEnv === false) return false;
  if (
    input.isPreviewEnv === undefined &&
    !isDraftLearningEnvEnabled()
  ) {
    return false;
  }

  if (canPreviewDraft(input.roles)) {
    return true;
  }

  if (
    isDemoMode() &&
    isSeededDemoEmail(input.email) &&
    input.roles.includes("previewer")
  ) {
    return true;
  }

  return false;
}
