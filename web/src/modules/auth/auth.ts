import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/client";
import * as schema from "@/db/schema";
import type { UserRole } from "@/lib/enums";
import { isBetaModeEnabled } from "@/modules/admin/roles";
import { resolveTrustedOrigins } from "@/modules/ops/runtime";
import { DEMO_ACCOUNTS, isDemoMode } from "./demo";
import {
  authBuiltinRateLimitEnabled,
  authUsesSecureCookies,
} from "./auth-policy";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.APP_URL ??
  "http://localhost:3000";

if (!secret && process.env.NODE_ENV === "production") {
  throw new Error("BETTER_AUTH_SECRET is required in production");
}

const isCi = process.env.CI === "true" || process.env.CI === "1";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    /** Closed beta: open sign-up disabled; use /api/beta/invite instead. */
    disableSignUp: isBetaModeEnabled(),
  },
  user: {
    additionalFields: {
      roleFlags: {
        type: "string[]",
        required: false,
        defaultValue: [] as UserRole[],
        input: false,
      },
    },
  },
  secret: secret ?? "dev-only-insecure-secret-change-me",
  baseURL,
  trustedOrigins: resolveTrustedOrigins(),
  /**
   * better-auth enables rate limits in production by default.
   * CI E2E hammers /sign-in from one runner IP — disable builtin there only.
   * App-level Postgres rate limits still apply in `api/auth/[...all]`.
   * Use `undefined` (not `true`) outside CI so dev `next dev` is not throttled.
   */
  rateLimit: {
    enabled: isCi ? false : undefined,
  },
  advanced: {
    /**
     * CI / private-alpha run on http://127.0.0.1. NODE_ENV=production during
     * `next start` would otherwise prefer Secure cookies that browsers drop on HTTP.
     */
    useSecureCookies: authUsesSecureCookies(baseURL),
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});

export type Auth = typeof auth;
export { DEMO_ACCOUNTS, isDemoMode };
export { authBuiltinRateLimitEnabled, authUsesSecureCookies };

export function getDemoAccount(kind: keyof typeof DEMO_ACCOUNTS) {
  return DEMO_ACCOUNTS[kind];
}
