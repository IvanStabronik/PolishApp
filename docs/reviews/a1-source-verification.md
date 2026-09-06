# A1 Source Verification Matrix (SŁOWARIUM)

**Продукт:** SŁOWARIUM (`slowarium`)
**Срез:** A1 semantic reference — **candidate for human / JPJO review**
**База:** commit `18d23c9` → последующий review-readiness commit
**A2–B2:** pending semantic migration — **не** завершены
**Дата матрицы:** 2026-09-05

## Назначение

Реестр проверяемых утверждений. Отделяет нормативный факт от продуктовой интерпретации.
**Запрещено** заполнять точные страницы/ячейки догадкой. При отсутствии сверки — `REQUIRES_VERIFICATION`.

Validator OK ≠ доказанная норма.

## Evidence class

| Class | Смысл |
| --- | --- |
| `NORMATIVE_DIRECT` | Прямое утверждение официального/операционного источника |
| `CEFR_DIRECT` | Прямая ссылка на CEFR/CV дескриптор |
| `SOURCE_INTERPRETATION` | Вывод из источников с интерпретацией |
| `PRODUCT_ANALYSIS` | Решение продукта SŁOWARIUM |
| `EXPERT_JUDGMENT_REQUIRED` | Нужен независимый методист JPJO |

## Verification status

`VERIFIED` · `PARTIALLY_VERIFIED` · `REQUIRES_VERIFICATION` · `NOT_SUPPORTED` · `CONFLICT`

## Сводка статусов (авто)

| Status | Count |
| --- | ---: |
| `VERIFIED` | 9 |
| `PARTIALLY_VERIFIED` | 32 |
| `REQUIRES_VERIFICATION` | 150 |
| `NOT_SUPPORTED` | 1 |
| `CONFLICT` | 0 |
| **Всего claims** | **192** |

## Source IDs (каталог)

| source ID | URL / path |
| --- | --- |
| SRC-CERT-STRUKTURA | https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/ |
| SRC-CERT-TERMINY-2026 | https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/ |
| SRC-DZU-217 | https://dziennikustaw.gov.pl/D2025000021701.pdf |
| SRC-DZU-217-ZAL1 | https://dziennikustaw.gov.pl/D2025000021701.pdf (załącznik nr 1) |
| SRC-CEFR-CV | https://www.coe.int/en/web/common-european-framework-reference-languages |
| SRC-REQ-07 | docs/requirements/07-exam-preparation-requirements.md |
| SRC-PRODUCT-A1 | docs/requirements/curriculum/functional-inventory.md |
| SRC-ASM-EXM-A1 | docs/curriculum/asm-exm-a1.md |
| SRC-DEC-003 | docs/requirements/11-open-decisions.md |
| SRC-L1-MODEL | docs/requirements/curriculum/l1-error-model.md |
| SRC-MIGRATION-A1 | docs/curriculum/functional-migration-a1.md |
| SRC-PRODUCT-GRAMMAR | docs/requirements/curriculum/grammar-inventory.md |
| SRC-PRODUCT-LEX | docs/requirements/curriculum/lexical-targets.md |
| SRC-PRODUCT-PRAG | docs/requirements/curriculum/concept-extensions.md |
| SRC-PRODUCT-SCN | docs/curriculum/scenario-inventory.md |

Составные ID вида `SRC-A+B` **запрещены**. Несколько источников в одном claim перечисляются отдельными атомарными `SRC-*` в поле source ID.

## Claims

### CLAIM-001
- **Claim ID:** `CLAIM-001`
- **entity ID:** `EXM-A1-STRUCT-01`
- **Точное проверяемое утверждение:** Для взрослых A1 на странице struktury экзамена указаны: письменная часть не дольше 120 минут; устная не дольше 10 минут; порог — не менее 50% письменной и 50% устной части.
- **Тип утверждения:** exam_structure_threshold
- **source ID:** `SRC-CERT-STRUKTURA`
- **URL:** https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/
- **Документ:** certyfikatpolski.pl — Struktura egzaminu
- **Точное место:** Таблица «Poziom…»: строка «A1 dorośli» (колонки czas pisemny / ustny / próg)
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Сверка HTML 2026-09-05. Это операционная публикация Komisji; согласование с точным параграфом Dz.U. §17/§23 остаётся отдельным CLAIM.

### CLAIM-002
- **Claim ID:** `CLAIM-002`
- **entity ID:** `EXM-A1-STRUCT-01`
- **Точное проверяемое утверждение:** В опубликованном расписании сессий 2026 на certyfikatpolski.pl нет взрослой сессии уровня A1.
- **Тип утверждения:** session_availability_2026
- **source ID:** `SRC-CERT-TERMINY-2026`
- **URL:** https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/
- **Документ:** certyfikatpolski.pl — Terminy sesji egzaminacyjnych w 2026 roku
- **Точное место:** Список дат/уровней страницы (14–15.02; 25–26.04; 27–28.06; 17–18.10; 5–6.12) — A1 отсутствует
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Сверка 2026-09-05. `session_availability=not_announced` для A1 взрослых 2026. Не означает, что стандарта A1 не существует.

### CLAIM-003
- **Claim ID:** `CLAIM-003`
- **entity ID:** `EXM-A1-STRUCT-01`
- **Точное проверяемое утверждение:** На странице структуры экзамена сноска указывает, что «Obecnie egzaminy można zdawać» на уровнях A2, B1, B2, C1 и C2 (взрослые) — без A1 в перечне текущей сдачи.
- **Тип утверждения:** current_exam_offer_note
- **source ID:** `SRC-CERT-STRUKTURA`
- **URL:** https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/
- **Документ:** certyfikatpolski.pl — Struktura egzaminu
- **Точное место:** Сноска под таблицей уровней («Obecnie egzaminy można zdawać…»)
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** A1 присутствует в таблице структуры стандарта, но отсутствует в сноске «можно сдавать сейчас». Не трактовать как historical.

