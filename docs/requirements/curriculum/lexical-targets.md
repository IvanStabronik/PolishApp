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
| 2026-09-05 | A1 LEX: консолидация в `LEX-A1-*` semantic reference; legacy A1 micro-packs сняты |

## A1 LEX bundles (semantic reference)

**Статус:** A1 semantic reference slice — candidate for human / JPJO review.
**Не** полное lemma-list издание и **не** норма CEFR.
**A2–B2 LEX:** не объявлены готовыми; см. legacy registry ниже.

Консолидированные пакеты «функция + домен / группа сценариев». Старые A1 микропакеты (`LEX-IDENTITY`, `LEX-SHOP`, …) сняты из рабочего контура A1 и не должны использоваться в новых FN/SCN.

**Счётчик A1 bundles:** 21

### LEX-A1-IDENTITY
- **Purpose:** Представиться и описать базовую идентичность: имя, происхождение, язык, город проживания — не адрес и не профессия.
- **First level:** A1
- **Ownership:** productive core (имя/страна/город/язык); receptive shell (гражданство, национальность в анкете)
- **Thematic subgroups:** имя и фамилия; страна / город происхождения; язык L1; краткая самоидентификация
- **Minimal lemmas (PROD/RECP mix):** *imię*, *nazwisko*, *nazywać się*, *pochodzić*, *kraj*, *miasto*, *język*, *Ukraina*, *Polska*, *Rosja*, *Białoruś*, *obywatel*, *narodowość*, *mieszkać*, *być*
- **MWU:** *nazywam się…*, *mam na imię…*, *jestem z…*, *mówię po…*
- **FIX:** *Miło mi.*, *Bardzo mi miło.*
- **COLL:** *pochodzić z + Gen*, *mówić po + Loc*
- **Rekcja (bundle-specific):** *nazywać się* без объекта в Nom после себя; *pochodzić z + Gen*; *mieszkać w + Loc* (город).
- **Aspect notes:** Аспект не exit: *zamieszkać* остаётся RECP; продуктивно *mieszkać / jestem*.
- **Register:** neutral + mild formal при первом контакте; *ty* только после сигнала собеседника.
- **Related FN:** FN-A1-IDENTIFY-01, FN-A1-IDENTIFY-02
- **Related SCN:** SCN-A1-EVERYDAY-01, SCN-A1-FORM-01, SCN-A1-NEIGHBOR-01
- **Selection source:** PRODUCT ANALYSIS (первая аудитория) + CEFR A1 self-identification (качественно; REQUIRES VERIFICATION scale row)
- **L1 risks — UKR:** Калька *У мене на ім'я* → *\*U mnie na imię*; путаница *język* / *мова*.
- **L1 risks — RUS:** *Меня зовут* → *\*Mienia zowut* / пропуск *się*; *из Украины* → *\*z Ukrainy* ok, но *\*ja z Ukraina* без падежа.
- **L1 risks — BEL:** Аканне в письме имён/топонимов; *ў* в транслите фамилий.

### LEX-A1-WORK
- **Purpose:** Назвать профессию, место работы и простой график; спросить то же у собеседника.
- **First level:** A1
- **Ownership:** productive core (zawód, praca, firma); receptive (umowa o pracę, etat)
- **Thematic subgroups:** профессии; место работы; смена/график; коллеги (минимум)
- **Minimal lemmas (PROD/RECP mix):** *praca*, *pracować*, *zawód*, *firma*, *biuro*, *fabryka*, *sklep*, *szpital*, *kolega*, *koleżanka*, *szef*, *zmiana*, *grafik*, *etat*, *urlop*
- **MWU:** *pracuję w…*, *jestem + Ins (zawód)*, *mam zmianę*, *idę do pracy*
- **FIX:** *Czym się pan / pani zajmuje?*, *A pan / pani?*
- **COLL:** *pracować w + Loc*, *pracować jako + Nom*
- **Rekcja (bundle-specific):** *pracować w + Loc* (место); *pracować jako + Nom*; predicative *jestem nauczycielem* (Ins) — связка с GR-CAS-INS-01.
- **Aspect notes:** *pracować* vs *przepracować* — пара ASPECT-PAIR, выбор не требуется на A1.
- **Register:** neutral service/work; *szef* colloquial RECP; к начальству — pan/pani.
- **Related FN:** FN-A1-IDENTIFY-02, FN-A1-NARRATE-01, FN-A1-REQUEST-01
- **Related SCN:** SCN-A1-WORK-01, SCN-A1-EVERYDAY-01
- **Selection source:** PRODUCT ANALYSIS DOM-WORK + Katalog A/B theme praca (REQUIRES VERIFICATION cell)
- **L1 risks — UKR:** *Я працюю вчителем* → забывают Ins (*\*Jestem nauczyciel*); *na роботі* → *\*na robocie* калька.
- **L1 risks — RUS:** *Я работаю учителем* близко, но *в фирме* → *\*w firma*; *график* false friend vs *grafik*.
- **L1 risks — BEL:** Смешение *praca/robota*; аканне в *\*kalega*.

