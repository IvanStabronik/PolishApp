# FOUNDER UNBLOCK NOW

**Status (2026-09-10 probe):** GitHub Environment `private-beta` = **missing**. Repo secrets = **empty**. Railway CLI = **not installed**. `BASE_URL` = **unset**. Code cannot mint live HTTPS. No fake deploy.

**Primary path (Windows):** run the interactive wizard — it walks only human-owned steps, prompts for each secret by name (never invents values), and prints Done/Blocked checkboxes to paste back into chat.

```powershell
cd D:\MyProjects\PolishApp
pwsh -File scripts\founder-unblock.ps1
# or: powershell -ExecutionPolicy Bypass -File scripts\founder-unblock.ps1
```

Optional (Git Bash / WSL / macOS): `bash scripts/founder-unblock.sh`

Do **not** paste secret values into chat, tickets, or git. Related checklists: [external-unblock-wizard.md](./external-unblock-wizard.md), [https-deploy-dry-run.md](./https-deploy-dry-run.md).

---

## Manual fallback (if you prefer not to run the script)

### 1) Railway project (15 min)

1. Open https://railway.app → **New Project** → **Deploy from GitHub** → repo `PolishApp`.
2. Add **Postgres** plugin; copy the Postgres connection URL (this is `DATABASE_URL`).
3. In the web service → **Variables**, paste from `web/.env.production.example` shape:

```
NODE_ENV=production
DATABASE_URL=<postgres url>
BETTER_AUTH_SECRET=<generate>
INVITE_TOKEN_PEPPER=<generate>
PRIVACY_AUDIT_SECRET=<generate>
BETTER_AUTH_URL=https://<your-railway-host>
NEXT_PUBLIC_APP_URL=https://<your-railway-host>
APP_URL=https://<your-railway-host>
BETA_MODE=true
BETA_ALLOW_DRAFT=true
DEMO_MODE=false
DEMO_PREVIEW=false
```

4. Generate three secrets (PowerShell, from repo `web/`):

```powershell
cd D:\MyProjects\PolishApp\web
pnpm ops:generate-secret
pnpm ops:generate-secret
pnpm ops:generate-secret
```

Paste each into Railway as `BETTER_AUTH_SECRET` / `INVITE_TOKEN_PEPPER` / `PRIVACY_AUDIT_SECRET`.

5. Deploy once from Railway UI. Copy the public HTTPS URL → that is `BASE_URL` (no trailing slash).
6. Account → **Tokens** → create token → keep for GitHub.
7. Service settings → copy **Service ID** → keep for GitHub.

### 2) GitHub Environment `private-beta`

1. GitHub → repo → **Settings** → **Environments** → **New environment** → name exactly `private-beta`.
2. Add **Environment secrets** (names must match):

| Secret | Paste |
| --- | --- |
| `DATABASE_URL` | Railway Postgres URL |
| `BETTER_AUTH_SECRET` | same as Railway |
| `INVITE_TOKEN_PEPPER` | same as Railway |
| `PRIVACY_AUDIT_SECRET` | same as Railway |
| `BASE_URL` | `https://…` public app URL |
| `RAILWAY_TOKEN` | Railway account token |
| `RAILWAY_SERVICE_ID` | Railway service ID |

Optional smoke later: `PROD_SMOKE_ADMIN_EMAIL` / `PROD_SMOKE_ADMIN_PASSWORD`.

Do **not** invent values. Empty secret = deploy.yml fails closed.

### 3) Dispatch deploy

1. GitHub → **Actions** → workflow **Deploy private beta** → **Run workflow**.
2. Inputs:
   - `confirm_environment` = `private-beta`
   - `image_tag` = current commit SHA on `docs/requirements-r2` (or `main` when ready)
   - `run_production_smoke` = false until smoke secrets exist
3. Watch guard → migrate → deploy. Any missing secret stops the job — fix and re-run.

### 4) Prove live HTTPS (PowerShell)

```powershell
$BASE_URL = "https://YOUR_PRIVATE_BETA_HOST"   # no trailing slash
curl.exe -fsS "$BASE_URL/api/health"
curl.exe -fsS "$BASE_URL/api/ready"
```

Both must return HTTP 200. Browser must open the same host without cert warning.

Then: create invite → accept → onboard → one lesson attempt persists.

Mark Done rows in `docs/operations/external-unblock-wizard.md` only after those curls succeed.

### 5) JPJO (parallel, human only)

Packet: `docs/reviews/pierwsze-spotkanie-jpjo-hall-packet.md`  
Status stays `NOT_STARTED` until a real reviewer opens it. AI must not APPROVE. No `PUBLISHED` until packet + DEC-016 gates.

---

## Done when

- [ ] `/api/health` and `/api/ready` 200 on real HTTPS
- [ ] Wizard §1–§2 + §4 health rows marked Done
- [ ] (Optional) JPJO calendar booked — still not PUBLISHED

Until then: local closed-beta only. Score stays ~33 / 50 EXTERNAL.
