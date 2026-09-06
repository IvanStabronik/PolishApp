/**
 * Privacy audit subject identifier — HMAC-SHA256, never store deleted email in clear.
 *
 * Format: `v1:<hex>` where hex = HMAC-SHA256(secret, `v1|userId`).
 * Secret is server-only (PRIVACY_AUDIT_SECRET or BETTER_AUTH_SECRET).
 */

import { createHmac, timingSafeEqual } from "node:crypto";

const PREFIX = "v1";

function resolveAuditSecret(): string {
  const dedicated = process.env.PRIVACY_AUDIT_SECRET;
  if (dedicated && dedicated.length >= 16) return dedicated;
  const fallback = process.env.BETTER_AUTH_SECRET;
  if (fallback && fallback.length >= 16) return fallback;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "PRIVACY_AUDIT_SECRET or BETTER_AUTH_SECRET required for privacy audit HMAC",
    );
  }
  // Deterministic local/dev fallback — not for production.
  return "slowarium-dev-privacy-audit-secret";
}

/**
 * Stable, non-reversible subject marker for delete-completed audit rows.
 * Never pass email/name — only opaque user id.
 */
export function privacyAuditSubjectId(userId: string): string {
  const secret = resolveAuditSecret();
  const mac = createHmac("sha256", secret)
    .update(`${PREFIX}|${userId}`, "utf8")
    .digest("hex");
  return `${PREFIX}:${mac}`;
}

/** Compare two audit ids in constant time when lengths match. */
export function privacyAuditIdsEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}
