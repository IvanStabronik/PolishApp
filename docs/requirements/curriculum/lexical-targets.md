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

## LEX bundle registry (canonical, semantic)

Каждый `LEX-*` — **рабочий scope** для FN, не lemma-list и не норма CEFR. Размеры — `CALIBRATION=required`. Источник отбора: PRODUCT ANALYSIS (сценарии первой аудитории) + сверка тем Katalog A/B (Dz.U. 2025 poz. 217 zał. 1) как coverage checklist (`REQUIRES VERIFICATION` поклеточно).

### LEX-ADDRESS
- **Purpose:** Лексический scope для домена `IDENTITY` / сценариев `ADDRESS`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** имя, происхождение, семья, базовые характеристики
- **Required MWU (examples):** *nazywam się*, *mam na imię*, *jestem z*
- **Required FIX (examples):** *Dzień dobry*, *Miło mi*
- **Required COLL (examples):** *pochodzić z + Gen*
- **Related FN:** FN-A1-004
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ADDRESS-FORMS
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `ADDRESS-FORMS`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-B1-032
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ADVICE-A2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `ADVICE-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-043
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-AGREEMENT
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `AGREEMENT`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A1-037
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ANALYTIC
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `ANALYTIC`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-004
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-APOLOGY-B2
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `APOLOGY-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B2-038
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-APPEAL
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `APPEAL`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-B2-008
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-APPOINTMENT
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `APPOINTMENT`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A1-014
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ARGUMENT-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `ARGUMENT-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-036
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ARGUMENT-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `ARGUMENT-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-025
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ASPECT-PAIRS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `ASPECT-PAIRS`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-040
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ASSERTIVE
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `ASSERTIVE`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-030
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-AVAILABILITY
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `AVAILABILITY`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A1-026
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BADNEWS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `BADNEWS`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-045
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BANK-A2
- **Purpose:** Лексический scope для домена `BANK` / сценариев `BANK-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-A2-015, FN-A2-016
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BANK-B1
- **Purpose:** Лексический scope для домена `BANK` / сценариев `BANK-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-B1-018, FN-B1-019
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BANK-B2
- **Purpose:** Лексический scope для домена `BANK` / сценариев `BANK-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-B2-013
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BANK-BASIC
- **Purpose:** Лексический scope для домена `BANK` / сценариев `BANK-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-A1-030, FN-A1-031
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BILLS
- **Purpose:** Лексический scope для домена `BANK` / сценариев `BILLS`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-A2-041
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BODY
- **Purpose:** Лексический scope для домена `MED` / сценариев `BODY`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-A1-015
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-BUDGET
- **Purpose:** Лексический scope для домена `BANK` / сценариев `BUDGET`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-B1-048
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CHAT-A2
- **Purpose:** Лексический scope для домена `PHONE` / сценариев `CHAT-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** opening/closing, callback, message
- **Required MWU (examples):** *słucham*, *czy mogę rozmawiać z*, *proszę oddzwonić*
- **Required FIX (examples):** *Halo, tu …*
- **Required COLL (examples):** *zostawić wiadomość*
- **Related FN:** FN-A2-032
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COLLOQ-CONTROL
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `COLLOQ-CONTROL`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-024
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COMPARE
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `COMPARE`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-034
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COMPARE-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `COMPARE-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-014
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COMPLAINT
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `COMPLAINT`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-A2-017, FN-A2-018, FN-A2-027
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COMPLAINT-B1
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `COMPLAINT-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B1-014, FN-B1-020
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COMPLAINT-B2
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `COMPLAINT-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B2-010
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-COMPLAINT-WRITE
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `COMPLAINT-WRITE`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B1-028
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CONSUMER
- **Purpose:** Лексический scope для домена `SHOP` / сценариев `CONSUMER`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** zakup, płatność, reklamacja
- **Required MWU (examples):** *poproszę o*, *czy mogę zapłacić kartą*
- **Required FIX (examples):** *Paragon, proszę*
- **Required COLL (examples):** *zrobić reklamację*, *zwrócić towar*
- **Related FN:** FN-B1-053
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CONSUMER-B2
- **Purpose:** Лексический scope для домена `SHOP` / сценариев `CONSUMER-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** zakup, płatność, reklamacja
- **Required MWU (examples):** *poproszę o*, *czy mogę zapłacić kartą*
- **Required FIX (examples):** *Paragon, proszę*
- **Required COLL (examples):** *zrobić reklamację*, *zwrócić towar*
- **Related FN:** FN-B2-015
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CONTRACT-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `CONTRACT-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-007
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CONTRACT-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `CONTRACT-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-005
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CONTRACT-BASIC
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `CONTRACT-BASIC`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-006
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CRITICAL-READ
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `CRITICAL-READ`.
- **First use level:** B2
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-037
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-CV-ORAL
- **Purpose:** Лексический scope для домена `WORK` / сценариев `CV-ORAL`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-B1-003
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-DEBATE-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `DEBATE-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-003
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-DESCRIPTION
- **Purpose:** Лексический scope для домена `IDENTITY` / сценариев `DESCRIPTION`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** имя, происхождение, семья, базовые характеристики
- **Required MWU (examples):** *nazywam się*, *mam na imię*, *jestem z*
- **Required FIX (examples):** *Dzień dobry*, *Miło mi*
- **Required COLL (examples):** *pochodzić z + Gen*
- **Related FN:** FN-A2-042
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-DISCUSSION
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `DISCUSSION`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-042
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-DOCS
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `DOCS`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-A1-016, FN-A1-018
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-DOCS-B1
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `DOCS-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-B1-010
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EMAIL-A2
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `EMAIL-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-A2-031
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EMAIL-B1
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `EMAIL-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-B1-004, FN-B1-034
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EMERGENCY-BASIC
- **Purpose:** Лексический scope для домена `MED` / сценариев `EMERGENCY-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-A1-040
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EVIDENCE
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `EVIDENCE`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-048
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EXAM-ORAL-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `EXAM-ORAL-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-050
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EXAM-ORAL-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `EXAM-ORAL-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-034
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EXAM-WRITE-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `EXAM-WRITE-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-051
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EXAM-WRITE-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `EXAM-WRITE-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-035
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-EXPLAIN-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `EXPLAIN-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-028
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FEEDBACK
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `FEEDBACK`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B1-046
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FEEDBACK-B2
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `FEEDBACK-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B2-002
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FOOD
- **Purpose:** Лексический scope для домена `SHOP` / сценариев `FOOD`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** zakup, płatność, reklamacja
- **Required MWU (examples):** *poproszę o*, *czy mogę zapłacić kartą*
- **Required FIX (examples):** *Paragon, proszę*
- **Required COLL (examples):** *zrobić reklamację*, *zwrócić towar*
- **Related FN:** FN-A1-011
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FORMAL-B1
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `FORMAL-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-B1-008
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FORMAL-B2
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `FORMAL-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-B2-043
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FORMS
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `FORMS`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-A1-034
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-FORMS-A2
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `FORMS-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-A2-009
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-GREETINGS
- **Purpose:** Лексический scope для домена `TV` / сценариев `GREETINGS`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-A1-005, FN-A1-041
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HEALTH-LIMIT
- **Purpose:** Лексический scope для домена `MED` / сценариев `HEALTH-LIMIT`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-A2-038
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HOUSING-A2
- **Purpose:** Лексический scope для домена `HOUSING` / сценариев `HOUSING-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** ogłoszenie, umowa, czynsz, kaucja, usterki
- **Required MWU (examples):** *wynająć mieszkanie*, *płacić czynsz*, *kaucja zwrotna*
- **Required FIX (examples):** *Do wynajęcia*
- **Required COLL (examples):** *podpisać umowę*, *zgłosić usterkę*
- **Related FN:** FN-A2-004
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HOUSING-B1
- **Purpose:** Лексический scope для домена `HOUSING` / сценариев `HOUSING-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** ogłoszenie, umowa, czynsz, kaucja, usterki
- **Required MWU (examples):** *wynająć mieszkanie*, *płacić czynsz*, *kaucja zwrotna*
- **Required FIX (examples):** *Do wynajęcia*
- **Required COLL (examples):** *podpisać umowę*, *zgłosić usterkę*
- **Related FN:** FN-B1-006
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HOUSING-B2
- **Purpose:** Лексический scope для домена `HOUSING` / сценариев `HOUSING-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** ogłoszenie, umowa, czynsz, kaucja, usterki
- **Required MWU (examples):** *wynająć mieszkanie*, *płacić czynsz*, *kaucja zwrotna*
- **Required FIX (examples):** *Do wynajęcia*
- **Required COLL (examples):** *podpisać umowę*, *zgłosić usterkę*
- **Related FN:** FN-B2-006
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HOUSING-BASIC
- **Purpose:** Лексический scope для домена `HOUSING` / сценариев `HOUSING-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** ogłoszenie, umowa, czynsz, kaucja, usterki
- **Required MWU (examples):** *wynająć mieszkanie*, *płacić czynsz*, *kaucja zwrotna*
- **Required FIX (examples):** *Do wynajęcia*
- **Required COLL (examples):** *podpisać umowę*, *zgłosić usterkę*
- **Related FN:** FN-A1-003
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HOUSING-FIX
- **Purpose:** Лексический scope для домена `HOUSING` / сценариев `HOUSING-FIX`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** ogłoszenie, umowa, czynsz, kaucja, usterki
- **Required MWU (examples):** *wynająć mieszkanie*, *płacić czynsz*, *kaucja zwrotna*
- **Required FIX (examples):** *Do wynajęcia*
- **Required COLL (examples):** *podpisać umowę*, *zgłosić usterkę*
- **Related FN:** FN-A1-027, FN-A2-005
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HYPOTHESIS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `HYPOTHESIS`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-042
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-HYPOTHESIS-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `HYPOTHESIS-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-026
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-IDENTITY
- **Purpose:** Лексический scope для домена `IDENTITY` / сценариев `IDENTITY`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** имя, происхождение, семья, базовые характеристики
- **Required MWU (examples):** *nazywam się*, *mam na imię*, *jestem z*
- **Required FIX (examples):** *Dzień dobry*, *Miło mi*
- **Required COLL (examples):** *pochodzić z + Gen*
- **Related FN:** FN-A1-001, FN-A1-035
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-INSTRUCTIONS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `INSTRUCTIONS`.
- **First use level:** A1
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A1-042
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-INSTRUCTIONS-A2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `INSTRUCTIONS-A2`.
- **First use level:** A2
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-048
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-INSTRUCTIONS-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `INSTRUCTIONS-B1`.
- **First use level:** B1
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-044
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-KINDER
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `KINDER`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-A2-014
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-LETTER-B1
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `LETTER-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-B1-033
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-LETTER-B2
- **Purpose:** Лексический scope для домена `FORMAL` / сценариев `LETTER-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** email/pismo structure, attachments
- **Required MWU (examples):** *w odpowiedzi na*, *uprzejmie proszę o*
- **Required FIX (examples):** *Z poważaniem*, *Z wyrazami szacunku*
- **Required COLL (examples):** *przesłać dokumenty*
- **Related FN:** FN-B2-021
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MANIP-RESIST
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `MANIP-RESIST`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-045
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MED-A2
- **Purpose:** Лексический scope для домена `MED` / сценариев `MED-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-A2-010, FN-A2-037
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MED-B1
- **Purpose:** Лексический scope для домена `MED` / сценариев `MED-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-B1-012, FN-B1-013
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MED-B2
- **Purpose:** Лексический scope для домена `MED` / сценариев `MED-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-B2-009
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MEDIATION-B1
- **Purpose:** Лексический scope для домена `MED` / сценариев `MEDIATION-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-B1-037, FN-B1-038
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MEDIATION-B2
- **Purpose:** Лексический scope для домена `MED` / сценариев `MEDIATION-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-B2-018, FN-B2-027, FN-B2-041
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MEETING
- **Purpose:** Лексический scope для домена `WORK` / сценариев `MEETING`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-B1-002, FN-B1-025
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-MONEY
- **Purpose:** Лексический scope для домена `BANK` / сценариев `MONEY`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** konto, karta, przelew, opłaty
- **Required MWU (examples):** *otworzyć konto*, *zrobić przelew*, *limit karty*
- **Required FIX (examples):** *Proszę o wyciąg*
- **Required COLL (examples):** *doładować telefon*, *zablokować kartę*
- **Related FN:** FN-A1-009, FN-A1-036
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NARRATIVE-A2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `NARRATIVE-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-033
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NARRATIVE-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `NARRATIVE-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-035
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NEIGHBOR
- **Purpose:** Лексический scope для домена `NEIGHBOR` / сценариев `NEIGHBOR`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** sąsiedztwo, hałas, drobna prośba
- **Required MWU (examples):** *cisza nocna*, *wspólnota mieszkaniowa*
- **Required FIX (examples):** *Przepraszam za hałas*
- **Required COLL (examples):** *pożyczyć narzędzie*
- **Related FN:** FN-A1-039
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NEIGHBOR-A2
- **Purpose:** Лексический scope для домена `NEIGHBOR` / сценариев `NEIGHBOR-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** sąsiedztwo, hałas, drobna prośba
- **Required MWU (examples):** *cisza nocna*, *wspólnota mieszkaniowa*
- **Required FIX (examples):** *Przepraszam za hałas*
- **Required COLL (examples):** *pożyczyć narzędzie*
- **Related FN:** FN-A2-021, FN-A2-022
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NEIGHBOR-B1
- **Purpose:** Лексический scope для домена `NEIGHBOR` / сценариев `NEIGHBOR-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** sąsiedztwo, hałas, drobna prośba
- **Required MWU (examples):** *cisza nocna*, *wspólnota mieszkaniowa*
- **Required FIX (examples):** *Przepraszam za hałas*
- **Required COLL (examples):** *pożyczyć narzędzie*
- **Related FN:** FN-B1-024
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NOTIFY
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `NOTIFY`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-044
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-NUM-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `NUM-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-039
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-OPINION-A2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `OPINION-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-035
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PEOPLE
- **Purpose:** Лексический scope для домена `IDENTITY` / сценариев `PEOPLE`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** имя, происхождение, семья, базовые характеристики
- **Required MWU (examples):** *nazywam się*, *mam na imię*, *jestem z*
- **Required FIX (examples):** *Dzień dobry*, *Miło mi*
- **Required COLL (examples):** *pochodzić z + Gen*
- **Related FN:** FN-A2-047
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PERSISTENCE
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PERSISTENCE`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-049
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PHARMA
- **Purpose:** Лексический scope для домена `MED` / сценариев `PHARMA`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-A2-011
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PHONE
- **Purpose:** Лексический scope для домена `PHONE` / сценариев `PHONE`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** opening/closing, callback, message
- **Required MWU (examples):** *słucham*, *czy mogę rozmawiać z*, *proszę oddzwonić*
- **Required FIX (examples):** *Halo, tu …*
- **Required COLL (examples):** *zostawić wiadomość*
- **Related FN:** FN-A1-020, FN-A1-021
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PHONE-A2
- **Purpose:** Лексический scope для домена `PHONE` / сценариев `PHONE-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** opening/closing, callback, message
- **Required MWU (examples):** *słucham*, *czy mogę rozmawiać z*, *proszę oddzwonić*
- **Required FIX (examples):** *Halo, tu …*
- **Required COLL (examples):** *zostawić wiadomość*
- **Related FN:** FN-A2-023
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PHONE-B1
- **Purpose:** Лексический scope для домена `PHONE` / сценариев `PHONE-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** opening/closing, callback, message
- **Required MWU (examples):** *słucham*, *czy mogę rozmawiać z*, *proszę oddzwonić*
- **Required FIX (examples):** *Halo, tu …*
- **Required COLL (examples):** *zostawić wiadomość*
- **Related FN:** FN-B1-026, FN-B1-027
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PHONE-B2
- **Purpose:** Лексический scope для домена `PHONE` / сценариев `PHONE-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** opening/closing, callback, message
- **Required MWU (examples):** *słucham*, *czy mogę rozmawiać z*, *proszę oddzwonić*
- **Required FIX (examples):** *Halo, tu …*
- **Required COLL (examples):** *zostawić wiadomość*
- **Related FN:** FN-B2-020
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PLANNING
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PLANNING`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-054
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-POLITENESS
- **Purpose:** Лексический scope для домена `TV` / сценариев `POLITENESS`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-A1-024, FN-A1-025
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-POLITENESS-A2
- **Purpose:** Лексический scope для домена `TV` / сценариев `POLITENESS-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-A2-028
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PRAG-META
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PRAG-META`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-049
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PRESENTATION
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PRESENTATION`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-046
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PRIVACY-BASIC
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PRIVACY-BASIC`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-040
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PROCESS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PROCESS`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-030
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-PUBLIC-SPEAK
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `PUBLIC-SPEAK`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-019
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REFUSAL
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `REFUSAL`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-A1-023
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REFUSAL-A2
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `REFUSAL-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-A2-026
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REFUSAL-B1
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `REFUSAL-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B1-021
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REFUSAL-B2
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `REFUSAL-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-B2-016
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REGISTER-FLEX
- **Purpose:** Лексический scope для домена `TV` / сценариев `REGISTER-FLEX`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-B2-022
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REPAIR
- **Purpose:** Лексический scope для домена `REPAIR` / сценариев `REPAIR`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** niezrozumienie, powtórzenie, parafraza
- **Required MWU (examples):** *nie rozumiem*, *proszę powtórzyć*, *proszę mówić wolniej*
- **Required FIX (examples):** *Jak to się pisze?*
- **Required COLL (examples):** *znaczyć + Acc*
- **Related FN:** FN-A1-007, FN-A1-008
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REPAIR-A2
- **Purpose:** Лексический scope для домена `REPAIR` / сценариев `REPAIR-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** niezrozumienie, powtórzenie, parafraza
- **Required MWU (examples):** *nie rozumiem*, *proszę powtórzyć*, *proszę mówić wolniej*
- **Required FIX (examples):** *Jak to się pisze?*
- **Required COLL (examples):** *znaczyć + Acc*
- **Related FN:** FN-A2-024
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REPAIR-B2
- **Purpose:** Лексический scope для домена `REPAIR` / сценариев `REPAIR-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** niezrozumienie, powtórzenie, parafraza
- **Required MWU (examples):** *nie rozumiem*, *proszę powtórzyć*, *proszę mówić wolniej*
- **Required FIX (examples):** *Jak to się pisze?*
- **Required COLL (examples):** *znaczyć + Acc*
- **Related FN:** FN-B2-032
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REQUEST
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `REQUEST`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-A1-022
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REQUEST-A2
- **Purpose:** Лексический scope для домена `COMPLAINT` / сценариев `REQUEST-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** problem, żądanie, termin
- **Required MWU (examples):** *chciałbym złożyć reklamację*, *nie działa*
- **Required FIX (examples):** *Wnoszę reklamację*
- **Required COLL (examples):** *żądać naprawy / zwrotu*
- **Related FN:** FN-A2-025
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REVIEW
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `REVIEW`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-043
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-REVIEW-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `REVIEW-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-047
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-ROUTINE
- **Purpose:** Лексический scope для домена `IDENTITY` / сценариев `ROUTINE`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** имя, происхождение, семья, базовые характеристики
- **Required MWU (examples):** *nazywam się*, *mam na imię*, *jestem z*
- **Required FIX (examples):** *Dzień dobry*, *Miło mi*
- **Required COLL (examples):** *pochodzić z + Gen*
- **Related FN:** FN-A1-032
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-RULES
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `RULES`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-036
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-RULES-B1
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `RULES-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-041
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHEDULING
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SCHEDULING`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-045
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-A2
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-A2-012, FN-A2-013
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-B1
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-B1-015
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-B2
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-B2-011
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-BASIC
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-A1-028, FN-A1-029
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-MED
- **Purpose:** Лексический scope для домена `MED` / сценариев `SCHOOL-MED`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** objawy, wizyta, recepta, apteka
- **Required MWU (examples):** *boli mnie*, *umówić wizytę*, *wypisać receptę*
- **Required FIX (examples):** *Czy jest wolny termin?*
- **Required COLL (examples):** *przyjmować lek*, *mieć objawy*
- **Related FN:** FN-B1-047
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-READ
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-READ`.
- **First use level:** B1
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-B1-017
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-WRITE
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-WRITE`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-B1-016
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SCHOOL-WRITE-B2
- **Purpose:** Лексический scope для домена `SCHOOL` / сценариев `SCHOOL-WRITE-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** nieobecność, wychowawca, przedszkole/szkoła
- **Required MWU (examples):** *usprawiedliwić nieobecność*, *zebrać rodziców*
- **Required FIX (examples):** *Uprzejmie informuję, że*
- **Required COLL (examples):** *odebrać dziecko*, *mieć alergię*
- **Related FN:** FN-B2-012
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SERVICE
- **Purpose:** Лексический scope для домена `SHOP` / сценариев `SERVICE`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** zakup, płatność, reklamacja
- **Required MWU (examples):** *poproszę o*, *czy mogę zapłacić kartą*
- **Required FIX (examples):** *Paragon, proszę*
- **Required COLL (examples):** *zrobić reklamację*, *zwrócić towar*
- **Related FN:** FN-A1-006
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SETTLEMENT
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SETTLEMENT`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-039
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SHOP
- **Purpose:** Лексический scope для домена `SHOP` / сценариев `SHOP`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** zakup, płatność, reklamacja
- **Required MWU (examples):** *poproszę o*, *czy mogę zapłacić kartą*
- **Required FIX (examples):** *Paragon, proszę*
- **Required COLL (examples):** *zrobić reklamację*, *zwrócić towar*
- **Related FN:** FN-A1-010
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SIGNS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SIGNS`.
- **First use level:** A1
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A1-038
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SMALLTALK
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SMALLTALK`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-039
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SMALLTALK-B2
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SMALLTALK-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-029
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SMS
- **Purpose:** Лексический scope для домена `PHONE` / сценариев `SMS`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** opening/closing, callback, message
- **Required MWU (examples):** *słucham*, *czy mogę rozmawiać z*, *proszę oddzwonić*
- **Required FIX (examples):** *Halo, tu …*
- **Required COLL (examples):** *zostawić wiadomość*
- **Related FN:** FN-A1-019
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SOFTEN
- **Purpose:** Лексический scope для домена `TV` / сценариев `SOFTEN`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-B1-029
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-STANCE
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `STANCE`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-031
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SUMMARY
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SUMMARY`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B1-055
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-SYNTHESIS
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `SYNTHESIS`.
- **First use level:** B2
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-B2-033
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TIME
- **Purpose:** Лексический scope для домена `IDENTITY` / сценариев `TIME`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** имя, происхождение, семья, базовые характеристики
- **Required MWU (examples):** *nazywam się*, *mam na imię*, *jestem z*
- **Required FIX (examples):** *Dzień dobry*, *Miło mi*
- **Required COLL (examples):** *pochodzić z + Gen*
- **Related FN:** FN-A1-033
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TRANS-A2
- **Purpose:** Лексический scope для домена `TRANS` / сценариев `TRANS-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** bilet, dojazd, opóźnienie
- **Required MWU (examples):** *biletomat*, *przesiadka*, *spóźniony autobus*
- **Required FIX (examples):** *Jedzie do centrum?*
- **Required COLL (examples):** *skasować bilet*, *dojechać do pracy*
- **Related FN:** FN-A2-019, FN-A2-020
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TRANS-B1
- **Purpose:** Лексический scope для домена `TRANS` / сценариев `TRANS-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** bilet, dojazd, opóźnienie
- **Required MWU (examples):** *biletomat*, *przesiadka*, *spóźniony autobus*
- **Required FIX (examples):** *Jedzie do centrum?*
- **Required COLL (examples):** *skasować bilet*, *dojechać do pracy*
- **Related FN:** FN-B1-022, FN-B1-023
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TRANS-B2
- **Purpose:** Лексический scope для домена `TRANS` / сценариев `TRANS-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** bilet, dojazd, opóźnienie
- **Required MWU (examples):** *biletomat*, *przesiadka*, *spóźniony autobus*
- **Required FIX (examples):** *Jedzie do centrum?*
- **Required COLL (examples):** *skasować bilet*, *dojechać do pracy*
- **Related FN:** FN-B2-017
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TRANS-BASIC
- **Purpose:** Лексический scope для домена `TRANS` / сценариев `TRANS-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** bilet, dojazd, opóźnienie
- **Required MWU (examples):** *biletomat*, *przesiadka*, *spóźniony autobus*
- **Required FIX (examples):** *Jedzie do centrum?*
- **Required COLL (examples):** *skasować bilet*, *dojechać do pracy*
- **Related FN:** FN-A1-012, FN-A1-013
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TV-B1
- **Purpose:** Лексический scope для домена `TV` / сценариев `TV-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-B1-031
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TV-B2
- **Purpose:** Лексический scope для домена `TV` / сценариев `TV-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-B2-023
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-TV-SHIFT
- **Purpose:** Лексический scope для домена `TV` / сценариев `TV-SHIFT`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** pan/pani, ty, wołacz usług
- **Required MWU (examples):** *przejść na ty*, *mówić panu/pani*
- **Required FIX (examples):** *Możemy mówić sobie na ty?*
- **Required COLL (examples):** *zwracać się per pan*
- **Related FN:** FN-A2-029, FN-A2-030
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-URGENCY
- **Purpose:** Лексический scope для домена `DEFAULT` / сценариев `URGENCY`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** сценарийный минимум по связанным FN
- **Required MWU (examples):** *na przykład*
- **Required FIX (examples):** —
- **Required COLL (examples):** —
- **Related FN:** FN-A2-046
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-URZAD-A2
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `URZAD-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-A2-007, FN-A2-008
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-URZAD-B1
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `URZAD-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-B1-009
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-URZAD-B2
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `URZAD-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-B2-007
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-URZAD-BASIC
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `URZAD-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-A1-017
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-URZAD-READ
- **Purpose:** Лексический scope для домена `URZAD` / сценариев `URZAD-READ`.
- **First use level:** B1
- **Ownership:** receptive-primary (productive optional)
- **Thematic subgroups:** wniosek, wizyta, dokumenty, status sprawy
- **Required MWU (examples):** *złożyć wniosek*, *umówić wizytę*, *odebrać dokumenty*
- **Required FIX (examples):** *Proszę o informację*, *W załączeniu przesyłam*
- **Required COLL (examples):** *wypełnić formularz*, *okazać dokument*
- **Related FN:** FN-B1-011
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-A2
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-A2`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-A2-001
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-B1
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-B1`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-B1-001
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-B2
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-B2`.
- **First use level:** B2
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-B2-001
- **Size orientation:** 50–120 lemmas + 15–40 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-BASIC
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-BASIC`.
- **First use level:** A1
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-A1-002
- **Size orientation:** 15–40 lemmas + 5–12 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-CONFLICT
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-CONFLICT`.
- **First use level:** B1
- **Ownership:** productive in priority domains; receptive elsewhere
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-B1-005
- **Size orientation:** 40–90 lemmas + 12–30 MWU/COLL (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-LEAVE
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-LEAVE`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-A2-002, FN-A2-040
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION

### LEX-WORK-RULES
- **Purpose:** Лексический scope для домена `WORK` / сценариев `WORK-RULES`.
- **First use level:** A2
- **Ownership:** productive core + receptive shell
- **Thematic subgroups:** должность, график, обязанности, неявка, BHP-минимум
- **Required MWU (examples):** *iść do pracy*, *mieć dyżur*, *wziąć wolne*
- **Required FIX (examples):** *Z poważaniem*
- **Required COLL (examples):** *wykonywać obowiązki*, *zgłosić nieobecność*
- **Related FN:** FN-A2-003
- **Size orientation:** 25–60 lemmas + 8–20 MWU/FIX (`CALIBRATION=required`; не норма CEFR)
- **Rekcja / aspect / register:** Хранить rekcja на lemma/COLL внутри bundle; не дублировать весь GR-REK. Видовые пары помечать ASPECT-PAIR; на A1 чаще LEX без свободного выбора. TV/formal FIX обязательны, если bundle обслуживает URZAD/MED/FORMAL.
- **Selection source:** PRODUCT ANALYSIS + Katalog A/B theme check — Medium; cell mapping REQUIRES VERIFICATION
