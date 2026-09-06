# Milestone 2 — Private Alpha report

**Branch:** `feat/private-alpha-v2`
**Baseline:** `6ab4592716ed3bf34107322a390b337c563fca63`
**Product:** SŁOWARIUM private alpha (internal preview)

## Delivered

- Real Better Auth session gates (no `tryDemoSession` / `slowarium.demoSession` auth)
- Onboarding + settings → PostgreSQL via Zod APIs
- DRAFT visibility by `previewer|author|reviewer` + server `DEMO_PREVIEW` (not `NEXT_PUBLIC_*` alone)
- Attempt persistence: transaction, idempotency key, preview vs live mastery scope
- Privacy export/delete with credential wipe
- Five DRAFT A1 modules (each 1 lesson, 9–10 exercises, 4 types)
- CI: migrate/seed/integration/e2e/no-preview/`git diff --check`

## Content (DRAFT / internal_preview_only)

| Module | Exercises | Types |
| --- | --- | --- |
| Pierwsze spotkanie | 9 | 4 |
| W kawiarni | 10 | 4 |
| W sklepie | 10 | 4 |
| Droga i transport | 10 | 4 |
| Pierwsza sprawa w urzędzie | 10 | 4 |

## Status lines

```
SŁOWARIUM PRIVATE ALPHA: see final report after green CI
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```

Figma: https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G (handoff: `docs/design/figma-handoff.md`)
