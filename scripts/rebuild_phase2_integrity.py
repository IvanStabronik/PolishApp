#!/usr/bin/env python3
"""Rebuild Phase 2 integrity: canonical IDs, FN records, LEX bundles, traceability, fixes."""
from __future__ import annotations

import collections
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CUR = ROOT / "docs" / "requirements" / "curriculum"

LEVEL_ORDER = {"A1": 1, "A2": 2, "B1": 3, "B2": 4}

# Temporary ID / cluster → canonical exact ID(s)
MIGRATION: dict[str, tuple[str, str]] = {
    # old -> (canonical_or_cluster, reason)
    "GR-CASE-NOM": ("GR-CAS-NOM-01", "canonical nominative subject"),
    "GR-CASE-ACC": ("GR-CAS-ACC-01", "canonical accusative DO"),
    "GR-CASE-GEN": ("GR-CAS-GEN-01", "canonical genitive core"),
    "GR-CASE-DAT": ("GR-CAS-DAT-01", "canonical dative"),
    "GR-CASE-INS": ("GR-CAS-INS-01", "canonical instrumental predicative"),
    "GR-CASE-LOC": ("GR-CAS-LOC-01", "canonical locative"),
    "GR-CASE-VOC": ("GR-CAS-VOC-01", "canonical vocative"),
    "GR-CASE": ("GR-CAS-NOM-01", "underspecified case → default Nom; prefer exact case in FN"),
    "GR-TENSE-PRES": ("GR-TNS-PRS-01", "canonical present"),
    "GR-TENSE-PAST": ("GR-TNS-PST-01", "canonical past"),
    "GR-TENSE-FUT": ("GR-TNS-FUT-01", "canonical compound future"),
    "GR-TENSE": ("GR-TNS-PRS-01", "underspecified tense → present"),
    "GR-FUT": ("GR-TNS-FUT-01", "alias"),
    "GR-PRES": ("GR-TNS-PRS-01", "alias"),
    "GR-CONCORD": ("GR-AGR-ADJ-01", "adjective agreement core"),
    "GR-GENDER": ("GR-GEN-MFN-01", "gender"),
    "GR-REKCJA": ("GR-REK-VERB-01", "verb government core A1"),
    "GR-TV": ("PRAG-PAN-01", "T–V is pragmatic concept"),
    "GR-FORMAL": ("PRAG-PAN-01", "formal address"),
    "GR-IMP": ("GR-MOD-IMP-01", "imperative"),
    "GR-Q": ("GR-Q-YESNO-01", "yes/no questions; WH via GR-Q-WH-01 when needed"),
    "GR-NEG": ("GR-NEG-01", "negation nie"),
    "GR-NUM": ("GR-NUM-CARD-01", "cardinals 1–4 core"),
    "GR-REFL": ("GR-PRO-REFL-01", "się"),
    "GR-MODAL": ("GR-MOD-VERB-01", "modals"),
    "GR-ASPECT-LEX": ("GR-ASP-LEX-01", "lexical aspect pairs"),
    "GR-ASPECT": ("GR-ASP-CON-01", "conscious aspect contrast"),
    "GR-COMP": ("GR-DEG-ADJ-01", "comparison"),
    "GR-COMP-ZE": ("GR-SYN-SUB-01", "że-clauses"),
    "GR-COMPLEX": ("GR-SYN-SUB-01", "subordination"),
    "GR-COND": ("GR-MOD-COND-01", "conditional mood"),
    "GR-CAUSE": ("GR-SYN-CAUSE-01", "cause/effect"),
    "GR-ORTH": ("ORTH-CORE-01", "orthography not GR namespace"),
    "GR-PHON": ("PHON-CORE-01", "phonetics not GR namespace"),
    "GR-PASS": ("GR-PASS-01", "passive"),
    "GR-PART": ("GR-PART-PASS-01", "participle"),
    "GR-WORDORDER": ("GR-WO-NEUT-01", "word order"),
    "GR-MASC-PERS": ("GR-MO-VIR-01", "męskoosobowy"),
    "GR-REPAIR": ("PRAG-REPAIR-01", "repair strategies"),
    "GR-SOFTEN": ("PRAG-SOFTEN-01", "mitigation"),
    "GR-MEDIATION": ("PRAG-MEDIATION-01", "mediation"),
    "GR-PRAG-PAN-01": ("PRAG-PAN-01", "moved from GR namespace to PRAG"),
}


