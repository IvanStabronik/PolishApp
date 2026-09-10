# Vercel + Neon — screenshot-free click checklist

**Audience:** founder / operator with a browser, no tribal knowledge.  
**Stance:** Exact UI labels as of 2026-09 (Neon Console + Vercel Dashboard). Labels drift — if a button is renamed, follow the nearest synonym; do not invent secrets.  
**Related:** [FOUNDER-UNBLOCK-NOW.md](./FOUNDER-UNBLOCK-NOW.md), `scripts/vercel-neon-preflight.ps1`, `scripts/neon-bootstrap.ps1`, `scripts/smoke-vercel.ps1`.

No screenshots. No fake `PUBLISHED`. No live HTTPS claimed until §6 curls/`smoke-vercel` pass.

---

## 0) Repo preflight (optional, ~1 min)

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\vercel-neon-preflight.ps1 -OpenBrowsers
```

Stops cleanly if `vercel login` / secrets missing. Opens Neon + Vercel new-project URLs when `-OpenBrowsers`.

---

## 1) Neon — create Postgres

| # | Click / action | Exact label (or nearest) |
| --- | --- | --- |
| 1.1 | Open | https://console.neon.tech |
| 1.2 | Sign in (GitHub / Google / email) | **Log in** / **Sign in** |
| 1.3 | Create project | **New Project** (or **Create project**) |
| 1.4 | Name + region | Project name (any); region EU if invitees are in PL |
| 1.5 | Confirm | **Create Project** |
| 1.6 | Connection strings | Dashboard → **Connection Details** / **Connect** |
| 1.7 | Copy **pooled** | URI containing `-pooler` → app `DATABASE_URL` on Vercel |
| 1.8 | Copy **direct** | URI **without** `-pooler` → migrations / `neon-bootstrap` |
| 1.9 | Store both | Password manager only — never chat / git |

Immediately after Create:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\neon-bootstrap.ps1 `
  -DirectUrl '<DIRECT URL from 1.8>' `
  -PooledUrl '<POOLED URL from 1.7>'
```

---

## 2) Vercel — import this repo

| # | Click / action | Exact label (or nearest) |
| --- | --- | --- |
| 2.1 | Open | https://vercel.com/new |
| 2.2 | Sign in | **Log In** → GitHub |
| 2.3 | Import | **Import** next to **`IvanStabronik/PolishApp`** (or **Add New… → Project**) |
| 2.4 | Root Directory | Leave empty / `.` (root `vercel.json` builds `web/`) |
| 2.5 | Framework | Should detect **Next.js** |
| 2.6 | Do **not** Deploy yet if env empty | Prefer **Environment Variables** first, or Deploy once then set env + **Redeploy** |
| 2.7 | Create | **Deploy** |

---

## 3) Vercel — Environment Variables (Production)

| # | Click / action | Exact label |
| --- | --- | --- |
| 3.1 | Project → | **Settings** |
| 3.2 | Left nav → | **Environment Variables** |
| 3.3 | Scope | **Production** (and **Preview** if you use preview deploys) |
| 3.4 | Add each key | **Key** / **Value** → **Save** |

Required names (values from Neon + `pnpm ops:generate-secret` ×3 — never invent in chat):

```
NODE_ENV=production
DATABASE_URL=<Neon POOLED URL>
BETTER_AUTH_SECRET=<generated>
INVITE_TOKEN_PEPPER=<generated>
PRIVACY_AUDIT_SECRET=<generated>
BETTER_AUTH_URL=https://<your>.vercel.app
NEXT_PUBLIC_APP_URL=https://<your>.vercel.app
APP_URL=https://<your>.vercel.app
BETA_MODE=true
BETA_ALLOW_DRAFT=true
DEMO_MODE=false
DEMO_PREVIEW=false
```

Generate secrets:

```powershell
cd D:\MyProjects\PolishApp\web
pnpm ops:generate-secret
pnpm ops:generate-secret
pnpm ops:generate-secret
```

| # | After env saved | Exact label |
| --- | --- | --- |
| 3.5 | Deployments tab | **Deployments** |
| 3.6 | Latest deployment menu | **⋯** → **Redeploy** → confirm **Redeploy** |
| 3.7 | Copy public URL | `https://….vercel.app` — that is `BASE_URL` (no trailing slash) |

---

## 4) First admin (no DEMO_MODE)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-first-admin.ps1 `
  -DatabaseUrl '<DIRECT URL>' `
  -Email 'you@example.com' `
  -Password '<strong password>'
```

Script refuses `DEMO_MODE=true` / production demo theater.

---

## 5) Prove HTTPS (must pass before claiming live)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\smoke-vercel.ps1 `
  -BaseUrl https://YOUR_PROJECT.vercel.app
```

Equivalent:

```powershell
curl.exe -fsS "https://YOUR_PROJECT.vercel.app/api/health"
curl.exe -fsS "https://YOUR_PROJECT.vercel.app/api/ready"
```

Both must be HTTP 200. Then: admin → invite → accept → onboard → one DRAFT lesson attempt.

Mark Done in [external-unblock-wizard.md](./external-unblock-wizard.md) §4 **only** after smoke PASS.

---

## 6) Still EXTERNAL (not this checklist)

- Independent JPJO reviewer → no AI `APPROVE`, no fake `PUBLISHED`
- GitHub Environment `private-beta` secrets (optional if Vercel Git alone)
- Studio voiceover replace for assessed listening

---

## Verdict

| State | Meaning |
| --- | --- |
| Checklist followed, smoke PASS | Live HTTPS proven — still not reference quality until JPJO + bar |
| Neon URL not pasted / Vercel not linked | **Blocked** — code cannot unlock |
| Smoke FAIL | Redeploy / check pooled URL / migrate with direct URL — do not claim Done |
