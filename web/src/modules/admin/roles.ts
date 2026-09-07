import type { UserRole } from "@/lib/enums";

export function canAccessAdminArea(roles: readonly UserRole[]): boolean {
  return roles.includes("admin");
}

export function isBetaModeEnabled(): boolean {
  const v = process.env.BETA_MODE ?? process.env.INVITE_REQUIRED;
  return v === "true" || v === "1";
}

/** Production seed must never create demo accounts via DEMO_MODE alone. */
export function allowDemoSeed(): boolean {
  if (process.env.FORCE_SEED === "true" || process.env.FORCE_SEED === "1") {
    return true;
  }
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_PRODUCTION_DEMO !== "true") {
    return false;
  }
  return (
    process.env.DEMO_MODE === "true" ||
    process.env.DEMO_MODE === "1"
  );
}

/**
 * Demo / preview cannot enable via a single public env alone.
 * Requires server DEMO_MODE or DEMO_PREVIEW (never NEXT_PUBLIC_* alone).
 */
export function isDemoPreviewAuthorizedByServer(): boolean {
  const serverDemo =
    process.env.DEMO_MODE === "true" ||
    process.env.DEMO_MODE === "1" ||
    process.env.DEMO_PREVIEW === "true" ||
    process.env.DEMO_PREVIEW === "1";
  const publicOnly =
    (process.env.NEXT_PUBLIC_DEMO_PREVIEW === "true" ||
      process.env.NEXT_PUBLIC_DEMO_PREVIEW === "1") &&
    !serverDemo;
  return serverDemo && !publicOnly;
}
