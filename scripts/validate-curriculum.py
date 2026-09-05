#!/usr/bin/env python3
"""Validate PolishApp Phase 2 curriculum integrity.

Usage:
  python scripts/validate-curriculum.py

Exit codes:
  0 — success
  1 — validation failures
"""
from __future__ import annotations

import collections
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CUR = ROOT / "docs" / "requirements" / "curriculum"
REQ = ROOT / "docs" / "requirements"

LEVEL_ORDER = {"A1": 1, "A2": 2, "B1": 3, "B2": 4}
EXACT_ID = re.compile(
    r"\b((?:GR|PHON|ORTH|PRAG|FN|LEX|ERR|EXIT|LT|WR|LV|PAN)-[A-Z0-9-]+)\b"
)
CANON_DEF = re.compile(
    r"^#### ((?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+)\b", re.M
)
FN_DEF = re.compile(r"^### (FN-(?:A1|A2|B1|B2)-\d{3})\b", re.M)
ERR_DEF = re.compile(r"^### (ERR-(?:UKR|RUS|BEL)-\d{2})\b", re.M)
LEX_DEF = re.compile(r"\|\s*`?(LEX-[A-Z0-9-]+)`?\s*\|", re.M)

FORBIDDEN_TEMP = [
    "GR-CASE-NOM",
    "GR-CASE-ACC",
    "GR-CASE-GEN",
    "GR-CASE-DAT",
    "GR-CASE-INS",
    "GR-CASE-LOC",
    "GR-CASE-VOC",
    "GR-CONCORD",
    "GR-ASPECT",
    "GR-TV",
    "GR-PRES",
    "GR-COMP-ZE",
    "GR-PHON",
    "GR-ORTH",
    "GR-REKCJA",
    "GR-TENSE-PRES",
    "GR-TENSE-PAST",
    "GR-TENSE-FUT",
    "Placeholder — Phase 2",
    "TODO",
    "TBD",
]


class Validator:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def err(self, file: str, msg: str, id_: str | None = None) -> None:
        loc = f"{file}" + (f" [{id_}]" if id_ else "")
        self.errors.append(f"ERROR {loc}: {msg}")

    def warn(self, file: str, msg: str, id_: str | None = None) -> None:
        loc = f"{file}" + (f" [{id_}]" if id_ else "")
        self.warnings.append(f"WARN {loc}: {msg}")


def read(name: str) -> str:
    return (CUR / name).read_text(encoding="utf-8")


def parse_concepts(text: str, ns_prefix: tuple[str, ...]) -> dict[str, dict]:
    concepts: dict[str, dict] = {}
    current = None
    for line in text.splitlines():
        m = re.match(r"^#### ((" + "|".join(ns_prefix) + r")-[A-Z0-9-]+)\b", line)
        if m:
            current = m.group(1)
            concepts[current] = {
                "intro": None,
                "prereq": [],
                "fields": set(),
            }
            continue
        if not current:
            continue
        m = re.search(r"^\s*-\s*\*\*Intro:\*\*\s*([A-B][12])", line)
        if m:
            concepts[current]["intro"] = m.group(1)
        m = re.search(r"^\s*-\s*\*\*Prereq:\*\*\s*(.+)$", line)
        if m:
            val = m.group(1).strip()
            concepts[current]["fields"].add("Prereq")
            if val not in ("—", "-", "нет", "none", ""):
                concepts[current]["prereq"] = re.findall(
                    r"(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+", val
                )
                if "*" in val or "соответствующ" in val.lower():
                    concepts[current]["wildcard"] = True
        for field in (
            "Функция",
            "Form / Meaning / Use",
            "Пределы",
            "Пример",
            "Контрпример",
            "Evidence",
            "Source",
        ):
            if f"**{field}:**" in line or (
                field == "Form / Meaning / Use" and "Form / Meaning / Use" in line
            ):
                concepts[current]["fields"].add(field)
        if "**UKR:**" in line or "**UKR**:" in line or "UKR:" in line:
            concepts[current]["fields"].add("L1")
    return concepts