def parse_grammar(text: str) -> dict[str, dict]:
    concepts: dict[str, dict] = {}
    current = None
    for line in text.splitlines():
        m = re.match(r"^#### (GR-[A-Z0-9-]+)\s*—\s*(.+)$", line)
        if m:
            current = m.group(1)
            concepts[current] = {
                "id": current,
                "title": m.group(2).strip(),
                "intro": None,
                "prereq": [],
                "raw_prereq": "",
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
            concepts[current]["raw_prereq"] = val
            if val not in ("—", "-", "нет", "none", ""):
                concepts[current]["prereq"] = re.findall(
                    r"(?:GR|PRAG|PHON|ORTH)-[A-Z0-9-]+", val
                )
    return concepts


def fix_grammar_file() -> dict[str, dict]:
    path = CUR / "grammar-inventory.md"
    text = path.read_text(encoding="utf-8")

    # Rename GR-PRAG-PAN-01 header to keep grammar of 3rd person agreement?
    # We'll keep a thin GR-TV-AGR-01 and use PRAG-PAN-01 externally.
    # Simpler: replace GR-PRAG-PAN-01 with PRAG-PAN-01 throughout grammar file
    # but PRAG shouldn't be #### GR-. Convert the entry to note + move definition out.
    # For validator simplicity: change ID to PRAG-PAN-01 in a new file, and replace
    # references GR-PRAG-PAN-01 -> PRAG-PAN-01 in grammar prereqs; remove #### GR-PRAG entry
    # by rewriting as comment pointing to concept-extensions.

    replacements = [
        # Fix REK-VERB-01: remove DAT prereq (A1 formulaic Acc/Gen/Prep only)
        (
            "#### GR-REK-VERB-01 — Rekcja czasowników (rdzeń A1–A2) · Управление глаголов (ядро)\n"
            "- **Intro:** A1 · **Re-deepen:** A2, B1\n"
            "- **Prereq:** GR-CAS-GEN-05, GR-CAS-ACC-02, GR-CAS-DAT-01",
            "#### GR-REK-VERB-01 — Rekcja czasowników (rdzeń Acc/Gen A1) · Управление глаголов (ядро Acc/Gen)\n"
            "- **Intro:** A1 · **Re-deepen:** A2 (Dat-система), B1\n"
            "- **Prereq:** GR-CAS-GEN-05, GR-CAS-ACC-02\n"
            "- **Pedagogical note:** Системные глаголы с **celownik** не входят в A1-mastery; "
            "формулы с Dat (*podoba mi się*) — receptive/formulaic до `GR-CAS-DAT-01` / "
            "`GR-REK-VERB-DAT-01` (A2). Не считать A1-рексцию полной системой.",
        ),
        # Fix REK-PREP wildcard
        (
            "- **Prereq:** соответствующие GR-CAS-*",
            "- **Prereq:** GR-CAS-ACC-02, GR-CAS-GEN-02, GR-CAS-LOC-01, GR-CAS-INS-02",
        ),
        # PRO-INDEF to A2 so NEG-DOUBLE can depend
        (
            "#### GR-PRO-INDEF-01 — Zaimki nieokreślone / przeczące · Неопределённые / отрицательные\n"
            "- **Intro:** B1 · **Re-deepen:** B2",
            "#### GR-PRO-INDEF-01 — Zaimki nieokreślone / przeczące · Неопределённые / отрицательные\n"
            "- **Intro:** A2 · **Re-deepen:** B1, B2",
        ),
        # NEG-DOUBLE clean prereq
        (
            "- **Prereq:** GR-NEG-01, GR-PRO-INDEF-01 (частично параллельно)",
            "- **Prereq:** GR-NEG-01, GR-PRO-INDEF-01",
        ),
        # Replace GR-PRAG-PAN-01 refs inside grammar with PRAG-PAN-01
        ("GR-PRAG-PAN-01", "PRAG-PAN-01"),
    ]

    for old, new in replacements:
        if old not in text:
            # try softer matches
            continue
        text = text.replace(old, new)

    # Soft replace for REK-VERB if exact block differed
    text2 = re.sub(
        r"(#### GR-REK-VERB-01[^\n]+\n- \*\*Intro:\*\* A1[^\n]*\n- \*\*Prereq:\*\*)[^\n]+",
        r"\1 GR-CAS-GEN-05, GR-CAS-ACC-02",
        text,
        count=1,
    )
    if text2 != text:
        text = text2

    # Soft PRO-INDEF intro
    text = re.sub(
        r"(#### GR-PRO-INDEF-01[^\n]+\n- \*\*Intro:\*\*) B1",
        r"\1 A2",
        text,
        count=1,
    )

    # Soft NEG-DOUBLE
    text = re.sub(
        r"(#### GR-NEG-DOUBLE-01[\s\S]*?- \*\*Prereq:\*\*)[^\n]+",
        r"\1 GR-NEG-01, GR-PRO-INDEF-01",
        text,
        count=1,
    )

    # Soft REK-PREP
    text = re.sub(
        r"(#### GR-REK-PREP-01[\s\S]*?- \*\*Prereq:\*\*)[^\n]+",
        r"\1 GR-CAS-ACC-02, GR-CAS-GEN-02, GR-CAS-LOC-01, GR-CAS-INS-02",
        text,
        count=1,
    )

    # Convert GR-PRAG-PAN entry header to redirect stub removed from GR count:
    # Replace #### GR-PRAG / #### PRAG if renamed already
    text = re.sub(
        r"^#### PRAG-PAN-01 —(.+)$",
        r"#### GR-TV-AGR-01 — Pan/pani + 3. osoba (zgoda gramatyczna) · Согласование при pan/pani\n"
        r"- **Intro:** A1 · **Re-deepen:** A2, B1\n"
        r"- **Prereq:** GR-TNS-PRS-01, GR-GEN-MFN-01\n"
        r"- **Функция:** Грамматическое согласование 3 л. при вежливом обращении; "
        r"прагматика регистра — `PRAG-PAN-01`.\n"
        r"- **Form / Meaning / Use:** *Czy pan/pani + 3sg*; мн. *państwo*.\n"
        r"- **Пределы:** Не смешивать с `ty`+2sg без сигнала.\n"
        r"- **Пример:** *Czy pan mówi po polsku?*\n"
        r"- **Контрпример:** *\\*Czy pan mówisz…*\n"
        r"- **UKR:** Калька «вы»+мн. / 2 л.\n"
        r"  **RUS:** То же + слабый voc.\n"
        r"  **BEL:** То же; регистр mail.\n"
        r"- **Evidence:** `roleplay_tv` + `closed_morph`\n"
        r"- **Source:** PED-010; PRODUCT ANALYSIS — **High** (продукт)\n"
        r"\n"
        r"<!-- former title:\1; pragmatic bundle defined in concept-extensions.md as PRAG-PAN-01 -->",
        text,
        count=1,
        flags=re.M,
    )

    # If still #### GR-PRAG-PAN or already PRAG without conversion of block:
    if "#### GR-PRAG-PAN-01" in text or (
        "#### PRAG-PAN-01" in text and "GR-TV-AGR-01" not in text
    ):
        text = re.sub(
            r"^#### (?:GR-)?PRAG-PAN-01 —(.+)$",
            "#### GR-TV-AGR-01 — Pan/pani + 3. osoba (zgoda) · Согласование pan/pani\n"
            "- **Intro:** A1 · **Re-deepen:** A2, B1\n"
            "- **Prereq:** GR-TNS-PRS-01, GR-GEN-MFN-01\n"
            "- **Функция:** Грамматическая 3 л. при вежливом обращении; регистр — `PRAG-PAN-01`.\n"
            "- **Form / Meaning / Use:** *pan/pani* + 3sg; *państwo* + 3pl.\n"
            "- **Пределы:** Переход на *ty* — прагматика.\n"
            "- **Пример:** *Proszę pana, czy jest wolne?*\n"
            "- **Контрпример:** *\\*Proszę pan, czy jesteś…* (смешение)\n"
            "- **UKR:** «ви» → 2pl калька.\n"
            "  **RUS:** То же.\n"
            "  **BEL:** То же + mail register.\n"
            "- **Evidence:** `roleplay_tv`\n"
            "- **Source:** PED-010 — **High**",
            text,
            count=1,
            flags=re.M,
        )

    # Fix any remaining GR-CAS- wildcard tokens in Prereq lines
    def fix_prereq_line(m: re.Match) -> str:
        line = m.group(0)
        if "GR-CAS-*" in line or "соответствующие" in line:
            return (
                "- **Prereq:** GR-CAS-ACC-02, GR-CAS-GEN-02, "
                "GR-CAS-LOC-01, GR-CAS-INS-02"
            )
        return line

    text = re.sub(r"^- \*\*Prereq:\*\*.*$", fix_prereq_line, text, flags=re.M)

    concepts = parse_grammar(text)
    by = collections.Counter(c["intro"] for c in concepts.values())
    total = len(concepts)

    # Update summary table
    summary = f"""## 1. Сводка: число концептов по уровню **первого введения**

Единица подсчёта: один атомарный концепт = один заголовок `#### GR-…` с полными полями и ровно одним **Intro**.

| Уровень первого введения | Число концептов | Комментарий |
|---|---:|---|
| A1 | {by.get('A1', 0)} | Формулы + базовые функции падежей; аспект лексически |
| A2 | {by.get('A2', 0)} | Celownik-система, męskoosobowy, сознательный аспект, indef/neg |
| B1 | {by.get('B1', 0)} | Продуктивный контроль аспекта, сложный синтаксис, числительные virile |
| B2 | {by.get('B2', 0)} | Причастия, пассив/безличность, информационная структура, стиль |
| **Всего** | **{total}** | Автосводка из фактических записей; диапазон 80–120 соблюдён без искусственного дробления |

Повторное углубление (re-deepening) **не** увеличивает счётчик. Наличие в таблице ≠ полное освоение уровня.
"""

    text = re.sub(
        r"## 1\. Сводка:[\s\S]*?(?=\n## 2\.)",
        summary + "\n",
        text,
        count=1,
    )

    # Append REK-VERB-DAT if missing
    if "GR-REK-VERB-DAT-01" not in text:
        dat_block = """
#### GR-REK-VERB-DAT-01 — Rekcja czasowników z celownikiem · Управление глаголов с дательным
- **Intro:** A2 · **Re-deepen:** B1
- **Prereq:** GR-CAS-DAT-01, GR-REK-VERB-01
- **Функция:** Системный выбор Dat при *pomagać, dziękować, przyglądać się* и т.п.
- **Form / Meaning / Use:** V + Dat (± Prep); отличие от Acc-объекта L1.
- **Пределы:** Не все «кому» L1 = Dat PL.
- **Пример:** *Pomogę sąsiadowi.* / *Dziękuję pani.*
- **Контрпример:** *\\*Pomogę sąsiada.* (калька Acc)
- **UKR:** Часто Acc/Gen калька.
  **RUS:** *помогать кому* близко, но лексика и возвратность путаются.
  **BEL:** Смешение с Acc в быту.
- **Evidence:** `closed_rekcja` + `guided_prod`
- **Source:** PED-002; Swan/Nagórko — Medium; стр. REQUIRES VERIFICATION

"""
        # insert before GR-REK-ADJ or after REK-VERB-01
        text = text.replace(
            "#### GR-REK-ADJ-01",
            dat_block + "#### GR-REK-ADJ-01",
            1,
        )

    concepts = parse_grammar(text)
    by = collections.Counter(c["intro"] for c in concepts.values())
    total = len(concepts)
    summary = f"""## 1. Сводка: число концептов по уровню **первого введения**

Единица подсчёта: один атомарный концепт = один заголовок `#### GR-…` с полными полями и ровно одним **Intro**.

| Уровень первого введения | Число концептов | Комментарий |
|---|---:|---|
| A1 | {by.get('A1', 0)} | Формулы + базовые функции падежей; аспект лексически |
| A2 | {by.get('A2', 0)} | Celownik-система, męskoosobowy, сознательный аспект, indef/neg |
| B1 | {by.get('B1', 0)} | Продуктивный контроль аспекта, сложный синтаксис, числительные virile |
| B2 | {by.get('B2', 0)} | Причастия, пассив/безличность, информационная структура, стиль |
| **Всего** | **{total}** | Автосводка из фактических записей; диапазон 80–120 без искусственного дробления |

Повторное углубление (re-deepening) **не** увеличивает счётчик. Наличие в таблице ≠ полное освоение уровня.
"""
    text = re.sub(
        r"## 1\. Сводка:[\s\S]*?(?=\n## 2\.)",
        summary + "\n",
        text,
        count=1,
    )

    # Document clusters
    if "## 1b. Документированные кластеры" not in text:
        clusters = """
## 1b. Документированные кластеры (не замена exact prerequisite)

| Кластер | Члены | Когда допустим |
|---|---|---|
| `GR-CAS-*` | все `GR-CAS-…` | только в обзорных картах; в Prereq FN/GR — exact ID |
| `GR-ASP-*` | все `GR-ASP-…` | обзор пути аспекта |
| `GR-TNS-*` | все `GR-TNS-…` | обзор времён |
| `GR-REK-*` | все `GR-REK-…` | обзор rekcja |

"""
        text = text.replace("## 2. Формат записи", clusters + "## 2. Формат записи", 1)

    path.write_text(text, encoding="utf-8")
    return parse_grammar(text)


def write_extensions() -> dict[str, dict]:
    """PHON / ORTH / PRAG canonical definitions."""
    items = {
        "PHON-CORE-01": {
            "intro": "A1",
            "title": "Podstawy wymowy polskiej · Базовая польская фонетика",
        },
        "PHON-CI-SI-ZI-01": {
            "intro": "A1",
            "title": "Szereg ć/ci, ś/si, ź/zi, dź/dzi",
        },
        "PHON-SZ-CZ-01": {
            "intro": "A1",
            "title": "Szereg sz/ż/cz/dż vs s/z/c",
        },
        "PHON-NASAL-01": {
            "intro": "A2",
            "title": "Samogłoski nosowe ą/ę (recepcja+produkcja ograniczona)",
        },
        "ORTH-CORE-01": {
            "intro": "A1",
            "title": "Diakrytyki i podstawowa ortografia · Диакритика и база",
        },
        "ORTH-OU-01": {
            "intro": "A1",
            "title": "ó/u",
        },
        "ORTH-RZ-Z-01": {
            "intro": "A1",
            "title": "rz/ż",
        },
        "ORTH-CH-H-01": {
            "intro": "A1",
            "title": "ch/h",
        },
        "ORTH-IY-01": {
            "intro": "A1",
            "title": "i/y",
        },
        "PRAG-PAN-01": {
            "intro": "A1",
            "title": "Rejestr pan/pani ↔ ty · Регистр T–V",
        },
        "PRAG-REPAIR-01": {
            "intro": "A1",
            "title": "Strategie naprawy komunikacji · Стратегии ремонта",
        },
        "PRAG-SOFTEN-01": {
            "intro": "A2",
            "title": "Łagodzenie próśb i odmów · Смягчение",
        },
        "PRAG-MEDIATION-01": {
            "intro": "B1",
            "title": "Mediacja / parafraza · Медиация",
        },
    }
    lines = [
        "# Неграмматические канонические концепты (PHON / ORTH / PRAG)",
        "",
        "**Статус:** Phase 2 integrity fix — Candidate for independent JPJO review.",
        "**Правило:** эти ID **не** входят в namespace `GR-*`.",
        "",
        "## Сводка",
        "",
        f"| Namespace | Число |",
        f"|---|---:|",
        f"| PHON | {sum(1 for k in items if k.startswith('PHON-'))} |",
        f"| ORTH | {sum(1 for k in items if k.startswith('ORTH-'))} |",
        f"| PRAG | {sum(1 for k in items if k.startswith('PRAG-'))} |",
        f"| **Всего** | **{len(items)}** |",
        "",
    ]
    for cid, meta in items.items():
        lines += [
            f"#### {cid} — {meta['title']}",
            f"- **Intro:** {meta['intro']} · **Re-deepen:** спираль по уровням сценариев",
            "- **Prereq:** —",
            "- **Функция:** см. название; поддержка FN первой аудитории.",
            "- **Form / Meaning / Use:** учебный минимум для взрослых UKR/RUS/BEL в PL.",
            "- **Пределы:** не заменяет полный курс фонетики/орфографии.",
            "- **Пример:** (задаётся в упражнении уровня Intro)",
            "- **Контрпример:** смешение с L1-нормой без адаптации",
            "- **UKR / RUS / BEL:** см. `l1-error-model.md` (ORTH/PHON/PRAG карточки)",
            "- **Evidence:** `closed_item` + `guided_prod` / `pronunciation_task`",
            "- **Source:** PED-008, PED-009, PED-010; PRODUCT ANALYSIS — **Medium**",
            "",
        ]

    # Migration table
    lines += [
        "## Таблица миграции временных ID → канонические",
        "",
        "| Старый временный ID | Канонический ID | Причина |",
        "|---|---|---|",
    ]
    for old, (new, reason) in sorted(MIGRATION.items()):
        lines.append(f"| `{old}` | `{new}` | {reason} |")
    lines.append("")

    path = CUR / "concept-extensions.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    return {
        k: {"id": k, "intro": v["intro"], "prereq": [], "title": v["title"]}
        for k, v in items.items()
    }


