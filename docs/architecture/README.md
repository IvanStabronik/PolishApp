# Архитектура SŁOWARIUM

**Продукт:** SŁOWARIUM (`slowarium`) — web-платформа системного изучения польского как иностранного для взрослых с L1 украинский / русский / белорусский.  
**Срез:** platform foundation v1 (ветка `feat/platform-foundation-v1`).  
**Статус документов:** Accepted как целевая архитектура foundation; код в `web/` ещё наращивается поверх каркаса Next.js.

Эти документы фиксируют **технические решения** поверх требований (`docs/requirements/`) и учебной модели (`docs/curriculum/`). Они не заменяют JPJO-review и не объявляют учебный контент утверждённым.

## Честные границы среза

| Тема | Факт на foundation v1 |
| --- | --- |
| Первый модуль *Pierwsze spotkanie* | Только **DRAFT** / внутренний preview; не публичный учебный путь |
| A1 semantic reference | Кандидат на human review; **не** JPJO-approved |
| A2–B2 | Semantic migration **не** объявлена выполненной |
| Публичный запуск | Нет; локальная разработка и внутренние проверки |
| Серверное хранение голоса | Выключено (`DEC-005`) |
| Generative AI в базовом пути | Выключен по умолчанию |

## Стек (зафиксирован ADR)

| Слой | Выбор |
| --- | --- |
| App | Next.js App Router, React, TypeScript `strict` |
| Пакеты | pnpm |
| БД | PostgreSQL |
| ORM / схема | Drizzle |
| Auth | Better Auth |
| Валидация | Zod |
| UI i18n | next-intl |
| Стили | Tailwind CSS |
| Unit / integration | Vitest |
| E2E | Playwright |
| Локальная БД | Docker Compose |

Монорепозиторий: учебные требования и curriculum в `docs/`; приложение — в `web/`; контент-as-code (YAML) и импорт — в последующих PR foundation.

## Карта документов

| Документ | Содержание |
| --- | --- |
| [system-context.md](system-context.md) | Modular monolith, домены, C4-context, trust boundary |
| [data-model.md](data-model.md) | ERD, UUID PK, канонические curriculum ID, UI locale vs L1 |
| [content-pipeline.md](content-pipeline.md) | YAML lifecycle, self-review ban, Zod → import → seed |
| [security-privacy.md](security-privacy.md) | Better Auth, авторизация на сервере, export/delete, AI off |
| [testing-strategy.md](testing-strategy.md) | Unit / integration / e2e / CI |
| [deployment.md](deployment.md) | Local Docker Postgres (legacy local-first notes) |
| [deployment-v1.md](deployment-v1.md) | Deployed private beta (M5) — portable Docker + migrate gate |
| [adr/](adr/) | Architecture Decision Records 001–011 |
| [metric-definitions.md](metric-definitions.md) | Privacy-preserving analytics metrics (M4) |
| [threat-model-m4.md](threat-model-m4.md) | Invite / admin / feedback threats (M4) |

## ADR

| ADR | Решение |
| --- | --- |
| [001](adr/001-modular-monolith.md) | Modular monolith, не микросервисы |
| [002](adr/002-postgresql-drizzle.md) | PostgreSQL + Drizzle |
| [003](adr/003-better-auth.md) | Better Auth |
| [004](adr/004-content-as-code.md) | Content-as-code (YAML) |
| [005](adr/005-i18n-and-l1-separation.md) | UI locale ≠ L1 методики |
| [006](adr/006-progress-from-evidence.md) | Progress из evidence, не из «урока пройден» |
| [007](adr/007-app-under-web-directory.md) | Приложение в `web/`, не в корне репо |
| [008](adr/008-learner-safe-exercise-dto.md) | Learner-safe exercise DTO |
| [009](adr/009-daily-plan.md) | Deterministic daily plan |
| [010](adr/010-invite-only-closed-beta.md) | Invite-only closed beta |
| [011](adr/011-privacy-preserving-analytics.md) | Privacy-preserving analytics |

## Отложенное (осознанно)

- Публичный хостинг, CDN, production secrets management, multi-region.
- Полноценный authoring CMS / admin SPA (V0 закрывается YAML + скрипты + preview).
- Billing / entitlements UI сверх минимальной границы `DEC-001`.
- Серверное хранение голоса и biometric flows.
- Item analysis, зрелый SRS UI, exam-mode B1/B2.
- Белорусский UI; английский UI.
- Graph DB, event bus, отдельные сервисы assessment/content.
- Утверждение полного набора XT-* (Phase 3 ICE).

## Связанные источники

- Видение и принципы: `docs/requirements/00-product-vision.md`, `02-product-principles.md`
- Scope вертикалей: `docs/requirements/10-scope-phasing-and-dependencies.md`
- Privacy / i18n: `docs/requirements/09-accessibility-i18n-privacy.md`
- Бренд: `docs/brand/brand-foundation.md`
- Сущности FN/SCN/ASM/EXM: `docs/curriculum/entity-definitions.md`
