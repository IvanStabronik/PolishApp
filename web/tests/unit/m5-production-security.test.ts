/**
 * M5 — production security controls (negative + mechanism tests).
 * Every control claimed in the M5 report has a test here or in integration.
 */
import { afterEach, describe, expect, it } from "vitest";
import {
  assertSameOrigin,
  publicErrorBody,
  resolveTrustedOrigins,
  sanitizeLogFields,
  validateRuntimeEnv,
} from "@/modules/ops/runtime";
import {
  authBuiltinRateLimitEnabled,
  authUsesSecureCookies,
} from "@/modules/auth/auth-policy";
import { canAccessDraftContent } from "@/lib/demo";
import { RATE_LIMIT_BUCKETS } from "@/modules/ops/runtime";

const ORIGIN_ENV_KEYS = [
  "BETTER_AUTH_URL",
  "NEXT_PUBLIC_APP_URL",
  "APP_URL",
  "TRUSTED_ORIGINS",
  "NODE_ENV",
] as const;

const savedOriginEnv: Record<string, string | undefined> = {};

afterEach(() => {
  for (const key of ORIGIN_ENV_KEYS) {
    if (key in savedOriginEnv) {
      const prev = savedOriginEnv[key];
      const env = process.env as Record<string, string | undefined>;
      if (prev === undefined) delete env[key];
      else env[key] = prev;
      delete savedOriginEnv[key];
    }
  }
});

function setOriginEnv(key: (typeof ORIGIN_ENV_KEYS)[number], value: string) {
  if (!(key in savedOriginEnv)) savedOriginEnv[key] = process.env[key];
  (process.env as Record<string, string | undefined>)[key] = value;
}

function clearOriginEnv(key: (typeof ORIGIN_ENV_KEYS)[number]) {
  if (!(key in savedOriginEnv)) savedOriginEnv[key] = process.env[key];
  delete (process.env as Record<string, string | undefined>)[key];
}

describe("M5 production env validation", () => {
  const base = {
    DATABASE_URL: "postgresql://u:p@localhost:5432/db",
    BETTER_AUTH_SECRET: "production-secret-at-least-16",
    INVITE_TOKEN_PEPPER: "pepper-at-least-8",
    BETTER_AUTH_URL: "https://beta.example.com",
    BETA_MODE: "true",
    DEMO_MODE: "false",
    DEMO_PREVIEW: "false",
    NODE_ENV: "production" as const,
  };

  it("accepts strict private-beta production env", () => {
    expect(() => validateRuntimeEnv(base)).not.toThrow();
  });

  it("rejects DEMO_MODE in production", () => {
    expect(() =>
      validateRuntimeEnv({ ...base, DEMO_MODE: "true" }),
    ).toThrow(/DEMO_MODE/);
  });

  it("accepts BETA_ALLOW_DRAFT in production without ALLOW_PRODUCTION_DEMO", () => {
    expect(() =>
      validateRuntimeEnv({
        ...base,
        BETA_ALLOW_DRAFT: "true",
        DEMO_PREVIEW: "false",
        DEMO_MODE: "false",
      }),
    ).not.toThrow();
  });

  it("rejects DEMO_PREVIEW in production", () => {
    expect(() =>
      validateRuntimeEnv({ ...base, DEMO_PREVIEW: "true" }),
    ).toThrow(/DEMO_PREVIEW/);
  });

  it("rejects missing INVITE_TOKEN_PEPPER in production", () => {
    const rest = { ...base };
    delete (rest as { INVITE_TOKEN_PEPPER?: string }).INVITE_TOKEN_PEPPER;
    expect(() => validateRuntimeEnv(rest)).toThrow(/INVITE_TOKEN_PEPPER/);
  });

  it("rejects http public URL in production (non-loopback)", () => {
    expect(() =>
      validateRuntimeEnv({
        ...base,
        BETTER_AUTH_URL: "http://beta.example.com",
      }),
    ).toThrow(/https/);
  });

  it("rejects BETA_MODE off in production", () => {
    expect(() =>
      validateRuntimeEnv({ ...base, BETA_MODE: "false" }),
    ).toThrow(/BETA_MODE/);
  });

  it("allows loopback http public URL in production containers", () => {
    expect(() =>
      validateRuntimeEnv({
        ...base,
        BETTER_AUTH_URL: "http://127.0.0.1:3000",
      }),
    ).not.toThrow();
  });

  it("rejects production when no public URL is configured", () => {
    const rest = { ...base };
    delete (rest as { BETTER_AUTH_URL?: string }).BETTER_AUTH_URL;
    expect(() => validateRuntimeEnv(rest)).toThrow(/BETTER_AUTH_URL|APP_URL/);
  });

  it("rejects short BETTER_AUTH_SECRET", () => {
    expect(() =>
      validateRuntimeEnv({ ...base, BETTER_AUTH_SECRET: "too-short" }),
    ).toThrow(/BETTER_AUTH_SECRET/);
  });
});

