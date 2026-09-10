# Private beta operator runbook

## Scope

Invite-only **deployed private beta**. Not a public content launch. DRAFT curriculum stays internal unless JPJO later lifts the blocker.

## Daily checks

1. `GET /api/health` → `status: ok`, `database: not_checked`
2. `GET /api/ready` → `status: ready`, `database: true`
3. Admin → `/admin/beta` — invite remaining capacity, feedback inbox
4. Spot-check: ordinary learner **without** previewer cannot open DRAFT; invitee with previewer can when `BETA_ALLOW_DRAFT=true` (or DEMO_PREVIEW in non-prod).

## Invite a user

1. Sign in as admin.
2. Create invite in `/admin/beta` (plaintext token shown **once**).
3. Copy the full invite URL from the console (or build `{APP_URL}/{locale}/invite/{token}`).
4. Paste the ready email template from the console into your mail client (out-of-band — no product mailer yet).
5. User opens URL → registers → onboarding → learning.
6. Never store plaintext tokens in tickets/logs.

## Password recovery (closed beta)

There is **no** self-serve email reset. Operator path:

1. Admin → `/admin/beta` → learner row → **Reset password**.
2. Temporary password is shown **once**; copy out-of-band to the user.
3. All of that user’s sessions are revoked immediately.
4. User signs in with the temporary password and should change it later via support process (product change-password UI is not yet shipped).

## Deactivate a user

1. Admin deactivates beta access.
2. Active sessions are revoked.
3. User hits `403 beta_access_revoked` / `/beta-disabled`.
4. Re-login remains denied while deactivated.

## Privacy requests

- Export: authenticated `POST /api/privacy/export`
- Delete: authenticated `POST /api/privacy/delete` with `{ "confirm": "DELETE" }`
- Deletion revokes sessions.

## Demo mode vs closed-beta DRAFT

Production must keep `DEMO_MODE=false` and `DEMO_PREVIEW=false`. Do not seed demo accounts into production.

For invitees to learn on DRAFT curriculum without DEMO theater, set:

```
BETA_MODE=true
BETA_ALLOW_DRAFT=true
DEMO_MODE=false
DEMO_PREVIEW=false
```

`BETA_ALLOW_DRAFT` (aliases: `CLOSED_BETA_PREVIEW`, `ALLOW_DRAFT_PREVIEW`) lets roles `previewer|author|reviewer|admin` see DRAFT. Invite consume already grants `learner` + `previewer`. Attempts on DRAFT stay in **preview** mastery scope until content is independently reviewed.

## Escalation

See [incident-response.md](./incident-response.md).
