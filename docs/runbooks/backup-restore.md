# Runbook — backup & restore

## Backup (Postgres)

```bash
pg_dump "$DATABASE_URL" --format=custom --file="slowarium-$(date -u +%Y%m%dT%H%M%SZ).dump"
```

Store dumps in encrypted object storage (credentials EXTERNAL).

## Restore

```bash
pg_restore --clean --if-exists --no-owner --dbname="$DATABASE_URL" slowarium-YYYYMMDD.dump
```

Then verify:

```bash
curl -fsS "$APP_URL/api/health"   # liveness
curl -fsS "$APP_URL/api/ready"    # readiness (DB)
```

## Rollback

1. Restore previous dump **or** redeploy previous app image.
2. Migrations are forward-fix: do not edit applied SQL; add a new migration to correct.
3. If a bad migration shipped, restore DB from pre-migrate dump, redeploy prior image, then ship a fixing migration.

## Policy

- Prefer expand → migrate → contract.
- Never force-drop learner evidence without a documented retention ticket.