### CLAIM-004
- **Claim ID:** `CLAIM-004`
- **entity ID:** `PRODUCT-STATUS-MODEL`
- **Точное проверяемое утверждение:** Продукт разделяет `standard_status` (действует ли уровень в стандарте) и `session_availability` (объявлена ли сессия в конкретном расписании).
- **Тип утверждения:** product_status_model
- **source ID:** `SRC-REQ-07`
- **URL:** docs/requirements/07-exam-preparation-requirements.md
- **Документ:** 07-exam-preparation-requirements.md
- **Точное место:** § поля standard_status / session_availability; таблица уровней
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Внутренняя модель продукта; согласована с наблюдаемыми фактами CERT-STRUKTURA/TERMINY.

### CLAIM-005
- **Claim ID:** `CLAIM-005`
- **entity ID:** `A1`
- **Точное проверяемое утверждение:** `standard_status(A1)=current` при `session_availability(A1,2026)=not_announced`.
- **Тип утверждения:** dual_status_lock
- **source ID:** `SRC-REQ-07`; `SRC-CERT-STRUKTURA`; `SRC-CERT-TERMINY-2026`
- **URL:** docs/requirements/07-exam-preparation-requirements.md ; https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/ ; https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/
- **Документ:** 07-exam-preparation-requirements.md + certyfikatpolski.pl (struktura, terminy 2026)
- **Точное место:** Таблица статуса в 07; строка A1 dorośli на struktura; terminy 2026 без A1
- **evidence class:** `SOURCE_INTERPRETATION`
- **confidence:** High
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Операционные факты сессии/структуры VERIFIED через SRC-CERT-*; юридический ярлык `current` из Dz.U. §14 / załącznik — REQUIRES VERIFICATION точной статьи (см. CLAIM Dz.U.).

### CLAIM-006
- **Claim ID:** `CLAIM-006`
- **entity ID:** `EXM-A1-STRUCT-01`
- **Точное проверяемое утверждение:** Пороги и длительности A1 взрослых в продукте соответствуют Dz.U. 2025 poz. 217 §17 (czas) и §23.1.a (próg ≥50% pisemna + ≥50% ustna).
- **Тип утверждения:** dzu_paragraph_mapping
- **source ID:** `SRC-DZU-217`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217
- **Точное место:** § 17; § 23.1.a — точная редакция/нумерация REQUIRES VERIFICATION
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Согласование с таблицей certyfikatpolski.pl вероятно, но PDF-ячейки/формулировки параграфов в этом проходе не цитировались дословно.

### CLAIM-007
- **Claim ID:** `CLAIM-007`
- **entity ID:** `EXM-A1-STRUCT-01`
- **Точное проверяемое утверждение:** `EXM-A1-STRUCT-01` описывает модульная структура взрослых A1 как standards-aligned / future exam-compatible, без обещания объявленной взрослой сессии A1 в 2026.
- **Тип утверждения:** exm_disclaimer
- **source ID:** `SRC-ASM-EXM-A1`
- **URL:** docs/curriculum/asm-exm-a1.md
- **Документ:** asm-exm-a1.md
- **Точное место:** Карточка `EXM-A1-STRUCT-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Проверка текста пакета; нормативные детали модулей — отдельные CLAIM к CERT/Dz.U.

### CLAIM-008
- **Claim ID:** `CLAIM-008`
- **entity ID:** `EXM-A1-LISTEN-01`
- **Точное проверяемое утверждение:** `EXM-A1-LISTEN-01` описывает ориентир słuchanie как standards-aligned / future exam-compatible, без обещания объявленной взрослой сессии A1 в 2026.
- **Тип утверждения:** exm_disclaimer
- **source ID:** `SRC-ASM-EXM-A1`
- **URL:** docs/curriculum/asm-exm-a1.md
- **Документ:** asm-exm-a1.md
- **Точное место:** Карточка `EXM-A1-LISTEN-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Проверка текста пакета; нормативные детали модулей — отдельные CLAIM к CERT/Dz.U.

### CLAIM-009
- **Claim ID:** `CLAIM-009`
- **entity ID:** `EXM-A1-READ-01`
- **Точное проверяемое утверждение:** `EXM-A1-READ-01` описывает ориентир czytanie как standards-aligned / future exam-compatible, без обещания объявленной взрослой сессии A1 в 2026.
- **Тип утверждения:** exm_disclaimer
- **source ID:** `SRC-ASM-EXM-A1`
- **URL:** docs/curriculum/asm-exm-a1.md
- **Документ:** asm-exm-a1.md
- **Точное место:** Карточка `EXM-A1-READ-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Проверка текста пакета; нормативные детали модулей — отдельные CLAIM к CERT/Dz.U.

### CLAIM-010
- **Claim ID:** `CLAIM-010`
- **entity ID:** `EXM-A1-WRITE-01`
- **Точное проверяемое утверждение:** `EXM-A1-WRITE-01` описывает ориентир pisanie как standards-aligned / future exam-compatible, без обещания объявленной взрослой сессии A1 в 2026.
- **Тип утверждения:** exm_disclaimer
- **source ID:** `SRC-ASM-EXM-A1`
- **URL:** docs/curriculum/asm-exm-a1.md
- **Документ:** asm-exm-a1.md
- **Точное место:** Карточка `EXM-A1-WRITE-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Проверка текста пакета; нормативные детали модулей — отдельные CLAIM к CERT/Dz.U.

### CLAIM-011
- **Claim ID:** `CLAIM-011`
- **entity ID:** `EXM-A1-SPEAK-01`
- **Точное проверяемое утверждение:** `EXM-A1-SPEAK-01` описывает ориентир mówienie как standards-aligned / future exam-compatible, без обещания объявленной взрослой сессии A1 в 2026.
- **Тип утверждения:** exm_disclaimer
- **source ID:** `SRC-ASM-EXM-A1`
- **URL:** docs/curriculum/asm-exm-a1.md
- **Документ:** asm-exm-a1.md
- **Точное место:** Карточка `EXM-A1-SPEAK-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** High
- **verification status:** `VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Проверка текста пакета; нормативные детали модулей — отдельные CLAIM к CERT/Dz.U.

