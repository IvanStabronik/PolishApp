# Runbook — beta operator

## Roles

- Demo/local admin: `admin@demo.slowarium.local` (DEMO_MODE seed only).
- Production admin: provision manually; never commit passwords.

## Create invite

1. Sign in as admin → `/[locale]/admin/beta`
2. **Create invite** — copy the one-time token immediately (shown once).
3. Share `/[locale]/invite/<token>` out of band.

## Revoke / deactivate

- **Revoke** pending invite from the invite list.
- **Deactivate beta access** on a learner row — sets `beta_access_revoked_at` without deleting the account.

## Feedback triage

Inbox statuses: `new → triaged → resolved | wont_fix` (restricted transitions).

## JPJO intake

`POST /api/jpjo/verdicts` stores immutable evidence bound to content fingerprint.
**Never** auto-publishes content. Public release stays blocked pending independent JPJO review.