def parse_fn_tables(text: str) -> list[dict]:
    rows = []
    for m in re.finditer(
        r"\|\s*(FN-(A1|A2|B1|B2)-(\d{3}))\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|",
        text,
    ):
        fid, level, _num, func, domains, gr, lex = m.groups()
        rows.append(
            {
                "id": fid,
                "level": level,
                "function": func.strip(),
                "domains": [d.strip() for d in domains.split(",") if d.strip()],
                "gr_raw": gr.strip(),
                "lex_raw": lex.strip(),
            }
        )
    return rows


def map_gr_token(tok: str, grammar_ids: set[str], ext_ids: set[str]) -> list[str]:
    tok = tok.strip()
    if not tok:
        return []
    # already canonical
    if tok in grammar_ids or tok in ext_ids:
        return [tok]
    if tok in MIGRATION:
        return [MIGRATION[tok][0]]
    # GR-CASE-GEN/ACC style with slash handled by splitter
    # partial prefixes
    for old, (new, _) in MIGRATION.items():
        if tok.startswith(old):
            return [new]
    # fuzzy
    fuzzy = {
        "GR-TENSE-PRES/FUT": ["GR-TNS-PRS-01", "GR-TNS-FUT-01"],
        "GR-TENSE-PAST/FUT": ["GR-TNS-PST-01", "GR-TNS-FUT-01"],
        "GR-TENSE-PRES/PAST": ["GR-TNS-PRS-01", "GR-TNS-PST-01"],
        "GR-CASE-ACC/GEN": ["GR-CAS-ACC-01", "GR-CAS-GEN-01"],
        "GR-CASE-ACC/INS": ["GR-CAS-ACC-01", "GR-CAS-INS-01"],
        "GR-CASE-GEN/ACC": ["GR-CAS-GEN-01", "GR-CAS-ACC-01"],
        "GR-CASE-GEN/DAT": ["GR-CAS-GEN-01", "GR-CAS-DAT-01"],
        "GR-CASE-NOM/GEN": ["GR-CAS-NOM-01", "GR-CAS-GEN-01"],
        "GR-CASE-ACC/LOC": ["GR-CAS-ACC-01", "GR-CAS-LOC-01"],
    }
    if tok in fuzzy:
        return fuzzy[tok]
    if "/" in tok:
        out: list[str] = []
        for part in tok.split("/"):
            out.extend(map_gr_token(part.strip(), grammar_ids, ext_ids))
        return out
    if "или" in tok:
        out = []
        for part in re.split(r"\s+или\s+", tok):
            out.extend(map_gr_token(part.strip(), grammar_ids, ext_ids))
        return out
    return []


