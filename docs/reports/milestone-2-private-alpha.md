# Milestone 2 — Private Alpha report

**Branch:** `feat/private-alpha-v2`
**Baseline:** `6ab4592716ed3bf34107322a390b337c563fca63`
**PR:** https://github.com/IvanStabronik/PolishApp/pull/1
**Figma:** https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G

## Milestone 2.1 acceptance fixes (this delivery)

| Area | Status |
| --- | --- |
| A1 Answer-key leakage (learner DTO + contract tests) | Done |
| A2 Privacy export success only on 2xx + download | Done |
| A3 Real PostgreSQL integration (9 scenarios) | Done |
| A4 Playwright: 5 modules, 4 types, export fail, delete | Done |
| A5 CI artifacts (screenshots/traces/videos, fail if empty) | Done |
| A6 Privacy audit HMAC-SHA256 subject id | Done |

See ADR-008 (`docs/architecture/adr/008-learner-safe-exercise-dto.md`).

## Delivered (M2 + M2.1)

- Real Better Auth session gates (no `tryDemoSession` / `slowarium.demoSession` auth)
- Onboarding + settings → PostgreSQL via Zod APIs
- DRAFT visibility by `previewer|author|reviewer|admin` + server `DEMO_PREVIEW`/`DEMO_MODE`
- Attempt persistence: transaction, idempotency key, preview vs live mastery scope
- Learner-safe exercise DTOs — answer keys never in initial RSC/client props
- Privacy export/delete with credential wipe / session revoke; export UI errors on failure
- Privacy audit subject = versioned HMAC (never clear deleted email)
- Five DRAFT A1 modules (each 1 lesson, 9–10 exercises, 4 types)
- CI: migrate/seed/real DB integration/e2e/no-preview/artifacts/`git diff --check`

## Content (DRAFT / internal_preview_only)

| Module | Exercises | Types |
| --- | --- | --- |
| Pierwsze spotkanie | 9 | 4 |
| W kawiarni | 10 | 4 |
| W sklepie | 10 | 4 |
| Droga i transport | 10 | 4 |
| Pierwsza sprawa w urzędzie | 10 | 4 |

**Honest note:** content remains DRAFT for internal preview. Not JPJO-approved. Not public.

## Migrations (M2)

- `0002_previewer_role.sql`
- `0003_attempt_idempotency.sql`

## Status lines

```
MILESTONE 2 ACCEPTANCE FIXES: COMPLETE
SŁOWARIUM PRIVATE ALPHA: COMPLETE
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```
