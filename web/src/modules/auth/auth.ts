import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/client";
import * as schema from "@/db/schema";
import type { UserRole } from "@/lib/enums";
import { DEMO_ACCOUNTS, isDemoMode } from "./demo";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
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
  trustedOrigins: [
    baseURL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
  ],
  /**
   * better-auth enables rate limits in production (3 sign-in/sign-up per 10s).
   * CI E2E hammers /sign-in from one runner IP and trips 429s; disable there only.
   */
  rateLimit: {
    enabled: isCi ? false : undefined,
  },
  advanced: {
    /**
     * CI / private-alpha run on http://127.0.0.1. NODE_ENV=production during
     * `next start` would otherwise prefer Secure cookies that browsers drop on HTTP.
     */
    useSecureCookies: baseURL.startsWith("https://"),
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});

export type Auth = typeof auth;
export { DEMO_ACCOUNTS, isDemoMode };

export function getDemoAccount(kind: keyof typeof DEMO_ACCOUNTS) {
  return DEMO_ACCOUNTS[kind];
}
