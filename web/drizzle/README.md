# Stale migration folder

Canonical Drizzle migrations live at **`web/src/db/migrations/`**
(`drizzle.config.ts` `out` + `src/db/migrate.ts`).

Do not apply SQL from this directory. Kept only so older agent notes
that mention `web/drizzle/` do not look like a second source of truth.