### LEX-A1-HOUSING
- **Purpose:** Сказать, где живёт / снимает, тип жилья и простая оценка состояния (без полного адреса).
- **First level:** A1
- **Ownership:** productive core (mieszkanie, wynajem, pokój); receptive (kaucja, czynsz details)
- **Thematic subgroups:** тип жилья; найм vs собственность; комнаты; простые проблемы (указатель на REPORT)
- **Minimal lemmas (PROD/RECP mix):** *mieszkanie*, *dom*, *pokój*, *wynająć*, *wynajem*, *właściciel*, *kaucja*, *czynsz*, *kuchnia*, *łazienka*, *balkon*, *piętro*, *lokal*, *umowa*
- **MWU:** *mieszkam w…*, *wynajmuję mieszkanie*, *mam pokój*, *to jest moje mieszkanie*
- **FIX:** *Szukam mieszkania.*, *Czy jest wolny pokój?*
- **COLL:** *wynajmować + Acc*, *mieszkać u + Gen*
- **Rekcja (bundle-specific):** *mieszkać w + Loc*; *wynajmować mieszkanie* (Acc); *mieszkać u kogoś* (Gen).
- **Aspect notes:** *wynająć* (dok) vs *wynajmować* (niedok) — учить как пару; A1 продуктивно одна форма по скрипту.
- **Register:** neutral; объявления — slightly formal RECP (*lokal użytkowy*).
- **Related FN:** FN-A1-LOCATE-01, FN-A1-REPORT-01, FN-A1-ASK-01
- **Related SCN:** SCN-A1-HOUSING-01
- **Selection source:** PRODUCT ANALYSIS DOM-HOUSING; Katalog A/B mieszkanie (REQUIRES VERIFICATION)
- **L1 risks — UKR:** *квартира* → *\*kwartyra*; *знімати* → *\*znimać* вместо *wynajmować*.
- **L1 risks — RUS:** *снимать квартиру* → *\*sniąć*; *этаж* путают с *piętro/parter*.
- **L1 risks — BEL:** *хата* → overuse *chata*; аканне *\*malako* рядом в быту письма.

### LEX-A1-ADDRESS
- **Purpose:** Диктовать и понимать польский адрес: улица, номер дома, квартира, этаж, город, код — не самопрезентация по имени.
- **First level:** A1
- **Ownership:** productive core (ulica, numer, miasto, piętro); receptive (kod pocztowy format, województwo)
- **Thematic subgroups:** улица и номер; квартира и этаж; город и код; диктовка по слогам/цифрам
- **Minimal lemmas (PROD/RECP mix):** *adres*, *ulica*, *aleja*, *plac*, *numer*, *dom*, *mieszkanie*, *piętro*, *parter*, *miasto*, *kod*, *pocztowy*, *budynek*, *klatka*, *skrzynka*
- **MWU:** *mieszkam przy ulicy…*, *numer domu…*, *numer mieszkania…*, *kod pocztowy…*
- **FIX:** *Proszę powtórzyć adres.*, *Literuję: …*
- **COLL:** *ulica + Nazwa*, *pod numerem + Num*, *na piętrze + Ord*
- **Rekcja (bundle-specific):** *mieszkać przy ulicy + Gen/Loc по формуле*; *na + Ord + piętrze* (Loc); диктовка цифр через GR-NUM-CARD-*.
- **Aspect notes:** Нет видового выбора; глаголы *podać / podawać adres* — FIX-скрипт.
- **Register:** official/neutral (urzęd, kurier, lekarz); slow dictation допустим.
- **Related FN:** FN-A1-LOCATE-02, FN-A1-FORM-01, FN-A1-PHONE-01
- **Related SCN:** SCN-A1-HOUSING-01, SCN-A1-FORM-01, SCN-A1-URZAD-01, SCN-A1-PHONE-01
- **Selection source:** PRODUCT ANALYSIS (доставка, urząd, przychodnia) + form fields Katalog (REQUIRES VERIFICATION)
- **L1 risks — UKR:** Порядок *вулиця → дом → кв.* vs PL *ul. X 12/4*; *поверх* ≠ *piętro* нумерация.
- **L1 risks — RUS:** *улица Ленина дом 5* без *ul.* / падежа; *квартира* → *\*kwartira*.
- **L1 risks — BEL:** Транслит кириллических названий улиц; путаница *дом/будынак*.

### LEX-A1-GREETINGS
- **Purpose:** Открыть и закрыть контакт в бытовом и официальном регистре; выбрать формулу под время суток и T–V.
- **First level:** A1
- **Ownership:** productive core (dzień dobry, do widzenia, cześć); receptive (serwus, hej)
- **Thematic subgroups:** приветствия по времени; прощания; T–V выбор; соседский минимум
- **Minimal lemmas (PROD/RECP mix):** *dzień*, *dobry*, *wieczór*, *cześć*, *witam*, *pa*, *żegnaj*, *do*, *widzenia*, *miło*, *pan*, *pani*, *sąsiad*, *sąsiadka*
- **MWU:** *dzień dobry*, *dobry wieczór*, *do widzenia*, *miło pana / panią widzieć*
- **FIX:** *Dzień dobry, panie Kowalski.*, *Do widzenia.*, *Cześć!*
- **COLL:** *powitać kogoś*, *pożegnać się z + Ins*
- **Rekcja (bundle-specific):** Wołacz имён + *panie/pani* (связь GR-CAS-VOC-01); после приветствия — 3 л. при pan/pani.
- **Aspect notes:** Не применимо к FIX; *powitać* RECP.
- **Register:** official (*dzień dobry*) vs colloquial (*cześć*); запрет *cześć* в urzędzie.
- **Related FN:** FN-A1-GREET-01, FN-A1-REG-01, FN-A1-ADDRESS-01
- **Related SCN:** SCN-A1-EVERYDAY-01, SCN-A1-NEIGHBOR-01, SCN-A1-WORK-01, SCN-A1-URZAD-01
- **Selection source:** PED-010 T–V; PRODUCT ANALYSIS first contact
- **L1 risks — UKR:** *Добрий день* → гиперкоррект *\*Dobry dzień* порядок; *пані* без wołacz.
- **L1 risks — RUS:** *Здравствуйте* → *\*Zdrastwujcie*; *пока* → *\*poka* вместо *pa/do widzenia*.
- **L1 risks — BEL:** Смешение *добры дзень* калек; ложная уверенность в мягкости приветствий.