describe("M5 CSRF / origin protection", () => {
  it("rejects foreign Origin", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NEXT_PUBLIC_APP_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
      headers: { Origin: "https://evil.example" },
    });
    expect(assertSameOrigin(req)).toBe(false);
  });

  it("allows trusted Origin", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
      headers: { Origin: "https://beta.example.com" },
    });
    expect(assertSameOrigin(req)).toBe(true);
  });

  it("TRUSTED_ORIGINS extends allow-list", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    setOriginEnv("TRUSTED_ORIGINS", "https://custom.example");
    expect(resolveTrustedOrigins()).toContain("https://custom.example");
  });

  it("rejects missing Origin when Cookie session is present", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
      headers: { Cookie: "better-auth.session_token=abc" },
    });
    expect(assertSameOrigin(req)).toBe(false);
  });

  it("allows missing Origin for non-browser clients without Cookie", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
    });
    expect(assertSameOrigin(req)).toBe(true);
  });

  it("allows missing Origin when Sec-Fetch-Site is same-origin", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
      headers: {
        Cookie: "better-auth.session_token=abc",
        "Sec-Fetch-Site": "same-origin",
      },
    });
    expect(assertSameOrigin(req)).toBe(true);
  });

  it("rejects missing Origin when Sec-Fetch-Site is cross-site", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
      headers: {
        Cookie: "better-auth.session_token=abc",
        "Sec-Fetch-Site": "cross-site",
      },
    });
    expect(assertSameOrigin(req)).toBe(false);
  });

  it("allows missing Origin with Cookie when Referer is trusted", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    const req = new Request("https://beta.example.com/api/privacy/export", {
      method: "POST",
      headers: {
        Cookie: "better-auth.session_token=abc",
        Referer: "https://beta.example.com/ru/settings",
      },
    });
    expect(assertSameOrigin(req)).toBe(true);
  });

  it("production https host does not hardcode loopback Origins", () => {
    setOriginEnv("BETTER_AUTH_URL", "https://beta.example.com");
    setOriginEnv("NODE_ENV", "production");
    clearOriginEnv("NEXT_PUBLIC_APP_URL");
    clearOriginEnv("APP_URL");
    clearOriginEnv("TRUSTED_ORIGINS");
    const origins = resolveTrustedOrigins();
    expect(origins).toContain("https://beta.example.com");
    expect(origins).not.toContain("http://localhost:3000");
    expect(origins).not.toContain("http://127.0.0.1:3000");
  });

  it("loopback production tooling still allows Playwright ports via env", () => {
    setOriginEnv("BETTER_AUTH_URL", "http://127.0.0.1:3000");
    setOriginEnv("NODE_ENV", "production");
    const origins = resolveTrustedOrigins();
    expect(origins).toContain("http://127.0.0.1:3000");
    expect(origins).toContain("http://localhost:3000");
  });
});

describe("M5 log + error sanitization", () => {
  it("redacts secret-ish log fields", () => {
    const safe = sanitizeLogFields({
      password: "hunter2",
      email: "a@b.c",
      token: "raw-invite",
      userId: "ok-to-keep",
      db: "postgresql://u:p@host/db",
    });
    expect(safe.password).toBe("[redacted]");
    expect(safe.email).toBe("[redacted]");
    expect(safe.token).toBe("[redacted]");
    expect(safe.userId).toBe("ok-to-keep");
    expect(safe.db).toBe("[redacted]");
  });

  it("public errors never include stack traces", () => {
    const body = publicErrorBody("export_failed", "corr-1");
    expect(body).toEqual({ error: "export_failed", correlationId: "corr-1" });
    expect(JSON.stringify(body)).not.toMatch(/stack|Error:/i);
  });
});

describe("M5 auth cookie + builtin rate limit flags", () => {
  it("uses secure cookies only on https base URL", () => {
    expect(authUsesSecureCookies("https://beta.example.com")).toBe(true);
    expect(authUsesSecureCookies("http://127.0.0.1:3000")).toBe(false);
  });

  it("disables Better Auth builtin rate limit only in CI (undefined outside)", () => {
    expect(authBuiltinRateLimitEnabled(false)).toBeUndefined();
    expect(authBuiltinRateLimitEnabled(true)).toBe(false);
  });
});

describe("M5 DRAFT gate for ordinary learners", () => {
  it("forbids DRAFT when preview env is off or roles lack previewer", () => {
    expect(
      canAccessDraftContent({
        roles: ["learner"],
        isPreviewEnv: false,
      }),
    ).toBe(false);
    expect(
      canAccessDraftContent({
        roles: ["learner"],
        isPreviewEnv: true,
      }),
    ).toBe(false);
  });
});

describe("M5 rate-limit bucket catalog", () => {
  it("covers login, register, invite, onboarding, privacy", () => {
    expect(RATE_LIMIT_BUCKETS.login).toBe("auth:login");
    expect(RATE_LIMIT_BUCKETS.register).toBe("auth:register");
    expect(RATE_LIMIT_BUCKETS.inviteRedeem).toBe("beta:register");
    expect(RATE_LIMIT_BUCKETS.onboarding).toBe("profile:onboarding");
    expect(RATE_LIMIT_BUCKETS.privacyExport).toBe("privacy:export");
    expect(RATE_LIMIT_BUCKETS.privacyDelete).toBe("privacy:delete");
  });
});
