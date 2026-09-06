-- Review schedule: separate preview vs live scopes (Powtórka).
ALTER TABLE review_schedule
  ADD COLUMN IF NOT EXISTS mastery_scope text NOT NULL DEFAULT 'live';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'review_schedule_mastery_scope_check'
  ) THEN
    ALTER TABLE review_schedule
      ADD CONSTRAINT review_schedule_mastery_scope_check
      CHECK (mastery_scope IN ('preview', 'live'));
  END IF;
END $$;

DROP INDEX IF EXISTS review_schedule_learner_concept_uidx;

CREATE UNIQUE INDEX IF NOT EXISTS review_schedule_learner_concept_scope_uidx
  ON review_schedule (learner_profile_id, concept_canonical_id, mastery_scope);