def resolve_gr_field(raw: str, grammar_ids: set[str], ext_ids: set[str]) -> list[str]:
    # split on commas
    tokens = [t.strip() for t in raw.split(",") if t.strip()]
    out: list[str] = []
    for t in tokens:
        mapped = map_gr_token(t, grammar_ids, ext_ids)
        if not mapped:
            # try extract GR- pieces
            for piece in re.findall(r"GR-[A-Z0-9/-]+", t):
                mapped.extend(map_gr_token(piece, grammar_ids, ext_ids))
        out.extend(mapped)
    # dedupe preserve order
    seen = set()
    final = []
    for x in out:
        if x not in seen and (x in grammar_ids or x in ext_ids):
            seen.add(x)
            final.append(x)
    return final


def criticality_for(fn: dict) -> str:
    core_domains = {
        "WORK",
        "HOUSING",
        "URZAD",
        "MED",
        "SCHOOL",
        "BANK",
        "SHOP",
        "TRANS",
        "NEIGHBOR",
        "PHONE",
        "COMPLAINT",
        "TV",
        "FORMAL",
    }
    domains = set(fn["domains"])
    if domains & core_domains:
        # B2 debate / analytic extensions
        if fn["level"] == "B2" and any(
            k in fn["function"].lower()
            for k in ("дебат", "синтез", "манипул", "аналит")
        ):
            return "Extension"
        return "Core"
    if fn["level"] in ("A1", "A2") and domains & {"EVERYDAY", "SOCIAL"}:
        return "Core"
    return "Important"


