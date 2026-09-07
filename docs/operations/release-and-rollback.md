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

## Automatic deploy

**Disabled** until Railway (or other) credentials + environment protection rules exist.
Workflow: `.github/workflows/deploy.yml` is `workflow_dispatch` only and requires secrets.

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
