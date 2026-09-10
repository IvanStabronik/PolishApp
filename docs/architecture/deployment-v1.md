# Deployment architecture v1 — SŁOWARIUM private beta

Status: **provider-portable private beta**. **Primary target: Vercel (Next.js) + Neon or Supabase (managed PostgreSQL)**. Railway/Docker remains a secondary/legacy path. No business logic imports provider SDKs or hostnames.

## Topology

```
Internet (HTTPS)
    │
    ▼
[Vercel edge TLS]  ← *.vercel.app or custom domain CNAME
    │
    ▼
[Web: Next.js on Vercel]
    │  /api/health  → liveness (no DB)
    │  /api/ready   → readiness (Postgres SELECT 1)
    │  reads repo content/ via filesystem (NFT tracing)
    ▼
[Managed PostgreSQL — Neon preferred, or Supabase]
    │
    └── migrations applied by a **separate** one-off / CI job (advisory lock)
```

## Artifacts

| Artifact | Path / command |
| --- | --- |
| Vercel monorepo config | root `vercel.json` (`pnpm --dir web build`) |
| Next content tracing | `web/next.config.ts` → `outputFileTracingRoot` + `outputFileTracingIncludes` for `../content` |
| Multi-stage Dockerfile | `web/Dockerfile` (local / legacy Railway-style hosts) |
| Standalone output | `DOCKER_BUILD=1` → Next `output: "standalone"` (Docker only; Vercel does not use it) |
| Env validation | Zod `validateRuntimeEnv` + `src/instrumentation.ts` on boot |
| Secret generation | `pnpm ops:generate-secret` |

## Release steps (immutable)

1. **Build/deploy** via Vercel Git integration (or Deploy Hook / optional `deploy.yml`).
2. **Migrate** against production DB from a one-off job / laptop: `pnpm db:migrate` (use Neon **direct** URL if pooler fails; Postgres advisory lock `784512309`).
3. **Probe** `/api/health` then `/api/ready` on `BASE_URL`.
4. **Smoke** `pnpm test:e2e:production` with `BASE_URL` (optional).

App start **does not** run migrations (avoids race across serverless instances).

## Environment (production)

Required (set on **Vercel**):

- `DATABASE_URL` (Neon pooled preferred for app; direct for migrate)
- `BETTER_AUTH_SECRET` (≥16; generate via `pnpm ops:generate-secret`)
- `INVITE_TOKEN_PEPPER`
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` / `APP_URL` (https:// public URL)
- `BETA_MODE=true`
- `BETA_ALLOW_DRAFT=true`
- `DEMO_MODE=false`
- `DEMO_PREVIEW=false`
- `NODE_ENV=production`

Optional:

- `TRUSTED_ORIGINS` (comma-separated)
- `PRIVACY_AUDIT_SECRET`
- `ALLOW_PRODUCTION_DEMO` (discouraged; never for real beta)

Cookies: `useSecureCookies` when base URL is `https://`.

## Provider notes (Vercel + Neon)

Manual (external) steps — see [FOUNDER-UNBLOCK-NOW.md](../operations/FOUNDER-UNBLOCK-NOW.md):

1. Create Neon (or Supabase) project; copy `DATABASE_URL`.
2. Import `IvanStabronik/PolishApp` on Vercel; use root `vercel.json` or Root Directory `web`.
3. Set env vars (never commit).
4. Run `pnpm db:migrate` once per schema change.
5. Attach custom domain when ready.

Until credentials exist: **EXTERNAL ACCESS REQUIRED** — code is deployable; URL is not claimed.

## Legacy (Railway / Docker)

`web/Dockerfile` still builds a standalone image with `content/` copied to `/content`. Prefer Vercel for closed beta. GitHub `deploy.yml` keeps Railway as a secondary transport after Vercel hook/CLI.

## Observability

- Structured JSON logs via `structuredLog` (redacts secrets/PII keys).
- `x-correlation-id` / `getCorrelationId` on mutating APIs.
- Failure signals: boot env validation throw; migrate non-zero exit; `/api/ready` 503.
