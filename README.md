# SŁOWARIUM

**SŁOWARIUM** (`slowarium`) — Akademia języka polskiego.  
Web platform for adults with L1 Ukrainian / Russian / Belarusian who need systematic Polish (A1→B2): living situations, measurable mastery, L1-aware correction — not a children’s game and not a certificate mill.

Working phrase: **Od podobnych słów do własnego głosu**.

## Status (Milestone 5 — deployed private beta)

| Gate | Status |
| --- | --- |
| Milestone 4 operable closed beta | **COMPLETE** (merged PR #3) |
| Deployed private beta package | **In progress on `feat/deployed-private-beta-v5`** |
| Provider URL / Railway credentials | **EXTERNAL ACCESS REQUIRED** until secrets exist |
| Five A1 DRAFT modules | **internal / invite preview only** |
| Public content release | **BLOCKED** pending independent JPJO review |
| A2–B2 semantic migration | **NOT STARTED** |

Structural CI green ≠ pedagogical approval. Preview mastery is marked as internal aproba — not a certificate.

## Branch

Active private-beta deploy work: **`feat/deployed-private-beta-v5`** (base `docs/requirements-r2`).

## Stack

| Piece | Choice |
| --- | --- |
| App | Next.js App Router (`web/`) |
| Packages | pnpm (Node 22) |
| DB | PostgreSQL 16 via Docker Compose (prod: managed Postgres) |
| ORM | Drizzle (advisory-locked migrate) |
| Auth | Better Auth (invite-only when `BETA_MODE=true`) |
| Content | YAML under `content/` + Zod validate/import |
| UI i18n | next-intl (UI locale ≠ L1) |
| Tests | Vitest + Playwright (incl. production smoke project) |
| Deploy | Multi-stage `web/Dockerfile` (provider-portable; Railway primary) |

Why the app is under `web/`: [ADR-007](docs/architecture/adr/007-web-directory.md).

## Prerequisites

- Node **22** (see `.nvmrc` / `engines`)
- pnpm 10+
- Docker (Postgres)
- Python 3.10+ (curriculum validator)

## Quick start

```bash
# 1) Postgres
docker compose up -d

# 2) App deps (from repo root or web/)
cd web
pnpm install

# 3) Env
cp ../.env.example ../.env
cp .env.example .env.local   # if present

# 4) Schema + demo users
pnpm db:migrate
pnpm db:seed

# 5) Content package (no DB required for validate)
pnpm content:validate
# optional: pnpm content:import

# 6) Dev server
pnpm dev
```

App: [http://localhost:3000](http://localhost:3000)

From repo root:

```bash
docker compose up -d
pnpm install --dir web
pnpm db:migrate && pnpm db:seed
pnpm content:validate
pnpm dev
```

Curriculum structural check (repo root):

```bash
python scripts/validate-curriculum.py
```

## Demo credentials

Seeded when `DEMO_MODE=true` / after `pnpm db:seed` (local only — **not** for production):

| Role | Email | Password | Notes |
| --- | --- | --- | --- |
| Learner + previewer | `learner@demo.slowarium.local` | `DemoLearner1!` | Sees DRAFT in private alpha |
| Author + previewer | `author@demo.slowarium.local` | `DemoAuthor1!` | Content authoring |
| Reviewer + previewer | `reviewer@demo.slowarium.local` | `DemoReviewer1!` | Distinct from author |

Ordinary registered learners **without** `previewer`/`author`/`reviewer` do **not** see DRAFT.

## Useful scripts

| Command | What it does |
| --- | --- |
| `pnpm lint` / `pnpm typecheck` | ESLint + `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:integration` | Postgres integration (M4/M5) |
| `pnpm test:e2e` | Playwright M2–M4 suites |
| `pnpm test:e2e:production` | Deployed-env smoke (`BASE_URL` required; no local webServer) |
| `pnpm ops:validate-env` | Zod runtime env check |
| `pnpm ops:generate-secret` | Cryptographic secret for auth/pepper |
| `pnpm content:validate` | Zod-validate YAML under `content/` |
| `pnpm db:migrate` / `pnpm db:seed` | Schema + demo users |
| `python scripts/validate-curriculum.py` | Curriculum structural integrity |

## Environment

See `.env.example` / `web/.env.example` (local) and `web/.env.production.example` (private beta):

- `DATABASE_URL=…`
- `BETTER_AUTH_SECRET=…` (generate: `pnpm ops:generate-secret`)
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` / `APP_URL`
- `INVITE_TOKEN_PEPPER`, `PRIVACY_AUDIT_SECRET`
- `BETA_MODE=true`
- Local: `DEMO_MODE=true` / `DEMO_PREVIEW=true`
- Production: `DEMO_MODE=false` / `DEMO_PREVIEW=false`

## Docs

- Brand: `docs/brand/brand-foundation.md`
- Design handoff: `docs/design/figma-handoff.md`
- Architecture: `docs/architecture/` (incl. [deployment-v1.md](docs/architecture/deployment-v1.md))
- Operations: `docs/operations/` (runbook, incident, backup, release)
- Requirements / curriculum: `docs/requirements/`
- Contributing: `CONTRIBUTING.md`
