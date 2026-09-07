# Release and rollback — deployed private beta

## Release checklist

1. [ ] PR green on CI (lint, typecheck, unit, integration, migration tests, security tests, build, M2–M4 e2e, `git diff --check`)
2. [ ] Merge to allowed branch (`docs/requirements-r2` / protected release branch)
3. [ ] Build immutable image tagged with git SHA
4. [ ] **Backup** production DB (or confirm provider snapshot)
5. [ ] Run **migrate job** (`pnpm db:migrate`) — stop release on failure
6. [ ] Deploy new app image / restart web service
7. [ ] Probe `GET /api/health` then `GET /api/ready`
8. [ ] Run production smoke: `BASE_URL=https://… pnpm test:e2e:production`
9. [ ] Confirm DEMO_MODE/DEMO_PREVIEW remain false; BETA_MODE true

## Ready-for-credentials checklist (Railway)

Operators must complete this before claiming a live private beta URL. Until then status stays **EXTERNAL ACCESS REQUIRED**.

1. [ ] Railway project + managed Postgres provisioned
2. [ ] GitHub Environment `private-beta` created with required reviewers (recommended)
3. [ ] Secrets set: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `INVITE_TOKEN_PEPPER`, `BASE_URL` (https)
4. [ ] Deploy transport: `DEPLOY_WEBHOOK_URL` **or** `RAILWAY_TOKEN` (+ service/project IDs as needed)
5. [ ] Optional smoke fixtures: `PROD_SMOKE_ADMIN_EMAIL`, `PROD_SMOKE_ADMIN_PASSWORD`, `PROD_SMOKE_ALLOW_DESTRUCTIVE=true` only on known hosts
6. [ ] Service env matches `web/.env.production.example` (`BETA_MODE=true`, `DEMO_*=false`)
7. [ ] Image built from Dockerfile at a known git SHA; migrate job uses `pnpm db:migrate` (advisory lock)
8. [ ] Manual `workflow_dispatch` of `.github/workflows/deploy.yml` with `confirm_environment=private-beta`
9. [ ] `GET /api/health` + `GET /api/ready` green on `BASE_URL`
10. [ ] `BASE_URL=… pnpm test:e2e:production` green (including CSRF negatives)
11. [ ] Only then update M5 report status to `SŁOWARIUM DEPLOYED PRIVATE BETA: COMPLETE` with the real URL

Dry-run without secrets: the deploy workflow **fails closed** at the Guardrails job (expected). Do not weaken that gate.

## Rollback checklist (app)

1. [ ] Redeploy previous image SHA
2. [ ] Probe health/ready
3. [ ] Confirm login + admin beta console

## Rollback checklist (database)

1. [ ] Prefer forward-fix migration
2. [ ] If data-loss risk: restore **pre-migrate** dump to production (maintenance window)
3. [ ] Redeploy matching app SHA
4. [ ] Verify migration journal + `/api/ready`

## Failure status

Failed migrate or smoke → release **RED**. Do not continue rolling pods. Follow [incident-response.md](./incident-response.md).
