import { createHash } from "node:crypto";
import { sanitizeAnalyticsDimensions } from "./metrics";

/** Sort keys recursively so identical dimension maps collide on the same key. */
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

/** Stable SHA-256 hex of canonical JSON — used as UPSERT conflict target. */
export function analyticsDimensionsKey(
  dims: Record<string, unknown> | undefined,
): string {
  const canonical = canonicalizeAnalyticsDimensions(dims);
  return createHash("sha256")
    .update(JSON.stringify(canonical))
    .digest("hex");
}
