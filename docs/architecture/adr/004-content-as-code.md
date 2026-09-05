# ADR 004 — Content-as-code

**Status:** Accepted  
**Date:** 2026-09-05  
**Product:** SŁOWARIUM (`slowarium`)

## Context

Публичного authoring cabinet и CMS на Milestone 1 нет. Контент должен быть ревьюируемым в git, трассируемым к каноническим curriculum ID и защищённым от self-approve.

## Decision

- Основной формат: **YAML** в `content/`.
- Структурная валидация: Zod (`content:validate`).
- Импорт в PostgreSQL: идемпотентный (`content:import`).
- Lifecycle: `DRAFT → IN_REVIEW → APPROVED → PUBLISHED` (или `REJECTED`); `PUBLISHED → ARCHIVED`.
- `authorId ≠ reviewerId` обязательно для APPROVED/PUBLISHED.
- Первый модуль *Pierwsze spotkanie* остаётся `DRAFT` (internal preview only) до независимого JPJO review.

## Consequences

- Изменения контента проходят code review.
- Обычный learner видит только `PUBLISHED`.
- Позже CMS может писать в тот же schema/lifecycle.

## Deferred

Полноценный authoring UI, медиа-пайплайн, массовое производство уроков.
