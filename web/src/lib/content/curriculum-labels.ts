/**
 * Parse human titles from curriculum markdown inventories (SoT).
 * Used so learners never see raw GR-/FN-/PRAG- IDs when a title exists.
 */

import fs from "node:fs";
import path from "node:path";

export type CurriculumTitle = {
  id: string;
  titlePl: string;
  titleRu: string;
};

const CURRICULUM_FILES = [
  "docs/requirements/curriculum/grammar-inventory.md",
  "docs/requirements/curriculum/concept-extensions.md",
  "docs/requirements/curriculum/functional-inventory.md",
];

/** `#### GR-CAS-NOM-01 — Mianownik: podmiot · Именительный: подлежащее` */
const HEADING_RE =
  /^#{3,4}\s+((?:GR|PHON|ORTH|PRAG|FN)-[A-Z0-9-]+)\s+[—–-]\s+(.+)$/gm;

function findRepoRoot(startDir: string): string {
  let dir = path.resolve(startDir);
  for (;;) {
    if (
      fs.existsSync(path.join(dir, "docs", "requirements", "curriculum")) &&
      fs.existsSync(path.join(dir, "web", "package.json"))
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      throw new Error(`Could not locate repo root from ${startDir}`);
    }
    dir = parent;
  }
}

function splitPlRu(raw: string): { titlePl: string; titleRu: string } {
  const parts = raw.split(/\s*[·•]\s*/);
  if (parts.length >= 2) {
    return {
      titlePl: parts[0]!.trim(),
      titleRu: parts.slice(1).join(" · ").trim(),
    };
  }
  const trimmed = raw.trim();
  return { titlePl: trimmed, titleRu: trimmed };
}

let cache: Map<string, CurriculumTitle> | null = null;

export function loadCurriculumConceptTitles(
  fromDir: string = process.cwd(),
): Map<string, CurriculumTitle> {
  if (cache) return cache;
  const root = findRepoRoot(fromDir);
  const map = new Map<string, CurriculumTitle>();

  for (const rel of CURRICULUM_FILES) {
    const full = path.join(root, rel);
    if (!fs.existsSync(full)) continue;
    const text = fs.readFileSync(full, "utf8");
    HEADING_RE.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = HEADING_RE.exec(text)) !== null) {
      const id = m[1]!;
      const { titlePl, titleRu } = splitPlRu(m[2]!);
      if (!map.has(id)) {
        map.set(id, { id, titlePl, titleRu });
      }
    }

    // FN blocks often use ### ID then **- Title (PL):** on following lines
    if (rel.includes("functional-inventory")) {
      const fnBlock =
        /^### (FN-[A-Z0-9-]+)\n(?:.*\n)*?- \*\*Title \(PL\):\*\* (.+)$/gm;
      let fm: RegExpExecArray | null;
      while ((fm = fnBlock.exec(text)) !== null) {
        const id = fm[1]!;
        const titlePl = fm[2]!.trim();
        if (!map.has(id)) {
          map.set(id, { id, titlePl, titleRu: titlePl });
        } else if (!map.get(id)!.titlePl) {
          map.set(id, { id, titlePl, titleRu: titlePl });
        }
      }
    }
  }

  cache = map;
  return map;
}

export function curriculumTitleFor(
  canonicalId: string,
  locale: "ru" | "uk" | "pl",
): string | null {
  try {
    const entry = loadCurriculumConceptTitles().get(canonicalId);
    if (!entry) return null;
    if (locale === "pl") return entry.titlePl;
    // Inventory RU column; UK falls back to RU then PL (no UK inventory column).
    return entry.titleRu || entry.titlePl;
  } catch {
    return null;
  }
}
