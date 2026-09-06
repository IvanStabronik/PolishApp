import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import {
  LessonSchema,
  ModuleSchema,
  type ContentPackage,
  type Lesson,
  type Module,
} from "./schemas";
import { validateContentPackage, type ValidationIssue } from "./validate-package";
import { loadCanonicalRegistry } from "./canonical-registry";

export type LoadResult = {
  ok: boolean;
  package?: ContentPackage;
  issues: ValidationIssue[];
  root: string;
  moduleDir: string;
};

function readYamlFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf8");
  return parseYaml(raw);
}

export function resolveContentRoot(fromDir: string = process.cwd()): string {
  const { root } = loadCanonicalRegistry(fromDir);
  return root;
}

export function defaultModuleDir(root: string): string {
  return path.join(root, "content", "a1", "modules", "pierwsze-spotkanie");
}

export function loadModulePackage(moduleDir: string): LoadResult {
  const modulePath = path.join(moduleDir, "module.yaml");
  const issues: ValidationIssue[] = [];

  let root: string;
  try {
    root = resolveContentRoot(moduleDir);
  } catch (e) {
    return {
      ok: false,
      issues: [
        {
          code: "SCHEMA",
          path: moduleDir,
          message: e instanceof Error ? e.message : String(e),
        },
      ],
      root: path.resolve(moduleDir, "../../.."),
      moduleDir,
    };
  }

  if (!fs.existsSync(modulePath)) {
    return {
      ok: false,
      issues: [
        {
          code: "SCHEMA",
          path: "module.yaml",
          message: `Missing ${modulePath}`,
        },
      ],
      root,
      moduleDir,
    };
  }

  const moduleParsed = ModuleSchema.safeParse(readYamlFile(modulePath));
  if (!moduleParsed.success) {
    for (const err of moduleParsed.error.issues) {
      issues.push({
        code: "SCHEMA",
        path: `module.yaml:${err.path.join(".")}`,
        message: err.message,
      });
    }
    return { ok: false, issues, root, moduleDir };
  }

  const moduleDoc: Module = moduleParsed.data;
  const lessons: Lesson[] = [];

  for (const rel of moduleDoc.lesson_files) {
    const lessonPath = path.join(moduleDir, rel);
    if (!fs.existsSync(lessonPath)) {
      issues.push({
        code: "REFERENTIAL",
        path: `module.lesson_files`,
        message: `Missing lesson file: ${rel}`,
      });
      continue;
    }
    const lessonParsed = LessonSchema.safeParse(readYamlFile(lessonPath));
    if (!lessonParsed.success) {
      for (const err of lessonParsed.error.issues) {
        issues.push({
          code: "SCHEMA",
          path: `${rel}:${err.path.join(".")}`,
          message: err.message,
        });
      }
      continue;
    }
    lessons.push(lessonParsed.data);
  }

  if (issues.length > 0) {
    return { ok: false, issues, root, moduleDir };
  }

  const pkg: ContentPackage = { module: moduleDoc, lessons };
  const { ids } = loadCanonicalRegistry(root);
  const semantic = validateContentPackage(pkg, ids);
  issues.push(...semantic.issues);

  return {
    ok: issues.length === 0,
    package: pkg,
    issues,
    root,
    moduleDir,
  };
}
