#!/usr/bin/env tsx
/**
 * Idempotent content import (YAML → content_* via Drizzle).
 *
 * Always validates first (same gates as content-validate).
 *
 * Modes:
 *   - No DATABASE_URL, or --dry-run: print upsert plan against expected shapes; exit 0.
 *   - DATABASE_URL set (default without --dry-run): upsert via drizzle (forced DRAFT).
 *
 * Usage (from web/):
 *   pnpm content:import
 *   pnpm exec tsx scripts/content-import.ts [--dry-run] [module-dir]
 */

import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  defaultModuleDir,
  loadModulePackage,
  resolveContentRoot,
} from "../src/modules/content/load-package";
import {
  buildImportPlan,
  EXPECTED_TABLE_DDL_NOTES,
} from "../src/modules/content/import-plan";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv: string[]) {
  let dryRun = false;
  const positional: string[] = [];
  for (const a of argv) {
    if (a === "--dry-run") dryRun = true;
    else if (!a.startsWith("-")) positional.push(a);
  }
  return { dryRun, moduleArg: positional[0] };
}

function findModuleDirs(root: string): string[] {
  const out: string[] = [];
  if (!existsSync(root)) return out;

  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        if (
          existsSync(path.join(full, "module.yaml")) ||
          existsSync(path.join(full, "module.yml"))
        ) {
          out.push(full);
        } else {
          walk(full);
        }
      }
    }
  };
  walk(root);
  return out;
}

function resolveModuleDirs(moduleArg: string | undefined): string[] {
  const contentRoot = path.resolve(__dirname, "../../content");
  if (moduleArg) {
    return [path.resolve(process.cwd(), moduleArg)];
  }
  if (existsSync(contentRoot)) {
    const found = findModuleDirs(contentRoot);
    if (found.length > 0) return found;
  }
  try {
    const root = resolveContentRoot(process.cwd());
    return [defaultModuleDir(root)];
  } catch {
    return [];
  }
}

async function main(): Promise<void> {
  const { dryRun, moduleArg } = parseArgs(process.argv.slice(2));
  const moduleDirs = resolveModuleDirs(moduleArg);

  if (moduleDirs.length === 0) {
    console.log("content:import — no module.yaml found under content/");
    process.exit(0);
  }

  const packages = [];
  for (const moduleDir of moduleDirs) {
    const loaded = loadModulePackage(moduleDir);
    if (!loaded.ok || !loaded.package) {
      console.error(`FAILED ${moduleDir}`);
      for (const issue of loaded.issues) {
        console.error(`  [${issue.code}] ${issue.path}: ${issue.message}`);
      }
      process.exit(1);
    }
    packages.push(loaded.package);
  }

  const databaseUrl = process.env.DATABASE_URL;
  const shouldApply = Boolean(databaseUrl) && !dryRun;

  if (!shouldApply) {
    console.log(
      `content:import — dry-run (${packages.length} package(s); no DB writes)`,
    );
    if (!databaseUrl) {
      console.log("  Reason: DATABASE_URL is not set.");
    } else {
      console.log("  Reason: --dry-run flag.");
    }
    for (const pkg of packages) {
      const plan = buildImportPlan(pkg);
      const byTable = plan.rows.reduce<Record<string, number>>((acc, r) => {
        acc[r.table] = (acc[r.table] ?? 0) + 1;
        return acc;
      }, {});
      console.log(`\n  ${pkg.module.canonical_id} v${pkg.module.version} [${pkg.module.status}]`);
      console.log(`    planned rows: ${plan.rows.length}`);
      for (const [table, n] of Object.entries(byTable)) {
        console.log(`    - ${table}: ${n}`);
      }
    }
    console.log("\nExpected table shapes (see also docs/architecture/data-model.md):\n");
    console.log(EXPECTED_TABLE_DDL_NOTES);
    console.log(
      "\nWhen Postgres is up: set DATABASE_URL and re-run without --dry-run.",
    );
    process.exit(0);
  }

  // Live path — drizzle upsert (forced DRAFT). Lazy-import so dry-run needs no DB deps.
  const { loadEnvFiles } = await import("../src/db/load-env");
  loadEnvFiles();
  const { getDb, getSql } = await import("../src/db");
  const { upsertModulePackage } = await import(
    "../src/modules/content/import-module"
  );

  const authorUserId = process.env.CONTENT_IMPORT_AUTHOR_USER_ID ?? null;
  const db = getDb();
  console.log(
    `content:import — upserting ${packages.length} module package(s) as DRAFT`,
  );

  try {
    for (const pkg of packages) {
      const draftPkg = {
        module: { ...pkg.module, status: "DRAFT" as const },
        lessons: pkg.lessons.map((l) => ({
          ...l,
          status: "DRAFT" as const,
          exercises: l.exercises.map((e) => ({
            ...e,
            status: "DRAFT" as const,
          })),
        })),
      };

      const result = await upsertModulePackage(db, draftPkg, { authorUserId });
      console.log(
        `  ${pkg.module.canonical_id} v${pkg.module.version} → module=${result.moduleId} version=${result.contentVersionId} lessons=${result.lessonCount} exercises=${result.exerciseCount} [→DRAFT]`,
      );
    }
    console.log("content:import — done.");
  } finally {
    await getSql().end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
