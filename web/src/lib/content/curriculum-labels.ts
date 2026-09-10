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

/**
 * Horizontal whitespace only — never cross CRLF, or list markers like
 * `- **ID:**` get swallowed as the title after `### FN-…`.
 */
const HWS = String.raw`[^\S\r\n]`;

/** `#### GR-CAS-NOM-01 — Mianownik: podmiot · Именительный: подлежащее` */
const HEADING_RE = new RegExp(
  String.raw`^#{3,4}${HWS}+((?:GR|PHON|ORTH|PRAG|FN)-[A-Z0-9-]+)${HWS}+[—–-]${HWS}+(.+)$`,
  "gm",
);

const FN_TITLE_PL_RE =
  /^- \*\*Title \(PL\):\*\* (.+)$/m;
const FN_TITLE_RU_RE =
  /^- \*\*(?:Title|Can-do) \(RU\):\*\* (.+)$/m;
const FN_BLOCK_RE = /^### (FN-[A-Z0-9-]+)\r?\n([\s\S]*?)(?=^### |\Z)/gm;

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

/** Reject markdown / ID junk so broken SoT never reaches learner UI. */
export function isUsableCurriculumTitle(
  title: string,
  canonicalId?: string,
): boolean {
  const t = title.trim();
  if (t.length < 2 || t.length > 120) return false;
  if (/\*\*|`|^#+\s|^\*\*[A-Za-z ]+:\*\*/.test(t)) return false;
  if (/^(ID|Level|Can-do|Intent|Concepts|LEX)\b/i.test(t)) return false;
  if (canonicalId && (t === canonicalId || t.includes(canonicalId))) {
    return false;
  }
  if (/^(?:GR|PHON|ORTH|PRAG|FN)-[A-Z0-9-]+$/.test(t)) return false;
  return true;
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
      if (
        !map.has(id) &&
        isUsableCurriculumTitle(titlePl, id) &&
        isUsableCurriculumTitle(titleRu, id)
      ) {
        map.set(id, { id, titlePl, titleRu });
      }
    }

    // FN blocks: ### ID then bullet fields (Title PL on its own line)
    if (rel.includes("functional-inventory")) {
      FN_BLOCK_RE.lastIndex = 0;
      let fm: RegExpExecArray | null;
      while ((fm = FN_BLOCK_RE.exec(text)) !== null) {
        const id = fm[1]!;
        const body = fm[2] ?? "";
        const plMatch = body.match(FN_TITLE_PL_RE);
        const titlePl = plMatch?.[1]?.trim();
        if (!titlePl || !isUsableCurriculumTitle(titlePl, id)) continue;
        const ruMatch = body.match(FN_TITLE_RU_RE);
        const titleRuRaw = ruMatch?.[1]?.trim();
        const titleRu =
          titleRuRaw && isUsableCurriculumTitle(titleRuRaw, id)
            ? titleRuRaw
            : titlePl;
        if (!map.has(id)) {
          map.set(id, { id, titlePl, titleRu });
        }
      }
    }
  }

  cache = map;
  return map;
}

/** Test helper — clear memoized map between cases. */
export function clearCurriculumTitleCache(): void {
  cache = null;
}

export function curriculumTitleFor(
  canonicalId: string,
  locale: "ru" | "uk" | "pl",
): string | null {
  try {
    const entry = loadCurriculumConceptTitles().get(canonicalId);
    if (!entry) return null;
    const pick =
      locale === "pl" ? entry.titlePl : entry.titleRu || entry.titlePl;
    if (!isUsableCurriculumTitle(pick, canonicalId)) return null;
    return pick;
  } catch {
    return null;
  }
}
