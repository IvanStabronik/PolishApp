# Runbook — deployment

## Package

- Production Dockerfile: `web/Dockerfile` (Next.js standalone).
- Compose Postgres: root `docker-compose.yml` (local/dev).
- Health: `/api/health` (process) vs `/api/ready` (DB).

## Required runtime env

- `DATABASE_URL`
- `BETTER_AUTH_SECRET` (≥16 chars)
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL`
- `INVITE_TOKEN_PEPPER` (recommended)
- `BETA_MODE=true` for invite-only registration

Validate: `pnpm ops:validate-env` (from `web/`).

## Migrate on start (recommended job)

```bash
pnpm db:migrate   # advisory-locked; safe vs concurrent runners
```

Production seed must **not** create demo accounts unless `ALLOW_PRODUCTION_DEMO=true` (discouraged).

## Cloud provisioning

**EXTERNAL BLOCKER:** no cloud credentials are present in this repository.
Ship the deployable image/package; do not claim a public URL until a real environment exists.

## Status

```
PUBLIC DEPLOYMENT: EXTERNAL BLOCKER (no provisioned URL / cloud credentials)
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
```
