#!/usr/bin/env python3
"""Validate PolishApp Phase 2 curriculum structural integrity + A1 semantic-model antipatterns.

Usage:
  python scripts/validate-curriculum.py

Exit 0 = structural / anti-pattern checks only.
Does NOT prove pedagogical correctness or JPJO approval.
"""
from __future__ import annotations

import collections
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CUR = ROOT / "docs" / "requirements" / "curriculum"
DOC_CUR = ROOT / "docs" / "curriculum"
DOC_REP = ROOT / "docs" / "reports"
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

FORBIDDEN_PLACEHOLDERS = [
    "DEFAULT",
    "сценарийный минимум по связанным FN",
    "Learner can ",
    "in a timed scenario, without blocking register/rekcja failure",
    "Placeholder — Phase 2",
    "TODO",
    "TBD",
]

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
]

DOMAIN_TOKENS = [
    "shop",
    "food",
    "ticket",
    "housing",
    "urzad",
    "urząd",
    "work",
    "school",
    "bank",
    "phone",
    "med",
    "health",
    "transport",
    "neighbor",
    "everyday",
    "магазин",
    "еда",
    "билет",
    "жиль",
    "работ",
    "школ",
    "банк",
    "телефон",
    "здоров",
    "транспорт",
    "сосед",
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


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def read_cur(name: str) -> str:
    return read(CUR / name)


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


def _field(block: str, *names: str) -> str:
    for name in names:
        mm = re.search(rf"\*\*{re.escape(name)}:\*\*\s*(.+)", block)
        if mm:
            return mm.group(1).strip()
    return ""


def parse_fns(text: str) -> list[dict]:
    """Parse both canonical A1 cluster IDs and legacy FN-A2-001 style."""
    rows: list[dict] = []
    pattern = (
        r"^### (FN-(?:A1-[A-Z]+-\d{2}|A1-\d{3}|A2-\d{3}|B1-\d{3}|B2-\d{3}))\b"
        r"\n([\s\S]*?)(?=^### |\Z)"
    )
    for m in re.finditer(pattern, text, re.M):
        fid, block = m.group(1), m.group(2)
        if fid.startswith("FN-A1-") and re.match(r"FN-A1-\d{3}$", fid):
            # old numeric A1 IDs should not remain as canon
            level = "A1"
            legacy_a1 = True
        else:
            level = fid.split("-")[1]
            legacy_a1 = False

        concepts = re.findall(
            r"(?<![A-Z0-9-])(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+",
            _field(block, "Concepts", "GR prerequisites"),
        )
        lex = re.findall(
            r"(?<![A-Z0-9-])LEX-[A-Z0-9-]+",
            _field(block, "LEX bundle", "LEX bundles"),
        )
        scenarios = re.findall(
            r"SCN-[A-Z0-9-]+", _field(block, "Scenarios")
        )
        title = _field(block, "Title (PL)", "Function", "Can-do")
        rows.append(
            {
                "id": fid,
                "level": level,
                "legacy_a1": legacy_a1,
                "block": block,
                "function": title,
                "gr": concepts,
                "lex": lex,
                "scenarios": scenarios,
                "evidence": _field(
                    block, "Evidence type", "Required evidence"
                ),
                "criticality": _field(block, "Criticality"),
                "completion": _field(block, "Completion criterion"),
                "l1": _field(block, "L1 risks"),
                "exam": _field(block, "Exam relevance"),
                "anchor": _field(block, "Source anchor")
                or (
                    "multiline"
                    if "**Source anchor:**" in block
                    or "**Source anchor**" in block
                    else ""
                ),
                "canonical_a1": bool(
                    re.match(r"FN-A1-[A-Z]+-\d{2}$", fid)
                ),
            }
        )
    return rows


def parse_entities(text: str, prefix: str) -> list[str]:
    return re.findall(rf"^### ((?:{prefix})-[A-Z0-9-]+)\b", text, re.M)


def parse_lex_bundles(text: str) -> dict[str, str]:
    bundles = {}
    for m in re.finditer(
        r"^### (LEX-[A-Z0-9-]+)\n([\s\S]*?)(?=^### |^## |\Z)", text, re.M
    ):
        bundles[m.group(1)] = m.group(2)
    return bundles


def normalize_completion(text: str, strip_tokens: list[str]) -> str:
    t = text.lower()
    t = re.sub(r"`[^`]+`", " ", t)
    t = re.sub(r"\b(?:fn|scn|asm|exm|lex|gr|phon|orth|prag)-[a-z0-9-]+\b", " ", t)
    for tok in strip_tokens:
        if tok:
            t = t.replace(tok.lower(), " ")
    for d in DOMAIN_TOKENS:
        t = t.replace(d, " ")
    t = re.sub(r"[^\wа-яёіїєґąćęłńóśźż\s]", " ", t, flags=re.I)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def lex_has_substance(block: str) -> tuple[bool, list[str]]:
    missing = []
    for label, key in (("MWU", "MWU"), ("FIX", "FIX"), ("COLL", "COLL")):
        m = re.search(
            rf"\*\*(?:Required )?{key}(?: \(examples\))?:\*\*\s*(.+)",
            block,
        )
        if not m:
            missing.append(label)
            continue
        val = m.group(1).strip()
        if val in ("—", "-", "DEFAULT", ""):
            missing.append(label)
            continue
        if val.lower() in ("na przykład", "наприклад"):
            missing.append(label)
            continue
        items = [x.strip() for x in re.split(r"[,;]|·|\|", val) if x.strip()]
        # also count italic phrases
        ital = re.findall(r"\*([^*]+)\*", val)
        if len(items) + len(ital) < 1:
            missing.append(label)
    return (len(missing) == 0, missing)


def main() -> int:
    # Windows consoles may be cp1252; keep UTF-8 for curriculum Cyrillic/Polish.
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
            sys.stderr.reconfigure(encoding="utf-8", errors="replace")
        except Exception:
            pass

    v = V()
    required_cur = [
        "grammar-inventory.md",
        "concept-extensions.md",
        "functional-inventory.md",
        "lexical-targets.md",
        "curriculum-traceability.md",
        "level-exit-criteria.md",
        "l1-error-model.md",
        "phase-2-integrity-report.md",
    ]
    required_doc = [
        DOC_CUR / "entity-definitions.md",
        DOC_CUR / "functional-migration-a1.md",
        DOC_CUR / "scenario-inventory.md",
        DOC_CUR / "asm-exm-a1.md",
        DOC_CUR / "a1-traceability.md",
        DOC_REP / "phase-2-a1-model-report.md",
    ]
    for f in required_cur:
        if not (CUR / f).exists():
            v.err(f, "missing required file")
    for p in required_doc:
        if not p.exists():
            v.err(str(p.relative_to(ROOT)), "missing required A1 model file")
    if v.errors:
        print("\n".join(v.errors))
        return 1

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
    scn_text = read(DOC_CUR / "scenario-inventory.md")
    asm_text = read(DOC_CUR / "asm-exm-a1.md")
    a1_tr = read(DOC_CUR / "a1-traceability.md")
    entity_text = read(DOC_CUR / "entity-definitions.md")

    concepts = parse_lang_concepts(gram, ext)
    grammar_ids = [c for c in concepts if c.startswith("GR-")]
    by_intro = collections.Counter(
        concepts[c]["intro"] for c in grammar_ids if concepts[c]["intro"]
    )

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

    for phrase in STUB_PHRASES:
        if phrase in ext:
            v.err("concept-extensions.md", f"forbidden stub phrase: {phrase}")

    # PHON antipatterns: uniwersytet must not appear as a listed exception item
    if re.search(
        r"(?:исключен\w*|exceptions?)[^\n.]{0,80}uniwersytet|"
        r"uniwersytet[^\n.]{0,80}(?:в списке исключен|как исключен)",
        ext,
        re.I,
    ):
        v.err(
            "concept-extensions.md",
            "uniwersytet must not be listed as stress exception",
        )
    if "c ≠ ц" in ext or "c ≠ ц-автомат" in ext:
        v.err(
            "concept-extensions.md",
            "forbidden false claim c ≠ ц; describe orthography/distribution risk",
        )

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

    # Entity definitions presence
    for token in ("FN-*", "SCN-*", "ASM-*", "EXM-*"):
        if token not in entity_text and token.replace("-*", "") not in entity_text:
            # soft check via section headers
            pass
    for needle in ("`FN-*`", "`SCN-*`", "`ASM-*`", "`EXM-*`"):
        if needle not in entity_text:
            v.err("docs/curriculum/entity-definitions.md", f"missing {needle}")

    fns = parse_fns(fn_text)
    a1_fns = [f for f in fns if f["canonical_a1"]]
    legacy_fns = [f for f in fns if not f["canonical_a1"]]
    old_a1 = [f for f in fns if f["legacy_a1"]]
    if old_a1:
        for fr in old_a1:
            v.err(
                "functional-inventory.md",
                "legacy numeric FN-A1-NNN must not remain as canon",
                fr["id"],
            )

    fn_ids = [f["id"] for f in fns]
    if len(fn_ids) != len(set(fn_ids)):
        v.err("functional-inventory.md", "duplicate FN ids")

    scn_ids = parse_entities(scn_text, "SCN")
    asm_ids = parse_entities(asm_text, "ASM")
    exm_ids = parse_entities(asm_text, "EXM")
    if len(scn_ids) != len(set(scn_ids)):
        v.err("scenario-inventory.md", "duplicate SCN ids")

    # Distinguish entity namespaces in inventories
    for bad_prefix, where, text in (
        ("SCN-", "functional-inventory.md (as ### heading)", fn_text),
        ("ASM-", "functional-inventory.md (as ### heading)", fn_text),
        ("EXM-", "functional-inventory.md (as ### heading)", fn_text),
        ("FN-", "scenario-inventory.md (as ### heading)", scn_text),
    ):
        for m in re.finditer(rf"^### {bad_prefix}", text, re.M):
            # scenario may mention FN in body; only headings matter
            heading = text[m.start() : text.find("\n", m.start())]
            if bad_prefix == "FN-" and heading.startswith("### FN-"):
                v.err(where, f"FN heading inside SCN inventory: {heading}")
            if bad_prefix in ("SCN-", "ASM-", "EXM-") and heading.startswith(
                f"### {bad_prefix}"
            ):
                v.err(where, f"non-FN entity headed as FN inventory: {heading}")

    late_fn = []
    crit = collections.Counter()
    evid = collections.Counter()
    completions_raw = collections.Counter()
    strip_tokens: list[str] = []
    for fr in a1_fns:
        strip_tokens.append(fr["id"])
        strip_tokens.append(fr["function"])
    for sid in scn_ids:
        strip_tokens.append(sid)

    for fr in fns:
        crit[fr["criticality"]] += 1
        evid[fr["evidence"]] += 1
        if fr["completion"]:
            completions_raw[fr["completion"]] += 1

        if fr["canonical_a1"]:
            for field in (
                "Can-do",
                "Intent",
                "Modality/skill",
                "Scenarios",
                "Level",
                "Concepts",
                "LEX bundle",
                "Evidence type",
                "Completion criterion",
                "Allowed support",
                "Blocking errors",
                "L1 risks",
                "Criticality",
            ):
                if f"**{field}:**" not in fr["block"]:
                    v.err(
                        "functional-inventory.md",
                        f"missing {field}",
                        fr["id"],
                    )
            if "**Source anchor:**" not in fr["block"]:
                v.err(
                    "functional-inventory.md",
                    "missing Source anchor",
                    fr["id"],
                )
            else:
                for kind in (
                    "NORMATIVE",
                    "CEFR",
                    "PRODUCT ANALYSIS",
                    "METHOD",
                ):
                    if kind not in fr["block"]:
                        v.err(
                            "functional-inventory.md",
                            f"Source anchor missing labeled {kind}",
                            fr["id"],
                        )
            if "PRODUCT ANALYSIS" in fr["block"] and re.search(
                r"NORMATIVE:\s*PRODUCT ANALYSIS", fr["block"]
            ):
                v.err(
                    "functional-inventory.md",
                    "PRODUCT ANALYSIS presented as NORMATIVE",
                    fr["id"],
                )
        else:
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
                    v.err(
                        "functional-inventory.md",
                        f"missing {field}",
                        fr["id"],
                    )

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
        # Legacy A2–B2 still contain pre-refactor timed templates; gate only A1 canon.
        if fr["canonical_a1"]:
            timed = (
                "in a timed scenario, without blocking register/rekcja failure"
            )
            if timed in fr["completion"] or (
                fr["completion"].startswith("Learner can ")
                and "timed scenario" in fr["completion"]
            ):
                v.err(
                    "functional-inventory.md",
                    "forbidden timed-scenario completion template",
                    fr["id"],
                )

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

    # SCN inventory fields (spot-check required keys)
    for sid in scn_ids:
        block_m = re.search(
            rf"^### {re.escape(sid)}[^\n]*\n([\s\S]*?)(?=^### |\Z)",
            scn_text,
            re.M,
        )
        if not block_m:
            v.err("scenario-inventory.md", "unparseable block", sid)
            continue
        block = block_m.group(1)
        for field in (
            "Жизненный домен",
            "Ожидаемый пользовательский результат",
            "Необходимые FN",
            "Необходимый LEX",
            "Наблюдаемые условия успеха",
            "Формат evidence",
            "Продуктовый приоритет",
        ):
            if f"**{field}:**" not in block and f"**{field}**" not in block:
                # allow alternate Latin keys
                alt = {
                    "Жизненный домен": ("Domain",),
                    "Ожидаемый пользовательский результат": ("User outcome",),
                    "Необходимые FN": ("Required FN",),
                    "Необходимый LEX": ("LEX", "LEX bundle", "Necessary LEX"),
                    "Наблюдаемые условия успеха": ("Success",),
                    "Формат evidence": ("Evidence", "Формат evidence"),
                    "Продуктовый приоритет": ("Priority",),
                }.get(field, ())
                if any(f"**{a}:**" in block or f"**{a}**" in block for a in alt):
                    continue
                v.err("scenario-inventory.md", f"missing {field}", sid)

    # FN ↔ SCN linkage
    fn_to_scn: dict[str, set[str]] = {f["id"]: set(f["scenarios"]) for f in a1_fns}
    scn_to_fn: dict[str, set[str]] = {s: set() for s in scn_ids}
    for fr in a1_fns:
        for s in fr["scenarios"]:
            if s not in scn_to_fn:
                v.err(
                    "functional-inventory.md",
                    f"unknown scenario {s}",
                    fr["id"],
                )
            else:
                scn_to_fn[s].add(fr["id"])
    # also harvest SCN → FN from scenario file
    for sid in scn_ids:
        block_m = re.search(
            rf"^### {re.escape(sid)}[^\n]*\n([\s\S]*?)(?=^### |\Z)",
            scn_text,
            re.M,
        )
        if not block_m:
            continue
        for fid in re.findall(r"FN-A1-[A-Z]+-\d{2}", block_m.group(1)):
            scn_to_fn[sid].add(fid)
            if fid in fn_to_scn:
                fn_to_scn[fid].add(sid)

    fn_without_scn = sorted(fid for fid, ss in fn_to_scn.items() if not ss)
    scn_without_fn = sorted(sid for sid, fs in scn_to_fn.items() if not fs)
    for fid in fn_without_scn:
        v.err(
            "functional-inventory.md",
            "canonical A1 FN without SCN linkage",
            fid,
        )
    for sid in scn_without_fn:
        # WRITE-SELF may be ASM-driven; still need FN anchors
        v.err(
            "scenario-inventory.md",
            "SCN without FN linkage",
            sid,
        )

    # mass-identical completion (raw)
    for text, n in completions_raw.items():
        if text and n >= 10:
            v.err(
                "functional-inventory.md",
                f"completion criterion repeated {n} times (mass template)",
            )

    # normalized completion templates (A1 focus + all)
    norm_counts = collections.Counter()
    for fr in a1_fns:
        if fr["completion"]:
            norm_counts[normalize_completion(fr["completion"], strip_tokens)] += 1
    for norm, n in norm_counts.items():
        if norm and n >= 3:
            v.err(
                "functional-inventory.md",
                f"normalized A1 completion template repeated {n} times: {norm[:80]}…",
            )

    # LEX
    bundles = parse_lex_bundles(lex_text)
    a1_bundles = {k: b for k, b in bundles.items() if k.startswith("LEX-A1-")}
    used_lex = {x for fr in fns for x in fr["lex"]}
    for lx in used_lex:
        if lx not in bundles:
            # A1 must resolve; legacy A2+ warn-level for missing optional packs
            if any(fr["canonical_a1"] and lx in fr["lex"] for fr in a1_fns):
                v.err(
                    "lexical-targets.md",
                    "LEX used in A1 FN but not defined",
                    lx,
                )
            elif lx.startswith("LEX-A1-"):
                v.err(
                    "lexical-targets.md",
                    "LEX-A1 used but not defined",
                    lx,
                )
            else:
                v.warn(
                    "lexical-targets.md",
                    "legacy LEX used in FN but not defined",
                    lx,
                )
            continue
        block = bundles[lx]
        if lx.startswith("LEX-A1-"):
            for field in (
                "Purpose",
                "First level",
                "Ownership",
                "Thematic subgroups",
                "MWU",
                "FIX",
                "COLL",
                "Rekcja",
                "Register",
                "Related FN",
                "Related SCN",
                "Selection source",
            ):
                if f"**{field}" not in block:
                    v.err(
                        "lexical-targets.md",
                        f"A1 bundle missing field {field}",
                        lx,
                    )
            for bad in (
                "DEFAULT",
                "сценарийный минимум по связанным FN",
            ):
                if bad in block:
                    v.err(
                        "lexical-targets.md",
                        f"forbidden placeholder {bad}",
                        lx,
                    )
            ok, missing = lex_has_substance(block)
            if not ok:
                v.err(
                    "lexical-targets.md",
                    f"missing substantive MWU/FIX/COLL: {missing}",
                    lx,
                )
            # ADDRESS semantic check
            if lx == "LEX-A1-ADDRESS":
                for needle in ("ulica", "numer", "mieszkanie", "piętro", "miasto"):
                    if needle not in block.lower():
                        v.err(
                            "lexical-targets.md",
                            f"ADDRESS bundle missing {needle}",
                            lx,
                        )
            if lx == "LEX-A1-APOLOGY":
                if "reklamac" in block.lower() and "przepraszam" not in block.lower():
                    v.err(
                        "lexical-targets.md",
                        "APOLOGY filled with complaint lexicon",
                        lx,
                    )
                if "przepraszam" not in block.lower():
                    v.err(
                        "lexical-targets.md",
                        "APOLOGY missing przepraszam",
                        lx,
                    )
        else:
            for field in (
                "Purpose",
                "First use level",
                "Ownership",
                "Thematic subgroups",
                "Required MWU",
                "Related FN",
                "Size orientation",
                "Selection source",
            ):
                if f"**{field}" not in block and f"**{field}:**" not in block:
                    if field == "Required MWU" and "**Required MWU" in block:
                        continue
                    if field == "First use level" and "**First level" in block:
                        continue
                    # legacy soft
                    pass

    # A1 Required concept coverage via a1-traceability
    required_a1 = [
        cid
        for cid, meta in concepts.items()
        if meta.get("intro") == "A1" and meta.get("exit") == "Required"
    ]
    linked_required = set()
    for cid in required_a1:
        if re.search(rf"`{re.escape(cid)}`", a1_tr) or re.search(
            rf"\b{re.escape(cid)}\b", a1_tr
        ):
            linked_required.add(cid)
        else:
            v.err(
                "docs/curriculum/a1-traceability.md",
                "A1 Required concept not linked to FN/SCN",
                cid,
            )

    # Supporting explanations must not be identical boilerplate
    supp_reasons = re.findall(
        r"\|\s*`(?:GR|PHON|ORTH|PRAG)-[^`]+`\s*\|\s*[^|]+\|\s*([^|]+)\|",
        a1_tr,
    )
    # better: section Supporting
    if "## Supporting" in a1_tr or "Supporting" in a1_tr:
        supp_block = a1_tr
        reasons = []
        for line in supp_block.splitlines():
            if "Supporting" in line and "`GR-" in line or (
                line.startswith("| `")
                and "Supporting" in a1_tr
                and "индивид" in line.lower()
            ):
                pass
        reason_lines = [
            ln
            for ln in a1_tr.splitlines()
            if ln.startswith("| `")
            and ("Supporting" in ln or "не требуется" in ln.lower() or "не exit" in ln.lower() or "причины" in ln.lower() or "причина" in ln.lower())
        ]
        # parse supporting table if present
        if "### Supporting" in a1_tr or "## Supporting A1" in a1_tr or "Supporting concepts" in a1_tr:
            part = a1_tr.split("Supporting", 1)[1]
            rows = [
                ln for ln in part.splitlines() if ln.startswith("| `") and "---" not in ln
            ]
            texts = []
            for ln in rows:
                cols = [c.strip() for c in ln.strip("|").split("|")]
                if len(cols) >= 3:
                    texts.append(cols[-1])
            if texts:
                c = collections.Counter(texts)
                for text, n in c.items():
                    if n >= 5 and len(text) > 20:
                        v.err(
                            "docs/curriculum/a1-traceability.md",
                            f"identical Supporting reason repeated {n} times",
                        )

    # Traceability legacy A2+ exact FN rows
    for fr in legacy_fns:
        if fr["level"] == "A1":
            continue
        pattern = rf"\|\s*`{re.escape(fr['id'])}`\s*\|"
        if not re.search(pattern, tr_text):
            v.err(
                "curriculum-traceability.md",
                "FN missing as exact table cell",
                fr["id"],
            )
    # A1 canonical FNs must appear in a1-traceability
    for fr in a1_fns:
        if fr["id"] not in a1_tr:
            v.err(
                "docs/curriculum/a1-traceability.md",
                "canonical A1 FN missing from A1 trace",
                fr["id"],
            )

    if "Exit status=Required" not in exit_text and "Exit status" not in exit_text:
        v.err("level-exit-criteria.md", "missing Exit status mastery rules")

    for prefix, lang in (
        ("ERR-UKR-", "UKR"),
        ("ERR-RUS-", "RUS"),
        ("ERR-BEL-", "BEL"),
    ):
        n = len(re.findall(rf"^### ({prefix}\d{{2}})\b", l1_text, re.M))
        if n < 20:
            v.err("l1-error-model.md", f"{lang} has {n} cards, need ≥20")

    exam = (REQ / "07-exam-preparation-requirements.md").read_text(encoding="utf-8")
    if "standard_status" not in exam or "session_availability" not in exam:
        v.err("07-exam-preparation-requirements.md", "status fields missing")

    # A1-only placeholder gates (legacy A2+ registry still has DEFAULT until migration)
    a1_fn_section = fn_text.split("## A2–B2 (LEGACY", 1)[0]
    a1_lex_section = lex_text.split("## Legacy LEX registry", 1)[0]
    for fname, text in (
        ("functional-inventory.md (A1)", a1_fn_section),
        ("lexical-targets.md (A1)", a1_lex_section),
        ("docs/curriculum/a1-traceability.md", a1_tr),
        ("docs/curriculum/scenario-inventory.md", scn_text),
    ):
        for bad in FORBIDDEN_PLACEHOLDERS:
            if bad == "Learner can ":
                if re.search(r"Learner can .+timed scenario", text):
                    v.err(fname, "forbidden Learner can timed-scenario template")
                continue
            if bad in ("TODO", "TBD", "Placeholder — Phase 2") and bad in text:
                v.err(fname, f"forbidden token {bad}")
            if bad == "DEFAULT" and re.search(
                r"\*\*[^*]+:\*\*\s*`?DEFAULT`?\b", text
            ):
                v.err(fname, "DEFAULT used as field value")
            if bad == "сценарийный минимум по связанным FN" and bad in text:
                v.err(fname, f"forbidden placeholder: {bad}")

    for fname, text in (
        ("functional-inventory.md", fn_text),
        ("curriculum-traceability.md", tr_text),
        ("level-exit-criteria.md", exit_text),
        ("grammar-inventory.md", gram),
    ):
        for bad in FORBIDDEN_TEMP_EXACT:
            for _ in re.finditer(
                rf"(?<![A-Z0-9-]){re.escape(bad)}(?![A-Z0-9-])", text
            ):
                v.err(fname, f"unresolved temporary ID {bad}")

    # Phase 2 status: must not mark whole Phase 2 / A2-B2 complete
    status_blob = "\n".join(
        [
            entity_text,
            read(DOC_REP / "phase-2-a1-model-report.md")
            if (DOC_REP / "phase-2-a1-model-report.md").exists()
            else "",
            fn_text[:2500],
        ]
    )
    if re.search(r"A2–B2.*(готовы|заверш|complete|done)", status_blob, re.I):
        if "не" not in status_blob.lower():
            v.warn(
                "phase-2-status",
                "possible claim that A2–B2 are complete — verify wording",
            )

    # distributions
    scn_counts = {fid: len(ss) for fid, ss in fn_to_scn.items()}
    by_scn_n = collections.Counter(scn_counts.values())

    print("=== DISTRIBUTION REPORT (structural + A1 model) ===")
    print(f"GR by Intro: {dict(by_intro)} total={len(grammar_ids)}")
    print(
        "Exit status:",
        dict(
            collections.Counter(
                concepts[c]["exit"] for c in concepts if concepts[c]["exit"]
            )
        ),
    )
    print(
        f"FN total parsed: {len(fns)} "
        f"(canonical A1={len(a1_fns)}, legacy A2–B2={len(legacy_fns)})"
    )
    print(f"SCN A1: {len(scn_ids)}; ASM: {len(asm_ids)}; EXM: {len(exm_ids)}")
    print(f"Criticality: {dict(crit)}")
    print(f"Evidence: {dict(evid)}")
    print(f"Late FN prerequisites: {len(late_fn)}")
    for item in late_fn[:20]:
        print(f"  late {item}")
    print(
        f"A1 Required concepts linked: {len(linked_required)}/{len(required_a1)}"
    )
    print(f"FN without SCN: {fn_without_scn}")
    print(f"SCN without FN: {scn_without_fn}")
    print(f"FN count by number of scenarios: {dict(sorted(by_scn_n.items()))}")
    for fid, n in sorted(scn_counts.items(), key=lambda x: (-x[1], x[0]))[:10]:
        print(f"  {fid}: {n} SCN")
    print("Top normalized A1 completion criteria:")
    for norm, n in norm_counts.most_common(8):
        print(f"  ×{n}: {norm[:100]}")
    weak_lex = []
    for lx, block in a1_bundles.items():
        ok, missing = lex_has_substance(block)
        if not ok:
            weak_lex.append((lx, missing))
    print(f"LEX-A1 without substantive MWU/FIX/COLL: {weak_lex}")
    unique_comp = len([c for c in completions_raw if c])
    unique_norm = len([c for c in norm_counts if c])
    print(
        f"Completion criteria: raw unique={unique_comp}; "
        f"A1 normalized unique={unique_norm}"
    )
    used_lang = {g for fr in fns for g in fr["gr"]}
    uncovered = sorted(set(concepts) - used_lang)
    print(f"Concepts not linked from any FN (all levels): {len(uncovered)}")
    print("=== END DISTRIBUTION ===")
    print()
    print(
        "NOTE: OK means structural / anti-pattern checks only — "
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
        f"FN canon A1={len(a1_fns)}; SCN={len(scn_ids)}; "
        f"Required A1 linked={len(linked_required)}/{len(required_a1)}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