### LEX-A1-REPAIR
- **Purpose:** Починить сбой понимания: повторить, медленнее, пояснить слово — не ремонт квартиры.
- **First level:** A1
- **Ownership:** productive core (all FIX ниже); receptive (parafrasу на A2)
- **Thematic subgroups:** просьба повторить; темп речи; непонимание; перевод ключевого слова
- **Minimal lemmas (PROD/RECP mix):** *powtórzyć*, *wolniej*, *zrozumieć*, *rozumieć*, *słowo*, *znaczenie*, *tłumaczyć*, *jeszcze*, *raz*, *proszę*, *nie*, *jasny*, *głośniej*
- **MWU:** *proszę powtórzyć*, *mówi pan / pani za szybko*, *nie rozumiem*, *co znaczy…?*
- **FIX:** *Proszę mówić wolniej.*, *Czy może pan / pani powtórzyć?*
- **COLL:** *nie rozumieć + Gen* (редко) / чаще *nie rozumiem*; *znaczyć + Nom*
- **Rekcja (bundle-specific):** Formulaic IMP exposure без системного GR-MOD-IMP-01; *prosić o + Acc* (*proszę o powtórzenie*).
- **Aspect notes:** *powtórzyć* (dok) в просьбе; *powtarzać* RECP.
- **Register:** official soft (*czy może pan…*) + neutral; грубое *co?* — avoid в службе.
- **Related FN:** FN-A1-REPAIR-01, FN-A1-REPAIR-02
- **Related SCN:** SCN-A1-PHONE-01, SCN-A1-URZAD-01, SCN-A1-EVERYDAY-01, SCN-A1-MED-01
- **Selection source:** PED-010 repair strategies; PRODUCT ANALYSIS phone/urzęd load
- **L1 risks — UKR:** *Що?* резко; *повторіть* → забывают *proszę*; *розумію* ≠ *rozumiem* формы.
- **L1 risks — RUS:** *Что-что?* / *Ещё раз* без вежливости; *не понимаю* → *\*nie ponimaju*.
- **L1 risks — BEL:** Дзеканье маскирует, что слово не распознано; меньше метакоммуникации.

### LEX-A1-MONEY
- **Purpose:** Цены, количество, сдача и способ оплаты в короткой транзакции.
- **First level:** A1
- **Ownership:** productive core (ile, kosztować, złoty, reszta, karta); receptive (przelew w sklepie rare)
- **Thematic subgroups:** цены; количества; наличные/карта; сдача
- **Minimal lemmas (PROD/RECP mix):** *cena*, *kosztować*, *złoty*, *grosz*, *reszta*, *gotówka*, *karta*, *płatność*, *rachunek*, *paragon*, *tanio*, *drogo*, *kwota*, *zapłacić*, *płacić*
- **MWU:** *ile to kosztuje?*, *płacę kartą*, *poproszę o paragon*, *to będzie… złotych*
- **FIX:** *Ile płacę?*, *Czy mogę zapłacić kartą?*
- **COLL:** *kosztować + Acc/Num*, *płacić + Ins* (*kartą*), *prosić o rachunek*
- **Rekcja (bundle-specific):** *kosztować* + цена; *płacić kartą/gotówką* (Ins); Gen после 5+ (*pięć złotych*) — GR-NUM-CARD-05.
- **Aspect notes:** *zapłacić* vs *płacić* — скриптовый выбор (касса = dok часто).
- **Register:** neutral service; *paragon fiskalny* RECP official.
- **Related FN:** FN-A1-QUANT-01, FN-A1-TRANS-01
- **Related SCN:** SCN-A1-SHOP-01, SCN-A1-FOOD-01, SCN-A1-TICKET-01, SCN-A1-BANK-01
- **Selection source:** PRODUCT ANALYSIS shop/bank cash; Katalog liczby/pieniądze (REQUIRES VERIFICATION)
- **L1 risks — UKR:** *Скільки коштує* → *\*Skilky*; *здача* → *\*zdacza*; числа 5+ без Gen.
- **L1 risks — RUS:** *Сколько стоит* → *\*Skolko stoit*; *сдача* / *остаток*; *рубль* интерференция.
- **L1 risks — BEL:** Аканне в суммах на письме; *грошы* → *\*groszy* путаница с *grosz*.

