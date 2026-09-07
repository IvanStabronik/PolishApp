import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import type { UserRole } from "@/lib/enums";
import { isDemoAccountEmail } from "@/modules/learning/attempt-mode";
import type { AppSession } from "./session";

export const BETA_ACCESS_REVOKED_ERROR = "beta_access_revoked" as const;

/**
 * Staff / seeded demo accounts are never gated by beta deactivation.
 * Invitee learners with betaAccessRevokedAt lose product access.
 */
export function resolveBetaAccessActive(input: {
  roles: UserRole[];
  email: string;
  betaAccessRevokedAt: Date | null | undefined;
}): boolean {
  if (input.roles.includes("admin")) return true;
  if (input.roles.includes("author") || input.roles.includes("reviewer")) {
    return true;
  }
  if (isDemoAccountEmail(input.email)) return true;
  return !input.betaAccessRevokedAt;
}

/** API guard — stable 403 code for deactivated invitees. */
export function betaAccessForbiddenResponse() {
  return NextResponse.json(
    { error: BETA_ACCESS_REVOKED_ERROR },
    { status: 403 },
  );
}

/**
 * Product surfaces (dashboard, lessons, attempts, plan, review, feedback)
 * require active beta access. Staff/demo bypass via AppSession.betaAccessActive.
 */
export function assertBetaAccessActive(
  session: AppSession,
): NextResponse | null {
  if (session.betaAccessActive) return null;
  return betaAccessForbiddenResponse();
}

/** Page guard — send deactivated invitees to the explicit disabled state. */
export function redirectIfBetaAccessRevoked(
  locale: string,
  session: AppSession,
): void {
  if (session.betaAccessActive) return;
  redirect(`/${locale}/beta-disabled`);
}
