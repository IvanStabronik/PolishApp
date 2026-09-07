# Milestone 5 — Deployed Private Beta

## Verdict

**Package: COMPLETE for merge review.**  
**Live provider deploy: EXTERNAL ACCESS REQUIRED** (no Railway/GitHub deploy credentials in this environment).

Do **not** claim `SŁOWARIUM DEPLOYED PRIVATE BETA: COMPLETE` until a real HTTPS URL passes production smoke.

## Closed from M4

- PR #3 merged into `docs/requirements-r2` at merge commit `aa89b148f8be8c80c5f98816f24c5f8eff32dbfe`
- M4 HEAD was `71da645cfb179ffbfd28bd2023b8cc3717a79762`
- Final M4 CI: https://github.com/IvanStabronik/PolishApp/actions/runs/34114063023 (green)

## What M5 adds

| Area | Evidence |
| --- | --- |
| Portable production image | `web/Dockerfile`, `.dockerignore`, Next standalone via `DOCKER_BUILD=1` |
| Boot env validation | `web/src/instrumentation.ts` + Zod `validateRuntimeEnv` (prod forbids DEMO_*, requires pepper + https URL) |
| Health / ready | `/api/health` liveness (no DB/secrets); `/api/ready` Postgres |
| Separate migrate | `pnpm db:migrate` + advisory lock; **not** in container CMD |
| Security | Origin CSRF on auth/privacy/onboarding; Postgres rate limits on login/register/invite/onboarding/privacy; HSTS in prod; CSP without `unsafe-eval` in production builds; public error bodies; log redaction |
| Ops docs | `docs/architecture/deployment-v1.md`, `docs/operations/*` |
| Production smoke | `playwright.production.config.ts` + `e2e/production-smoke.spec.ts` (requires `BASE_URL`; no webServer) |
| Deploy workflow | `.github/workflows/deploy.yml` — `workflow_dispatch` only; fails closed without secrets |

## Migration / rollback

- Forward-only SQL under `web/src/db/migrations` with journal
- Concurrent migrate blocked by `pg_advisory_lock(784512309)`
- App rollback = previous image SHA; DB rollback = restore pre-migrate dump (see ops docs)
- CI: clean-DB migrate smoke + upgrade/idempotency integration tests

## Security controls (each tested)

- Unit: `tests/unit/m5-production-security.test.ts`
- Integration: `tests/integration/m5-security.integration.test.ts` (+ prior M4 invite/deactivate/privacy suites)

## External manual actions (Railway)

1. Create Railway project + managed Postgres.
2. Add GitHub Environment `private-beta` with secrets: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `INVITE_TOKEN_PEPPER`, `BASE_URL`, optional `DEPLOY_WEBHOOK_URL` / `RAILWAY_TOKEN`, smoke admin fixtures.
3. Set service env from `web/.env.production.example` (`DEMO_MODE=false`, `DEMO_PREVIEW=false`, `BETA_MODE=true`).
4. Build/push image from Dockerfile; run `pnpm db:migrate` as a one-off release job.
5. Point custom domain (optional) → provider HTTPS URL.
6. Re-run deploy workflow + `pnpm test:e2e:production`.

## Status lines

```
MILESTONE 4 FINAL ACCEPTANCE: COMPLETE
SŁOWARIUM DEPLOYED PRIVATE BETA: EXTERNAL ACCESS REQUIRED
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```

## Verified locally (pre-push)

| Suite | Result |
| --- | --- |
| Unit (`pnpm test`) | 98 passed, 0 skipped |
| Integration (`pnpm test:integration`) | 46 passed, 0 skipped |
| Smoke E2E (`pnpm test:e2e:smoke`) | 7 passed, 0 skipped |
| Typecheck / lint / build / content:validate | pass |
| Production smoke vs live URL | **N/A — EXTERNAL ACCESS REQUIRED** |

CI will additionally run M3/M4 e2e, no-demo suite, clean-DB migrate smoke, and `git diff --check`.

## Explicit non-goals (unchanged)

No public content launch, no DRAFT publication, no fake JPJO, no A2–B2, no payments, no Figma redesign, no M6.

