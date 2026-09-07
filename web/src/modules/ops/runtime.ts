import { z } from "zod";

const truthy = z
  .string()
  .optional()
  .transform((v) => v === "true" || v === "1");

const falsyOrUnset = z
  .string()
  .optional()
  .transform((v) => {
    if (v === undefined || v === "") return false;
    return v === "true" || v === "1";
  });

export const RuntimeEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(16),
  BETTER_AUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  APP_URL: z.string().url().optional(),
  TRUSTED_ORIGINS: z.string().optional(),
  INVITE_TOKEN_PEPPER: z.string().min(8).optional(),
  PRIVACY_AUDIT_SECRET: z.string().min(8).optional(),
  BETA_MODE: truthy.optional(),
  DEMO_MODE: falsyOrUnset.optional(),
  DEMO_PREVIEW: falsyOrUnset.optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  ALLOW_PRODUCTION_DEMO: truthy.optional(),
});

export type RuntimeEnv = z.infer<typeof RuntimeEnvSchema>;

let validated = false;

export function validateRuntimeEnv(
  env: NodeJS.ProcessEnv = process.env,
): RuntimeEnv {
  const parsed = RuntimeEnvSchema.safeParse({
    DATABASE_URL: env.DATABASE_URL,
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: env.BETTER_AUTH_URL,
    NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
    APP_URL: env.APP_URL,
    TRUSTED_ORIGINS: env.TRUSTED_ORIGINS,
    INVITE_TOKEN_PEPPER: env.INVITE_TOKEN_PEPPER,
    PRIVACY_AUDIT_SECRET: env.PRIVACY_AUDIT_SECRET,
    BETA_MODE: env.BETA_MODE,
    DEMO_MODE: env.DEMO_MODE,
    DEMO_PREVIEW: env.DEMO_PREVIEW,
    NODE_ENV: env.NODE_ENV,
    ALLOW_PRODUCTION_DEMO: env.ALLOW_PRODUCTION_DEMO,
  });
  if (!parsed.success) {
    const msg = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid runtime environment: ${msg}`);
  }

  const data = parsed.data;
  const isProd = data.NODE_ENV === "production";

  if (isProd) {
    const publicBase =
      data.BETTER_AUTH_URL ?? data.NEXT_PUBLIC_APP_URL ?? data.APP_URL;
    if (!publicBase) {
      throw new Error(
        "Production requires BETTER_AUTH_URL or NEXT_PUBLIC_APP_URL (or APP_URL)",
      );
    }
    try {
      const u = new URL(publicBase);
      if (u.protocol !== "https:" && !isLoopbackHost(u.hostname)) {
        throw new Error(
          "Production public URL must use https:// (loopback http allowed for local containers)",
        );
      }
    } catch (err) {
      if (err instanceof Error && err.message.startsWith("Production")) throw err;
      throw new Error("Production public URL is invalid");
    }

    if (!data.INVITE_TOKEN_PEPPER) {
      throw new Error("INVITE_TOKEN_PEPPER is required in production");
    }

    if (data.DEMO_MODE && !data.ALLOW_PRODUCTION_DEMO) {
      throw new Error(
        "DEMO_MODE cannot be enabled in production without ALLOW_PRODUCTION_DEMO=true",
      );
    }
    if (data.DEMO_PREVIEW && !data.ALLOW_PRODUCTION_DEMO) {
      throw new Error(
        "DEMO_PREVIEW cannot be enabled in production without ALLOW_PRODUCTION_DEMO=true",
      );
    }
    if (!data.BETA_MODE) {
      throw new Error(
        "BETA_MODE must be true for deployed private beta (open registration forbidden)",
      );
    }
  }

  validated = true;
  return data;
}

function isLoopbackHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "0.0.0.0"
  );
}

export function assertEnvValidated(): void {
  if (!validated && process.env.SKIP_ENV_VALIDATION !== "true") {
    validateRuntimeEnv();
  }
}

export function getCorrelationId(request?: Request): string {
  const fromHeader = request?.headers.get("x-correlation-id");
  if (fromHeader && /^[a-zA-Z0-9_-]{8,128}$/.test(fromHeader)) return fromHeader;
  return crypto.randomUUID();
}

const SECRETISH = /password|secret|token|authorization|cookie|email|database_url|pepper/i;

/** Strip secrets/PII-ish keys from structured log fields. */
export function sanitizeLogFields(
  fields: Record<string, unknown>,
): Record<string, unknown> {
  const safe: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (SECRETISH.test(k)) {
      safe[k] = "[redacted]";
    } else if (typeof v === "string" && looksLikeSecret(v)) {
      safe[k] = "[redacted]";
    } else {
      safe[k] = v;
    }
  }
  return safe;
}

function looksLikeSecret(value: string): boolean {
  if (value.length < 24) return false;
  if (/postgresql:\/\//i.test(value)) return true;
  if (/Bearer\s+/i.test(value)) return true;
  return false;
}

export function structuredLog(
  level: "info" | "warn" | "error",
  message: string,
  fields: Record<string, unknown> = {},
): void {
  const safe = sanitizeLogFields(fields);
  const line = JSON.stringify({
    level,
    msg: message,
    ts: new Date().toISOString(),
    ...safe,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/** Public error payload — never includes stack traces or internal details. */
export function publicErrorBody(
  code: string,
  correlationId?: string,
): { error: string; correlationId?: string } {
  return correlationId ? { error: code, correlationId } : { error: code };
}

export function resolveTrustedOrigins(
  env: NodeJS.ProcessEnv = process.env,
): string[] {
  const allowed = new Set<string>();
  for (const key of ["BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL", "APP_URL"]) {
    const v = env[key];
    if (v) {
      try {
        allowed.add(new URL(v).origin);
      } catch {
        /* ignore */
      }
    }
  }
  const extra = env.TRUSTED_ORIGINS;
  if (extra) {
    for (const part of extra.split(",")) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      try {
        allowed.add(new URL(trimmed).origin);
      } catch {
        /* ignore */
      }
    }
  }

  // Loopback Playwright ports: only when not a real public production host.
  // CI `next start` is NODE_ENV=production but BETTER_AUTH_URL is loopback —
  // those origins are already added from env above. Hardcoded loopback must
  // not remain on a public https private-beta host (stolen-cookie Origin spoof).
  if (shouldAllowHardcodedLoopbackOrigins(env)) {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
    allowed.add("http://localhost:3001");
    allowed.add("http://127.0.0.1:3001");
  }
  return [...allowed];
}

function shouldAllowHardcodedLoopbackOrigins(
  env: NodeJS.ProcessEnv,
): boolean {
  if ((env.NODE_ENV ?? process.env.NODE_ENV) !== "production") return true;
  for (const key of ["BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL", "APP_URL"]) {
    const v = env[key];
    if (!v) continue;
    try {
      if (isLoopbackHost(new URL(v).hostname)) return true;
    } catch {
      /* ignore */
    }
  }
  return false;
}

/**
 * CSRF / origin check for mutating cookie-session API requests.
 *
 * Browser clients: modern same-origin fetch/XHR always send `Origin`. Cross-site
 * POSTs send the attacker origin and must fail the allow-list.
 *
 * Missing `Origin`:
 * - `Sec-Fetch-Site: same-origin` | `none` → allow (Fetch Metadata).
 * - `Sec-Fetch-Site: cross-site` | `same-site` → reject.
 * - Cookie present → require trusted `Origin`, trusted `Referer`, or same-origin
 *   Sec-Fetch-Site (secure default for ambient browser sessions).
 * - No Cookie → allow (non-browser / server clients); auth still required
 *   separately — there is no ambient session cookie to forge via CSRF.
 */
export function assertSameOrigin(request: Request): boolean {
  const allowed = new Set(resolveTrustedOrigins());
  const origin = request.headers.get("origin");

  if (origin) {
    try {
      return allowed.has(new URL(origin).origin);
    } catch {
      return false;
    }
  }

  const secFetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
  if (secFetchSite === "same-origin" || secFetchSite === "none") {
    return true;
  }
  if (secFetchSite === "cross-site" || secFetchSite === "same-site") {
    return false;
  }

  const cookie = request.headers.get("cookie");
  if (cookie && cookie.trim().length > 0) {
    const referer = request.headers.get("referer");
    if (referer) {
      try {
        return allowed.has(new URL(referer).origin);
      } catch {
        return false;
      }
    }
    return false;
  }

  return true;
}

/** Rate-limit bucket prefixes for security-sensitive routes. */
export const RATE_LIMIT_BUCKETS = {
  login: "auth:login",
  register: "auth:register",
  inviteRedeem: "beta:register",
  onboarding: "profile:onboarding",
  privacyExport: "privacy:export",
  privacyDelete: "privacy:delete",
} as const;
