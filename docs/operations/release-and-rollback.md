# Release and rollback — deployed private beta

## Release checklist

1. [ ] PR green on CI (lint, typecheck, unit, integration, migration tests, security tests, build, M2–M4 e2e, `git diff --check`)
2. [ ] Merge to allowed branch (`docs/requirements-r2` / protected release branch)
3. [ ] Vercel builds from git SHA (Git integration or Deploy Hook)
4. [ ] **Backup** production DB (Neon/Supabase snapshot or `pg_dump`)
5. [ ] Run **migrate job** (`pnpm db:migrate` with direct `DATABASE_URL`) — stop release on failure
6. [ ] Confirm Vercel production deployment is the intended SHA
7. [ ] Probe `GET /api/health` then `GET /api/ready`
8. [ ] Run production smoke: `BASE_URL=https://… pnpm test:e2e:production`
9. [ ] Confirm DEMO_MODE/DEMO_PREVIEW remain false; BETA_MODE / BETA_ALLOW_DRAFT true

## Ready-for-credentials checklist (Vercel + Neon/Supabase)

Operators must complete this before claiming a live private beta URL. Until then status stays **EXTERNAL ACCESS REQUIRED**.

1. [ ] Neon (preferred) or Supabase Postgres provisioned; `DATABASE_URL` copied (pooled + direct)
2. [ ] Vercel project linked to `IvanStabronik/PolishApp` (root `vercel.json` or Root Directory `web`)
3. [ ] Vercel env set from `web/.env.production.example` (`BETA_ALLOW_DRAFT=true`, `DEMO_*=false`)
4. [ ] Optional GitHub Environment `private-beta`: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BASE_URL`, `VERCEL_DEPLOY_HOOK_URL` (or Vercel CLI trio)
5. [ ] Optional smoke fixtures: `PROD_SMOKE_ADMIN_EMAIL`, `PROD_SMOKE_ADMIN_PASSWORD`
6. [ ] `pnpm db:migrate` succeeded against direct DB URL
7. [ ] Vercel production deploy live; content YAML available (monorepo + NFT includes)
8. [ ] Optional: `workflow_dispatch` of `.github/workflows/deploy.yml` with `confirm_environment=private-beta`
9. [ ] `GET /api/health` + `GET /api/ready` green on `BASE_URL`
10. [ ] `BASE_URL=… pnpm test:e2e:production` green (including CSRF negatives)
11. [ ] Only then update M5 report status to `SŁOWARIUM DEPLOYED PRIVATE BETA: COMPLETE` with the real URL

Legacy Railway remains secondary. Dry-run without secrets: the deploy workflow **fails closed** at the Guardrails job (expected). Do not weaken that gate.

## Rollback checklist (app)

1. [ ] Vercel → Redeploy previous production deployment (or promote prior SHA)
2. [ ] Probe health/ready
3. [ ] Confirm login + admin beta console

## Rollback checklist (database)

1. [ ] Prefer forward-fix migration
2. [ ] If data-loss risk: restore **pre-migrate** dump to production (maintenance window)
3. [ ] Redeploy matching app SHA
4. [ ] Verify migration journal + `/api/ready`

## Failure status

Failed migrate or smoke → release **RED**. Do not continue rolling pods. Follow [incident-response.md](./incident-response.md).
