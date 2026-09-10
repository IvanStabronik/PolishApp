# HTTPS private-beta deploy — dry-run checklist (fail closed)

**Purpose:** An operator who only has this checklist + `web/.env.production.example` can prove whether a private-beta HTTPS deploy is ready — without inventing secrets or tribal knowledge.

**Stance:** Fail closed. Any unchecked **BLOCKER** means **do not deploy**.

Related: [deployment.md](../runbooks/deployment.md), [deployment-v1.md](../architecture/deployment-v1.md), [release-and-rollback.md](./release-and-rollback.md), `.github/workflows/deploy.yml`.

---

## 0. Preconditions (local)

| # | Check | Pass? |
| --- | --- | --- |
| 0.1 | Clone contains `web/.env.production.example` and `docs/operations/https-deploy-dry-run.md` (this file) | ☐ |
| 0.2 | `cd web && pnpm ops:validate-env` against a filled env file fails closed on missing required keys (no silent skip) | ☐ |
| 0.3 | `pnpm content:validate` passes on the commit you intend to ship | ☐ |

If 0.2 cannot be run because the example file omits a required key name — **BLOCKER**: fix the example before claiming a dry-run path.

---

## 1. Secrets inventory (no invention)

Fill only from a real secret store. Empty cell = **BLOCKER**.

| Secret / env | Where configured | Present? |
| --- | --- | --- |
| `DATABASE_URL` | GitHub Environment `private-beta` + host | ☐ |
| `BETTER_AUTH_SECRET` | GitHub Environment `private-beta` + host | ☐ |
| `BETTER_AUTH_URL` / public origin | Host runtime | ☐ |
| `INVITE_TOKEN_PEPPER` | Host runtime | ☐ |
| `BASE_URL` (https://…) | GitHub Environment `private-beta` | ☐ |
| Deploy transport: `DEPLOY_WEBHOOK_URL` **or** (`RAILWAY_TOKEN` + `RAILWAY_SERVICE_ID`) | GitHub Environment `private-beta` | ☐ |
| Closed beta: `BETA_ALLOW_DRAFT=true` with `DEMO_MODE=false` (and other `DEMO_*=false`) | Host runtime | ☐ |

**Do not** paste secret values into this checklist, tickets, or commits.

---

## 2. GitHub workflow dry-run (no production mutate)

| # | Check | Pass? |
| --- | --- | --- |
| 2.1 | Workflow `.github/workflows/deploy.yml` is `workflow_dispatch` only (no push-to-main auto deploy) | ☐ |
| 2.2 | Guard job refuses when `confirm_environment` ≠ `private-beta` | ☐ |
| 2.3 | Guard job exits non-zero when `DATABASE_URL` / `BETTER_AUTH_SECRET` missing | ☐ |
| 2.4 | Guard job exits non-zero when neither `DEPLOY_WEBHOOK_URL` nor `RAILWAY_TOKEN` is set | ☐ |
| 2.5 | If using Railway: `RAILWAY_SERVICE_ID` set; missing service id must exit non-zero (no “echo success”) | ☐ |

To verify without deploying: leave secrets empty in a scratch environment and confirm the guard fails. Do **not** use production Environment for this negative test.

---

## 3. HTTPS live proof (after real deploy)

| # | Check | Pass? |
| --- | --- | --- |
| 3.1 | `curl -fsS "$BASE_URL/api/health"` → 200 | ☐ |
| 3.2 | `curl -fsS "$BASE_URL/api/ready"` → 200 (DB reachable) | ☐ |
| 3.3 | Browser opens `https://…` with valid cert (no cert warning for invitees) | ☐ |
| 3.4 | Invite accept → onboard → open module → complete one lesson attempt persists | ☐ |
| 3.5 | Rollback path written and reachable (`docs/operations/release-and-rollback.md`) | ☐ |

Any failure in 3.1–3.4 → **rollback previous image**; do not “hotfix live” without a recorded change.

---

## 4. Content honesty gate

| # | Check | Pass? |
| --- | --- | --- |
| 4.1 | No fake `PUBLISHED` without independent JPJO review | ☐ |
| 4.2 | If DRAFT learning is enabled, invitees see the short preview banner only — not staff ops dump | ☐ |

---

## Verdict

- All BLOCKER rows checked → dry-run **PASS** (still not “reference quality”).
- Any BLOCKER unchecked → dry-run **FAIL**; deploy workflow must refuse or operator must stop.

**EXTERNAL ACCESS REQUIRED** until Railway/host credentials and GitHub Environment `private-beta` secrets exist. This document does not create them.
