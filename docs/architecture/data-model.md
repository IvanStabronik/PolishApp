# Модель данных — SŁOWARIUM

**Статус:** Accepted как логическая схема foundation v1.  
**Физическая реализация:** PostgreSQL + Drizzle ([ADR-002](adr/002-postgresql-drizzle.md)).

## 1. Ключевые правила идентификаторов

1. **Технический PK** каждой строки — `UUID` (генерируется в БД или приложении).
2. **Канонические curriculum ID** (`FN-*`, `SCN-*`, `ASM-*`, `EXM-*`, `GR-*`, `LEX-*`, module/lesson slugs вроде будущего `MOD-A1-…`) — **бизнес-ключи**, уникальные в своём пространстве имён. Они стабильны между средами и версиями документации.
3. Свидетельства и попытки ссылаются на **UUID версии контента**, а не только на бизнес-ключ: учащийся всегда привязан к тому тексту/ключу, который видел (`FUN-172`).
4. UI locale и L1 — **разные поля** профиля ([ADR-005](adr/005-i18n-and-l1-separation.md)).

## 2. ERD (логическая)

```mermaid
erDiagram
  users ||--o{ sessions : has
  users ||--o| learner_profiles : "0..1"
  users ||--o{ publication_events : actor
  users ||--o{ reviews : reviewer

  content_units ||--o{ content_versions : versions
  content_units ||--o{ modules : "may group"
  content_versions ||--o{ publication_events : lifecycle
  content_versions ||--o{ reviews : reviewed_as

  modules ||--o{ lessons : contains
  lessons ||--o{ exercises : contains
  exercises }o--|| content_versions : "payload version"
  modules }o--|| content_versions : "module version"
  lessons }o--|| content_versions : "lesson version"

  learner_profiles ||--o{ attempts : makes
  attempts }o--|| exercises : on
  attempts ||--o{ evidence : produces
  evidence }o--o| concept_mastery : "feeds recompute"
  learner_profiles ||--o{ concept_mastery : has
  learner_profiles ||--o{ reviews_queue : "SRS reviews"

  users {
    uuid id PK
    string email UK
    string role_flags "learner|author|reviewer|admin"
    timestamptz created_at
  }

  sessions {
    uuid id PK
    uuid user_id FK
    timestamptz expires_at
    string token_hash
  }

  learner_profiles {
    uuid id PK
    uuid user_id FK
    string l1 "ukr|rus|bel"
    string ui_locale "ru|uk|pl"
    jsonb goals
    int weekly_minutes
    jsonb consents
    bool age_confirmed_18
  }

  content_units {
    uuid id PK
    string canonical_id UK "business key"
    string kind "module|lesson|exercise|concept|…"
    string title
  }

  content_versions {
    uuid id PK
    uuid unit_id FK
    int version_no
    string status "DRAFT|IN_REVIEW|APPROVED|PUBLISHED|REJECTED|ARCHIVED"
    uuid author_user_id FK
    jsonb provenance
    jsonb payload
    timestamptz created_at
  }

  modules {
    uuid id PK
    string canonical_id UK
    uuid published_version_id FK "nullable until publish"
    string working_title "e.g. Pierwsze spotkanie"
  }

  lessons {
    uuid id PK
    uuid module_id FK
    string canonical_id UK
    int sort_order
    uuid content_version_id FK
  }

  exercises {
    uuid id PK
    uuid lesson_id FK
    string canonical_id UK
    string exercise_type
    uuid content_version_id FK
    jsonb answer_key "server-only use"
  }

  attempts {
    uuid id PK
    uuid learner_profile_id FK
    uuid exercise_id FK
    uuid content_version_id FK
    jsonb response
    bool correct
    bool hinted
    string mode "formative|summative|preview"
    timestamptz created_at
  }

  evidence {
    uuid id PK
    uuid attempt_id FK
    uuid learner_profile_id FK
    string concept_canonical_id
    string skill
    bool hinted
    bool exam_like
    string result "correct|incorrect|partial|pending"
    timestamptz created_at
  }

  concept_mastery {
    uuid id PK
    uuid learner_profile_id FK
    string concept_canonical_id
    string state "not_started|learning|gotowy|mastered|decaying"
    timestamptz updated_at
    jsonb explanation_snapshot
  }

  reviews {
    uuid id PK
    uuid content_version_id FK
    uuid reviewer_user_id FK
    string decision "approve|reject"
    text comment
    timestamptz created_at
  }

  publication_events {
    uuid id PK
    uuid content_version_id FK
    uuid actor_user_id FK
    string from_status
    string to_status
    timestamptz created_at
  }
```

> `reviews_queue` / таблица SRS-очереди на ERD выше обозначена как `reviews_queue` в связи с learner; в схеме Drizzle имя может быть `spaced_reviews`, чтобы не путать с linguistic `reviews`. Смысл: карточки повторения, выведенные из `concept_mastery` / `evidence`.

## 3. Сущности кратко

### Identity

- **users** — учётная запись Better Auth + флаги ролей (одна персона может иметь несколько ролей).
- **sessions** — серверные сессии; клиент хранит только cookie-токен.

### Profiles

- **learner_profiles.l1** — методика: `ukr` | `rus` | `bel` (отдельные значения; нет «славянский»).
- **learner_profiles.ui_locale** — оболочка: `ru` | `uk` | `pl` (белорусский UI не обязателен).
- Смена UI locale **не** меняет L1 и банк ошибок.

### Content

- **content_units** — стабильная сущность с `canonical_id`.
- **content_versions** — иммутабельный снимок payload + lifecycle status + provenance.
- **modules / lessons / exercises** — учебная иерархия; первый модуль *Pierwsze spotkanie* существует как DRAFT unit/version для internal preview.
- **publication_events** — append-only журнал переходов статусов.
- **reviews** (linguistic) — решение reviewer; `reviewer_user_id ≠ author_user_id` версии.

### Learning outcomes

- **attempts** — сырой ответ; `mode=preview` не влияет на живой mastery.
- **evidence** — нормализованное свидетельство по концепту (`FUN-081`).
- **concept_mastery** — выводимое состояние по правилам `ASM-005` ([ADR-006](adr/006-progress-from-evidence.md)).

## 4. UI locale vs L1

| Поле | Вопрос пользователя | Влияет на |
| --- | --- | --- |
| `ui_locale` | На каком языке кнопки и ошибки UI? | next-intl messages |
| `l1` | Какой родной язык для методики? | L1-заметки, ERR-банк, дистрактор-объяснения |

Объектный польский в упражнениях **не** переводится сменой `ui_locale` (`I18N-003`).

## 5. Что сознательно не моделируем в foundation

- Таблицы голосовых блобов (storage off).
- Биометрические шаблоны.
- Полноценный billing ledger (только задел entitlements later).
- Отдельную graph DB для концептов (граф — данные в payload/связях SQL).

## 6. Миграции

- Схема только через Drizzle migrations.
- Seed: импорт YAML → `content_*` для DRAFT preview.
- Никаких секретов в seed-фикстурах.
