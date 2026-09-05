# Источники и политика доказательств (Phase 2)

**Статус:** Draft Phase 2 — не утверждено независимым методистом JPJO.  
**Baseline требований:** редакция 2.  
**Дата проверки внешних URL в этом файле:** 2026-09-05.  
**Язык документа:** русский (термины CEFR / JPJO / exam — EN/PL по необходимости).

Этот документ задаёт, **на чём** строится педагогическая архитектура SŁOWARIUM и **как** запрещать галлюцинации, фиктивные ссылки и ложные «нормы CEFR». Он не является syllabus, ERD или планом разработки.

Связанные артефакты: `methodology.md`, `review-checklist.md`, inventories Phase 2, пакет `docs/requirements/` (00–15).

---

## 1. Политика доказательств (Evidence policy)

### 1.1 Цель

Любое нормативное или «официальное» утверждение в curriculum (уровень, модуль экзамена, порог, каталог функций/тем/грамматики, дескриптор CEFR) должно быть **трассируемо** к проверяемому источнику. Наблюдения о L1-интерференции и рабочие диапазоны лексики помечаются иначе, чем закон или CEFR.

### 1.2 Правило цитирования (обязательно)

Для **каждого внешнего утверждения** в curriculum-документах указывать:

| Поле | Содержание |
| --- | --- |
| Источник | Название документа / сайта / акта |
| URL | Только реально известный; **не выдумывать** |
| Документ / раздел / страница | Если известно; иначе «раздел не проверен» |
| Дата проверки | `YYYY-MM-DD` (для этого пакета: **2026-09-05**, если не указано иначе) |
| Confidence | `High` / `Medium` / `Low` |

Если доступ к тексту отсутствует или формулировка не сверена: **`REQUIRES VERIFICATION`**. Запрещено заполнять пробел правдоподобной ссылкой.

### 1.3 Метки происхождения (согласовано с CNT-002 / CNT-007)

| Метка | Когда ставить |
| --- | --- |
| `OFFICIAL_STANDARD` | CEFR / Companion Volume; Dz.U. 2025 poz. 217 и załącznik; страницы Komisji на certyfikatpolski.pl |
| `DESCRIPTIVE_GRAMMAR` | Признанные описательные грамматики польского (факт языка, не текст учебника) |
| `PRODUCT_ANALYSIS` | Решение продукта на основе брифа / требований редакции 2 |
| `ASSUMPTION` | Рабочее допущение (числа mastery, минимумы банков и т.п.) |
| `EXPERT_VALIDATION_REQUIRED` | L1-ошибки, тонкие нормы, спорные границы правила — до JPJO |
| `REQUIRES_VERIFICATION` | Внешнее утверждение без доступа к источнику |
| `TEXTBOOK_COVERAGE_ONLY` | Сравнение покрытия с серией учебников; **не** структура syllabus |

### 1.4 Что считать доказательством «полного уровня»

**Не является** доказательством полноты уровня:

- наличие явления в grammar inventory;
- ориентир по числу lemmas;
- прохождение экранов урока;
- AI-«ревью» без человека.

**Является** (см. PED-015, CNT-016, документ 10 §10.8):

- утверждённая Level matrix Phase 2;
- exit criteria уровня;
- матрица покрытия Katalog A/B и списков грамматики с клетками covered / gap / out_of_scope / interim;
- независимый JPJO pass с датой.

### 1.5 Роль AI в цепочке доказательств

- AI — **вспомогательный черновик** автора (основатель + AI-assisted pipeline).
- AI **не** единственный автор теории, **не** единственный ключ, **не** единственный reviewer, **не** итоговый оценщик письма/речи (`PED-023`, `BUS-010`, ops §11).
- Feedback модели в продукте — только **formative** и явно неофициальный.
- Формирующая AI-заметка **не** цитируется как источник нормы польского в curriculum.

### 1.6 Учебники

Допускается: сверка **покрытия** тем/функций/грамматических зон.  
Запрещено: копировать оглавление, сюжет, персонажей, последовательность глав, тексты, наборы заданий (`CNT-009`, `PRN-008`). AI-перефраз учебника ≠ оригинал (`CNT-010`).

---

## 2. Уровни источников (Source tiers)

### Tier 1 — Primary (норма и официальная система экзамена)

| Роль | Примеры |
| --- | --- |
| Общеевропейская шкала компетенций | CEFR (2001); CEFR Companion Volume (2018/обновлённые дескрипторы) |
| Польский государственный стандарт JPJO / exam | Dz.U. 2025 poz. 217; załącznik nr 1 (стандарты уровней, Katalog A/B, listy gramatyczne) |
| Операционная информация Komisji | certyfikatpolski.pl (структура экзамена, terminy sesji) |

