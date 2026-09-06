# ADR-009 — Deterministic 15-minute daily plan

- **Status:** Accepted
- **Date:** 2026-09-06
- **Milestone:** 3 closed beta

## Context

Closed-beta learners need a short daily plan without localStorage or opaque AI scores.

## Decision

Server algorithm `buildDailyPlan` (priority order):

1. Unfinished lesson in the current module
2. Weak concepts (`REVIEW_DUE`, or `LEARNING` with ≥2 errors, or `NOT_STARTED` with ≥1 error)
3. Recent incorrect attempts (error review)
4. Mini-check when module practice is complete

- Target budget: 15 minutes
- Preview vs live mastery scopes never mixed
- Thresholds are explainable strings on each plan/review item

## Consequences

- Dashboard / `/plan` / `/review` read Postgres + YAML catalog
- Unit tests lock priority order and scope isolation
