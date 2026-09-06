# ADR-003: Better Auth

- **Status:** Accepted
- **Date:** 2026-09-05
- **Product:** SŁOWARIUM (`slowarium`)

## Context

Нужны регистрация взрослых, сессии, recovery, роли learner/author/reviewer/admin, без строительства crypto-сессий с нуля. Первая аудитория в ЕС; cookie-session на собственном backend предпочтительнее «магии» закрытого BaaS для ownership данных. Email+password — рабочее допущение `FUN-001`.

## Decision

Используем **Better Auth** как библиотеку аутентификации в Next.js monolith:

- хранение пользователей/сессий в нашей PostgreSQL (через интеграцию со схемой Drizzle);
- проверка сессии и ролей на сервере;
- приложение остаётся source of truth для `learner_profiles` и RBAC-правил контента.

OAuth-провайдеры не обязательны в foundation.

## Consequences

- Быстрый старт session/security baseline.
- Данные учёток остаются в нашем Postgres (export/delete проще контролировать).
- Нужно аккуратно стыковать таблицы Better Auth со своими профилями (1:1 user → learner_profile).
- Кастомные политики (18+, self-approve) остаются нашим кодом поверх библиотеки.

## Deferred

- Passkeys / WebAuthn.
- Social login.
- Организация/SSO для школ.
- Step-up auth для admin voice access (когда голос появится).
