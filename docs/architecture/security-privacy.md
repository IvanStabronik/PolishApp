# Security & privacy — SŁOWARIUM

**Статус:** Accepted для foundation v1 (технические контроли).  
**Юридическое:** не является GDPR legal opinion; контролёр (`DEC-007`) ещё Open до публичного сбора данных/платежей.

## 1. Аутентификация — Better Auth

- Провайдер сессий и учёток: **Better Auth** ([ADR-003](adr/003-better-auth.md)).
- Первый фактор foundation: email + password (как в `FUN-001` ASSUMPTION); recovery — через серверный поток Better Auth.
- Сессия — HTTP-only cookie; сервер проверяет сессию на каждой мутации.
- Ошибки входа не раскрывают существование email сверх общего сообщения (`FUN-002`).
- Регистрация learner: подтверждение **18+** и обязательные согласия до создания профиля (`SEC-002`, `SEC-009`).

Роли: `learner` | `author` | `reviewer` | `admin` (можно комбинировать). Self-approve контента запрещён даже у admin+author на той же версии.

## 2. Авторизация только на сервере

| Правило | Реализация |
| --- | --- |
| Ownership | Learner читает/меняет только свои `attempts`, `evidence`, `concept_mastery` |
| RBAC | Author ≠ publish; Reviewer ≠ approve own version; Admin журналируется |
| IDOR defense | Запросы с чужим UUID → 404/403 на сервере; Vitest/integration покрывают отказ |
| Answer keys | Не отдаются клиенту до/вместо серверной проверки |
| Draft content | Не в learner catalog; preview только привилегированным ролям |

Клиентские проверки UI — удобство, не security boundary (`system-context.md`).

## 3. Export и delete

| Право | Поведение foundation |
| --- | --- |
| **Export** (`FUN-210`) | Машиночитаемый архив: профиль, согласия, цели, evidence, тексты работ; без чужих данных |
| **Delete** (`FUN-211`) | Удаление/анонимизация PII и учебных артефактов; вход после завершения невозможен |
| Сроки | Рабочие допущения `SEC-006` (≤30 дней на выполнение/удаление в продукте) до утверждения юристом |
| Audit | Запросы export/delete пишутся в audit log (`FUN-193`) |

Потеря entitlement **не** удаляет прогресс (`FUN-202`); delete — отдельное явное действие пользователя.

## 4. Голос и биометрия

На foundation и до отдельного privacy design (`DEC-005`):

- серверное **хранение голоса выключено**;
- нет фоновой записи;
- нет биометрической идентификации и шаблонов голоса/лица;
- микрофон, если появится локально для UX later, не загружает аудио на сервер без нового ADR + legal review.

## 5. AI по умолчанию выключен

- Базовый путь (теория, закрытые упражнения, ключ, банк объяснений, прогресс) **без** обязательных вызовов generative model (`NFR-004`, `BUS-006`).
- Feature flag / config: AI helpers default **off**; отключение не ломает учёбу.
- AI не публикует контент и не ставит итоговый high-stakes балл (`ASM-010`).
- Нет скрытого обучения моделей на данных учащихся (`SEC-008`); любой future opt-in — отдельный, не pre-ticked.

## 6. Данные в покое и в движении

- Local/dev: Postgres в Docker, секреты только в env (не в git).
- Public HTTP без TLS на критическом пути недопустим, когда появится публичный URL (`SEC-003`).
- Minimization: не собираем поля «на будущее» без цели в privacy table.

## 7. Audit

Журналируются: смена ролей, публикация, доступ admin к чувствительным объектам, export/delete, смена entitlements. Журнал не редактируется из UI (`SEC-010`).

## 8. Отложено до публичного launch

- Финальный текст privacy/ToS и таблица «цель → основание → срок» за подписью контролёра.
- Выбор email/SMS/hosting processors (`SEC-007`).
- Backup/restore drill published content + accounts (`NFR-006`) — процедура до launch, не блокер локального foundation.
