/**
 * CI gate: 5 modules / 15 LES-* lessons / 129 exercises / honest provenance.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAllModulesFromYaml } from "../src/lib/content/load-module";

function fail(msg: string): never {
  console.error(`m3-assert: FAIL — ${msg}`);
  process.exit(1);
}

const modules = loadAllModulesFromYaml();
if (modules.length !== 5) fail(`expected 5 modules, got ${modules.length}`);

const lessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));
if (lessonIds.length !== 15) fail(`expected 15 lessons, got ${lessonIds.length}`);
if (new Set(lessonIds).size !== 15) fail("lesson ids not distinct");
if (!lessonIds.every((id) => id.startsWith("LES-"))) {
  fail(`non-LES lesson ids: ${lessonIds.filter((id) => !id.startsWith("LES-")).join(",")}`);
}
for (const mod of modules) {
  if (mod.lessons.some((l) => l.id === `les-${mod.id}`)) {
    fail(`synthetic lesson id present for ${mod.id}`);
  }
  const fromLessons = mod.lessons.flatMap((l) => l.exercises.map((e) => e.id));
  if (JSON.stringify(mod.exercises.map((e) => e.id)) !== JSON.stringify(fromLessons)) {
    fail(`flat exercises diverge from lessons for ${mod.id}`);
  }
}

const exerciseCount = modules.reduce((n, m) => n + m.exercises.length, 0);
if (exerciseCount !== 129) fail(`expected 129 exercises, got ${exerciseCount}`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.resolve(__dirname, "../../content/a1");
function walkYaml(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walkYaml(full, out);
    else if (name.endsWith(".yaml") || name.endsWith(".yml")) out.push(full);
  }
  return out;
}
for (const file of walkYaml(contentRoot)) {
  const text = fs.readFileSync(file, "utf8");
  if (text.includes("author-placeholder") || text.includes("reviewer-placeholder")) {
    fail(`placeholder identity in ${path.relative(contentRoot, file)}`);
  }
  if (/provenance:[\s\S]*?ai_assisted:\s*false/.test(text)) {
    // loose check — also catch standalone false near provenance blocks via simple scan
  }
  if (text.includes("ai_assisted: false")) {
    fail(`ai_assisted: false in ${path.relative(contentRoot, file)}`);
  }
}

console.log(
  `m3-assert: OK — ${modules.length} modules, ${lessonIds.length} lessons, ${exerciseCount} exercises, provenance clean`,
);
