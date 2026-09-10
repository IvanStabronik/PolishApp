/**
 * Expected PostgreSQL / Drizzle table shapes for content import (foundation v1).
 *
 * Physical Drizzle schema under `web/src/db/` may land in a parallel track.
 * Import targets these shapes; when the shared schema exists, re-point
 * `content-import.ts` at it without changing upsert semantics.
 *
 * Idempotency key: (canonical_id, version_no) on content_versions via unit join,
 * and canonical_id UK on content_units / modules / lessons / exercises.
 */

export type ContentUnitKind =
  | "module"
  | "lesson"
  | "exercise"
  | "concept"
  | "dialogue"
  | "grammar_point";

export type ExpectedContentUnitRow = {
  id: string; // uuid
  canonical_id: string;
  kind: ContentUnitKind;
  title: string;
};

export type ExpectedContentVersionRow = {
  id: string; // uuid
  unit_id: string;
  version_no: number;
  status:
    | "DRAFT"
    | "IN_REVIEW"
    | "APPROVED"
    | "PUBLISHED"
    | "REJECTED"
    | "ARCHIVED";
  author_user_id: string | null;
  provenance: Record<string, unknown>;
  payload: Record<string, unknown>;
  created_at: Date;
};

export type ExpectedModuleRow = {
  id: string;
  canonical_id: string;
  published_version_id: string | null;
  working_title: string;
  content_version_id: string;
};

export type ExpectedLessonRow = {
  id: string;
  module_id: string;
  canonical_id: string;
  sort_order: number;
  content_version_id: string;
};

export type ExpectedExerciseRow = {
  id: string;
  lesson_id: string;
  canonical_id: string;
  exercise_type:
    | "single_choice"
    | "multiple_choice"
    | "gap_fill"
    | "ordering"
    | "listening";
  content_version_id: string;
  /** Server-only answer key JSON; never sent to learner clients. */
  answer_key: Record<string, unknown>;
};

export type ExpectedPublicationEventRow = {
  id: string;
  content_version_id: string;
  actor_user_id: string | null;
  from_status: string | null;
  to_status: string;
  created_at: Date;
};

export const EXPECTED_TABLE_DDL_NOTES = `
-- Expected tables (logical; see docs/architecture/data-model.md)

content_units (
  id uuid PK,
  canonical_id text UNIQUE NOT NULL,
  kind text NOT NULL,
  title text NOT NULL
)

content_versions (
  id uuid PK,
  unit_id uuid FK → content_units,
  version_no int NOT NULL,
  status text NOT NULL,
  author_user_id text NULL,           -- Better Auth user id; null until linked
  provenance jsonb NOT NULL,
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL,
  UNIQUE (unit_id, version_no)
)

modules (
  id uuid PK,
  canonical_id text UNIQUE NOT NULL,
  published_version_id uuid NULL,
  working_title text NOT NULL,
  content_version_id uuid FK → content_versions
)

lessons (
  id uuid PK,
  module_id uuid FK → modules,
  canonical_id text UNIQUE NOT NULL,
  sort_order int NOT NULL,
  content_version_id uuid FK → content_versions
)

exercises (
  id uuid PK,
  lesson_id uuid FK → lessons,
  canonical_id text UNIQUE NOT NULL,
  exercise_type text NOT NULL,
  content_version_id uuid FK → content_versions,
  answer_key jsonb NOT NULL
)

publication_events (
  id uuid PK,
  content_version_id uuid FK → content_versions,
  actor_user_id uuid NULL,
  from_status text NULL,
  to_status text NOT NULL,
  created_at timestamptz NOT NULL
)
`.trim();
