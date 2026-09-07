/** Pure auth policy helpers (safe for unit tests without DATABASE_URL). */

export function authUsesSecureCookies(url: string): boolean {
  return url.startsWith("https://");
}

/** Exported for unit tests — Better Auth builtin limiter is off in CI. */
export function authBuiltinRateLimitEnabled(ci: boolean): boolean {
  return !ci;
}
