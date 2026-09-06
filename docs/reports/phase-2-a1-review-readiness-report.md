# Phase 2 — A1 review-readiness report (SŁOWARIUM)

**Бренд:** SŁOWARIUM (`slowarium`)
**Ветка:** `docs/phase-2-integrity-fix`
**Стартовый commit этапа:** `18d23c9ea8a42da89fa28b6cb95a3ec09ef3bc12`
**Статус:** пакет готов к независимому JPJO review — **review не завершён**
**A2–B2 semantic migration not started.**

## 1. Что проверено

- Структурные инварианты A1 (30 FN / 17 SCN / 21 LEX / 5 ASM / 5 EXM / 46 Required / 31 ERR).
- Операционные факты exam: структура A1 взрослых и отсутствие A1 в terminy 2026 (certyfikatpolski.pl, сверка 2026-09-05).
- Дуальная модель `standard_status` vs `session_availability` в требованиях.
- Наличие CEFR/Dz.U. якорей в FN как **утверждений**, требующих точной сверки (без выдуманных страниц).
- Подготовлен reviewer matrix (16 items, все `NOT_REVIEWED`).

## 2. Verification status distribution

| Status | Count |
| --- | ---: |
| `VERIFIED` | 9 |
| `PARTIALLY_VERIFIED` | 32 |
| `REQUIRES_VERIFICATION` | 150 |
| `NOT_SUPPORTED` | 1 |
| `CONFLICT` | 0 |
| **Всего claims** | **192** |

## 3. Review items и контрольные метрики

- Создано review items: **16**
- **Review status:** `NOT_STARTED`
- **expert-registered blockers:** **0**
- **mandatory review items pending (`NOT_REVIEWED`):** **16**
- **open publication gates:** **blocked** (DEC-016 + pending review + open normative CLAIM)
- Публикация контента **заблокирована** до независимого JPJO review и закрытия gates.

## 4. Что блокирует публикацию контента

1. **DEC-016** — операционная модель независимого JPJO reviewer (Open).
2. Массовые `REQUIRES_VERIFICATION` по точным клеткам Dz.U./CEFR.
3. Отсутствие заполненного JPJO verdict по обязательным блокам пакета.
4. Provisional mastery thresholds (`NOT_SUPPORTED` как «готовые к публикации»).

## 5. Что блокирует миграцию A2–B2

1. Незавершённый независимый review границ FN/SCN/Required A1.
2. Незакрытые методические вопросы IMP / SOFTEN / DAT-EXP / REPORT merge.
3. Риск переноса шаблонных ошибок A1 на следующие уровни.
4. Явный статус: A2–B2 = legacy / pending — миграция **не начата**.

## 6. Где нужен ручной доступ к источникам

- PDF Dz.U. 2025 poz. 217 załącznik nr 1 — поклеточное покрытие 46 Required и FN themes.
- CEFR Companion Volume — точные scale rows для 30 FN.
- Экспертная валидация 31 ERR (UKR/RUS/BEL).
- Перепроверка terminy при смене расписания Komisji.

## 7. Изменения модели в этом этапе

- Добавлены review-артефакты; канонические counts **не** менялись.
- Минимальные перекрёстные ссылки в traceability / sources / open decisions.
- Validator: структурные проверки пакета review (не методические решения).

## 8. Сознательно не изменено

- 30 FN / 17 SCN / 21 LEX / ASM/EXM содержимое can-do.
- A2–B2 legacy inventory.
- Не объявлялся A1 «утверждённым» или Phase 2 «завершённой».
- Не расширялся lore SŁOWARIUM; entity ID не ребрендились.

## 9. Почему validator не заменяет JPJO

Validator проверяет наличие файлов, уникальность ID, полноту полей CLAIM, каталог `SRC-*`, enum статусов/verdict, разрешимость entity, совпадение snapshot/summary counts и правила заполнения verdict в зависимости от `Review status`.
Он **не** оценивает достаточность FN, корректность L1, адекватность can-do и точность нормативной клетки.

## 10. Решение этапа

A1 semantic reference = **ready for independent human/JPJO review** (candidate).
Независимое одобрение **не** получено.
**A2–B2 semantic migration not started.**
