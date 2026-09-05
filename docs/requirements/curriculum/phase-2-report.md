# Phase 2 report — педагогическая архитектура A1–B2

**Дата:** 2026-09-05  
**Baseline требований:** редакция 2  
**Статус артефактов:** Phase 2 **draft** — публикация учебного контента только после независимого JPJO review (`DEC-016`).  
**Код / ERD / API / архитектура / Figma / development tasks:** не создавались.

---

## 1. Созданные и изменённые файлы

### Созданы

| Файл | Назначение |
| --- | --- |
| `docs/requirements/curriculum/sources-and-evidence.md` | Политика доказательств и реестр источников |
| `docs/requirements/curriculum/methodology.md` | Методическая система (смесь подходов) |
| `docs/requirements/curriculum/review-checklist.md` | QA + чеклист методиста JPJO |
| `docs/requirements/curriculum/curriculum-traceability.md` | Карта связей (52 цепи) |
| `docs/requirements/curriculum/phase-2-report.md` | Этот отчёт |

### Переписаны (были заглушки)

| Файл | Содержание |
| --- | --- |
| `docs/requirements/curriculum/grammar-inventory.md` | 110 концептов A1–B2 |
| `docs/requirements/curriculum/case-aspect-sequence.md` | Последовательность падежей + путь аспекта |
| `docs/requirements/curriculum/functional-inventory.md` | 195 коммуникативных функций |
| `docs/requirements/curriculum/lexical-targets.md` | Лексическая архитектура + рабочие диапазоны |
| `docs/requirements/curriculum/level-exit-criteria.md` | Exit criteria + 3 слоя достижения |
| `docs/requirements/curriculum/l1-error-model.md` | 72 ошибки (24×UKR/RUS/BEL) |

### Точечные правки пакета требований (§0)

| Файл | Что изменено |
| --- | --- |
| `docs/requirements/07-exam-preparation-requirements.md` | `standard_status` + `session_availability`; A1 не `historical`; A2 = уровень есть, сессия 2026 нет |
| `docs/requirements/00-product-vision.md` | BUS-004 AC под новую модель статусов |
| `docs/requirements/12-requirements-traceability-matrix.md` | Полная синхронизация с ред. 2; снята пометка «устарела» |
| `docs/requirements/15-revision-2-report.md` | Убраны `_inject_priority.py` и «матрица частично устарела»; статусы экзамена обновлены |
| `docs/requirements/11-open-decisions.md` | Phase 2 ops locks |
| `docs/requirements/10-scope-phasing-and-dependencies.md` | §10.8: draft вместо заглушек |
| `docs/requirements/04-pedagogical-requirements.md` | PED-015 → Phase 2 draft |
| `docs/requirements/README.md` | Дерево curriculum + статусы |

---

## 2. Количество концептов по уровню первого введения

Источник: `grammar-inventory.md` §1.

| Уровень | Концептов |
| ---: | ---: |
| A1 | 58 |
| A2 | 26 |
| B1 | 18 |
| B2 | 8 |
| **Всего** | **110** |

Наличие в инвентаре ≠ полное освоение уровня.

---

## 3. Количество функций по уровню

Источник: `functional-inventory.md` §2 (ID `FN-*`).

| Уровень | FN-* |
| ---: | ---: |
| A1 | 42 |
| A2 | 48 |
| B1 | 55 |
| B2 | 50 |
| **Всего** | **195** |

Дополнительно на каждом уровне — перечни сценариев, речевых актов, жанров, прагматики, регистра, компенсаций, R/L без отдельной нумерации FN.

---

## 4. Количество ошибок по каждому L1

Источник: `l1-error-model.md`.

| L1 | Карточки | Диапазон ID |
| --- | ---: | --- |
| Украинский | 24 | ERR-UKR-01…24 |
| Русский | 24 | ERR-RUS-01…24 |
| Белорусский | 24 | ERR-BEL-01…24 |
| **Всего** | **72** | |

Списки не являются copy-paste с заменой языка: UKR — *і/и*; RUS — утраченный voc / *ы* / *ь*; BEL — аканне / *ў* / ранний `h/ch`.

---

## 5. Непроверенные утверждения (сводка)

Помечены в корпусе как `REQUIRES VERIFICATION` / `EXPERT VALIDATION REQUIRED` / `CALIBRATION=required`:

1. **Номера страниц** описательных грамматик (Swan, Nagórko и др.) — явления Medium, страницы не сверены с экземпляром.
2. **Большинство карточек L1-ошибок** — механизм переноса правдоподобен, но частота/тяжесть требуют JPJO / classroom validation (`EXPERT VALIDATION REQUIRED`).
3. **Численные lexical ranges** (`WR-PROD-*`, `WR-RECP-*`) — внутренние рабочие диапазоны, не CEFR.
4. **Внутренние пороги summative** в `level-exit-criteria.md` — provisional, калибровка обязательна.
5. **Конкретные частоты** rekcja / false friends без корпусной сверки.
6. **Сверка покрытия** каждой клетки Katalog A/B załącznik ↔ FN/GR — матрица покрытия как отдельный operational pass после JPJO (сейчас семантическая трассировка в `curriculum-traceability.md`).
7. **Расписание сессий** после 2026-09-05 — `session_availability` может измениться; нужна повторная проверка перед exam-маркетингом.

