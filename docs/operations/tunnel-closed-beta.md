# Closed-beta HTTPS via free tunnel

**Purpose:** Live HTTPS for invitees while Neon/Vercel is stalled — tunnel the **already-working local closed-beta** (`pnpm dev` on port 3000).

**Not production.** This is not Vercel + Neon. Do not claim Neon done, do not claim `PUBLISHED`, do not fake JPJO. Prefer [FOUNDER-UNBLOCK-NOW.md](./FOUNDER-UNBLOCK-NOW.md) for the real deploy path when accounts are ready.

Related: [local-closed-beta.md](./local-closed-beta.md), [`scripts/tunnel-closed-beta.ps1`](../../scripts/tunnel-closed-beta.ps1), [`scripts/smoke-vercel.ps1`](../../scripts/smoke-vercel.ps1).

---

## Prerequisites (local already PASS)

1. Postgres up (`docker compose up -d postgres`)
2. `web/.env.local` closed-beta shape: `BETA_ALLOW_DRAFT=true`, `DEMO_MODE=false`, `DEMO_PREVIEW=false`
3. `pnpm --dir web dev` listening on **3000**
4. `GET http://127.0.0.1:3000/api/health` and `/api/ready` both **200**

Add once to `web/.env.local` (local only — **never** on Vercel):

```
ALLOW_DEV_TUNNEL_ORIGINS=true
```

Then restart `pnpm dev`. That lets Better Auth / CSRF trust Cloudflare / ngrok HTTPS origins while `BETTER_AUTH_URL` is still loopback.

---

## One command (Windows)

From repo root:

```powershell
cd D:\MyProjects\PolishApp
powershell -ExecutionPolicy Bypass -File scripts\tunnel-closed-beta.ps1
```

What it does:

1. Checks local health/ready (fails closed if local is down)
2. Finds `cloudflared` (prints `winget install` if missing)
3. Starts a **quick tunnel** to `http://127.0.0.1:3000`
4. Prints the public `https://….trycloudflare.com` URL
5. Writes `web/.env.tunnel.local` (gitignored) with `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` / `APP_URL`
6. Smokes `GET {url}/api/health` and `/api/ready`
7. Keeps the tunnel up until Ctrl+C

Optional:

```powershell
# Background tunnel (script exits after smoke; you stop the PID later)
powershell -ExecutionPolicy Bypass -File scripts\tunnel-closed-beta.ps1 -Detach

# Named Cloudflare tunnel (account + DNS already configured)
powershell -ExecutionPolicy Bypass -File scripts\tunnel-closed-beta.ps1 `
  -NamedTunnel slowarium -Hostname beta.example.com

# ngrok fallback
powershell -ExecutionPolicy Bypass -File scripts\tunnel-closed-beta.ps1 -Provider ngrok
```

---

## Login through the tunnel

1. Open the printed HTTPS URL (not `localhost`).
2. If sign-in fails with origin/CSRF errors:
   - Ensure `ALLOW_DEV_TUNNEL_ORIGINS=true` and restart `pnpm dev`
   - Or restart with the tunnel URL as base (script prints the exact PowerShell):

```powershell
cd D:\MyProjects\PolishApp\web
$env:ALLOW_DEV_TUNNEL_ORIGINS = "true"
$env:BETTER_AUTH_URL = "https://YOUR-SUBDOMAIN.trycloudflare.com"
$env:NEXT_PUBLIC_APP_URL = $env:BETTER_AUTH_URL
$env:APP_URL = $env:BETTER_AUTH_URL
pnpm dev
```

3. Quick-tunnel hostnames change every run — restart with the new URL when the hostname rotates.
4. Auth client uses `window.location.origin` in the browser so API calls stay on the tunnel host.

`authUsesSecureCookies` follows `https://` base URL. With loopback `BETTER_AUTH_URL`, cookies are non-Secure (still work on HTTPS). Setting the tunnel URL as `BETTER_AUTH_URL` enables Secure cookies.

---

## Install cloudflared (if missing)

```powershell
winget install --id Cloudflare.cloudflared -e
```

Or: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

---

## Prove smoke (same as any BASE_URL)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\smoke-vercel.ps1 `
  -BaseUrl https://YOUR-SUBDOMAIN.trycloudflare.com
```

Honest paste-back: **tunnel HTTPS health/ready 200** — alternate path only; Neon/Vercel still EXTERNAL until those accounts are finished.

**DNS note:** some home routers fail NXDOMAIN on `*.trycloudflare.com`. The script falls back to public DNS (`1.1.1.1`) + `curl --resolve` for smoke. Browsers on the same LAN may need a public DNS (1.1.1.1 / 8.8.8.8) or a phone hotspot to open the URL.

---

## Prove Session-1 life loop (login → DRAFT → lesson → attempt)

With local closed-beta + tunnel already up:

```powershell
cd D:\MyProjects\PolishApp\web
$env:BASE_URL = "https://YOUR-SUBDOMAIN.trycloudflare.com"
$env:PLAYWRIGHT_BASE_URL = $env:BASE_URL
# When LAN DNS NXDOMAIN on *.trycloudflare.com (Node getaddrinfo fails; Chromium needs MAP):
$ip = (Resolve-DnsName YOUR-SUBDOMAIN.trycloudflare.com -Type A -Server 1.1.1.1 -DnsOnly |
  Where-Object Type -eq A | Select-Object -First 1 -ExpandProperty IPAddress)
$env:PLAYWRIGHT_HOST_RESOLVER_RULES = "MAP YOUR-SUBDOMAIN.trycloudflare.com $ip"
pnpm exec playwright test -c playwright.tunnel.config.ts
```

Writes `web/playwright-artifacts/tunnel-session1/result.json` (gitignored).

### Evidence (ephemeral — URL may be dead later)

| Field | Value |
| --- | --- |
| Timestamp (UTC) | **2026-09-15T16:18:40Z** |
| Public URL | `https://namespace-buying-retailer-strength.trycloudflare.com` |
| Smoke health/ready | **PASS** 200 (via `1.1.1.1` + `curl --resolve`; system DNS NXDOMAIN) |
| Session-1 | **PASS** — admin@demo → dashboard DRAFT halls → `LES-A1-PS-01` → UI attempt `ex-ps-01` |
| Honest claim | Tunnel over **local** closed-beta. **Not** Neon/Vercel. Content remains **DRAFT**. No JPJO. |

---

## Security notes

- `ALLOW_DEV_TUNNEL_ORIGINS` is refused when `BETTER_AUTH_URL` / `APP_URL` point at a real public host (e.g. `*.vercel.app`). Do not set the flag on Vercel.
- Quick tunnels are public URLs — share only with closed-beta invitees; treat like a temporary staging link.
- Prefer named tunnel + your hostname for a stable invite link.
