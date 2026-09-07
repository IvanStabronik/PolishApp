# ADR-010: Invite-only closed beta

- **Status:** Accepted (Milestone 4)
- **Date:** 2026-09-06

## Context

Closed beta is limited to ~15 invited learners. Open self-registration would bypass capacity and audit controls.

## Decision

- Store only HMAC-SHA256 token hashes (`INVITE_TOKEN_PEPPER` / `BETTER_AUTH_SECRET`).
- Invite statuses: `pending | accepted | expired | revoked` with one-time use by default.
- Atomic consume via guarded `UPDATE` (race/reuse safe).
- When `BETA_MODE=true`, Better Auth open sign-up is disabled; registration goes through `/invite/[token]` + `/api/beta/invite`.
- Admin create/revoke + soft deactivate (`beta_access_revoked_at`) without deleting accounts.
- Admin journal (`admin_events`) never stores raw tokens.

## Consequences

- Demo system roles remain seedable under `DEMO_MODE` (non-production).
- E2E must create invites via admin API when `BETA_MODE` is on.
- Lost plaintext tokens cannot be recovered — only revoke + re-issue.
