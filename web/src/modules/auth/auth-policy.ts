/** Pure auth policy helpers (safe for unit tests without DATABASE_URL). */

export function authUsesSecureCookies(url: string): boolean {
  return url.startsWith("https://");
}

/**
 * Better Auth builtin limiter config value.
 * - CI: forced off (E2E shares one runner IP; app-level Postgres limits still apply)
 * - non-CI: `undefined` so Better Auth keeps its own prod/dev defaults
 *   (do not force `true` — that throttles local `next dev`)
 */
export function authBuiltinRateLimitEnabled(
  ci: boolean,
): boolean | undefined {
  return ci ? false : undefined;
}
