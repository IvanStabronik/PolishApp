# EXTERNAL unblock wizard (founder checklist)

Ruthless path to unlock what code cannot: live HTTPS + independent JPJO.  
**No fake credentials. No fake PUBLISHED.**

**Primary path:** Vercel (web) + Neon (preferred) or Supabase Postgres. Railway/Docker = secondary/legacy.

Related: `web/.env.production.example`, `vercel.json`, `.github/workflows/deploy.yml`, [https-deploy-dry-run.md](./https-deploy-dry-run.md), [local-closed-beta.md](./local-closed-beta.md), [FOUNDER-UNBLOCK-NOW.md](./FOUNDER-UNBLOCK-NOW.md), [pierwsze-spotkanie-jpjo-hall-packet.md](../reviews/pierwsze-spotkanie-jpjo-hall-packet.md).

**Interactive path:** `pwsh -File scripts/founder-unblock.ps1` (optional: `bash scripts/founder-unblock.sh`). Paste its Done/Blocked output back into chat; then mark matching rows here only after real curls succeed.

Mark each row **Done** or **Blocked**. Empty secret = Blocked.

---

## 1. Neon/Supabase + Vercel (+ optional GitHub secrets)

**App env lives primarily on Vercel.** GitHub Environment `private-beta` is optional (only for Actions `deploy.yml`).

| Item | Source of truth | Done | Blocked |
| --- | --- | --- | --- |
| Neon or Supabase project | Console → copy `DATABASE_URL` (pooled + direct) | ☐ | ☐ |
| Vercel project linked to `IvanStabronik/PolishApp` | vercel.com import; root `vercel.json` or Root Directory `web` | ☐ | ☐ |
| `DATABASE_URL` on Vercel | Neon pooled / Supabase URI | ☐ | ☐ |
| `BETTER_AUTH_SECRET` on Vercel | `pnpm ops:generate-secret` — never invent in chat | ☐ | ☐ |
| `INVITE_TOKEN_PEPPER` on Vercel | Same generator | ☐ | ☐ |
| `PRIVACY_AUDIT_SECRET` on Vercel | Same generator | ☐ | ☐ |
| `BASE_URL` / public URL trio | Real `https://….vercel.app` (or custom domain) | ☐ | ☐ |
| `pnpm db:migrate` against direct DB URL | One-off from laptop / CI | ☐ | ☐ |
| Optional GH: `VERCEL_DEPLOY_HOOK_URL` | Vercel Deploy Hook **or** leave empty if Git auto-deploys only | ☐ | ☐ |
| Optional GH: `VERCEL_TOKEN` + `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID` | Only if using CLI path in `deploy.yml` | ☐ | ☐ |
| Legacy (secondary): `RAILWAY_TOKEN` + `RAILWAY_SERVICE_ID` | Optional; not primary | ☐ | ☐ |
| Optional smoke: `PROD_SMOKE_ADMIN_EMAIL` / `PASSWORD` | Real admin used only for production smoke | ☐ | ☐ |

Host runtime must also set public URLs from `.env.production.example`:

| Runtime env (on Vercel) | Done | Blocked |
| --- | --- | --- |
| `BETTER_AUTH_URL=https://…` | ☐ | ☐ |
| `NEXT_PUBLIC_APP_URL=https://…` | ☐ | ☐ |
| `APP_URL=https://…` | ☐ | ☐ |
| `NODE_ENV=production` | ☐ | ☐ |

**Do not** paste secret values into this file, tickets, or git.

Guard expectations (from `deploy.yml`): workflow is `workflow_dispatch` only; missing DB/auth secrets or missing deploy transport → fail closed. Vercel Git integration alone is enough for app deploys without the workflow.

---

## 2. Closed-beta flags (live)

On **Vercel** Environment Variables, set exactly this shape:

| Env | Value | Done | Blocked |
| --- | --- | --- | --- |
| `BETA_MODE` | `true` | ☐ | ☐ |
| `BETA_ALLOW_DRAFT` | `true` | ☐ | ☐ |
| `DEMO_MODE` | `false` | ☐ | ☐ |
| `DEMO_PREVIEW` | `false` | ☐ | ☐ |
| `ALLOW_PRODUCTION_DEMO` | unset / false | ☐ | ☐ |

Invite consume already grants `learner` + `previewer`. DRAFT attempts stay preview mastery until independent review + publication gates.

---

## 3. Book JPJO reviewer (first hall)

Packet: [`docs/reviews/pierwsze-spotkanie-jpjo-hall-packet.md`](../reviews/pierwsze-spotkanie-jpjo-hall-packet.md)

| Step | Done | Blocked |
| --- | --- | --- |
| Calendar invite sent to independent JPJO reviewer | ☐ | ☐ |
| Packet status left honest (`NOT_STARTED` → `IN_REVIEW` only when human starts) | ☐ | ☐ |
| Reviewer has live or local preview URL + DRAFT access | ☐ | ☐ |
| Verdict recorded without AI self-approve | ☐ | ☐ |
| **No** content flipped to `PUBLISHED` until gates in packet / DEC-016 close | ☐ | ☐ |

---

## 4. Post-deploy smoke with `BASE_URL`

After a real Vercel deploy (Git push or Deploy Hook) + migrate:

| Check | Done | Blocked |
| --- | --- | --- |
| `curl -fsS "$BASE_URL/api/health"` → 200 | ☐ | ☐ |
| `curl -fsS "$BASE_URL/api/ready"` → 200 | ☐ | ☐ |
| Browser opens HTTPS without cert warning | ☐ | ☐ |
| Create invite → accept → onboard → one lesson attempt persists | ☐ | ☐ |
| Optional: enable `run_production_smoke` in workflow with smoke secrets | ☐ | ☐ |

Any fail → rollback per [release-and-rollback.md](./release-and-rollback.md). Do not invent a green check.

---

## Verdict

| Outcome | Meaning |
| --- | --- |
| All Done in §1–§2 + §4 health/ready | Live closed-beta **reachable** (still not reference quality) |
| §3 Done with APPROVE | First hall may leave DRAFT → review workflow; **PUBLISHED still gated** |
| Any Blocked in §1–§2 | Reference bar / competitive live bakeoff stays **EXTERNAL** |

Code waves can deepen halls and harden APIs. They cannot mint Neon/Vercel accounts or JPJO signatures.
