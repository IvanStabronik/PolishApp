# Milestone 3 — Closed Beta Core report

**Branch:** `feat/closed-beta-v3` (stacked on `feat/private-alpha-v2`)
**Base for PR:** `feat/private-alpha-v2` — after PR #1 merges, retarget to the canonical default branch
**Content status:** DRAFT / internal preview only — **not** JPJO-approved, **not** public release

## Delivered

### B1 Content
- Course container: `content/a1/course.yaml` (CRS-A1-CLOSED-BETA)
- 5 modules × 3 lessons = **15 lessons**
- **129 exercises** (≥8/lesson), all four types across modules
- Loader merges exercises from all lessons

### B2 Learning loop
- Continue-learning dashboard snapshot from Postgres
- Deterministic 15-min daily plan (ADR-009) + `/plan`
- Review queue `/review` with explainable thresholds
- Kronika `/kronika` (attempt timeline)

### B3 Author/reviewer
- Protected `/author` + `/author/[moduleId]`
- Lifecycle helpers: submit → review → approve / request changes
- Self-review banned; PUBLISHED blocked (DEC-016)
- Review packet Markdown/JSON (links to `docs/reviews/`)

### B4 Product language
- Sala / Lekcja / Próba / Powtórka / Kronika / Archiwum keys in RU/UK/PL

### B5–B6 UI / a11y / ops
- Responsive dashboard with real continue + per-module progress (not skeleton strips)
- `/api/health` + `/api/ready`
- Keyboard/focus patterns retained from design system; Zod on review API

## Honest gaps / follow-ups
- Figma page restructure (Archive / Foundations / …) may need a dedicated design pass; handoff updated with M3 routes
- Content-version persistence for lifecycle still records audit while YAML packages remain DRAFT on disk
- Axe coverage is smoke-level via existing focus/live-region patterns; expand dedicated axe suite in follow-up if CI time allows

## Status lines

```
MILESTONE 2 ACCEPTANCE FIXES: COMPLETE
SŁOWARIUM CLOSED BETA CORE: COMPLETE
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```
