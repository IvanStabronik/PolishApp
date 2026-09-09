import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { getDb, getSql } from "./client";
import { loadEnvFiles } from "./load-env";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Stable lock key for Slowarium migrations (prevents concurrent migrate races). */
const MIGRATE_LOCK_KEY = 784512309;

async function main(): Promise<void> {
  loadEnvFiles();

  if (!process.env.DATABASE_URL) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "migrate_missing_database_url",
        ts: new Date().toISOString(),
      }),
    );
    process.exit(1);
  }

  const sql = getSql();
  console.log(
    JSON.stringify({
      level: "info",
      msg: "migrate_lock_acquire",
      ts: new Date().toISOString(),
    }),
  );
  await sql`select pg_advisory_lock(${MIGRATE_LOCK_KEY})`;
  try {
    const migrationsFolder = path.resolve(__dirname, "migrations");
    console.log(
      JSON.stringify({
        level: "info",
        msg: "migrate_apply_start",
        migrationsFolder,
        ts: new Date().toISOString(),
      }),
    );
    await migrate(getDb(), { migrationsFolder });
    console.log(
      JSON.stringify({
        level: "info",
        msg: "migrate_apply_done",
        ts: new Date().toISOString(),
      }),
    );
  } finally {
    await sql`select pg_advisory_unlock(${MIGRATE_LOCK_KEY})`;
    await sql.end({ timeout: 5 });
  }
}

main().catch(async (err) => {
  console.error(
    JSON.stringify({
      level: "error",
      msg: "migrate_failed",
      error: err instanceof Error ? err.message : "unknown",
      ts: new Date().toISOString(),
    }),
  );
  try {
    await getSql().end({ timeout: 5 });
  } catch {
    /* ignore */
  }
  process.exit(1);
});