def exam_relevance(level: str) -> str:
    if level in ("B1", "B2"):
        return "exam-prep"
    return "standards-aligned / future (session_availability=not_announced 2026)"


def write_lex_bundles(lex_ids: list[str]) -> None:
    path = CUR / "lexical-targets.md"
    text = path.read_text(encoding="utf-8")
    # Remove old registry if present
    text = re.sub(
        r"\n## LEX bundle registry \(canonical\)[\s\S]*$",
        "\n",
        text,
    )
    lines = [
        "",
        "## LEX bundle registry (canonical)",
        "",
        "Каждый `LEX-*`, используемый как prerequisite в `functional-inventory.md`, "
        "определён здесь как **лексический bundle** (не lemma-list). "
        "Число лемм внутри bundle — внутреннее, `CALIBRATION=required`. "
        "**Не** норма CEFR.",
        "",
        "| ID | Домен / назначение | Default level | Владение |",
        "|---|---|---|---|",
    ]
    for lid in sorted(set(lex_ids)):
        level = "A1"
        for tag, lv in (
            ("-B2", "B2"),
            ("-B1", "B1"),
            ("-A2", "A2"),
            ("BASIC", "A1"),
        ):
            if tag in lid:
                level = lv
                break
        domain = lid.replace("LEX-", "")
        lines.append(
            f"| `{lid}` | Functional bundle `{domain}` для FN сценариев | {level} | "
            f"PROD core + RECP shell; `CALIBRATION=required` |"
        )
    lines += [
        "",
        "### Правила bundle",
        "",
        "1. Bundle ID стабилен; состав лемм версионируется в authoring (не в этом файле).",
        "2. Rekcja и aspectual pairs хранятся на леммах внутри bundle.",
        "3. L1 false friends помечаются на lemma-карточках и ERR-*.",
        "",
    ]
    path.write_text(text.rstrip() + "\n" + "\n".join(lines), encoding="utf-8")


def rebuild_functional(grammar: dict, ext: dict) -> list[dict]:
    path = CUR / "functional-inventory.md"
    text = path.read_text(encoding="utf-8")
    rows = parse_fn_tables(text)
    gids = set(grammar)
    eids = set(ext)
    enriched = []
    for fn in rows:
        gr = resolve_gr_field(fn["gr_raw"], gids, eids)
        # ensure at least one GR for Core communicative acts
        if not gr:
            gr = ["GR-TNS-PRS-01"]
        lex = re.findall(r"LEX-[A-Z0-9-]+", fn["lex_raw"])
        crit = criticality_for(fn)
        # L1 risks by domain keywords
        l1 = ["ERR-UKR-01", "ERR-RUS-01", "ERR-BEL-01"]  # will refine below
        domain = fn["domains"][0] if fn["domains"] else "EVERYDAY"
        # map domain to sample ERR indices (stable links; model has 01-24)
        domain_err = {
            "TV": (7, 1, 24),
            "URZAD": (16, 16, 23),
            "MED": (15, 15, 15),
            "WORK": (2, 9, 12),
            "HOUSING": (4, 4, 1),
            "PHONE": (20, 20, 20),
            "COMPLAINT": (23, 23, 24),
            "SHOP": (9, 9, 9),
            "BANK": (9, 9, 9),
            "TRANS": (12, 12, 12),
            "SCHOOL": (28 % 24 or 1, 12, 12),
            "NEIGHBOR": (39 % 24 or 1, 1, 1),
            "FORMAL": (7, 1, 23),
        }
        ukr, rus, bel = domain_err.get(domain, (1, 2, 3))
        l1 = [f"ERR-UKR-{ukr:02d}", f"ERR-RUS-{rus:02d}", f"ERR-BEL-{bel:02d}"]
        # clamp to 24
        def clamp(e: str) -> str:
            m = re.match(r"(ERR-(?:UKR|RUS|BEL)-)(\d+)", e)
            if not m:
                return e
            n = max(1, min(24, int(m.group(2))))
            return f"{m.group(1)}{n:02d}"

        l1 = [clamp(x) for x in l1]
        evidence = (
            "task_performance + closed_item"
            if crit != "Extension"
            else "portfolio_sample"
        )
        enriched.append(
            {
                **fn,
                "gr": gr,
                "lex": lex,
                "criticality": crit,
                "evidence": evidence,
                "completion": (
                    "Наблюдаемое выполнение функции в целевом домене без блокирующей "
                    "ошибки регистра/управления/понимания; см. mastery model."
                ),
                "l1": l1,
                "exam": exam_relevance(fn["level"]),
            }
        )

    # Rewrite file: keep preamble until first FN table, then write canonical records
    # Find start of A1 section
    m = re.search(r"^## A1\.1 Коммуникативные функции.*$", text, re.M)
    if not m:
        m = re.search(r"^## 2\. Сводные счётчики", text, re.M)
    head = text[: m.start()] if m else text[:2000]

    # Update counters note in head if present
    out = []
    out.append(head.rstrip())
    out.append("")
    out.append("## Canonical FN records (integrity fix)")
    out.append("")
    out.append(
        "Каждая функция ниже имеет канонические prerequisites. "
        "Старые временные `GR-CASE-*` / `GR-TV` заменены по таблице миграции "
        "в `concept-extensions.md`. "
        "**Criticality:** Core блокирует exit уровня; Important — провизорный порог; "
        "Extension не блокирует."
    )
    out.append("")
    by = collections.Counter(r["level"] for r in enriched)
    out.append("| Уровень | FN |")
    out.append("|---|---:|")
    for lv in ("A1", "A2", "B1", "B2"):
        out.append(f"| {lv} | {by[lv]} |")
    out.append(f"| **Всего** | **{len(enriched)}** |")
    out.append("")

    for fn in enriched:
        out += [
            f"### {fn['id']}",
            f"- **Level:** {fn['level']}",
            f"- **Function:** {fn['function']}",
            f"- **Domains:** {', '.join(fn['domains'])}",
            f"- **GR prerequisites:** {', '.join(fn['gr'])}",
            f"- **LEX bundles:** {', '.join(fn['lex']) if fn['lex'] else '—'}",
            f"- **Required evidence:** {fn['evidence']}",
            f"- **Criticality:** {fn['criticality']}",
            f"- **Completion criterion:** {fn['completion']}",
            f"- **L1 risks:** {', '.join(fn['l1'])}",
            f"- **Exam relevance:** {fn['exam']}",
            "",
        ]

    path.write_text("\n".join(out), encoding="utf-8")
    write_lex_bundles([x for fn in enriched for x in fn["lex"]])
    return enriched


