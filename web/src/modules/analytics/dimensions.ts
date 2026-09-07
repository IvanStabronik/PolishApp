import { createHash } from "node:crypto";
import { sanitizeAnalyticsDimensions } from "./metrics";

/** Sort keys so identical dimension maps collide on the same key. */
export function canonicalizeAnalyticsDimensions(
  dims: Record<string, unknown> | undefined,
): Record<string, unknown> {
  const sanitized = sanitizeAnalyticsDimensions(dims);
  const sorted: Record<string, unknown> = {};
  for (const key of Object.keys(sanitized).sort()) {
    sorted[key] = sanitized[key];
  }
  return sorted;
}

/**
 * Compact canonical JSON (sorted keys, JSON.stringify spacing).
 * Must stay in lockstep with migration 0007 SQL builder.
 */
export function analyticsDimensionsCanonicalJson(
  dims: Record<string, unknown> | undefined,
): string {
  return JSON.stringify(canonicalizeAnalyticsDimensions(dims));
}

/**
 * MD5 hex of canonical JSON (identity checksum, not security).
 * Shared by runtime UPSERT/lookup and migration 0007 reconciliation.
 */
export function analyticsDimensionsKey(
  dims: Record<string, unknown> | undefined,
): string {
  return createHash("md5")
    .update(analyticsDimensionsCanonicalJson(dims), "utf8")
    .digest("hex");
}
