# Deployment architecture v1 — SŁOWARIUM private beta

Status: **provider-portable private beta**. Primary target is **Railway** (Next.js + managed PostgreSQL), but no business logic imports Railway SDKs or hostnames.

## Topology

```
Internet (HTTPS)
    │
    ▼
[Edge / provider TLS]  ← custom domain ready (CNAME to provider URL)
    │
    ▼
[Web service: Next.js standalone container]
    │  /api/health  → liveness (no DB)
    │  /api/ready   → readiness (Postgres SELECT 1)
    ▼
[Managed PostgreSQL]
    │
    └── migrations applied by a **separate release job** (advisory lock)
```

## Artifacts

| Artifact | Path / command |
| --- | --- |
| Multi-stage Dockerfile | `web/Dockerfile` |
| Docker ignore | `.dockerignore` |
| Standalone output | `DOCKER_BUILD=1` → Next `output: "standalone"` |
| Env validation | Zod `validateRuntimeEnv` + `src/instrumentation.ts` on boot |
| Secret generation | `pnpm ops:generate-secret` |

## Release steps (immutable)

1. **Build** image from git SHA (`docker build -f web/Dockerfile .`).
2. **Migrate** against production DB from a one-off job / CI gate: `pnpm db:migrate` (Postgres advisory lock `784512309`).
3. **Deploy** the new image / restart web service.
4. **Probe** `/api/health` then `/api/ready`.
5. **Smoke** `pnpm test:e2e:production` with `BASE_URL`.

App start **does not** run migrations (avoids race across replicas).

## Environment (production)

Required:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET` (≥16; generate via `pnpm ops:generate-secret`)
- `INVITE_TOKEN_PEPPER`
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` (https:// public URL)
- `BETA_MODE=true`
- `DEMO_MODE=false`
- `DEMO_PREVIEW=false`
- `NODE_ENV=production`

Optional:

- `APP_URL`, `TRUSTED_ORIGINS` (comma-separated)
- `PRIVACY_AUDIT_SECRET`
- `ALLOW_PRODUCTION_DEMO` (discouraged; never for real beta)

Cookies: `useSecureCookies` when base URL is `https://`.

## Provider notes (Railway)

Manual (external) steps — see M5 report:

1. Create Railway project + Postgres plugin.
2. Set env vars (never commit).
3. Connect GitHub repo **or** deploy from image.
4. Run migrate job once per release.
5. Attach custom domain when ready.

Until credentials exist: **EXTERNAL ACCESS REQUIRED** — code is deployable; URL is not claimed.

## Observability

- Structured JSON logs via `structuredLog` (redacts secrets/PII keys).
- `x-correlation-id` / `getCorrelationId` on mutating APIs.
- Failure signals: boot env validation throw; migrate non-zero exit; `/api/ready` 503.