### LEX-A1-SERVICE
- **Purpose:** Общий лексический каркас транзакции услуги: выбор, заказ, подтверждение — для sklep / jedzenie / bilet.
- **First level:** A1
- **Ownership:** productive core (poproszę, dawać, brać, zamówić); receptive (rezerwacja details)
- **Thematic subgroups:** выбор товара/услуги; заказ; подтверждение; вежливое обслуживание
- **Minimal lemmas (PROD/RECP mix):** *sklep*, *kasjer*, *zamówić*, *poproszę*, *dawać*, *brać*, *produkt*, *usługa*, *kawa*, *herbata*, *bilet*, *porcja*, *menu*, *wybór*, *gotowe*
- **MWU:** *poproszę + Acc*, *dla mnie…*, *to wszystko*, *czy mogę zamówić…?*
- **FIX:** *W czym mogę pomóc?*, *Proszę bardzo.*, *Oto pani / pana…*
- **COLL:** *zamówić + Acc*, *podać + Acc*, *wybrać + Acc*
- **Rekcja (bundle-specific):** *poproszę o + Acc* / *poproszę + Acc*; *zamówić kawę*; pan/pani + 3 л. в службе (FN-A1-ADDRESS-01).
- **Aspect notes:** *wziąć / brać*, *zamówić / zamawiać* — скрипт фиксирует одну форму на реплику.
- **Register:** service-official soft; *daj* colloquial avoid с кассиром-незнакомцем.
- **Related FN:** FN-A1-TRANS-01, FN-A1-ASK-01, FN-A1-ADDRESS-01, FN-A1-CONFIRM-01
- **Related SCN:** SCN-A1-SHOP-01, SCN-A1-FOOD-01, SCN-A1-TICKET-01
- **Selection source:** PRODUCT ANALYSIS shared transaction frame (shop/food/ticket ≠ 3 FNs)
- **L1 risks — UKR:** *Дайте* резко; *можна* → *\*można kawa*; *замовити* формы.
- **L1 risks — RUS:** *Можно мне* → *\*Możno mnie*; *дайте пожалуйста* без *poproszę*.
- **L1 risks — BEL:** Калька *дайце*; регистр *ты* в кассе по привычке.

### LEX-A1-TRANSPORT
- **Purpose:** Ориентиры в городе, остановки, билет и время отправления — без полного маршрутного планирования B1.
- **First level:** A1
- **Ownership:** productive core (autobus, przystanek, bilet, godzina); receptive (przesiadka, rozkład PDF)
- **Thematic subgroups:** виды транспорта; направление; билет; время отправления
- **Minimal lemmas (PROD/RECP mix):** *autobus*, *tramwaj*, *pociąg*, *metro*, *przystanek*, *stacja*, *bilet*, *dojść*, *dojechać*, *skręcić*, *prosto*, *blisko*, *daleko*, *rozkład*, *odjazd*
- **MWU:** *jak dojechać do…?*, *gdzie jest przystanek?*, *bilet ulgowy*, *o której odjeżdża…?*
- **FIX:** *Proszę bilet do…*, *Czy ten autobus jedzie do…?*
- **COLL:** *dojechać do + Gen*, *wysiąść na + Loc*, *czekać na + Acc*
- **Rekcja (bundle-specific):** *iść / jechać do + Gen*; *czekać na autobus*; *na przystanku* (Loc).
- **Aspect notes:** *dojechać* (dok) vs *dojeżdżać*; A1 — одна целевая форма в скрипте направления.
- **Register:** neutral; biletomat instructions — RECP + FN-A1-READ-01.
- **Related FN:** FN-A1-DIRECT-01, FN-A1-TRANS-01, FN-A1-TIME-01, FN-A1-ASK-01
- **Related SCN:** SCN-A1-DIRECTIONS-01, SCN-A1-TICKET-01
- **Selection source:** PRODUCT ANALYSIS DOM-TRANS; Katalog komunikacja (REQUIRES VERIFICATION)
- **L1 risks — UKR:** *Їхати на автобусі* → *\*jechać na autobusie* vs *autobusem*; *зупинка* → *\*zupinka*.
- **L1 risks — RUS:** *на автобусе* Ins путают; *билет* ok, но *доехать до* Gen.
- **L1 risks — BEL:** ERR-BEL-10 тип направления; аканне в названиях остановок на письме.

### LEX-A1-HEALTH
- **Purpose:** Симптомы, запись к врачу и базовая просьба о помощи при боли — не полная история болезни.
- **First level:** A1
- **Ownership:** productive core (boli, głowa, gorączka, wizyta); receptive (recepta details, NFZ jargon)
- **Thematic subgroups:** части тела; симптомы; запись; срочность
- **Minimal lemmas (PROD/RECP mix):** *boli*, *ból*, *głowa*, *gardło*, *brzuch*, *gorączka*, *kaszel*, *lekarz*, *przychodnia*, *wizyta*, *recepta*, *apteka*, *pilne*, *chory*, *temperatura*
- **MWU:** *boli mnie + Nom/Acc body*, *mam gorączkę*, *chcę się zapisać*, *potrzebuję lekarza*
- **FIX:** *Proszę o wizytę.*, *To pilne.*
- **COLL:** *boleć + Acc experiencer* (*boli mnie głowa*), *zapisać się do + Gen*
- **Rekcja (bundle-specific):** *boli mnie głowa*; *zapisać się do lekarza*; *iść do przychodni* (Gen).
- **Aspect notes:** *zachorować* RECP; продуктивно состояния (*boli / mam*).
- **Register:** neutral→official в rejestracji; emergency — short urgent FIX.
- **Related FN:** FN-A1-HEALTH-01, FN-A1-APPOINT-01, FN-A1-HELP-01
- **Related SCN:** SCN-A1-MED-01, SCN-A1-EMERGENCY-01
- **Selection source:** PRODUCT ANALYSIS DOM-MED; Katalog zdrowie (REQUIRES VERIFICATION)
- **L1 risks — UKR:** *У мене болить голова* → *\*U mnie boli głowa* vs *boli mnie*; части тела род.
- **L1 risks — RUS:** *У меня болит* калька; *температура* ok; *врач* → *\*wrać*.
- **L1 risks — BEL:** Аканне в *\*galawa*; ложная мягкость симптомов.

