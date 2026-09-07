# ADR-011: Privacy-preserving product analytics

- **Status:** Accepted (Milestone 4)
- **Date:** 2026-09-06

## Context

Operators need activation and learning-health signals without ad trackers or raw answer/PII warehouses.

## Decision

- Persist coarse `analytics_events` + `analytics_daily_aggregates` in Postgres.
- Metric definitions live in code (`web/src/modules/analytics/metrics.ts`) and `docs/architecture/metric-definitions.md`.
- Admin UI shows aggregates/counts only — not a BI suite.
- Dimensions are sanitized (no email/token/answer fields).
- No third-party ad/analytics SDKs.

## Consequences

- Small-n beta cohorts are noisy; docs state interpretation limits.
- Aggregates are operational, not psychometric truth.
