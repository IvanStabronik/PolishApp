# Contributing to SŁOWARIUM

## Setup

1. Use Node 22 + pnpm.
2. `pnpm install` from repo root (or `web/`).
3. `docker compose up -d` then `pnpm db:migrate` && `pnpm db:seed`.
4. Copy env examples; never commit secrets.

## Workflow

- App code lives in `web/`; curriculum/requirements in `docs/`; content-as-code YAML under `content/`.
- Prefer small PRs. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm content:validate` before opening a PR.
- E2E: `pnpm test:e2e` with the app up (or let Playwright start it). Use a test DB, not production.

## Content rules

- Author ≠ reviewer for APPROVED/PUBLISHED versions.
- Do not mark A1 as JPJO-approved or claim A2–B2 complete without an explicit product decision.
- *Pierwsze spotkanie* stays DRAFT / internal preview until independent review.

## Privacy

- Export/delete paths are server-side only (`web/src/modules/privacy/`).
- No exploit PoCs or real PII in fixtures.
