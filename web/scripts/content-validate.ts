#!/usr/bin/env tsx
/**
 * Validate content-as-code YAML packages (no database required).
 *
 * Usage (from web/):
 *   pnpm content:validate
 *   pnpm exec tsx scripts/content-validate.ts [path-to-module-dir]
 *
 * With no args, validates every module.yaml under content/a1/modules/.
 */

import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  defaultModuleDir,
  loadModulePackage,
  resolveContentRoot,
} from "../src/modules/content/load-package";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  return out.sort();
}

function resolveModuleDirs(moduleArg: string | undefined): string[] {
  if (moduleArg) {
    return [path.resolve(process.cwd(), moduleArg)];
  }

  const contentRoot = path.resolve(__dirname, "../../content");
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

function main(): void {
  const moduleDirs = resolveModuleDirs(process.argv[2]);

  if (moduleDirs.length === 0) {
    console.error("content:validate — no module.yaml found under content/");
    process.exit(1);
  }

  let failed = 0;
  for (const moduleDir of moduleDirs) {
    console.log(`Validating content package:\n  ${moduleDir}\n`);
    const result = loadModulePackage(moduleDir);

    if (result.ok && result.package) {
      const { module, lessons } = result.package;
      const exerciseCount = lessons.reduce((n, l) => n + l.exercises.length, 0);
      const types = new Set(
        lessons.flatMap((l) => l.exercises.map((e) => e.type)),
      );
      console.log("OK");
      console.log(
        `  module: ${module.canonical_id} v${module.version} [${module.status}]`,
      );
      console.log(`  lessons: ${lessons.length}`);
      console.log(
        `  exercises: ${exerciseCount} (types: ${[...types].sort().join(", ")})`,
      );
      console.log(`  visibility: ${module.visibility}`);
      console.log("");
    } else {
      failed += 1;
      console.error("FAILED");
      for (const issue of result.issues) {
        console.error(`  [${issue.code}] ${issue.path}: ${issue.message}`);
      }
      console.error("");
    }
  }

  if (failed > 0) {
    console.error(
      `content:validate — ${failed}/${moduleDirs.length} package(s) failed.`,
    );
    process.exit(1);
  }

  console.log(`content:validate — ${moduleDirs.length} package(s) OK.`);
  process.exit(0);
}

main();
