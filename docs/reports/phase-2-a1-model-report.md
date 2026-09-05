# Phase 2 — отчёт по семантической модели A1

**Ветка:** `docs/phase-2-integrity-fix`
**Базовый коммит:** `10ed7f340491a817de338970219ca0591dcc1ec8`
**Дата:** 2026-09-05
**Статус A1:** **candidate for human review** (не публикация; обязателен независимый JPJO-gate)
**Статус A2–B2:** **pending semantic migration** — **не** объявлены завершёнными
**Validator OK:** означает только structural / anti-pattern checks, **не** педагогическую корректность

---

## 1. Проблема старой модели

Пространство `FN-A1-001…042` смешивало:

1. настоящие коммуникативные функции / речевые акты;
2. жизненные и продуктовые сценарии (магазин, еда, билет, urząd);
3. учебные / экзаменационные задания (письмо о себе, przelew по шаблону).

Из-за этого completion criteria, LEX-пакеты и source anchors заполнялись шаблонами. Structural validator мог проходить при содержательно неверной модели.

Это **не** MVP и не сокращение продукта: цель — эталонная архитектура A1 до масштабирования на A2–B2.

---

## 2. Принятые определения

| Сущность | Определение |
| --- | --- |
| `FN-*` | Каноническая коммуникативная функция / речевой акт, переносимый между контекстами |
| `SCN-*` | Жизненный / продуктовый сценарий, использующий одну или несколько FN |
| `ASM-*` | Задание оценивания / метаучебное действие продукта |
| `EXM-*` | Экзаменационный ориентир / формат (не бытовой речевой акт) |

Полные определения: `docs/curriculum/entity-definitions.md`.

---

## 3. Before / after counts

| Объект | До | После |
| --- | ---: | ---: |
| A1 записи в пространстве FN | **42** (смешанные) | **30** канонических FN |
| SCN A1 | 0 (как сущность) | **17** |
| ASM A1 | 0 (в FN-пространстве) | **5** |
| EXM A1 | 0 (как сущность) | **5** |
| A1 LEX working bundles | ~40 микропакетов + DEFAULT | **21** `LEX-A1-*` |
| A1 Required concepts coverage | механическая / неполная | **46/46** в `a1-traceability.md` |

A2–B2 FN остаются в `functional-inventory.md` под баннером **LEGACY — pending semantic migration**.

---

## 4. Таблица миграции

Полная построчная миграция 42 → FN/SCN/ASM/EXM:
[`docs/curriculum/functional-migration-a1.md`](../curriculum/functional-migration-a1.md).

Ключевые решения:

| Старая логика | Решение |
| --- | --- |
| Магазин / еда / билет как 3 FN | `SCN-*` + общая `FN-A1-TRANS-01` |
| Вопросы о наличии | merge → `FN-A1-ASK-01` |
| Бланк / недостающий документ | merge → `FN-A1-DOCS-01` |
| Usterka + отсутствие ребёнка | merge → `FN-A1-REPORT-01` |
| Письмо 3–5 предложений о себе | `ASM-A1-WRITE-SELF-01` + `SCN-A1-WRITE-SELF-01` |
| Przelew по образцу | `SCN-A1-BANK-01` + `ASM-A1-FORM-FOLLOW-01` |

**Потерянных продуктовых результатов:** 0 (контекст сохранён в SCN/ASM).

---

## 5. Объединённые функции (ядро)

Примеры merge (не полный список — см. migration file):

- `FN-A1-ASK-01` — запрос информации / наличия;
- `FN-A1-TRANS-01` — сервисная транзакция;
- `FN-A1-DOCS-01` — документы + бланк;
- `FN-A1-REPORT-01` — сообщение о событии (жильё / школа);
- `FN-A1-POLITENESS`-связанные акты разделены на REQUEST / REFUSE / THANKS / APOLOGY / CONFIRM, а не на доменные «копии».

---

## 6. Созданные сценарии A1 (17)

`SCN-A1-EVERYDAY-01`, `SHOP-01`, `FOOD-01`, `TICKET-01`, `DIRECTIONS-01`, `HOUSING-01`, `URZAD-01`, `MED-01`, `EMERGENCY-01`, `WORK-01`, `SCHOOL-01`, `PHONE-01`, `SMS-01`, `BANK-01`, `NEIGHBOR-01`, `FORM-01`, `WRITE-SELF-01`.

