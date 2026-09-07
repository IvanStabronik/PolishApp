/**
 * M5 security integration — rate limits + origin rejection on privacy/onboarding.
 * Includes HTTP handler-level negative cases (not just primitives).
 */
import { afterAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { consumeRateLimit } from "@/modules/ops/rate-limit";
import { RATE_LIMIT_BUCKETS, assertSameOrigin } from "@/modules/ops/runtime";
import { getSql } from "@/db/client";

const hasDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDb)("M5 security controls (postgres)", () => {
  afterAll(async () => {
    try {
      await getSql().end({ timeout: 5 });
    } catch {
      /* ignore */
    }
  });

  it("rate-limits login / register / invite / onboarding / privacy buckets", async () => {
    const suffix = randomUUID().slice(0, 8);
    const buckets = [
      RATE_LIMIT_BUCKETS.login,
      RATE_LIMIT_BUCKETS.register,
      RATE_LIMIT_BUCKETS.inviteRedeem,
      RATE_LIMIT_BUCKETS.onboarding,
      RATE_LIMIT_BUCKETS.privacyExport,
      RATE_LIMIT_BUCKETS.privacyDelete,
    ];

    for (const prefix of buckets) {
      const key = `${prefix}:m5-${suffix}`;
      const a = await consumeRateLimit({ bucketKey: key, limit: 2, windowMs: 60_000 });
      const b = await consumeRateLimit({ bucketKey: key, limit: 2, windowMs: 60_000 });
      const c = await consumeRateLimit({ bucketKey: key, limit: 2, windowMs: 60_000 });
      expect(a.allowed).toBe(true);
      expect(b.allowed).toBe(true);
      expect(c.allowed).toBe(false);
    }
  });

  it("origin check rejects cross-site mutating requests", () => {
    process.env.BETTER_AUTH_URL = "http://127.0.0.1:3000";
    process.env.APP_URL = "http://127.0.0.1:3000";
    const bad = new Request("http://127.0.0.1:3000/api/privacy/delete", {
      method: "POST",
      headers: { Origin: "https://attacker.test" },
    });
    expect(assertSameOrigin(bad)).toBe(false);
  });

  it("privacy export HTTP handler rejects foreign Origin before auth", async () => {
    process.env.BETTER_AUTH_URL = "http://127.0.0.1:3000";
    process.env.APP_URL = "http://127.0.0.1:3000";
    const { POST } = await import("@/app/api/privacy/export/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/privacy/export", {
        method: "POST",
        headers: { Origin: "https://evil.example" },
      }),
    );
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toBe("origin_rejected");
  });

  it("privacy export HTTP handler rate-limits by client IP", async () => {
    process.env.BETTER_AUTH_URL = "http://127.0.0.1:3000";
    process.env.APP_URL = "http://127.0.0.1:3000";
    const { POST } = await import("@/app/api/privacy/export/route");
    const ip = `m5-http-rl-${randomUUID().slice(0, 8)}`;
    let lastStatus = 0;
    for (let i = 0; i < 6; i++) {
      const res = await POST(
        new Request("http://127.0.0.1:3000/api/privacy/export", {
          method: "POST",
          headers: {
            Origin: "http://127.0.0.1:3000",
            "x-forwarded-for": ip,
          },
        }),
      );
      lastStatus = res.status;
      // First hits may be 401 (no session) — rate limit fires at 6th with limit=5.
      if (i < 5) {
        expect([401, 429]).toContain(res.status);
      }
    }
    expect(lastStatus).toBe(429);
  });

  it("onboarding HTTP handler rejects foreign Origin", async () => {
    process.env.BETTER_AUTH_URL = "http://127.0.0.1:3000";
    process.env.APP_URL = "http://127.0.0.1:3000";
    const { POST } = await import("@/app/api/profile/onboarding/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/profile/onboarding", {
        method: "POST",
        headers: {
          Origin: "https://evil.example",
          "Content-Type": "application/json",
        },
        body: "{}",
      }),
    );
    expect(res.status).toBe(403);
  });

  it("learning attempt HTTP handler rejects foreign Origin", async () => {
    process.env.BETTER_AUTH_URL = "http://127.0.0.1:3000";
    process.env.APP_URL = "http://127.0.0.1:3000";
    const { POST } = await import("@/app/api/learning/attempt/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/learning/attempt", {
        method: "POST",
        headers: {
          Origin: "https://evil.example",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleId: "x",
          exerciseId: "y",
          answer: {},
        }),
      }),
    );
    expect(res.status).toBe(403);
  });
});
