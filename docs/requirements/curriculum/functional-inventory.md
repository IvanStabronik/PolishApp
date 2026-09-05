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
- **GR prerequisites:** GR-CAS-NOM-01, GR-TNS-PRS-01, GR-PRO-POSS-01
- **LEX bundles:** LEX-IDENTITY
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Представиться: имя, страна, город, L1» in domain EVERYDAY with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-001]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-002
- **Level:** A1
- **Function:** Спросить / назвать профессию и место работы
- **Domains:** WORK
- **GR prerequisites:** GR-CAS-NOM-01, GR-CAS-LOC-01, GR-TNS-PRS-01, GR-PREP-Z-01
- **LEX bundles:** LEX-WORK-BASIC
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Спросить / назвать профессию и место работы» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-002]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-003
- **Level:** A1
- **Function:** Сказать, где живёт / снимает жильё (простая формула)
- **Domains:** HOUSING
- **GR prerequisites:** GR-CAS-LOC-01, GR-TNS-PRS-01, GR-REK-VERB-01
- **LEX bundles:** LEX-HOUSING-BASIC
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Сказать, где живёт / снимает жильё (простая формула)» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-003]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-004
- **Level:** A1
- **Function:** Назвать адрес, этаж, номер квартиры
- **Domains:** HOUSING, URZAD
- **GR prerequisites:** GR-CAS-NOM-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-ADDRESS
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Назвать адрес, этаж, номер квартиры» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-004]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-005
- **Level:** A1
- **Function:** Поздороваться / попрощаться в официальном и бытовом регистре
- **Domains:** TV, SOCIAL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-VOC-01
- **LEX bundles:** LEX-GREETINGS
- **Required evidence:** roleplay_tv
- **Criticality:** Core
- **Completion criterion:** Learner can «Поздороваться / попрощаться в официальном и бытовом регистре» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-A1-005]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-006
- **Level:** A1
- **Function:** Обратиться pan/pani + 3 л. в магазине / на ресепшене
- **Domains:** TV, SHOP
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-TV-AGR-01
- **LEX bundles:** LEX-SERVICE
- **Required evidence:** roleplay_tv
- **Criticality:** Core
- **Completion criterion:** Learner can «Обратиться pan/pani + 3 л. в магазине / на ресепшене» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-A1-006]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-007
- **Level:** A1
- **Function:** Попросить повторить / говорить медленнее
- **Domains:** PHONE, EVERYDAY
- **GR prerequisites:** PRAG-REPAIR-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-REPAIR
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Попросить повторить / говорить медленнее» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-007]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Proszę powtórzyć; Proszę mówić wolniej; Nie rozumiem
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-008
- **Level:** A1
- **Function:** Сказать, что не понимает; попросить перевод ключевого слова
- **Domains:** EVERYDAY, URZAD
- **GR prerequisites:** GR-NEG-01, PRAG-REPAIR-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-REPAIR
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Сказать, что не понимает; попросить перевод ключевого слова» in domain EVERYDAY with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-008]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-009
- **Level:** A1
- **Function:** Назвать цену, количество, сдачу (простые числа)
- **Domains:** SHOP, BANK
- **GR prerequisites:** GR-NUM-CARD-01, GR-NUM-MONEY-01, GR-CAS-GEN-01
- **LEX bundles:** LEX-MONEY
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Назвать цену, количество, сдачу (простые числа)» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-009]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-010
- **Level:** A1
- **Function:** Купить товар / заказать услугу по образцу
- **Domains:** SHOP
- **GR prerequisites:** GR-CAS-ACC-01, GR-NUM-CARD-01, PRAG-PAN-01
- **LEX bundles:** LEX-SHOP
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Купить товар / заказать услугу по образцу» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-010]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A1-011
- **Level:** A1
- **Function:** Заказать еду / напиток
- **Domains:** SHOP
- **GR prerequisites:** GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-FOOD
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Заказать еду / напиток» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-011]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-012
- **Level:** A1
- **Function:** Спросить / объяснить дорогу (базовые ориентиры)
- **Domains:** TRANS
- **GR prerequisites:** GR-CAS-ACC-01, GR-CAS-LOC-01, GR-Q-WH-01
- **LEX bundles:** LEX-TRANS-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Спросить / объяснить дорогу (базовые ориентиры)» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-012]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Proszę, gdzie jest…?; Proszę tutaj; Jak dojść do…?
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-013
- **Level:** A1
- **Function:** Купить билет / спросить о времени отправления
- **Domains:** TRANS
- **GR prerequisites:** GR-NUM-CARD-01, GR-TIME-EXPR-01, PRAG-PAN-01
- **LEX bundles:** LEX-TRANS-BASIC
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Купить билет / спросить о времени отправления» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-013]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A1-014
- **Level:** A1
- **Function:** Записаться на визит (простая фраза: день, час)
- **Domains:** MED, URZAD, SCHOOL
- **GR prerequisites:** GR-TIME-EXPR-01, PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-APPOINTMENT
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Записаться на визит (простая фраза: день, час)» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-014]
- **L1 risks:** ERR-UKR-06, ERR-RUS-06
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-015
- **Level:** A1
- **Function:** Назвать симптомы на уровне списка слов + «boli mnie…»
- **Domains:** MED
- **GR prerequisites:** GR-CAS-ACC-01, GR-TNS-PRS-01, GR-PRO-PERS-01
- **LEX bundles:** LEX-BODY
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Назвать симптомы на уровне списка слов + «boli mnie…»» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-015]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-016
- **Level:** A1
- **Function:** Получить / отдать документы на окошке (мини-скрипт)
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-DOCS
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Получить / отдать документы на окошке (мини-скрипт)» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-016]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Proszę bardzo; Poproszę formularz; Oto dokumenty
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-017
- **Level:** A1
- **Function:** Представиться в urzędzie и назвать цель визита одной фразой
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-NOM-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-URZAD-BASIC
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Представиться в urzędzie и назвать цель визита одной фразой» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-017]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-018
- **Level:** A1
- **Function:** Попросить форму / указать недостающий документ
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-Q-WH-01
- **LEX bundles:** LEX-DOCS
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Попросить форму / указать недостающий документ» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-018]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-019
- **Level:** A1
- **Function:** Написать короткое SMS: опоздание, подтверждение
- **Domains:** WORK, SCHOOL, PHONE
- **GR prerequisites:** GR-TNS-PRS-01, GR-NEG-01, ORTH-CORE-01
- **LEX bundles:** LEX-SMS
- **Required evidence:** writing_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Написать короткое SMS: опоздание, подтверждение» in domain WORK with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-A1-019]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-020
- **Level:** A1
- **Function:** Позвонить и сказать, кто звонит + зачем (скрипт)
- **Domains:** PHONE
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-Q-WH-01
- **LEX bundles:** LEX-PHONE
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Позвонить и сказать, кто звонит + зачем (скрипт)» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-020]
- **L1 risks:** ERR-UKR-07, ERR-RUS-07
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-021
- **Level:** A1
- **Function:** Оставить голосовое / передать просьбу перезвонить
- **Domains:** PHONE
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PHONE
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Оставить голосовое / передать просьбу перезвонить» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-021]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Proszę oddzwonić; Proszę przekazać, że dzwoniłem/am
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-022
- **Level:** A1
- **Function:** Попросить о помощи у коллеги / соседа (простая prośba)
- **Domains:** WORK, NEIGHBOR
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-MOD-VERB-01
- **LEX bundles:** LEX-REQUEST
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Попросить о помощи у коллеги / соседа (простая prośba)» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-022]
- **L1 risks:** ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A1-023
- **Level:** A1
- **Function:** Отказать коротко и вежливо (nie mogę / niestety)
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-NEG-01, PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-REFUSAL
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Отказать коротко и вежливо (nie mogę / niestety)» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-023]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-024
- **Level:** A1
- **Function:** Поблагодарить и ответить на благодарность
- **Domains:** SOCIAL, TV
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-POLITENESS
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Поблагодарить и ответить на благодарность» in domain SOCIAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-024]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Dziękuję; Dziękuję bardzo; Proszę bardzo
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-025
- **Level:** A1
- **Function:** Извиниться за опоздание / помеху
- **Domains:** WORK, SCHOOL, NEIGHBOR
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-POLITENESS
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Извиниться за опоздание / помеху» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-025]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-026
- **Level:** A1
- **Function:** Спросить о наличии товара / свободного слота
- **Domains:** SHOP, MED
- **GR prerequisites:** GR-Q-YESNO-01, GR-CAS-NOM-01, PRAG-PAN-01
- **LEX bundles:** LEX-AVAILABILITY
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Спросить о наличии товара / свободного слота» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-026]
- **L1 risks:** ERR-UKR-23, ERR-RUS-21
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-027
- **Level:** A1
- **Function:** Сообщить о простой usterce в квартире (cieknie, nie działa)
- **Domains:** HOUSING
- **GR prerequisites:** GR-NEG-01, GR-TNS-PRS-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-HOUSING-FIX
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сообщить о простой usterce в квартире (cieknie, nie działa)» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-027]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-028
- **Level:** A1
- **Function:** Представиться воспитателю / сказать имя ребёнка
- **Domains:** SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-NOM-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-SCHOOL-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Представиться воспитателю / сказать имя ребёнка» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-028]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-029
- **Level:** A1
- **Function:** Сообщить об отсутствии ребёнка (болезнь / поездка)
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, GR-NEG-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сообщить об отсутствии ребёнка (болезнь / поездка)» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-029]
- **L1 risks:** ERR-UKR-23, ERR-RUS-21
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-030
- **Level:** A1
- **Function:** Открыть счёт / спросить о карте (скриптовые реплики)
- **Domains:** BANK
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-Q-WH-01
- **LEX bundles:** LEX-BANK-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Открыть счёт / спросить о карте (скриптовые реплики)» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-030]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-031
- **Level:** A1
- **Function:** Сделать простой przelew по образцу (термины)
- **Domains:** BANK
- **GR prerequisites:** GR-NUM-CARD-01, GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-BANK-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сделать простой przelew по образцу (термины)» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-031]
- **L1 risks:** ERR-UKR-22, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A1-032
- **Level:** A1
- **Function:** Описать типичный день (работа–дом–магазин)
- **Domains:** WORK, EVERYDAY
- **GR prerequisites:** GR-TNS-PRS-01, GR-TIME-EXPR-01, GR-SYN-COORD-01
- **LEX bundles:** LEX-ROUTINE
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Описать типичный день (работа–дом–магазин)» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-032]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-033
- **Level:** A1
- **Function:** Назвать дни, месяцы, часы встречи
- **Domains:** EVERYDAY
- **GR prerequisites:** GR-TIME-EXPR-01, GR-NUM-ORD-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-TIME
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Назвать дни, месяцы, часы встречи» in domain EVERYDAY with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-033]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-034
- **Level:** A1
- **Function:** Заполнить анкету: личные данные, адрес, телефон
- **Domains:** URZAD, WORK
- **GR prerequisites:** GR-CAS-NOM-01, ORTH-CORE-01, GR-NUM-CARD-01
- **LEX bundles:** LEX-FORMS
- **Required evidence:** closed_item
- **Criticality:** Core
- **Completion criterion:** Learner can «Заполнить анкету: личные данные, адрес, телефон» in domain URZAD with correct closed-item responses on target forms, without blocking register/rekcja failure. [FN-A1-034]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-035
- **Level:** A1
- **Function:** Написать 3–5 предложений о себе (учебный жанр)
- **Domains:** EVERYDAY
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-NOM-01, ORTH-CORE-01
- **LEX bundles:** LEX-IDENTITY
- **Required evidence:** writing_rubric
- **Criticality:** Extension
- **Completion criterion:** Learner can «Написать 3–5 предложений о себе (учебный жанр)» in domain EVERYDAY with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-A1-035]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-036
- **Level:** A1
- **Function:** Попросить счёт / уточнить способ оплаты
- **Domains:** SHOP
- **GR prerequisites:** GR-CAS-ACC-01, PRAG-PAN-01, GR-Q-WH-01
- **LEX bundles:** LEX-MONEY
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Попросить счёт / уточнить способ оплаты» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-036]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-037
- **Level:** A1
- **Function:** Согласиться / подтвердить договорённость
- **Domains:** WORK, PHONE
- **GR prerequisites:** GR-TNS-PRS-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-AGREEMENT
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Согласиться / подтвердить договорённость» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-037]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A1-038
- **Level:** A1
- **Function:** Уточнить значение вывески / короткого объявления
- **Domains:** HOUSING, SHOP, URZAD
- **GR prerequisites:** GR-PRO-DEM-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-SIGNS
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Уточнить значение вывески / короткого объявления» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-038]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A1-039
- **Level:** A1
- **Function:** Поздороваться с соседом и обменяться 1–2 фразами
- **Domains:** NEIGHBOR, TV
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-NEIGHBOR
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Поздороваться с соседом и обменяться 1–2 фразами» in domain NEIGHBOR with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-039]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-040
- **Level:** A1
- **Function:** Сообщить о боли / срочности и попросить помочь вызвать помощь (скрипт)
- **Domains:** MED
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, PRAG-REPAIR-01
- **LEX bundles:** LEX-EMERGENCY-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сообщить о боли / срочности и попросить помочь вызвать помощь (скрипт)» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A1-040]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Proszę o pomoc; Boli mnie…; Proszę wezwać pomoc
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A1-041
- **Level:** A1
- **Function:** Различать официальное vs неофициальное обращение в готовых репликах
- **Domains:** TV
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-GREETINGS
- **Required evidence:** roleplay_tv
- **Criticality:** Core
- **Completion criterion:** Learner can «Различать официальное vs неофициальное обращение в готовых репликах» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-A1-041]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A1-042
- **Level:** A1
- **Function:** Прочитать и выполнить короткую инструкцию (biletomat, аптека)
- **Domains:** TRANS, MED, SHOP
- **GR prerequisites:** GR-PRO-DEM-01, GR-CAS-ACC-01
- **LEX bundles:** LEX-INSTRUCTIONS
- **Required evidence:** reading_task
- **Criticality:** Extension
- **Completion criterion:** Learner can «Прочитать и выполнить короткую инструкцию (biletomat, аптека)» in domain TRANS with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-A1-042]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Formulaic exposure:** Włóż kartę; Wybierz język; Zapłać; Odbierz bilet (receptive labels)
- **Notes:** receptive_only for instructional labels; no productive IMP required
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-001
- **Level:** A2
- **Function:** Рассказать о работе: обязанности, график, коллеги
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-WORK-A2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Рассказать о работе: обязанности, график, коллеги» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-001]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-002
- **Level:** A2
- **Function:** Попросить выходной / смену; объяснить причину
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-WORK-LEAVE
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Попросить выходной / смену; объяснить причину» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-002]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-003
- **Level:** A2
- **Function:** Понять и пересказать инструкцию по BHP / графику
- **Domains:** WORK
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-WORK-RULES
- **Required evidence:** reading_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Понять и пересказать инструкцию по BHP / графику» in domain WORK with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-A2-003]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-004
- **Level:** A2
- **Function:** Вести переговоры об аренде: czynsz, kaucja, termin
- **Domains:** HOUSING
- **GR prerequisites:** GR-CAS-LOC-01, GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-HOUSING-A2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести переговоры об аренде: czynsz, kaucja, termin» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-004]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-005
- **Level:** A2
- **Function:** Сообщить о usterce и договориться о wizycie serwisu
- **Domains:** HOUSING
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-HOUSING-FIX
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Сообщить о usterce и договориться о wizycie serwisu» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-005]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-006
- **Level:** A2
- **Function:** Понять ключевые пункты ogłoszenia / umowy najmu
- **Domains:** HOUSING
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-CONTRACT-BASIC
- **Required evidence:** reading_task
- **Criticality:** Core
- **Completion criterion:** Learner can «Понять ключевые пункты ogłoszenia / umowy najmu» in domain HOUSING with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-A2-006]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-007
- **Level:** A2
- **Function:** Записаться в urzędzie и уточнить список документов
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-Q-WH-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-URZAD-A2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Записаться в urzędzie и уточнить список документов» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-007]
- **L1 risks:** ERR-UKR-06, ERR-RUS-06
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-008
- **Level:** A2
- **Function:** Объяснить цель визита связным мини-монологом
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-URZAD-A2
- **Required evidence:** speaking_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Объяснить цель визита связным мини-монологом» in domain URZAD with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-A2-008]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-009
- **Level:** A2
- **Function:** Заполнить расширенную анкету (статус, дети, работа)
- **Domains:** URZAD, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, ORTH-CORE-01
- **LEX bundles:** LEX-FORMS-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Заполнить расширенную анкету (статус, дети, работа)» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-009]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-010
- **Level:** A2
- **Function:** Описать симптомы связно; ответить на вопросы врача
- **Domains:** MED
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01, GR-Q-WH-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-MED-A2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Описать симптомы связно; ответить на вопросы врача» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-010]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-011
- **Level:** A2
- **Function:** Понять дозировку / режим приёма лекарства
- **Domains:** MED
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01, GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-PHARMA
- **Required evidence:** reading_task
- **Criticality:** Core
- **Completion criterion:** Learner can «Понять дозировку / режим приёма лекарства» in domain MED with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-A2-011]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-012
- **Level:** A2
- **Function:** Написать usprawiedliwienie / e-mail do szkoły
- **Domains:** SCHOOL, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-A2
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать usprawiedliwienie / e-mail do szkoły» in domain SCHOOL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-A2-012]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-013
- **Level:** A2
- **Function:** Обсудить z wychowawcą поведение / успеваемость (просто)
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Обсудить z wychowawcą поведение / успеваемость (просто)» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-013]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-014
- **Level:** A2
- **Function:** Открыть тему przedszkole: аллергии, контакты, odbiór
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-KINDER
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Открыть тему przedszkole: аллергии, контакты, odbiór» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-014]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-015
- **Level:** A2
- **Function:** Спросить в банке о opłatach, limicie, przelewie zagranicznym (базово)
- **Domains:** BANK
- **GR prerequisites:** GR-Q-WH-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-BANK-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Спросить в банке о opłatach, limicie, przelewie zagranicznym (базово)» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-015]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-016
- **Level:** A2
- **Function:** Пожаловаться на ошибочное списание (скрипт + детали)
- **Domains:** BANK, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-BANK-A2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Пожаловаться на ошибочное списание (скрипт + детали)» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-016]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-017
- **Level:** A2
- **Function:** Сделать reklamację товара / услуги
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-CAS-ACC-01, GR-NUM-CARD-01, PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-COMPLAINT
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Сделать reklamację товара / услуги» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-017]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-018
- **Level:** A2
- **Function:** Попросить wymienić / zwrócić / naprawić
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-COMPLAINT
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Попросить wymienić / zwrócić / naprawić» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-018]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-019
- **Level:** A2
- **Function:** Запланировать маршрут с пересадками; спросить об опоздании
- **Domains:** TRANS
- **GR prerequisites:** GR-Q-WH-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-TRANS-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Запланировать маршрут с пересадками; спросить об опоздании» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-019]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-020
- **Level:** A2
- **Function:** Сообщить о проблеме z biletem / kontrolą
- **Domains:** TRANS, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-TRANS-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сообщить о проблеме z biletem / kontrolą» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-020]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-021
- **Level:** A2
- **Function:** Попросить соседа о тишине / помощи с посылкой
- **Domains:** NEIGHBOR
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-NEIGHBOR-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Попросить соседа о тишине / помощи с посылкой» in domain NEIGHBOR with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-021]
- **L1 risks:** ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-022
- **Level:** A2
- **Function:** Предложить помощь соседу; принять/отклонить
- **Domains:** NEIGHBOR
- **GR prerequisites:** GR-CAS-ACC-01, GR-NUM-CARD-01, PRAG-PAN-01
- **LEX bundles:** LEX-NEIGHBOR-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Предложить помощь соседу; принять/отклонить» in domain NEIGHBOR with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-022]
- **L1 risks:** ERR-BEL-24
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-023
- **Level:** A2
- **Function:** Вести телефонный разговор без полного скрипта
- **Domains:** PHONE
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PHONE-A2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести телефонный разговор без полного скрипта» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-023]
- **L1 risks:** ERR-UKR-07, ERR-RUS-07
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-024
- **Level:** A2
- **Function:** Переспросить и перефразировать услышанное
- **Domains:** PHONE, URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, PRAG-REPAIR-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-REPAIR-A2
- **Required evidence:** listening_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Переспросить и перефразировать услышанное» in domain PHONE with correct gist from a slow clear audio prompt, without blocking register/rekcja failure. [FN-A2-024]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-025
- **Level:** A2
- **Function:** Сформулировать prośbę с обоснованием
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-REQUEST-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сформулировать prośbę с обоснованием» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-025]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-026
- **Level:** A2
- **Function:** Отказать с причиной и альтернативой
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-REFUSAL-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Отказать с причиной и альтернативой» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-026]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-027
- **Level:** A2
- **Function:** Пожаловаться вежливо, без агрессии
- **Domains:** COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-COMPLAINT
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Пожаловаться вежливо, без агрессии» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-027]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-028
- **Level:** A2
- **Function:** Принять извинения / дать извинения развёрнуто
- **Domains:** SOCIAL, WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-POLITENESS-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Принять извинения / дать извинения развёрнуто» in domain SOCIAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-028]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-029
- **Level:** A2
- **Function:** Перейти с pan/pani на ty по инициативе поляка (распознать сигнал)
- **Domains:** TV
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-TV-SHIFT
- **Required evidence:** roleplay_tv
- **Criticality:** Core
- **Completion criterion:** Learner can «Перейти с pan/pani на ty по инициативе поляка (распознать сигнал)» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-A2-029]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-030
- **Level:** A2
- **Function:** Отказать в переходе на ty / сохранить дистанцию
- **Domains:** TV, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-TV-SHIFT
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Отказать в переходе на ty / сохранить дистанцию» in domain TV with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-030]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-031
- **Level:** A2
- **Function:** Написать официальный e-mail: prośba o dokumenty / spotkanie
- **Domains:** FORMAL, WORK, SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-EMAIL-A2
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать официальный e-mail: prośba o dokumenty / spotkanie» in domain FORMAL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-A2-031]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-032
- **Level:** A2
- **Function:** Написать неофициальное сообщение коллеге на ty
- **Domains:** WORK, TV
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01, GR-TNS-PRS-01, ORTH-CORE-01
- **LEX bundles:** LEX-CHAT-A2
- **Required evidence:** writing_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Написать неофициальное сообщение коллеге на ty» in domain WORK with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-A2-032]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-033
- **Level:** A2
- **Function:** Описать прошлое событие (переезд, первый день работы)
- **Domains:** HOUSING, WORK
- **GR prerequisites:** GR-CAS-LOC-01, GR-TNS-PRS-01, PRAG-PAN-01, GR-TNS-PST-01, GR-ASP-LEX-01
- **LEX bundles:** LEX-NARRATIVE-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Описать прошлое событие (переезд, первый день работы)» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-033]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-034
- **Level:** A2
- **Function:** Сравнить два варианта жилья / смены / школы
- **Domains:** HOUSING, WORK, SCHOOL
- **GR prerequisites:** GR-CAS-LOC-01, GR-TNS-PRS-01, PRAG-PAN-01, GR-DEG-ADJ-01
- **LEX bundles:** LEX-COMPARE
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Сравнить два варианта жилья / смены / школы» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-034]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-035
- **Level:** A2
- **Function:** Выразить предпочтение и простое мнение
- **Domains:** EVERYDAY, WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-OPINION-A2
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Выразить предпочтение и простое мнение» in domain EVERYDAY with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-035]
- **L1 risks:** —
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-036
- **Level:** A2
- **Function:** Понять объявление wspólnoty / regulamin domu
- **Domains:** NEIGHBOR, HOUSING
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-RULES
- **Required evidence:** reading_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Понять объявление wspólnoty / regulamin domu» in domain NEIGHBOR with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-A2-036]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-037
- **Level:** A2
- **Function:** Записаться на szczepienie / badanie; перенести wizytę
- **Domains:** MED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-MED-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Записаться на szczepienie / badanie; перенести wizytę» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-037]
- **L1 risks:** ERR-UKR-06, ERR-RUS-06
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-038
- **Level:** A2
- **Function:** Объяснить аллергии / хронические ограничения
- **Domains:** MED, SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-HEALTH-LIMIT
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Объяснить аллергии / хронические ограничения» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-038]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-039
- **Level:** A2
- **Function:** Участвовать в short small talk на работе
- **Domains:** WORK, SOCIAL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-SMALLTALK
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Участвовать в short small talk на работе» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-039]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-040
- **Level:** A2
- **Function:** Сообщить о L4 / wizycie u lekarza работодателю
- **Domains:** WORK, MED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-WORK-LEAVE
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Сообщить о L4 / wizycie u lekarza работодателю» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-040]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-041
- **Level:** A2
- **Function:** Попросить разъяснить счёт / rachunek za media
- **Domains:** HOUSING, BANK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-BILLS
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Попросить разъяснить счёт / rachunek za media» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-041]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** CEFR Companion Volume — overall oral interaction A2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-A2-042
- **Level:** A2
- **Function:** Описать человека (коллега, врач, wychowawca)
- **Domains:** WORK, SCHOOL, MED
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-DESCRIPTION
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Описать человека (коллега, врач, wychowawca)» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-042]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-043
- **Level:** A2
- **Function:** Дать простой совет (proszę + infinitive / niech…)
- **Domains:** SOCIAL, MED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-ADVICE-A2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Дать простой совет (proszę + infinitive / niech…)» in domain SOCIAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-043]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-A2-044
- **Level:** A2
- **Function:** Понять короткий news/SMS от школы/банка
- **Domains:** SCHOOL, BANK
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01, GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-NOTIFY
- **Required evidence:** writing_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Понять короткий news/SMS от школы/банка» in domain SCHOOL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-A2-044]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-045
- **Level:** A2
- **Function:** Согласовать встречу с несколькими слотами
- **Domains:** WORK, SCHOOL, MED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-SCHEDULING
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Согласовать встречу с несколькими слотами» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-045]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-046
- **Level:** A2
- **Function:** Выразить срочность / приоритет просьбы
- **Domains:** COMPLAINT, URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-URGENCY
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Выразить срочность / приоритет просьбы» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-046]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-047
- **Level:** A2
- **Function:** Использовать męskoosobowe формы в рассказе о коллегах/родителях
- **Domains:** WORK, SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-PEOPLE
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Использовать męskoosobowe формы в рассказе о коллегах/родителях» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-A2-047]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-A2-048
- **Level:** A2
- **Function:** Прочитать и кратко пересказать ulotkę / instrukcję
- **Domains:** MED, SHOP, URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-INSTRUCTIONS-A2
- **Required evidence:** reading_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Прочитать и кратко пересказать ulotkę / instrukcję» in domain MED with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-A2-048]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** standards-aligned / future (session_availability=not_announced 2026)
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-001
- **Level:** B1
- **Function:** Провести рабочий разговор о задаче, сроке, ответственности
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-WORK-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Провести рабочий разговор о задаче, сроке, ответственности» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-001]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-002
- **Level:** B1
- **Function:** Участвовать в совещании: согласие, сомнение, уточнение
- **Domains:** WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01, GR-Q-WH-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-MEETING
- **Required evidence:** speaking_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Участвовать в совещании: согласие, сомнение, уточнение» in domain WORK with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B1-002]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-003
- **Level:** B1
- **Function:** Объяснить квалификацию и опыт на собеседовании
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-CV-ORAL
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Объяснить квалификацию и опыт на собеседовании» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-003]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-004
- **Level:** B1
- **Function:** Написать служебный e-mail: status, blocker, prośba
- **Domains:** WORK, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-EMAIL-B1
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать служебный e-mail: status, blocker, prośba» in domain WORK with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-004]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-005
- **Level:** B1
- **Function:** Сообщить о конфликте смены / недопонимании инструкции
- **Domains:** WORK, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-WORK-CONFLICT
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сообщить о конфликте смены / недопонимании инструкции» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-005]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-006
- **Level:** B1
- **Function:** Вести переговоры об условиях аренды и ремонте
- **Domains:** HOUSING
- **GR prerequisites:** GR-CAS-LOC-01, GR-TNS-PRS-01, PRAG-PAN-01, GR-SYN-COND-01, GR-MOD-COND-01
- **LEX bundles:** LEX-HOUSING-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести переговоры об условиях аренды и ремонте» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-006]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-007
- **Level:** B1
- **Function:** Понять и оспорить пункт umowy (своими словами)
- **Domains:** HOUSING, FORMAL
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-CONTRACT-B1
- **Required evidence:** reading_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Понять и оспорить пункт umowy (своими словами)» in domain HOUSING with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-B1-007]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-008
- **Level:** B1
- **Function:** Написать pismo / e-mail do wspólnoty / właściciela
- **Domains:** HOUSING, FORMAL
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01, GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-FORMAL-B1
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать pismo / e-mail do wspólnoty / właściciela» in domain HOUSING with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-008]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-009
- **Level:** B1
- **Function:** Пройти сложный визит в urzędzie: объяснить historię sprawy
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-URZAD-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Пройти сложный визит в urzędzie: объяснить historię sprawy» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-009]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-010
- **Level:** B1
- **Function:** Запросить / предоставить дополнительные документы с обоснованием
- **Domains:** URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-DOCS-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Запросить / предоставить дополнительные документы с обоснованием» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-010]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-011
- **Level:** B1
- **Function:** Понять решение / wezwanie / pismo urzędowe (главное)
- **Domains:** URZAD
- **GR prerequisites:** GR-SYN-SUB-01, GR-PRO-DEM-01
- **LEX bundles:** LEX-URZAD-READ
- **Required evidence:** reading_task
- **Criticality:** Core
- **Completion criterion:** Learner can «Понять решение / wezwanie / pismo urzędowe (главное)» in domain URZAD with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-B1-011]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Formulaic exposure:** Decyzja została wydana; Wzywa się Pana/Panią; Należy złożyć dokumenty
- **Notes:** receptive_only — urzędowe passive/impersonal formulas understood receptively; productive GR-PASS-01 not required at B1
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-012
- **Level:** B1
- **Function:** Описать историю болезни и лекарства связно
- **Domains:** MED
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01, GR-TNS-PST-01, GR-ASP-LEX-01
- **LEX bundles:** LEX-MED-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Описать историю болезни и лекарства связно» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-012]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-013
- **Level:** B1
- **Function:** Задать врачу уточняющие вопросы о рисках / сроках
- **Domains:** MED
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01, GR-Q-WH-01, GR-Q-YESNO-01
- **LEX bundles:** LEX-MED-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Задать врачу уточняющие вопросы о рисках / сроках» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-013]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-014
- **Level:** B1
- **Function:** Обжаловать запись / отказ wizyty (вежливо, аргументированно)
- **Domains:** MED, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01, GR-DEG-ADJ-01, GR-SYN-COMP-01
- **LEX bundles:** LEX-COMPLAINT-B1
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Обжаловать запись / отказ wizyty (вежливо, аргументированно)» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-014]
- **L1 risks:** ERR-UKR-06, ERR-RUS-06
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-015
- **Level:** B1
- **Function:** Обсудить z nauczycielami plan wsparcia ребёнка
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Обсудить z nauczycielami plan wsparcia ребёнка» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-015]
- **L1 risks:** ERR-UKR-02, ERR-BEL-10
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-016
- **Level:** B1
- **Function:** Написать uzasadnienie / wniosek szkolny
- **Domains:** SCHOOL, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-WRITE
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать uzasadnienie / wniosek szkolny» in domain SCHOOL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-016]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-017
- **Level:** B1
- **Function:** Понять komunikat szkoły о wycieczce / zagrożeniu
- **Domains:** SCHOOL
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-SCHOOL-READ
- **Required evidence:** listening_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Понять komunikat szkoły о wycieczce / zagrożeniu» in domain SCHOOL with correct gist from a slow clear audio prompt, without blocking register/rekcja failure. [FN-B1-017]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-018
- **Level:** B1
- **Function:** Решить спорную ситуацию в банке (opłata, blokada karty)
- **Domains:** BANK, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-BANK-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Решить спорную ситуацию в банке (opłata, blokada karty)» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-018]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-019
- **Level:** B1
- **Function:** Сравнить продукты банка / страхование на бытовом уровне
- **Domains:** BANK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-BANK-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сравнить продукты банка / страхование на бытовом уровне» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-019]
- **L1 risks:** ERR-UKR-22, ERR-RUS-09
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-020
- **Level:** B1
- **Function:** Провести reklamację с ссылкой на срок / чек / ustawę (бытовая формулировка)
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-COMPLAINT-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Провести reklamację с ссылкой на срок / чек / ustawę (бытовая формули…» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-020]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-021
- **Level:** B1
- **Function:** Отказаться от навязанной услуги и зафиксировать отказ
- **Domains:** SHOP, BANK, PHONE
- **GR prerequisites:** GR-CAS-ACC-01, GR-NUM-CARD-01, PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-REFUSAL-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Отказаться от навязанной услуги и зафиксировать отказ» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-021]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-022
- **Level:** B1
- **Function:** Объяснить опоздание транспорта и последствия для работы
- **Domains:** TRANS, WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-TRANS-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Объяснить опоздание транспорта и последствия для работы» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-022]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-023
- **Level:** B1
- **Function:** Пожаловаться перевозчику / найти альтернативу
- **Domains:** TRANS, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-TRANS-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Пожаловаться перевозчику / найти альтернативу» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-023]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-024
- **Level:** B1
- **Function:** Урегулировать конфликт с соседом (шум, запах, место parking)
- **Domains:** NEIGHBOR, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-NEIGHBOR-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Урегулировать конфликт с соседом (шум, запах, место parking)» in domain NEIGHBOR with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-024]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-025
- **Level:** B1
- **Function:** Участвовать в zebranie wspólnoty: кратко взять слово
- **Domains:** NEIGHBOR, HOUSING
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEETING
- **Required evidence:** speaking_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Участвовать в zebranie wspólnoty: кратко взять слово» in domain NEIGHBOR with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B1-025]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-026
- **Level:** B1
- **Function:** Вести телефонные переговоры с несколькими темами
- **Domains:** PHONE
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PHONE-B1
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести телефонные переговоры с несколькими темами» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-026]
- **L1 risks:** ERR-UKR-07, ERR-RUS-07
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-027
- **Level:** B1
- **Function:** Оставить структурированное голосовое: контекст–просьба–контакт
- **Domains:** PHONE
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PHONE-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Оставить структурированное голосовое: контекст–просьба–контакт» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-027]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-028
- **Level:** B1
- **Function:** Сформулировать skargę письменно по схеме
- **Domains:** COMPLAINT, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-COMPLAINT-WRITE
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Сформулировать skargę письменно по схеме» in domain COMPLAINT with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-028]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-029
- **Level:** B1
- **Function:** Смягчить отказ и сохранить отношения
- **Domains:** COMPLAINT, WORK, SOCIAL
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01, PRAG-SOFTEN-01
- **LEX bundles:** LEX-SOFTEN
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Смягчить отказ и сохранить отношения» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-029]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-030
- **Level:** B1
- **Function:** Настоять на просьбе без грубости (escalation вежливая)
- **Domains:** COMPLAINT, URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-ASSERTIVE
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Настоять на просьбе без грубости (escalation вежливая)» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-030]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-031
- **Level:** B1
- **Function:** Управлять регистром pan/pani/ty в смешанной группе
- **Domains:** TV, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-TV-B1
- **Required evidence:** roleplay_tv
- **Criticality:** Core
- **Completion criterion:** Learner can «Управлять регистром pan/pani/ty в смешанной группе» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-B1-031]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-032
- **Level:** B1
- **Function:** Выбрать wołacz / имя / должность уместно
- **Domains:** TV, SCHOOL, MED, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-ADDRESS-FORMS
- **Required evidence:** roleplay_tv
- **Criticality:** Important
- **Completion criterion:** Learner can «Выбрать wołacz / имя / должность уместно» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-B1-032]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-033
- **Level:** B1
- **Function:** Написать oficjalne pismo: nagłówek, cel, uzasadnienie, zakończenie
- **Domains:** FORMAL
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01, GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-LETTER-B1
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать oficjalne pismo: nagłówek, cel, uzasadnienie, zakończenie» in domain FORMAL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-033]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-034
- **Level:** B1
- **Function:** Написать полуформальный e-mail «на грани» ty/pan
- **Domains:** FORMAL, WORK
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-EMAIL-B1
- **Required evidence:** writing_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Написать полуформальный e-mail «на грани» ty/pan» in domain FORMAL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-034]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-035
- **Level:** B1
- **Function:** Рассказать историю с причиной–следствием и оценкой
- **Domains:** EVERYDAY, WORK
- **GR prerequisites:** GR-TNS-PST-01, GR-ASP-LEX-01
- **LEX bundles:** LEX-NARRATIVE-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Рассказать историю с причиной–следствием и оценкой» in domain EVERYDAY with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-035]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-036
- **Level:** B1
- **Function:** Аргументировать «за/против» бытового решения
- **Domains:** HOUSING, SCHOOL, WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-ARGUMENT-B1
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Аргументировать «за/против» бытового решения» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-036]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-037
- **Level:** B1
- **Function:** Пересказать содержание новости / объявления / письма
- **Domains:** URZAD, SCHOOL, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-MEDIATION-B1
- **Required evidence:** reading_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Пересказать содержание новости / объявления / письма» in domain URZAD with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-B1-037]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-038
- **Level:** B1
- **Function:** Посредничать между поляком и L1-говорящим (устно, просто)
- **Domains:** SOCIAL, SCHOOL, MED
- **GR prerequisites:** PRAG-MEDIATION-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEDIATION-B1
- **Required evidence:** mediation_task
- **Criticality:** Important
- **Completion criterion:** Learner can «Посредничать между поляком и L1-говорящим (устно, просто)» in domain SOCIAL with successful meaning transfer to a third party, without blocking register/rekcja failure. [FN-B1-038]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-039
- **Level:** B1
- **Function:** Использовать liczebniki в деньгах, сроках, людях без срыва согласования
- **Domains:** BANK, WORK, SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-NUM-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Использовать liczebniki в деньгах, сроках, людях без срыва согласования» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-039]
- **L1 risks:** ERR-UKR-22, ERR-RUS-09
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-040
- **Level:** B1
- **Function:** Выбрать видовую пару в прошлом/будущем по смыслу ситуации
- **Domains:** ALL
- **GR prerequisites:** GR-TNS-PST-01, GR-ASP-LEX-01, GR-ASP-CON-01, GR-ASP-CTRL-01
- **LEX bundles:** LEX-ASPECT-PAIRS
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Выбрать видовую пару в прошлом/будущем по смыслу ситуации» in domain ALL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-040]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-041
- **Level:** B1
- **Function:** Описать правила на работе / в доме и исключения
- **Domains:** WORK, HOUSING
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-RULES-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Описать правила на работе / в доме и исключения» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-041]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-042
- **Level:** B1
- **Function:** Выразить гипотезу и условие (*gdyby*, *jeśli*)
- **Domains:** WORK, HOUSING
- **GR prerequisites:** GR-SYN-COND-01, GR-MOD-COND-01
- **LEX bundles:** LEX-HYPOTHESIS
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Выразить гипотезу и условие (*gdyby*, *jeśli*)» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-042]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-043
- **Level:** B1
- **Function:** Дать развёрнутый отзыв об услуге (устно/письменно)
- **Domains:** SHOP, MED, SCHOOL
- **GR prerequisites:** GR-CAS-ACC-01, GR-NUM-CARD-01, PRAG-PAN-01
- **LEX bundles:** LEX-REVIEW
- **Required evidence:** writing_rubric
- **Criticality:** Extension
- **Completion criterion:** Learner can «Дать развёрнутый отзыв об услуге (устно/письменно)» in domain SHOP with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-043]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-044
- **Level:** B1
- **Function:** Понять и выполнить многошаговую инструкцию
- **Domains:** WORK, MED, URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-INSTRUCTIONS-B1
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Понять и выполнить многошаговую инструкцию» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-044]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-045
- **Level:** B1
- **Function:** Сообщить плохие новости вежливо (отказ, задержка, отказ в визе/документе — бытовой тон)
- **Domains:** FORMAL, WORK, URZAD
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-BADNEWS
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сообщить плохие новости вежливо (отказ, задержка, отказ в визе/докуме…» in domain FORMAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-045]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-046
- **Level:** B1
- **Function:** Запросить feedback и отреагировать на критику
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-FEEDBACK
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Запросить feedback и отреагировать на критику» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-046]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B1-047
- **Level:** B1
- **Function:** Обсудить здоровье ребёнка / absencje со школой без паники
- **Domains:** SCHOOL, MED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-MED
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Обсудить здоровье ребёнка / absencje со школой без паники» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-047]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-048
- **Level:** B1
- **Function:** Спланировать бюджет месяца (язык: rachunki, limity)
- **Domains:** BANK, HOUSING
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-BUDGET
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Спланировать бюджет месяца (язык: rachunki, limity)» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-048]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-049
- **Level:** B1
- **Function:** Объяснить культурное/прагматическое различие L1 vs PL (мета)
- **Domains:** TV, SOCIAL
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-PRAG-META
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Объяснить культурное/прагматическое различие L1 vs PL (мета)» in domain TV with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-049]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-050
- **Level:** B1
- **Function:** Подготовиться к устной части B1: описание + диалог + мнение
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-EXAM-ORAL-B1
- **Required evidence:** speaking_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Подготовиться к устной части B1: описание + диалог + мнение» in domain EXAM-ALIGNED with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B1-050]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-051
- **Level:** B1
- **Function:** Подготовиться к письму B1: выбор жанра под polecenie
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-EXAM-WRITE-B1
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Подготовиться к письму B1: выбор жанра под polecenie» in domain EXAM-ALIGNED with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-051]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-052
- **Level:** B1
- **Function:** Распознать ловушки rekcja/aspect в grammar-модуле (тренировка)
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** —
- **Required evidence:** closed_item
- **Criticality:** Extension
- **Completion criterion:** Learner can «Распознать ловушки rekcja/aspect в grammar-модуле (тренировка)» in domain EXAM-ALIGNED with correct closed-item responses on target forms, without blocking register/rekcja failure. [FN-B1-052]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-053
- **Level:** B1
- **Function:** Вести разговор о правах потребителя / гарантии на бытовом уровне
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-CONSUMER
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Вести разговор о правах потребителя / гарантии на бытовом уровне» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-053]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B1 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B1-054
- **Level:** B1
- **Function:** Согласовать совместный план (родители, коллеги, соседи)
- **Domains:** SCHOOL, WORK, NEIGHBOR
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-PLANNING
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Согласовать совместный план (родители, коллеги, соседи)» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B1-054]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B1-055
- **Level:** B1
- **Function:** Резюмировать договорённость и подтвердить письменно
- **Domains:** WORK, HOUSING, SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-SUMMARY
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Резюмировать договорённость и подтвердить письменно» in domain WORK with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B1-055]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-001
- **Level:** B2
- **Function:** Вести сложные переговоры об условиях работы / повышении
- **Domains:** WORK
- **GR prerequisites:** GR-SYN-COND-01, GR-MOD-COND-01
- **LEX bundles:** LEX-WORK-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести сложные переговоры об условиях работы / повышении» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-001]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-002
- **Level:** B2
- **Function:** Дать развёрнутую обратную связь коллеге / подчинённому
- **Domains:** WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-FEEDBACK-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Дать развёрнутую обратную связь коллеге / подчинённому» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-002]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-003
- **Level:** B2
- **Function:** Защитить свою позицию на совещании с контраргументами
- **Domains:** WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-DEBATE-B2
- **Required evidence:** speaking_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Защитить свою позицию на совещании с контраргументами» in domain WORK with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B2-003]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-004
- **Level:** B2
- **Function:** Написать analityczny e-mail / notatkę z rekomendacją
- **Domains:** WORK, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-ANALYTIC
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать analityczny e-mail / notatkę z rekomendacją» in domain WORK with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-004]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-005
- **Level:** B2
- **Function:** Обсудить риски договора найма и предложить правки
- **Domains:** HOUSING, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-CONTRACT-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Обсудить риски договора найма и предложить правки» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-005]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-006
- **Level:** B2
- **Function:** Вести конфликт z wynajmującym до ugody / wypowiedzenia
- **Domains:** HOUSING, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-HOUSING-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести конфликт z wynajmującym до ugody / wypowiedzenia» in domain HOUSING with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-006]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-007
- **Level:** B2
- **Function:** Понять сложное pismo urzędowe и составить odpowiedь
- **Domains:** URZAD, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-URZAD-B2
- **Required evidence:** reading_task
- **Criticality:** Core
- **Completion criterion:** Learner can «Понять сложное pismo urzędowe и составить odpowiedь» in domain URZAD with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-B2-007]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-008
- **Level:** B2
- **Function:** Обжаловать решение / złożyć odwołanie (язык структуры)
- **Domains:** URZAD, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-APPEAL
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Обжаловать решение / złożyć odwołanie (язык структуры)» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-008]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-009
- **Level:** B2
- **Function:** Обсудить с врачом варианты лечения и побочные эффекты
- **Domains:** MED
- **GR prerequisites:** GR-TNS-PRS-01, GR-CAS-ACC-01, PRAG-PAN-01
- **LEX bundles:** LEX-MED-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Обсудить с врачом варианты лечения и побочные эффекты» in domain MED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-009]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-010
- **Level:** B2
- **Function:** Написать жалобу в placówka / NFZ-бытовой контур
- **Domains:** MED, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01, GR-NEG-01
- **LEX bundles:** LEX-COMPLAINT-B2
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать жалобу в placówka / NFZ-бытовой контур» in domain MED with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-010]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-011
- **Level:** B2
- **Function:** Участвовать в szkolne spotkanie z wieloma stronami
- **Domains:** SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Участвовать в szkolne spotkanie z wieloma stronami» in domain SCHOOL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-011]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-012
- **Level:** B2
- **Function:** Сформулировать wniosek o dostosowanie / indywidualny tok (бытовой язык)
- **Domains:** SCHOOL, FORMAL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-SCHOOL-WRITE-B2
- **Required evidence:** writing_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Сформулировать wniosek o dostosowanie / indywidualny tok (бытовой язык)» in domain SCHOOL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-012]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-013
- **Level:** B2
- **Function:** Вести спор с банком / страховой с опорой на документы
- **Domains:** BANK, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-BANK-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести спор с банком / страховой с опорой на документы» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-013]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-014
- **Level:** B2
- **Function:** Сравнить оферты и обосновать выбор
- **Domains:** BANK, HOUSING, WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-COMPARE-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Сравнить оферты и обосновать выбор» in domain BANK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-014]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-015
- **Level:** B2
- **Function:** Провести сложную reklamację (seria usterek, terminy ustawowe — бытовая точность)
- **Domains:** SHOP, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-CONSUMER-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Провести сложную reklamację (seria usterek, terminy ustawowe — бытова…» in domain SHOP with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-015]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-016
- **Level:** B2
- **Function:** Отказаться и зафиксировать отказ в переписке (dowód)
- **Domains:** COMPLAINT, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-REFUSAL-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Отказаться и зафиксировать отказ в переписке (dowód)» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-016]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-017
- **Level:** B2
- **Function:** Решить транспортный спор (odszkodowanie za opóźnienie — язык претензии)
- **Domains:** TRANS, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-TRANS-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Решить транспортный спор (odszkodowanie za opóźnienie — язык претензии)» in domain TRANS with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-017]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-018
- **Level:** B2
- **Function:** Модерировать конфликт соседей / предложить kompromis
- **Domains:** NEIGHBOR
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEDIATION-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Модерировать конфликт соседей / предложить kompromis» in domain NEIGHBOR with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-018]
- **L1 risks:** ERR-BEL-24
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-019
- **Level:** B2
- **Function:** Выступить кратко на zebraniu z argumentacją
- **Domains:** NEIGHBOR, WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-PUBLIC-SPEAK
- **Required evidence:** speaking_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Выступить кратко на zebraniu z argumentacją» in domain NEIGHBOR with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B2-019]
- **L1 risks:** ERR-BEL-24
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-020
- **Level:** B2
- **Function:** Вести трудный телефон: call center, эскалация, запись rozmowy (мета)
- **Domains:** PHONE, COMPLAINT
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PHONE-B2
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Вести трудный телефон: call center, эскалация, запись rozmowy (мета)» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-020]
- **L1 risks:** ERR-UKR-07, ERR-RUS-07
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-021
- **Level:** B2
- **Function:** Написать wielostronicowe pismo: chronologia, żądanie, załączniki
- **Domains:** FORMAL, COMPLAINT
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01, GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-LETTER-B2
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Написать wielostronicowe pismo: chronologia, żądanie, załączniki» in domain FORMAL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-021]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-022
- **Level:** B2
- **Function:** Стилизовать один и тот же смысл под 3 регистра
- **Domains:** TV, FORMAL
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-REGISTER-FLEX
- **Required evidence:** roleplay_tv
- **Criticality:** Important
- **Completion criterion:** Learner can «Стилизовать один и тот же смысл под 3 регистра» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-B2-022]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-023
- **Level:** B2
- **Function:** Распознать и скорректировать неуместный ty/pan в команде
- **Domains:** TV, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-TV-B2
- **Required evidence:** roleplay_tv
- **Criticality:** Important
- **Completion criterion:** Learner can «Распознать и скорректировать неуместный ty/pan в команде» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-B2-023]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-024
- **Level:** B2
- **Function:** Использовать/избегать zdrobnienia и коллоквиализмы по ситуации
- **Domains:** TV, SOCIAL
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-COLLOQ-CONTROL
- **Required evidence:** roleplay_tv
- **Criticality:** Important
- **Completion criterion:** Learner can «Использовать/избегать zdrobnienia и коллоквиализмы по ситуации» in domain TV with correct T–V register choice in a short roleplay, without blocking register/rekcja failure. [FN-B2-024]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-025
- **Level:** B2
- **Function:** Строить развёрнутую аргументацию с уступкой (*co prawda… jednak*)
- **Domains:** ALL
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-ARGUMENT-B2
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Строить развёрнутую аргументацию с уступкой (*co prawda… jednak*)» in domain ALL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-025]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-026
- **Level:** B2
- **Function:** Гипотезы, контрфактивы, осторожные выводы
- **Domains:** WORK, URZAD, MED
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01, GR-SYN-COND-01, GR-MOD-COND-01
- **LEX bundles:** LEX-HYPOTHESIS-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Гипотезы, контрфактивы, осторожные выводы» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-026]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-027
- **Level:** B2
- **Function:** Пересказать и оценить позицию автора текста
- **Domains:** READING→SPEAK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEDIATION-B2
- **Required evidence:** reading_task
- **Criticality:** Extension
- **Completion criterion:** Learner can «Пересказать и оценить позицию автора текста» in domain READING→SPEAK with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-B2-027]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-028
- **Level:** B2
- **Function:** Объяснить абстрактное правило на конкретном примере
- **Domains:** WORK, URZAD, SCHOOL
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-EXPLAIN-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Объяснить абстрактное правило на конкретном примере» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-028]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-029
- **Level:** B2
- **Function:** Вести small talk + переход к делу без прагматического сбоя
- **Domains:** WORK, SOCIAL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-SMALLTALK-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Вести small talk + переход к делу без прагматического сбоя» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-029]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-030
- **Level:** B2
- **Function:** Описать сложный процесс (jak załatwić sprawę end-to-end)
- **Domains:** URZAD, BANK, HOUSING
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PROCESS
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Описать сложный процесс (jak załatwić sprawę end-to-end)» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-030]
- **L1 risks:** ERR-UKR-04, ERR-RUS-04
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-031
- **Level:** B2
- **Function:** Выразить нюанс мнения (pewność, wątpliwość, dystans)
- **Domains:** ALL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-STANCE
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Выразить нюанс мнения (pewność, wątpliwość, dystans)» in domain ALL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-031]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-032
- **Level:** B2
- **Function:** Исправить себя и собеседника тактично
- **Domains:** SOCIAL, WORK
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-REPAIR-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Исправить себя и собеседника тактично» in domain SOCIAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-032]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-033
- **Level:** B2
- **Function:** Синтезировать несколько источников (e-mail + umowa + rozmowa)
- **Domains:** FORMAL, WORK
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-SYNTHESIS
- **Required evidence:** writing_rubric
- **Criticality:** Extension
- **Completion criterion:** Learner can «Синтезировать несколько источников (e-mail + umowa + rozmowa)» in domain FORMAL with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-033]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-034
- **Level:** B2
- **Function:** Подготовка к B2 mówienie: развёрнутое высказывание + реакция
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-EXAM-ORAL-B2
- **Required evidence:** speaking_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Подготовка к B2 mówienie: развёрнутое высказывание + реакция» in domain EXAM-ALIGNED with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B2-034]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-035
- **Level:** B2
- **Function:** Подготовка к B2 pisanie: выбор регистра и структуры
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** PRAG-PAN-01, GR-TV-AGR-01
- **LEX bundles:** LEX-EXAM-WRITE-B2
- **Required evidence:** writing_rubric
- **Criticality:** Core
- **Completion criterion:** Learner can «Подготовка к B2 pisanie: выбор регистра и структуры» in domain EXAM-ALIGNED with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-035]
- **L1 risks:** ERR-UKR-18, ERR-RUS-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-036
- **Level:** B2
- **Function:** Тренировка poprawność gramatyczna B2 (трансформации, rekcja, aspekt)
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** —
- **Required evidence:** closed_item
- **Criticality:** Important
- **Completion criterion:** Learner can «Тренировка poprawność gramatyczna B2 (трансформации, rekcja, aspekt)» in domain EXAM-ALIGNED with correct closed-item responses on target forms, without blocking register/rekcja failure. [FN-B2-036]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-037
- **Level:** B2
- **Function:** Критическое чтение regulamin / oferty (ukryte koszty)
- **Domains:** BANK, HOUSING, SHOP
- **GR prerequisites:** GR-PRO-DEM-01, GR-SYN-SUB-01
- **LEX bundles:** LEX-CRITICAL-READ
- **Required evidence:** reading_task
- **Criticality:** Core
- **Completion criterion:** Learner can «Критическое чтение regulamin / oferty (ukryte koszty)» in domain BANK with correct gist selection from a short authentic text, without blocking register/rekcja failure. [FN-B2-037]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-038
- **Level:** B2
- **Function:** Публичное извинение / объяснение инцидента
- **Domains:** WORK, SCHOOL, NEIGHBOR
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-APOLOGY-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Публичное извинение / объяснение инцидента» in domain WORK with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-038]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-039
- **Level:** B2
- **Function:** Согласовать ugoda и зафиксировать условия
- **Domains:** COMPLAINT, HOUSING, WORK
- **GR prerequisites:** GR-SYN-COND-01, GR-MOD-COND-01
- **LEX bundles:** LEX-SETTLEMENT
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Согласовать ugoda и зафиксировать условия» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-039]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-040
- **Level:** B2
- **Function:** Обсудить этику/границы (dane osobowe, zgody — бытовой уровень)
- **Domains:** URZAD, SCHOOL, WORK
- **GR prerequisites:** PRAG-PAN-01, GR-CAS-ACC-01, GR-TNS-PRS-01
- **LEX bundles:** LEX-PRIVACY-BASIC
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Обсудить этику/границы (dane osobowe, zgody — бытовой уровень)» in domain URZAD with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-040]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-041
- **Level:** B2
- **Function:** Перевод смысла институционального текста «на человеческий» для семьи
- **Domains:** MEDIATION
- **GR prerequisites:** PRAG-MEDIATION-01, PRAG-PAN-01
- **LEX bundles:** LEX-MEDIATION-B2
- **Required evidence:** mediation_task
- **Criticality:** Extension
- **Completion criterion:** Learner can «Перевод смысла институционального текста «на человеческий» для семьи» in domain MEDIATION with successful meaning transfer to a third party, without blocking register/rekcja failure. [FN-B2-041]
- **L1 risks:** ERR-UKR-15, ERR-RUS-16
- **Exam relevance:** exam-prep
- **Source anchor:** CEFR Companion Volume — overall oral interaction B2 (qualitative; REQUIRES VERIFICATION exact scale row)

