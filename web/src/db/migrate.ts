import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { getDb, getSql } from "./client";
import { loadEnvFiles } from "./load-env";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  loadEnvFiles();

  if (!process.env.DATABASE_URL) {
    console.error("db:migrate — DATABASE_URL not set.");
    process.exit(1);
  }

  const migrationsFolder = path.resolve(__dirname, "migrations");
  console.log(`db:migrate — applying migrations from ${migrationsFolder}`);
  await migrate(getDb(), { migrationsFolder });
  console.log("db:migrate — done.");
  await getSql().end({ timeout: 5 });
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
