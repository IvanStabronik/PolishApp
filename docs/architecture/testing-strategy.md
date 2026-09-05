# Testing strategy — SŁOWARIUM

**Статус:** Accepted для foundation v1.  
**Инструменты:** Vitest (unit/integration), Playwright (e2e), CI на PR.

## 1. Пирамида

```text
        E2E (Playwright)     — мало, критический путь
       /                  \
  Integration (Vitest+DB)  — доменные инварианты
     /                        \
  Unit (Vitest)                — Zod, mastery pure fn, RBAC helpers
```

Цель: быстрая обратная связь на чистых правилах; дорогие e2e — только на сценариях, которые ломают доверие (auth, publish gate, attempt→evidence, export).

## 2. Unit

Покрываем без сети и без браузера:

- Zod-схемы контента (provenance, статусы, L1 maps);
- pure-функции пересчёта `concept_mastery` из фикстур evidence (`ASM-005`);
- запрет self-approve (authorId === reviewerId → error);
- разделение `ui_locale` vs `l1` (смена одного не трогает другой);
- нормализация ключей закрытых упражнений (допустимые варианты).

Запрещено в unit: реальные секреты, вызовы внешнего LLM, запись в prod-подобные URL.

## 3. Integration

Vitest + тестовый PostgreSQL (Docker service в CI / compose profile `test`):

- import YAML → строки `content_units` / `content_versions`;
- переход статусов и запись `publication_events`;
- attempt → evidence → recompute mastery;
- ownership: запрос чужого attemptId отклоняется;
- preview attempts не меняют mastery обычного learner;
- soft delete/anonymize profile path (хотя бы на уровне репозитория).

Миграции Drizzle применяются к пустой БД в CI — регрессия схемы ловится рано.

## 4. E2E (Playwright)

Минимальный набор foundation (расширяется с V1 UI):

| Сценарий | Зачем |
| --- | --- |
| Регистрация 18+ / отказ без согласия | `FUN-001` |
| Логин + защищённая страница | session cookie |
| Author открывает DRAFT preview *Pierwsze spotkanie* | draft ≠ public |
| Learner не видит DRAFT в каталоге | publish gate |
| Закрытое упражнение → feedback без AI | `NFR-004` |
| Запрос export (happy path stub/UI) | `FUN-210` |

E2E идут против local/CI stack (Next + Postgres). Нет зависимости от прод-данных.

## 5. CI

На каждый PR (целевой pipeline):

1. `pnpm lint` / `tsc --noEmit` (strict);
2. `pnpm test` (Vitest unit);
3. поднять Postgres → migrate → Vitest integration;
4. Playwright smoke (критический набор);
5. content validate CLI на изменённых YAML (когда появятся).

Публичный deploy job **отсутствует** до решения о launch (`deployment.md`).

## 6. Что не тестируем «зелёным CI»

- Linguistic correctness польского (это JPJO/human review).
- Полноту A1–B2 matrices.
- Performance SLA в облаке (локальные budget checks — later).
- Реальный провайдер email/SMS.

## 7. Defensive security tests

Пишем проверки «отказ в доступе», а не инструкции атаки. Пример: learner A не читает attempt learner B. Эксплойт-PoC в репозиторий не кладём.
