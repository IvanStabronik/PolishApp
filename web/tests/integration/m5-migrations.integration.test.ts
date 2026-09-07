/**
 * M5 — migration smoke + upgrade idempotency against Postgres.
 * Requires DATABASE_URL (CI migrates first; these tests assert journal + schema).
 */
import { afterAll, describe, expect, it } from "vitest";
import { getSql } from "@/db/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const hasDb = Boolean(process.env.DATABASE_URL);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(__dirname, "../../src/db/migrations");
const journalPath = path.join(migrationsDir, "meta", "_journal.json");

describe.skipIf(!hasDb)("M5 migrations (postgres)", () => {
  afterAll(async () => {
    try {
      await getSql().end({ timeout: 5 });
    } catch {
      /* ignore */
    }
  });

  it("journal lists every SQL migration file", () => {
    const journal = JSON.parse(fs.readFileSync(journalPath, "utf8")) as {
      entries: { tag: string }[];
    };
    const sqlFiles = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();
    const tags = journal.entries.map((e) => e.tag).sort();
    expect(tags.length).toBeGreaterThanOrEqual(8);
    for (const file of sqlFiles) {
      const tag = file.replace(/\.sql$/, "");
      expect(tags).toContain(tag);
    }
  });

  it("drizzle migrations table tracks applied tags (upgrade path present)", async () => {
    const sql = getSql();
    const rows = await sql`
      select id, hash, created_at
      from drizzle.__drizzle_migrations
      order by created_at asc
    `;
    expect(rows.length).toBeGreaterThanOrEqual(1);

    const journal = JSON.parse(fs.readFileSync(journalPath, "utf8")) as {
      entries: { tag: string }[];
    };
    // After full migrate+upgrade, applied count must match journal length.
    expect(rows.length).toBe(journal.entries.length);
  });

  it("core production tables exist (no destructive reset)", async () => {
    const sql = getSql();
    const tables = await sql`
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_name = any(${[
          "user",
          "session",
          "beta_invites",
          "beta_access",
          "analytics_events",
          "analytics_daily_aggregates",
          "rate_limit_buckets",
          "learner_profiles",
        ]})
    `;
    const names = new Set(tables.map((r) => String(r.table_name)));
    expect(names.has("user")).toBe(true);
    expect(names.has("session")).toBe(true);
    expect(names.has("beta_invites")).toBe(true);
    expect(names.has("analytics_daily_aggregates")).toBe(true);
    expect(names.has("rate_limit_buckets")).toBe(true);
  });

  it("re-running migrator is idempotent (second apply is no-op)", async () => {
    const sql = getSql();
    const before = await sql`select count(*)::int as c from drizzle.__drizzle_migrations`;
    const countBefore = Number(before[0]?.c ?? 0);

    // Importing migrate module runs main() — instead call drizzle migrate with lock.
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const { getDb } = await import("@/db/client");
    const MIGRATE_LOCK_KEY = 784512309;
    await sql`select pg_advisory_lock(${MIGRATE_LOCK_KEY})`;
    try {
      await migrate(getDb(), { migrationsFolder: migrationsDir });
    } finally {
      await sql`select pg_advisory_unlock(${MIGRATE_LOCK_KEY})`;
    }

    const after = await sql`select count(*)::int as c from drizzle.__drizzle_migrations`;
    expect(Number(after[0]?.c ?? 0)).toBe(countBefore);
  });
});
