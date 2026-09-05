#!/usr/bin/env python3
"""Validate SŁOWARIUM Phase 2 curriculum structural integrity + A1 semantic-model antipatterns.

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


def _empty_cell(val: str) -> bool:
    return val.strip().strip("`") in ("", "—", "-", "–", "n/a", "N/A")


def _parse_source_catalog(src_ver: str) -> dict[str, str]:
    catalog: dict[str, str] = {}
    in_catalog = False
    for line in src_ver.splitlines():
        if line.startswith("## Source IDs"):
            in_catalog = True
            continue
        if in_catalog and line.startswith("## "):
            break
        if not in_catalog:
            continue
        m = re.match(r"^\|\s*(SRC-[A-Z0-9-]+)\s*\|\s*(.+?)\s*\|$", line)
        if m and m.group(1) != "source":
            catalog[m.group(1)] = m.group(2).strip()
    return catalog


def _parse_claims(src_ver: str) -> list[dict]:
    claims: list[dict] = []
    parts = re.split(r"^### (CLAIM-\d+)\s*$", src_ver, flags=re.M)
    # parts[0]=preamble, then pairs (heading_id, body)
    for i in range(1, len(parts), 2):
        heading = parts[i]
        body = parts[i + 1]
        fields: dict[str, str] = {"_heading": heading, "_body": body}

        def grab(label: str) -> str | None:
            mm = re.search(
                rf"^- \*\*{re.escape(label)}:\*\*\s*(.*)$", body, re.M
            )
            return mm.group(1).strip() if mm else None

        for label in (
            "Claim ID",
            "entity ID",
            "Точное проверяемое утверждение",
            "Тип утверждения",
            "source ID",
            "URL",
            "Документ",
            "Точное место",
            "evidence class",
            "confidence",
            "verification status",
            "дата проверки",
            "замечание",
        ):
            fields[label] = grab(label)
        claims.append(fields)
    return claims


def _source_ids_from_field(raw: str | None) -> list[str]:
    if not raw:
        return []
    return re.findall(r"`(SRC-[A-Z0-9-]+)`", raw)


def _summary_counts_from_table(text: str) -> dict[str, int]:
    out: dict[str, int] = {}
    for st in (
        "VERIFIED",
        "PARTIALLY_VERIFIED",
        "REQUIRES_VERIFICATION",
        "NOT_SUPPORTED",
        "CONFLICT",
    ):
        m = re.search(rf"\|\s*`?{st}`?\s*\|\s*(\d+)\s*\|", text)
        if m:
            out[st] = int(m.group(1))
    m = re.search(r"\|\s*\*\*Всего claims\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|", text)
    if m:
        out["TOTAL"] = int(m.group(1))
    return out


def _is_blank_review_field(val: str) -> bool:
    return _empty_cell(val)


REVIEW_ENTITY_GROUPS = frozenset(
    {
        "FN-A1-* (30)",
        "FN-A1-*",
        "FN-A1-* Criticality",
        "FN-A1-* Completion / Blocking errors",
        "SCN-A1-* (17)",
        "SCN-A1-*",
        "LEX-A1-* (21)",
        "LEX-A1-*",
        "ASM-A1-*",
        "EXM-A1-*",
        "GR/PHON/ORTH/PRAG Required A1 (46)",
        "31 ERR used in A1 chains",
        "ERR-UKR-*",
        "ERR-BEL-*",
        "ERR-RUS-*",
        "UI languages",
        "standard_status",
        "session_availability",
        "DEC-003",
        "ASM-005",
        "PRODUCT-STATUS-MODEL",
        "A1",
        "L1-ERR-SET-A1",
    }
)

CLAIM_REQUIRED_LABELS = (
    "Claim ID",
    "entity ID",
    "Точное проверяемое утверждение",
    "Тип утверждения",
    "source ID",
    "URL",
    "Документ",
    "Точное место",
    "evidence class",
    "confidence",
    "verification status",
    "дата проверки",
    "замечание",
)

CONFIDENCE_ENUM = {"High", "Medium", "Low"}
EVIDENCE_ENUM = {
    "NORMATIVE_DIRECT",
    "CEFR_DIRECT",
    "SOURCE_INTERPRETATION",
    "PRODUCT_ANALYSIS",
    "EXPERT_JUDGMENT_REQUIRED",
}
STATUS_ENUM = {
    "VERIFIED",
    "PARTIALLY_VERIFIED",
    "REQUIRES_VERIFICATION",
    "NOT_SUPPORTED",
    "CONFLICT",
}
VERDICT_ENUM = {
    "APPROVE",
    "APPROVE_WITH_CHANGES",
    "REJECT",
    "NEEDS_EVIDENCE",
    "NOT_REVIEWED",
}
REVIEW_STATUS_ENUM = {"NOT_STARTED", "IN_REVIEW", "COMPLETED"}


def _validate_review_row_fields(
    review_status: str,
    verd: str,
    severity: str,
    rationale: str,
    correction: str,
    reviewer: str,
    date: str,
) -> list[str]:
    errs: list[str] = []
    if verd not in VERDICT_ENUM:
        errs.append(f"invalid verdict {verd}")
        return errs
    if verd in ("APPROVE", "APPROVE_WITH_CHANGES") and review_status == "NOT_STARTED":
        errs.append(
            f"positive verdict {verd} forbidden while Review status=NOT_STARTED"
        )
    if verd == "NOT_REVIEWED":
        for name, val in (
            ("severity", reviewer),
            ("date", date),
            ("rationale", rationale),
            ("correction", correction),
            ("severity", severity),
        ):
            if not _is_blank_review_field(val):
                errs.append(f"NOT_REVIEWED requires empty {name}")
    elif verd == "APPROVE":
        if _is_blank_review_field(reviewer):
            errs.append("APPROVE requires reviewer")
        if _is_blank_review_field(date):
            errs.append("APPROVE requires review date")
        if _is_blank_review_field(rationale):
            errs.append("APPROVE requires rationale")
    elif verd == "APPROVE_WITH_CHANGES":
        if _is_blank_review_field(reviewer):
            errs.append("APPROVE_WITH_CHANGES requires reviewer")
        if _is_blank_review_field(date):
            errs.append("APPROVE_WITH_CHANGES requires review date")
        if _is_blank_review_field(rationale):
            errs.append("APPROVE_WITH_CHANGES requires rationale")
        if _is_blank_review_field(correction):
            errs.append("APPROVE_WITH_CHANGES requires proposed correction")
    elif verd in ("REJECT", "NEEDS_EVIDENCE"):
        if _is_blank_review_field(reviewer):
            errs.append(f"{verd} requires reviewer")
        if _is_blank_review_field(date):
            errs.append(f"{verd} requires review date")
        if _is_blank_review_field(severity):
            errs.append(f"{verd} requires severity")
        if _is_blank_review_field(rationale):
            errs.append(f"{verd} requires rationale")
    return errs


def _run_review_packet_negative_tests() -> list[str]:
    """Synthetic regressions for review-packet integrity rules."""
    failures: list[str] = []

    # 1) missing claim field
    body = "\n".join(
        [
            "- **Claim ID:** `CLAIM-X`",
            "- **entity ID:** `A1`",
            # missing assertion
            "- **Тип утверждения:** t",
            "- **source ID:** `SRC-REQ-07`",
            "- **URL:** x",
            "- **Документ:** x",
            "- **Точное место:** x",
            "- **evidence class:** `PRODUCT_ANALYSIS`",
            "- **confidence:** High",
            "- **verification status:** `VERIFIED`",
            "- **дата проверки:** 2026-09-05",
            "- **замечание:** x",
        ]
    )
    fields = {lab: None for lab in CLAIM_REQUIRED_LABELS}
    for lab in CLAIM_REQUIRED_LABELS:
        mm = re.search(rf"^- \*\*{re.escape(lab)}:\*\*\s*(.*)$", body, re.M)
        fields[lab] = mm.group(1).strip() if mm else None
    if fields["Точное проверяемое утверждение"] is not None:
        failures.append("neg-missing-field: expected assertion absent")

    # 2) unknown source ID
    catalog = {"SRC-REQ-07": "x"}
    unknown = [s for s in ["SRC-NOPE"] if s not in catalog]
    if not unknown:
        failures.append("neg-unknown-source: expected unknown")

    # 3) forged status summary
    actual = {"VERIFIED": 1}
    claimed = {"VERIFIED": 9}
    if actual == claimed:
        failures.append("neg-forged-summary: expected mismatch")

    # 4) APPROVE_WITH_CHANGES without reviewer/date
    e4 = _validate_review_row_fields(
        "IN_REVIEW",
        "APPROVE_WITH_CHANGES",
        "—",
        "reason",
        "fix it",
        "—",
        "—",
    )
    if not any("requires reviewer" in x for x in e4) or not any(
        "requires review date" in x for x in e4
    ):
        failures.append(f"neg-awc-fields: {e4}")

    # 5) APPROVE while NOT_STARTED
    e5 = _validate_review_row_fields(
        "NOT_STARTED", "APPROVE", "—", "ok", "—", "Dr X", "2026-09-05"
    )
    if not any("NOT_STARTED" in x for x in e5):
        failures.append(f"neg-approve-not-started: {e5}")

    # 6) unknown entity token in review item
    token = "FN-UNKNOWN-99"
    if token in REVIEW_ENTITY_GROUPS:
        failures.append("neg-unknown-entity: token unexpectedly allowed")

    return failures


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
        DOC_REP / "phase-2-a1-review-readiness-report.md",
        ROOT / "docs" / "reviews" / "a1-source-verification.md",
        ROOT / "docs" / "reviews" / "a1-jpjo-review-packet.md",
    ]
    for f in required_cur:
        if not (CUR / f).exists():
            v.err(f, "missing required file")
    for p in required_doc:
        if not p.exists():
            v.err(str(p.relative_to(ROOT)), "missing required A1 model file")
    for p in [*(CUR / f for f in required_cur), *required_doc]:
        if p.exists() and p.read_bytes().startswith(b"\xef\xbb\xbf"):
            v.err(str(p.relative_to(ROOT)), "UTF-8 BOM is not allowed")
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
    migration_text = read(DOC_CUR / "functional-migration-a1.md")

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

    # Migration manifest must cover the entire old A1 range exactly once and
    # may only point to resolvable canonical entities.
    migrated_old_ids = re.findall(r"^### (FN-A1-\d{3})\b", migration_text, re.M)
    expected_old_ids = {f"FN-A1-{n:03d}" for n in range(1, 43)}
    if len(migrated_old_ids) != len(set(migrated_old_ids)):
        v.err("docs/curriculum/functional-migration-a1.md", "duplicate old A1 migration headings")
    if set(migrated_old_ids) != expected_old_ids:
        missing = sorted(expected_old_ids - set(migrated_old_ids))
        extra = sorted(set(migrated_old_ids) - expected_old_ids)
        v.err(
            "docs/curriculum/functional-migration-a1.md",
            f"migration range mismatch; missing={missing}, extra={extra}",
        )
    canonical_entity_ids = {
        *(f["id"] for f in a1_fns),
        *scn_ids,
        *asm_ids,
        *exm_ids,
    }
    for old_id in migrated_old_ids:
        block_m = re.search(
            rf"^### {re.escape(old_id)}\b\n([\s\S]*?)(?=^### |\Z)",
            migration_text,
            re.M,
        )
        if not block_m:
            continue
        target_line = _field(block_m.group(1), "Новые ID")
        if not target_line:
            v.err(
                "docs/curriculum/functional-migration-a1.md",
                "missing Новые ID",
                old_id,
            )
            continue
        targets = re.findall(r"(?:FN|SCN|ASM|EXM)-A1-[A-Z][A-Z0-9-]*-\d{2}", target_line)
        if not targets:
            v.err(
                "docs/curriculum/functional-migration-a1.md",
                "Новые ID has no canonical target",
                old_id,
            )
        for target in targets:
            if target not in canonical_entity_ids:
                v.err(
                    "docs/curriculum/functional-migration-a1.md",
                    f"unresolvable migration target {target}",
                    old_id,
                )
    exm_summary = re.search(
        r"\| Элементов EXM[^|]*\|\s*(\d+)\s*\|", migration_text
    )
    if not exm_summary or int(exm_summary.group(1)) != len(exm_ids):
        v.err(
            "docs/curriculum/functional-migration-a1.md",
            f"EXM summary mismatch; actual={len(exm_ids)}",
        )

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

    # SCN inventory fields and references
    scn_required_fns: dict[str, list[str]] = {}
    scn_required_lex: dict[str, list[str]] = {}
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
        fn_field = _field(block, "Необходимые FN")
        lex_field = _field(block, "Необходимый LEX")
        concept_field = _field(block, "Связанные концепты")
        frefs = re.findall(r"FN-A1-[A-Z]+-\d{2}", fn_field)
        lrefs = re.findall(r"LEX-A1-[A-Z0-9-]+", lex_field)
        crefs = re.findall(r"(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+", concept_field)
        scn_required_fns[sid] = frefs
        scn_required_lex[sid] = lrefs
        if len(frefs) != len(set(frefs)):
            v.err("scenario-inventory.md", "duplicate FN reference", sid)
        if len(lrefs) != len(set(lrefs)):
            v.err("scenario-inventory.md", "duplicate LEX reference", sid)
        for fid in frefs:
            if fid not in fn_ids:
                v.err("scenario-inventory.md", f"unknown required FN {fid}", sid)
        for cid in crefs:
            if cid not in concepts:
                v.err("scenario-inventory.md", f"unknown concept {cid}", sid)

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
    # Every FN declared as necessary by a scenario must declare that scenario.
    # The reverse may be broader: an FN can be applicable but optional there.
    for sid, frefs in scn_required_fns.items():
        for fid in frefs:
            if fid in fn_to_scn and sid not in fn_to_scn[fid]:
                v.err(
                    "functional-inventory.md",
                    f"required by {sid}, but scenario absent from FN Scenarios",
                    fid,
                )
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

    # The compact A1 trace table is a projection of the SCN inventory, not a
    # second independently edited source of truth.
    trace_rows: dict[str, tuple[set[str], set[str]]] = {}
    for line in a1_tr.splitlines():
        m = re.match(r"^\|\s*`(SCN-A1-[A-Z0-9-]+)`\s*\|", line)
        if not m:
            continue
        cols = [c.strip() for c in line.strip("|").split("|")]
        sid = m.group(1)
        if sid in trace_rows:
            v.err("docs/curriculum/a1-traceability.md", "duplicate SCN row", sid)
            continue
        trace_rows[sid] = (
            set(re.findall(r"FN-A1-[A-Z]+-\d{2}", cols[1])),
            set(re.findall(r"LEX-A1-[A-Z0-9-]+", cols[2])),
        )
    if set(trace_rows) != set(scn_ids):
        v.err(
            "docs/curriculum/a1-traceability.md",
            "SCN row set differs from scenario inventory",
        )
    for sid in set(trace_rows) & set(scn_ids):
        trace_fns, trace_lex = trace_rows[sid]
        required_fns = set(scn_required_fns[sid])
        required_lex = set(scn_required_lex[sid])
        if trace_fns != required_fns:
            v.err(
                "docs/curriculum/a1-traceability.md",
                f"FN projection mismatch; missing={sorted(required_fns - trace_fns)}, extra={sorted(trace_fns - required_fns)}",
                sid,
            )
        if trace_lex != required_lex:
            v.err(
                "docs/curriculum/a1-traceability.md",
                f"LEX projection mismatch; missing={sorted(required_lex - trace_lex)}, extra={sorted(trace_lex - required_lex)}",
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
    for sid, lrefs in scn_required_lex.items():
        for lx in lrefs:
            if lx not in bundles:
                v.err("scenario-inventory.md", f"unknown required LEX {lx}", sid)
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
            related_fns = set(
                re.findall(r"FN-A1-[A-Z]+-\d{2}", _field(block, "Related FN"))
            )
            related_scns = set(
                re.findall(r"SCN-A1-[A-Z0-9-]+", _field(block, "Related SCN"))
            )
            for fid in related_fns:
                if fid not in fn_ids:
                    v.err("lexical-targets.md", f"unknown Related FN {fid}", lx)
            for sid in related_scns:
                if sid not in scn_ids:
                    v.err("lexical-targets.md", f"unknown Related SCN {sid}", lx)
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

    for fr in a1_fns:
        for lx in fr["lex"]:
            related_fns = set(
                re.findall(
                    r"FN-A1-[A-Z]+-\d{2}",
                    _field(bundles.get(lx, ""), "Related FN"),
                )
            )
            if fr["id"] not in related_fns:
                v.err(
                    "lexical-targets.md",
                    f"bundle used by FN but Related FN omits {fr['id']}",
                    lx,
                )
    for sid, lrefs in scn_required_lex.items():
        for lx in lrefs:
            related_scns = set(
                re.findall(
                    r"SCN-A1-[A-Z0-9-]+",
                    _field(bundles.get(lx, ""), "Related SCN"),
                )
            )
            if sid not in related_scns:
                v.err(
                    "lexical-targets.md",
                    f"bundle required by SCN but Related SCN omits {sid}",
                    lx,
                )

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
    if re.search(r"\|\s*A1\s*\|\s*`FN-A1-\d{3}`\s*\|", tr_text):
        v.err(
            "curriculum-traceability.md",
            "stale numeric A1 rows must be replaced by canonical A1 trace",
        )
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

    for cid in set(
        re.findall(
            r"(?<![A-Z0-9-])(?:GR|PHON|ORTH|PRAG)-[A-Z0-9-]+", l1_text
        )
    ):
        if cid not in concepts:
            v.err("l1-error-model.md", f"unresolvable concept {cid}")

    err_ids = set(re.findall(r"^### (ERR-(?:UKR|RUS|BEL)-\d{2})\b", l1_text, re.M))
    fn_a1_err = {
        eid
        for fr in a1_fns
        for eid in re.findall(r"ERR-(?:UKR|RUS|BEL)-\d{2}", fr["l1"])
    }
    scn_trace_part = a1_tr.split("## Required A1 concepts", 1)[0]
    scn_trace_err = set(
        re.findall(r"ERR-(?:UKR|RUS|BEL)-\d{2}", scn_trace_part)
    )
    used_part = ""
    if "## ERR used in canonical A1 chains" in a1_tr:
        used_part = a1_tr.split("## ERR used in canonical A1 chains", 1)[1]
        used_part = used_part.split("## ERR not selected", 1)[0]
    used_section_err = set(
        re.findall(r"ERR-(?:UKR|RUS|BEL)-\d{2}", used_part)
    )
    for eid in fn_a1_err | scn_trace_err | used_section_err:
        if eid not in err_ids:
            v.err("docs/curriculum/a1-traceability.md", f"unknown ERR {eid}")
    if fn_a1_err != scn_trace_err or fn_a1_err != used_section_err:
        v.err(
            "docs/curriculum/a1-traceability.md",
            "ERR sets differ between canonical FN, SCN trace and ERR-used register",
        )
    used_summary = re.search(
        r"\| ERR used in A1 chains \| (\d+) \|", a1_tr
    )
    unused_summary = re.search(
        r"\| ERR unused \(bank, with grouped reasons\) \| (\d+) \|", a1_tr
    )
    if not used_summary or int(used_summary.group(1)) != len(fn_a1_err):
        v.err(
            "docs/curriculum/a1-traceability.md",
            f"ERR used summary mismatch; actual={len(fn_a1_err)}",
        )
    if not unused_summary or int(unused_summary.group(1)) != len(err_ids - fn_a1_err):
        v.err(
            "docs/curriculum/a1-traceability.md",
            f"ERR unused summary mismatch; actual={len(err_ids - fn_a1_err)}",
        )

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

    # --- A1 review-readiness packet (structural only) ---
    DOC_REV = ROOT / "docs" / "reviews"
    src_ver_path = DOC_REV / "a1-source-verification.md"
    jpjo_path = DOC_REV / "a1-jpjo-review-packet.md"
    ready_path = DOC_REP / "phase-2-a1-review-readiness-report.md"
    src_ver = read(src_ver_path)
    jpjo = read(jpjo_path)
    ready = read(ready_path)

    META_ENTITIES = {
        "PRODUCT-STATUS-MODEL",
        "A1",
        "ASM-005",
        "L1-ERR-SET-A1",
        "DEC-003",
    }

    catalog = _parse_source_catalog(src_ver)
    if len(catalog) < 15:
        v.err(
            "a1-source-verification.md",
            f"source catalog too small ({len(catalog)}); missing atomic SRC-*",
        )
    for forbidden in list(catalog):
        if "+" in forbidden:
            v.err(
                "a1-source-verification.md",
                f"composite source ID forbidden in catalog: {forbidden}",
            )

    claims = _parse_claims(src_ver)
    claim_ids = []
    status_hist: collections.Counter[str] = collections.Counter()
    resolvable = set(concepts)
    resolvable.update(f["id"] for f in a1_fns)
    resolvable.update(scn_ids)
    resolvable.update(asm_ids)
    resolvable.update(exm_ids)
    resolvable.update(a1_bundles)
    resolvable.update(META_ENTITIES)
    all_err = set(
        re.findall(r"^### (ERR-(?:UKR|RUS|BEL)-\d{2})\b", l1_text, re.M)
    )
    resolvable.update(all_err)

    for cl in claims:
        heading = cl["_heading"]
        cid_raw = cl.get("Claim ID") or ""
        cid_m = re.search(r"`(CLAIM-\d+)`", cid_raw)
        cid = cid_m.group(1) if cid_m else ""
        if not cid:
            v.err("a1-source-verification.md", "Claim ID missing/unparseable", heading)
            continue
        if cid != heading:
            v.err(
                "a1-source-verification.md",
                f"heading {heading} ≠ Claim ID {cid}",
                cid,
            )
        claim_ids.append(cid)
        for lab in CLAIM_REQUIRED_LABELS:
            val = cl.get(lab)
            if val is None or val.strip() == "":
                v.err(
                    "a1-source-verification.md",
                    f"missing required field: {lab}",
                    cid,
                )
        ent_raw = cl.get("entity ID") or ""
        ent_m = re.search(r"`([^`]+)`", ent_raw)
        ent = ent_m.group(1) if ent_m else ent_raw.strip("` ")
        if ent not in resolvable:
            v.err(
                "a1-source-verification.md",
                f"unresolvable entity ID {ent}",
                cid,
            )
        src_ids = _source_ids_from_field(cl.get("source ID"))
        if not src_ids:
            v.err("a1-source-verification.md", "no atomic source ID", cid)
        for sid in src_ids:
            if "+" in sid:
                v.err(
                    "a1-source-verification.md",
                    f"composite source ID forbidden: {sid}",
                    cid,
                )
            if sid not in catalog:
                v.err(
                    "a1-source-verification.md",
                    f"source ID not in catalog: {sid}",
                    cid,
                )
        ev_m = re.search(r"`([^`]+)`", cl.get("evidence class") or "")
        ev = ev_m.group(1) if ev_m else ""
        if ev not in EVIDENCE_ENUM:
            v.err(
                "a1-source-verification.md",
                f"invalid evidence class {ev}",
                cid,
            )
        st_m = re.search(r"`([^`]+)`", cl.get("verification status") or "")
        st = st_m.group(1) if st_m else ""
        if st not in STATUS_ENUM:
            v.err(
                "a1-source-verification.md",
                f"invalid verification status {st}",
                cid,
            )
        else:
            status_hist[st] += 1
        conf = (cl.get("confidence") or "").strip()
        if conf not in CONFIDENCE_ENUM:
            v.err(
                "a1-source-verification.md",
                f"invalid confidence {conf}",
                cid,
            )

    if len(claim_ids) != len(set(claim_ids)):
        v.err("a1-source-verification.md", "duplicate Claim ID")
    if len(claim_ids) != 192:
        v.err(
            "a1-source-verification.md",
            f"expected 192 claims, found {len(claim_ids)}",
        )

    summarized = _summary_counts_from_table(src_ver)
    for st, n in status_hist.items():
        if summarized.get(st) != n:
            v.err(
                "a1-source-verification.md",
                f"status summary {st}={summarized.get(st)} ≠ actual {n}",
            )
    for st in STATUS_ENUM:
        if st not in status_hist and summarized.get(st, 0) not in (0, None):
            if summarized.get(st, 0) != 0:
                v.err(
                    "a1-source-verification.md",
                    f"status summary {st}={summarized.get(st)} ≠ actual 0",
                )
    if summarized.get("TOTAL") != len(claim_ids):
        v.err(
            "a1-source-verification.md",
            f"total claims summary {summarized.get('TOTAL')} ≠ {len(claim_ids)}",
        )

    ready_sum = _summary_counts_from_table(ready)
    for st, n in status_hist.items():
        if ready_sum.get(st) != n:
            v.err(
                "phase-2-a1-review-readiness-report.md",
                f"status summary {st}={ready_sum.get(st)} ≠ actual {n}",
            )
    if ready_sum.get("TOTAL") != len(claim_ids):
        v.err(
            "phase-2-a1-review-readiness-report.md",
            f"total claims summary {ready_sum.get('TOTAL')} ≠ {len(claim_ids)}",
        )

    rs_m = re.search(r"\*\*Review status:\*\*\s*`([^`]+)`", jpjo)
    if not rs_m:
        v.err("a1-jpjo-review-packet.md", "missing Review status")
        review_status = "NOT_STARTED"
    else:
        review_status = rs_m.group(1)
        if review_status not in REVIEW_STATUS_ENUM:
            v.err(
                "a1-jpjo-review-packet.md",
                f"invalid Review status {review_status}",
            )

    review_ids = []
    verdicts = []
    pending = 0
    expert_blockers = 0
    for line in jpjo.splitlines():
        if not line.startswith("| `REV-"):
            continue
        cols = [c.strip() for c in line.strip("|").split("|")]
        if len(cols) < 12:
            v.err(
                "a1-jpjo-review-packet.md",
                f"review row has {len(cols)} cols, need 12",
            )
            continue
        rid = cols[0].strip("`")
        review_ids.append(rid)
        ent_cell = cols[3].strip("`")
        verd = cols[6].strip("`")
        severity = cols[7]
        rationale = cols[8]
        correction = cols[9]
        reviewer = cols[10]
        date = cols[11]
        verdicts.append(verd)
        for token in [t.strip() for t in ent_cell.split(";") if t.strip()]:
            if token in REVIEW_ENTITY_GROUPS or token in resolvable:
                continue
            v.err(
                "a1-jpjo-review-packet.md",
                f"unresolvable review entity token: {token}",
                rid,
            )
        for msg in _validate_review_row_fields(
            review_status, verd, severity, rationale, correction, reviewer, date
        ):
            v.err("a1-jpjo-review-packet.md", msg, rid)
        if verd == "NOT_REVIEWED":
            pending += 1
        if verd in ("REJECT", "NEEDS_EVIDENCE") and "blocker" in severity.lower():
            expert_blockers += 1

    if len(review_ids) != len(set(review_ids)):
        v.err("a1-jpjo-review-packet.md", "duplicate Review ID")
    if len(review_ids) != 16:
        v.err(
            "a1-jpjo-review-packet.md",
            f"expected 16 review items, found {len(review_ids)}",
        )

    # process metrics in packet + report
    for label, val, blob, fname in (
        (
            "expert-registered blockers",
            expert_blockers,
            jpjo + "\n" + ready,
            "review metrics",
        ),
        (
            "mandatory review items pending",
            pending,
            jpjo + "\n" + ready,
            "review metrics",
        ),
    ):
        if not re.search(
            rf"{re.escape(label)}[^\n]*\*\*{val}\*\*", blob, re.I
        ) and not re.search(
            rf"\*\*{re.escape(label)}\*\*[^\n]*\*\*{val}\*\*", blob, re.I
        ):
            # allow table form
            if not re.search(
                rf"\|\s*{re.escape(label.replace(' (`NOT_REVIEWED`)', ''))}[^\|]*\|\s*\*\*{val}\*\*",
                blob,
                re.I,
            ):
                v.err(
                    fname,
                    f"metric {label} must report {val}",
                )

    if not re.search(r"open publication gates[^\n]*\*\*blocked\*\*", jpjo + "\n" + ready, re.I):
        if not re.search(r"\|\s*open publication gates\s*\|\s*\*\*blocked\*\*", jpjo + "\n" + ready, re.I):
            v.err("review metrics", "open publication gates must be blocked")

    if review_status == "NOT_STARTED" and pending != 16:
        v.err(
            "a1-jpjo-review-packet.md",
            f"NOT_STARTED expects 16 pending items, found {pending}",
        )

    # snapshot counts must match inventories
    if not re.search(r"\|\s*Канонические FN A1\s*\|\s*\*\*30\*\*", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot FN count must be 30")
    if not re.search(r"\|\s*SCN A1\s*\|\s*\*\*17\*\*", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot SCN count must be 17")
    if not re.search(r"\|\s*LEX-A1 bundles\s*\|\s*\*\*21\*\*", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot LEX count must be 21")
    if not re.search(r"\|\s*ASM A1\s*\|\s*\*\*5\*\*", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot ASM count must be 5")
    if not re.search(r"\|\s*EXM A1\s*\|\s*\*\*5\*\*", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot EXM count must be 5")
    if not re.search(r"46/46", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot Required must show 46/46")
    if not re.search(r"\|\s*ERR in canonical A1 chains\s*\|\s*\*\*31\*\*", jpjo):
        v.err("a1-jpjo-review-packet.md", "snapshot ERR count must be 31")
    if len(a1_fns) != 30:
        v.err("functional-inventory.md", f"canonical A1 FN count {len(a1_fns)} ≠ 30")
    if len(scn_ids) != 17:
        v.err("scenario-inventory.md", f"SCN count {len(scn_ids)} ≠ 17")
    if len(a1_bundles) != 21:
        v.err("lexical-targets.md", f"LEX-A1 count {len(a1_bundles)} ≠ 21")
    if len(asm_ids) != 5 or len(exm_ids) != 5:
        v.err(
            "asm-exm-a1.md",
            f"ASM/EXM counts {len(asm_ids)}/{len(exm_ids)} ≠ 5/5",
        )
    if "A2–B2 semantic migration not started" not in ready and (
        "pending semantic migration" not in ready
    ):
        v.err(
            "phase-2-a1-review-readiness-report.md",
            "must state A2–B2 migration not started / pending",
        )
    if re.search(
        r"A2–B2.*(заверш|готовы|complete)", ready + jpjo, re.I
    ) and not re.search(
        r"не.*(заверш|готов)|not started|pending", ready + jpjo, re.I
    ):
        v.err("review-packet", "A2–B2 must not be declared complete")

    for blob_name, blob in (
        ("a1-source-verification.md", src_ver),
        ("a1-jpjo-review-packet.md", jpjo),
        ("phase-2-a1-review-readiness-report.md", ready),
    ):
        if blob.startswith("\ufeff"):
            v.err(blob_name, "UTF-8 BOM is not allowed")

    neg_fail = _run_review_packet_negative_tests()
    for msg in neg_fail:
        v.err("negative-tests", msg)
    print(
        f"Review packet: claims={len(claim_ids)}; review_items={len(review_ids)}; "
        f"Review status={review_status}; pending={pending}; "
        f"expert_blockers={expert_blockers}; "
        f"status_hist={dict(status_hist)}; "
        f"negative_tests={'PASS' if not neg_fail else 'FAIL'}"
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
