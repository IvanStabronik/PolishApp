# ADR 005 — i18n и разделение L1

**Status:** Accepted  
**Date:** 2026-09-05  
**Product:** SŁOWARIUM (`slowarium`)

## Context

Интерфейс: русский / украинский / польский / белорусский. Язык L1 учащегося: UKR / RUS / BEL. Смешение «русский UI = русский L1» даёт русскоцентричный продукт и ломает BEL/UKR методику.

## Decision

- `uiLocale`: `ru | uk | pl | be` (next-intl, маршруты `[locale]`).
- `learnerL1`: `ukr | rus | bel` — отдельное поле `learner_profiles`.
- L1-заметки в контенте хранятся отдельными блоками `notes.ukr` / `notes.rus` / `notes.bel`.
- Feedback выбирает L1-заметку по профилю, не по UI locale.
- Onboarding: L1=`bel` по умолчанию предлагает UI `be` (ручной override UI сохраняется).

## Consequences

- Onboarding спрашивает оба выбора явно.
- Тесты проверяют независимость полей.
- Контент без BEL-заметки не подменяет её русской копией молча.
- Каталог `messages/be.json` держит parity ключей с `ru` / `uk`.

## Deferred

Английский UI; полноценная локализация всего marketing copy.
