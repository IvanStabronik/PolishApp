# Threat model — invite / admin / feedback (M4)

## Assets

- Invite tokens (one-time access)
- Admin control plane (`/admin/beta`, admin APIs)
- Feedback inbox + status history
- Session cookies / credentials
- Learner progress in Postgres

## Threats & mitigations

| Threat | Mitigation |
| --- | --- |
| Invite brute force / reuse | High-entropy tokens; hash-at-rest; atomic consume; rate limits |
| Token leakage in logs/git | Never log/store plaintext after creation; seed discards tokens |
| Open registration bypass | `BETA_MODE` disables Better Auth sign-up + UI gate |
| Admin IDOR | Server role check (`admin` only); `notFound` on pages; 403 on APIs |
| Feedback IDOR / arbitrary status | Reporter-bound create; admin-only transitions; allow-list FSM |
| CSRF on mutations | Origin allow-list on mutating routes + cookie sessions. Missing Origin is rejected when a Cookie is present (unless Sec-Fetch-Site is same-origin/none or Referer is trusted). Non-browser clients without cookies are allowed through the origin gate and must still authenticate. |
| PII in analytics | Dimension sanitizer; aggregates-only admin view |
| Demo mode via public env | Server `DEMO_MODE`/`DEMO_PREVIEW` required; production seed gated |

## Residual risk

- Email invite delivery is out of band (operators paste links).
- Public cloud deployment credentials are an EXTERNAL BLOCKER until provisioned.
- Independent JPJO review remains required before public content release.
