# FOUNDER UNBLOCK NOW

**Primary path:** **Vercel (web)** + **Neon** (preferred) or **Supabase** Postgres → live HTTPS closed beta.  
**Status (2026-09-10):** GitHub Environment `private-beta` shell **exists** (secrets still empty). No live HTTPS claimed. No fake secrets. No fake `PUBLISHED`. Code cannot mint accounts for you.

**Contract (must match live):** `BETA_ALLOW_DRAFT=true`, `DEMO_MODE=false`, `DEMO_PREVIEW=false`.

**Primary helpers (Windows):**

1. **Preflight (fast, non-interactive)** — validates `vercel.json` + content tracing, lists required env **names**, prints migrate placeholders, probes `vercel`/`gh` auth. Stops cleanly when secrets/login missing. Never invents values.

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\vercel-neon-preflight.ps1
# optional: -OpenBrowsers   # opens Neon + Vercel new-project URLs
```

2. **Neon bootstrap (after you have DATABASE_URL)** — migrate against the **direct** URL, print Vercel + invite-first next steps. Never invents URLs. Never sets `DEMO_MODE=true`.

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\neon-bootstrap.ps1 `
  -DirectUrl '<paste Neon DIRECT postgres URL>' `
  -PooledUrl '<optional: Neon POOLED URL for Vercel docs>'
# twin: bash scripts/neon-bootstrap.sh --direct-url '…' [--pooled-url '…']
```

3. **Interactive wizard** — human-owned steps only; prompts each secret by name (never invents); prints Done/Blocked to paste back into chat.

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\founder-unblock.ps1
# or: pwsh -File scripts\founder-unblock.ps1
```

Optional (Git Bash / WSL / macOS): `bash scripts/founder-unblock.sh`

Do **not** paste secret values into chat, tickets, or git. Related: [external-unblock-wizard.md](./external-unblock-wizard.md), [https-deploy-dry-run.md](./https-deploy-dry-run.md), [local-closed-beta.md](./local-closed-beta.md).

---

## Remaining human-only steps

### 1) Postgres — Neon (preferred) or Supabase (~10 min)

**Neon (preferred):**

1. Open https://console.neon.tech → sign in → **New Project** (Postgres).
2. Copy connection strings:
   - **Pooled** (`…-pooler…`) → use as app `DATABASE_URL` on Vercel (serverless-friendly).
   - **Direct** (no pooler) → use for one-off migrations (`neon-bootstrap` / `pnpm db:migrate`).
3. Keep both somewhere safe (password manager). Do not invent URLs.
4. **Immediately after Create**, from repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\neon-bootstrap.ps1 `
  -DirectUrl '<DIRECT URL>' `
  -PooledUrl '<POOLED URL>'
```

That runs `pnpm --dir web db:migrate` with the direct URL and prints the Vercel env checklist.

**Supabase (alternative):**

1. Open https://supabase.com/dashboard → **New project**.
2. **Project Settings → Database** → copy URI.
3. Prefer the **direct** connection for migrations; pooled/transaction mode for the app if offered. Same variable name: `DATABASE_URL`.
4. Run the same `neon-bootstrap.ps1 -DirectUrl '…'` (name is Neon-first; works for any Postgres URI).

### 2) Vercel project linked to this repo (~15 min)

1. Open https://vercel.com → **Add New… → Project** → Import **`IvanStabronik/PolishApp`**.
2. Monorepo settings (pick **one**):
   - **A (recommended with root `vercel.json`):** leave Root Directory empty / `.` — install/build use root `vercel.json` (`pnpm --dir web build`). Sibling `content/` stays in the clone.
   - **B:** set Root Directory to `web` — then `web/next.config.ts` must ship `../content` via `outputFileTracingRoot` + `outputFileTracingIncludes` (already configured).
3. Do **not** rely on Docker for Vercel (Dockerfile remains for local/legacy hosts only).
4. Deploy once (or wait for first Git deploy). Copy the public HTTPS URL (`https://….vercel.app`) — that is `BASE_URL` (no trailing slash).

