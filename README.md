# SŁOWARIUM

**SŁOWARIUM** (`slowarium`) — Akademia języka polskiego.  
Web platform for adults with L1 Ukrainian / Russian / Belarusian who need systematic Polish (A1→B2): living situations, measurable mastery, L1-aware correction — not a children’s game and not a certificate mill.

Working phrase: **Od podobnych słów do własnego głosu**.

## Status (private alpha v2)

| Gate | Status |
| --- | --- |
| Five A1 DRAFT modules | **internal preview only** (previewer / author / reviewer) |
| Auth / onboarding / attempts | **PostgreSQL** via Better Auth (no client fake session) |
| Public content release | **BLOCKED** pending independent JPJO review |
| A2–B2 semantic migration | **NOT STARTED** |

Structural CI green ≠ pedagogical approval. Preview mastery is marked as internal aproba — not a certificate.

## Branch

Active private-alpha work: **`feat/private-alpha-v2`** (from foundation `6ab4592`).

Curriculum structural baseline: branch **`docs/phase-2-integrity-fix`** (see also `docs/requirements/curriculum/phase-2-integrity-report.md`).

Related review packet (not approved): `docs/reviews/`, `docs/reports/phase-2-a1-review-readiness-report.md`.

## Stack

| Piece | Choice |
| --- | --- |
| App | Next.js App Router (`web/`) |
| Packages | pnpm (Node 22) |
| DB | PostgreSQL 16 via Docker Compose |
| ORM | Drizzle |
| Auth | Better Auth |
| Content | YAML under `content/` + Zod validate/import |
| UI i18n | next-intl (UI locale ≠ L1) |
| Tests | Vitest + Playwright |

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

From repo root (workspace scripts proxy into `web/`):

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

Seeded when `DEMO_MODE=true` / after `pnpm db:seed` (local only):

| Role | Email | Password | Notes |
| --- | --- | --- | --- |
| Learner + previewer | `learner@demo.slowarium.local` | `DemoLearner1!` | Sees DRAFT in private alpha |
| Author + previewer | `author@demo.slowarium.local` | `DemoAuthor1!` | Content authoring |
| Reviewer + previewer | `reviewer@demo.slowarium.local` | `DemoReviewer1!` | Distinct from author |

Ordinary registered learners **without** `previewer`/`author`/`reviewer` do **not** see DRAFT.

Author and reviewer are **different accounts** (self-review of content is prohibited).

## Useful scripts

| Command | What it does |
| --- | --- |
| `pnpm lint` / `pnpm typecheck` | ESLint + `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright smoke |
| `pnpm content:validate` | Zod-validate YAML under `content/` |
| `pnpm content:import` | Import YAML into DB |
| `pnpm db:migrate` / `pnpm db:seed` | Schema + demo users |
| `python scripts/validate-curriculum.py` | Curriculum structural integrity |

## Environment

See `.env.example` / `web/.env.example`:

- `DATABASE_URL=postgresql://slowarium:slowarium@localhost:5433/slowarium` (Docker maps host **5433** → container 5432)
- `BETTER_AUTH_SECRET=…`
- `BETTER_AUTH_URL=http://localhost:3000`
- `DEMO_MODE=true`
- `DEMO_PREVIEW=true` (server-side preview env; **not** an auth substitute)
- `NEXT_PUBLIC_DEMO_PREVIEW` is **not** used for DRAFT authorization

## Docs

- Brand: `docs/brand/brand-foundation.md`
- Design handoff (*Pierwsze spotkanie*): `docs/design/figma-handoff.md`
- Architecture: `docs/architecture/`
- Requirements / curriculum: `docs/requirements/`
- Contributing: `CONTRIBUTING.md`