### LEX-A1-HELP
- **Purpose:** Попросить и предложить помощь в быту, на работе и в экстренном минимуме.
- **First level:** A1
- **Ownership:** productive core (pomóc, proszę o pomoc, potrzebować); receptive (ratunek jargon)
- **Thematic subgroups:** просьба о помощи; предложение помощи; экстренный вызов (минимум)
- **Minimal lemmas (PROD/RECP mix):** *pomóc*, *pomoc*, *potrzebować*, *wesprzeć*, *problem*, *trudność*, *ratunek*, *pogotowie*, *telefon*, *numer*, *alarmowy*, *sąsiad*, *kolega*, *prośba*
- **MWU:** *proszę o pomoc*, *czy może pan / pani pomóc?*, *potrzebuję pomocy*, *możesz mi pomóc?* (ty)
- **FIX:** *Pomocy!*, *Proszę zadzwonić na pogotowie.*
- **COLL:** *pomóc + Dat*, *prosić o pomoc*, *potrzebować + Gen*
- **Rekcja (bundle-specific):** *pomóc komuś* (Dat); *potrzebować pomocy* (Gen); *zadzwonić na + Acc* (pogotowie).
- **Aspect notes:** *pomóc* (dok) vs *pomagać* — просьба часто dok; процесс — niedok.
- **Register:** official soft с незнакомцем; *ty* с коллегой/соседом после GREET.
- **Related FN:** FN-A1-HELP-01, FN-A1-REQUEST-01, FN-A1-PHONE-01
- **Related SCN:** SCN-A1-EMERGENCY-01, SCN-A1-WORK-01, SCN-A1-NEIGHBOR-01
- **Selection source:** PRODUCT ANALYSIS safety + neighbor/work help scripts
- **L1 risks — UKR:** *Допоможіть* → забывают Dat; *потрібна допомога* калька порядка.
- **L1 risks — RUS:** *Помогите мне* → *\*Pomogite*; *нужна помощь* без Gen.
- **L1 risks — BEL:** Меньше инициативы repair+help; *дапамога* транслит.

### LEX-A1-DOCS
- **Purpose:** Назвать, отдать, получить и запросить базовые документы и бланки на окошке.
- **First level:** A1
- **Ownership:** productive core (dokument, dowód, wniosek, formularz); receptive (PESEL semantyka, zaświadczenie types)
- **Thematic subgroups:** типы документов; передача на окошке; недостающий документ; копия
- **Minimal lemmas (PROD/RECP mix):** *dokument*, *dowód*, *paszport*, *PESEL*, *wniosek*, *formularz*, *kopia*, *oryginał*, *zaświadczenie*, *pieczątka*, *podpisać*, *okazać*, *złożyć*, *brak*
- **MWU:** *oto mój dowód*, *składam wniosek*, *brakuje mi dokumentu*, *proszę o formularz*
- **FIX:** *Proszę okazać dokument.*, *W załączeniu…* (RECP writing)
- **COLL:** *złożyć wniosek*, *okazać dowód*, *wypełnić formularz*
- **Rekcja (bundle-specific):** *złożyć + Acc*; *okazać + Acc*; *prosić o + Acc*; *brakować + Dat* (*brakuje mi…*).
- **Aspect notes:** *złożyć / składać wniosek* — скрипт окна часто dok.
- **Register:** official; без colloquial на okienku.
- **Related FN:** FN-A1-DOCS-01, FN-A1-FORM-01, FN-A1-PURPOSE-01
- **Related SCN:** SCN-A1-URZAD-01, SCN-A1-FORM-01, SCN-A1-BANK-01
- **Selection source:** PRODUCT ANALYSIS DOM-URZAD documents window
- **L1 risks — UKR:** *паспорт* vs *dowód osobisty*; *заява* → *\*zajawa* / wrong *wniosek*.
- **L1 risks — RUS:** *паспорт* ok; *заявление* → путают *wniosek/podanie*; *показать* → *\*pokazać dokument* ok but register.
- **L1 risks — BEL:** Аканне в номерах/сериях на письме; *дакумент* soft consonants.

### LEX-A1-URZAD
- **Purpose:** Войти в сценарий urzędu: цель визита, очередь/окошко, вежливый T–V минимум.
- **First level:** A1
- **Ownership:** productive core (urząd, sprawa, okienko, wizyta); receptive (wydział names)
- **Thematic subgroups:** место и роль; цель визита; навигация в здании; ожидание
- **Minimal lemmas (PROD/RECP mix):** *urząd*, *sprawa*, *okienko*, *kolejka*, *numer*, *bilet*, *wizyta*, *urzędnik*, *wydział*, *informacja*, *dyżur*, *godzina*, *przyjęcie*, *obywatel*
- **MWU:** *przyszedłem / przyszłam w sprawie…*, *gdzie jest okienko…?*, *mam numer…*, *proszę o informację*
- **FIX:** *Dzień dobry, chciałbym / chciałabym załatwić sprawę…*, *Czy to to okienko?*
- **COLL:** *załatwić sprawę*, *stać w kolejce*, *udać się do + Gen*
- **Rekcja (bundle-specific):** *przyjść w sprawie + Gen*; *iść do urzędu*; *czekać na numer*.
- **Aspect notes:** *załatwić* (dok) целевой; *załatwiać* процесс RECP.
- **Register:** official obligatory; *ty* запрещён к urzędnikowi.
- **Related FN:** FN-A1-PURPOSE-01, FN-A1-DOCS-01, FN-A1-ADDRESS-01, FN-A1-ASK-01
- **Related SCN:** SCN-A1-URZAD-01, SCN-A1-FORM-01
- **Selection source:** PRODUCT ANALYSIS DOM-URZAD priority #3
- **L1 risks — UKR:** *У справі* близко; *черга* → *\*czerha*; *віконце* calque.
- **L1 risks — RUS:** *по делу* → *\*po delu*; *окошко* → *\*okoško*; очередь ticket machine lexicon.
- **L1 risks — BEL:** Официальный регистр слабее привычки; аканне в названиях wydział.

