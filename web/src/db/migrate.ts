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
    console.error("db:migrate — DATABASE_URL not set.");
    process.exit(1);
  }

  const sql = getSql();
  console.log("db:migrate — acquiring advisory lock…");
  await sql`select pg_advisory_lock(${MIGRATE_LOCK_KEY})`;
  try {
    const migrationsFolder = path.resolve(__dirname, "migrations");
    console.log(`db:migrate — applying migrations from ${migrationsFolder}`);
    await migrate(getDb(), { migrationsFolder });
    console.log("db:migrate — done.");
  } finally {
    await sql`select pg_advisory_unlock(${MIGRATE_LOCK_KEY})`;
    await sql.end({ timeout: 5 });
  }
}

main().catch(async (err) => {
  console.error(err);
  try {
    await getSql().end({ timeout: 5 });
  } catch {
    /* ignore */
  }
  process.exit(1);
});
