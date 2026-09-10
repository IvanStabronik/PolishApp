# Runbook — deployment

Canonical M5 docs:

- [deployment-v1.md](../architecture/deployment-v1.md)
- [FOUNDER-UNBLOCK-NOW.md](../operations/FOUNDER-UNBLOCK-NOW.md)
- [release-and-rollback.md](../operations/release-and-rollback.md)
- [private-beta-runbook.md](../operations/private-beta-runbook.md)

## Package

- **Primary:** Vercel via root `vercel.json` + Next in `web/` (no Docker required).
- Content YAML: repo `content/` included via monorepo clone + `outputFileTracingIncludes`.
- Legacy Docker: `web/Dockerfile` (Next.js standalone) for local/Railway-style hosts.
- Compose Postgres: root `docker-compose.yml` (local/dev only).
- Health: `/api/health` (process) vs `/api/ready` (DB).

## Required runtime env

See `web/.env.production.example`. Validate: `pnpm ops:validate-env`.  
Set production values on **Vercel** (primary). GitHub Environment `private-beta` is optional for Actions.

## Migrate (separate release step)

```bash
# Prefer Neon/Supabase DIRECT connection string for migrate
cd web
DATABASE_URL='postgresql://…' pnpm db:migrate   # advisory-locked
```

Production seed must **not** create demo accounts (`DEMO_MODE=false`).

## Cloud provisioning

**EXTERNAL ACCESS REQUIRED** until Neon/Supabase + Vercel exist and health/ready prove HTTPS.  
Optional deploy workflow: `.github/workflows/deploy.yml` (`workflow_dispatch` only) — Vercel Deploy Hook / CLI primary; Railway secondary.

**Fail-closed dry-run:** [https-deploy-dry-run.md](../operations/https-deploy-dry-run.md) — complete before claiming HTTPS is proven.

## Status

```
PUBLIC DEPLOYMENT: EXTERNAL ACCESS REQUIRED
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
```