def has_cycle(graph: dict[str, list[str]]) -> list[str] | None:
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []

    def dfs(n: str) -> list[str] | None:
        visiting.add(n)
        stack.append(n)
        for nxt in graph.get(n, []):
            if nxt not in graph and nxt not in visiting and nxt not in visited:
                continue
            if nxt in visiting:
                return stack[stack.index(nxt) :] + [nxt]
            if nxt not in visited:
                cyc = dfs(nxt)
                if cyc:
                    return cyc
        visiting.remove(n)
        stack.pop()
        visited.add(n)
        return None

    for node in graph:
        if node not in visited:
            cyc = dfs(node)
            if cyc:
                return cyc
    return None


def main() -> int:
    v = Validator()
    required_files = [
        "grammar-inventory.md",
        "concept-extensions.md",
        "functional-inventory.md",
        "lexical-targets.md",
        "curriculum-traceability.md",
        "level-exit-criteria.md",
        "l1-error-model.md",
        "case-aspect-sequence.md",
        "methodology.md",
        "sources-and-evidence.md",
        "review-checklist.md",
        "phase-2-report.md",
        "phase-2-integrity-report.md",
    ]
    for f in required_files:
        if not (CUR / f).exists():
            v.err(f, "missing required file")

    if v.errors:
        for e in v.errors:
            print(e)
        return 1

    gram_text = read("grammar-inventory.md")
    ext_text = read("concept-extensions.md")
    fn_text = read("functional-inventory.md")
    lex_text = read("lexical-targets.md")
    tr_text = read("curriculum-traceability.md")
    exit_text = read("level-exit-criteria.md")
    l1_text = read("l1-error-model.md")
    report = read("phase-2-report.md")
    integ = read("phase-2-integrity-report.md")

    grammar = parse_concepts(gram_text, ("GR",))
    extensions = parse_concepts(ext_text, ("PHON", "ORTH", "PRAG"))
    all_lang = {**grammar, **extensions}

    # 1 uniqueness
    ids = list(grammar) + list(extensions)
    dup = [i for i, c in collections.Counter(ids).items() if c > 1]
    for d in dup:
        v.err("grammar/extensions", "duplicate canonical ID", d)

    # GR must not define PHON/ORTH/PRAG namespaces wrongly — already separated

    # required fields for GR
    required_fields = {
        "Функция",
        "Form / Meaning / Use",
        "Пределы",
        "Пример",
        "Контрпример",
        "Evidence",
        "Source",
        "L1",
        "Prereq",
    }
    for cid, meta in grammar.items():
        if not meta["intro"]:
            v.err("grammar-inventory.md", "missing Intro level", cid)
        missing = required_fields - meta["fields"]
        # Prereq line may be — which still counts if fields has Prereq
        if "Prereq" not in meta["fields"]:
            # check raw
            if f"#### {cid}" in gram_text:
                block = gram_text.split(f"#### {cid}", 1)[1].split("#### ", 1)[0]
                if "**Prereq:**" not in block:
                    v.err("grammar-inventory.md", "missing Prereq field", cid)
        for f in ("Функция", "Пример", "Контрпример", "Evidence", "Source"):
            if f not in meta["fields"]:
                block = gram_text.split(f"#### {cid}", 1)[1].split("#### ", 1)[0]
                if f"**{f}:**" not in block and (
                    f != "Form / Meaning / Use"
                    or "Form / Meaning / Use" not in block
                ):
                    v.err("grammar-inventory.md", f"missing field {f}", cid)

    # 3-5 prerequisites exist, no late, no wildcard, no cycles
    graph = {cid: list(meta["prereq"]) for cid, meta in all_lang.items()}
    for cid, meta in all_lang.items():
        if meta.get("wildcard"):
            v.err(
                "grammar-inventory.md" if cid.startswith("GR-") else "concept-extensions.md",
                "wildcard prerequisite not allowed",
                cid,
            )
        intro = meta.get("intro")
        for p in meta["prereq"]:
            if p not in all_lang:
                v.err(
                    "grammar-inventory.md",
                    f"prerequisite does not exist: {p}",
                    cid,
                )
                continue
            pintro = all_lang[p].get("intro")
            if intro and pintro and LEVEL_ORDER[pintro] > LEVEL_ORDER[intro]:
                v.err(
                    "grammar-inventory.md",
                    f"prerequisite {p} ({pintro}) is later than concept ({intro})",
                    cid,
                )
    cyc = has_cycle(graph)
    if cyc:
        v.err("grammar-inventory.md", f"prerequisite cycle: {' -> '.join(cyc)}")

    # 6 factual counts
    by = collections.Counter(m["intro"] for m in grammar.values())
    total = len(grammar)
    # summary table must match
    for lv in ("A1", "A2", "B1", "B2"):
        m = re.search(rf"\| {lv} \| (\d+) \|", gram_text)
        if not m:
            v.err("grammar-inventory.md", f"missing summary count for {lv}")
        elif int(m.group(1)) != by.get(lv, 0):
            v.err(
                "grammar-inventory.md",
                f"summary {lv}={m.group(1)} but actual {by.get(lv, 0)}",
            )
    m = re.search(r"\|\ \*\*Всего\*\* \| \*\*(\d+)\*\* \|", gram_text)
    if not m or int(m.group(1)) != total:
        v.err(
            "grammar-inventory.md",
            f"summary total mismatch actual={total}",
        )

    # 7 report counters
    for label, val in (
        ("A1", by.get("A1", 0)),
        ("A2", by.get("A2", 0)),
        ("B1", by.get("B1", 0)),
        ("B2", by.get("B2", 0)),
    ):
        # integrity report should carry factual counts
        if f"| {label} |" not in integ and f"**{label}**" not in integ:
            v.warn("phase-2-integrity-report.md", f"missing {label} count mention")

    # 8 FN coverage in traceability
    fns = FN_DEF.findall(fn_text)
    if len(fns) != len(set(fns)):
        v.err("functional-inventory.md", "duplicate FN definitions")
    if len(set(fns)) != 195:
        v.err(
            "functional-inventory.md",
            f"expected 195 FN definitions, found {len(set(fns))}",
        )
    for fid in fns:
        if fid not in tr_text:
            v.err("curriculum-traceability.md", "FN not traced", fid)
        # required fields in FN record
        block = fn_text.split(f"### {fid}", 1)[1].split("### ", 1)[0]
        for field in (
            "Level",
            "Function",
            "Domains",
            "GR prerequisites",
            "LEX bundles",
            "Required evidence",
            "Criticality",
            "Completion criterion",
            "L1 risks",
            "Exam relevance",
        ):
            if f"**{field}:**" not in block:
                v.err("functional-inventory.md", f"missing field {field}", fid)
        # resolve GR and LEX
        lexs = re.findall(r"(?<![A-Z0-9-])LEX-[A-Z0-9-]+", block)
        for lx in lexs:
            if lx not in lex_text:
                v.err("functional-inventory.md", f"LEX bundle not defined: {lx}", fid)
        errs = re.findall(r"(?<![A-Z0-9-])ERR-(?:UKR|RUS|BEL)-\d{2}", block)
        for e in errs:
            if f"### {e}" not in l1_text:
                v.err("functional-inventory.md", f"ERR not defined: {e}", fid)

        grs = re.findall(
            r"(?<![A-Z0-9-])(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+",
            block.split("**LEX bundles:**")[0],
        )
        for g in grs:
            if g.endswith("-") or "*" in g:
                v.err("functional-inventory.md", f"bad GR token {g}", fid)
            elif g not in all_lang:
                v.err("functional-inventory.md", f"unresolvable GR/ext ID {g}", fid)

    # forbidden temporary IDs as exact tokens in curriculum (allow in migration table)
    for fname in (
        "functional-inventory.md",
        "curriculum-traceability.md",
        "level-exit-criteria.md",
        "grammar-inventory.md",
    ):
        text = read(fname)
        # strip migration tables / historical notes
        scrub = text
        if fname == "grammar-inventory.md":
            scrub = re.sub(
                r"## Таблица миграции[\s\S]*",
                "",
                scrub,
            )
        if "concept-extensions.md" == fname:
            continue
        for bad in FORBIDDEN_TEMP:
            # allow as substring of canonical longer id? use boundaries
            if bad in ("TODO", "TBD", "Placeholder — Phase 2"):
                if bad in scrub and "migration" not in scrub.lower():
                    # allow TODO in comments? fail hard
                    if bad in scrub:
                        v.err(fname, f"forbidden placeholder/temporary token: {bad}")
                continue
            for m in re.finditer(rf"(?<![A-Z0-9-]){re.escape(bad)}(?![A-Z0-9-])", scrub):
                # allow inside migration docs only
                if "concept-extensions" in fname:
                    continue
                v.err(fname, f"unresolved temporary ID {bad}")

    # migration table exists
    if "Таблица миграции" not in ext_text and "миграции" not in ext_text.lower():
        v.err("concept-extensions.md", "missing migration table")

    # mastery model
    if "Mastery model" not in exit_text:
        v.err("level-exit-criteria.md", "missing Mastery model section")
    if "Criticality=Core" not in exit_text and "Criticality=Core" not in exit_text:
        if "Criticality" not in exit_text or "Core" not in exit_text:
            v.err("level-exit-criteria.md", "missing Core FN completion rule")
    if "CALIBRATION=required" not in exit_text:
        v.err("level-exit-criteria.md", "missing CALIBRATION=required markers")

    # L1 counts
    for lang, prefix in (("UKR", "ERR-UKR-"), ("RUS", "ERR-RUS-"), ("BEL", "ERR-BEL-")):
        cards = [x for x in ERR_DEF.findall(l1_text) if x.startswith(prefix)]
        if len(cards) < 20:
            v.err("l1-error-model.md", f"{lang} has only {len(cards)} cards, need ≥20")

    # standard_status / session_availability preserved
    exam = (REQ / "07-exam-preparation-requirements.md").read_text(encoding="utf-8")
    if "standard_status" not in exam or "session_availability" not in exam:
        v.err("07-exam-preparation-requirements.md", "status fields missing")
    if re.search(r"A1.*historical", exam, re.I):
        # allow negation "Не historical"
        if "Не** `historical`" not in exam and "не `historical`" not in exam.lower():
            if "`historical`" in exam and "Не" not in exam:
                v.err("07-exam-preparation-requirements.md", "A1 marked historical")

    # coverage table present
    if "| FN |" not in tr_text or "Трассируется" not in tr_text:
        v.err("curriculum-traceability.md", "missing coverage summary table")

    # no fake FN domain ids in traceability
    for m in re.finditer(r"\bFN-[A-Z]+-[A-Z0-9-]+\b", tr_text):
        tok = m.group(0)
        if not re.match(r"FN-(?:A1|A2|B1|B2)-\d{3}$", tok):
            v.err("curriculum-traceability.md", f"non-canonical FN id {tok}")

    # print results
    for w in v.warnings:
        print(w)
    if v.errors:
        for e in v.errors:
            print(e)
        print(f"\nFAILED: {len(v.errors)} error(s), {len(v.warnings)} warning(s)")
        print(
            f"Counts: GR={total} {dict(by)}; FN={len(set(fns))}; "
            f"EXT={len(extensions)}"
        )
        return 1

    print("OK: curriculum validation passed")
    print(
        f"Counts: GR={total} by_level={dict(by)}; FN={len(set(fns))}; "
        f"PHON+ORTH+PRAG={len(extensions)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