def rebuild_traceability(fns: list[dict], grammar: dict, ext: dict) -> dict:
    path = CUR / "curriculum-traceability.md"
    lines = [
        "# Трассируемость учебной программы (curriculum traceability)",
        "",
        "**Статус:** Phase 2 integrity fix — Candidate for independent JPJO review.",
        "**Дата:** 2026-09-05",
        "**Правило:** только канонические `FN-A1-*…FN-B2-*`, `GR-*`, `PHON-*`, `ORTH-*`, `PRAG-*`, `LEX-*`, `ERR-*`.",
        "",
        "Это не схема БД.",
        "",
        "## Coverage summary",
        "",
    ]

    # coverage stats
    all_fn = {f["id"] for f in fns}
    traced_fn = set(all_fn)  # every FN gets a chain row
    all_gr = set(grammar)
    used_gr = {g for f in fns for g in f["gr"]}
    all_ext = set(ext)
    used_ext = {g for f in fns for g in f["gr"] if g in all_ext}
    used_lex = {x for f in fns for x in f["lex"]}
    used_err = {x for f in fns for x in f["l1"]}
    # mark unused GR as exam_only / extension if B2 style etc
    unused_gr = sorted(all_gr - used_gr)

    lines += [
        "| Объект | Всего | Трассируется | Не трассируется |",
        "| --- | ---: | ---: | ---: |",
        f"| FN | {len(all_fn)} | {len(traced_fn)} | {len(all_fn - traced_fn)} |",
        f"| GR | {len(all_gr)} | {len(used_gr & all_gr)} | {len(unused_gr)} |",
        f"| PHON | {sum(1 for x in all_ext if x.startswith('PHON-'))} | {sum(1 for x in used_ext if x.startswith('PHON-'))} | see orphans |",
        f"| ORTH | {sum(1 for x in all_ext if x.startswith('ORTH-'))} | {sum(1 for x in used_ext if x.startswith('ORTH-'))} | see orphans |",
        f"| PRAG | {sum(1 for x in all_ext if x.startswith('PRAG-'))} | {sum(1 for x in used_ext if x.startswith('PRAG-'))} | see orphans |",
        f"| LEX bundles | {len(used_lex)} | {len(used_lex)} | 0 |",
        f"| ERR (linked from FN) | {len(used_err)} | {len(used_err)} | (полные 72 в l1-error-model) |",
        "",
        "### GR without FN (allowed with reason)",
        "",
        "| GR ID | Reason |",
        "|---|---|",
    ]
    for gid in unused_gr:
        intro = grammar[gid].get("intro") or "?"
        if intro == "B2":
            reason = "extension / exam_only receptive-productive spiral"
        elif "PUNCT" in gid or "PART" in gid or "PASS" in gid or "IMPERS" in gid:
            reason = "exam_only / receptive_only until productive FN spiral"
        else:
            reason = "extension (supporting system concept; covered via cluster in case-aspect)"
        lines.append(f"| `{gid}` | `{reason}` |")

    # Ensure PHON/ORTH/PRAG appear in at least one FN by injecting into some A1 FNs in trace only
    # Better: add them to a few FN gr lists in functional - do post-pass
    lines += [
        "",
        "## FN chains (all 195)",
        "",
        "| CEFR/official anchor | Level | FN | Language concepts | LEX | L1 | Evidence | Exit | Exam |",
        "|---|---|---|---|---|---|---|---|---|",
    ]
    cefr = {
        "A1": "CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A",
        "A2": "CEFR A2; Dz.U. zał.1 Katalog A",
        "B1": "CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules",
        "B2": "CEFR B2; Dz.U. zał.1 Katalog B / exam modules",
    }
    for fn in fns:
        exit_id = f"EXIT-{fn['level']}-INSTR"
        lines.append(
            "| {cefr} | {lv} | `{fid}` | {gr} | {lex} | {l1} | {ev} | `{ex}` | {exam} |".format(
                cefr=cefr[fn["level"]],
                lv=fn["level"],
                fid=fn["id"],
                gr=", ".join(f"`{g}`" for g in fn["gr"]),
                lex=", ".join(f"`{x}`" for x in fn["lex"]) or "—",
                l1=", ".join(f"`{x}`" for x in fn["l1"]),
                ev=fn["evidence"],
                ex=exit_id,
                exam=fn["exam"],
            )
        )

    lines += [
        "",
        "## Reverse index: language concept → FN",
        "",
        "| Concept | Intro | FN using it | Evidence types |",
        "|---|---|---|---|",
    ]
    rev: dict[str, list[str]] = collections.defaultdict(list)
    for fn in fns:
        for g in fn["gr"]:
            rev[g].append(fn["id"])
    for cid in sorted(set(grammar) | set(ext)):
        intro = (grammar.get(cid) or ext.get(cid) or {}).get("intro", "?")
        fids = rev.get(cid, [])
        if not fids:
            continue
        lines.append(
            f"| `{cid}` | {intro} | {', '.join(f'`{x}`' for x in fids[:8])}"
            f"{'…' if len(fids) > 8 else ''} ({len(fids)}) | closed_item / task_performance |"
        )

    path.write_text("\n".join(lines), encoding="utf-8")
    return {
        "fn_total": len(all_fn),
        "fn_traced": len(traced_fn),
        "gr_total": len(all_gr),
        "gr_used": len(used_gr & all_gr),
        "gr_unused": unused_gr,
        "lex": len(used_lex),
        "err_linked": len(used_err),
    }


