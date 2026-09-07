-- M4 acceptance fixes: atomic analytics upserts, one-time invite constraint.

-- Analytics: deterministic conflict target for daily aggregates.
ALTER TABLE analytics_daily_aggregates
  ADD COLUMN IF NOT EXISTS dimensions_key text;
--> statement-breakpoint

-- Backfill from canonicalized jsonb text (sorted object keys via jsonb).
UPDATE analytics_daily_aggregates
SET dimensions_key = md5(COALESCE(dimensions, '{}'::jsonb)::text)
WHERE dimensions_key IS NULL OR dimensions_key = '';
--> statement-breakpoint

ALTER TABLE analytics_daily_aggregates
  ALTER COLUMN dimensions_key SET DEFAULT '',
  ALTER COLUMN dimensions_key SET NOT NULL;
--> statement-breakpoint

DROP INDEX IF EXISTS analytics_daily_metric_bucket_dims_uidx;
--> statement-breakpoint

CREATE UNIQUE INDEX IF NOT EXISTS analytics_daily_metric_bucket_dims_key_uidx
  ON analytics_daily_aggregates (metric_key, bucket_date, dimensions_key);
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS analytics_daily_metric_idx
  ON analytics_daily_aggregates (metric_key, bucket_date);
--> statement-breakpoint

-- Invites are personal one-time only.
UPDATE beta_invites SET use_limit = 1 WHERE use_limit <> 1;
--> statement-breakpoint

ALTER TABLE beta_invites DROP CONSTRAINT IF EXISTS beta_invites_use_limit_positive;
--> statement-breakpoint

ALTER TABLE beta_invites DROP CONSTRAINT IF EXISTS beta_invites_use_limit_one;
--> statement-breakpoint

ALTER TABLE beta_invites
  ADD CONSTRAINT beta_invites_use_limit_one CHECK (use_limit = 1);
--> statement-breakpoint
