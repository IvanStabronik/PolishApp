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

/**
 * Server-side private-alpha preview *environment* gate.
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

/** @deprecated Prefer isPrivateAlphaPreviewEnv + canAccessDraftContent. */
export function isDemoPreviewEnabled(): boolean {
  return isPrivateAlphaPreviewEnv();
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
   * Preview environment enabled (server DEMO_PREVIEW / DEMO_MODE).
   * When false, DRAFT is denied even to staff (security e2e).
   */
  isPreviewEnv?: boolean;
  /** Optional email for DEMO_MODE seeded-account path. */
  email?: string | null;
};

/**
 * DRAFT access authorization (server-side).
 * - roles include previewer | author | reviewer | admin, and preview env is on; OR
 * - DEMO_MODE && seeded demo email && role includes previewer
 *
 * Never trusts NEXT_PUBLIC alone.
 */
export function canAccessDraftContent(input: DraftAccessInput): boolean {
  if (input.isPreviewEnv === false) return false;

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
