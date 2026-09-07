# Milestone 4 — Operable Closed Beta report

**Branch:** `feat/operable-closed-beta-v4`
**Base:** `docs/requirements-r2` (M3 merged at `4a9d495d038d9af27dd26cfad823d5e1d8bd4d94`)
**Content status:** DRAFT / internal preview only — **not** JPJO-approved, **not** public release

## Status lines

```
MILESTONE 3 FINAL ACCEPTANCE: COMPLETE
SŁOWARIUM OPERABLE CLOSED BETA: PENDING FINAL ACCEPTANCE
  — Analytics dimensions_key upgrade-path fix (MD5 canonical JSON + migration 0007)
  — PR #3 stays unmerged pending final re-audit
PUBLIC DEPLOYMENT: EXTERNAL BLOCKER
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```

## Acceptance fix package (post independent audit)

Independent audit rejected M4 acceptance. This branch implements the full fix package:

1. **Atomic analytics aggregates** — migration `0006_m4_acceptance_fixes.sql` adds `dimensions_key`; `0007_analytics_dimensions_key_md5.sql` reconciles keys to **MD5 of canonical compact JSON** (sorted keys / `JSON.stringify`, identity checksum — not SHA-256, not `md5(jsonb::text)`); UPSERT increments `value_num`/`value_count`; no empty catch on unique collisions; structured redacted warnings on telemetry failure.
2. **Real beta deactivation** — `AppSession.betaAccessActive`; session rows revoked on deactivate; product pages redirect to `/beta-disabled`; APIs return `403 beta_access_revoked`; demo/admin exempt.
3. **Invite semantics** — personal one-time only; API accepts omitted/`literal 1`; DB `CHECK (use_limit = 1)`.
4. **Transactional registration** — `registerWithInviteToken` single Postgres transaction (user + credential account + roles + consume + audit); analytics after commit; race losers leave no orphans.
5. **Figma** — M4 frames accepted (RU UI); node IDs in `docs/design/figma-handoff.md`; screenshots in `docs/design/figma-m4-screens/`. Long desktop Admin may need vertical scroll (noted; not rebuilt).

## Invitee DRAFT access

Closed-beta invite consume grants `learner`+`previewer` (roleFlags + userRoles), matching
the seeded demo learner so invitees can learn DRAFT content before JPJO approval.
Ordinary non-invite learners stay denied without previewer.

## Delivered

### A Invite-only beta
- `beta_invites` with hash-only tokens, expiry, revoke, one-time consume, race-safe accept
- Admin create/revoke; registration forbidden without invite when `BETA_MODE=true`
- Accept UI states: invalid / expired / used / revoked / disabled
- Seed ensures ≥15 slots; plaintext tokens discarded (never in git/logs)

### B Admin `/admin/beta`
- Invite counts, learners, onboarding/activity/attempts, feedback inbox, aggregates
- Create/revoke invite; deactivate beta access (with session revoke); search/filter

### C Feedback
- Report problem on plan / Powtórka / exercise; categories + optional rating; safe context; idempotency; admin triage FSM

### D Analytics
- Postgres events + daily aggregates with atomic UPSERT; metric definitions documented
- `dimensions_key` = MD5(canonical JSON) in runtime + migration 0007; unique `(metric_key, bucket_date, dimensions_key)`
- Upgrade-path coverage: old 0006-style backfill row (count 7) → rekey → new event → single row count 8; parallel events stay unique

### E Ops
- `web/Dockerfile`; advisory-locked migrate; `/api/health` vs `/api/ready`; security headers; rate limits; CSRF origin checks; env validation

### F JPJO intake
- Immutable verdict import with fingerprint binding; never auto-approves public release

### G–I QA / tests
- Unit + Postgres integration (aggregates, upgrade-path, race registration, deactivation) + M4 e2e (incl. deactivation) + M2.1/M3/no-demo retained

### H Figma
- See `docs/design/figma-handoff.md` M4 node IDs (file `lKdDOQ9za0oYr0nS3c1g1G`)

## CI

**Final green CI (dimensions_key upgrade-path fix):** _pending push — fill after green_

- SHA: _pending_
- Artifacts: `playwright-artifacts`

| Suite | Result |
| --- | --- |
| Unit | 83 passed / 0 skipped |
| Integration | 40 passed / 0 skipped |
| E2E M2.1 | 7 passed |
| E2E M3 | 8 passed |
| E2E M4 | 11 passed (incl. deactivation) |
| E2E no-demo | 2 passed |
| **Skipped** | **0** |

## Known limitations

- Public deployment URL not claimed — EXTERNAL BLOCKER
- Independent JPJO review still required
- A2–B2 semantic migration not started
- Email delivery of invites is out-of-band
- Analytics are operational aggregates, not a BI suite
- PR #3 must **not** be merged until re-audit acceptance
- Desktop Admin Figma frame may need vertical scroll for long content (accepted; not rebuilt in this fix)