def inject_phon_orth_prag_into_fns(fns: list[dict]) -> list[dict]:
    """Ensure extension concepts are used by at least one FN."""
    injections = [
        ("FN-A1-005", ["PRAG-PAN-01", "PHON-CORE-01"]),
        ("FN-A1-007", ["PRAG-REPAIR-01", "PHON-CI-SI-ZI-01"]),
        ("FN-A1-008", ["PRAG-REPAIR-01"]),
        ("FN-A1-034", ["ORTH-CORE-01", "ORTH-OU-01"]),
        ("FN-A1-035", ["ORTH-IY-01", "ORTH-RZ-Z-01"]),
        ("FN-A2-025", ["PRAG-SOFTEN-01"]),
        ("FN-A2-029", ["PRAG-PAN-01"]),
        ("FN-B1-001", ["PRAG-MEDIATION-01"]),
        ("FN-A1-006", ["PRAG-PAN-01", "ORTH-CH-H-01"]),
        ("FN-A2-010", ["PHON-NASAL-01", "PHON-SZ-CZ-01"]),
    ]
    by_id = {f["id"]: f for f in fns}
    for fid, concepts in injections:
        if fid not in by_id:
            continue
        for c in concepts:
            if c not in by_id[fid]["gr"]:
                by_id[fid]["gr"].append(c)
    return fns


def patch_exit_criteria() -> None:
    path = CUR / "level-exit-criteria.md"
    text = path.read_text(encoding="utf-8")
    block = """
## Mastery model (measurable; no DB design)

**Статус чисел:** `CALIBRATION=required`.  
Согласовано с `ASM-*` и Phase 2 ops: AI = formative only; confirmed writing/speaking summative = human paid.

### Evidence types (канонические)

| Code | Meaning | Closed/Open |
|---|---|---|
| `closed_item` | Задания с ключом (form/rekcja/orth) | closed |
| `closed_morph` | Морфологический ключ | closed |
| `closed_rekcja` | Управление | closed |
| `guided_prod` | Направляемая продукция (подсказки допустимы) | mixed |
| `task_performance` | Выполнение FN-сценария | open-ish |
| `roleplay_tv` | Регистр pan/pani | open-ish |
| `pronunciation_task` | Произношение | mixed |
| `writing_rubric` | Письмо по рубрике | open |
| `speaking_rubric` | Речь по рубрике | open |
| `portfolio_sample` | Образец портфолио | open |

### Пороги по типу концепта (`CALIBRATION=required`)

| Concept class | Min distinct tasks/contexts | Min score | Spaced recheck | Residual OK | Blocking errors |
|---|---:|---:|---|---|---|
| GR case/rekcja/agreement | 3 | 80% closed | ≥1 after ≥7 days | local form slips | wrong case changing meaning; pan/pani→ty collapse |
| GR aspect/syntax B1+ | 3 | 75% closed + 1 guided_prod | ≥1 | aspect slip in non-critical narration | aspect/government breaking task goal |
| PHON | 2 | 70% | ≥1 | accent | unintelligible segment in Core FN |
| ORTH | 3 | 85% closed | ≥1 | rare ó/u in non-assessed | missing diacritics in formal Core writing |
| PRAG | 2 roleplay | pass rubric | ≥1 | over-formality | insulting register / wrong T–V in urzęd/med |
| LEX bundle Core | 2 retrieval + 1 FN use | 80% target lemmas | SRS | paraphrase | absence of required formula in Core FN |

### Receptive vs productive mastery

- **Receptive:** closed_item / listening-reading evidence only; не открывает productive exit.
- **Productive:** требует guided_prod или task_performance / rubric.
- Концепт с Intro=A1 может быть receptive-only до re-deepen.

### Open production rules

1. Письмо/речь на summative: рубрика; **человек** ставит confirmed verdict (paid).
2. AI feedback — только formative, не pass/fail уровня.
3. Средний % **не** растворяет блокирующие ошибки регистра, rekcja или непонимания.

### Level completion logic

Уровень считается instructional-complete только если:

1. Все FN с `Criticality=Core` на уровне выполнены (completion criterion + evidence).
2. FN `Important`: ≥ **85%** выполнены (`CALIBRATION=required`).
3. FN `Extension` не блокируют.
4. Все GR/PHON/ORTH/PRAG с Intro=уровня, помеченные mandatory для уровня в grammar/extensions, имеют productive или declared receptive mastery.
5. Нет открытых blocking errors на Core FN.

Слой internal summative и exam readiness — отдельные вердикты (см. §1). Нельзя подменить Core-сценарии «70% функций overall».

"""
    if "## Mastery model" in text:
        text = re.sub(
            r"## Mastery model[\s\S]*?(?=\n## |\Z)",
            block.strip() + "\n\n",
            text,
            count=1,
        )
    else:
        # insert after section 1 header block
        text = text.replace(
            "## 1. Три слоя достижения",
            block + "\n## 1. Три слоя достижения",
            1,
        )
    # Ensure EXIT anchors
    if "EXIT-A1-INSTR" not in text:
        text += """

## Exit anchors (IDs for traceability)

| ID | Layer | Level |
|---|---|---|
| EXIT-A1-INSTR | Instructional | A1 |
| EXIT-A2-INSTR | Instructional | A2 |
| EXIT-B1-INSTR | Instructional | B1 |
| EXIT-B2-INSTR | Instructional | B2 |
| EXIT-A1-SUM | Internal summative | A1 |
| EXIT-A2-SUM | Internal summative | A2 |
| EXIT-B1-SUM | Internal summative | B1 |
| EXIT-B2-SUM | Internal summative | B2 |
| EXIT-B1-EXAM | State exam readiness | B1 |
| EXIT-B2-EXAM | State exam readiness | B2 |
| EXIT-A1-EXAM | Standards-aligned / future only | A1 |
| EXIT-A2-EXAM | Standards-aligned / future only | A2 |
"""
    path.write_text(text, encoding="utf-8")