### LEX-A1-PHONE
- **Purpose:** Открыть звонок, представиться, назвать цель и попросить перезвонить / принять сообщение.
- **First level:** A1
- **Ownership:** productive core (halo, z tej strony, dzwonić, oddzwonić); receptive (voice-mail long scripts)
- **Thematic subgroups:** открытие звонка; идентификация; цель; перезвон / сообщение
- **Minimal lemmas (PROD/RECP mix):** *telefon*, *dzwonić*, *odebrać*, *połączenie*, *halo*, *rozmowa*, *wiadomość*, *oddzwonić*, *numer*, *kontakt*, *zajęty*, *dostępny*, *zostawić*
- **MWU:** *halo, z tej strony…*, *dzwonię w sprawie…*, *proszę oddzwonić*, *zostawiam wiadomość*
- **FIX:** *Czy mogę mówić z panem / panią…?*, *Proszę o kontakt.*
- **COLL:** *dzwonić do + Gen*, *odebrać telefon*, *zostawić wiadomość*
- **Rekcja (bundle-specific):** *dzwonić do kogoś* (Gen); *rozmawiać z + Ins*; *prosić o kontakt*.
- **Aspect notes:** *oddzwonić* (dok) в просьбе; *dzwonić* процесс.
- **Register:** official phone to urząd/clinic; *ty* phone только к знакомым.
- **Related FN:** FN-A1-PHONE-01, FN-A1-PHONE-02, FN-A1-PURPOSE-01
- **Related SCN:** SCN-A1-PHONE-01, SCN-A1-SMS-01, SCN-A1-WORK-01
- **Selection source:** PRODUCT ANALYSIS DOM-PHONE; PED-002 dzwonić do
- **L1 risks — UKR:** ERR-UKR-07: *дзвонити мамі* → *\*dzzwonię mamie* без *do*.
- **L1 risks — RUS:** *звоню Анне* Dat без *do*; *алло* → *halo* ok.
- **L1 risks — BEL:** Смешение *тэлефанаваць* управления; тише repair на линии.

### LEX-A1-POLITENESS
- **Purpose:** Общая вежливость A1: благодарность, мягкая просьба и короткий отказ — без лексики извинения и без reklamacji.
- **First level:** A1
- **Ownership:** productive core (dziękuję, proszę, niestety, nie mogę); receptive (uprzejmie)
- **Thematic subgroups:** благодарность; просьба; отказ; ответы на благодарность
- **Minimal lemmas (PROD/RECP mix):** *dziękować*, *dziękuję*, *proszę*, *uprzejmie*, *niestety*, *móc*, *chcieć*, *bardzo*, *oczywiście*, *jasne*, *dobrze*, *trudno*, *później*
- **MWU:** *dziękuję bardzo*, *proszę o…*, *niestety nie mogę*, *czy mógłby / mogłaby pan / pani…?* (formulaic)
- **FIX:** *Proszę bardzo.*, *Nie ma za co.*, *Niestety nie.*
- **COLL:** *dziękować + Dat*, *prosić o + Acc*, *nie móc + Inf*
- **Rekcja (bundle-specific):** *dziękuję panu / pani* (Dat formula); *proszę o chwilę*; modal *nie mogę + Inf*.
- **Aspect notes:** Модалки без видового выбора; *podziękować* RECP.
- **Register:** neutral→official; *spoko* colloquial avoid в службе.
- **Related FN:** FN-A1-THANKS-01, FN-A1-REQUEST-01, FN-A1-REFUSE-01
- **Related SCN:** SCN-A1-EVERYDAY-01, SCN-A1-SHOP-01, SCN-A1-WORK-01, SCN-A1-URZAD-01
- **Selection source:** PED-010 politeness; PRODUCT ANALYSIS service scripts
- **L1 risks — UKR:** *Дякую* → забывают Dat; *будь ласка* ↔ *proszę* распределение.
- **L1 risks — RUS:** *пожалуйста* на всё; *не могу* → *\*nie mogu*; *спасибо большое* calque order.
- **L1 risks — BEL:** ERR-BEL-24 тип request soft; меньше *proszę* в отказе.

### LEX-A1-APOLOGY
- **Purpose:** Извиниться за опоздание, помеху или ошибку (*przepraszam za…*) — НЕ reklamacja / жалоба на товар.
- **First level:** A1
- **Ownership:** productive core (przepraszam, spóźnienie, przeszkadzać); receptive (wybaczyć formal)
- **Thematic subgroups:** извинение за опоздание; за помеху; принятие извинения
- **Minimal lemmas (PROD/RECP mix):** *przepraszać*, *przepraszam*, *spóźnienie*, *spóźnić się*, *przeszkadzać*, *błąd*, *pomyłka*, *niewygoda*, *wybaczyć*, *nic*, *stać się*, *moment*
- **MWU:** *przepraszam za spóźnienie*, *przepraszam, że przeszkadzam*, *to moja pomyłka*, *nie chciałem / nie chciałam przeszkodzić*
- **FIX:** *Przepraszam bardzo.*, *Nic się nie stało.*, *Wybaczy pan / pani?*
- **COLL:** *przepraszać za + Acc*, *spóźnić się na + Acc*, *przeszkadzać + Dat*
- **Rekcja (bundle-specific):** *przepraszam za + Acc*; *spóźnić się do pracy / na spotkanie*; *przeszkadzać komuś* (Dat).
- **Aspect notes:** *spóźnić się* (dok) типично для факта опоздания; *spóźniać się* — Habit RECP.
- **Register:** neutral→official; искренность важнее длинных смягчений A2.
- **Related FN:** FN-A1-APOLOGY-01
- **Related SCN:** SCN-A1-WORK-01, SCN-A1-SCHOOL-01, SCN-A1-NEIGHBOR-01, SCN-A1-PHONE-01
- **Selection source:** PRODUCT ANALYSIS apology speech act; contrast vs COMPLAINT lexicon (anti-mix)
- **L1 risks — UKR:** *Вибачте* → *\*Wybacz*; *за запізнення* падеж; путают с *reklamacja*.
- **L1 risks — RUS:** *извините за* → Gen/Acc; *я опоздал* без *się*; не тащить *жалоба*.
- **L1 risks — BEL:** Смешение *прабачце* силы; мягкость vs clear *przepraszam za…*.

