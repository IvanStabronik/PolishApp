#!/usr/bin/env python3
"""Validate PolishApp Phase 2 curriculum structural integrity.

Usage:
  python scripts/validate-curriculum.py

Exit 0 = structural integrity only (NOT semantic/methodological correctness).
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

STUB_PHRASES = [
    "см. название",
    "учебный минимум",
    "задаётся в упражнении",
    "смешение с L1-нормой",
]

GENERIC_COMPLETION = (
    "Наблюдаемое выполнение функции в целевом домене без блокирующей "
    "ошибки регистра/управления/понимания; см. mastery model."
)

FORBIDDEN_TEMP_EXACT = [
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

LEX_REQUIRED_FIELDS = [
    "Purpose",
    "First use level",
    "Ownership",
    "Thematic subgroups",
    "Required MWU",
    "Related FN",
    "Size orientation",
    "Selection source",
]


class V:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def err(self, file: str, msg: str, id_: str | None = None) -> None:
        loc = file + (f" [{id_}]" if id_ else "")
        self.errors.append(f"ERROR {loc}: {msg}")

    def warn(self, file: str, msg: str, id_: str | None = None) -> None:
        loc = file + (f" [{id_}]" if id_ else "")
        self.warnings.append(f"WARN {loc}: {msg}")


def read_cur(name: str) -> str:
    return (CUR / name).read_text(encoding="utf-8")


def parse_lang_concepts(*texts: str) -> dict[str, dict]:
    concepts: dict[str, dict] = {}
    for text in texts:
        current = None
        for line in text.splitlines():
            m = re.match(
                r"^#### ((?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+)\b", line
            )
            if m:
                current = m.group(1)
                concepts[current] = {
                    "intro": None,
                    "exit": None,
                    "prereq": [],
                }
                continue
            if not current:
                continue
            m = re.search(r"\*\*Intro:\*\*\s*([A-B][12])", line)
            if m:
                concepts[current]["intro"] = m.group(1)
            m = re.search(
                r"\*\*Exit status:\*\*\s*(Required|Supporting|Extension)", line
            )
            if m:
                concepts[current]["exit"] = m.group(1)
            m = re.search(r"\*\*Prereq:\*\*\s*(.+)$", line)
            if m:
                val = m.group(1).strip()
                if val not in ("—", "-", "нет", "none", ""):
                    concepts[current]["prereq"] = re.findall(
                        r"(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+", val
                    )
                    if "*" in val:
                        concepts[current]["wildcard"] = True
    return concepts


def has_cycle(graph: dict[str, list[str]]) -> list[str] | None:
    visiting: set[str] = set()
    visited: set[str] = set()
    stack: list[str] = []

    def dfs(n: str) -> list[str] | None:
        visiting.add(n)
        stack.append(n)
        for nxt in graph.get(n, []):
            if nxt not in graph:
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


def parse_fns(text: str) -> list[dict]:
    rows = []
    for m in re.finditer(
        r"^### (FN-(A1|A2|B1|B2)-\d{3})\n([\s\S]*?)(?=^### |\Z)",
        text,
        re.M,
    ):
        fid, level, block = m.group(1), m.group(2), m.group(3)

        def field(name: str) -> str:
            mm = re.search(rf"\*\*{name}:\*\*\s*(.+)", block)
            return mm.group(1).strip() if mm else ""

        rows.append(
            {
                "id": fid,
                "level": level,
                "block": block,
                "function": field("Function"),
                "gr": re.findall(
                    r"(?<![A-Z0-9-])(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+",
                    field("GR prerequisites"),
                ),
                "lex": re.findall(
                    r"(?<![A-Z0-9-])LEX-[A-Z0-9-]+", field("LEX bundles")
                ),
                "evidence": field("Required evidence"),
                "criticality": field("Criticality"),
                "completion": field("Completion criterion"),
                "l1": field("L1 risks"),
                "exam": field("Exam relevance"),
                "anchor": field("Source anchor"),
            }
        )
    return rows


def parse_lex_bundles(text: str) -> dict[str, str]:
    bundles = {}
    for m in re.finditer(
        r"^### (LEX-[A-Z0-9-]+)\n([\s\S]*?)(?=^### |\Z)", text, re.M
    ):
        bundles[m.group(1)] = m.group(2)
    return bundles


def main() -> int:
    v = V()
    required = [
        "grammar-inventory.md",
        "concept-extensions.md",
        "functional-inventory.md",
        "lexical-targets.md",
        "curriculum-traceability.md",
        "level-exit-criteria.md",
        "l1-error-model.md",
        "phase-2-integrity-report.md",
    ]
    for f in required:
        if not (CUR / f).exists():
            v.err(f, "missing required file")
    if v.errors:
        print("\n".join(v.errors))
        return 1

    # rebuild script must not exist
    if (ROOT / "scripts" / "rebuild_phase2_integrity.py").exists():
        v.err(
            "scripts/rebuild_phase2_integrity.py",
            "mechanical integrity generator must be deleted",
        )

    gram = read_cur("grammar-inventory.md")
    ext = read_cur("concept-extensions.md")
    fn_text = read_cur("functional-inventory.md")
    lex_text = read_cur("lexical-targets.md")
    tr_text = read_cur("curriculum-traceability.md")
    exit_text = read_cur("level-exit-criteria.md")
    l1_text = read_cur("l1-error-model.md")

    concepts = parse_lang_concepts(gram, ext)
    grammar_ids = [c for c in concepts if c.startswith("GR-")]
    by_intro = collections.Counter(
        concepts[c]["intro"] for c in grammar_ids if concepts[c]["intro"]
    )

    # uniqueness
    if len(concepts) != len(set(concepts)):
        v.err("grammar/extensions", "duplicate canonical IDs")

    # Exit status required
    for cid, meta in concepts.items():
        if not meta["exit"]:
            v.err(
                "grammar-inventory.md"
                if cid.startswith("GR-")
                else "concept-extensions.md",
                "missing Exit status",
                cid,
            )
        if not meta["intro"]:
            v.err(
                "grammar-inventory.md"
                if cid.startswith("GR-")
                else "concept-extensions.md",
                "missing Intro",
                cid,
            )

    # stub phrases banned in extensions cards
    for phrase in STUB_PHRASES:
        if phrase in ext:
            v.err("concept-extensions.md", f"forbidden stub phrase: {phrase}")

    # prereq graph
    graph = {cid: list(meta["prereq"]) for cid, meta in concepts.items()}
    for cid, meta in concepts.items():
        if meta.get("wildcard"):
            v.err("grammar-inventory.md", "wildcard prerequisite", cid)
        intro = meta.get("intro")
        for p in meta["prereq"]:
            if p not in concepts:
                v.err(
                    "grammar-inventory.md"
                    if cid.startswith("GR-")
                    else "concept-extensions.md",
                    f"missing prerequisite {p}",
                    cid,
                )
            else:
                pi = concepts[p]["intro"]
                if intro and pi and LEVEL_ORDER[pi] > LEVEL_ORDER[intro]:
                    v.err(
                        "grammar-inventory.md",
                        f"prerequisite {p} ({pi}) later than concept ({intro})",
                        cid,
                    )
    cyc = has_cycle(graph)
    if cyc:
        v.err("grammar-inventory.md", f"cycle: {' -> '.join(cyc)}")

    # grammar summary matches fact
    for lv in ("A1", "A2", "B1", "B2"):
        m = re.search(rf"\| {lv} \| (\d+) \|", gram)
        actual = by_intro.get(lv, 0)
        if not m:
            v.err("grammar-inventory.md", f"missing summary row {lv}")
        elif int(m.group(1)) != actual:
            v.err(
                "grammar-inventory.md",
                f"summary {lv}={m.group(1)} actual={actual}",
            )
    m = re.search(r"\|\ \*\*Всего\*\* \| \*\*(\d+)\*\* \|", gram)
    if not m or int(m.group(1)) != len(grammar_ids):
        v.err(
            "grammar-inventory.md",
            f"summary total mismatch actual={len(grammar_ids)}",
        )

    # FN checks
    fns = parse_fns(fn_text)
    fn_ids = [f["id"] for f in fns]
    if len(fn_ids) != len(set(fn_ids)):
        v.err("functional-inventory.md", "duplicate FN ids")

    late_fn = []
    crit = collections.Counter()
    evid = collections.Counter()
    completions = collections.Counter()

    for fr in fns:
        crit[fr["criticality"]] += 1
        evid[fr["evidence"]] += 1
        completions[fr["completion"]] += 1
        for field in (
            "Function",
            "Domains",
            "GR prerequisites",
            "LEX bundles",
            "Required evidence",
            "Criticality",
            "Completion criterion",
            "L1 risks",
            "Exam relevance",
            "Source anchor",
        ):
            if f"**{field}:**" not in fr["block"]:
                v.err("functional-inventory.md", f"missing {field}", fr["id"])
        if fr["criticality"] not in ("Core", "Important", "Extension"):
            v.err(
                "functional-inventory.md",
                f"bad criticality {fr['criticality']}",
                fr["id"],
            )
        if fr["completion"] == GENERIC_COMPLETION:
            v.err(
                "functional-inventory.md",
                "generic identical completion criterion",
                fr["id"],
            )
        if not fr["anchor"]:
            v.err("functional-inventory.md", "missing Source anchor", fr["id"])
        # late deps
        for g in fr["gr"]:
            if g not in concepts:
                v.err(
                    "functional-inventory.md",
                    f"unresolvable concept {g}",
                    fr["id"],
                )
            else:
                gi = concepts[g]["intro"]
                if gi and LEVEL_ORDER[gi] > LEVEL_ORDER[fr["level"]]:
                    late_fn.append((fr["id"], fr["level"], g, gi))
                    v.err(
                        "functional-inventory.md",
                        f"depends on later-level concept {g} ({gi})",
                        fr["id"],
                    )

    # mass-identical completion
    for text, n in completions.items():
        if text and n >= 10:
            v.err(
                "functional-inventory.md",
                f"completion criterion repeated {n} times (mass template)",
            )

    # LEX bundles
    bundles = parse_lex_bundles(lex_text)
    used_lex = {x for fr in fns for x in fr["lex"]}
    for lx in used_lex:
        if lx not in bundles:
            v.err("lexical-targets.md", "LEX used in FN but not defined", lx)
            continue
        block = bundles[lx]
        for field in LEX_REQUIRED_FIELDS:
            if f"**{field}" not in block and f"**{field}:**" not in block:
                # allow Required MWU (examples)
                if field == "Required MWU" and "**Required MWU" in block:
                    continue
                v.err("lexical-targets.md", f"bundle missing field {field}", lx)
        m = re.search(r"\*\*First use level:\*\*\s*([A-B][12])", block)
        if not m:
            v.err("lexical-targets.md", "missing First use level", lx)
        else:
            lex_lv = m.group(1)
            # first FN use
            firsts = [fr["level"] for fr in fns if lx in fr["lex"]]
            if firsts:
                earliest = min(firsts, key=lambda x: LEVEL_ORDER[x])
                if LEVEL_ORDER[lex_lv] > LEVEL_ORDER[earliest]:
                    v.err(
                        "lexical-targets.md",
                        f"First use level {lex_lv} later than FN use {earliest}",
                        lx,
                    )

    # Traceability: exact FN row, not substring
    # Expect markdown table rows containing | `FN-…` |
    for fr in fns:
        pattern = rf"\|\s*`{re.escape(fr['id'])}`\s*\|"
        if not re.search(pattern, tr_text):
            v.err(
                "curriculum-traceability.md",
                "FN missing as exact table cell",
                fr["id"],
            )
    # ban generic-only anchors if every row identical short A1 blurb without source variety
    # soft: require Source anchor column values diversity
    anchors = re.findall(r"^\| ([^|]+) \| (A1|A2|B1|B2) \| `FN-", tr_text, re.M)
    if anchors:
        uniq = {a[0].strip() for a in anchors}
        if len(uniq) < 3:
            v.err(
                "curriculum-traceability.md",
                f"too few distinct source anchors ({len(uniq)}); generic level anchors only",
            )

    # mastery exit status language
    if "Exit status=Required" not in exit_text and "Exit status" not in exit_text:
        v.err("level-exit-criteria.md", "missing Exit status mastery rules")

    # L1 counts
    for prefix, lang in (
        ("ERR-UKR-", "UKR"),
        ("ERR-RUS-", "RUS"),
        ("ERR-BEL-", "BEL"),
    ):
        n = len(re.findall(rf"^### ({prefix}\d{{2}})\b", l1_text, re.M))
        if n < 20:
            v.err("l1-error-model.md", f"{lang} has {n} cards, need ≥20")

    # exam status fields
    exam = (REQ / "07-exam-preparation-requirements.md").read_text(encoding="utf-8")
    if "standard_status" not in exam or "session_availability" not in exam:
        v.err("07-exam-preparation-requirements.md", "status fields missing")

    # forbidden temps outside migration table
    mig = ""
    if "## Таблица миграции" in ext:
        mig = ext.split("## Таблица миграции", 1)[1]
    for fname, text in (
        ("functional-inventory.md", fn_text),
        ("curriculum-traceability.md", tr_text),
        ("level-exit-criteria.md", exit_text),
        ("grammar-inventory.md", gram),
    ):
        for bad in FORBIDDEN_TEMP_EXACT:
            if bad in ("TODO", "TBD", "Placeholder — Phase 2"):
                if bad in text:
                    v.err(fname, f"forbidden token {bad}")
                continue
            for m in re.finditer(
                rf"(?<![A-Z0-9-]){re.escape(bad)}(?![A-Z0-9-])", text
            ):
                v.err(fname, f"unresolved temporary ID {bad}")

    # migration must mark DISAMBIGUATE for dangerous aliases
    for key in ("`GR-CASE`", "`GR-NUM`", "`GR-PART`", "`GR-TENSE`"):
        if key not in mig or "DISAMBIGUATE" not in mig:
            # check per key line
            pass
    for key in ("GR-CASE`", "GR-NUM`", "GR-PART`", "GR-TENSE`"):
        if key in mig:
            # find line
            for line in mig.splitlines():
                if key in line and "DISAMBIGUATE" not in line and "запрет" not in line.lower():
                    if key.startswith("GR-CASE`") or key in (
                        "GR-NUM`",
                        "GR-PART`",
                        "GR-TENSE`",
                    ):
                        if "DISAMBIGUATE" not in line:
                            v.err(
                                "concept-extensions.md",
                                f"ambiguous migration for {key} must say DISAMBIGUATE",
                            )

    # report distributions
    print("=== DISTRIBUTION REPORT (structural) ===")
    print(f"GR by Intro: {dict(by_intro)} total={len(grammar_ids)}")
    print(
        "Exit status:",
        dict(
            collections.Counter(
                concepts[c]["exit"] for c in concepts if concepts[c]["exit"]
            )
        ),
    )
    print(f"FN count (from docs): {len(fns)}")
    print(f"Criticality: {dict(crit)}")
    print(f"Evidence: {dict(evid)}")
    print(f"Late FN prerequisites: {len(late_fn)}")
    for item in late_fn[:20]:
        print(f"  late {item}")
    used_lang = {g for fr in fns for g in fr["gr"]}
    uncovered = sorted(set(concepts) - used_lang)
    print(f"Concepts not linked from any FN: {len(uncovered)}")
    used_err = set()
    for fr in fns:
        used_err.update(re.findall(r"ERR-(?:UKR|RUS|BEL)-\d{2}", fr["l1"]))
    all_err = re.findall(
        r"^### (ERR-(?:UKR|RUS|BEL)-\d{2})\b", l1_text, re.M
    )
    unused_err = sorted(set(all_err) - used_err)
    print(f"ERR unused by FN: {len(unused_err)}")
    print("=== END DISTRIBUTION ===")
    print()
    print(
        "NOTE: OK means structural integrity only — "
        "NOT semantic/methodological correctness or JPJO approval."
    )

    for w in v.warnings:
        print(w)
    if v.errors:
        for e in v.errors:
            print(e)
        print(f"\nFAILED: {len(v.errors)} error(s)")
        return 1

    print(
        f"OK (structural only): GR={len(grammar_ids)} {dict(by_intro)}; "
        f"FN={len(fns)}; concepts={len(concepts)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