**Использование:** уровни A1–B2 как цели; can-do / дескрипторы; модули и пороги экзамена; каталоги функций и тем как **чеклист покрытия**, не как текст урока (`PED-027`).

### Tier 2 — Secondary (описательная норма языка)

| Роль | Примеры (типовые; конкретное издание — при цитировании) |
| --- | --- |
| Описательные грамматики | Swan (*A Grammar of Contemporary Polish*); Nagórko (*Zarys gramatyki polskiej*); академические / университетские грамматики JPJO |
| Методическая литература JPJO | Обобщённая практика преподавания (без копирования чужих курсов) |

**Использование:** форма, значение, употребление, исключения, чередования, rekcja — как **лингвистический факт**. Не копировать длинные фрагменты чужого текста.

### Tier 3 — Contrastive textbooks (только сравнение покрытия)

| Роль | Правило |
| --- | --- |
| Серии учебников PL как FL | ≥2 независимые серии при проектировании покрытия; ответ reviewer: «сверяли покрытие, тексты свои» (`CNT-009`) |
| Списки false friends / «типичные ошибки» из блогов | Не primary; только стимул для собственной карточки с `EXPERT_VALIDATION_REQUIRED` |

**Использование:** gap-анализ («у нас нет темы X, а в трёх сериях она на A2»). **Не** использовать как скелет syllabus продукта (`CNT-015`).

### Вне tiers (запрет как syllabus)

- Неофициальные «CEFR word lists» без языка-специфичного RLD и без указания, что это **не** документ Совета Европы.
- Форумные «бланки прошлого экзамена» (`CNT-011`).
- Юридические советы по делу учащегося без сверки актуального права (`EXM-013`).

---

## 3. Шаблон цитирования

Копировать в footnotes / колонки inventory:

```text
Утверждение: <одно предложение>
Источник: <имя>
URL: <url или «нет URL / печатное издание»>
Документ/раздел/стр.: <… или «не сверено»>
Дата проверки: 2026-09-05
Confidence: High | Medium | Low
Метка: OFFICIAL_STANDARD | DESCRIPTIVE_GRAMMAR | …
Примечание: <если REQUIRES VERIFICATION — что именно проверить>
```

**Мини-пример (норма экзамена):**

```text
Утверждение: На B1 (взрослые) для сдачи нужен порог не ниже 50% по каждому модулю (письменным и устному).
Источник: Rozporządzenie MNiSW z 14.02.2025 r., Dz.U. 2025 poz. 217, § 23
URL: https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000217
Документ/раздел: § 23 (точный подпункт — сверить по PDF załącznika / текста)
Дата проверки: 2026-09-05
Confidence: High (акт); Medium для дословной цитаты без открытого PDF в момент написания строки
Метка: OFFICIAL_STANDARD
```

**Мини-пример (запрет ложной нормы CEFR):**

```text
Утверждение: CEFR не устанавливает официальное число «слов на A1/A2/B1/B2» как единую норму Совета Европы.
Источник: CEFR — характер дескрипторов компетенций; RLD — национальные команды, не CoE word count
URL: https://www.coe.int/en/web/common-european-framework-reference-languages
Дата проверки: 2026-09-05
Confidence: High
Метка: OFFICIAL_STANDARD (отрицательное утверждение о scope CEFR)
```

---

## 4. Реестр источников (с confidence)

Проверка URL: **2026-09-05**, если не указано иначе.

### 4.1 Council of Europe / CEFR

| ID | Источник | URL | Раздел | Confidence | Использование в SŁOWARIUM |
| --- | --- | --- | --- | --- | --- |
| SRC-CEFR-HUB | CEFR portal (CoE) | https://www.coe.int/en/web/common-european-framework-reference-languages | обзор рамки | High | Входная точка; ссылки на тома |
| SRC-CEFR-2001 | *Common European Framework of Reference for Languages: Learning, Teaching, Assessment* | https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/1680459f97 | PDF CEFR | High (доступность URL); Medium для точных page cites без повторного открытия нужной стр. | Дескрипторы навыков, принцип уровней, отсутствие предписанного глобального word count |
| SRC-CEFR-CV | *CEFR Companion Volume with New Descriptors* | https://rm.coe.int/cefr-companion-volume-with-new-descriptors/1680787989 | PDF Companion Volume | High (URL); Medium для page cites | Обновлённые / дополнительные дескрипторы; mediation и др. — по мере включения в exit criteria |
| SRC-CEFR-RLD | Reference Level Descriptions (language-by-language) — пояснение CoE | https://www.coe.int/en/web/language-policy/cefr-reference-level-descriptions | RLD overview | High | RLD ≠ сам CEFR; словарные инвентари — национальные, не «официальный CEFR wordlist» |

### 4.2 Польский госэкзамен и стандарт требований

