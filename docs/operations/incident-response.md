# Incident response — private beta

## Severity

| Sev | Example | First action |
| --- | --- | --- |
| SEV-1 | Data leak, auth bypass, mass invite abuse | Disable public ingress / rotate secrets; preserve logs |
| SEV-2 | Site down, DB not ready, migrate failed mid-release | Roll back app image; do not “fix” migrate |
| SEV-3 | Single-user access bug, rate-limit noise | Ticket + reproduce in staging |

## Checklist (first 15 minutes)

1. Capture time window (UTC) and correlation IDs from logs.
2. Confirm `/api/health` vs `/api/ready` (process vs DB).
3. Check last deploy SHA + whether migrate job succeeded.
4. If auth suspected: rotate `BETTER_AUTH_SECRET` **only** with planned session invalidation.
5. If invite abuse: revoke pending invites; tighten rate limits.
6. **Do not** paste PII, tokens, or DB URLs into chat/tickets — redact.

## Signals

- Boot: `runtime_env_validation_failed` structured log → misconfigured release
- Migrate: non-zero exit / advisory lock timeout
- Ready probe 503 → Postgres or network
- Spike of `origin_rejected` / `rate_limited` → probe or attack

## Communication

Internal operators only for private beta. No public status page required at M5.

## After-action

Record: trigger, blast radius, fix SHA, follow-up hardening. Update this doc if a new failure mode appears.
