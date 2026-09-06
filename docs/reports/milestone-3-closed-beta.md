# Milestone 3 — Closed Beta Core report

**Branch:** `feat/closed-beta-v3`
**PR:** https://github.com/IvanStabronik/PolishApp/pull/2 — **do not merge** until independent acceptance audit
**Base branch:** `docs/requirements-r2` (PR #1 merged at `301d8a813b674f0cc6392dcb48271f08d4896fbe`)
**Content status:** DRAFT / internal preview only — **not** JPJO-approved, **not** public release

## Status lines

```
MILESTONE 2 ACCEPTANCE FIXES: COMPLETE
SŁOWARIUM CLOSED BETA ENGINEERING CORE: COMPLETE
MILESTONE 3 FINAL ACCEPTANCE: PENDING RESPONSIVE DESIGN AND E2E HARDENING
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```

> Keep `MILESTONE 3 FINAL ACCEPTANCE: PENDING…` until the human audit closes, even if engineering gates are green.

## Delivered

### B1 Content
- Course container: `content/a1/course.yaml` (CRS-A1-CLOSED-BETA)
- 5 modules × 3 lessons = **15 lessons**
- **129 exercises** (≥8/lesson), all four types across modules
- Loader merges exercises from all lessons

### B2 Learning loop
- Continue-learning dashboard snapshot from **PostgreSQL**
- Deterministic 15-min daily plan (ADR-009) + `/plan`
- Review queue `/review` with explainable thresholds; schedule scope via migration **`0004_review_schedule_scope`**
- Kronika `/kronika` (attempt timeline)
- Author/reviewer **lifecycle persists in PostgreSQL** (`content_versions`, `reviews`, `publication_events`) — not YAML-only

### B3 Author/reviewer
- Protected `/author` + `/author/[moduleId]`
- Lifecycle: submit → review → approve / request changes (REJECTED = CHANGES_REQUESTED)
- Self-review banned; PUBLISHED blocked (DEC-016)
- Review packet Markdown/JSON (links to `docs/reviews/`)

### B4 Product language
- Sala / Lekcja / Próba / Powtórka / Kronika / Archiwum keys in RU/UK/PL

### B5–B6 UI / a11y / ops
- Responsive dashboard with real continue + per-module progress
- `/api/health` + `/api/ready`
- Keyboard/focus patterns retained; Zod on review API
- Figma M3 responsive Lesson/Plan rebuilt (tablet + mobile) — see `docs/design/figma-handoff.md`

### E2E hardening (`web/e2e/m3-closed-beta.spec.ts`)
- Daily plan **requires** `unfinished_lesson` + CTA (no conditional skip)
- Previewer: `/author` unavailable + author API 403/404; DRAFT learner content still available
- Powtórka: item → CTA → real exercise → attempt → schedule due-at changes (no random “correct” claim)
- Full author → changes requested → resubmit → approve on fresh CI DB (no APPROVED early exit)
- Optional “if element exists” assertions removed; **skipped = 0**
- M2.1 smoke + DB integration tests unchanged / not weakened

## Figma (file `lKdDOQ9za0oYr0nS3c1g1G`)

Rebuilt responsive frames:

| Frame | node-id |
| --- | --- |
| M3 / Tablet · Lesson | `40:2` |
| M3 / Tablet · Plan | `40:18` |
| M3 / Mobile · Lesson | `41:2` |
| M3 / Mobile · Plan | `41:20` |

**Deferred (design debt, not M3 complete):** Foundations (`27:3`) / Components (`27:4`) M3 copies — M1–M2 foundations already exist.

## Honest gaps / follow-ups
- Foundations/Components M3 page copies still empty (debt above)
- Public content release remains blocked pending independent JPJO review
- A2–B2 semantic migration not started
- Do **not** claim YAML-only audit workflows as the lifecycle source of truth — persistence is PostgreSQL

## Local / CI gates (web/)

```
pnpm lint
pnpm typecheck
pnpm test
pnpm content:validate
pnpm db:migrate
pnpm db:seed
pnpm test:integration
pnpm build
pnpm test:e2e:smoke
pnpm test:e2e:m3
pnpm test:e2e:no-demo
git diff --check 301d8a813b674f0cc6392dcb48271f08d4896fbe..HEAD
```

CI workflow: `.github/workflows/ci.yml` (lint → typecheck → unit → content → migrate/seed → integration → build → e2e smoke/m3/no-demo → Playwright artifacts).