### LEX-A1-TIME
- **Purpose:** Дни, части суток, часы встречи и простые календарные якоря для записи.
- **First level:** A1
- **Ownership:** productive core (dziś, jutro, godzina, dni tygodnia); receptive (pełne miesiące set, zones)
- **Thematic subgroups:** дни недели; части дня; часы; относительные маркеры
- **Minimal lemmas (PROD/RECP mix):** *dziś*, *jutro*, *wczoraj*, *rano*, *wieczór*, *noc*, *godzina*, *minuta*, *tydzień*, *poniedziałek*, *wtorek*, *środa*, *czwartek*, *piątek*, *sobota*, *niedziela*, *miesiąc*
- **MWU:** *o której…?*, *o ósmej*, *w poniedziałek*, *do jutra*
- **FIX:** *Kiedy panu / pani pasuje?*, *Czy o dziesiątej jest wolne?*
- **COLL:** *spotkać się o + Loc clock*, *umówić się na + Acc day*
- **Rekcja (bundle-specific):** *o + Loc* (час); *w + Acc* (день недели); *za + Acc* (*za godzinę*).
- **Aspect notes:** Не центрально; *umówić się* dok в записи.
- **Register:** neutral; calendar SMS — short official-neutral.
- **Related FN:** FN-A1-TIME-01, FN-A1-APPOINT-01, FN-A1-NARRATE-01
- **Related SCN:** SCN-A1-EVERYDAY-01, SCN-A1-MED-01, SCN-A1-WORK-01, SCN-A1-SCHOOL-01
- **Selection source:** PRODUCT ANALYSIS scheduling; Katalog czas (REQUIRES VERIFICATION)
- **L1 risks — UKR:** *о восьмій* близко; *в понеділок* → *\*w poniedziałekok*; 24h vs 12h.
- **L1 risks — RUS:** *в понедельник* Acc/Prep; *в 8 часов* → *\*w 8 godzin* vs *o ósmej*.
- **L1 risks — BEL:** Аканне в названиях дней на письме; *сёння/сёння* calques.

### LEX-A1-SIGNS
- **Purpose:** Прочитать и уточнить короткое объявление / вывеску: запрет, часы, вход, контакты.
- **First level:** A1
- **Ownership:** receptive-primary productive (спросить значение); lemmas RECP+key PROD clarifiers
- **Thematic subgroups:** запреты; часы работы; вход/выход; контакт на двери
- **Minimal lemmas (PROD/RECP mix):** *napis*, *ogłoszenie*, *wejście*, *wyjście*, *zakaz*, *wolny*, *zajęty*, *czynne*, *nieczynne*, *prywatne*, *awaria*, *uwaga*, *informacja*, *godziny*, *otwarte*
- **MWU:** *co oznacza ten napis?*, *czy to czynne?*, *wejście od ulicy…*, *zakaz palenia*
- **FIX:** *Proszę o wyjaśnienie.*, *Czy dobrze rozumiem, że…?*
- **COLL:** *oznaczać + Acc*, *obowiązywać* (RECP), *godziny otwarcia*
- **Rekcja (bundle-specific):** Указание *ten/ta/to* (GR-PRO-DEM-01); вопросы *co / gdzie / czy*.
- **Aspect notes:** RECP verbs на знаках; продукция — уточняющие вопросы.
- **Register:** public notices = official short; learner questions neutral.
- **Related FN:** FN-A1-READ-01, FN-A1-ASK-01
- **Related SCN:** SCN-A1-HOUSING-01, SCN-A1-SHOP-01, SCN-A1-URZAD-01
- **Selection source:** PRODUCT ANALYSIS environmental print; FN-A1-READ-01 frame
- **L1 risks — UKR:** Кириллические вывески привычка → пропускают диакритику PL; *зачинено* calque.
- **L1 risks — RUS:** *закрыто/открыто* → *\*zakryto*; *вход* → *\*wchod*.
- **L1 risks — BEL:** False confidence от похожих корней; аканне при переписывании объявления.

