# ADR 006 — Progress from evidence

**Status:** Accepted  
**Date:** 2026-09-05  
**Product:** SŁOWARIUM (`slowarium`)

## Context

Завершение урока ≠ mastery. Нужна прозрачная модель для взрослой аудитории без «геймификационных очков ради очков».

## Decision

Runtime states концепта:

`NOT_STARTED → LEARNING → PRACTICING → DEMONSTRATED → MASTERED` (+ `REVIEW_DUE`).

- Каждая попытка пишет `attempts` / `attempt_answers`.
- Успех создаёт `evidence_records` с весом из контента.
- `MASTERED` требует несколько успешных evidence в **разных** learning sessions (пороги в config, метка `ASSUMPTION`).
- Ошибка не удаляет историю.
- UI показывает краткое «почему статус изменился».

## Consequences

- Клиент не выставляет mastery сам.
- Пороги калибруются без переписывания UI.
- Связь с curriculum `Exit status` / FN Criticality — на следующих этапах.

## Deferred

Spaced repetition algorithms beyond `next_review_at`; exam-mode scoring; human scoring add-on.
