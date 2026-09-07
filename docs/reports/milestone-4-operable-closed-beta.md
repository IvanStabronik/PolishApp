# Milestone 4 — Operable Closed Beta report

**Branch:** `feat/operable-closed-beta-v4`
**Base:** `docs/requirements-r2` (M3 merged at `4a9d495d038d9af27dd26cfad823d5e1d8bd4d94`)
**Content status:** DRAFT / internal preview only — **not** JPJO-approved, **not** public release

## Status lines

```
MILESTONE 3 FINAL ACCEPTANCE: COMPLETE
SŁOWARIUM OPERABLE CLOSED BETA: COMPLETE
  — CI green: https://github.com/IvanStabronik/PolishApp/actions/runs/34067752341
  — PR #3 stays unmerged pending audit
PUBLIC DEPLOYMENT: EXTERNAL BLOCKER (no provisioned URL / cloud credentials in repo)
PUBLIC CONTENT RELEASE: BLOCKED PENDING INDEPENDENT JPJO REVIEW
A2–B2 SEMANTIC MIGRATION: NOT STARTED
```

## Invitee DRAFT access (M4 CI fix)

Closed-beta invite consume grants `learner`+`previewer` (roleFlags + userRoles), matching
the seeded demo learner so invitees can learn DRAFT content before JPJO approval.
Ordinary non-invite learners stay denied without previewer (seeded `ordinary@demo…`
for M2.1 DRAFT denial). Deactivate remains a soft `betaAccessRevokedAt` flag (unchanged).

## Delivered

### A Invite-only beta
- `beta_invites` with hash-only tokens, expiry, revoke, one-time consume, race-safe accept
- Admin create/revoke; registration forbidden without invite when `BETA_MODE=true`
- Accept UI states: invalid / expired / used / revoked
- Seed ensures ≥15 slots; plaintext tokens discarded (never in git/logs)

### B Admin `/admin/beta`
- Invite counts, learners, onboarding/activity/attempts, feedback inbox, aggregates
- Create/revoke invite; deactivate beta access; search/filter; loading/error/forbidden

### C Feedback
- Report problem on plan / Powtórka / exercise; categories + optional rating; safe context; idempotency; admin triage FSM

### D Analytics
- Postgres events + daily aggregates; metric definitions documented; no ad trackers

### E Ops
- `web/Dockerfile`; advisory-locked migrate; `/api/health` vs `/api/ready`; security headers; rate limits; CSRF origin checks; env validation; backup/deploy runbooks
- Demo seed blocked in production without explicit allow flag

### F JPJO intake
- Immutable verdict import with fingerprint binding; never auto-approves public release

### G–I QA / tests
- Unit + Postgres integration + M4 e2e (12 scenarios) + M2.1/M3/no-demo retained
- Responsive screenshots 390/834/1440

### H Figma
- See `docs/design/figma-handoff.md` M4 node IDs (file `lKdDOQ9za0oYr0nS3c1g1G`)

## Known limitations

- Public deployment URL not claimed — EXTERNAL BLOCKER
- Independent JPJO review still required
- A2–B2 semantic migration not started
- Email delivery of invites is out-of-band
- Analytics are operational aggregates, not a BI suite
