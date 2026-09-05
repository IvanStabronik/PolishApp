# Лексические цели по уровням A1–B2

**Статус:** Phase 2 curriculum draft — **все количественные диапазоны внутренние и требуют калибровки**.  
**Дата сверки внешних источников:** **2026-09-05**.  
**Язык документа:** русский (метаязык); польские примеры — иллюстрации, не готовый словник к публикации.

---

## 0. Антигаллюцинация

| Утверждение | Статус | Источник / дата | Confidence |
| --- | --- | --- | --- |
| CEFR / Companion Volume задают **качественные** дескрипторы владения, а **не** официальные нормы «N слов на уровень» | Принято | [CEFR (Council of Europe)](https://www.coe.int/en/web/common-european-framework-reference-languages); Companion Volume | **высокий** |
| Любые числа лемм / семей / MWU ниже | **Внутренние рабочие диапазоны PolishApp** | `PRODUCT ANALYSIS` / методическая гипотеза | **низкий→средний** до корпусной и classroom калибровки |
| Каталоги умений и грамматики госэкзамена | Ориентир покрытия тем, не готовый frequency list | [Dz.U. 2025 poz. 217](https://dziennikustaw.gov.pl/D2025000021701.pdf) załącznik nr 1 | **высокий** на существование стандарта |
| Доступность сессий ≠ объём лексики | Раздельные поля | [struktura](https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/); [terminy 2026](https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/) — 2026-09-05 | **высокий** |

**Запрещено в продукте и маркетинге:** формулировки вида «по нормам CEFR нужно 2000 слов на B1».  
**Разрешено:** «внутренний продуктивный рабочий диапазон B1 (калибруется)».

---

## 1. Типы лексических единиц (раздельный учёт)

Каждая словарная карточка / единица контента помечается **ровно одним первичным типом** + флагами владения.

### 1.1 Первичные типы

| Тип | Код | Определение для PolishApp | Пример (иллюстрация) |
| --- | --- | --- | --- |
| Лемма | `LT-LEMMA` | Словарная голова; для глагола — инфинитив; для N — mianownik sg | *mieszkanie*, *pracować* |
| Словосемейство | `LT-FAMILY` | Набор этимологически/словообразовательно связанных лемм, учтённых как семья для прогресса | *pracować – praca – pracownik – pracowniczy* |
| Многословная единица | `LT-MWU` | Устойчивое многословие без полной идиоматичности | *iść do pracy*, *mieć na imię* |
| Коллокация | `LT-COLL` | Предпочтительное сочетание; ошибка = «понятно, но не по-польски» | *odbyć wizytę*, *złożyć wniosek* |
| Фиксированное выражение | `LT-FIX` | Формула с низкой вариативностью (приветствия, urzędowe formuły) | *z poważaniem*, *w czym mogę pomóc* |

### 1.2 Флаги владения (не типы)

| Флаг | Код | Смысл |
| --- | --- | --- |
| Продуктивный | `LV-PROD` | Ожидается активное употребление на уровне |
| Рецептивный | `LV-RECP` | Достаточно узнать в R/L; продукция не требуется |
| Узнавание словоформ | `LV-FORM` | Узнать формы вне словарной головы (падежи, лица, вид) без обязательства производить весь paradigm |

**Правила:**

1. Одна и та же лемма может быть `LV-RECP` на A1 и `LV-PROD` на A2.
2. `LV-FORM` обязателен для высокочастотных N/Adj/V с богатой fleksją уже на A1 (*jestem/jesteś*, *w sklepie*).
3. Видовая пара = две леммы + связь `ASPECT-PAIR`; на A1 часто `LV-RECP`/`LT-LEMMA` без свободного выбора вида (`GR-ASPECT-LEX`).
4. Rekcja хранится **на лемме/COLL**, не «в грамматике вообще» (см. PED-002).

---

## 2. Этикетки рабочих диапазонов (lexical range labels)

Используются во всех таблицах ниже. Это **ярлыки калибровки**, не нормы CEFR.

| Label | Смысл | Применение |
| --- | --- | --- |
| `WR-PROD-A1` … `WR-PROD-B2` | Продуктивный рабочий диапазон лемм (+ обязательные MWU/FIX, отдельно считаются) | Exit criteria, scope контента |
| `WR-RECP-A1` … `WR-RECP-B2` | Рецептивный рабочий диапазон (включает PROD + дополнительный RECP) | Reading/listening design |
| `WR-FAMILY-*` | Ориентир по числу семей, не «уникальных словоформ» | Контроль раздувания списка |
| `WR-MWU-*` / `WR-COLL-*` / `WR-FIX-*` | Рабочие диапазоны многословий | Приоритет сценариев первой аудитории |
| `CALIBRATION=required` | Любая цифра предварительна | Обязательная метаданная |

### 2.1 Предварительные численные диапазоны (калибровать)

> **Внутренние рабочие диапазоны. Не официальные нормы CEFR. `CALIBRATION=required`.**

| Уровень | `WR-PROD-*` леммы | `WR-RECP-*` леммы | `WR-FAMILY-*` | `WR-MWU+COLL+FIX` (суммарно, ориентир) |
| --- | --- | --- | --- | --- |
| A1 | **400–650** | **800–1200** | **280–450** | **120–220** |
| A2 | **800–1200** | **1500–2200** | **550–850** | **220–380** |
| B1 | **1500–2200** | **2800–4000** | **1000–1600** | **400–650** |
| B2 | **2500–3500** | **4500–6500** | **1700–2500** | **650–950** |

**Как читать:** верхняя граница — потолок scope для уровня, не требование «выучить ровно N». Нижняя — минимальный каркас приоритетных доменов.  
**Словоформы:** не входят в счёт лемм; покрываются `LV-FORM` + грамматическими столпами.

---

## 3. Правила отбора лексики (все уровни)

1. **Сценарий > частота alone:** приоритет `DOM-WORK, HOUSING, URZAD, MED, SCHOOL, BANK, SHOP, TRANS, NEIGHBOR, PHONE, COMPLAINT, TV, FORMAL`.
2. **Частота:** ориентиры внешних frequency lists допустимы как **вход сигнала**, не как копируемый словник; финальный список — оригинальная подборка автора (`CNT-*`).
3. **Rekcja обязательна** для V/Prep с несвободным управлением до публикации (`GR-REKCJA`).
4. **Видовые пары:** помечать связь; на A1 не требовать свободного выбора.
5. **Регистр:** каждая FIX/COLL с пометкой `reg=official|neutral|colloquial|taboo-avoid`.
6. **L1 false friends:** отдельный контур `FF-UKR|RUS|BEL` (см. §8); не смешивать три банка.
7. **Не тащить** редкую «учебниковую» лексику без сценария первой аудитории.
8. **Продуктивный минимум** покрывает скрипты FN-* текущего уровня; остальное — рецептивно.
9. **Кальки L1** (*iść до domu, w sklep*) блокируются упражнениями, не только словарём.
10. **Числа диапазонов** пересматриваются после: (a) пилота A1, (b) покрытия FN-инвентаря, (c) linguistic review.

---

## 4. Тематические домены и функциональные словари по уровням

Домены совпадают с `functional-inventory.md`. Ниже — **что входит в продуктивный каркас** уровня (не исчерпывающий словник).

### 4.1 A1

**Тематические домены (PROD каркас):**  
IDENTITY, TIME, FOOD, SHOP-BASIC, MONEY-CASH, TRANS-BASIC, WORK-BASIC, HOUSING-BASIC, URZAD-BASIC, MED-BODY, SCHOOL-BASIC, BANK-BASIC, PHONE-SCRIPT, NEIGHBOR-MICRO, GREETINGS-TV, REPAIR-COMMUNICATION, FORMS-FIELDS, SIGNS.

**Функциональные словари:**  
- Вежливость: *proszę, dziękuję, przepraszam, poproszę*  
- T–V формулы: *pan/pani + jest / ma / może*  
- Магазин: *ile kosztuje, poproszę, rachunek, karta*  
- Время/запись: *dziś, jutro, rano, o ósmej*  
- Документы: *dowód, PESEL (рецептивно+поле), wniosek, numer*  
- Телефон: *halo, z tej strony, proszę o kontakt*

**Частота:** топ бытовой + институциональный минимум; длинные списки еды/одежды — только по нужде сценария.  
**Rekcja (образцы PROD):** *iść do + GEN, być w + LOC, czekać na + ACC, dziękować + DAT*.  
**Аспект:** отдельные частые пары как `LT-LEMMA` + `ASPECT-PAIR`, выбор — ещё не exit.  
**Регистр:** official service + neutral; colloquial — RECP.  
**False friends (ввод):** минимум 8–15 единиц на L1-пакет (`CALIBRATION=required`) — напр. иллюстрации *magazyn, dywan, czasopismo* (конкретный список — работа автора, PED-024).

### 4.2 A2

**Домены +:** WORK-LEAVE, HOUSING-CONTRACT-BASIC, URZAD-A2, MED-A2, PHARMA-DOSAGE, SCHOOL-A2, KINDER, BANK-FEES, COMPLAINT, BILLS, RULES-HOUSE, SMALLTALK, EMAIL-A2, COMPARE, NOTIFY.

**Функциональные словари:**  
- Reklamacja: *paragon, wymiana, zwrot, uszkodzony*  
- Najem: *czynsz, kaucja, wypowiedzenie (RECP/частично PROD), usterka*  
- Szkoła: *usprawiedliwienie, zebranie, wychowawca*  
- Bank: *przelew, opłata, limit, saldo*  
- Отказ/просьба: *niestety nie mogę, czy byłoby możliwe*

**Rekcja:** расширить *słuchać + GEN, bać się + GEN, zajmować się + INS, dzwonić do + GEN*.  
**Аспект:** введение осознанного выбора в прошлом/будущем на частотном наборе пар.  
**Регистр:** официальный e-mail FIX; осторожный potoczny RECP.  
**False friends:** наращивание банка; упражнения различения обязательны.

### 4.3 B1

**Домены +:** MEETING, CV-ORAL, CONTRACT-B1, URZAD-READ, MED-HISTORY, SCHOOL-SUPPORT, CONSUMER, ARGUMENT, MEDIATION-B1, BUDGET, BADNEWS, FEEDBACK, EXAM-ORAL/WRITE-B1.

**Функциональные словари:**  
- Права потребителя (бытовые): *gwarancja, reklamacja, termin*  
- Urzędowe: *wezwanie, decyzja, załącznik, potwierdzenie* (смесь PROD/RECP)  
- Работа: *obowiązek, termin, odpowiedzialność, grafik*  
- Аргументация: *dlatego, mimo że, z jednej strony…*  
- Liczebniki в людях/деньгах — связанный функциональный набор

**Rekcja + aspectual pairs:** продуктивный контроль частотных пар и управлений, типичных для exam grammar.  
**Регистр:** свободное переключение в быту/работе; colloquial контролируемо.  
**False friends:** активный ремонт fossilized ошибок (P-VIKTOR).

### 4.4 B2

**Домены +:** NEGOTIATION, APPEAL, ANALYTIC-EMAIL, CRITICAL-READ, SETTLEMENT, PRESENTATION, STANCE, MANIP-RESIST, SYNTHESIS, EXAM-B2.

**Функциональные словари:**  
- Odwołanie / skarga rozbudowana  
- Negocjacje: *warunek, kompromis, proponuję*  
- Stance: *wydaje się, raczej, bez wątpienia*  
- Официальный пассив/безличность: *rozpatrzono, należy*  
- Mediacja: пояснение институционального текста «простыми словами»

**Rekcja/aspect:** устойчивый контроль + приставочные семьи (PED-012).  
**Регистр:** стилизация одного смысла в 3 регистрах.  
**False friends:** остаточный контур + профессионально-бытовые ловушки.

---

## 5. Продуктивные vs рецептивные цели (сводка labels)

| Уровень | Продукция | Рецепция | Узнавание словоформ |
| --- | --- | --- | --- |
| A1 | `WR-PROD-A1` + скриптовые `WR-FIX-A1` | `WR-RECP-A1` (вывески, SMS, ulotki) | Высокий приоритет для top-200 функц. лемм |
| A2 | `WR-PROD-A2` + e-mail/reklamacja FIX | `WR-RECP-A2` (umowy фрагменты, regulaminy) | Падежные серии в доменах HOUSING/URZAD |
| B1 | `WR-PROD-B1` + argument MWU | `WR-RECP-B1` (pisma, artykuły popularne) | Полные частотные paradigms + liczebniki |
| B2 | `WR-PROD-B2` + analytic COLL | `WR-RECP-B2` (сложные pisma, oferty) | Редкие формы — RECP, если не мешают R |

---

## 6. Частота, rekcja, аспектуальные пары, регистр

### 6.1 Частота

- Сигнал частоты = один из входов отбора.  
- Доменный вес первой аудитории может **поднять** низкочастотное (*kaucja, wychowawca, wezwanie*).  
- Не публиковать «frequency rank» как обещание CEFR.

### 6.2 Управление (rekcja / government)

Обязательные поля карточки для V/Prep с несвободным управлением:

- падеж / предлог+падеж  
- запрещённая L1-калька  
- 1–2 модельные коллокации  
- уровень `LV-PROD` / `LV-RECP`

### 6.3 Аспектуальные пары

| Уровень | Ожидание |
| --- | --- |
| A1 | Пары как лексика; рецептивное различение в контексте |
| A2 | Выбор на ограниченном наборе в past/fut |
| B1 | Продуктивный выбор в приоритетных доменах |
| B2 | Тонкие различия, приставки, стилистический отбор |

Рабочий ориентир числа **пар в PROD-контроле** (не всех глаголов языка): A2 **40–80**, B1 **100–180**, B2 **180–300** — `CALIBRATION=required`, **не** норма CEFR.

### 6.4 Регистр

Каждая FIX/COLL: `official | neutral | colloquial | intimate | avoid`.  
Переход pan/pani ↔ ty — отдельный функциональный пакет (`DOM-TV`), не «слово *ty* в списке A1».

---

## 7. L1 false friends (UKR / RUS / BEL)

- Три **независимых** банка.  
- Поля: L1 форма/значение; ошибочное PL; верное PL; домен; уровень введения; упражнения.  
- Рабочие диапазоны размера банка (`CALIBRATION=required`):  
  - A1: **10–25** на L1  
  - A2: **25–50** cum  
  - B1: **50–90** cum  
  - B2: **80–120** cum  
- Примеры-иллюстрации (не финальный список): *magazyn, dywan, czasopismo, pukać, woń, urok* — автор утверждает оригинальный перечень (PED-024).

---

## 8. Связь с FN и exit criteria

- Каждый приоритетный FN-* уровня должен иметь покрытый `LEX-*` каркас (PROD или RECP по описанию функции).  
- Exit по лексике = выполнение `WR-PROD-*` каркаса доменов + контроль rekcja/false friends, **не** «набрал N слов в SRS».  
- Exam readiness использует те же labels, но добавляет exam-aligned жанры (см. `level-exit-criteria.md`).

---

## 9. История

| Дата | Событие |
| --- | --- |
| 2026-09-05 | Первая полная версия Phase 2; численные диапазоны помечены как внутренние |

## LEX bundle registry (canonical)

Каждый `LEX-*`, используемый как prerequisite в `functional-inventory.md`, определён здесь как **лексический bundle** (не lemma-list). Число лемм внутри bundle — внутреннее, `CALIBRATION=required`. **Не** норма CEFR.

| ID | Домен / назначение | Default level | Владение |
|---|---|---|---|
| `LEX-ADDRESS` | Functional bundle `ADDRESS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ADDRESS-FORMS` | Functional bundle `ADDRESS-FORMS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ADVICE-A2` | Functional bundle `ADVICE-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-AGREEMENT` | Functional bundle `AGREEMENT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ANALYTIC` | Functional bundle `ANALYTIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-APOLOGY-B2` | Functional bundle `APOLOGY-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-APPEAL` | Functional bundle `APPEAL` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-APPOINTMENT` | Functional bundle `APPOINTMENT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ARGUMENT-B1` | Functional bundle `ARGUMENT-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ARGUMENT-B2` | Functional bundle `ARGUMENT-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ASPECT-PAIRS` | Functional bundle `ASPECT-PAIRS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ASSERTIVE` | Functional bundle `ASSERTIVE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-AVAILABILITY` | Functional bundle `AVAILABILITY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BADNEWS` | Functional bundle `BADNEWS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BANK-A2` | Functional bundle `BANK-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BANK-B1` | Functional bundle `BANK-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BANK-B2` | Functional bundle `BANK-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BANK-BASIC` | Functional bundle `BANK-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BILLS` | Functional bundle `BILLS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BODY` | Functional bundle `BODY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-BUDGET` | Functional bundle `BUDGET` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CHAT-A2` | Functional bundle `CHAT-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COLLOQ-CONTROL` | Functional bundle `COLLOQ-CONTROL` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COMPARE` | Functional bundle `COMPARE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COMPARE-B2` | Functional bundle `COMPARE-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COMPLAINT` | Functional bundle `COMPLAINT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COMPLAINT-B1` | Functional bundle `COMPLAINT-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COMPLAINT-B2` | Functional bundle `COMPLAINT-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-COMPLAINT-WRITE` | Functional bundle `COMPLAINT-WRITE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CONSUMER` | Functional bundle `CONSUMER` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CONSUMER-B2` | Functional bundle `CONSUMER-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CONTRACT-B1` | Functional bundle `CONTRACT-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CONTRACT-B2` | Functional bundle `CONTRACT-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CONTRACT-BASIC` | Functional bundle `CONTRACT-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CRITICAL-READ` | Functional bundle `CRITICAL-READ` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-CV-ORAL` | Functional bundle `CV-ORAL` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-DEBATE-B2` | Functional bundle `DEBATE-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-DESCRIPTION` | Functional bundle `DESCRIPTION` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-DISCUSSION` | Functional bundle `DISCUSSION` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-DOCS` | Functional bundle `DOCS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-DOCS-B1` | Functional bundle `DOCS-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EMAIL-A2` | Functional bundle `EMAIL-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EMAIL-B1` | Functional bundle `EMAIL-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EMERGENCY-BASIC` | Functional bundle `EMERGENCY-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EVIDENCE` | Functional bundle `EVIDENCE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EXAM-ORAL-B1` | Functional bundle `EXAM-ORAL-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EXAM-ORAL-B2` | Functional bundle `EXAM-ORAL-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EXAM-WRITE-B1` | Functional bundle `EXAM-WRITE-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EXAM-WRITE-B2` | Functional bundle `EXAM-WRITE-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-EXPLAIN-B2` | Functional bundle `EXPLAIN-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FEEDBACK` | Functional bundle `FEEDBACK` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FEEDBACK-B2` | Functional bundle `FEEDBACK-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FOOD` | Functional bundle `FOOD` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FORMAL-B1` | Functional bundle `FORMAL-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FORMAL-B2` | Functional bundle `FORMAL-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FORMS` | Functional bundle `FORMS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-FORMS-A2` | Functional bundle `FORMS-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-GREETINGS` | Functional bundle `GREETINGS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HEALTH-LIMIT` | Functional bundle `HEALTH-LIMIT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HOUSING-A2` | Functional bundle `HOUSING-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HOUSING-B1` | Functional bundle `HOUSING-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HOUSING-B2` | Functional bundle `HOUSING-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HOUSING-BASIC` | Functional bundle `HOUSING-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HOUSING-FIX` | Functional bundle `HOUSING-FIX` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HYPOTHESIS` | Functional bundle `HYPOTHESIS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-HYPOTHESIS-B2` | Functional bundle `HYPOTHESIS-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-IDENTITY` | Functional bundle `IDENTITY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-INSTRUCTIONS` | Functional bundle `INSTRUCTIONS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-INSTRUCTIONS-A2` | Functional bundle `INSTRUCTIONS-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-INSTRUCTIONS-B1` | Functional bundle `INSTRUCTIONS-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-KINDER` | Functional bundle `KINDER` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-LETTER-B1` | Functional bundle `LETTER-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-LETTER-B2` | Functional bundle `LETTER-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MANIP-RESIST` | Functional bundle `MANIP-RESIST` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MED-A2` | Functional bundle `MED-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MED-B1` | Functional bundle `MED-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MED-B2` | Functional bundle `MED-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MEDIATION-B1` | Functional bundle `MEDIATION-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MEDIATION-B2` | Functional bundle `MEDIATION-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MEETING` | Functional bundle `MEETING` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-MONEY` | Functional bundle `MONEY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NARRATIVE-A2` | Functional bundle `NARRATIVE-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NARRATIVE-B1` | Functional bundle `NARRATIVE-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NEIGHBOR` | Functional bundle `NEIGHBOR` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NEIGHBOR-A2` | Functional bundle `NEIGHBOR-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NEIGHBOR-B1` | Functional bundle `NEIGHBOR-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NOTIFY` | Functional bundle `NOTIFY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-NUM-B1` | Functional bundle `NUM-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-OPINION-A2` | Functional bundle `OPINION-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PEOPLE` | Functional bundle `PEOPLE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PERSISTENCE` | Functional bundle `PERSISTENCE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PHARMA` | Functional bundle `PHARMA` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PHONE` | Functional bundle `PHONE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PHONE-A2` | Functional bundle `PHONE-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PHONE-B1` | Functional bundle `PHONE-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PHONE-B2` | Functional bundle `PHONE-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PLANNING` | Functional bundle `PLANNING` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-POLITENESS` | Functional bundle `POLITENESS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-POLITENESS-A2` | Functional bundle `POLITENESS-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PRAG-META` | Functional bundle `PRAG-META` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PRESENTATION` | Functional bundle `PRESENTATION` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PRIVACY-BASIC` | Functional bundle `PRIVACY-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PROCESS` | Functional bundle `PROCESS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-PUBLIC-SPEAK` | Functional bundle `PUBLIC-SPEAK` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REFUSAL` | Functional bundle `REFUSAL` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REFUSAL-A2` | Functional bundle `REFUSAL-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REFUSAL-B1` | Functional bundle `REFUSAL-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REFUSAL-B2` | Functional bundle `REFUSAL-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REGISTER-FLEX` | Functional bundle `REGISTER-FLEX` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REPAIR` | Functional bundle `REPAIR` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REPAIR-A2` | Functional bundle `REPAIR-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REPAIR-B2` | Functional bundle `REPAIR-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REQUEST` | Functional bundle `REQUEST` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REQUEST-A2` | Functional bundle `REQUEST-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REVIEW` | Functional bundle `REVIEW` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-REVIEW-B2` | Functional bundle `REVIEW-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-ROUTINE` | Functional bundle `ROUTINE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-RULES` | Functional bundle `RULES` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-RULES-B1` | Functional bundle `RULES-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHEDULING` | Functional bundle `SCHEDULING` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-A2` | Functional bundle `SCHOOL-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-B1` | Functional bundle `SCHOOL-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-B2` | Functional bundle `SCHOOL-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-BASIC` | Functional bundle `SCHOOL-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-MED` | Functional bundle `SCHOOL-MED` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-READ` | Functional bundle `SCHOOL-READ` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-WRITE` | Functional bundle `SCHOOL-WRITE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SCHOOL-WRITE-B2` | Functional bundle `SCHOOL-WRITE-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SERVICE` | Functional bundle `SERVICE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SETTLEMENT` | Functional bundle `SETTLEMENT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SHOP` | Functional bundle `SHOP` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SIGNS` | Functional bundle `SIGNS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SMALLTALK` | Functional bundle `SMALLTALK` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SMALLTALK-B2` | Functional bundle `SMALLTALK-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SMS` | Functional bundle `SMS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SOFTEN` | Functional bundle `SOFTEN` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-STANCE` | Functional bundle `STANCE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SUMMARY` | Functional bundle `SUMMARY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-SYNTHESIS` | Functional bundle `SYNTHESIS` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TIME` | Functional bundle `TIME` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TRANS-A2` | Functional bundle `TRANS-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TRANS-B1` | Functional bundle `TRANS-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TRANS-B2` | Functional bundle `TRANS-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TRANS-BASIC` | Functional bundle `TRANS-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TV-B1` | Functional bundle `TV-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TV-B2` | Functional bundle `TV-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-TV-SHIFT` | Functional bundle `TV-SHIFT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-URGENCY` | Functional bundle `URGENCY` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-URZAD-A2` | Functional bundle `URZAD-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-URZAD-B1` | Functional bundle `URZAD-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-URZAD-B2` | Functional bundle `URZAD-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-URZAD-BASIC` | Functional bundle `URZAD-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-URZAD-READ` | Functional bundle `URZAD-READ` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-A2` | Functional bundle `WORK-A2` для FN сценариев | A2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-B1` | Functional bundle `WORK-B1` для FN сценариев | B1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-B2` | Functional bundle `WORK-B2` для FN сценариев | B2 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-BASIC` | Functional bundle `WORK-BASIC` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-CONFLICT` | Functional bundle `WORK-CONFLICT` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-LEAVE` | Functional bundle `WORK-LEAVE` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |
| `LEX-WORK-RULES` | Functional bundle `WORK-RULES` для FN сценариев | A1 | PROD core + RECP shell; `CALIBRATION=required` |

### Правила bundle

1. Bundle ID стабилен; состав лемм версионируется в authoring (не в этом файле).
2. Rekcja и aspectual pairs хранятся на леммах внутри bundle.
3. L1 false friends помечаются на lemma-карточках и ERR-*.
