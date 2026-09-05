# ADR-002: PostgreSQL + Drizzle

- **Status:** Accepted
- **Date:** 2026-09-05
- **Product:** SŁOWARIUM (`slowarium`)

## Context

Нужны: реляционные инварианты (версии контента, ownership попыток, append-only publication events), SQL-миграции, сильный TypeScript DX, локальный запуск в Docker. Документ требований сознательно не выбирал СУБД; foundation должен зафиксировать один стек.

## Decision

- **PostgreSQL** — единственная система записи foundation.
- **Drizzle ORM** — схема, миграции, typed queries.
- Первичные ключи — **UUID**; канонические curriculum ID — уникальные бизнес-ключи.
- JSONB допустим для payload версии и explanation snapshots; ключевые статусы и FK — колонки, не «всё в JSON».

## Consequences

- Один инструмент миграций в CI.
- Легко тестировать integration на эфемерной БД.
- Нет vendor lock на проприетарный BaaS.
- Команда должна писать миграции осознанно (breaking changes версий контента — новые version rows, не silent overwrite).

## Deferred

- Read replicas, partitioning evidence.
- Elasticsearch / отдельный search.
- Graph database для концептов.
- OLAP-склад для item analysis (V2+ analytics).