### LEX-A1-SCHOOL
- **Purpose:** Контакт с przedszkole/szkoła: представиться родителем, имя ребёнка, отсутствие.
- **First level:** A1
- **Ownership:** productive core (dziecko, wychowawca, nieobecność); receptive (usprawiedliwienie form)
- **Thematic subgroups:** люди школы; ребёнок; отсутствие; короткая просьба
- **Minimal lemmas (PROD/RECP mix):** *szkoła*, *przedszkole*, *dziecko*, *syn*, *córka*, *wychowawca*, *nauczyciel*, *klasa*, *lekcja*, *nieobecność*, *choroba*, *wycieczka*, *zebranie*, *dziennik*
- **MWU:** *jestem tatą / mamą…*, *moje dziecko nazywa się…*, *dziecko jest chore*, *nie będzie dziś na zajęciach*
- **FIX:** *Dzień dobry, pani wychowawczyni.*, *Proszę o usprawiedliwienie.* (formulaic)
- **COLL:** *chodzić do szkoły*, *być nieobecnym*, *zgłosić nieobecność*
- **Rekcja (bundle-specific):** *chodzić do + Gen*; *zgłosić + Acc*; *prosić o usprawiedliwienie*.
- **Aspect notes:** *zgłosić* dok для факта отсутствия; *chorować* RECP.
- **Register:** official soft к nauczycielowi; *ty* не к воспитателю.
- **Related FN:** FN-A1-PURPOSE-01, FN-A1-REPORT-01, FN-A1-GREET-01, FN-A1-APOLOGY-01
- **Related SCN:** SCN-A1-SCHOOL-01, SCN-A1-SMS-01
- **Selection source:** PRODUCT ANALYSIS DOM-SCHOOL first audience parents
- **L1 risks — UKR:** *Класний керівник* → *\*klasny*; *відсутність* calque; T–V к pani.
- **L1 risks — RUS:** *классная* → wrong title; *ребёнок болеет* aspect; SMS без вежливости.
- **L1 risks — BEL:** Меньше опыта oficjalny school contact; диакритика имён детей.

### LEX-A1-BANK
- **Purpose:** Минимум банка: konto, karta, простой przelew по образцу (термины + скрипт).
- **First level:** A1
- **Ownership:** productive core (konto, karta, przelew, saldo RECP); receptive (IBAN structure, opłaty)
- **Thematic subgroups:** счёт и карта; перевод; идентификация клиента; лимиты (RECP)
- **Minimal lemmas (PROD/RECP mix):** *bank*, *konto*, *karta*, *przelew*, *saldo*, *wpłata*, *wypłata*, *limit*, *bankomat*, *PIN*, *odbiorca*, *kwota*, *potwierdzenie*, *oddział*
- **MWU:** *chcę otworzyć konto*, *robię przelew*, *numer konta…*, *płacę kartą*
- **FIX:** *Proszę o kartę do konta.*, *Czy mogę zrobić przelew?*
- **COLL:** *otworzyć konto*, *zrobić przelew*, *wypłacić pieniądze*
- **Rekcja (bundle-specific):** *przelew na konto + Gen*; *wypłacić z + Gen*; *płacić kartą* (Ins).
- **Aspect notes:** *otworzyć / otwierać konto*; скрипт окна — dok.
- **Register:** official; PIN/privacy — short avoid oversharing (PRAG).
- **Related FN:** FN-A1-TRANS-01, FN-A1-ASK-01, FN-A1-QUANT-01, FN-A1-DOCS-01
- **Related SCN:** SCN-A1-BANK-01, SCN-A1-FORM-01
- **Selection source:** PRODUCT ANALYSIS DOM-BANK; ASM form-follow for przelew template
- **L1 risks — UKR:** *рахунок* → *\*rachunek* false friend (счёт vs bill); *картка*.
- **L1 risks — RUS:** *счёт* → *konto* vs *rachunek*; *перевод* → *przelew* not *tłumaczenie*.
- **L1 risks — BEL:** Аканне в цифрах IBAN при диктовке; *банка* soft.

### LEX-A1-ROUTINE
- **Purpose:** Описать типичный день простыми связками: дом–работа–магазин–время.
- **First level:** A1
- **Ownership:** productive core (wstawać, iść, wracać, potem); receptive (szczegółowy harmonogram)
- **Thematic subgroups:** подъём/сон; перемещения; еда; работа/дом
- **Minimal lemmas (PROD/RECP mix):** *wstawać*, *spać*, *śniadanie*, *obiad*, *kolacja*, *iść*, *wracać*, *potem*, *najpierw*, *zwykle*, *codziennie*, *wieczorem*, *rano*, *dom*, *praca*
- **MWU:** *wstaję o…*, *idę do pracy*, *wracam do domu*, *potem robię zakupy*
- **FIX:** *A jak wygląda pani / pana dzień?* (prompt)
- **COLL:** *wracać do domu*, *robić zakupy*, *jeść śniadanie*
- **Rekcja (bundle-specific):** *iść do + Gen*; *wracać z + Gen*; *o + Loc* (час подъёма).
- **Aspect notes:** Habitual niedok (*wstaję, idę*); dok точечные события RECP.
- **Register:** neutral narrative; classroom Extension criticality ok.
- **Related FN:** FN-A1-NARRATE-01, FN-A1-TIME-01, FN-A1-LOCATE-01
- **Related SCN:** SCN-A1-EVERYDAY-01, SCN-A1-WORK-01
- **Selection source:** CEFR A1 simple daily routine (qualitative; REQUIRES VERIFICATION) + PRODUCT classroom genre
- **L1 risks — UKR:** *Я встаю* ok; *іду на роботу* → *\*idę na pracę* vs *do pracy*.
- **L1 risks — RUS:** *иду на работу* Prep; *потом* → *\*potom*; aspect mix.
- **L1 risks — BEL:** Аканне в *\*rabota*; порядок *najpierw/potem* calques.

## Legacy LEX registry (pre-A1-refactor; pending cleanup)

Ниже — **A2+** (и прочие non-A1) пакеты до семантической миграции.
A1 tautological / DEFAULT micro-packs удалены из этого списка после введения `LEX-A1-*`.
**Не использовать** legacy A1 имена в новых цепочках SCN→FN→LEX.

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
