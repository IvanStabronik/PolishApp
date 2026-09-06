-- Attempt idempotency + mastery scope separation (preview vs live).
ALTER TABLE attempts
  ADD COLUMN IF NOT EXISTS idempotency_key text;

ALTER TABLE attempts
  ADD COLUMN IF NOT EXISTS mastery_scope text NOT NULL DEFAULT 'live';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'attempts_mastery_scope_check'
  ) THEN
    ALTER TABLE attempts
      ADD CONSTRAINT attempts_mastery_scope_check
      CHECK (mastery_scope IN ('preview', 'live'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS attempts_learner_idempotency_uidx
  ON attempts (learner_profile_id, idempotency_key)
  WHERE idempotency_key IS NOT NULL;

ALTER TABLE concept_mastery
  ADD COLUMN IF NOT EXISTS mastery_scope text NOT NULL DEFAULT 'live';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'concept_mastery_scope_check'
  ) THEN
    ALTER TABLE concept_mastery
      ADD CONSTRAINT concept_mastery_scope_check
      CHECK (mastery_scope IN ('preview', 'live'));
  END IF;
END $$;

DROP INDEX IF EXISTS concept_mastery_learner_concept_uidx;

CREATE UNIQUE INDEX IF NOT EXISTS concept_mastery_learner_concept_scope_uidx
  ON concept_mastery (learner_profile_id, concept_canonical_id, mastery_scope);
