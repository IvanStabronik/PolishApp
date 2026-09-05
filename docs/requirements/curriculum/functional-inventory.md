# Коммуникативно-функциональный инвентарь (A1–B2)

**Статус:** Phase 2 curriculum draft — требует калибровки и linguistic review.  
**Аудитория:** первая очередь — взрослые с L1 UKR / RUS / BEL, живущие в Польше.  
**Язык документа:** русский (метаязык требований); польские формы — объект обучения.  
**Дата сверки внешних источников:** **2026-09-05**.

---

## 0. Антигаллюцинация и источники

| Источник | URL / реквизит | Что берём | Чего **не** берём | Confidence |
| --- | --- | --- | --- | --- |
| CEFR + Companion Volume (Council of Europe) | [coe.int — CEFR](https://www.coe.int/en/web/common-european-framework-reference-languages); Companion Volume (2018/2020) | Качественные can-do, шкалы действий, медиация, прагматика общения | Официальные нормы «числа слов на уровень» (их в CEFR/CV **нет**) | **высокий** на характер дескрипторов; **средний** на локальную адаптацию под польский быт |
| Dz.U. 2025 poz. 217, załącznik nr 1 | [PDF Dziennik Ustaw](https://dziennikustaw.gov.pl/D2025000021701.pdf) | Каталоги умений A/B, списки грамматики, модули экзамена как ориентир покрытия | Копирование чужих учебников; выдача внутренних порогов продукта за закон | **высокий** на структуру стандарта |
| certyfikatpolski.pl — struktura | [struktura egzaminu](https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/) | Модули взрослых A1–B2; пороги; формулировка «Obecnie egzaminy można zdawać…» | Подмена `standard_status` полем `session_availability` | **высокий** (проверка 2026-09-05) |
| certyfikatpolski.pl — terminy 2026 | [terminy sesji 2026](https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/) | Объявленные сессии 2026: **B1/B2 announced**; **A1/A2 не в расписании** (`not_announced`) | Утверждение, что A1/A2 «отменены» или `historical` | **высокий** на снимок 2026-09-05; расписание может измениться |

**Правило продукта:** инвентарь функций — **учебный** (instructional). Готовность к госэкзамену — отдельный слой в `level-exit-criteria.md`. Не смешивать.

**ID грамматики:** `GR-*` ниже — **временные ярлыки** Phase 2 до утверждения `grammar-inventory.md`. Доменные теги: `DOM-*`.

---

## 1. Приоритетные сценарии первой аудитории

Порядок = приоритет контента V1–V3 (не порядок введения в уроке):

1. `DOM-WORK` — работа (смена, HR, коллеги, больничный, обязанность)
2. `DOM-HOUSING` — аренда жилья (ogłoszenie, umowa, kaucja, usterki)
3. `DOM-URZAD` — urząd / документы / PESEL / wizyty
4. `DOM-MED` — przychodnia, recepta, apteka, NFZ-быт
5. `DOM-SCHOOL` — школа / przedszkole / wychowawca
6. `DOM-BANK` — konto, przelew, karta, limity
7. `DOM-SHOP` — sklep, usługi, reklamacja
8. `DOM-TRANS` — transport, bilety, dojazd do pracy
9. `DOM-NEIGHBOR` — sąsiedzi, wspólnota, cisza nocna
10. `DOM-PHONE` — rozmowy telefoniczne / voice-mail
11. `DOM-COMPLAINT` — skargi, prośby, odmowy
12. `DOM-TV` — pan/pani ↔ ty, wołacz, zdrobnienia
13. `DOM-FORMAL` — oficjalna korespondencja (e-mail, pismo)

Дополнительно на каждом уровне: `DOM-EVERYDAY` (время, еда, дом), `DOM-SOCIAL` (знакомство, small talk).

---

## 2. Сводные счётчики (коммуникативные функции FN-*)

| Уровень | Число FN-* | Примечание |
| --- | ---: | --- |
| A1 | **42** | Выживание + первый официальный регистр |
| A2 | **48** | Расширение институциональных сценариев |
| B1 | **55** | Самостоятельность + аргументация в быту/работе |
| B2 | **50** | Сложные жалобы, переговоры, нюанс регистра |
| **Итого** | **195** | Без дублирования ID между уровнями; спиральное возвращение темы = новый FN на новом уровне |

Остальные разделы уровня (сценарии, речевые акты, жанры, прагматика, регистр, компенсации, R/L) — полные перечни **без** отдельной нумерации FN; трассируются к FN через домены.

---

## 3. Канонические языковые ID

Временные ярлыки прежнего черновика (псевдо-ID падежей/регистра без канонической записи) **удалены**.  
Канонические определения:

- грамматика: `grammar-inventory.md` (`GR-*`);
- фонетика / орфография / прагматика: `concept-extensions.md` (`PHON-*`, `ORTH-*`, `PRAG-*`);
- таблица миграции старых ID → канонические: `concept-extensions.md`.

Кластеры `GR-CAS-*` / `GR-ASP-*` допустимы только в обзорных картах, не как exact prerequisite.

---

# A1

**CEFR-ориентир (качественно):** очень простые высказывания о себе и ближайших нуждах; понимание медленной чёткой речи в знакомых ситуациях ([CEFR/CV](https://www.coe.int/en/web/common-european-framework-reference-languages), confidence: высокий на характер уровня).  
**Связь с госстандартом:** A1 взрослые — `standard_status=current`; модули słuch / czytanie / pisanie + mówienie ([struktura](https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/), Dz.U. 2025 poz. 217); `session_availability` 2026 = **not_announced** ([terminy 2026](https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/), проверка 2026-09-05).

## Canonical FN records (integrity fix)

Каждая функция ниже имеет канонические prerequisites (см. миграцию в `concept-extensions.md`). **Criticality:** Core блокирует exit уровня; Important — провизорный порог; Extension не блокирует.

| Уровень | FN |
|---|---:|
| A1 | 42 |
| A2 | 48 |
| B1 | 55 |
| B2 | 50 |
| **Всего** | **195** |

### FN-A1-001
- **Level:** A1
- **Function:** Представиться: имя, страна, город, L1
- **Domains:** EVERYDAY, SOCIAL
- **GR prerequisites:** GR-CAS-NOM-01, GR-TNS-PRS-01, GR-AGR-ADJ-01, GR-GEN-MFN-01, GR-PRO-POSS-01, GR-PREP-DO-NA-01
- **LEX bundles:** LEX-IDENTITY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03, ERR-UKR-03
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-002
- **Level:** A1
- **Function:** Спросить / назвать профессию и место работы
- **Domains:** WORK
- **GR prerequisites:** GR-CAS-NOM-01, GR-CAS-LOC-01, GR-REK-VERB-01, GR-NUM-SGPL-01, GR-PRO-INT-01, GR-PREP-Z-01
- **LEX bundles:** LEX-WORK-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-UKR-05
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-003
- **Level:** A1
- **Function:** Сказать, где живёт / снимает жильё (простая формула)
- **Domains:** HOUSING
- **GR prerequisites:** GR-CAS-LOC-01, GR-REK-VERB-01, GR-AGR-VPAST-01, GR-NUM-CARD-05, GR-TIME-EXPR-01
- **LEX bundles:** LEX-HOUSING-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01, ERR-UKR-06
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-004
- **Level:** A1
- **Function:** Назвать адрес, этаж, номер квартиры
- **Domains:** HOUSING, URZAD
- **GR prerequisites:** GR-CAS-NOM-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-ADDRESS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01, ERR-UKR-08
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-005
- **Level:** A1
- **Function:** Поздороваться / попрощаться в официальном и бытовом регистре
- **Domains:** TV, SOCIAL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-VOC-01, PHON-CORE-01
- **LEX bundles:** LEX-GREETINGS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24, ERR-UKR-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-006
- **Level:** A1
- **Function:** Обратиться pan/pani + 3 л. в магазине / на ресепшене
- **Domains:** TV, SHOP
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, ORTH-CH-H-01
- **LEX bundles:** LEX-SERVICE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24, ERR-UKR-11
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-007
- **Level:** A1
- **Function:** Попросить повторить / говорить медленнее
- **Domains:** PHONE, EVERYDAY
- **GR prerequisites:** GR-MOD-IMP-01, GR-Q-YESNO-01, PRAG-REPAIR-01, PHON-CI-SI-ZI-01
- **LEX bundles:** LEX-REPAIR
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20, ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-008
- **Level:** A1
- **Function:** Сказать, что не понимает; попросить перевод ключевого слова
- **Domains:** EVERYDAY, URZAD
- **GR prerequisites:** GR-NEG-01, GR-Q-YESNO-01, PRAG-REPAIR-01
- **LEX bundles:** LEX-REPAIR
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03, ERR-UKR-14
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-009
- **Level:** A1
- **Function:** Назвать цену, количество, сдачу (простые числа)
- **Domains:** SHOP, BANK
- **GR prerequisites:** GR-NUM-CARD-01, GR-CAS-GEN-01, GR-ALT-STEM-01, GR-NUM-ORD-01, GR-Q-WH-01
- **LEX bundles:** LEX-MONEY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-UKR-17
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-010
- **Level:** A1
- **Function:** Купить товар / заказать услугу по образцу
- **Domains:** SHOP
- **GR prerequisites:** GR-CAS-ACC-01, GR-CAS-GEN-01, GR-REK-VERB-01, GR-CAS-NOM-02, GR-NUM-MONEY-01, GR-GEN-PART-01
- **LEX bundles:** LEX-SHOP
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-011
- **Level:** A1
- **Function:** Заказать еду / напиток
- **Domains:** SHOP
- **GR prerequisites:** GR-CAS-ACC-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-FOOD
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-UKR-19
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-012
- **Level:** A1
- **Function:** Спросить / объяснить дорогу (базовые ориентиры)
- **Domains:** TRANS
- **GR prerequisites:** GR-CAS-ACC-01, GR-CAS-LOC-01, GR-MOD-IMP-01, GR-CAS-ACC-02, GR-TNS-FUT-02, GR-WO-Q-01
- **LEX bundles:** LEX-TRANS-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12, ERR-UKR-21
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-013
- **Level:** A1
- **Function:** Купить билет / спросить о времени отправления
- **Domains:** TRANS
- **GR prerequisites:** GR-Q-YESNO-01, GR-NUM-CARD-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-TRANS-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12, ERR-UKR-22
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-014
- **Level:** A1
- **Function:** Записаться на визит (простая фраза: день, час)
- **Domains:** MED, URZAD, SCHOOL
- **GR prerequisites:** GR-TNS-FUT-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-APPOINTMENT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15, ERR-UKR-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-015
- **Level:** A1
- **Function:** Назвать симптомы на уровне списка слов + «boli mnie…»
- **Domains:** MED
- **GR prerequisites:** GR-CAS-ACC-01, GR-PRO-REFL-01, GR-CAS-GEN-02, GR-MOT-BASE-01, GR-GEN-ADJ-01
- **LEX bundles:** LEX-BODY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15, ERR-RUS-03
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-016
- **Level:** A1
- **Function:** Получить / отдать документы на окошке (мини-скрипт)
- **Domains:** URZAD
- **GR prerequisites:** GR-CAS-ACC-01, GR-MOD-IMP-01, PRAG-PAN-01
- **LEX bundles:** LEX-DOCS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23, ERR-RUS-05
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-017
- **Level:** A1
- **Function:** Представиться в urzędzie и назвать цель визита одной фразой
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-URZAD-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23, ERR-RUS-06
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-018
- **Level:** A1
- **Function:** Попросить форму / указать недостающий документ
- **Domains:** URZAD
- **GR prerequisites:** GR-CAS-GEN-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-DOCS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23, ERR-RUS-07
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-019
- **Level:** A1
- **Function:** Написать короткое SMS: опоздание, подтверждение
- **Domains:** WORK, SCHOOL, PHONE
- **GR prerequisites:** GR-TNS-PRS-01, GR-NEG-01, GR-CAS-GEN-03, GR-SYN-COORD-01, GR-INF-COMPL-01
- **LEX bundles:** LEX-SMS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-RUS-08
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-020
- **Level:** A1
- **Function:** Позвонить и сказать, кто звонит + зачем (скрипт)
- **Domains:** PHONE
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-PHONE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20, ERR-RUS-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-021
- **Level:** A1
- **Function:** Оставить голосовое / передать просьбу перезвонить
- **Domains:** PHONE
- **GR prerequisites:** GR-MOD-IMP-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-PHONE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20, ERR-RUS-11
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-022
- **Level:** A1
- **Function:** Попросить о помощи у коллеги / соседа (простая prośba)
- **Domains:** WORK, NEIGHBOR
- **GR prerequisites:** GR-MOD-VERB-01, GR-CAS-ACC-01, GR-CAS-GEN-04, GR-NEG-GEN-01
- **LEX bundles:** LEX-REQUEST
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-RUS-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-023
- **Level:** A1
- **Function:** Отказать коротко и вежливо (nie mogę / niestety)
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-NEG-01, GR-MOD-VERB-01, PRAG-PAN-01
- **LEX bundles:** LEX-REFUSAL
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24, ERR-RUS-14
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-024
- **Level:** A1
- **Function:** Поблагодарить и ответить на благодарность
- **Domains:** SOCIAL, TV
- **GR prerequisites:** GR-CAS-DAT-01, GR-REK-VERB-01
- **LEX bundles:** LEX-POLITENESS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03, ERR-RUS-17
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-025
- **Level:** A1
- **Function:** Извиниться за опоздание / помеху
- **Domains:** WORK, SCHOOL, NEIGHBOR
- **GR prerequisites:** GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-POLITENESS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-026
- **Level:** A1
- **Function:** Спросить о наличии товара / свободного слота
- **Domains:** SHOP, MED
- **GR prerequisites:** GR-Q-YESNO-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-AVAILABILITY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-RUS-19
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-027
- **Level:** A1
- **Function:** Сообщить о простой usterce в квартире (cieknie, nie działa)
- **Domains:** HOUSING
- **GR prerequisites:** GR-NEG-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-HOUSING-FIX
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01, ERR-RUS-21
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-028
- **Level:** A1
- **Function:** Представиться воспитателю / сказать имя ребёнка
- **Domains:** SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-SCHOOL-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12, ERR-RUS-22
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-029
- **Level:** A1
- **Function:** Сообщить об отсутствии ребёнка (болезнь / поездка)
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-SCHOOL-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12, ERR-RUS-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-030
- **Level:** A1
- **Function:** Открыть счёт / спросить о карте (скриптовые реплики)
- **Domains:** BANK
- **GR prerequisites:** PRAG-PAN-01, GR-Q-YESNO-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-BANK-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-BEL-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-031
- **Level:** A1
- **Function:** Сделать простой przelew по образцу (термины)
- **Domains:** BANK
- **GR prerequisites:** GR-NUM-CARD-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-BANK-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-BEL-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-032
- **Level:** A1
- **Function:** Описать типичный день (работа–дом–магазин)
- **Domains:** WORK, EVERYDAY
- **GR prerequisites:** GR-TNS-PRS-01, GR-ASP-LEX-01, GR-CAS-GEN-05, GR-TV-AGR-01
- **LEX bundles:** LEX-ROUTINE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-BEL-05
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-033
- **Level:** A1
- **Function:** Назвать дни, месяцы, часы встречи
- **Domains:** EVERYDAY
- **GR prerequisites:** GR-NUM-CARD-01, GR-CAS-GEN-01, GR-CAS-INS-02, GR-EXIST-01
- **LEX bundles:** LEX-TIME
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03, ERR-BEL-06
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-034
- **Level:** A1
- **Function:** Заполнить анкету: личные данные, адрес, телефон
- **Domains:** URZAD, WORK
- **GR prerequisites:** GR-CAS-NOM-01, ORTH-CORE-01, ORTH-OU-01, GR-CAS-FUNC-MAP-01, GR-ANIM-MASC-01
- **LEX bundles:** LEX-FORMS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23, ERR-BEL-07
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-035
- **Level:** A1
- **Function:** Написать 3–5 предложений о себе (учебный жанр)
- **Domains:** EVERYDAY
- **GR prerequisites:** GR-TNS-PRS-01, GR-AGR-ADJ-01, ORTH-IY-01, ORTH-RZ-Z-01, GR-REK-PREP-01, GR-CONJ-TYPE-01
- **LEX bundles:** LEX-IDENTITY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03, ERR-BEL-08
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-036
- **Level:** A1
- **Function:** Попросить счёт / уточнить способ оплаты
- **Domains:** SHOP
- **GR prerequisites:** GR-Q-YESNO-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-MONEY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-037
- **Level:** A1
- **Function:** Согласиться / подтвердить договорённость
- **Domains:** WORK, PHONE
- **GR prerequisites:** GR-TNS-PRS-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-AGREEMENT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-BEL-11
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-038
- **Level:** A1
- **Function:** Уточнить значение вывески / короткого объявления
- **Domains:** HOUSING, SHOP, URZAD
- **GR prerequisites:** GR-Q-YESNO-01
- **LEX bundles:** LEX-SIGNS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01, ERR-BEL-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-039
- **Level:** A1
- **Function:** Поздороваться с соседом и обменяться 1–2 фразами
- **Domains:** NEIGHBOR, TV
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-VOC-01
- **LEX bundles:** LEX-NEIGHBOR
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01, ERR-BEL-14
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-040
- **Level:** A1
- **Function:** Сообщить о боли / срочности и попросить помочь вызвать помощь (скрипт)
- **Domains:** MED
- **GR prerequisites:** GR-MOD-IMP-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-EMERGENCY-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15, ERR-BEL-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-041
- **Level:** A1
- **Function:** Различать официальное vs неофициальное обращение в готовых репликах
- **Domains:** TV
- **GR prerequisites:** PRAG-PAN-01, GR-PRO-PERS-01, GR-VERB-IRREG-01
- **LEX bundles:** LEX-GREETINGS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24, ERR-BEL-17
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A1-042
- **Level:** A1
- **Function:** Прочитать и выполнить короткую инструкцию (biletomat, аптека)
- **Domains:** TRANS, MED, SHOP
- **GR prerequisites:** GR-MOD-IMP-01, GR-PRO-DEM-01, GR-ZNA-WIED-01
- **LEX bundles:** LEX-INSTRUCTIONS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12, ERR-BEL-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-001
- **Level:** A2
- **Function:** Рассказать о работе: обязанности, график, коллеги
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, GR-ASP-LEX-01, GR-CAS-ACC-01, GR-REK-VERB-DAT-01, GR-COMP-EQ-01
- **LEX bundles:** LEX-WORK-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-BEL-19
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-002
- **Level:** A2
- **Function:** Попросить выходной / смену; объяснить причину
- **Domains:** WORK
- **GR prerequisites:** GR-MOD-VERB-01, GR-TNS-FUT-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-WORK-LEAVE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-BEL-21
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-003
- **Level:** A2
- **Function:** Понять и пересказать инструкцию по BHP / графику
- **Domains:** WORK
- **GR prerequisites:** GR-MOD-IMP-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-WORK-RULES
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12, ERR-BEL-22
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-004
- **Level:** A2
- **Function:** Вести переговоры об аренде: czynsz, kaucja, termin
- **Domains:** HOUSING
- **GR prerequisites:** GR-NUM-CARD-01, GR-CAS-GEN-01, GR-Q-YESNO-01, GR-PRO-SWOJ-01, GR-DAT-EXP-01
- **LEX bundles:** LEX-HOUSING-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-005
- **Level:** A2
- **Function:** Сообщить о usterce и договориться о wizycie serwisu
- **Domains:** HOUSING
- **GR prerequisites:** GR-TNS-PRS-01, GR-ASP-LEX-01
- **LEX bundles:** LEX-HOUSING-FIX
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-006
- **Level:** A2
- **Function:** Понять ключевые пункты ogłoszenia / umowy najmu
- **Domains:** HOUSING
- **GR prerequisites:** GR-DEG-ADJ-01
- **LEX bundles:** LEX-CONTRACT-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-007
- **Level:** A2
- **Function:** Записаться в urzędzie и уточнить список документов
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-Q-YESNO-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-URZAD-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-008
- **Level:** A2
- **Function:** Объяснить цель визита связным мини-монологом
- **Domains:** URZAD
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-URZAD-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-009
- **Level:** A2
- **Function:** Заполнить расширенную анкету (статус, дети, работа)
- **Domains:** URZAD, WORK
- **GR prerequisites:** GR-AGR-ADJ-01, ORTH-CORE-01
- **LEX bundles:** LEX-FORMS-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-010
- **Level:** A2
- **Function:** Описать симптомы связно; ответить на вопросы врача
- **Domains:** MED
- **GR prerequisites:** GR-TNS-PRS-01, GR-PRO-REFL-01, GR-ASP-LEX-01, PHON-NASAL-01, PHON-SZ-CZ-01, GR-PRO-INDEF-01, GR-SYN-TIME-01
- **LEX bundles:** LEX-MED-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-011
- **Level:** A2
- **Function:** Понять дозировку / режим приёма лекарства
- **Domains:** MED
- **GR prerequisites:** GR-NUM-CARD-01, GR-MOD-IMP-01
- **LEX bundles:** LEX-PHARMA
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-012
- **Level:** A2
- **Function:** Написать usprawiedliwienie / e-mail do szkoły
- **Domains:** SCHOOL, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PST-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-SCHOOL-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-013
- **Level:** A2
- **Function:** Обсудить z wychowawcą поведение / успеваемость (просто)
- **Domains:** SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-DEG-ADJ-01, GR-CAS-INS-01
- **LEX bundles:** LEX-SCHOOL-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-014
- **Level:** A2
- **Function:** Открыть тему przedszkole: аллергии, контакты, odbiór
- **Domains:** SCHOOL
- **GR prerequisites:** GR-CAS-ACC-01, GR-NEG-01
- **LEX bundles:** LEX-KINDER
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-015
- **Level:** A2
- **Function:** Спросить в банке о opłatach, limicie, przelewie zagranicznym (базово)
- **Domains:** BANK
- **GR prerequisites:** GR-Q-YESNO-01, GR-NUM-CARD-01, GR-REK-VERB-01
- **LEX bundles:** LEX-BANK-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-016
- **Level:** A2
- **Function:** Пожаловаться на ошибочное списание (скрипт + детали)
- **Domains:** BANK, COMPLAINT
- **GR prerequisites:** GR-TNS-PST-01, GR-NEG-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-BANK-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-017
- **Level:** A2
- **Function:** Сделать reklamację товара / услуги
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-TNS-PST-01, GR-CAS-GEN-01, GR-ASP-LEX-01, GR-ASP-PST-01, GR-NEG-DOUBLE-01
- **LEX bundles:** LEX-COMPLAINT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-018
- **Level:** A2
- **Function:** Попросить wymienić / zwrócić / naprawić
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-MOD-IMP-01, GR-MOD-VERB-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-COMPLAINT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-019
- **Level:** A2
- **Function:** Запланировать маршрут с пересадками; спросить об опоздании
- **Domains:** TRANS
- **GR prerequisites:** GR-TNS-FUT-01, GR-Q-YESNO-01, GR-CAS-INS-01
- **LEX bundles:** LEX-TRANS-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-020
- **Level:** A2
- **Function:** Сообщить о проблеме z biletem / kontrolą
- **Domains:** TRANS, COMPLAINT
- **GR prerequisites:** GR-TNS-PST-01, PRAG-PAN-01
- **LEX bundles:** LEX-TRANS-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-021
- **Level:** A2
- **Function:** Попросить соседа о тишине / помощи с посылкой
- **Domains:** NEIGHBOR
- **GR prerequisites:** PRAG-PAN-01, GR-MOD-VERB-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-NEIGHBOR-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-022
- **Level:** A2
- **Function:** Предложить помощь соседу; принять/отклонить
- **Domains:** NEIGHBOR
- **GR prerequisites:** GR-MOD-COND-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-NEIGHBOR-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-023
- **Level:** A2
- **Function:** Вести телефонный разговор без полного скрипта
- **Domains:** PHONE
- **GR prerequisites:** GR-Q-YESNO-01, GR-TNS-PRS-01, PRAG-REPAIR-01
- **LEX bundles:** LEX-PHONE-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-024
- **Level:** A2
- **Function:** Переспросить и перефразировать услышанное
- **Domains:** PHONE, URZAD
- **GR prerequisites:** GR-SYN-SUB-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-REPAIR-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-025
- **Level:** A2
- **Function:** Сформулировать prośbę с обоснованием
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-SYN-CAUSE-01, GR-MOD-VERB-01, PRAG-SOFTEN-01, GR-ASP-FUT-01, GR-PUNCT-LIST-01
- **LEX bundles:** LEX-REQUEST-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-026
- **Level:** A2
- **Function:** Отказать с причиной и альтернативой
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-NEG-01, GR-MOD-COND-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-REFUSAL-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-027
- **Level:** A2
- **Function:** Пожаловаться вежливо, без агрессии
- **Domains:** COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PST-01
- **LEX bundles:** LEX-COMPLAINT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-028
- **Level:** A2
- **Function:** Принять извинения / дать извинения развёрнуто
- **Domains:** SOCIAL, WORK
- **GR prerequisites:** GR-CAS-DAT-01, GR-TNS-PST-01
- **LEX bundles:** LEX-POLITENESS-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-029
- **Level:** A2
- **Function:** Перейти с pan/pani на ty по инициативе поляка (распознать сигнал)
- **Domains:** TV
- **GR prerequisites:** PRAG-PAN-01, GR-DEG-ADV-01, GR-MOD-PERM-01
- **LEX bundles:** LEX-TV-SHIFT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-030
- **Level:** A2
- **Function:** Отказать в переходе на ty / сохранить дистанцию
- **Domains:** TV, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-NEG-01
- **LEX bundles:** LEX-TV-SHIFT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-031
- **Level:** A2
- **Function:** Написать официальный e-mail: prośba o dokumenty / spotkanie
- **Domains:** FORMAL, WORK, SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-GEN-01, ORTH-CORE-01, GR-SYN-SUB-02, GR-DIM-01
- **LEX bundles:** LEX-EMAIL-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-032
- **Level:** A2
- **Function:** Написать неофициальное сообщение коллеге на ty
- **Domains:** WORK, TV
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-CHAT-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-033
- **Level:** A2
- **Function:** Описать прошлое событие (переезд, первый день работы)
- **Domains:** HOUSING, WORK
- **GR prerequisites:** GR-TNS-PST-01, GR-ASP-CON-01, GR-WO-CLIT-01, GR-CAS-GEN-PREP-02
- **LEX bundles:** LEX-NARRATIVE-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-034
- **Level:** A2
- **Function:** Сравнить два варианта жилья / смены / школы
- **Domains:** HOUSING, WORK, SCHOOL
- **GR prerequisites:** GR-DEG-ADJ-01, GR-CAS-NOM-01, GR-PUNCT-CLAUSE-01, GR-CASE-NUM-01
- **LEX bundles:** LEX-COMPARE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-035
- **Level:** A2
- **Function:** Выразить предпочтение и простое мнение
- **Domains:** EVERYDAY, WORK
- **GR prerequisites:** GR-MOD-VERB-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-OPINION-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-036
- **Level:** A2
- **Function:** Понять объявление wspólnoty / regulamin domu
- **Domains:** NEIGHBOR, HOUSING
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-RULES
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-037
- **Level:** A2
- **Function:** Записаться на szczepienie / badanie; перенести wizytę
- **Domains:** MED
- **GR prerequisites:** GR-TNS-FUT-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-MED-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-038
- **Level:** A2
- **Function:** Объяснить аллергии / хронические ограничения
- **Domains:** MED, SCHOOL
- **GR prerequisites:** GR-NEG-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-HEALTH-LIMIT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-039
- **Level:** A2
- **Function:** Участвовать в short small talk на работе
- **Domains:** WORK, SOCIAL
- **GR prerequisites:** GR-TNS-PRS-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-SMALLTALK
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-040
- **Level:** A2
- **Function:** Сообщить о L4 / wizycie u lekarza работодателю
- **Domains:** WORK, MED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-PUNCT-VOC-01, GR-VOC-NAME-01
- **LEX bundles:** LEX-WORK-LEAVE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-041
- **Level:** A2
- **Function:** Попросить разъяснить счёт / rachunek za media
- **Domains:** HOUSING, BANK
- **GR prerequisites:** GR-Q-YESNO-01, GR-NUM-CARD-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-BILLS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-042
- **Level:** A2
- **Function:** Описать человека (коллега, врач, wychowawca)
- **Domains:** WORK, SCHOOL, MED
- **GR prerequisites:** GR-AGR-ADJ-01, GR-CAS-INS-01
- **LEX bundles:** LEX-DESCRIPTION
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-043
- **Level:** A2
- **Function:** Дать простой совет (proszę + infinitive / niech…)
- **Domains:** SOCIAL, MED
- **GR prerequisites:** GR-MOD-IMP-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-ADVICE-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-044
- **Level:** A2
- **Function:** Понять короткий news/SMS от школы/банка
- **Domains:** SCHOOL, BANK
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-NOTIFY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-045
- **Level:** A2
- **Function:** Согласовать встречу с несколькими слотами
- **Domains:** WORK, SCHOOL, MED
- **GR prerequisites:** GR-NUM-CARD-01, GR-MOD-VERB-01, GR-TNS-FUT-01
- **LEX bundles:** LEX-SCHEDULING
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-046
- **Level:** A2
- **Function:** Выразить срочность / приоритет просьбы
- **Domains:** COMPLAINT, URZAD
- **GR prerequisites:** GR-MOD-VERB-01, PRAG-PAN-01
- **LEX bundles:** LEX-URGENCY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-047
- **Level:** A2
- **Function:** Использовать męskoosobowe формы в рассказе о коллегах/родителях
- **Domains:** WORK, SCHOOL
- **GR prerequisites:** GR-MO-VIR-01, GR-AGR-ADJ-01
- **LEX bundles:** LEX-PEOPLE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-A2-048
- **Level:** A2
- **Function:** Прочитать и кратко пересказать ulotkę / instrukcję
- **Domains:** MED, SHOP, URZAD
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-INSTRUCTIONS-A2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)

### FN-B1-001
- **Level:** B1
- **Function:** Провести рабочий разговор о задаче, сроке, ответственности
- **Domains:** WORK
- **GR prerequisites:** GR-ASP-CON-01, GR-SYN-SUB-01, GR-CAS-NOM-01, PRAG-MEDIATION-01, GR-REK-ADJ-01, GR-MOT-PREF-01, GR-SYN-COMP-01
- **LEX bundles:** LEX-WORK-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-002
- **Level:** B1
- **Function:** Участвовать в совещании: согласие, сомнение, уточнение
- **Domains:** WORK
- **GR prerequisites:** GR-WO-NEUT-01, GR-MOD-COND-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEETING
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-003
- **Level:** B1
- **Function:** Объяснить квалификацию и опыт на собеседовании
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PST-01, GR-ASP-CON-01, GR-CAS-INS-01
- **LEX bundles:** LEX-CV-ORAL
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-004
- **Level:** B1
- **Function:** Написать служебный e-mail: status, blocker, prośba
- **Domains:** WORK, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-SYN-SUB-01, ORTH-CORE-01
- **LEX bundles:** LEX-EMAIL-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-005
- **Level:** B1
- **Function:** Сообщить о конфликте смены / недопонимании инструкции
- **Domains:** WORK, COMPLAINT
- **GR prerequisites:** GR-TNS-PST-01, GR-ASP-CON-01, GR-PRO-REFL-01
- **LEX bundles:** LEX-WORK-CONFLICT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-006
- **Level:** B1
- **Function:** Вести переговоры об условиях аренды и ремонте
- **Domains:** HOUSING
- **GR prerequisites:** GR-MOD-COND-01, GR-NUM-CARD-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-HOUSING-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B1-007
- **Level:** B1
- **Function:** Понять и оспорить пункт umowy (своими словами)
- **Domains:** HOUSING, FORMAL
- **GR prerequisites:** GR-SYN-SUB-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-CONTRACT-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B1-008
- **Level:** B1
- **Function:** Написать pismo / e-mail do wspólnoty / właściciela
- **Domains:** HOUSING, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-DAT-01
- **LEX bundles:** LEX-FORMAL-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B1-009
- **Level:** B1
- **Function:** Пройти сложный визит в urzędzie: объяснить historię sprawy
- **Domains:** URZAD
- **GR prerequisites:** GR-TNS-PRS-01, GR-ASP-CON-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-URZAD-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-010
- **Level:** B1
- **Function:** Запросить / предоставить дополнительные документы с обоснованием
- **Domains:** URZAD
- **GR prerequisites:** GR-CAS-GEN-01, GR-MOD-VERB-01, PRAG-PAN-01, GR-NUM-VIR-01, GR-SYN-REL-01, GR-REPORT-01
- **LEX bundles:** LEX-DOCS-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-011
- **Level:** B1
- **Function:** Понять решение / wezwanie / pismo urzędowe (главное)
- **Domains:** URZAD
- **GR prerequisites:** GR-PASS-01
- **LEX bundles:** LEX-URZAD-READ
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-012
- **Level:** B1
- **Function:** Описать историю болезни и лекарства связно
- **Domains:** MED
- **GR prerequisites:** GR-ASP-CON-01, GR-TNS-PST-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-MED-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** exam-prep

### FN-B1-013
- **Level:** B1
- **Function:** Задать врачу уточняющие вопросы о рисках / сроках
- **Domains:** MED
- **GR prerequisites:** GR-Q-YESNO-01, GR-MOD-COND-01, PRAG-PAN-01
- **LEX bundles:** LEX-MED-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** exam-prep

### FN-B1-014
- **Level:** B1
- **Function:** Обжаловать запись / отказ wizyty (вежливо, аргументированно)
- **Domains:** MED, COMPLAINT
- **GR prerequisites:** GR-SYN-SUB-01, PRAG-PAN-01
- **LEX bundles:** LEX-COMPLAINT-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** exam-prep

### FN-B1-015
- **Level:** B1
- **Function:** Обсудить z nauczycielami plan wsparcia ребёнка
- **Domains:** SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-SYN-SUB-01, GR-MOD-COND-01
- **LEX bundles:** LEX-SCHOOL-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-016
- **Level:** B1
- **Function:** Написать uzasadnienie / wniosek szkolny
- **Domains:** SCHOOL, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-NOM-01, ORTH-CORE-01
- **LEX bundles:** LEX-SCHOOL-WRITE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-017
- **Level:** B1
- **Function:** Понять komunikat szkoły о wycieczce / zagrożeniu
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-SCHOOL-READ
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-018
- **Level:** B1
- **Function:** Решить спорную ситуацию в банке (opłata, blokada karty)
- **Domains:** BANK, COMPLAINT
- **GR prerequisites:** GR-TNS-PST-01, GR-NUM-CARD-01, PRAG-PAN-01
- **LEX bundles:** LEX-BANK-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-019
- **Level:** B1
- **Function:** Сравнить продукты банка / страхование на бытовом уровне
- **Domains:** BANK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-MOD-COND-01
- **LEX bundles:** LEX-BANK-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-020
- **Level:** B1
- **Function:** Провести reklamację с ссылкой на срок / чек / ustawę (бытовая формулировка)
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-SYN-SUB-01, GR-CAS-GEN-01, GR-NUM-COL-01, GR-SYN-COND-01, GR-WF-ASPECT-PAIR-01
- **LEX bundles:** LEX-COMPLAINT-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-021
- **Level:** B1
- **Function:** Отказаться от навязанной услуги и зафиксировать отказ
- **Domains:** SHOP, BANK, PHONE
- **GR prerequisites:** GR-NEG-01, PRAG-PAN-01, GR-MOD-IMP-01
- **LEX bundles:** LEX-REFUSAL-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-022
- **Level:** B1
- **Function:** Объяснить опоздание транспорта и последствия для работы
- **Domains:** TRANS, WORK
- **GR prerequisites:** GR-ASP-CON-01, GR-SYN-CAUSE-01
- **LEX bundles:** LEX-TRANS-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-023
- **Level:** B1
- **Function:** Пожаловаться перевозчику / найти альтернативу
- **Domains:** TRANS, COMPLAINT
- **GR prerequisites:** GR-MOD-COND-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-TRANS-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-024
- **Level:** B1
- **Function:** Урегулировать конфликт с соседом (шум, запах, место parking)
- **Domains:** NEIGHBOR, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-MOD-COND-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-NEIGHBOR-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B1-025
- **Level:** B1
- **Function:** Участвовать в zebranie wspólnoty: кратко взять слово
- **Domains:** NEIGHBOR, HOUSING
- **GR prerequisites:** GR-WO-NEUT-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEETING
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B1-026
- **Level:** B1
- **Function:** Вести телефонные переговоры с несколькими темами
- **Domains:** PHONE
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-PHONE-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20
- **Exam relevance:** exam-prep

### FN-B1-027
- **Level:** B1
- **Function:** Оставить структурированное голосовое: контекст–просьба–контакт
- **Domains:** PHONE
- **GR prerequisites:** GR-MOD-IMP-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-PHONE-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20
- **Exam relevance:** exam-prep

### FN-B1-028
- **Level:** B1
- **Function:** Сформулировать skargę письменно по схеме
- **Domains:** COMPLAINT, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PST-01, GR-ASP-CON-01
- **LEX bundles:** LEX-COMPLAINT-WRITE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B1-029
- **Level:** B1
- **Function:** Смягчить отказ и сохранить отношения
- **Domains:** COMPLAINT, WORK, SOCIAL
- **GR prerequisites:** GR-MOD-COND-01, PRAG-PAN-01
- **LEX bundles:** LEX-SOFTEN
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B1-030
- **Level:** B1
- **Function:** Настоять на просьбе без грубости (escalation вежливая)
- **Domains:** COMPLAINT, URZAD
- **GR prerequisites:** GR-MOD-VERB-01, GR-SYN-SUB-01, GR-ASP-IMP-01, GR-WO-IS-01, GR-ASP-ITER-01
- **LEX bundles:** LEX-ASSERTIVE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B1-031
- **Level:** B1
- **Function:** Управлять регистром pan/pani/ty в смешанной группе
- **Domains:** TV, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-MO-VIR-01
- **LEX bundles:** LEX-TV-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B1-032
- **Level:** B1
- **Function:** Выбрать wołacz / имя / должность уместно
- **Domains:** TV, SCHOOL, MED, WORK
- **GR prerequisites:** GR-CAS-VOC-01, PRAG-PAN-01
- **LEX bundles:** LEX-ADDRESS-FORMS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B1-033
- **Level:** B1
- **Function:** Написать oficjalne pismo: nagłówek, cel, uzasadnienie, zakończenie
- **Domains:** FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-SYN-SUB-01, ORTH-CORE-01
- **LEX bundles:** LEX-LETTER-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-034
- **Level:** B1
- **Function:** Написать полуформальный e-mail «на грани» ty/pan
- **Domains:** FORMAL, WORK
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-EMAIL-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-035
- **Level:** B1
- **Function:** Рассказать историю с причиной–следствием и оценкой
- **Domains:** EVERYDAY, WORK
- **GR prerequisites:** GR-ASP-CON-01, GR-SYN-SUB-01, GR-WO-NEUT-01
- **LEX bundles:** LEX-NARRATIVE-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B1-036
- **Level:** B1
- **Function:** Аргументировать «за/против» бытового решения
- **Domains:** HOUSING, SCHOOL, WORK
- **GR prerequisites:** GR-MOD-COND-01, GR-DEG-ADJ-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-ARGUMENT-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B1-037
- **Level:** B1
- **Function:** Пересказать содержание новости / объявления / письма
- **Domains:** URZAD, SCHOOL, WORK
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-MEDIATION-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-038
- **Level:** B1
- **Function:** Посредничать между поляком и L1-говорящим (устно, просто)
- **Domains:** SOCIAL, SCHOOL, MED
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-MEDIATION-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B1-039
- **Level:** B1
- **Function:** Использовать liczebniki в деньгах, сроках, людях без срыва согласования
- **Domains:** BANK, WORK, SCHOOL
- **GR prerequisites:** GR-NUM-CARD-01, GR-MO-VIR-01
- **LEX bundles:** LEX-NUM-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-040
- **Level:** B1
- **Function:** Выбрать видовую пару в прошлом/будущем по смыслу ситуации
- **Domains:** ALL
- **GR prerequisites:** GR-ASP-CON-01, GR-TNS-PRS-01, GR-ASP-NEG-01, GR-WF-PREF-01
- **LEX bundles:** LEX-ASPECT-PAIRS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B1-041
- **Level:** B1
- **Function:** Описать правила на работе / в доме и исключения
- **Domains:** WORK, HOUSING
- **GR prerequisites:** GR-SYN-SUB-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-RULES-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-042
- **Level:** B1
- **Function:** Выразить гипотезу и условие (*gdyby*, *jeśli*)
- **Domains:** WORK, HOUSING
- **GR prerequisites:** GR-MOD-COND-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-HYPOTHESIS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-043
- **Level:** B1
- **Function:** Дать развёрнутый отзыв об услуге (устно/письменно)
- **Domains:** SHOP, MED, SCHOOL
- **GR prerequisites:** GR-DEG-ADJ-01, GR-ASP-CON-01
- **LEX bundles:** LEX-REVIEW
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-044
- **Level:** B1
- **Function:** Понять и выполнить многошаговую инструкцию
- **Domains:** WORK, MED, URZAD
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-INSTRUCTIONS-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-045
- **Level:** B1
- **Function:** Сообщить плохие новости вежливо (отказ, задержка, отказ в визе/документе — бытовой тон)
- **Domains:** FORMAL, WORK, URZAD
- **GR prerequisites:** PRAG-SOFTEN-01, PRAG-PAN-01
- **LEX bundles:** LEX-BADNEWS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B1-046
- **Level:** B1
- **Function:** Запросить feedback и отреагировать на критику
- **Domains:** WORK
- **GR prerequisites:** GR-PRO-REFL-01, GR-MOD-COND-01
- **LEX bundles:** LEX-FEEDBACK
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-047
- **Level:** B1
- **Function:** Обсудить здоровье ребёнка / absencje со школой без паники
- **Domains:** SCHOOL, MED
- **GR prerequisites:** PRAG-PAN-01, GR-ASP-CON-01
- **LEX bundles:** LEX-SCHOOL-MED
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-048
- **Level:** B1
- **Function:** Спланировать бюджет месяца (язык: rachunki, limity)
- **Domains:** BANK, HOUSING
- **GR prerequisites:** GR-NUM-CARD-01, GR-TNS-FUT-01
- **LEX bundles:** LEX-BUDGET
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-049
- **Level:** B1
- **Function:** Объяснить культурное/прагматическое различие L1 vs PL (мета)
- **Domains:** TV, SOCIAL
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-PRAG-META
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B1-050
- **Level:** B1
- **Function:** Подготовиться к устной части B1: описание + диалог + мнение
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, GR-ASP-PREF-01, GR-WF-NOM-01
- **LEX bundles:** LEX-EXAM-ORAL-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B1-051
- **Level:** B1
- **Function:** Подготовиться к письму B1: выбор жанра под polecenie
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-EXAM-WRITE-B1
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B1-052
- **Level:** B1
- **Function:** Распознать ловушки rekcja/aspect в grammar-модуле (тренировка)
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-REK-VERB-01, GR-ASP-CON-01
- **LEX bundles:** —
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B1-053
- **Level:** B1
- **Function:** Вести разговор о правах потребителя / гарантии на бытовом уровне
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-CONSUMER
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B1-054
- **Level:** B1
- **Function:** Согласовать совместный план (родители, коллеги, соседи)
- **Domains:** SCHOOL, WORK, NEIGHBOR
- **GR prerequisites:** GR-MOD-IMP-01, GR-TNS-FUT-01
- **LEX bundles:** LEX-PLANNING
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B1-055
- **Level:** B1
- **Function:** Резюмировать договорённость и подтвердить письменно
- **Domains:** WORK, HOUSING, SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-ASP-CON-01, GR-ASP-CTRL-01, GR-REK-VERB-02
- **LEX bundles:** LEX-SUMMARY
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-001
- **Level:** B2
- **Function:** Вести сложные переговоры об условиях работы / повышении
- **Domains:** WORK
- **GR prerequisites:** GR-MOD-COND-01, GR-SYN-SUB-01, GR-WO-NEUT-01, GR-PART-ACT-01
- **LEX bundles:** LEX-WORK-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-002
- **Level:** B2
- **Function:** Дать развёрнутую обратную связь коллеге / подчинённому
- **Domains:** WORK
- **GR prerequisites:** PRAG-SOFTEN-01, GR-ASP-CON-01, PRAG-PAN-01
- **LEX bundles:** LEX-FEEDBACK-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-003
- **Level:** B2
- **Function:** Защитить свою позицию на совещании с контраргументами
- **Domains:** WORK
- **GR prerequisites:** GR-WO-NEUT-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-DEBATE-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-004
- **Level:** B2
- **Function:** Написать analityczny e-mail / notatkę z rekomendacją
- **Domains:** WORK, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-PART-PASS-01
- **LEX bundles:** LEX-ANALYTIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-005
- **Level:** B2
- **Function:** Обсудить риски договора найма и предложить правки
- **Domains:** HOUSING, FORMAL
- **GR prerequisites:** GR-MOD-COND-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-CONTRACT-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B2-006
- **Level:** B2
- **Function:** Вести конфликт z wynajmującym до ugody / wypowiedzenia
- **Domains:** HOUSING, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-ASP-CON-01
- **LEX bundles:** LEX-HOUSING-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-04, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B2-007
- **Level:** B2
- **Function:** Понять сложное pismo urzędowe и составить odpowiedь
- **Domains:** URZAD, FORMAL
- **GR prerequisites:** GR-PASS-01
- **LEX bundles:** LEX-URZAD-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-008
- **Level:** B2
- **Function:** Обжаловать решение / złożyć odwołanie (язык структуры)
- **Domains:** URZAD, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-APPEAL
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-009
- **Level:** B2
- **Function:** Обсудить с врачом варианты лечения и побочные эффекты
- **Domains:** MED
- **GR prerequisites:** GR-MOD-COND-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-MED-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** exam-prep

### FN-B2-010
- **Level:** B2
- **Function:** Написать жалобу в placówka / NFZ-бытовой контур
- **Domains:** MED, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-PART-ADV-01
- **LEX bundles:** LEX-COMPLAINT-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-15, ERR-BEL-15
- **Exam relevance:** exam-prep

### FN-B2-011
- **Level:** B2
- **Function:** Участвовать в szkolne spotkanie z wieloma stronami
- **Domains:** SCHOOL
- **GR prerequisites:** PRAG-PAN-01, PRAG-MEDIATION-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-SCHOOL-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-012
- **Level:** B2
- **Function:** Сформулировать wniosek o dostosowanie / indywidualny tok (бытовой язык)
- **Domains:** SCHOOL, FORMAL
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-WRITE-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-013
- **Level:** B2
- **Function:** Вести спор с банком / страховой с опорой на документы
- **Domains:** BANK, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-NUM-CARD-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-BANK-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B2-014
- **Level:** B2
- **Function:** Сравнить оферты и обосновать выбор
- **Domains:** BANK, HOUSING, WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-MOD-COND-01
- **LEX bundles:** LEX-COMPARE-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B2-015
- **Level:** B2
- **Function:** Провести сложную reklamację (seria usterek, terminy ustawowe — бытовая точность)
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-ASP-CON-01, PRAG-PAN-01
- **LEX bundles:** LEX-CONSUMER-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B2-016
- **Level:** B2
- **Function:** Отказаться и зафиксировать отказ в переписке (dowód)
- **Domains:** COMPLAINT, FORMAL
- **GR prerequisites:** GR-NEG-01, PRAG-PAN-01
- **LEX bundles:** LEX-REFUSAL-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B2-017
- **Level:** B2
- **Function:** Решить транспортный спор (odszkodowanie za opóźnienie — язык претензии)
- **Domains:** TRANS, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-TRANS-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-12, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-018
- **Level:** B2
- **Function:** Модерировать конфликт соседей / предложить kompromis
- **Domains:** NEIGHBOR
- **GR prerequisites:** GR-MOD-COND-01
- **LEX bundles:** LEX-MEDIATION-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B2-019
- **Level:** B2
- **Function:** Выступить кратко на zebraniu z argumentacją
- **Domains:** NEIGHBOR, WORK
- **GR prerequisites:** GR-WO-NEUT-01, PRAG-PAN-01
- **LEX bundles:** LEX-PUBLIC-SPEAK
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-15, ERR-RUS-01, ERR-BEL-01
- **Exam relevance:** exam-prep

### FN-B2-020
- **Level:** B2
- **Function:** Вести трудный телефон: call center, эскалация, запись rozmowy (мета)
- **Domains:** PHONE, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, GR-IMPERS-SIE-01
- **LEX bundles:** LEX-PHONE-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20
- **Exam relevance:** exam-prep

### FN-B2-021
- **Level:** B2
- **Function:** Написать wielostronicowe pismo: chronologia, żądanie, załączniki
- **Domains:** FORMAL, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-LETTER-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-022
- **Level:** B2
- **Function:** Стилизовать один и тот же смысл под 3 регистра
- **Domains:** TV, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-WO-NEUT-01
- **LEX bundles:** LEX-REGISTER-FLEX
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B2-023
- **Level:** B2
- **Function:** Распознать и скорректировать неуместный ty/pan в команде
- **Domains:** TV, WORK
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-TV-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B2-024
- **Level:** B2
- **Function:** Использовать/избегать zdrobnienia и коллоквиализмы по ситуации
- **Domains:** TV, SOCIAL
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-COLLOQ-CONTROL
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B2-025
- **Level:** B2
- **Function:** Строить развёрнутую аргументацию с уступкой (*co prawda… jednak*)
- **Domains:** ALL
- **GR prerequisites:** GR-SYN-SUB-01, GR-WO-NEUT-01
- **LEX bundles:** LEX-ARGUMENT-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-026
- **Level:** B2
- **Function:** Гипотезы, контрфактивы, осторожные выводы
- **Domains:** WORK, URZAD, MED
- **GR prerequisites:** GR-MOD-COND-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-HYPOTHESIS-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-027
- **Level:** B2
- **Function:** Пересказать и оценить позицию автора текста
- **Domains:** READING→SPEAK
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-MEDIATION-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-028
- **Level:** B2
- **Function:** Объяснить абстрактное правило на конкретном примере
- **Domains:** WORK, URZAD, SCHOOL
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-EXPLAIN-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-029
- **Level:** B2
- **Function:** Вести small talk + переход к делу без прагматического сбоя
- **Domains:** WORK, SOCIAL
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-SMALLTALK-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-030
- **Level:** B2
- **Function:** Описать сложный процесс (jak załatwić sprawę end-to-end)
- **Domains:** URZAD, BANK, HOUSING
- **GR prerequisites:** GR-ASP-CON-01, GR-MOD-IMP-01, GR-IMPERS-NO-01
- **LEX bundles:** LEX-PROCESS
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-031
- **Level:** B2
- **Function:** Выразить нюанс мнения (pewność, wątpliwość, dystans)
- **Domains:** ALL
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-STANCE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-032
- **Level:** B2
- **Function:** Исправить себя и собеседника тактично
- **Domains:** SOCIAL, WORK
- **GR prerequisites:** PRAG-SOFTEN-01
- **LEX bundles:** LEX-REPAIR-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-033
- **Level:** B2
- **Function:** Синтезировать несколько источников (e-mail + umowa + rozmowa)
- **Domains:** FORMAL, WORK
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-SYNTHESIS
- **Required evidence:** portfolio_sample
- **Criticality:** Extension
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-034
- **Level:** B2
- **Function:** Подготовка к B2 mówienie: развёрнутое высказывание + реакция
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-EXAM-ORAL-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-035
- **Level:** B2
- **Function:** Подготовка к B2 pisanie: выбор регистра и структуры
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-EXAM-WRITE-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-036
- **Level:** B2
- **Function:** Тренировка poprawność gramatyczna B2 (трансформации, rekcja, aspekt)
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** —
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-037
- **Level:** B2
- **Function:** Критическое чтение regulamin / oferty (ukryte koszty)
- **Domains:** BANK, HOUSING, SHOP
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-CRITICAL-READ
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B2-038
- **Level:** B2
- **Function:** Публичное извинение / объяснение инцидента
- **Domains:** WORK, SCHOOL, NEIGHBOR
- **GR prerequisites:** PRAG-PAN-01, GR-ASP-CON-01
- **LEX bundles:** LEX-APOLOGY-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-039
- **Level:** B2
- **Function:** Согласовать ugoda и зафиксировать условия
- **Domains:** COMPLAINT, HOUSING, WORK
- **GR prerequisites:** GR-MOD-COND-01, PRAG-PAN-01
- **LEX bundles:** LEX-SETTLEMENT
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B2-040
- **Level:** B2
- **Function:** Обсудить этику/границы (dane osobowe, zgody — бытовой уровень)
- **Domains:** URZAD, SCHOOL, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-PASS-SIE-01
- **LEX bundles:** LEX-PRIVACY-BASIC
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-16, ERR-RUS-16, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-041
- **Level:** B2
- **Function:** Перевод смысла институционального текста «на человеческий» для семьи
- **Domains:** MEDIATION
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-MEDIATION-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-042
- **Level:** B2
- **Function:** Вести дискуссию о школе/работе/жилье с примерами и обобщением
- **Domains:** SCHOOL, WORK, HOUSING
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-DISCUSSION
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-04, ERR-RUS-12, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-043
- **Level:** B2
- **Function:** Использовать пассив/безличные формы в официальном стиле
- **Domains:** FORMAL
- **GR prerequisites:** GR-PASS-01
- **LEX bundles:** LEX-FORMAL-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-044
- **Level:** B2
- **Function:** Контролировать информационную структуру (тема–рема) в длинном монологе
- **Domains:** ALL
- **GR prerequisites:** GR-WO-NEUT-01
- **LEX bundles:** —
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep

### FN-B2-045
- **Level:** B2
- **Function:** Распознать манипулятивные формулы call center / sprzedaży и отказать
- **Domains:** PHONE, SHOP, BANK
- **GR prerequisites:** GR-TNS-PRS-01
- **LEX bundles:** LEX-MANIP-RESIST
- **Required evidence:** portfolio_sample
- **Criticality:** Extension
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-20, ERR-RUS-20, ERR-BEL-20
- **Exam relevance:** exam-prep

### FN-B2-046
- **Level:** B2
- **Function:** Подготовить i wygłosić krótką prezentację (3–5 мин)
- **Domains:** WORK, SCHOOL
- **GR prerequisites:** GR-WO-NEUT-01
- **LEX bundles:** LEX-PRESENTATION
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-02, ERR-RUS-09, ERR-BEL-12
- **Exam relevance:** exam-prep

### FN-B2-047
- **Level:** B2
- **Function:** Написать recenzję / opinię z uzasadnieniem
- **Domains:** SHOP, SCHOOL, WORK
- **GR prerequisites:** GR-SYN-SUB-01
- **LEX bundles:** LEX-REVIEW-B2
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-09, ERR-RUS-09, ERR-BEL-09
- **Exam relevance:** exam-prep

### FN-B2-048
- **Level:** B2
- **Function:** Сравнить две версии события и указать расхождения
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-ASP-CON-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-EVIDENCE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-23, ERR-RUS-23, ERR-BEL-24
- **Exam relevance:** exam-prep

### FN-B2-049
- **Level:** B2
- **Function:** Поддерживать вежливую твердость в длинной переписке
- **Domains:** FORMAL, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01
- **LEX bundles:** LEX-PERSISTENCE
- **Required evidence:** task_performance + closed_item
- **Criticality:** Core
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-07, ERR-RUS-01, ERR-BEL-23
- **Exam relevance:** exam-prep

### FN-B2-050
- **Level:** B2
- **Function:** Самооценка пробелов перед экзаменом B2 (метаучебная)
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, GR-B2-STYLE-01
- **LEX bundles:** —
- **Required evidence:** task_performance + closed_item
- **Criticality:** Important
- **Completion criterion:** Наблюдаемое выполнение функции в целевом домене без блокирующей ошибки регистра/управления/понимания; см. mastery model.
- **L1 risks:** ERR-UKR-01, ERR-RUS-02, ERR-BEL-03
- **Exam relevance:** exam-prep
