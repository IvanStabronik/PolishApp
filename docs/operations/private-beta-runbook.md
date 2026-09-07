# Private beta operator runbook

## Scope

Invite-only **deployed private beta**. Not a public content launch. DRAFT curriculum stays internal unless JPJO later lifts the blocker.

## Daily checks

1. `GET /api/health` → `status: ok`, `database: not_checked`
2. `GET /api/ready` → `status: ready`, `database: true`
3. Admin → `/admin/beta` — invite remaining capacity, feedback inbox
4. Spot-check: ordinary learner cannot open DRAFT without previewer role

## Invite a user

1. Sign in as admin.
2. Create invite in `/admin/beta` (plaintext token shown **once**).
3. Send invite URL out-of-band: `{APP_URL}/{locale}/invite/{token}`
4. User registers → onboarding → learning.
5. Never store plaintext tokens in tickets/logs.

## Deactivate a user

1. Admin deactivates beta access.
2. Active sessions are revoked.
3. User hits `403 beta_access_revoked` / `/beta-disabled`.
4. Re-login remains denied while deactivated.

## Privacy requests

- Export: authenticated `POST /api/privacy/export`
- Delete: authenticated `POST /api/privacy/delete` with `{ "confirm": "DELETE" }`
- Deletion revokes sessions.

## Demo mode

Production must keep `DEMO_MODE=false` and `DEMO_PREVIEW=false`. Do not seed demo accounts into production.

## Escalation

See [incident-response.md](./incident-response.md).
