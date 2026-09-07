# Runbook — deployment

Canonical M5 docs:

- [deployment-v1.md](../architecture/deployment-v1.md)
- [release-and-rollback.md](../operations/release-and-rollback.md)
- [private-beta-runbook.md](../operations/private-beta-runbook.md)

## Package

- Production Dockerfile: `web/Dockerfile` (Next.js standalone).
- Compose Postgres: root `docker-compose.yml` (local/dev).
- Health: `/api/health` (process) vs `/api/ready` (DB).

## Required runtime env

See `web/.env.production.example`. Validate: `pnpm ops:validate-env`.

## Migrate (separate release step)

```bash
pnpm db:migrate   # advisory-locked; safe vs concurrent runners
```

Production seed must **not** create demo accounts (`DEMO_MODE=false`).

## Cloud provisioning

**EXTERNAL ACCESS REQUIRED** until Railway (or other) credentials + GitHub Environment `private-beta` secrets exist.
Deploy workflow: `.github/workflows/deploy.yml` (`workflow_dispatch` only).

## Status

```
PUBLIC DEPLOYMENT: EXTERNAL ACCESS REQUIRED
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
```