### 3) Env vars on Vercel (not in git)

Project → **Settings → Environment Variables** → Production (and Preview if you use it). Shape from `web/.env.production.example`:

```
NODE_ENV=production
DATABASE_URL=<Neon pooled or Supabase URI>
BETTER_AUTH_SECRET=<generate>
INVITE_TOKEN_PEPPER=<generate>
PRIVACY_AUDIT_SECRET=<generate>
BETTER_AUTH_URL=https://<your>.vercel.app
NEXT_PUBLIC_APP_URL=https://<your>.vercel.app
APP_URL=https://<your>.vercel.app
BETA_MODE=true
BETA_ALLOW_DRAFT=true
DEMO_MODE=false
DEMO_PREVIEW=false
```

Generate three secrets (PowerShell, from repo `web/`):

```powershell
cd D:\MyProjects\PolishApp\web
pnpm ops:generate-secret
pnpm ops:generate-secret
pnpm ops:generate-secret
```

Paste as `BETTER_AUTH_SECRET` / `INVITE_TOKEN_PEPPER` / `PRIVACY_AUDIT_SECRET`. Never invent values in chat.

Redeploy after saving env vars (Deployments → … → Redeploy, or push / Deploy Hook).

**DB client note (Vercel / `NODE_ENV=production`):** `web/src/db/client.ts` always caches the postgres.js handle on `globalThis` so `/api/ready` and migrate locks work under production. Do **not** reintroduce a “skip sql cache in production” guard — that broke `getSql()` on serverless. App `DATABASE_URL` should be the **pooled** Neon URL (`prepare: false`, `max: 1` on Vercel).

### 4) Run migrations against Neon/Supabase (one-off)

Migrations are **not** baked into Vercel app start. Prefer the bootstrap script (step 1.4). Manual equivalent (use the **direct** DB URL if Neon pooler breaks migrate):

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\neon-bootstrap.ps1 -DirectUrl "<paste DIRECT postgres URL>"
# or:
cd D:\MyProjects\PolishApp\web
$env:DATABASE_URL = "<paste DIRECT postgres URL>"   # never commit
pnpm db:migrate
```

Stop if migrate fails — do not claim ready. See [release-and-rollback.md](./release-and-rollback.md).

### 5) Content YAML on Vercel

Lesson YAML lives at repo `content/` (sibling of `web/`). On Vercel:

- Root `vercel.json` builds from the monorepo so `content/` is present at build time.
- `web/next.config.ts` sets `outputFileTracingRoot` to the repo root and includes `../content/**/*` (plus root `package.json` / `vercel.json` markers) so serverless functions can read YAML at runtime.
- Runtime `findRepoRoot` accepts a traced `content/a1/modules` tree **without** requiring `docs/curriculum` on the NFT bundle (avoids empty DRAFT catalog).

No manual copy step if you deploy from this repo as linked above.

### 6) First admin → invite-first (no `DEMO_MODE` on Vercel)

**Preferred** — real founder email, `DEMO_MODE` stays false (never set on Vercel):

```powershell
powershell -ExecutionPolicy Bypass -File scripts\bootstrap-first-admin.ps1 `
  -DatabaseUrl '<DIRECT URL>' `
  -Email 'you@example.com' `
  -Password '<strong password>'
```

Refuses if `DEMO_MODE=true` or `ALLOW_PRODUCTION_DEMO=true` is already in the shell. Never writes those to Vercel. Twin: `bash scripts/bootstrap-first-admin.sh --database-url '…' --email '…' --password '…'`.

**Fallback** — one-shot demo accounts from your laptop only:

1. `FORCE_SEED=true` + direct `DATABASE_URL` → `pnpm db:seed` (keep `DEMO_MODE` unset/false).
2. Refuses `FORCE_SEED` + `DEMO_MODE` together when `NODE_ENV=production`.

Then on live HTTPS (`DEMO_MODE=false`, `BETA_ALLOW_DRAFT=true`):

