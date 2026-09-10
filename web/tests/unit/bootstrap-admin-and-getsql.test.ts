import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  assertBootstrapCredentials,
  assertFirstAdminBootstrapAllowed,
} from "@/db/bootstrap-first-admin";

describe("assertFirstAdminBootstrapAllowed", () => {
  it("allows DEMO_MODE=false with DATABASE_URL", () => {
    expect(() =>
      assertFirstAdminBootstrapAllowed({
        DATABASE_URL: "postgresql://u:p@ep-x.neon.tech/neondb",
        DEMO_MODE: "false",
      }),
    ).not.toThrow();
  });

  it("allows unset DEMO_MODE", () => {
    expect(() =>
      assertFirstAdminBootstrapAllowed({
        DATABASE_URL: "postgresql://u:p@ep-x.neon.tech/neondb",
      }),
    ).not.toThrow();
  });

  it("refuses DEMO_MODE=true (would leave demo theater on)", () => {
    expect(() =>
      assertFirstAdminBootstrapAllowed({
        DATABASE_URL: "postgresql://u:p@ep-x.neon.tech/neondb",
        DEMO_MODE: "true",
      }),
    ).toThrow(/DEMO_MODE/);
  });

  it("refuses ALLOW_PRODUCTION_DEMO", () => {
    expect(() =>
      assertFirstAdminBootstrapAllowed({
        DATABASE_URL: "postgresql://u:p@ep-x.neon.tech/neondb",
        DEMO_MODE: "false",
        ALLOW_PRODUCTION_DEMO: "true",
      }),
    ).toThrow(/ALLOW_PRODUCTION_DEMO/);
  });

  it("refuses missing DATABASE_URL", () => {
    expect(() =>
      assertFirstAdminBootstrapAllowed({ DEMO_MODE: "false" }),
    ).toThrow(/DATABASE_URL/);
  });
});

describe("assertBootstrapCredentials", () => {
  it("normalizes email and default name", () => {
    expect(
      assertBootstrapCredentials({
        email: "  You@Example.COM ",
        password: "SecurePass1!",
      }),
    ).toEqual({
      email: "you@example.com",
      password: "SecurePass1!",
      name: "Founder Admin",
    });
  });

  it("refuses demo.slowarium.local", () => {
    expect(() =>
      assertBootstrapCredentials({
        email: "admin@demo.slowarium.local",
        password: "SecurePass1!",
      }),
    ).toThrow(/demo\.slowarium\.local/);
  });

  it("refuses short password", () => {
    expect(() =>
      assertBootstrapCredentials({
        email: "you@example.com",
        password: "short",
      }),
    ).toThrow(/8/);
  });
});

describe("getSql production cache", () => {
  const mocks = vi.hoisted(() => {
    const end = vi.fn(async () => undefined);
    const sqlHandle = Object.assign(vi.fn(), { end });
    return {
      end,
      sqlHandle,
      postgres: vi.fn(() => sqlHandle),
      drizzle: vi.fn(() => ({ __mockDb: true })),
    };
  });

  beforeEach(() => {
    vi.resetModules();
    mocks.postgres.mockClear();
    mocks.drizzle.mockClear();
    mocks.end.mockClear();
    const g = globalThis as unknown as {
      slowariumSql?: unknown;
      slowariumDb?: unknown;
    };
    delete g.slowariumSql;
    delete g.slowariumDb;
  });

  afterEach(() => {
    vi.doUnmock("postgres");
    vi.doUnmock("drizzle-orm/postgres-js");
    const g = globalThis as unknown as {
      slowariumSql?: unknown;
      slowariumDb?: unknown;
    };
    delete g.slowariumSql;
    delete g.slowariumDb;
    delete (process.env as { NODE_ENV?: string }).NODE_ENV;
    delete process.env.VERCEL;
    delete process.env.DATABASE_URL;
  });

  it("getSql is available when NODE_ENV=production (globalThis cache)", async () => {
    vi.doMock("postgres", () => ({ default: mocks.postgres }));
    vi.doMock("drizzle-orm/postgres-js", () => ({ drizzle: mocks.drizzle }));

    process.env.NODE_ENV = "production";
    process.env.VERCEL = "1";
    process.env.DATABASE_URL = "postgresql://u:p@ep-x.neon.tech/neondb?sslmode=require";

    const { getDb, getSql } = await import("@/db/client");
    const db = getDb();
    expect(db).toEqual({ __mockDb: true });
    expect(mocks.postgres).toHaveBeenCalledTimes(1);
    expect(mocks.postgres.mock.calls[0]?.[1]).toMatchObject({
      max: 1,
      prepare: false,
    });

    const sql = getSql();
    expect(sql).toBe(mocks.sqlHandle);

    // Second getDb must reuse the same sql handle (regression: prod used to skip cache).
    getDb();
    expect(mocks.postgres).toHaveBeenCalledTimes(1);
    expect(getSql()).toBe(mocks.sqlHandle);
  });

  it("getSql throws before getDb when cache empty", async () => {
    vi.doMock("postgres", () => ({ default: mocks.postgres }));
    vi.doMock("drizzle-orm/postgres-js", () => ({ drizzle: mocks.drizzle }));

    process.env.NODE_ENV = "production";
    delete process.env.DATABASE_URL;

    const { getSql } = await import("@/db/client");
    expect(() => getSql()).toThrow(/DATABASE_URL/);
  });
});
