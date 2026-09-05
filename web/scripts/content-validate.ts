#!/usr/bin/env tsx
/**
 * Validate content-as-code YAML packages (no database required).
 *
 * Usage (from web/):
 *   pnpm content:validate
 *   pnpm exec tsx scripts/content-validate.ts [path-to-module-dir]
 */

import path from "node:path";
import {
  defaultModuleDir,
  loadModulePackage,
  resolveContentRoot,
} from "../src/modules/content/load-package";

function main(): void {
  const root = resolveContentRoot(process.cwd());
  const arg = process.argv[2];
  const moduleDir = arg
    ? path.resolve(process.cwd(), arg)
    : defaultModuleDir(root);

  console.log(`Validating content package:\n  ${moduleDir}\n`);

  const result = loadModulePackage(moduleDir);

  if (result.ok && result.package) {
    const { module, lessons } = result.package;
    const exerciseCount = lessons.reduce((n, l) => n + l.exercises.length, 0);
    const types = new Set(
      lessons.flatMap((l) => l.exercises.map((e) => e.type)),
    );
    console.log("OK");
    console.log(`  module: ${module.canonical_id} v${module.version} [${module.status}]`);
    console.log(`  lessons: ${lessons.length}`);
    console.log(`  exercises: ${exerciseCount} (types: ${[...types].sort().join(", ")})`);
    console.log(`  visibility: ${module.visibility}`);
    process.exit(0);
  }

  console.error("FAILED");
  for (const issue of result.issues) {
    console.error(`  [${issue.code}] ${issue.path}: ${issue.message}`);
  }
  process.exit(1);
}

main();
