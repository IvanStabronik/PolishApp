# Milestone 2 — Private Alpha report

**Branch:** `feat/private-alpha-v2`  
**Baseline:** `6ab4592716ed3bf34107322a390b337c563fca63`  
**Final SHA:** `f4d610ed88fc02286628d5c503f39fb61f3ba97e`  
**PR:** https://github.com/IvanStabronik/PolishApp/pull/1  
**Green CI:** https://github.com/IvanStabronik/PolishApp/actions/runs/34032602611  
**Figma:** https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G

## Delivered

- Real Better Auth session gates (no `tryDemoSession` / `slowarium.demoSession` auth)
- Onboarding + settings → PostgreSQL via Zod APIs
- DRAFT visibility by `previewer|author|reviewer|admin` + server `DEMO_PREVIEW`/`DEMO_MODE` (not `NEXT_PUBLIC_*` alone)
- Attempt persistence: transaction, idempotency key, preview vs live mastery scope
- Privacy export/delete with credential wipe / session revoke
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

## Migrations (M2)

- `0002_previewer_role.sql`
- `0003_attempt_idempotency.sql`

## Status lines

```
SŁOWARIUM PRIVATE ALPHA: COMPLETE
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```
