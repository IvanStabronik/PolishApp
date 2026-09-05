# 15. Отчёт редакции 2 (2026-09-04)

Код, архитектура, ERD, API и Figma **не** создавались. Git-репозиторий в рабочей копии отсутствует → `git diff --stat` недоступен; ниже — перечень изменённых путей.

## 1. Изменённые / созданные файлы

**Изменены:**

- `docs/requirements/README.md`
- `docs/requirements/00-product-vision.md`
- `docs/requirements/01-users-jobs-personas.md`
- `docs/requirements/02-product-principles.md`
- `docs/requirements/03-functional-requirements.md`
- `docs/requirements/04-pedagogical-requirements.md`
- `docs/requirements/05-content-requirements.md`
- `docs/requirements/06-assessment-requirements.md`
- `docs/requirements/07-exam-preparation-requirements.md`
- `docs/requirements/08-non-functional-requirements.md`
- `docs/requirements/09-accessibility-i18n-privacy.md`
- `docs/requirements/10-scope-phasing-and-dependencies.md`
- `docs/requirements/11-open-decisions.md`
- `docs/requirements/12-requirements-traceability-matrix.md` (частично устаревает относительно ред. 2; индекс 14 — авторитетен для stage)

**Созданы:**

- `docs/requirements/13-validation-register.md`
- `docs/requirements/14-priority-stage-index.md`
- `docs/requirements/15-revision-2-report.md`
- `docs/requirements/curriculum/*.md` (6 заглушек Phase 2)

**Вспомогательный скрипт (можно удалить):** `docs/requirements/_inject_priority.py`

## 2. Распределение приоритетов и этапов

По индексу 238 атомарных требований (`14-priority-stage-index.md`):

| Поле | Распределение |
| --- | --- |
| Target necessity | Mandatory 131 · Important 102 · Optional 5 |
| Delivery stage | V0 38 · V1 107 · V2 46 · V3 10 · V4 26 · V5 4 · Later 7 |
| Priority | **Critical 66 (28%)** · Core 154 (65%) · Advanced 16 · Later 2 |

### Почему Critical+Core снова >50%

- **Critical сужен** до ~28% (закон/безопасность/непроверенный контент/ложный уровень/потеря данных/утрата польской системности). Это уже не «всё Critical».
- **Core остаётся широким**, потому что целевое состояние — полная A1–B2-платформа первой аудитории: большинство Mandatory/Important требований цели всё ещё Core по определению «нужно для целевого продукта», а не Advanced.
- **Дискриминирующие поля теперь** `Target necessity` + `Delivery stage` (что обязательно и когда поставляется). Старый Priority один больше не планирует релиз.

Механическая квота «≤50% Core» ломала бы целевую спецификацию без урезания A1–B2.

## 3. Удалённые / превращённые в assumption / смягчённые требования

| Было | Стало |
| --- | --- |
| Обязательный concept graph как технология | FUN-030: объяснимая траектория; реализация — архитектура |
| Обязательный полноценный authoring cabinet | FUN-170: workflow автора; форма — архитектура; V0 = min content-production |
| correlation id | NFR-007: идентификатор сессии/запроса без предписания формата |
| Жёсткие enum статусов mastery/publication как требования | FUN-080 / FUN-173: жизненный цикл и объяснимые состояния; имена — архитектура |
| Entitlements как выбранная реализация | FUN-200: управление доступом; реализация — архитектура |
| Глобальный AI switch как механизм | NFR-004 / FUN-066: отключаемость и квота; механизм — архитектура |
| «≥1 пример = тип реализован» + ≥40 XT обязательны | CNT-017 / PED-022: каталог кандидатов; Phase 3 |
| A1 как текущая exam-prep | BUS-004 / EXM-001 / EXM-012 / EXM-016: standards-aligned / future |
| «10/15 мин чистого высказывания» | EXM-006: лимит **всей** устной части по § 17 |
| Consent = единственное основание голоса | SEC-002 / SEC-005: основание по цели; GDPR specialist; серверное хранение off |
| DEC-004 / DEC-005 как блокирующие вопросы | Locked working decisions |
| «Источник: Бриф» на непрямых решениях | `ASSUMPTION` / `PRODUCT ANALYSIS` / `REQUIRES USER VALIDATION` (массово) |

## 4. Исправленные нормативные утверждения

| Утверждение | Исправление | Источник / дата / статус |
| --- | --- | --- |
| Exam-prep A1–B2 как текущий госэкзамен | A1 не в гармониграмме взрослых сессий 2026 → не текущая exam-prep | certyfikatpolski.pl terminy 2026; проверка **2026-09-04**; A1: `historical`/`requires_recheck`; B1/B2: `current` |
| A2 доступность | В гармониграмме 2026 взрослых не найден → `requires_recheck` | тот же источник |
| Пороги § 23 | Без изменения смысла; добавлены статусы нормы `current` | Dz.U. 2025 poz. 217 |
| Устная часть | Потолок всей части ≤10 / ≤15 мин; без выдуманной подготовки | § 17; `current` |
| Legal uses B1 | Без изменения; дата recheck перед публикацией | EXM-013 |

## 5. Блокирующие решения владельца (≤3)

1. **DEC-016** — операционная модель независимого методиста (принцип обязателен).
2. **DEC-002** — кто ставит итоговый балл письма/речи в exam-mode.
3. **DEC-001** — утверждение коммерческой границы (working assumption: бесплатный placement уже зафиксирован).

## 6. git diff --stat

```
fatal: not a git repository
```

В `D:\MyProjects\PolishApp` нет `.git`. Чтобы получить diff: инициализировать репозиторий и закоммитить baseline, либо сравнить архивы `requirements.zip` до/после вручную.

## Прочие исправления дефектов

- PED-015: нет ложной «готовности syllabus»; Phase 2 stubs.
- PED-008: `może/morze` как омофоны, не морфологическое чередование; примеры *Bóg/Bogiem*, *waga/wadze*, *dąb/dęby*.
- NFR-005: убрана необоснованная зависимость DEC-004.
- ASM-016: «иное опубликованное правило».
- V1: сквозной сценарий регистрация → L1/цели → модуль → упражнения → feedback → прогресс.
- Privacy: не юридическое заключение.
- Validation register: HYP-001…007.
