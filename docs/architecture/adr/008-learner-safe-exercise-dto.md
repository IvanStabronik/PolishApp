# ADR-008 — Learner-safe exercise DTOs (answer-key isolation)

- **Status:** Accepted
- **Date:** 2026-09-06
- **Milestone:** 2.1 private alpha acceptance

## Context

Server components previously passed full `ModuleExercise` (including `correctIndex`,
`correctIndices`, gap accepted answers, `correctOrder`, evidence weights) into the
client `ExercisePlayer`. That leaked answer keys via RSC/HTML serialization.

## Decision

1. Keep `ModuleExercise` / `AuthoredExercise` as **server-only** evaluation models.
2. Introduce branded `LearnerExercise` DTO via `toLearnerExercise()` with an explicit
   whitelist (`id`, `type`, `prompt`, `options`/`items`, `textWithGaps`, `gapCount`).
3. Correctness is computed only on the server (`evaluateAnswer` + `/api/learning/attempt`).
4. After a saved attempt, the API may return pedagogical `revealCorrectIndexes`;
   raw keys never appear on the initial exercise payload.
5. Client-supplied `correct` / `preview` / `score` / `contentVersion*` are parsed then ignored.

## Privacy audit identifiers

Deleted-account audit rows use `privacyAuditSubjectId` = `v1:` + HMAC-SHA256
(`PRIVACY_AUDIT_SECRET` or `BETTER_AUTH_SECRET`). Deleted emails are never stored in clear.

## Consequences

- ExercisePlayer TypeScript props reject unbranded authored exercises.
- Contract tests guard whitelist serialization and sentinel gap answers.
- Real PostgreSQL integration tests cover attempt/evidence/mastery, idempotency,
  scope isolation, and privacy export/delete.