### CLAIM-012
- **Claim ID:** `CLAIM-012`
- **entity ID:** `GR-AGR-ADJ-01`
- **Точное проверяемое утверждение:** `GR-AGR-ADJ-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-013
- **Claim ID:** `CLAIM-013`
- **entity ID:** `GR-AGR-VPAST-01`
- **Точное проверяемое утверждение:** `GR-AGR-VPAST-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-014
- **Claim ID:** `CLAIM-014`
- **entity ID:** `GR-ASP-LEX-01`
- **Точное проверяемое утверждение:** `GR-ASP-LEX-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-015
- **Claim ID:** `CLAIM-015`
- **entity ID:** `GR-CAS-ACC-01`
- **Точное проверяемое утверждение:** `GR-CAS-ACC-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-016
- **Claim ID:** `CLAIM-016`
- **entity ID:** `GR-CAS-ACC-02`
- **Точное проверяемое утверждение:** `GR-CAS-ACC-02` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-017
- **Claim ID:** `CLAIM-017`
- **entity ID:** `GR-CAS-GEN-01`
- **Точное проверяемое утверждение:** `GR-CAS-GEN-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-018
- **Claim ID:** `CLAIM-018`
- **entity ID:** `GR-CAS-GEN-02`
- **Точное проверяемое утверждение:** `GR-CAS-GEN-02` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-019
- **Claim ID:** `CLAIM-019`
- **entity ID:** `GR-CAS-GEN-03`
- **Точное проверяемое утверждение:** `GR-CAS-GEN-03` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-020
- **Claim ID:** `CLAIM-020`
- **entity ID:** `GR-CAS-GEN-04`
- **Точное проверяемое утверждение:** `GR-CAS-GEN-04` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-021
- **Claim ID:** `CLAIM-021`
- **entity ID:** `GR-CAS-INS-01`
- **Точное проверяемое утверждение:** `GR-CAS-INS-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-022
- **Claim ID:** `CLAIM-022`
- **entity ID:** `GR-CAS-INS-02`
- **Точное проверяемое утверждение:** `GR-CAS-INS-02` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-023
- **Claim ID:** `CLAIM-023`
- **entity ID:** `GR-CAS-LOC-01`
- **Точное проверяемое утверждение:** `GR-CAS-LOC-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-024
- **Claim ID:** `CLAIM-024`
- **entity ID:** `GR-CAS-NOM-01`
- **Точное проверяемое утверждение:** `GR-CAS-NOM-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-025
- **Claim ID:** `CLAIM-025`
- **entity ID:** `GR-CAS-VOC-01`
- **Точное проверяемое утверждение:** `GR-CAS-VOC-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-026
- **Claim ID:** `CLAIM-026`
- **entity ID:** `GR-EXIST-01`
- **Точное проверяемое утверждение:** `GR-EXIST-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-027
- **Claim ID:** `CLAIM-027`
- **entity ID:** `GR-GEN-MFN-01`
- **Точное проверяемое утверждение:** `GR-GEN-MFN-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-028
- **Claim ID:** `CLAIM-028`
- **entity ID:** `GR-MOD-VERB-01`
- **Точное проверяемое утверждение:** `GR-MOD-VERB-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-029
- **Claim ID:** `CLAIM-029`
- **entity ID:** `GR-NEG-01`
- **Точное проверяемое утверждение:** `GR-NEG-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-030
- **Claim ID:** `CLAIM-030`
- **entity ID:** `GR-NUM-CARD-01`
- **Точное проверяемое утверждение:** `GR-NUM-CARD-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-031
- **Claim ID:** `CLAIM-031`
- **entity ID:** `GR-NUM-CARD-05`
- **Точное проверяемое утверждение:** `GR-NUM-CARD-05` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-032
- **Claim ID:** `CLAIM-032`
- **entity ID:** `GR-NUM-SGPL-01`
- **Точное проверяемое утверждение:** `GR-NUM-SGPL-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-033
- **Claim ID:** `CLAIM-033`
- **entity ID:** `GR-PRO-DEM-01`
- **Точное проверяемое утверждение:** `GR-PRO-DEM-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-034
- **Claim ID:** `CLAIM-034`
- **entity ID:** `GR-PRO-INT-01`
- **Точное проверяемое утверждение:** `GR-PRO-INT-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-035
- **Claim ID:** `CLAIM-035`
- **entity ID:** `GR-PRO-PERS-01`
- **Точное проверяемое утверждение:** `GR-PRO-PERS-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-036
- **Claim ID:** `CLAIM-036`
- **entity ID:** `GR-PRO-POSS-01`
- **Точное проверяемое утверждение:** `GR-PRO-POSS-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-037
- **Claim ID:** `CLAIM-037`
- **entity ID:** `GR-PRO-REFL-01`
- **Точное проверяемое утверждение:** `GR-PRO-REFL-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-038
- **Claim ID:** `CLAIM-038`
- **entity ID:** `GR-Q-YESNO-01`
- **Точное проверяемое утверждение:** `GR-Q-YESNO-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-039
- **Claim ID:** `CLAIM-039`
- **entity ID:** `GR-REK-PREP-01`
- **Точное проверяемое утверждение:** `GR-REK-PREP-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-040
- **Claim ID:** `CLAIM-040`
- **entity ID:** `GR-REK-VERB-01`
- **Точное проверяемое утверждение:** `GR-REK-VERB-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-041
- **Claim ID:** `CLAIM-041`
- **entity ID:** `GR-SYN-CAUSE-01`
- **Точное проверяемое утверждение:** `GR-SYN-CAUSE-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-042
- **Claim ID:** `CLAIM-042`
- **entity ID:** `GR-SYN-SUB-01`
- **Точное проверяемое утверждение:** `GR-SYN-SUB-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-043
- **Claim ID:** `CLAIM-043`
- **entity ID:** `GR-TNS-FUT-01`
- **Точное проверяемое утверждение:** `GR-TNS-FUT-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-044
- **Claim ID:** `CLAIM-044`
- **entity ID:** `GR-TNS-PRS-01`
- **Точное проверяемое утверждение:** `GR-TNS-PRS-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-045
- **Claim ID:** `CLAIM-045`
- **entity ID:** `GR-TNS-PST-01`
- **Точное проверяемое утверждение:** `GR-TNS-PST-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-046
- **Claim ID:** `CLAIM-046`
- **entity ID:** `GR-TV-AGR-01`
- **Точное проверяемое утверждение:** `GR-TV-AGR-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-047
- **Claim ID:** `CLAIM-047`
- **entity ID:** `GR-WO-NEUT-01`
- **Точное проверяемое утверждение:** `GR-WO-NEUT-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (grammar).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-048
- **Claim ID:** `CLAIM-048`
- **entity ID:** `ORTH-CH-H-01`
- **Точное проверяемое утверждение:** `ORTH-CH-H-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (orthography).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-049
- **Claim ID:** `CLAIM-049`
- **entity ID:** `ORTH-CORE-01`
- **Точное проверяемое утверждение:** `ORTH-CORE-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (orthography).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-050
- **Claim ID:** `CLAIM-050`
- **entity ID:** `ORTH-IY-01`
- **Точное проверяемое утверждение:** `ORTH-IY-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (orthography).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-051
- **Claim ID:** `CLAIM-051`
- **entity ID:** `ORTH-OU-01`
- **Точное проверяемое утверждение:** `ORTH-OU-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (orthography).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-052
- **Claim ID:** `CLAIM-052`
- **entity ID:** `ORTH-RZ-Z-01`
- **Точное проверяемое утверждение:** `ORTH-RZ-Z-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (orthography).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-053
- **Claim ID:** `CLAIM-053`
- **entity ID:** `PHON-CI-SI-ZI-01`
- **Точное проверяемое утверждение:** `PHON-CI-SI-ZI-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (phonetics).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-054
- **Claim ID:** `CLAIM-054`
- **entity ID:** `PHON-CORE-01`
- **Точное проверяемое утверждение:** `PHON-CORE-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (phonetics).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-055
- **Claim ID:** `CLAIM-055`
- **entity ID:** `PHON-SZ-CZ-01`
- **Точное проверяемое утверждение:** `PHON-SZ-CZ-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (phonetics).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-056
- **Claim ID:** `CLAIM-056`
- **entity ID:** `PRAG-PAN-01`
- **Точное проверяемое утверждение:** `PRAG-PAN-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (pragmatics).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-057
- **Claim ID:** `CLAIM-057`
- **entity ID:** `PRAG-REPAIR-01`
- **Точное проверяемое утверждение:** `PRAG-REPAIR-01` (Intro A1, Exit status=Required) входит в обязательный языковой минимум A1 продукта и якобы покрывается Katalog/listy gramatyczne Dz.U. / CEFR (pragmatics).
- **Тип утверждения:** required_concept_normative_basis
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1 (+ CEFR/CV для прагматики)
- **Точное место:** Точная строка/ячейка listy gramatyczne или Katalog A — не сверена
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Статус Required в grammar/extensions — продуктовая классификация. Нормативная обязательность каждого ID не доказана без сверки załącznik.

### CLAIM-058
- **Claim ID:** `CLAIM-058`
- **entity ID:** `FN-A1-IDENTIFY-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-IDENTIFY-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-059
- **Claim ID:** `CLAIM-059`
- **entity ID:** `FN-A1-IDENTIFY-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-IDENTIFY-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-060
- **Claim ID:** `CLAIM-060`
- **entity ID:** `FN-A1-IDENTIFY-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-IDENTIFY-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-IDENTIFY-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-061
- **Claim ID:** `CLAIM-061`
- **entity ID:** `FN-A1-IDENTIFY-02`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-IDENTIFY-02` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-062
- **Claim ID:** `CLAIM-062`
- **entity ID:** `FN-A1-IDENTIFY-02`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-IDENTIFY-02` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-063
- **Claim ID:** `CLAIM-063`
- **entity ID:** `FN-A1-IDENTIFY-02`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-IDENTIFY-02` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-IDENTIFY-02` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-064
- **Claim ID:** `CLAIM-064`
- **entity ID:** `FN-A1-LOCATE-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-LOCATE-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-065
- **Claim ID:** `CLAIM-065`
- **entity ID:** `FN-A1-LOCATE-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-LOCATE-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-066
- **Claim ID:** `CLAIM-066`
- **entity ID:** `FN-A1-LOCATE-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-LOCATE-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-LOCATE-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-067
- **Claim ID:** `CLAIM-067`
- **entity ID:** `FN-A1-LOCATE-02`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-LOCATE-02` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-068
- **Claim ID:** `CLAIM-068`
- **entity ID:** `FN-A1-LOCATE-02`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-LOCATE-02` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-069
- **Claim ID:** `CLAIM-069`
- **entity ID:** `FN-A1-LOCATE-02`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-LOCATE-02` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-LOCATE-02` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-070
- **Claim ID:** `CLAIM-070`
- **entity ID:** `FN-A1-GREET-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-GREET-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-071
- **Claim ID:** `CLAIM-071`
- **entity ID:** `FN-A1-GREET-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-GREET-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-072
- **Claim ID:** `CLAIM-072`
- **entity ID:** `FN-A1-GREET-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-GREET-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-GREET-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-073
- **Claim ID:** `CLAIM-073`
- **entity ID:** `FN-A1-ADDRESS-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-ADDRESS-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-074
- **Claim ID:** `CLAIM-074`
- **entity ID:** `FN-A1-ADDRESS-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-ADDRESS-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-075
- **Claim ID:** `CLAIM-075`
- **entity ID:** `FN-A1-ADDRESS-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-ADDRESS-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-ADDRESS-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-076
- **Claim ID:** `CLAIM-076`
- **entity ID:** `FN-A1-REPAIR-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-REPAIR-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-077
- **Claim ID:** `CLAIM-077`
- **entity ID:** `FN-A1-REPAIR-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-REPAIR-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-078
- **Claim ID:** `CLAIM-078`
- **entity ID:** `FN-A1-REPAIR-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-REPAIR-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-REPAIR-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-079
- **Claim ID:** `CLAIM-079`
- **entity ID:** `FN-A1-REPAIR-02`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-REPAIR-02` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-080
- **Claim ID:** `CLAIM-080`
- **entity ID:** `FN-A1-REPAIR-02`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-REPAIR-02` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-081
- **Claim ID:** `CLAIM-081`
- **entity ID:** `FN-A1-REPAIR-02`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-REPAIR-02` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-REPAIR-02` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-082
- **Claim ID:** `CLAIM-082`
- **entity ID:** `FN-A1-QUANT-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-QUANT-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-083
- **Claim ID:** `CLAIM-083`
- **entity ID:** `FN-A1-QUANT-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-QUANT-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-084
- **Claim ID:** `CLAIM-084`
- **entity ID:** `FN-A1-QUANT-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-QUANT-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-QUANT-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-085
- **Claim ID:** `CLAIM-085`
- **entity ID:** `FN-A1-TRANS-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-TRANS-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-086
- **Claim ID:** `CLAIM-086`
- **entity ID:** `FN-A1-TRANS-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-TRANS-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-087
- **Claim ID:** `CLAIM-087`
- **entity ID:** `FN-A1-TRANS-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-TRANS-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-TRANS-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-088
- **Claim ID:** `CLAIM-088`
- **entity ID:** `FN-A1-ASK-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-ASK-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-089
- **Claim ID:** `CLAIM-089`
- **entity ID:** `FN-A1-ASK-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-ASK-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-090
- **Claim ID:** `CLAIM-090`
- **entity ID:** `FN-A1-ASK-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-ASK-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-ASK-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-091
- **Claim ID:** `CLAIM-091`
- **entity ID:** `FN-A1-DIRECT-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-DIRECT-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-092
- **Claim ID:** `CLAIM-092`
- **entity ID:** `FN-A1-DIRECT-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-DIRECT-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-093
- **Claim ID:** `CLAIM-093`
- **entity ID:** `FN-A1-DIRECT-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-DIRECT-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-DIRECT-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-094
- **Claim ID:** `CLAIM-094`
- **entity ID:** `FN-A1-APPOINT-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-APPOINT-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-095
- **Claim ID:** `CLAIM-095`
- **entity ID:** `FN-A1-APPOINT-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-APPOINT-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-096
- **Claim ID:** `CLAIM-096`
- **entity ID:** `FN-A1-APPOINT-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-APPOINT-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-APPOINT-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-097
- **Claim ID:** `CLAIM-097`
- **entity ID:** `FN-A1-HEALTH-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-HEALTH-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-098
- **Claim ID:** `CLAIM-098`
- **entity ID:** `FN-A1-HEALTH-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-HEALTH-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-099
- **Claim ID:** `CLAIM-099`
- **entity ID:** `FN-A1-HEALTH-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-HEALTH-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-HEALTH-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-100
- **Claim ID:** `CLAIM-100`
- **entity ID:** `FN-A1-HELP-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-HELP-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-101
- **Claim ID:** `CLAIM-101`
- **entity ID:** `FN-A1-HELP-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-HELP-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-102
- **Claim ID:** `CLAIM-102`
- **entity ID:** `FN-A1-HELP-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-HELP-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-HELP-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-103
- **Claim ID:** `CLAIM-103`
- **entity ID:** `FN-A1-DOCS-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-DOCS-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-104
- **Claim ID:** `CLAIM-104`
- **entity ID:** `FN-A1-DOCS-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-DOCS-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-105
- **Claim ID:** `CLAIM-105`
- **entity ID:** `FN-A1-DOCS-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-DOCS-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-DOCS-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-106
- **Claim ID:** `CLAIM-106`
- **entity ID:** `FN-A1-PURPOSE-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-PURPOSE-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-107
- **Claim ID:** `CLAIM-107`
- **entity ID:** `FN-A1-PURPOSE-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-PURPOSE-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-108
- **Claim ID:** `CLAIM-108`
- **entity ID:** `FN-A1-PURPOSE-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-PURPOSE-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-PURPOSE-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-109
- **Claim ID:** `CLAIM-109`
- **entity ID:** `FN-A1-PHONE-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-PHONE-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-110
- **Claim ID:** `CLAIM-110`
- **entity ID:** `FN-A1-PHONE-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-PHONE-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-111
- **Claim ID:** `CLAIM-111`
- **entity ID:** `FN-A1-PHONE-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-PHONE-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-PHONE-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-112
- **Claim ID:** `CLAIM-112`
- **entity ID:** `FN-A1-PHONE-02`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-PHONE-02` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-113
- **Claim ID:** `CLAIM-113`
- **entity ID:** `FN-A1-PHONE-02`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-PHONE-02` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-114
- **Claim ID:** `CLAIM-114`
- **entity ID:** `FN-A1-PHONE-02`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-PHONE-02` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-PHONE-02` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-115
- **Claim ID:** `CLAIM-115`
- **entity ID:** `FN-A1-REQUEST-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-REQUEST-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-116
- **Claim ID:** `CLAIM-116`
- **entity ID:** `FN-A1-REQUEST-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-REQUEST-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-117
- **Claim ID:** `CLAIM-117`
- **entity ID:** `FN-A1-REQUEST-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-REQUEST-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-REQUEST-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-118
- **Claim ID:** `CLAIM-118`
- **entity ID:** `FN-A1-REFUSE-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-REFUSE-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-119
- **Claim ID:** `CLAIM-119`
- **entity ID:** `FN-A1-REFUSE-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-REFUSE-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-120
- **Claim ID:** `CLAIM-120`
- **entity ID:** `FN-A1-REFUSE-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-REFUSE-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-REFUSE-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-121
- **Claim ID:** `CLAIM-121`
- **entity ID:** `FN-A1-THANKS-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-THANKS-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-122
- **Claim ID:** `CLAIM-122`
- **entity ID:** `FN-A1-THANKS-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-THANKS-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-123
- **Claim ID:** `CLAIM-123`
- **entity ID:** `FN-A1-THANKS-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-THANKS-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-THANKS-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-124
- **Claim ID:** `CLAIM-124`
- **entity ID:** `FN-A1-APOLOGY-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-APOLOGY-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-125
- **Claim ID:** `CLAIM-125`
- **entity ID:** `FN-A1-APOLOGY-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-APOLOGY-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-126
- **Claim ID:** `CLAIM-126`
- **entity ID:** `FN-A1-APOLOGY-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-APOLOGY-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-APOLOGY-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-127
- **Claim ID:** `CLAIM-127`
- **entity ID:** `FN-A1-CONFIRM-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-CONFIRM-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-128
- **Claim ID:** `CLAIM-128`
- **entity ID:** `FN-A1-CONFIRM-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-CONFIRM-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-129
- **Claim ID:** `CLAIM-129`
- **entity ID:** `FN-A1-CONFIRM-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-CONFIRM-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-CONFIRM-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-130
- **Claim ID:** `CLAIM-130`
- **entity ID:** `FN-A1-REPORT-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-REPORT-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-131
- **Claim ID:** `CLAIM-131`
- **entity ID:** `FN-A1-REPORT-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-REPORT-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-132
- **Claim ID:** `CLAIM-132`
- **entity ID:** `FN-A1-REPORT-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-REPORT-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-REPORT-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-133
- **Claim ID:** `CLAIM-133`
- **entity ID:** `FN-A1-TIME-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-TIME-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-134
- **Claim ID:** `CLAIM-134`
- **entity ID:** `FN-A1-TIME-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-TIME-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-135
- **Claim ID:** `CLAIM-135`
- **entity ID:** `FN-A1-TIME-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-TIME-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-TIME-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-136
- **Claim ID:** `CLAIM-136`
- **entity ID:** `FN-A1-FORM-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-FORM-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-137
- **Claim ID:** `CLAIM-137`
- **entity ID:** `FN-A1-FORM-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-FORM-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-138
- **Claim ID:** `CLAIM-138`
- **entity ID:** `FN-A1-FORM-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-FORM-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-FORM-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-139
- **Claim ID:** `CLAIM-139`
- **entity ID:** `FN-A1-READ-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-READ-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-140
- **Claim ID:** `CLAIM-140`
- **entity ID:** `FN-A1-READ-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-READ-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-141
- **Claim ID:** `CLAIM-141`
- **entity ID:** `FN-A1-READ-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-READ-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-READ-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-142
- **Claim ID:** `CLAIM-142`
- **entity ID:** `FN-A1-REG-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-REG-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-143
- **Claim ID:** `CLAIM-143`
- **entity ID:** `FN-A1-REG-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-REG-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-144
- **Claim ID:** `CLAIM-144`
- **entity ID:** `FN-A1-REG-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-REG-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-REG-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-145
- **Claim ID:** `CLAIM-145`
- **entity ID:** `FN-A1-NARRATE-01`
- **Точное проверяемое утверждение:** Source anchor CEFR для `FN-A1-NARRATE-01` соответствует конкретной шкале/дескриптору CEFR Companion Volume уровня A1.
- **Тип утверждения:** fn_cefr_anchor
- **source ID:** `SRC-CEFR-CV`
- **URL:** https://www.coe.int/en/web/common-european-framework-reference-languages
- **Документ:** CEFR Companion Volume
- **Точное место:** Точная scale row / descriptor ID — не сверена
- **evidence class:** `CEFR_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** В inventory помечено REQUIRES VERIFICATION; не подменять качественным сходством.

### CLAIM-146
- **Claim ID:** `CLAIM-146`
- **entity ID:** `FN-A1-NARRATE-01`
- **Точное проверяемое утверждение:** Source anchor Dz.U./Katalog для `FN-A1-NARRATE-01` соответствует конкретной теме/умению załącznik nr 1 уровня A.
- **Тип утверждения:** fn_dzu_anchor
- **source ID:** `SRC-DZU-217-ZAL1`
- **URL:** https://dziennikustaw.gov.pl/D2025000021701.pdf
- **Документ:** Dz.U. 2025 poz. 217 załącznik nr 1
- **Точное место:** Точная тема Katalog umiejętności A / клетка — не сверена
- **evidence class:** `NORMATIVE_DIRECT`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Тематические ярлыки в FN — гипотезы покрытия до поклеточной сверки.

### CLAIM-147
- **Claim ID:** `CLAIM-147`
- **entity ID:** `FN-A1-NARRATE-01`
- **Точное проверяемое утверждение:** Критичность / can-do / completion criterion `FN-A1-NARRATE-01` отражают продуктовую необходимость первой аудитории SŁOWARIUM, а не дословную норму.
- **Тип утверждения:** fn_product_layer
- **source ID:** `SRC-PRODUCT-A1`
- **URL:** docs/requirements/curriculum/functional-inventory.md
- **Документ:** functional-inventory.md (A1)
- **Точное место:** Карточка `FN-A1-NARRATE-01` — поля Criticality / Completion / PRODUCT ANALYSIS
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Текст карточки существует; методическая адекватность — JPJO (NOT_REVIEWED).

### CLAIM-148
- **Claim ID:** `CLAIM-148`
- **entity ID:** `SCN-A1-EVERYDAY-01`
- **Точное проверяемое утверждение:** `SCN-A1-EVERYDAY-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-EVERYDAY-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-149
- **Claim ID:** `CLAIM-149`
- **entity ID:** `SCN-A1-SHOP-01`
- **Точное проверяемое утверждение:** `SCN-A1-SHOP-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-SHOP-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-150
- **Claim ID:** `CLAIM-150`
- **entity ID:** `SCN-A1-FOOD-01`
- **Точное проверяемое утверждение:** `SCN-A1-FOOD-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-FOOD-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-151
- **Claim ID:** `CLAIM-151`
- **entity ID:** `SCN-A1-TICKET-01`
- **Точное проверяемое утверждение:** `SCN-A1-TICKET-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-TICKET-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-152
- **Claim ID:** `CLAIM-152`
- **entity ID:** `SCN-A1-DIRECTIONS-01`
- **Точное проверяемое утверждение:** `SCN-A1-DIRECTIONS-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-DIRECTIONS-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-153
- **Claim ID:** `CLAIM-153`
- **entity ID:** `SCN-A1-HOUSING-01`
- **Точное проверяемое утверждение:** `SCN-A1-HOUSING-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-HOUSING-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-154
- **Claim ID:** `CLAIM-154`
- **entity ID:** `SCN-A1-URZAD-01`
- **Точное проверяемое утверждение:** `SCN-A1-URZAD-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-URZAD-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-155
- **Claim ID:** `CLAIM-155`
- **entity ID:** `SCN-A1-MED-01`
- **Точное проверяемое утверждение:** `SCN-A1-MED-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-MED-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-156
- **Claim ID:** `CLAIM-156`
- **entity ID:** `SCN-A1-EMERGENCY-01`
- **Точное проверяемое утверждение:** `SCN-A1-EMERGENCY-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-EMERGENCY-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-157
- **Claim ID:** `CLAIM-157`
- **entity ID:** `SCN-A1-WORK-01`
- **Точное проверяемое утверждение:** `SCN-A1-WORK-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-WORK-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-158
- **Claim ID:** `CLAIM-158`
- **entity ID:** `SCN-A1-SCHOOL-01`
- **Точное проверяемое утверждение:** `SCN-A1-SCHOOL-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-SCHOOL-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-159
- **Claim ID:** `CLAIM-159`
- **entity ID:** `SCN-A1-PHONE-01`
- **Точное проверяемое утверждение:** `SCN-A1-PHONE-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-PHONE-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-160
- **Claim ID:** `CLAIM-160`
- **entity ID:** `SCN-A1-SMS-01`
- **Точное проверяемое утверждение:** `SCN-A1-SMS-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-SMS-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-161
- **Claim ID:** `CLAIM-161`
- **entity ID:** `SCN-A1-BANK-01`
- **Точное проверяемое утверждение:** `SCN-A1-BANK-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-BANK-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-162
- **Claim ID:** `CLAIM-162`
- **entity ID:** `SCN-A1-NEIGHBOR-01`
- **Точное проверяемое утверждение:** `SCN-A1-NEIGHBOR-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-NEIGHBOR-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-163
- **Claim ID:** `CLAIM-163`
- **entity ID:** `SCN-A1-FORM-01`
- **Точное проверяемое утверждение:** `SCN-A1-FORM-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-FORM-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-164
- **Claim ID:** `CLAIM-164`
- **entity ID:** `SCN-A1-WRITE-SELF-01`
- **Точное проверяемое утверждение:** `SCN-A1-WRITE-SELF-01` реалистичен для взрослой мигрантской аудитории в Польше на уровне A1 и покрывает заявленный продуктовый домен без завышения CEFR.
- **Тип утверждения:** scn_audience_fit
- **source ID:** `SRC-PRODUCT-SCN`
- **URL:** docs/curriculum/scenario-inventory.md
- **Документ:** scenario-inventory.md
- **Точное место:** Карточка `SCN-A1-WRITE-SELF-01`
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Нужна экспертная оценка реалистичности и границ A1 (см. JPJO packet).

### CLAIM-165
- **Claim ID:** `CLAIM-165`
- **entity ID:** `LEX-A1-IDENTITY`
- **Точное проверяемое утверждение:** `LEX-A1-IDENTITY` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-IDENTITY`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-166
- **Claim ID:** `CLAIM-166`
- **entity ID:** `LEX-A1-WORK`
- **Точное проверяемое утверждение:** `LEX-A1-WORK` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-WORK`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-167
- **Claim ID:** `CLAIM-167`
- **entity ID:** `LEX-A1-HOUSING`
- **Точное проверяемое утверждение:** `LEX-A1-HOUSING` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-HOUSING`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-168
- **Claim ID:** `CLAIM-168`
- **entity ID:** `LEX-A1-ADDRESS`
- **Точное проверяемое утверждение:** `LEX-A1-ADDRESS` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-ADDRESS`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-169
- **Claim ID:** `CLAIM-169`
- **entity ID:** `LEX-A1-GREETINGS`
- **Точное проверяемое утверждение:** `LEX-A1-GREETINGS` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-GREETINGS`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-170
- **Claim ID:** `CLAIM-170`
- **entity ID:** `LEX-A1-REPAIR`
- **Точное проверяемое утверждение:** `LEX-A1-REPAIR` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-REPAIR`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-171
- **Claim ID:** `CLAIM-171`
- **entity ID:** `LEX-A1-MONEY`
- **Точное проверяемое утверждение:** `LEX-A1-MONEY` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-MONEY`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-172
- **Claim ID:** `CLAIM-172`
- **entity ID:** `LEX-A1-SERVICE`
- **Точное проверяемое утверждение:** `LEX-A1-SERVICE` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-SERVICE`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-173
- **Claim ID:** `CLAIM-173`
- **entity ID:** `LEX-A1-TRANSPORT`
- **Точное проверяемое утверждение:** `LEX-A1-TRANSPORT` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-TRANSPORT`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-174
- **Claim ID:** `CLAIM-174`
- **entity ID:** `LEX-A1-HEALTH`
- **Точное проверяемое утверждение:** `LEX-A1-HEALTH` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-HEALTH`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-175
- **Claim ID:** `CLAIM-175`
- **entity ID:** `LEX-A1-HELP`
- **Точное проверяемое утверждение:** `LEX-A1-HELP` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-HELP`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-176
- **Claim ID:** `CLAIM-176`
- **entity ID:** `LEX-A1-DOCS`
- **Точное проверяемое утверждение:** `LEX-A1-DOCS` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-DOCS`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-177
- **Claim ID:** `CLAIM-177`
- **entity ID:** `LEX-A1-URZAD`
- **Точное проверяемое утверждение:** `LEX-A1-URZAD` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-URZAD`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-178
- **Claim ID:** `CLAIM-178`
- **entity ID:** `LEX-A1-PHONE`
- **Точное проверяемое утверждение:** `LEX-A1-PHONE` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-PHONE`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-179
- **Claim ID:** `CLAIM-179`
- **entity ID:** `LEX-A1-POLITENESS`
- **Точное проверяемое утверждение:** `LEX-A1-POLITENESS` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-POLITENESS`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-180
- **Claim ID:** `CLAIM-180`
- **entity ID:** `LEX-A1-APOLOGY`
- **Точное проверяемое утверждение:** `LEX-A1-APOLOGY` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-APOLOGY`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-181
- **Claim ID:** `CLAIM-181`
- **entity ID:** `LEX-A1-TIME`
- **Точное проверяемое утверждение:** `LEX-A1-TIME` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-TIME`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-182
- **Claim ID:** `CLAIM-182`
- **entity ID:** `LEX-A1-SIGNS`
- **Точное проверяемое утверждение:** `LEX-A1-SIGNS` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-SIGNS`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-183
- **Claim ID:** `CLAIM-183`
- **entity ID:** `LEX-A1-SCHOOL`
- **Точное проверяемое утверждение:** `LEX-A1-SCHOOL` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-SCHOOL`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-184
- **Claim ID:** `CLAIM-184`
- **entity ID:** `LEX-A1-BANK`
- **Точное проверяемое утверждение:** `LEX-A1-BANK` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-BANK`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-185
- **Claim ID:** `CLAIM-185`
- **entity ID:** `LEX-A1-ROUTINE`
- **Точное проверяемое утверждение:** `LEX-A1-ROUTINE` содержит достаточный и семантически корректный минимум lemmas/MWU/FIX/COLL для связанных FN/SCN без DEFAULT-заглушек.
- **Тип утверждения:** lex_bundle_adequacy
- **source ID:** `SRC-PRODUCT-LEX`
- **URL:** docs/requirements/curriculum/lexical-targets.md
- **Документ:** lexical-targets.md — A1 LEX bundles
- **Точное место:** Карточка `LEX-A1-ROUTINE`
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурная полнота полей проверена validator'ом; педагогическая достаточность — JPJO.

### CLAIM-186
- **Claim ID:** `CLAIM-186`
- **entity ID:** `FN-A1-REPORT-01`
- **Точное проверяемое утверждение:** Слияние бывших доменов «usterka жилья» и «nieobecność ребёнка в школе» в одну каноническую функцию REPORT корректно методически.
- **Тип утверждения:** merge_decision
- **source ID:** `SRC-MIGRATION-A1`
- **URL:** docs/curriculum/functional-migration-a1.md
- **Документ:** functional-migration-a1.md
- **Точное место:** Строки миграции → FN-A1-REPORT-01; SCN-HOUSING / SCN-SCHOOL
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Продуктовый SPLIT контекста в SCN сохранён; оценка merge — JPJO.

### CLAIM-187
- **Claim ID:** `CLAIM-187`
- **entity ID:** `FN-A1-TRANS-01`
- **Точное проверяемое утверждение:** Единая транзакционная функция для магазина/еды/билета корректнее трёх отдельных FN.
- **Тип утверждения:** merge_decision
- **source ID:** `SRC-MIGRATION-A1`
- **URL:** docs/curriculum/functional-migration-a1.md
- **Документ:** functional-migration-a1.md
- **Точное место:** SHOP/FOOD/TICKET → SCN + FN-A1-TRANS-01
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Medium
- **verification status:** `PARTIALLY_VERIFIED`
- **дата проверки:** 2026-09-05
- **замечание:** Архитектурно согласовано с entity-definitions; JPJO может потребовать split.

### CLAIM-188
- **Claim ID:** `CLAIM-188`
- **entity ID:** `GR-MOD-IMP-01`
- **Точное проверяемое утверждение:** На A1 достаточно formulaic imperative в FIX; системный GR-MOD-IMP-01 остаётся A2 и не является late prerequisite канонических FN.
- **Тип утверждения:** imp_policy
- **source ID:** `SRC-PRODUCT-GRAMMAR`
- **URL:** docs/requirements/curriculum/grammar-inventory.md
- **Документ:** grammar-inventory + A1 FN Concepts notes
- **Точное место:** Intro level GR-MOD-IMP-01; примечания в FN без ID IMP
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Не кодировать в validator как истину; вопрос JPJO.

### CLAIM-189
- **Claim ID:** `CLAIM-189`
- **entity ID:** `PRAG-SOFTEN-01`
- **Точное проверяемое утверждение:** Системный SOFTEN не Required на A1; смягчение покрывается лексикой/PRAG-PAN.
- **Тип утверждения:** soften_policy
- **source ID:** `SRC-PRODUCT-PRAG`
- **URL:** docs/requirements/curriculum/concept-extensions.md
- **Документ:** concept-extensions.md
- **Точное место:** Intro/Exit PRAG-SOFTEN-01 (если есть) vs A1 FN REQUEST/REFUSE
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Открытый методический вопрос пакета JPJO.

### CLAIM-190
- **Claim ID:** `CLAIM-190`
- **entity ID:** `GR-DAT-EXP-01`
- **Точное проверяемое утверждение:** Экспериенцер *boli mnie* допустим формульно на A1 без системного DAT-EXP Required.
- **Тип утверждения:** dat_exp_policy
- **source ID:** `SRC-PRODUCT-GRAMMAR`
- **URL:** docs/requirements/curriculum/grammar-inventory.md
- **Документ:** grammar-inventory + FN-A1-HEALTH-01
- **Точное место:** Intro GR-DAT-EXP-01; карточка HEALTH
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Открытый методический вопрос пакета JPJO.

### CLAIM-191
- **Claim ID:** `CLAIM-191`
- **entity ID:** `ASM-005`
- **Точное проверяемое утверждение:** Числовые mastery thresholds (Important % и т.п.) калиброваны и готовы к публикации.
- **Тип утверждения:** mastery_calibration
- **source ID:** `SRC-DEC-003`
- **URL:** docs/requirements/11-open-decisions.md
- **Документ:** 11-open-decisions.md / level-exit-criteria.md
- **Точное место:** DEC-003 Assumed; ASM-005 ranges
- **evidence class:** `PRODUCT_ANALYSIS`
- **confidence:** Low
- **verification status:** `NOT_SUPPORTED`
- **дата проверки:** 2026-09-05
- **замечание:** Пороги провизорные (Assumed). Публикация контента не опирается на них как на норму.

### CLAIM-192
- **Claim ID:** `CLAIM-192`
- **entity ID:** `L1-ERR-SET-A1`
- **Точное проверяемое утверждение:** 31 ERR в канонических A1-цепочках корректно дифференцируют UKR/RUS/BEL без русскоцентричного сведения UKR/BEL к RUS.
- **Тип утверждения:** l1_mapping
- **source ID:** `SRC-L1-MODEL`
- **URL:** docs/requirements/curriculum/l1-error-model.md
- **Документ:** l1-error-model.md + a1-traceability ERR used
- **Точное место:** 31 ERR IDs в разделе ERR used in canonical A1 chains
- **evidence class:** `EXPERT_JUDGMENT_REQUIRED`
- **confidence:** Low
- **verification status:** `REQUIRES_VERIFICATION`
- **дата проверки:** 2026-09-05
- **замечание:** Структурный счётчик 31 зафиксирован; семантическая валидность — JPJO.
