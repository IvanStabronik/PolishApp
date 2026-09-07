-- Reconcile analytics dimensions_key to MD5(canonical compact JSON).
-- 0006 backfilled md5(jsonb::text) (jsonb key order ≠ JSON.stringify order);
-- runtime briefly used SHA-256. One algorithm everywhere: MD5 of sorted-key
-- compact JSON (identity checksum; core md5(), no pgcrypto).

WITH keyed AS (
  SELECT
    id,
    metric_key,
    bucket_date,
    md5(
      CASE
        WHEN dimensions IS NULL OR dimensions = '{}'::jsonb THEN '{}'
        ELSE (
          SELECT '{' || string_agg(
            to_json(e.key)::text || ':' ||
              CASE jsonb_typeof(e.value)
                WHEN 'string' THEN e.value::text
                WHEN 'number' THEN (e.value #>> '{}')
                WHEN 'boolean' THEN (e.value #>> '{}')
                WHEN 'null' THEN 'null'
                ELSE e.value::text
              END,
            ','
            ORDER BY e.key
          ) || '}'
          FROM jsonb_each(dimensions) AS e
        )
      END
    ) AS target_key,
    dimensions_key,
    value_num,
    value_count,
    updated_at
  FROM analytics_daily_aggregates
),
ranked AS (
  SELECT
    id,
    target_key,
    value_num,
    value_count,
    ROW_NUMBER() OVER (
      PARTITION BY metric_key, bucket_date, target_key
      ORDER BY
        CASE WHEN dimensions_key = target_key THEN 0 ELSE 1 END,
        updated_at DESC,
        id
    ) AS rn,
    SUM(value_num) OVER (
      PARTITION BY metric_key, bucket_date, target_key
    ) AS sum_num,
    SUM(value_count) OVER (
      PARTITION BY metric_key, bucket_date, target_key
    ) AS sum_count
  FROM keyed
),
deleted AS (
  DELETE FROM analytics_daily_aggregates AS a
  USING ranked AS r
  WHERE a.id = r.id
    AND r.rn > 1
  RETURNING a.id
)
UPDATE analytics_daily_aggregates AS a
SET
  dimensions_key = r.target_key,
  value_num = r.sum_num,
  value_count = r.sum_count::integer,
  updated_at = now()
FROM ranked AS r
WHERE a.id = r.id
  AND r.rn = 1
  AND (
    a.dimensions_key IS DISTINCT FROM r.target_key
    OR a.value_num IS DISTINCT FROM r.sum_num
    OR a.value_count IS DISTINCT FROM r.sum_count
  );
--> statement-breakpoint

CREATE UNIQUE INDEX IF NOT EXISTS analytics_daily_metric_bucket_dims_key_uidx
  ON analytics_daily_aggregates (metric_key, bucket_date, dimensions_key);
--> statement-breakpoint
