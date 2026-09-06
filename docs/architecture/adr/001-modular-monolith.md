# ADR-001: Modular monolith

- **Status:** Accepted
- **Date:** 2026-09-05
- **Product:** SŁOWARIUM (`slowarium`)

## Context

SŁOWARIUM — серьёзная A1–B2 платформа с доменами auth, profiles, content, learning, assessment, progress, privacy. Команда маленькая (~15 ч/нед основателя). Требования уже разделяют авторский контур и учебный, но не предписывают сеть сервисов. Публичного launch нет; нужна форма, в которой можно поставить V0/V1 без ops-налога микросервисов.

## Decision

Строим **modular monolith**: одно Next.js-приложение, одна PostgreSQL, доменные модули с явными границами API внутри процесса. Междоменное взаимодействие — через серверные функции/сервисы модуля, не через «свободный» импорт UI в обход правил. Вынос сервиса позже допустим только при доказанной необходимости (нагрузка, отдельный lifecycle), не заранее.

## Consequences

- Проще транзакции attempt → evidence → mastery.
- Единый деплой и локальный Docker Compose.
- Дисциплина границ зависит от code review и структуры папок, не от сети.
- Риск «комка» снимается ADR по доменам и запретом писать бизнес-правила в клиенте.

## Deferred

- Отдельные сервисы content/assessment.
- Message bus / outbox между доменами.
- Multi-region active-active.
