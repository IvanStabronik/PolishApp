import fs from "node:fs";
import path from "node:path";

const ID_PATTERNS: RegExp[] = [
  /^### (FN-(?:A1-[A-Z]+-\d{2}|A1-\d{3}|A2-\d{3}|B1-\d{3}|B2-\d{3}))\b/gm,
  /^### (SCN-[A-Z0-9-]+)\b/gm,
  /^### (LEX-[A-Z0-9-]+)\b/gm,
  /^#### ((?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+)\b/gm,
  /^### ((?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+)\b/gm,
  /^\| `((?:GR|PHON|ORTH|PRAG|FN|SCN|LEX|ASM|EXM|ERR)-[A-Z0-9-]+)`/gm,
];

/** Curriculum markdown sources that define canonical business IDs. */
const CURRICULUM_RELATIVE_PATHS = [
  "docs/requirements/curriculum/functional-inventory.md",
  "docs/requirements/curriculum/lexical-targets.md",
  "docs/requirements/curriculum/grammar-inventory.md",
  "docs/requirements/curriculum/concept-extensions.md",
  "docs/curriculum/scenario-inventory.md",
  "docs/curriculum/asm-exm-a1.md",
];

export type CanonicalKind =
  | "function"
  | "scenario"
  | "lex"
  | "concept"
  | "assessment"
  | "other";

function classify(id: string): CanonicalKind {
  if (id.startsWith("FN-")) return "function";
  if (id.startsWith("SCN-")) return "scenario";
  if (id.startsWith("LEX-")) return "lex";
  if (
    id.startsWith("GR-") ||
    id.startsWith("PHON-") ||
    id.startsWith("ORTH-") ||
    id.startsWith("PRAG-")
  ) {
    return "concept";
  }
  if (id.startsWith("ASM-") || id.startsWith("EXM-")) return "assessment";
  return "other";
}

function findRepoRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  for (;;) {
    if (
      fs.existsSync(path.join(dir, "docs", "requirements", "curriculum")) &&
      fs.existsSync(path.join(dir, "content"))
    ) {
      return dir;
    }
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      return dir;
    }
    // Prefer repo with docs/curriculum even before content/ exists
    if (
      fs.existsSync(path.join(dir, "docs", "requirements", "curriculum")) &&
      fs.existsSync(path.join(dir, "web", "package.json"))
    ) {
      return dir;
    }
    // Vercel serverless NFT often ships content/ without docs/curriculum.
    // Treat content/a1/modules (+ package.json or web/) as sufficient for runtime.
    if (fs.existsSync(path.join(dir, "content", "a1", "modules"))) {
      if (
        fs.existsSync(path.join(dir, "package.json")) ||
        fs.existsSync(path.join(dir, "web", "package.json")) ||
        fs.existsSync(path.join(dir, "vercel.json"))
      ) {
        return dir;
      }
      // Traced layout may be only content/ under the NFT root
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`Could not locate repo root from ${startDir}`);
    }
    dir = parent;
  }
}

export function loadCanonicalRegistry(fromDir: string = process.cwd()): {
  root: string;
  ids: Set<string>;
  byKind: Record<CanonicalKind, Set<string>>;
} {
  const root = findRepoRoot(fromDir);
  const ids = new Set<string>();
  const byKind: Record<CanonicalKind, Set<string>> = {
    function: new Set(),
    scenario: new Set(),
    lex: new Set(),
    concept: new Set(),
    assessment: new Set(),
    other: new Set(),
  };

  for (const rel of CURRICULUM_RELATIVE_PATHS) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const text = fs.readFileSync(full, "utf8");
    for (const pattern of ID_PATTERNS) {
      pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        const id = m[1];
        ids.add(id);
        byKind[classify(id)].add(id);
      }
    }
  }

  return { root, ids, byKind };
}

export function assertKnownCanonicalIds(
  refs: Iterable<string>,
  registry: Set<string>,
): string[] {
  const unknown: string[] = [];
  for (const id of refs) {
    if (!registry.has(id)) unknown.push(id);
  }
  return unknown.sort();
}