Запрещено выдавать пункты 3–4 за нормы CEFR или закон.

---

## 6. Найденные методические конфликты

| Конфликт | Как снят / статус |
| --- | --- |
| Традиционный порядок падежей учебника vs частотность/быт мигранта | Зафиксирован **компромисс** в `case-aspect-sequence.md` (Nom→Acc→Loc→Gen→Ins→Voc; Dat на A2) + сравнение с 2 альтернативами |
| «Аспект переносится с East Slavic» | **Явно отвергнуто**; отдельный путь аспекта A1→B2 |
| Учебный exit vs госэкзамен vs internal test | Три слоя в `level-exit-criteria.md`; A1/A2 не = сессия 2026 |
| Существование уровня A2 vs отсутствие сессии 2026 | Два поля статуса в `07` и exit criteria |
| ID грамматики в FN (`GR-CASE-NOM`) vs inventory (`GR-CAS-NOM-01`) | Допущено как interim semantic tags; выравнивание — перед authoring |
| AI-draft curriculum vs публикация | Draft обязателен к JPJO; self-approve запрещён |
| Grammar-translation vs communicative | GT только contrastive limited; не каркас курса (`methodology.md`) |

Критичных неразрешённых противоречий между уровнями A1–B2 в draft не найдено; остаётся риск рассинхрона ID до нормализации.

---

## 7. Решения, требующие владельца (максимум три)

1. **DEC-016** — кто именно независимый методист JPJO (контракт / партнёр / ротация) в первые 12 месяцев. Без этого нельзя публиковать контент.
2. **DEC-007** — юридический контролёр GDPR перед публичным сбором данных/платежей.
3. **DEC-008 / DEC-013** — имя продукта и нужна ли юрконсультация перед публикацией справки о правовых эффектах B1.

**Уже зафиксировано Phase 2 ops (не требуют выбора «да/нет» сейчас):** автор = основатель + AI pipeline; AI feedback formative; confirmed writing/speaking = человек (платная функция); placement + первый модуль free; полная траектория + exam-mode paid; **конкретные тарифы не определять**.

---

## 8. `git diff --stat`

Репозиторий инициализирован; ветка `docs/requirements-r2`. Снимок staged изменений Phase 2:

```
 docs/requirements/00-product-vision.md             |    2 +-
 docs/requirements/04-pedagogical-requirements.md   |   16 +-
 docs/requirements/07-exam-preparation-requirements.md |   59 +-
 docs/requirements/10-scope-phasing-and-dependencies.md |   27 +-
 docs/requirements/11-open-decisions.md             |   63 +-
 docs/requirements/12-requirements-traceability-matrix.md |  111 +-
 docs/requirements/15-revision-2-report.md          |    8 +-
 docs/requirements/README.md                        |   24 +-
 docs/requirements/curriculum/case-aspect-sequence.md |  302 ++++-
 docs/requirements/curriculum/curriculum-traceability.md |  875 ++++++++++++++
 docs/requirements/curriculum/functional-inventory.md |  500 +++++++-
 docs/requirements/curriculum/grammar-inventory.md  | 1182 ++++++++++++++++++-
 docs/requirements/curriculum/l1-error-model.md     | 1216 +++++++++++++++++++-
 docs/requirements/curriculum/level-exit-criteria.md |  285 ++++-
 docs/requirements/curriculum/lexical-targets.md    |  240 +++-
 docs/requirements/curriculum/methodology.md        |  433 +++++++
 docs/requirements/curriculum/phase-2-report.md     |  182 +++
 docs/requirements/curriculum/review-checklist.md   |  240 ++++
 docs/requirements/curriculum/sources-and-evidence.md |  294 +++++
 19 files changed, 5902 insertions(+), 157 deletions(-)
```

---

## 9. Что сознательно не сделано

- Программный код, ERD, API, техническая архитектура
- Development tasks / backlog tickets
- Figma / UI-дизайн
- Phase 3 (ICE / обязательный набор XT)
- Утверждение syllabus как «официальной программы продукта» без JPJO

---

## 10. Рекомендуемый следующий шаг владельца

1. Назначить JPJO reviewer (`DEC-016`).
2. Прогнать `curriculum/review-checklist.md` (раздел методиста).
3. Только после pass — authoring первого вертикального модуля (не «вся A1 сразу»).
4. Phase 3 exercise catalogue — по отдельному поручению.