1. Sign in as bootstrap admin (or seeded `admin@demo.slowarium.local` if FORCE_SEED fallback).
2. `/{locale}/admin/beta` → create invite → share `/{locale}/invite/{token}`.
3. Invitee: accept → register → onboard → one DRAFT lesson.

`neon-bootstrap.ps1` prints the exact commands. **Never** set `DEMO_MODE=true` or `ALLOW_PRODUCTION_DEMO=true` on Vercel for real closed beta.

### 7) GitHub Environment `private-beta` (optional)

**App secrets live primarily on Vercel.** GitHub Environment secrets are only needed if you use Actions workflow **Deploy private beta** (migrate + deploy hook + health/smoke).

Environment shell **already exists**. If using the workflow, add Environment secrets:

| Secret | Paste |
| --- | --- |
| `DATABASE_URL` | Same as Vercel (prefer direct for migrate job) |
| `BETTER_AUTH_SECRET` | Same as Vercel |
| `BASE_URL` | `https://….vercel.app` (no trailing slash) |
| Deploy (prefer): `VERCEL_DEPLOY_HOOK_URL` | Vercel → Project → Settings → Git → Deploy Hooks |
| Or CLI trio: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Vercel account/token + project settings |

Optional smoke later: `PROD_SMOKE_ADMIN_EMAIL` / `PROD_SMOKE_ADMIN_PASSWORD`.

Legacy (secondary): `DEPLOY_WEBHOOK_URL` or `RAILWAY_TOKEN` + `RAILWAY_SERVICE_ID` — not the primary path.

Empty secret = `deploy.yml` fails closed. Do not invent values.

### 8) Prove live HTTPS (PowerShell)

```powershell
$BASE_URL = "https://YOUR_PROJECT.vercel.app"   # no trailing slash
curl.exe -fsS "$BASE_URL/api/health"
curl.exe -fsS "$BASE_URL/api/ready"
```

Both must return HTTP 200. Browser must open the same host without cert warning.

Then: create invite → accept → onboard → one lesson attempt persists.

Mark Done rows in `docs/operations/external-unblock-wizard.md` only after those curls succeed.

### 9) JPJO (parallel, human only)

Packet: `docs/reviews/pierwsze-spotkanie-jpjo-hall-packet.md`  
Status stays `NOT_STARTED` until a real reviewer opens it. AI must not APPROVE. No `PUBLISHED` until packet + DEC-016 gates.

---

## Done when

- [ ] `/api/health` and `/api/ready` 200 on real HTTPS
- [ ] Wizard / checklist § Neon+Vercel + closed-beta flags + health rows Done
- [ ] (Optional) JPJO calendar booked — still not PUBLISHED

Until then: local closed-beta only. Score stays ~**35.5 / 50** EXTERNAL (HTTPS/JPJO still blocked).

**Exact next commands (human) — after Neon Create:**

1. `scripts\neon-bootstrap.ps1 -DirectUrl '<DIRECT>' -PooledUrl '<POOLED>'`
2. Import `IvanStabronik/PolishApp` on Vercel → set env from `.env.production.example` (pooled `DATABASE_URL`; `DEMO_MODE=false`).
3. Redeploy → curl `/api/health` + `/api/ready` on the `*.vercel.app` host.
4. `scripts\bootstrap-first-admin.ps1 -DatabaseUrl '<DIRECT>' -Email '…' -Password '…'` → admin → invite → accept → onboard → one DRAFT attempt.

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\vercel-neon-preflight.ps1 -OpenBrowsers
# after Neon Create:
powershell -ExecutionPolicy Bypass -File scripts\neon-bootstrap.ps1 -DirectUrl '<DIRECT>' -PooledUrl '<POOLED>'
powershell -ExecutionPolicy Bypass -File scripts\founder-unblock.ps1
```

---

## Legacy (optional)

Railway + Docker image remains a secondary host path (see `web/Dockerfile`, older M5 notes). Prefer Vercel + Neon for closed beta.