| ID | Источник | URL | Раздел | Confidence | Использование |
| --- | --- | --- | --- | --- | --- |
| SRC-DU-217-ISAP | Dz.U. 2025 poz. 217 — карточка акта (ISAP) | https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20250000217 | DocDetails | High | Идентификация акта; ссылка на текст/PDF |
| SRC-DU-217-PDF | Текст постановления (PDF Dziennik Ustaw) | https://dziennikustaw.gov.pl/D2025000021701.pdf | полный текст; § 14, § 17, § 22, § 23; załącznik nr 1 | High (URL известен пакету требований); **REQUIRES VERIFICATION** для каждой новой дословной цитаты при публикации UI | Модули, пороги, длительность устной части, стандарты уровней, Katalog A/B, listy gramatyczne |
| SRC-CERT-HOME | Państwowa Komisja — портал | https://certyfikatpolski.pl/ | главная | High | Официальный канал Komisji; не путать с продуктом |
| SRC-CERT-STRUKTURA | Структура экзамена | https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/ | страница | High | Какие уровни сдаются; отличие модулей; сверка с § 14 |
| SRC-CERT-2026 | Terminy sesji 2026 | https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/ | расписание года | High на дату проверки | Только `session_availability` для 2026; не определяет `standard_status` |

### 4.3 Описательные грамматики (Tier 2)

Конкретные ISBN/страницы при публикации концепта заполняет автор; до сверки — Medium/Low или `REQUIRES VERIFICATION`.

| ID | Источник (типовой) | URL | Confidence | Примечание |
| --- | --- | --- | --- | --- |
| SRC-SWAN | O. E. Swan, *A Grammar of Contemporary Polish* | печатное / каталог издателя — **не выдумывать прямую PDF-ссылку** | Medium (известность как descriptive grammar); page cites — Low/`REQUIRES VERIFICATION` | Формы, категории; не syllabus |
| SRC-NAGORKO | A. Nagórko, *Zarys gramatyki polskiej* (и связанные издания) | печатное | Medium; pages — `REQUIRES VERIFICATION` | Морфология/синтаксис |
| SRC-JPJO-ACADEMIC | Университетские / академические материалы JPJO | по конкретной публикации | Low до указания издания | Только факты + provenance |

### 4.4 Учебники (Tier 3 — coverage only)

Конкретные названия серий автор фиксирует в review-ответе «какие серии сверяли». В реестре Phase 2 **не** закрепляется одна серия как канон (анти-клон).

| ID | Роль | Confidence |
| --- | --- | --- |
| SRC-TB-COMPARE | ≥2 независимые JPJO-серии для gap-анализа покрытия | N/A как норма; High только как факт «сверка выполнена», если reviewer подписал |

### 4.5 Внутренние источники продукта

| ID | Источник | Confidence |
| --- | --- | --- |
| SRC-REQ-R2 | Пакет `docs/requirements/` редакция 2 | High для решений продукта; не заменяет CEFR/закон |
| SRC-BRIEF-P2 | Бриф Phase 2 (сценарии аудитории, ops locks) | High для продуктовых ограничений |
| SRC-OBS-L1 | Наблюдения аудитории UKR/RUS/BEL | Low/`EXPERT_VALIDATION_REQUIRED` до JPJO |

---

## 5. Что CEFR задаёт и чего **не** задаёт

### 5.1 Задаёт (использовать)

- Общую шкалу уровней (A1–C2) и подход через **коммуникативные компетенции / виды деятельности**.
- Дескрипторы can-do (и обновления Companion Volume) как опору для exit criteria и формулировок целей.
- Принцип, что детальные списки форм и лексики для конкретного языка — зона **Reference Level Descriptions** и национальных спецификаций, а не единого глобального «CEFR dictionary».

**Цитирование рамок:** SRC-CEFR-HUB, SRC-CEFR-2001, SRC-CEFR-CV — дата проверки **2026-09-05**, confidence **High** для существования документов и характера рамки.

### 5.2 Не задаёт (запрет ложных норм)

| Запрещённое утверждение | Почему |
| --- | --- |
| «По CEFR на A1 нужно ровно N слов» | CEFR **не** устанавливает единые официальные word counts для всех языков |
| «Companion Volume утвердил польский словник A2» | Companion Volume — дескрипторы; польский инвентарь — не «CEFR official wordlist» |
| «Наш список = официальный CEFR Polish» | Даже при сверке с RLD/постановлением это **продуктовый** или национальный чеклист |

Любые числа lemmas / word families в `lexical-targets.md` помечать: **внутренний рабочий диапазон** (`ASSUMPTION` / `PRODUCT_ANALYSIS`), не «норма CEFR».

Ориентиры чтения в załącznik nr 1 (если там есть количественные формулировки для уровня) — это **стандарт польского экзамена/требований**, не CEFR word count. Их цитировать только со ссылкой на załącznik и не переносить ярлык «CEFR».

