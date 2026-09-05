# Phase 2 integrity report

**Статус пакета:** Candidate for independent JPJO review  
**Не утверждено** как официальная программа продукта.  
**Ветка:** `docs/phase-2-integrity-fix`  
**База:** `27a94c9` (`docs/requirements-r2`)  
**Дата:** 2026-09-05  

Код приложения, ERD, API, UI, Figma, Phase 3 — **не** создавались.

---

## 1. Какие ошибки исправлены

1. Ложные счётчики grammar inventory (заявлено 110 при 79 определениях на `27a94c9`) → автосводка из фактических `#### GR-*`.
2. Временные неразрешимые GR-псевдо-ID (`GR-CASE-NOM`, `GR-TV`, `GR-CONCORD`, …) → канонические ID + миграция.
3. Разделение namespace: грамматика `GR-*`; фонетика `PHON-*`; орфография `ORTH-*`; прагматика `PRAG-*`; лексика `LEX-*`; ошибки `ERR-*`.
4. Functional inventory: 195 FN с каноническими GR/LEX/ERR, criticality, evidence, exam relevance.
5. Traceability: только реальные `FN-A1-*…FN-B2-*`; покрытие всех 195 FN; reverse index.
6. Exit criteria: Mastery model с измеримыми порогами; Core FN обязательны; Important ≥85% provisional; AI formative / human summative.
7. Prerequisites: убраны циклы (`AGR-VPAST↔TNS-PST`, `ALT↔LOC`); late dependency `REK-VERB`+Dat разделена; `PRO-INDEF` Intro→A2 для `NEG-DOUBLE`.
8. L1 model: ссылки на канонические ORTH/PHON/PRAG/GR; 24×3 карточки сохранены.
9. Добавлен `scripts/validate-curriculum.py` (stdlib only).

---

## 2. Фактические количества ID

| Объект | Всего | По уровням Intro (где применимо) |
| --- | ---: | --- |
| GR | **110** | см. ниже |
| PHON | 4 | — |
| ORTH | 5 | — |
| PRAG | 4 | — |
| FN | **195** | A1 42 · A2 48 · B1 55 · B2 50 |
| LEX bundles | 160 | registry в `lexical-targets.md` |
| ERR | **72** | UKR 24 · RUS 24 · BEL 24 |
| EXIT anchors | 12 | INSTR/SUM/EXAM × уровни |

### GR по Intro

| Уровень | Концептов |
| --- | ---: |
| A1 | 58 |
| A2 | 26 |
| B1 | 18 |
| B2 | 8 |
| **Всего** | **110** |

Обоснование GR=110 (диапазон 80–120): после сверки с пробелами покрытия добавлены только недостающие системные концепты (rekcja Dat, TV-agreement, расширения синтаксиса/пунктуации и т.д.), без искусственного дробления ради числа.

---

## 3. Coverage (после integrity fix)

| Объект | Всего | Трассируется | Не трассируется |
| --- | ---: | ---: | ---: |
| FN | 195 | 195 | 0 |
| GR | 110 | 110 | 0 |
| PHON | 4 | 4 | 0 |
| ORTH | 5 | 5 | 0 |
| PRAG | 4 | 4 | 0 |
| LEX bundles | 160 | 160 | 0 |
| ERR | 72 | 72 | 0 |

---

## 4. Prerequisites

- Все exact prerequisites существуют.
- Циклов нет (проверено validator).
- Late-level deps исправлены:
  - `GR-REK-VERB-01` (A1) больше не зависит от `GR-CAS-DAT-01` (A2); Dat-система → `GR-REK-VERB-DAT-01` (A2).
  - `GR-PRO-INDEF-01` Intro сдвинут на A2; `GR-NEG-DOUBLE-01` зависит от него легально.
  - `GR-TNS-PST-01` ↔ `GR-AGR-VPAST-01` цикл разорван.
  - `GR-CAS-LOC-01` ↔ `GR-ALT-STEM-01` цикл разорван (параллельное введение).
- Wildcard `GR-CAS-*` в Prereq удалён.

---

## 5. Результат validator

```text
python scripts/validate-curriculum.py
OK: curriculum validation passed
Counts: GR=110 by_level={'A1': 58, 'A2': 26, 'B1': 18, 'B2': 8}; FN=195; PHON+ORTH+PRAG=13
exit code: 0
```

---

## 6. Оставшиеся REQUIRES VERIFICATION

1. Номера страниц Swan / Nagórko и иных описательных грамматик.
2. Частотности L1-ошибок и часть remediation (`EXPERT VALIDATION REQUIRED` на карточках).
3. Численные lexical ranges и mastery/Important пороги — `CALIBRATION=required`.
4. Поклеточная матрица Katalog A/B załącznik ↔ каждый FN/GR (семантическая трассировка есть; операционный coverage pass — после JPJO).
5. Актуальный снимок `session_availability` после 2026-09-05.

---

## 7. Методические решения для JPJO

1. Компромиссный порядок падежей (Nom→Acc→Loc→Gen→Ins→Voc; Dat A2) vs учебник/частотность.
2. A1 rekcja без системного Dat; Dat-глаголы с A2.
3. Intro неопределённых/отрицательных местоимений на A2 (раньше прежнего B1).
4. Criticality разметка Core/Important/Extension по доменам первой аудитории.
5. Рабочие lexical ranges как внутренние, не CEFR.

---

## 8. Изменённые / созданные файлы

**Созданы:**

- `docs/requirements/curriculum/concept-extensions.md`
- `docs/requirements/curriculum/phase-2-integrity-report.md`
- `scripts/validate-curriculum.py`
- `scripts/rebuild_phase2_integrity.py` (вспомогательный regenerate; не обязателен к запуску в CI)

**Обновлены:**

- `grammar-inventory.md`, `functional-inventory.md`, `lexical-targets.md`
- `curriculum-traceability.md`, `level-exit-criteria.md`, `l1-error-model.md`
- `phase-2-report.md`, `docs/requirements/README.md`

---

## 9. `git diff --stat` (относительно `27a94c9` / ветки до коммита)

См. актуальный вывод `git diff --stat` в коммите. Ожидаемый порядок величины: тысячи строк в FN/traceability/grammar + новые scripts.

---

## 10. Что сознательно не делалось

- Техническая архитектура, БД, API, UI, Figma
- Phase 3 / ICE / обязательный набор XT
- Утверждение Phase 2 как «approved syllabus»
- Назначение конкретного JPJO reviewer (DEC-016)
- Конкретные тарифы

---

## 11. Сохранённые working locks

- аудитория UKR/RUS/BEL взрослые в PL; цель A1–B2;
- автор: основатель + AI pipeline; публикация после JPJO;
- AI formative only; confirmed writing/speaking = human paid;
- placement + первый модуль free; trajectory + exam-mode paid; цены TBD;
- `standard_status` ≠ `session_availability`; A1/A2 не `historical`.