Инвентарь: `docs/curriculum/scenario-inventory.md`.

Покрытие доменов в пределах A1: повседневность, покупки, жильё, транспорт, работа, здоровье, urząd, базовое социальное взаимодействие (+ банк/школа/телефон как продуктовые приоритеты первой аудитории).

---

## 7. Покрытие Required-концептов A1

| Метрика | Значение |
| --- | --- |
| A1 Required (GR + PHON/ORTH/PRAG) | **46** |
| Связаны с ≥1 FN или SCN | **46/46 (100%)** |
| Supporting без прямой связи | индивидуальные причины в `a1-traceability.md` (не один boilerplate) |

Цепочка: `SCN → FN → concepts → LEX → ERR → evidence → exit`.

---

## 8. Результаты проверки LEX A1

- Консолидация в `LEX-A1-*` (21 пакет).
- `LEX-A1-ADDRESS` покрывает улицу, дом, квартиру, этаж, город и диктовку.
- `LEX-A1-APOLOGY` — извинение (*przepraszam…*), не рекламация.
- Запрещены в A1 working set: `DEFAULT`, «сценарийный минимум по связанным FN», пустые MWU/FIX/COLL.
- Legacy A2+ реестр сохранён отдельно и **не** объявлен готовым.

---

## 9. Validator

Обновлён `scripts/validate-curriculum.py`:

- различает FN / SCN / ASM / EXM;
- **не** фиксирует ожидаемые количества сущностей;
- проверяет полный A1 trace (`a1-traceability.md`);
- late prerequisites;
- связь каждого A1 Required-концепта;
- placeholders и timed-scenario templates **на A1**;
- нормализация completion criteria + топ повторов;
- распределение FN по числу SCN; SCN без FN / FN без SCN;
- LEX-A1 без содержательных MWU/FIX/COLL;
- ненулевой exit при критических нарушениях;
- явная оговорка: OK ≠ педагогическая корректность.

Результаты конкретного прогона фиксируются в финальном ответе коммита / CI-логе.

---

## 10. Нерешённые нормативные и методические вопросы

1. Точные ячейки Dz.U. 2025 poz. 217 и CEFR/CV scale rows — многие anchors помечены `REQUIRES VERIFICATION`.
2. `DEC-016`: кто именно проводит независимый JPJO review.
3. Калибровка порогов Important / lexical size / mastery %.
4. Нужен ли системный `GR-MOD-IMP-01` на A1 vs formulaic IMP.
5. Семантическая миграция A2–B2 (включая очистку legacy DEFAULT LEX).
6. Обновление `curriculum-traceability.md` A1-строк под новые ID (рабочий эталон A1 — `docs/curriculum/a1-traceability.md`).

---

## 11. Ограничения автоматической проверки

Validator ловит структуру, антипаттерны и пробелы связей. Он **не** доказывает:

- методическую адекватность can-do;
- достаточность лексики для реальной аудитории;
- корректность CEFR/Dz.U. цитирования без ручной сверки;
- готовность к публикации учебного контента.

---

## 12. Решение о готовности A1

| Вопрос | Решение |
| --- | --- |
| A1 semantic reference slice | **candidate for human review** |
| Готов к публикации без JPJO | **нет** |
| A2–B2 semantic migration | **pending** — не завершены |
| Следующий обязательный gate | независимая проверка JPJO-методистом |

---

## 13. Связанные артефакты

- `docs/curriculum/entity-definitions.md`
- `docs/curriculum/functional-migration-a1.md`
- `docs/curriculum/scenario-inventory.md`
- `docs/curriculum/asm-exm-a1.md`
- `docs/curriculum/a1-traceability.md`
- `docs/requirements/curriculum/functional-inventory.md` (A1 канон)
- `docs/requirements/curriculum/lexical-targets.md` (A1 LEX)
- `docs/requirements/curriculum/concept-extensions.md` (PHON-CORE-01)
- `scripts/validate-curriculum.py`
