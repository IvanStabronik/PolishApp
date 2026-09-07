-- Milestone 4: invite-only beta, feedback, analytics aggregates, JPJO intake, rate limits, admin audit.

CREATE TYPE beta_invite_status AS ENUM ('pending', 'accepted', 'expired', 'revoked');
--> statement-breakpoint
CREATE TYPE feedback_category AS ENUM (
  'bug',
  'confusing_content',
  'wrong_answer',
  'translation',
  'UX',
  'other'
);
--> statement-breakpoint
CREATE TYPE feedback_status AS ENUM ('new', 'triaged', 'resolved', 'wont_fix');
--> statement-breakpoint
CREATE TYPE jpjo_verdict AS ENUM ('approve', 'changes_requested', 'reject', 'abstain');
--> statement-breakpoint

ALTER TABLE "user"
  ADD COLUMN IF NOT EXISTS beta_access_revoked_at timestamptz,
  ADD COLUMN IF NOT EXISTS beta_deactivated_reason text;
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS beta_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL,
  status beta_invite_status NOT NULL DEFAULT 'pending',
  use_limit integer NOT NULL DEFAULT 1,
  use_count integer NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_user_id text REFERENCES "user"(id) ON DELETE SET NULL,
  created_by_user_id text REFERENCES "user"(id) ON DELETE SET NULL,
  label text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT beta_invites_use_limit_positive CHECK (use_limit >= 1),
  CONSTRAINT beta_invites_use_count_nonneg CHECK (use_count >= 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS beta_invites_token_hash_uidx ON beta_invites (token_hash);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS beta_invites_status_idx ON beta_invites (status);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS beta_invites_created_user_idx ON beta_invites (created_user_id);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS admin_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id text REFERENCES "user"(id) ON DELETE SET NULL,
  action text NOT NULL,
  subject_type text,
  subject_id text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  correlation_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS admin_events_actor_idx ON admin_events (actor_user_id);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS admin_events_action_idx ON admin_events (action);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS admin_events_created_idx ON admin_events (created_at DESC);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS feedback_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  category feedback_category NOT NULL,
  status feedback_status NOT NULL DEFAULT 'new',
  rating integer,
  comment text,
  context jsonb NOT NULL DEFAULT '{}'::jsonb,
  idempotency_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT feedback_reports_rating_range CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5))
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS feedback_reports_idempotency_uidx
  ON feedback_reports (reporter_user_id, idempotency_key);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS feedback_reports_status_idx ON feedback_reports (status);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS feedback_reports_reporter_idx ON feedback_reports (reporter_user_id);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS feedback_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id uuid NOT NULL REFERENCES feedback_reports(id) ON DELETE CASCADE,
  from_status feedback_status,
  to_status feedback_status NOT NULL,
  actor_user_id text REFERENCES "user"(id) ON DELETE SET NULL,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS feedback_status_history_feedback_idx
  ON feedback_status_history (feedback_id, created_at);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS analytics_daily_aggregates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key text NOT NULL,
  bucket_date date NOT NULL,
  dimensions jsonb NOT NULL DEFAULT '{}'::jsonb,
  value_num double precision NOT NULL DEFAULT 0,
  value_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS analytics_daily_metric_bucket_dims_uidx
  ON analytics_daily_aggregates (metric_key, bucket_date, md5(dimensions::text));
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_key text NOT NULL,
  user_id text REFERENCES "user"(id) ON DELETE SET NULL,
  dimensions jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS analytics_events_key_idx ON analytics_events (event_key, occurred_at DESC);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS analytics_events_user_idx ON analytics_events (user_id);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS jpjo_review_verdicts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_identity text NOT NULL,
  external_ref text NOT NULL DEFAULT '',
  content_version_id uuid NOT NULL REFERENCES content_versions(id) ON DELETE RESTRICT,
  content_fingerprint text NOT NULL,
  verdict jpjo_verdict NOT NULL,
  comment text,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  imported_by_user_id text REFERENCES "user"(id) ON DELETE SET NULL,
  imported_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS jpjo_review_verdicts_version_ref_uidx
  ON jpjo_review_verdicts (content_version_id, reviewer_identity, external_ref);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS rate_limit_buckets (
  bucket_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL,
  hit_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
