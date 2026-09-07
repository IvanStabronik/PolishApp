# Milestone 5 — Deployed Private Beta

## Verdict

**Package: COMPLETE for merge review** (after adversarial re-verification; see Critical pass below).
**Live provider deploy: EXTERNAL ACCESS REQUIRED** (no Railway/GitHub deploy credentials in this environment).

Do **not** claim `SŁOWARIUM DEPLOYED PRIVATE BETA: COMPLETE` until a real HTTPS URL passes production smoke.

## Standing SOP (post-stage)

Before declaring any milestone/stage ready for human audit, run adversarial multi-front verification — lint, typecheck, unit, integration, content validate, migrate/seed, build, e2e smoke/m3/m4/no-demo (+ production smoke when URL exists), `git diff --check`, security negative cases, and docs claims vs evidence. Do not rubber-stamp.

## Closed from M4

- PR #3 merged into `docs/requirements-r2` at merge commit `aa89b148f8be8c80c5f98816f24c5f8eff32dbfe`
- M4 HEAD was `71da645cfb179ffbfd28bd2023b8cc3717a79762`
- Final M4 CI: https://github.com/IvanStabronik/PolishApp/actions/runs/34114063023 (green)

## What M5 adds

| Area | Evidence |
| --- | --- |
| Portable production image | `web/Dockerfile`, `.dockerignore`, Next standalone via `DOCKER_BUILD=1` |
| Boot env validation | `web/src/instrumentation.ts` + Zod `validateRuntimeEnv` (prod forbids DEMO_*, requires pepper + https URL; loopback http allowed for local containers) |
| Health / ready | `/api/health` liveness (no DB/secrets); `/api/ready` Postgres |
| Separate migrate | `pnpm db:migrate` + advisory lock; **not** in container CMD; concurrent acquire blocked (`pg_try_advisory_lock` tested) |
| Security | Origin CSRF on auth/privacy/onboarding/learning/profile/author; cookie-session requests without Origin rejected; Postgres rate limits on login/register/invite/onboarding/privacy; HSTS in prod; CSP without `unsafe-eval` in production builds (**`unsafe-inline` still required** for Next script/style); public error bodies; log redaction; production hosts do not hardcode loopback Origins |
| Ops docs | `docs/architecture/deployment-v1.md`, `docs/operations/*` incl. ready-for-credentials checklist |
| Production smoke | `playwright.production.config.ts` + `e2e/production-smoke.spec.ts` (requires `BASE_URL`; no webServer; CSRF missing-Origin + foreign Origin negatives) |
| Deploy workflow | `.github/workflows/deploy.yml` — `workflow_dispatch` only; fails closed without secrets |

## Migration / rollback

- Forward-only SQL under `web/src/db/migrations` with journal
- Concurrent migrate blocked by `pg_advisory_lock(784512309)`
- App rollback = previous image SHA; DB rollback = restore pre-migrate dump (see ops docs)
- CI: clean-DB migrate smoke + upgrade/idempotency integration tests

## Security controls (each tested)

- Unit: `tests/unit/m5-production-security.test.ts`
- Integration: `tests/integration/m5-security.integration.test.ts` (+ prior M4 invite/deactivate/privacy suites)
- Origin policy: browser cookie sessions require trusted Origin / Referer / same-origin Sec-Fetch-Site; non-browser clients without cookies may omit Origin (auth still required)

## External manual actions (Railway)

See **Ready-for-credentials checklist** in `docs/operations/release-and-rollback.md`. Summary:

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
| Unit (`pnpm test`) | 108 passed, 0 skipped |
| Integration (`pnpm test:integration`) | 55 passed, 0 skipped |
| Smoke E2E (`pnpm test:e2e:smoke`) | 7 passed, 0 skipped |
| M3 E2E | 8 passed, 0 skipped |
| M4 E2E | 11 passed, 0 skipped |
| no-demo E2E | 2 passed, 0 skipped |
| Typecheck / lint / build / content:validate / migrate+seed / `git diff --check` | pass |
| Production smoke vs live URL | **N/A — EXTERNAL ACCESS REQUIRED** |

CI will additionally run M3/M4 e2e, no-demo suite, clean-DB migrate smoke, and `git diff --check`.

**SOP:** After each milestone/stage deliverable, adversarial multi-front verification is mandatory before human audit (see Standing SOP above).

## Explicit non-goals (unchanged)

No public content launch, no DRAFT publication, no fake JPJO, no A2–B2, no payments, no Figma redesign, no M6.

## Critical pass (adversarial re-verification)

| Finding | Disposition |
| --- | --- |
| Better Auth `authBuiltinRateLimitEnabled` helper not wired into `auth.ts` | **Fixed** — config now uses the helper |
| Auth Postgres rate-limit inflation when `ALLOW_PRODUCTION_DEMO` / `DEMO_MODE` set | **Fixed** — inflate only under `CI` |
| Deploy `guard` job lacked `environment: private-beta` (env secrets invisible) | **Fixed** |
| Invite redeem hard-coded bucket string (drift vs catalog) | **Fixed** — uses `RATE_LIMIT_BUCKETS.inviteRedeem` |
| CSRF origin missing on `/api/learning/attempt`, `/api/profile` PATCH, `/api/author/review` | **Fixed** |
| Security tests only exercised primitives, not HTTP handlers | **Fixed** — integration hits privacy/onboarding/attempt/profile/author handlers |
| Production smoke CSP did not assert no `unsafe-eval` | **Fixed** |
| Playwright e2e reused wrong host on :3000 / local `.env.local` missing `BETA_MODE` (open register UI) | **Fixed** — pin `BETA_MODE=true` in Playwright webServer env; use free port for local runs |
| no-demo e2e sent Origin from `PLAYWRIGHT_BASE_URL` while server was on `:3001` | **Fixed** — use Playwright `baseURL` fixture |
| Missing `Origin` still allowed on cookie-session mutating requests | **Fixed** — reject Cookie without Origin/Referer/same-origin Sec-Fetch-Site; document non-browser exception |
| Production trusted-origin list hardcoded loopback even on https hosts | **Fixed** — loopback hardcoded only for non-prod or loopback public URL |
| Privacy delete rate-limit + profile/author Origin HTTP negatives thin | **Fixed** |
| Migrate advisory-lock concurrency untested | **Fixed** — `pg_try_advisory_lock` blocked while held |
| CSP docs implied stronger than `unsafe-inline` reality | **Fixed** — report + deployment-v1 honesty notes |
| Live Railway URL + production smoke | **Blocked** — EXTERNAL ACCESS REQUIRED |
| `SŁOWARIUM DEPLOYED PRIVATE BETA: COMPLETE` | **Not claimed** |