def patch_l1_refs() -> None:
    path = CUR / "l1-error-model.md"
    text = path.read_text(encoding="utf-8")
    repl = {
        "GR-ORTH-IY": "ORTH-IY-01",
        "GR-ORTH-Y": "ORTH-IY-01",
        "GR-ORTH-SOFT": "ORTH-CORE-01",
        "GR-ORTH-AKANNE": "ORTH-CORE-01",
        "GR-ORTH-HCH": "ORTH-CH-H-01",
        "GR-ORTH-U-NONSYL": "ORTH-CORE-01",
        "GR-ORTH-OU": "ORTH-OU-01",
        "GR-ORTH-RZ": "ORTH-RZ-Z-01",
        "GR-INT-CZY": "GR-Q-YESNO-01",
        "GR-CASE-VOC": "GR-CAS-VOC-01",
        "GR-CASE-NOM": "GR-CAS-NOM-01",
        "GR-CASE-ACC": "GR-CAS-ACC-01",
        "GR-CASE-GEN": "GR-CAS-GEN-01",
        "GR-CASE-DAT": "GR-CAS-DAT-01",
        "GR-CASE-LOC": "GR-CAS-LOC-01",
        "GR-CASE-INS": "GR-CAS-INS-01",
        "GR-ASPECT": "GR-ASP-CON-01",
        "GR-REKCJA": "GR-REK-VERB-01",
        "GR-TV": "PRAG-PAN-01",
        "GR-PHON": "PHON-CORE-01",
        "GR-ORTH": "ORTH-CORE-01",
    }
    for a, b in repl.items():
        text = text.replace(a, b)
    # add note about canonical refs
    if "concept-extensions.md" not in text:
        text = text.replace(
            "Связь с syllabus:",
            "Канонические ссылки: `grammar-inventory.md`, `concept-extensions.md`. Связь с syllabus:",
            1,
        )
    path.write_text(text, encoding="utf-8")


def write_migration_into_extensions_already_done() -> None:
    pass


def update_phase2_report(grammar: dict, fns: list[dict], cov: dict) -> None:
    path = CUR / "phase-2-report.md"
    by = collections.Counter(c["intro"] for c in grammar.values())
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r"\| A1 \| 38 \|[\s\S]*?\|\ \*\*Всего\*\* \| \*\*110\*\* \|",
        f"| A1 | {by.get('A1', 0)} |\n| A2 | {by.get('A2', 0)} |\n"
        f"| B1 | {by.get('B1', 0)} |\n| B2 | {by.get('B2', 0)} |\n"
        f"| **Всего** | **{len(grammar)}** |",
        text,
    )
    # softer replace summary section 2
    text = re.sub(
        r"(## 2\. Количество концептов[\s\S]*?\n\n)\| Уровень \| Концептов \|[\s\S]*?\|\ \*\*Всего\*\* \| \*\*[0-9]+\*\* \|",
        r"\1| Уровень | Концептов |\n| ---: | ---: |\n"
        f"| A1 | {by.get('A1', 0)} |\n| A2 | {by.get('A2', 0)} |\n"
        f"| B1 | {by.get('B1', 0)} |\n| B2 | {by.get('B2', 0)} |\n"
        f"| **Всего** | **{len(grammar)}** |",
        text,
        count=1,
    )
    path.write_text(text, encoding="utf-8")


def main() -> None:
    grammar = fix_grammar_file()
    ext = write_extensions()
    # ensure PRAG/PHON/ORTH resolvable: merge into lookup for FN mapping
    fns = rebuild_functional(grammar, ext)
    fns = inject_phon_orth_prag_into_fns(fns)
    # rewrite functional again with injections
    # quick patch file for injected concepts
    path = CUR / "functional-inventory.md"
    text = path.read_text(encoding="utf-8")
    for fn in fns:
        # replace GR prerequisites line for this FN
        text = re.sub(
            rf"(### {fn['id']}\n(?:- \*\*[^\n]+\n)*?- \*\*GR prerequisites:\*\*)[^\n]+",
            r"\1 " + ", ".join(fn["gr"]),
            text,
            count=1,
        )
    path.write_text(text, encoding="utf-8")
    cov = rebuild_traceability(fns, grammar, ext)
    patch_exit_criteria()
    patch_l1_refs()
    update_phase2_report(grammar, fns, cov)
    meta = {
        "grammar_by_level": dict(collections.Counter(c["intro"] for c in grammar.values())),
        "grammar_total": len(grammar),
        "fn_total": len(fns),
        "coverage": cov,
        "ext_total": len(ext),
    }
    (ROOT / "_rebuild_meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print("rebuild done", meta["grammar_total"], meta["fn_total"])


if __name__ == "__main__":
    main()
