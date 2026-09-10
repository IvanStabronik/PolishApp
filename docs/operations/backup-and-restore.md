# Backup and restore — private beta Postgres

## Policy

- Automated logical backups via provider (Neon / Supabase) **or** scheduled `pg_dump`.
- Retention: ≥ 7 daily dumps for private beta (adjust when traffic grows).
- Backups are **encrypted at rest** in provider storage; access is operator-only.
- Never download production dumps onto shared laptops without ticket + wipe plan.
- Tests must **not** read production data — restore verification uses a **separate temp database**.

## Backup

```bash
pg_dump "$DATABASE_URL" --format=custom --file="slowarium-$(date -u +%Y%m%dT%H%M%SZ).dump"
```

## Restore to temporary verification DB (no prod access from tests)

```bash
# 1) Create empty temp DB (provider UI or psql)
createdb slowarium_restore_verify

# 2) Restore dump into temp DB only
pg_restore --clean --if-exists --no-owner \
  --dbname="$RESTORE_VERIFY_DATABASE_URL" \
  slowarium-YYYYMMDD.dump

# 3) Verify without pointing the production app at this DB
psql "$RESTORE_VERIFY_DATABASE_URL" -c "select count(*) from \"user\";"
psql "$RESTORE_VERIFY_DATABASE_URL" -c "select count(*) from drizzle.__drizzle_migrations;"
```

CI migration smoke uses an **empty** CI Postgres service — not a production dump.

## Production restore (SEV-1/2)

1. Announce maintenance / disable ingress if needed.
2. Snapshot current volume if provider allows.
3. Restore chosen dump to production DB **or** promote a restored replica per provider docs.
4. Redeploy last known-good app image.
5. Probe `/api/health` + `/api/ready`.
6. Spot-check admin login + one invite lookup (no mass email).

## App vs DB rollback

| Layer | Action |
| --- | --- |
| App only | Redeploy previous image/SHA; DB stays |
| Bad migration | Restore DB from **pre-migrate** dump, redeploy prior app, ship fixing forward migration |

Never `drizzle-kit drop` / schema reset in production.