### 5.3 Связь CEFR ↔ Dz.U. 2025 poz. 217

- CEFR — рамка компетенций.
- Постановление и załącznik — **польская** операционализация требований к уровням и экзамену.
- Продукт может быть CEFR-aligned **и** сверяться с Katalog A/B, не копируя тексты приложения в уроки (`PED-027`).

---

## 6. Exam standard vs session schedule

Два **независимых** поля (документ `07`, правка редакции 2 / Phase 2):

| Поле | Значения | Смысл |
| --- | --- | --- |
| `standard_status` | `current` / `superseded` | Действует ли уровень в официальном стандарте требований |
| `session_availability` | `announced` / `not_announced` / `requires_recheck` | Объявлена ли сессия в конкретном расписании (год/горизонт) |

**Правило:** существование официального уровня ≠ объявление сессии в 2026 году.

### Сводка на 2026-09-05 (взрослые)

| Уровень | standard_status | session_availability (2026) | Источники | Confidence |
| --- | --- | --- | --- | --- |
| A1 | `current` | `not_announced` | Dz.U. 2025 poz. 217; SRC-CERT-STRUKTURA; SRC-CERT-2026 | High |
| A2 | `current` | `not_announced` (при том, что сайт сообщает о возможности сдачи A2) | то же | High для разделения полей; Medium для формулировок UI («можно сдавать» vs «дата 2026») — сверять struktura |
| B1 | `current` | `announced` | SRC-CERT-2026 | High |
| B2 | `current` | `announced` (часть сессий) | SRC-CERT-2026 | High |
| C1/C2 | `current` | `announced` | SRC-CERT-2026 | High; **вне учебной цели** продукта A1–B2 |

**Продуктовые следствия:**

- A1: только **standards-aligned / future exam-compatible**; запрет продавать как «подготовку к ближайшей объявленной сессии» (`EXM-001`, `EXM-012`).
- Не использовать статус `historical` для A1.
- Любая смена terminy → обновить `session_availability` + дату проверки (`CNT-008`, `CNT-022`).

---

## 7. Пробелы, требующие верификации (Gaps)

| Gap ID | Что проверить | Почему важно | Владелец |
| --- | --- | --- | --- |
| GAP-SRC-01 | Дословные цитаты § 14 / § 17 / § 23 и точные формулировки załącznik nr 1 (Katalog A/B, listy, любые числовые ориентиры чтения) по PDF | UI и exam-mode не должны опираться на пересказ | Автор + JPJO |
| GAP-SRC-02 | Page-level cites CEFR / Companion Volume для конкретных can-do в exit criteria | Иначе Low confidence у дескрипторов | Автор Phase 2 exit criteria |
| GAP-SRC-03 | Наличие/статус польского RLD или эквивалента и его отношение к продуктовому словнику | Не выдать внутренний список за «официальный CEFR PL» | Автор lexical-targets |
| GAP-SRC-04 | Актуальные terminy после 2026-09-05 | `session_availability` устаревает | Reviewer exam-справок |
| GAP-SRC-05 | Правовые статьи B1 (obywatelstwo / rezydent UE / stały) перед публикацией справки | `EXM-013` — `requires_recheck` | Юрист / владелец DEC-013 |
| GAP-SRC-06 | Page cites Swan / Nagórko / иных грамматик для спорных норм (rekcja, męskoosobowy, aspect pairs) | Tier 2 без страниц = Medium/Low | Linguistic reviewer |
| GAP-SRC-07 | Карточки L1-ошибок | `EXPERT_VALIDATION_REQUIRED` до публикации | JPJO + L1-competent reviewer |
| GAP-SRC-08 | Список серий учебников, реально использованных для coverage compare | Анти-клон checklist | Content reviewer |

Пока gap открыт, клетка покрытия = `interim` / `gap`, не «полный уровень».

---

## 8. Операционные правила для авторов Phase 2

1. Перед утверждением «полный A1/A2/B1/B2» — закрыть matrices и пройти `review-checklist.md`.
2. Любое новое число (слова, % mastery, минуты) — метка `ASSUMPTION` или официальная цитата с URL.
3. При конфликте учебник vs постановление vs CEFR: **приоритет Tier 1** для нормы уровня/экзамена; учебник только coverage; CEFR — компетенции, не польский словник.
4. При конфликте «сайт говорит, что уровень сдаётся» vs «в terminy 2026 нет сессии» — заполнять **оба** поля статуса, не схлопывать в одно.

---

## 9. История

| Дата | Изменение |
| --- | --- |
| 2026-09-05 | Создание Phase 2 draft: политика, tiers, реестр URL, CEFR scope, standard vs session, gaps |
