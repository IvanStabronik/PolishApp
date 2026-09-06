/**
 * Only allow same-origin relative paths (no protocol-relative //…).
 * Safe to import from client or server.
 */
export function safeReturnTo(path: string | null | undefined): string | null {
  if (!path) return null;
  const trimmed = path.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  if (trimmed.includes("://")) return null;
  return trimmed;
}