### FN-B2-042
- **Level:** B2
- **Function:** Вести дискуссию о школе/работе/жилье с примерами и обобщением
- **Domains:** SCHOOL, WORK, HOUSING
- **GR prerequisites:** GR-CAS-LOC-01, GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-DISCUSSION
- **Required evidence:** speaking_rubric
- **Criticality:** Extension
- **Completion criterion:** Learner can «Вести дискуссию о школе/работе/жилье с примерами и обобщением» in domain SCHOOL with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B2-042]
- **L1 risks:** ERR-UKR-09, ERR-RUS-09
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-043
- **Level:** B2
- **Function:** Использовать пассив/безличные формы в официальном стиле
- **Domains:** FORMAL
- **GR prerequisites:** GR-PASS-01, GR-IMPERS-SIE-01
- **LEX bundles:** LEX-FORMAL-B2
- **Required evidence:** task_performance
- **Criticality:** Important
- **Completion criterion:** Learner can «Использовать пассив/безличные формы в официальном стиле» in domain FORMAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-043]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-044
- **Level:** B2
- **Function:** Контролировать информационную структуру (тема–рема) в длинном монологе
- **Domains:** ALL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** —
- **Required evidence:** speaking_rubric
- **Criticality:** Extension
- **Completion criterion:** Learner can «Контролировать информационную структуру (тема–рема) в длинном монологе» in domain ALL with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B2-044]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-045
- **Level:** B2
- **Function:** Распознать манипулятивные формулы call center / sprzedaży и отказать
- **Domains:** PHONE, SHOP, BANK
- **GR prerequisites:** PRAG-PAN-01, GR-TNS-PRS-01, GR-NEG-01
- **LEX bundles:** LEX-MANIP-RESIST
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Распознать манипулятивные формулы call center / sprzedaży и отказать» in domain PHONE with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-045]
- **L1 risks:** ERR-UKR-13
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-046
- **Level:** B2
- **Function:** Подготовить i wygłosić krótką prezentację (3–5 мин)
- **Domains:** WORK, SCHOOL
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01, GR-CAS-NOM-01
- **LEX bundles:** LEX-PRESENTATION
- **Required evidence:** speaking_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Подготовить i wygłosić krótką prezentację (3–5 мин)» in domain WORK with an observable oral sample meeting rubric bands, without blocking register/rekcja failure. [FN-B2-046]
- **L1 risks:** ERR-UKR-18, ERR-BEL-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-047
- **Level:** B2
- **Function:** Написать recenzję / opinię z uzasadnieniem
- **Domains:** SHOP, SCHOOL, WORK
- **GR prerequisites:** GR-TNS-PRS-01, ORTH-CORE-01, PRAG-PAN-01
- **LEX bundles:** LEX-REVIEW-B2
- **Required evidence:** writing_rubric
- **Criticality:** Important
- **Completion criterion:** Learner can «Написать recenzję / opinię z uzasadnieniem» in domain SHOP with an acceptable short written product on rubric, without blocking register/rekcja failure. [FN-B2-047]
- **L1 risks:** ERR-UKR-01, ERR-RUS-02
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-048
- **Level:** B2
- **Function:** Сравнить две версии события и указать расхождения
- **Domains:** COMPLAINT, WORK
- **GR prerequisites:** GR-DEG-ADJ-01, GR-SYN-COMP-01, GR-TNS-PRS-01, GR-TNS-PST-01, GR-ASP-LEX-01
- **LEX bundles:** LEX-EVIDENCE
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Сравнить две версии события и указать расхождения» in domain COMPLAINT with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-048]
- **L1 risks:** ERR-RUS-24, ERR-UKR-18
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)

