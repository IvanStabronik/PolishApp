# A1 JPJO Review Packet — SŁOWARIUM

**Статус пакета:** готов к независимому review — **review не выполнен**.
**Бренд:** SŁOWARIUM · slug `slowarium`
**Канонические entity ID не переименованы под бренд.**
**A2–B2 semantic migration not started.**

## Frozen snapshot (не изменять без нового коммита модели)

| Объект | Count | Статус |
| --- | ---: | --- |
| Канонические FN A1 | **30** | candidate for review |
| SCN A1 | **17** | candidate for review |
| LEX-A1 bundles | **21** | candidate for review |
| ASM A1 | **5** | candidate for review |
| EXM A1 | **5** | standards-aligned / future; session A1 2026 not_announced |
| Required A1 concepts linked | **46/46** | structural link only |
| ERR in canonical A1 chains | **31** | semantic validation pending JPJO |
| A2–B2 | legacy | **pending semantic migration** |

Связанные файлы: `docs/curriculum/*`, `docs/reviews/a1-source-verification.md`, `docs/reports/phase-2-a1-review-readiness-report.md`.

## Инструкция ревьюеру

1. **Блокирующее замечание:** verdict `REJECT` или `NEEDS_EVIDENCE` + severity `blocker`; указать entity ID и что именно ломает публикацию или переход к A2.
2. **Split/merge:** в `proposed correction` дать целевые ID (`FN-…`/`SCN-…`), краткое обоснование и затронутые LEX/ERR; не переписывать всю модель вручную.
3. **Ссылка на источник:** использовать Claim ID из `a1-source-verification.md` или точный URL + locus; не ссылаться на «общее знание CEFR».
4. **Ошибка содержания vs продуктовая гипотеза:** содержание = язык/методика/норма; продукт = приоритет домена, commercial scope, UX. Гипотезу помечать `APPROVE_WITH_CHANGES` / обсуждение, не выдавать за норму.
5. **Что блокирует A2:** незакрытые blocker по границам FN/SCN, Required-классификации, ложным exam-claim, системным L1-искажениям UKR/BEL; незавершённый DEC-016 (операционная модель reviewer) блокирует **публикацию**, но пакет review можно вести.
6. **Запрещено:** ставить `APPROVE` от имени AI; менять snapshot counts без коммита модели.

## Reviewer matrix

| Review ID | Область | Проверяемое решение | Entity ID | Источник | Вопрос методисту | Verdict | Severity | Rationale | Proposed correction | Reviewer | Review date |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `REV-001` | FN inventory | Полнота и границы набора из 30 канонических FN A1 | `FN-A1-* (30)` | functional-inventory.md; entity-definitions.md | Достаточен ли набор 30 FN для instructional exit A1 первой аудитории без пробелов и без раздувания? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-002` | SCN inventory | Реалистичность 17 сценариев для взрослых в Польше | `SCN-A1-* (17)` | scenario-inventory.md | Какие SCN завышены относительно A1 или оторваны от реальной жизни мигранта? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-003` | FN merge | Слияние usterka + nieobecność ребёнка в FN-A1-REPORT-01 | `FN-A1-REPORT-01; SCN-A1-HOUSING-01; SCN-A1-SCHOOL-01` | functional-migration-a1.md | Оставить merge, split на две FN, или иначе переразметить SCN? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-004` | Criticality | Распределение Core / Important / Extension среди 30 FN | `FN-A1-* Criticality` | functional-inventory.md | Какие FN ошибочно Core или ошибочно Extension для exit A1? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-005` | Required concepts | Classification 46 Required A1 concepts | `GR/PHON/ORTH/PRAG Required A1 (46)` | grammar-inventory.md; concept-extensions.md; a1-traceability.md | Какие Required завышены/занижены? Нужны ли изменения Intro/Exit? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-006` | Grammar policy | Системный IMP на A1 vs formulaic imperative | `GR-MOD-IMP-01; FN-A1-REPAIR-01; FN-A1-HELP-01; FN-A1-DIRECT-01` | grammar-inventory.md; CLAIM imp_policy | Требовать ли системный IMP как Required A1? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-007` | Pragmatics policy | Необходимость SOFTEN на A1 | `PRAG-SOFTEN-01; FN-A1-REQUEST-01; FN-A1-REFUSE-01` | concept-extensions.md | Достаточны ли лексические маркеры вежливости без отдельного Required SOFTEN? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-008` | Grammar policy | Необходимость DAT-EXP на A1 | `GR-DAT-EXP-01; FN-A1-HEALTH-01` | grammar-inventory.md | Оставить *boli mnie* формульным или поднять DAT-EXP до A1 Required? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-009` | LEX | Достаточность 21 LEX-A1 bundle | `LEX-A1-* (21)` | lexical-targets.md | Какие пакеты нужно расширить/сжать/переименовать по смыслу? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-010` | L1 ERR | Семантическая корректность L1 ERR mapping UKR/RUS/BEL | `31 ERR used in A1 chains` | l1-error-model.md; a1-traceability.md | Где UKR/BEL ошибочно сведены к RUS-модели? Какие ERR ложные? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-011` | Assessment design | Completion criteria и blocking errors 30 FN | `FN-A1-* Completion / Blocking errors` | functional-inventory.md | Какие критерии ненаблюдаемы, шаблонны или педагогически слабы? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-012` | Mastery | Calibration mastery thresholds | `ASM-005; level-exit-criteria.md; DEC-003` | 11-open-decisions.md | Можно ли публиковать числовые пороги или они остаются provisional? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-013` | ASM vs EXM | Граница внутренних ASM и официальных EXM | `ASM-A1-*; EXM-A1-*` | asm-exm-a1.md; entity-definitions.md | Нет ли смешения учебного задания с официальным экзаменом? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-014` | Exam claims | Экзаменационные формулировки и disclaimer A1 | `EXM-A1-*; standard_status; session_availability` | 07-exam-preparation-requirements.md; CLAIM-001..005 | Корректны ли дисклеймеры? Нет ли обещания сессии 2026? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-015` | Audience | Доступность модели для взрослой мигрантской аудитории | `SCN-A1-*; FN-A1-*` | 00-product-vision.md; scenario-inventory.md | Где сценарии/лексика недоступны или стигматизируют аудиторию? | `NOT_REVIEWED` | — | — | — | — | — |
| `REV-016` | L1 equity | Отсутствие русскоцентричного представления UKR/BEL | `ERR-UKR-*; ERR-BEL-*; UI languages` | l1-error-model.md; 11-open-decisions.md | Равноценны ли UKR/BEL карточки RUS по глубине и примерам? | `NOT_REVIEWED` | — | — | — | — | — |

## Поля verdict

`APPROVE` · `APPROVE_WITH_CHANGES` · `REJECT` · `NEEDS_EVIDENCE` · `NOT_REVIEWED`

По умолчанию все строки = `NOT_REVIEWED`. Независимое одобрение AI **запрещено**.

**Число review items:** 16

## Blocking review items (до заполнения экспертом)

Число blocker = **0 зарегистрированных** (все `NOT_REVIEWED`). Публикация контента по-прежнему блокируется DEC-016 и незакрытыми нормативными CLAIM.
