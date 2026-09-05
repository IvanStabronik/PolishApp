# Phase 2 integrity report (semantic pass + A1 model refactor)

**Статус Phase 2 overall:** **не завершена**.
**A1 semantic reference:** candidate for human review.
**A2–B2:** pending semantic migration — **не** эталон.
**Не** внутренний gate pass и **не** утверждённая программа.
**Ветка:** `docs/phase-2-integrity-fix`
**Актуальный отчёт A1-модели:** [`../../reports/phase-2-a1-model-report.md`](../../reports/phase-2-a1-model-report.md)
**Дата:** 2026-09-05

`validator OK` = **structural / anti-pattern checks only**, не методическая корректность.

---

## 1. Что исправлено в этом проходе

1. Удалён `scripts/rebuild_phase2_integrity.py` (механический coverage injector).
2. Переписаны все 13 `PHON`/`ORTH`/`PRAG` карточек без stub-формулировок; раздельные UKR/RUS/BEL; `Exit status`.
3. Всем `GR-*` добавлен `Exit status: Required | Supporting | Extension`.
4. Исправлено `Umniem pływać` → `Umiem pływać`.
5. Таблица миграции: запрещены автоподмены `GR-CASE`→Nom, `GR-PART`→только passive, `GR-NUM`→только 1–4, `GR-TENSE`→present (`DISAMBIGUATE per FN`).
6. Legacy 195 FN прошли первый semantic pass; затем 42 старые A1-записи мигрированы в 30 канонических FN, 17 SCN, 5 ASM и 5 EXM. A2–B2 (153 FN) остаются legacy.
7. L1: не форсируется покрытие всех 72 ERR.
8. LEX bundles: содержательные поля (purpose, level, MWU/FIX/COLL examples, related FN, size orientation).
9. Traceability: A1 вынесен в каноническую цепочку `SCN → FN → concepts → LEX → ERR → evidence → exit`; старые A1-строки заменены ссылкой на новый эталон и карту миграции.
10. Mastery logic привязана к `Exit status`.
11. Validator усилен + distribution report + явная оговорка structural-only.

---

## 2. Фактические счётчики

| Объект | Число |
| --- | ---: |
| GR | **110** (A1 58 / A2 26 / B1 18 / B2 8) |
| PHON+ORTH+PRAG | **13** |
| FN | **183** (A1 canonical 30 / A2 legacy 48 / B1 legacy 55 / B2 legacy 50) |
| SCN / ASM / EXM A1 | **17 / 5 / 5** |
| LEX bundles | **150** (включая 21 канонический `LEX-A1-*`) |
| ERR | **72** (24×3) |

**Почему не «любой ценой 110»:** после ручной классификации Exit status и проверки late-deps искусственно не дробили и не удаляли столпы без JPJO; число честно следует из `#### GR-*`. Если JPJO сольёт дубликаты (напр. `GR-VOC-NAME-01`↔`GR-CAS-VOC-01`), счётчик уменьшится — это допустимо.

### Exit status (язык)

| Status | Count (GR+ext) |
| --- | ---: |
| Required | 62 |
| Supporting | 49 |
| Extension | 12 |

---

## 3. Criticality distribution (FN)

| Criticality | Count | % |
| --- | ---: | ---: |
| Core | **74** | 40.4% |
| Important | **86** | 47.0% |
| Extension | **23** | 12.6% |

**Объяснение:** Core только для способностей, без которых instructional exit уровня для первой аудитории ложен (выживание A1, ключевые институции A2, самостоятельность/exam-relevant B1, сложные институциональные акты B2). Домен ≠ Core. Extension — специализации (дебаты, синтез, манипул-resist и т.п.). Квота заранее не задавалась.

---

## 4. Evidence distribution (FN)

| Evidence | Count |
| --- | ---: |
| task_performance* | 123 |
| writing_rubric | 20 |
| reading_task | 12 |
| speaking_rubric | 10 |
| roleplay_tv* | 11 |
| writing_task | 1 |
| closed_item | 2 |
| listening_task | 2 |
| mediation_task | 2 |

`closed_item` больше не клеится ко всем FN.

---

## 5. Late prerequisites

| До | После |
| --- | --- |
| ≥8 известных (IMP A2 на A1; DAT A2 на A1; PASS B2 на B1) + возможные injected | **0** |

Исправления (примеры):

- A1 request/repair/emergency/instructions: `GR-MOD-IMP-01` снят; **Formulaic exposure** (`Proszę powtórzyć` …).
- `FN-A1-024`: Dat снят; формулы `Dziękuję` / `Proszę bardzo`.
- `FN-B1-011`: `GR-PASS-01` снят; receptive reading + formulaic urzędowe; note `receptive_only`.

---

## 6. Удалённые искусственные связи

- Механические GR-инъекции ради reverse coverage 110/110.
- Принудительная привязка всех 72 ERR к FN.
- Generic completion criterion на legacy-наборе FN.
- Авто-Criticality=Core по одному только домену.
- Generic CEFR A1/A2/B1/B2 якорь без Source anchor разнообразия.

**Честное непокрытие (не баг):**

| Объект | Не связано с FN | Причина |
| --- | ---: | --- |
| GR / ext concepts | 73 | Supporting/Extension системные концепты; спираль case-aspect; не каждый урок = отдельная FN |
| ERR | 41 | банк диагностики; линк только при сценарном fit |

---

## 7. Validator

```text
python scripts/validate-curriculum.py
OK (structural only): GR=110 … FN canon A1=30; SCN=17; Required A1 linked=46/46
Late FN prerequisites: 0
NOTE: OK means structural integrity only — NOT semantic/methodological correctness or JPJO approval.
exit code: 0
```

Удалены генераторы: `rebuild_phase2_integrity.py`, одноразовые `semantic_fn_pass.py` / `enrich_lex_trace.py` после прогона.

---

## 8. REQUIRES VERIFICATION

1. Точные строки шкал CEFR Companion Volume на каждую FN.
2. Поклеточный mapping Katalog A/B Dz.U. 2025 poz. 217.
3. Полнота исключений ударения / носовых аллофонов.
4. CALIBRATION порогов Important 85%, lexical size ranges, mastery %.
5. EXPERT VALIDATION L1-карточек.
6. Возможное слияние дублирующих GR после JPJO.

---

## 9. Вопросы для JPJO

1. Сохранить ли 110 GR или слить пары вроде Voc name / Voc case, Dat experiencer / Dat core?
2. Достаточен ли formulaic IMP на A1 без системного `GR-MOD-IMP-01`?
3. Criticality 74/86/23 — сдвинуть Core вверх/вниз для urzęd/school?
4. Какие ERR из 41 unused должны стать обязательными диагностиками V1?
5. PHON-NASAL Supporting на A2 — поднять до Required?
6. Подтвердить порядок падежей и Dat@A2.

---

## 10. Сознательно не сделано

- Phase 3 / приложение / API / ERD / Figma
- Утверждение Phase 2 gate
- Полные lemma-lists
- Восстановление механического 100% GR↔FN coverage

---

## 11. Working locks (сохранены)

Автор+AI draft; JPJO перед публикацией; AI formative; human scoring письма/речи платно; placement+1 модуль free; trajectory+exam paid; цены TBD; `standard_status`≠`session_availability`; A1/A2 не historical.