### FN-B2-049
- **Level:** B2
- **Function:** Поддерживать вежливую твердость в длинной переписке
- **Domains:** FORMAL, COMPLAINT
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** LEX-PERSISTENCE
- **Required evidence:** task_performance
- **Criticality:** Core
- **Completion criterion:** Learner can «Поддерживать вежливую твердость в длинной переписке» in domain FORMAL with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-049]
- **L1 risks:** ERR-UKR-24, ERR-BEL-23
- **Exam relevance:** exam-prep
- **Source anchor:** PRODUCT ANALYSIS — first-audience scenario (work/housing/urzęd/med/school/bank)

### FN-B2-050
- **Level:** B2
- **Function:** Самооценка пробелов перед экзаменом B2 (метаучебная)
- **Domains:** EXAM-ALIGNED
- **GR prerequisites:** GR-TNS-PRS-01, PRAG-PAN-01
- **LEX bundles:** —
- **Required evidence:** task_performance
- **Criticality:** Extension
- **Completion criterion:** Learner can «Самооценка пробелов перед экзаменом B2 (метаучебная)» in domain EXAM-ALIGNED with successful task completion in a timed scenario, without blocking register/rekcja failure. [FN-B2-050]
- **L1 risks:** —
- **Exam relevance:** exam-prep
- **Source anchor:** Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog A/B thematic competence (PRODUCT mapping; REQUIRES VERIFICATION cell)
