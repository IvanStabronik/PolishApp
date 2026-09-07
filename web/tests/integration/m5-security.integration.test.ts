/**
 * M5 security integration — rate limits + origin rejection on privacy/onboarding.
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
});
