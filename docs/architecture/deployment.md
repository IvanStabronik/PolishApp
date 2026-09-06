# Deployment — SŁOWARIUM

**Статус:** Accepted для **локальной** разработки foundation v1.  
**Публичный launch:** не выполняется на этом срезе.

## 1. Текущая цель

Дать разработчику воспроизводимый контур:

1. PostgreSQL в Docker Compose;
2. Next.js app в `web/` (`pnpm dev`);
3. migrate + seed DRAFT-контента (*Pierwsze spotkanie* — internal preview);
4. тесты Vitest/Playwright против того же Postgres.

Нет обещания uptime, custom domain, CDN или multi-tenant prod.

## 2. Локальный Docker Postgres

Целевой `docker-compose.yml` (корень или `web/` — уточняется при добавлении файла):

| Сервис | Назначение |
| --- | --- |
| `postgres` | PostgreSQL 16+, volume для данных dev |
| (опционально) `postgres-test` | Эфемерная БД для CI/integration |

Переменные подключения — только через `.env.local` / env CI (**не** коммитить секреты). Пример имён без значений:

```text
DATABASE_URL=
BETTER_AUTH_SECRET=
APP_URL=http://localhost:3000
```

`.env*.local` и секреты — в `.gitignore`.

## 3. Команды (контракт)

| Шаг | Команда (целевые имена) |
| --- | --- |
| Поднять БД | `docker compose up -d postgres` |
| Миграции | `pnpm --filter web db:migrate` |
| Seed DRAFT | `pnpm --filter web content:seed` |
| Dev app | `pnpm --filter web dev` |
| Validate YAML | `pnpm --filter web content:validate` |

Пока часть скриптов ещё не посажена на каркас `create-next-app`, имена фиксируем здесь как контракт foundation.

## 4. Окружения

| Env | Назначение | Публичный трафик |
| --- | --- | --- |
| `local` | Разработка | Нет |
| `ci` | PR checks | Нет |
| `staging` | Deferred | Нет до решения владельца |
| `production` | Deferred | **Нет на foundation v1** |

## 5. Что сознательно отсутствует

- Kubernetes, serverless split, отдельный content service.
- Автодеплой main → prod.
- Управление секретами облака (Vault/SM) — появится с launch.
- Серверный voice bucket.
- Обязательный LLM endpoint.

## 6. Backup (подготовка к launch, не блокер local)

До публичной вертикали нужна документированная процедура restore published content + accounts (`NFR-006`). Для local достаточно Docker volume + git YAML как source of truth контента.

## 7. Контент и деплой

Публикация учебной единицы — **не** «merge в main», а переход статуса в БД после независимого review. Merge YAML DRAFT в ветку разработки не делает модуль доступным learner’у.
