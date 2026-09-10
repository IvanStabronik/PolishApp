# HTTPS private-beta deploy — dry-run checklist (fail closed)

**Purpose:** An operator who only has this checklist + `web/.env.production.example` can prove whether a private-beta HTTPS deploy is ready — without inventing secrets or tribal knowledge.

**Stance:** Fail closed. Any unchecked **BLOCKER** means **do not deploy**.

**Primary path:** Vercel + Neon/Supabase. Railway/Docker = secondary.

Related: [deployment.md](../runbooks/deployment.md), [deployment-v1.md](../architecture/deployment-v1.md), [release-and-rollback.md](./release-and-rollback.md), `.github/workflows/deploy.yml`, `vercel.json`.

---

## 0. Preconditions (local)

| # | Check | Pass? |
| --- | --- | --- |
| 0.1 | Clone contains `web/.env.production.example`, root `vercel.json`, and this file | ☐ |
| 0.2 | `cd web && pnpm ops:validate-env` against a filled env file fails closed on missing required keys (no silent skip) | ☐ |
| 0.3 | `pnpm content:validate` passes on the commit you intend to ship | ☐ |

If 0.2 cannot be run because the example file omits a required key name — **BLOCKER**: fix the example before claiming a dry-run path.

---

## 1. Secrets inventory (no invention)

Fill only from a real secret store. Empty cell = **BLOCKER**.

| Secret / env | Where configured | Present? |
| --- | --- | --- |
| `DATABASE_URL` | Vercel env (+ optional GitHub `private-beta` for migrate job) | ☐ |
| `BETTER_AUTH_SECRET` | Vercel env (+ optional GitHub) | ☐ |
| `BETTER_AUTH_URL` / public origin | Vercel env | ☐ |
| `INVITE_TOKEN_PEPPER` | Vercel env | ☐ |
| `BASE_URL` (https://…) | Known `*.vercel.app` or custom; optional GitHub secret for smoke | ☐ |
| Deploy: Vercel Git integration **or** `VERCEL_DEPLOY_HOOK_URL` **or** (`VERCEL_TOKEN` + `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID`) | Vercel / optional GitHub | ☐ |
| Closed beta: `BETA_ALLOW_DRAFT=true` with `DEMO_MODE=false` (and other `DEMO_*=false`) | Vercel env | ☐ |

**Do not** paste secret values into this checklist, tickets, or commits.

---

## 2. GitHub workflow dry-run (no production mutate)

Optional if you rely on Vercel Git alone. If you use `deploy.yml`:

| # | Check | Pass? |
| --- | --- | --- |
| 2.1 | Workflow `.github/workflows/deploy.yml` is `workflow_dispatch` only (no push-to-main auto deploy) | ☐ |
| 2.2 | Guard job refuses when `confirm_environment` ≠ `private-beta` | ☐ |
| 2.3 | Guard job exits non-zero when `DATABASE_URL` / `BETTER_AUTH_SECRET` missing | ☐ |
| 2.4 | Guard job exits non-zero when no Vercel/legacy deploy transport is set | ☐ |
| 2.5 | If using Vercel CLI secrets: all three of `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` required | ☐ |
| 2.6 | Legacy Railway: `RAILWAY_SERVICE_ID` required if `RAILWAY_TOKEN` set | ☐ |

To verify without deploying: leave secrets empty in a scratch environment and confirm the guard fails. Do **not** use production Environment for this negative test.

---

## 3. HTTPS live proof (after real deploy)

| # | Check | Pass? |
| --- | --- | --- |
| 3.1 | `curl -fsS "$BASE_URL/api/health"` → 200 | ☐ |
| 3.2 | `curl -fsS "$BASE_URL/api/ready"` → 200 (DB reachable; migrate done) | ☐ |
| 3.3 | Browser opens `https://…` with valid cert (no cert warning for invitees) | ☐ |
| 3.4 | Invite accept → onboard → open module → complete one lesson attempt persists | ☐ |
| 3.5 | Rollback path written and reachable (`docs/operations/release-and-rollback.md`) | ☐ |

Any failure in 3.1–3.4 → **rollback previous deploy**; do not “hotfix live” without a recorded change.

---

## 4. Content honesty gate

| # | Check | Pass? |
| --- | --- | --- |
| 4.1 | No fake `PUBLISHED` without independent JPJO review | ☐ |
| 4.2 | If DRAFT learning is enabled, invitees see the short preview banner only — not staff ops dump | ☐ |
| 4.3 | Monorepo `content/` available on Vercel (`vercel.json` + `outputFileTracingIncludes`) | ☐ |

---

## Verdict

- All BLOCKER rows checked → dry-run **PASS** (still not “reference quality”).
- Any BLOCKER unchecked → dry-run **FAIL**; deploy workflow must refuse or operator must stop.

**EXTERNAL ACCESS REQUIRED** until Neon/Supabase + Vercel credentials exist and health/ready prove HTTPS. This document does not create them.
