# ADR 005 — i18n и разделение L1

**Status:** Accepted  
**Date:** 2026-09-05  
**Product:** SŁOWARIUM (`slowarium`)

## Context

Интерфейс первой очереди: русский / украинский / польский. Язык L1 учащегося: UKR / RUS / BEL. Смешение «русский UI = русский L1» даёт русскоцентричный продукт и ломает BEL/UKR методику.

## Decision

- `uiLocale`: `ru | uk | pl` (next-intl, маршруты `[locale]`).
- `learnerL1`: `ukr | rus | bel` — отдельное поле `learner_profiles`.
- L1-заметки в контенте хранятся отдельными блоками `notes.ukr` / `notes.rus` / `notes.bel`.
- Feedback выбирает L1-заметку по профилю, не по UI locale.

## Consequences

- Onboarding спрашивает оба выбора явно.
- Тесты проверяют независимость полей.
- Контент без BEL-заметки не подменяет её русской копией молча.

## Deferred

Английский UI; полноценная локализация всего marketing copy.
