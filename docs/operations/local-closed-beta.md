# Local closed-beta shape (Windows)

Run the **invite + DRAFT learning** path on a laptop without Vercel/Neon. This is not a public publish and not JPJO approval.

Related: [private-beta-runbook.md](./private-beta-runbook.md), [https-deploy-dry-run.md](./https-deploy-dry-run.md), `web/.env.example`, `web/.env.production.example`.

---

## 0. Prerequisites

- Node 22+, pnpm 10.x (repo uses Corepack)
- Docker Desktop (for Postgres)
- PowerShell from repo root `D:\MyProjects\PolishApp` (or your clone path)

---

## 1. Postgres

```powershell
docker compose up -d postgres
```

Compose maps host **5433** → container 5432 (avoids clash with a local Postgres on 5432).  
Credentials match `web/.env.example`: user/password/db `slowarium`.

Check:

```powershell
docker compose ps
```

---

## 2. Env — seed once, then closed-beta flags

```powershell
cd web
Copy-Item .env.example .env.local
```

**First seed** (needs demo seed gate): leave `DEMO_MODE=true` in `.env.local`, then:

```powershell
pnpm install
pnpm db:migrate
pnpm db:seed
```

Seed imports DRAFT A1 YAML, creates demo staff/learner users, and beta invite **slots** (plaintext tokens are discarded — create a real invite in admin later).

**Then switch to closed-beta shape** in `.env.local` (edit the file):

```
BETA_MODE=true
BETA_ALLOW_DRAFT=true
DEMO_MODE=false
DEMO_PREVIEW=false
NEXT_PUBLIC_DEMO_PREVIEW=false
```

Keep `DATABASE_URL=postgresql://slowarium:slowarium@localhost:5433/slowarium` and the dev secrets from the example (local only — never commit filled production secrets).

Validate names (optional):

```powershell
pnpm ops:validate-env
```

---

## 3. Run the app

If port **3000** hangs (health curl never returns), a **stale** `node` from an earlier `pnpm dev` may still own `127.0.0.1:3000`. Kill it, then start fresh:

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
```

```powershell
pnpm dev
```

Open `http://localhost:3000` (or your `APP_URL` — `127.0.0.1` is fine if that matches `.env.local`).

Smoke:

```powershell
curl.exe -fsS http://localhost:3000/api/health
curl.exe -fsS http://localhost:3000/api/ready
```

Sign in as seeded **admin** after the first seed (`admin@demo.slowarium.local` / `DemoAdmin1!` from `DEMO_ACCOUNTS.admin` in `web/src/modules/auth/demo.ts`). With `DEMO_MODE=false` the accounts still exist in DB if you seeded earlier.

Quick path check after login:

1. `/{locale}/dashboard` — five DRAFT halls listed (café, sklep, …) when the user has `previewer` (admin/learner demo accounts do).
2. `/{locale}/learn/w-kawiarni` → open `/{locale}/learn/lessons/LES-A1-WK-01` — expect preview honesty chrome.
3. Ordinary learner `ordinary@demo.slowarium.local` / `DemoOrdinary1!` (roles: `learner` only) should **not** see DRAFT hall links on the dashboard.

---

## 4. Invite path (closed beta)

1. Admin → `/ru/admin/beta` (or `/uk` / `/pl`).
2. Create invite — plaintext token shown **once**.
3. Open invite URL in a private window: `{APP_URL}/{locale}/invite/{token}`.
4. Register → onboarding → open a DRAFT hall (café / spotkanie / …).
5. Expect preview honesty banner; attempts stay in **preview** mastery scope until JPJO + PUBLISHED.

Ordinary learner **without** previewer must not open DRAFT when `BETA_ALLOW_DRAFT` is off for their role.

---

## 5. Optional: production-like Docker image locally

Build from **repo root** (content is copied into the image):

```powershell
docker build -f web/Dockerfile -t slowarium:web .
```

Run against the compose Postgres (map env explicitly — no fake production secrets):

```powershell
docker run --rm -p 3000:3000 `
  -e DATABASE_URL=postgresql://slowarium:slowarium@host.docker.internal:5433/slowarium `
  -e BETTER_AUTH_SECRET=local-dev-only-change-me `
  -e INVITE_TOKEN_PEPPER=local-dev-only-pepper `
  -e PRIVACY_AUDIT_SECRET=local-dev-only-privacy `
  -e BETTER_AUTH_URL=http://localhost:3000 `
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 `
  -e APP_URL=http://localhost:3000 `
  -e BETA_MODE=true `
  -e BETA_ALLOW_DRAFT=true `
  -e DEMO_MODE=false `
  -e DEMO_PREVIEW=false `
  slowarium:web
```

Migrate **before** relying on readiness (separate step, not baked into `CMD`):

```powershell
cd web
$env:DATABASE_URL="postgresql://slowarium:slowarium@localhost:5433/slowarium"
pnpm db:migrate
```

Smoke:

```powershell
curl.exe -fsS http://localhost:3000/api/health
curl.exe -fsS http://localhost:3000/api/ready
```

---

## Honesty

| Claim | Status |
| --- | --- |
| Local invite + DRAFT learning | **PASS** smoke 2026-09-10 (health/ready, admin DRAFT halls, lesson open) — see [improvement-loop-status.md](../reports/improvement-loop-status.md) |
| Live HTTPS / Vercel + Neon | **EXTERNAL** — see [external-unblock-wizard.md](./external-unblock-wizard.md) |
| Content PUBLISHED / JPJO approved | **Blocked** — do not flip status |
