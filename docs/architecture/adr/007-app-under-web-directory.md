# ADR-007: Application lives under `web/`

- **Status:** Accepted
- **Date:** 2026-09-05
- **Product:** SŁOWARIUM (`slowarium`)

## Context

The repository is a content-as-code + product monorepo. Curriculum YAML, architecture docs, and scripts live at the repo root. Putting the Next.js app at the root would mix product UI with content packages and inflate the root with framework config.

## Decision

The runnable Next.js modular monolith lives in **`web/`**:

- App Router, Better Auth routes, Drizzle schema/migrations, Vitest/Playwright configs
- `package.json` scripts for `dev`, `db:*`, `content:*`, tests
- Env example: `web/.env.example` (root `.env.example` mirrors shared keys for Docker/docs)

Repo root keeps:

- `content/` (YAML curriculum packages)
- `docs/architecture/`
- `docker-compose.yml` (Postgres for local/dev)
- Workspace / tooling entrypoints that delegate into `web/`

## Consequences

- Clear boundary: content authors edit `content/`; app engineers primarily work in `web/`.
- Import paths in app code use `@/` → `web/src/`.
- Content import/seed resolve `../../content` from `web/` scripts.
- CI and docs must `cd web` (or `pnpm --dir web`) for app commands.

## Deferred

- Separate packages workspace (`packages/db`, `packages/ui`) if the monolith grows.
- Publishing content validation as a standalone CLI package.
