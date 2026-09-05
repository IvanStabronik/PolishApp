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

## 3. Условные GR-* (до grammar-inventory)

| ID | Содержание (кратко) |
| --- | --- |
| `GR-CASE-NOM` … `GR-CASE-VOC` | Семь падежей как столпы |
| `GR-REKCJA` | Управление глаголов/предлогов |
| `GR-CONCORD` | Согласование Adj–N–Pron |
| `GR-GENDER` | Род sg |
| `GR-MASC-PERS` | męskoosobowy / niemęskoosobowy |
| `GR-NUM` | Числительные и согласование |
| `GR-TENSE-PRES/PAST/FUT` | Времена |
| `GR-ASPECT` | dok/niedok (выбор) |
| `GR-ASPECT-LEX` | Видовые пары как лексика (без свободного выбора) |
| `GR-MODAL` | móc, musieć, chcieć, powinien… |
| `GR-NEG` | Отрицание; dopełniacz po przeczeniu |
| `GR-Q` | Вопросы, интонация, czy / kto / gdzie… |
| `GR-IMP` | Императив |
| `GR-COND` | tryb przypuszczający |
| `GR-PASS` | Страдательные конструкции |
| `GR-PART` | Причастия / odsłowniki (по уровню) |
| `GR-REFL` | się / sobie / siebie |
| `GR-WORDORDER` | Тема–рема, клитики |
| `GR-COMP` | Степени сравнения |
| `GR-COMPLEX` | Сложные предложения, spójniki |
| `GR-TV` | pan/pani + 3 л.; переход на ty |
| `GR-ORTH` | ż/rz, ó/u, ch/h, ą/ę |
| `GR-PHON` | Стечения, ударение, оглушение |

Лексические пререквизиты: `LEX-<DOMAIN>` или ссылка на раздел `lexical-targets.md` (тематический домен / функциональный минимум).

---

# A1

**CEFR-ориентир (качественно):** очень простые высказывания о себе и ближайших нуждах; понимание медленной чёткой речи в знакомых ситуациях ([CEFR/CV](https://www.coe.int/en/web/common-european-framework-reference-languages), confidence: высокий на характер уровня).  
**Связь с госстандартом:** A1 взрослые — `standard_status=current`; модули słuch / czytanie / pisanie + mówienie ([struktura](https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/), Dz.U. 2025 poz. 217); `session_availability` 2026 = **not_announced** ([terminy 2026](https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/), проверка 2026-09-05).

## A1.1 Коммуникативные функции

| ID | Функция | Домены | GR-пререквизиты | LEX-пререквизиты |
| --- | --- | --- | --- | --- |
| FN-A1-001 | Представиться: имя, страна, город, L1 | EVERYDAY, SOCIAL | GR-CASE-NOM, GR-TENSE-PRES, GR-CONCORD | LEX-IDENTITY |
| FN-A1-002 | Спросить / назвать профессию и место работы | WORK | GR-CASE-NOM, GR-CASE-LOC, GR-REKCJA | LEX-WORK-BASIC |
| FN-A1-003 | Сказать, где живёт / снимает жильё (простая формула) | HOUSING | GR-CASE-LOC, GR-REKCJA | LEX-HOUSING-BASIC |
| FN-A1-004 | Назвать адрес, этаж, номер квартиры | HOUSING, URZAD | GR-CASE-NOM, GR-NUM | LEX-ADDRESS |
| FN-A1-005 | Поздороваться / попрощаться в официальном и бытовом регистре | TV, SOCIAL | GR-TV, GR-CASE-VOC | LEX-GREETINGS |
| FN-A1-006 | Обратиться pan/pani + 3 л. в магазине / на ресепшене | TV, SHOP | GR-TV, GR-TENSE-PRES | LEX-SERVICE |
| FN-A1-007 | Попросить повторить / говорить медленнее | PHONE, EVERYDAY | GR-IMP, GR-Q | LEX-REPAIR |
| FN-A1-008 | Сказать, что не понимает; попросить перевод ключевого слова | EVERYDAY, URZAD | GR-NEG, GR-Q | LEX-REPAIR |
| FN-A1-009 | Назвать цену, количество, сдачу (простые числа) | SHOP, BANK | GR-NUM, GR-CASE-GEN | LEX-MONEY |
| FN-A1-010 | Купить товар / заказать услугу по образцу | SHOP | GR-CASE-ACC, GR-CASE-GEN, GR-REKCJA | LEX-SHOP |
| FN-A1-011 | Заказать еду / напиток | SHOP | GR-CASE-ACC, GR-CASE-GEN | LEX-FOOD |
| FN-A1-012 | Спросить / объяснить дорогу (базовые ориентиры) | TRANS | GR-CASE-ACC, GR-CASE-LOC, GR-IMP | LEX-TRANS-BASIC |
| FN-A1-013 | Купить билет / спросить о времени отправления | TRANS | GR-Q, GR-NUM, GR-CASE-ACC | LEX-TRANS-BASIC |
| FN-A1-014 | Записаться на визит (простая фраза: день, час) | MED, URZAD, SCHOOL | GR-TENSE-FUT или GR-MODAL, GR-NUM | LEX-APPOINTMENT |
| FN-A1-015 | Назвать симптомы на уровне списка слов + «boli mnie…» | MED | GR-CASE-ACC, GR-REFL | LEX-BODY |
| FN-A1-016 | Получить / отдать документы на окошке (мини-скрипт) | URZAD | GR-CASE-ACC, GR-IMP, GR-TV | LEX-DOCS |
| FN-A1-017 | Представиться в urzędzie и назвать цель визита одной фразой | URZAD | GR-TV, GR-TENSE-PRES, GR-CASE-GEN | LEX-URZAD-BASIC |
| FN-A1-018 | Попросить форму / указать недостающий документ | URZAD | GR-CASE-GEN, GR-Q | LEX-DOCS |
| FN-A1-019 | Написать короткое SMS: опоздание, подтверждение | WORK, SCHOOL, PHONE | GR-TENSE-PRES/FUT, GR-NEG | LEX-SMS |
| FN-A1-020 | Позвонить и сказать, кто звонит + зачем (скрипт) | PHONE | GR-TV, GR-TENSE-PRES, GR-Q | LEX-PHONE |
| FN-A1-021 | Оставить голосовое / передать просьбу перезвонить | PHONE | GR-IMP, GR-MODAL | LEX-PHONE |
| FN-A1-022 | Попросить о помощи у коллеги / соседа (простая prośba) | WORK, NEIGHBOR | GR-MODAL, GR-CASE-ACC | LEX-REQUEST |
| FN-A1-023 | Отказать коротко и вежливо (nie mogę / niestety) | COMPLAINT, WORK | GR-NEG, GR-MODAL, GR-TV | LEX-REFUSAL |
| FN-A1-024 | Поблагодарить и ответить на благодарность | SOCIAL, TV | GR-CASE-DAT, GR-REKCJA | LEX-POLITENESS |
| FN-A1-025 | Извиниться за опоздание / помеху | WORK, SCHOOL, NEIGHBOR | GR-CASE-ACC, GR-TENSE-PRES | LEX-POLITENESS |
| FN-A1-026 | Спросить о наличии товара / свободного слота | SHOP, MED | GR-Q, GR-CASE-NOM/GEN | LEX-AVAILABILITY |
| FN-A1-027 | Сообщить о простой usterce в квартире (cieknie, nie działa) | HOUSING | GR-NEG, GR-TENSE-PRES | LEX-HOUSING-FIX |
| FN-A1-028 | Представиться воспитателю / сказать имя ребёнка | SCHOOL | GR-TV, GR-CASE-GEN | LEX-SCHOOL-BASIC |
| FN-A1-029 | Сообщить об отсутствии ребёнка (болезнь / поездка) | SCHOOL | GR-TENSE-PRES/FUT, GR-NEG | LEX-SCHOOL-BASIC |
| FN-A1-030 | Открыть счёт / спросить о карте (скриптовые реплики) | BANK | GR-TV, GR-Q, GR-CASE-ACC | LEX-BANK-BASIC |
| FN-A1-031 | Сделать простой przelew по образцу (термины) | BANK | GR-NUM, GR-CASE-ACC | LEX-BANK-BASIC |
| FN-A1-032 | Описать типичный день (работа–дом–магазин) | WORK, EVERYDAY | GR-TENSE-PRES, GR-ASPECT-LEX | LEX-ROUTINE |
| FN-A1-033 | Назвать дни, месяцы, часы встречи | EVERYDAY | GR-NUM, GR-CASE-GEN | LEX-TIME |
| FN-A1-034 | Заполнить анкету: личные данные, адрес, телефон | URZAD, WORK | GR-CASE-NOM, GR-ORTH | LEX-FORMS |
| FN-A1-035 | Написать 3–5 предложений о себе (учебный жанр) | EVERYDAY | GR-TENSE-PRES, GR-CONCORD | LEX-IDENTITY |
| FN-A1-036 | Попросить счёт / уточнить способ оплаты | SHOP | GR-Q, GR-CASE-ACC | LEX-MONEY |
| FN-A1-037 | Согласиться / подтвердить договорённость | WORK, PHONE | GR-TENSE-PRES, GR-MODAL | LEX-AGREEMENT |
| FN-A1-038 | Уточнить значение вывески / короткого объявления | HOUSING, SHOP, URZAD | GR-Q | LEX-SIGNS |
| FN-A1-039 | Поздороваться с соседом и обменяться 1–2 фразами | NEIGHBOR, TV | GR-TV или ty (семья здания), GR-CASE-VOC | LEX-NEIGHBOR |
| FN-A1-040 | Сообщить о боли / срочности и попросить помочь вызвать помощь (скрипт) | MED | GR-IMP, GR-MODAL | LEX-EMERGENCY-BASIC |
| FN-A1-041 | Различать официальное vs неофициальное обращение в готовых репликах | TV | GR-TV | LEX-GREETINGS |
| FN-A1-042 | Прочитать и выполнить короткую инструкцию (biletomat, аптека) | TRANS, MED, SHOP | GR-IMP (рецептивно) | LEX-INSTRUCTIONS |

## A1.2 Повседневные и институциональные сценарии

- Магазин / kasa / reklamacja «товар не тот» (микро).
- Аптека: рецепт / безрецептурный препарат (названия по образцу).
- Автобус / tramwaj / biletomat.
- Pierwszy dzień w pracy: где szatnia, przerwa, kto jest szefem.
- Oglądanie mieszkania: metraż, czynsz (понимание ключевых слов).
- Okienko w urzędzie: numerki, «proszę czekać».
- Przychodnia: rejestracja, «do jakiego lekarza».
- Szkoła/przedszkole: odbiór dziecka, usprawiedliwienie SMS.
- Bankomat / karta (только безопасные бытовые реплики).
- Telefon do przychodni / do pracy: «halo, z tej strony…».
- Sąsiad: cisza, paczka, klucz (микро).
- Formal: шаблон e-mail «proszę o informację» (очень короткий).

## A1.3 Речевые акты

Приветствие; прощание; представление; просьба; благодарность; извинение; согласие; простой отказ; уточнение; просьба повторить; сообщение о состоянии; назначение времени; указание места; выражение незнания.

## A1.4 Письменные жанры

SMS/чат (1–3 предложения); подпись в анкете; список покупок / дел; ультракороткий e-mail (temat + 2–4 zdania); учебный автопортрет; заполнение полей formularza.

## A1.5 Устные жанры

Мини-диалог по скрипту; монолог «о себе» 30–60 с; ролевая: sklep / rejestracja; телефонный скрипт; описание картинки (экзаменационно-совместимый учебный жанр, не копия zestawy).

## A1.6 Прагматика

- Всегда иметь готовую пару: *pan/pani* vs *ty*.
- Не переходить на *ty* первым в urzędzie / у врача / у pracodводителя.
- Дистанция: имя + *pani/panie* + wołacz в сервисе.
- Извинение раньше оправдания в работе/школе.
- Просьба с *proszę* / *czy może pan/pani…*.

## A1.7 Регистр

Официальный сервисный (*pan/pani*); нейтральный бытовой; учебный «упрощённый официальный» для e-mail. Zdrobnienia — **только рецептивно** + предупреждение о неуместности на работе.

## A1.8 Стратегии компенсации

Повтор ключевого слова; *proszę mówić wolniej*; показ на телефоне/документе; перевод одного слова; жест + *ten/ta*; смена на известный синоним из минимума; просьба написать слово.

## A1.9 Чтение и аудирование

**Чтение:** вывески, SMS, короткие ogłoszenia, фрагменты umowa/ulotka с поиском знакомых полей, меню, rozkład jazdy (время/номер).  
**Аудирование:** медленная чёткая речь; объявления; диалоги sklep/przychodnia; имя, число, время, цена. Ориентир стандарта A1 listening — чёткая речь (załącznik nr 1; confidence: средний на детализацию без цитирования полного текста приложения).

---

# A2

**CEFR-ориентир:** простые связные описания повседневности; взаимодействие в знакомых институциональных ситуациях.  
**Госстандарт:** A2 `standard_status=current`; на struktura — взрослые могут сдавать A2; в terminy **2026** сессия A2 **не объявлена** (`session_availability=not_announced`). Не помечать уровень как historical.

## A2.1 Коммуникативные функции

| ID | Функция | Домены | GR-пререквизиты | LEX-пререквизиты |
| --- | --- | --- | --- | --- |
| FN-A2-001 | Рассказать о работе: обязанности, график, коллеги | WORK | GR-TENSE-PRES, GR-ASPECT-LEX, GR-CASE-ACC/INS | LEX-WORK-A2 |
| FN-A2-002 | Попросить выходной / смену; объяснить причину | WORK | GR-MODAL, GR-TENSE-FUT, GR-CASE-GEN | LEX-WORK-LEAVE |
| FN-A2-003 | Понять и пересказать инструкцию по BHP / графику | WORK | GR-IMP рецептивно, GR-MODAL | LEX-WORK-RULES |
| FN-A2-004 | Вести переговоры об аренде: czynsz, kaucja, termin | HOUSING | GR-NUM, GR-CASE-GEN/ACC, GR-Q | LEX-HOUSING-A2 |
| FN-A2-005 | Сообщить о usterce и договориться о wizycie serwisu | HOUSING | GR-TENSE-PRES/PAST, GR-ASPECT-LEX | LEX-HOUSING-FIX |
| FN-A2-006 | Понять ключевые пункты ogłoszenia / umowy najmu | HOUSING | GR-COMPLEX (простые spójniki) | LEX-CONTRACT-BASIC |
| FN-A2-007 | Записаться в urzędzie и уточнить список документов | URZAD | GR-TV, GR-Q, GR-CASE-GEN | LEX-URZAD-A2 |
| FN-A2-008 | Объяснить цель визита связным мини-монологом | URZAD | GR-TENSE-PRES, GR-CASE-GEN/DAT | LEX-URZAD-A2 |
| FN-A2-009 | Заполнить расширенную анкету (статус, дети, работа) | URZAD, WORK | GR-CONCORD, GR-ORTH | LEX-FORMS-A2 |
| FN-A2-010 | Описать симптомы связно; ответить на вопросы врача | MED | GR-TENSE-PRES/PAST, GR-REFL, GR-ASPECT-LEX | LEX-MED-A2 |
| FN-A2-011 | Понять дозировку / режим приёма лекарства | MED | GR-NUM, GR-IMP рецептивно | LEX-PHARMA |
| FN-A2-012 | Написать usprawiedliwienie / e-mail do szkoły | SCHOOL, FORMAL | GR-TV, GR-TENSE-PAST/FUT, GR-CASE-GEN | LEX-SCHOOL-A2 |
| FN-A2-013 | Обсудить z wychowawcą поведение / успеваемость (просто) | SCHOOL | GR-TV, GR-COMP, GR-CASE-INS | LEX-SCHOOL-A2 |
| FN-A2-014 | Открыть тему przedszkole: аллергии, контакты, odbiór | SCHOOL | GR-CASE-ACC/GEN, GR-NEG | LEX-KINDER |
| FN-A2-015 | Спросить в банке о opłatach, limicie, przelewie zagranicznym (базово) | BANK | GR-Q, GR-NUM, GR-REKCJA | LEX-BANK-A2 |
| FN-A2-016 | Пожаловаться на ошибочное списание (скрипт + детали) | BANK, COMPLAINT | GR-TENSE-PAST, GR-NEG, GR-NUM | LEX-BANK-A2 |
| FN-A2-017 | Сделать reklamację товара / услуги | SHOP, COMPLAINT | GR-TENSE-PAST, GR-CASE-GEN, GR-ASPECT-LEX | LEX-COMPLAINT |
| FN-A2-018 | Попросить wymienić / zwrócić / naprawić | SHOP, COMPLAINT | GR-IMP, GR-MODAL, GR-CASE-ACC | LEX-COMPLAINT |
| FN-A2-019 | Запланировать маршрут с пересадками; спросить об опоздании | TRANS | GR-TENSE-FUT, GR-Q, GR-CASE-INS | LEX-TRANS-A2 |
| FN-A2-020 | Сообщить о проблеме z biletem / kontrolą | TRANS, COMPLAINT | GR-TENSE-PAST, GR-TV | LEX-TRANS-A2 |
| FN-A2-021 | Попросить соседа о тишине / помощи с посылкой | NEIGHBOR | GR-TV, GR-MODAL, GR-CASE-ACC | LEX-NEIGHBOR-A2 |
| FN-A2-022 | Предложить помощь соседу; принять/отклонить | NEIGHBOR | GR-COND (формулы), GR-MODAL | LEX-NEIGHBOR-A2 |
| FN-A2-023 | Вести телефонный разговор без полного скрипта | PHONE | GR-Q, GR-TENSE-PRES/FUT, GR-REPAIR | LEX-PHONE-A2 |
| FN-A2-024 | Переспросить и перефразировать услышанное | PHONE, URZAD | GR-COMPLEX, GR-Q | LEX-REPAIR-A2 |
| FN-A2-025 | Сформулировать prośbę с обоснованием | COMPLAINT, WORK | GR-CAUSE (bo/ponieważ), GR-MODAL | LEX-REQUEST-A2 |
| FN-A2-026 | Отказать с причиной и альтернативой | COMPLAINT, WORK | GR-NEG, GR-COND формулы, GR-MODAL | LEX-REFUSAL-A2 |
| FN-A2-027 | Пожаловаться вежливо, без агрессии | COMPLAINT | GR-TV, GR-TENSE-PAST | LEX-COMPLAINT |
| FN-A2-028 | Принять извинения / дать извинения развёрнуто | SOCIAL, WORK | GR-CASE-DAT, GR-TENSE-PAST | LEX-POLITENESS-A2 |
| FN-A2-029 | Перейти с pan/pani на ty по инициативе поляка (распознать сигнал) | TV | GR-TV | LEX-TV-SHIFT |
| FN-A2-030 | Отказать в переходе на ty / сохранить дистанцию | TV, WORK | GR-TV, GR-NEG вежливое | LEX-TV-SHIFT |
| FN-A2-031 | Написать официальный e-mail: prośba o dokumenty / spotkanie | FORMAL, WORK, SCHOOL | GR-TV, GR-CASE-GEN/ACC, GR-ORTH | LEX-EMAIL-A2 |
| FN-A2-032 | Написать неофициальное сообщение коллеге на ty | WORK, TV | GR-TENSE-PRES/FUT | LEX-CHAT-A2 |
| FN-A2-033 | Описать прошлое событие (переезд, первый день работы) | HOUSING, WORK | GR-TENSE-PAST, GR-ASPECT (введение выбора) | LEX-NARRATIVE-A2 |
| FN-A2-034 | Сравнить два варианта жилья / смены / школы | HOUSING, WORK, SCHOOL | GR-COMP, GR-CASE-NOM | LEX-COMPARE |
| FN-A2-035 | Выразить предпочтение и простое мнение | EVERYDAY, WORK | GR-MODAL, GR-CASE-ACC | LEX-OPINION-A2 |
| FN-A2-036 | Понять объявление wspólnoty / regulamin domu | NEIGHBOR, HOUSING | рецептивный GR-COMPLEX | LEX-RULES |
| FN-A2-037 | Записаться на szczepienie / badanie; перенести wizytę | MED | GR-TENSE-FUT, GR-MODAL | LEX-MED-A2 |
| FN-A2-038 | Объяснить аллергии / хронические ограничения | MED, SCHOOL | GR-NEG, GR-CASE-ACC/GEN | LEX-HEALTH-LIMIT |
| FN-A2-039 | Участвовать в short small talk на работе | WORK, SOCIAL | GR-TENSE-PRES, GR-Q | LEX-SMALLTALK |
| FN-A2-040 | Сообщить о L4 / wizycie u lekarza работодателю | WORK, MED | GR-TENSE-PRES/FUT, GR-FORMAL | LEX-WORK-LEAVE |
| FN-A2-041 | Попросить разъяснить счёт / rachunek za media | HOUSING, BANK | GR-Q, GR-NUM, GR-CASE-GEN | LEX-BILLS |
| FN-A2-042 | Описать человека (коллега, врач, wychowawca) | WORK, SCHOOL, MED | GR-CONCORD, GR-CASE-INS | LEX-DESCRIPTION |
| FN-A2-043 | Дать простой совет (proszę + infinitive / niech…) | SOCIAL, MED | GR-IMP, GR-MODAL | LEX-ADVICE-A2 |
| FN-A2-044 | Понять короткий news/SMS от школы/банка | SCHOOL, BANK | рецептив | LEX-NOTIFY |
| FN-A2-045 | Согласовать встречу с несколькими слотами | WORK, SCHOOL, MED | GR-NUM, GR-MODAL, GR-TENSE-FUT | LEX-SCHEDULING |
| FN-A2-046 | Выразить срочность / приоритет просьбы | COMPLAINT, URZAD | GR-MODAL, GR-TV | LEX-URGENCY |
| FN-A2-047 | Использовать męskoosobowe формы в рассказе о коллегах/родителях | WORK, SCHOOL | GR-MASC-PERS, GR-CONCORD | LEX-PEOPLE |
| FN-A2-048 | Прочитать и кратко пересказать ulotkę / instrukcję | MED, SHOP, URZAD | рецептив + GR-TENSE-PRES | LEX-INSTRUCTIONS-A2 |

## A2.2 Сценарии

Аренда end-to-end (ogłoszenie → oglądanie → pytania o kaucję); первая rozmowa z właścicielem; reklamacja w sklepie; kontrola biletów; wizyta w urzędzie z listą dokumentów; rejestracja + wizyta u lekarza; zebranie w przedszkolu (понимание повестки); bank: limity i przelew; telefon z odwołaniem wizyty; sąsiad o remoncie; e-mail do HR / do szkoły; rozmowa o grafiku.

## A2.3 Речевые акты

Просьба с обоснованием; вежливый отказ + альтернатива; жалобы; уточнение; переспрос; предложение; совет; сравнение; выражение мнения; соглашение о сроке; сообщение о правиле; извинение с объяснением.

## A2.4 Письменные жанры

E-mail oficjalny (prośba/informacja); usprawiedliwienie; reklamacja (короткая); SMS-цепочка; заметка для себя после urzędu; простой opis zdarzenia; заполнение wniosków (ключевые поля).

## A2.5 Устные жанры

Связный монолог 1–2 мин; диалог без жёсткого скрипта; телефон; ролевая «reklamacja / urząd»; описание прошлого события; краткое сравнение вариантов.

## A2.6 Прагматика

Сигналы перехода на *ty*; сохранение *pan/pani* с urzędnik/lekarz/nauczyciel; смягчение отказа; порядок: факт → просьба → благодарность в официальном e-mail; не смешивать zdrobnienia имени ребёнка с обращением к wychowawca.

## A2.7 Регистр

Официальный письменный; официальный устный сервисный; нейтральный рабочий; неофициальный среди равных; осторожное использование разговорных частиц (*no, wiesz*) — рецептивно.

## A2.8 Компенсации

Перефраз; пример вместо термина; просьба подтвердить понимание (*czy dobrze rozumiem, że…*); запись на телефон ключевых дат/сумм; просьба прислать SMS после звонка.

## A2.9 Чтение и аудирование

**Чтение:** ogłoszenia mieszkaniowe, krótkie regulaminy, SMS szkoły/банка, proste umowy (поиск статей), ulotki NFZ/apteka, e-maile.  
**Аудирование:** объявления на dworcu; диалоги в urzędzie; телефон; инструктаж на работе; речь чуть быстрее A1, с повтором ключевых данных.

---

# B1

**CEFR-ориентир:** самостоятельное участие в большинстве бытовых и рабочих ситуаций; связный рассказ, аргументация на знакомые темы; понимание основной информации в стандартных текстах.  
**Госстандарт:** B1 взрослые — отдельный модуль *poprawność gramatyczna*; порог ≥50% **каждой** части (§ 23); `session_availability` 2026 = **announced** ([terminy 2026](https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/), проверка 2026-09-05).

## B1.1 Коммуникативные функции

| ID | Функция | Домены | GR-пререквизиты | LEX-пререквизиты |
| --- | --- | --- | --- | --- |
| FN-B1-001 | Провести рабочий разговор о задаче, сроке, ответственности | WORK | GR-ASPECT, GR-COMPLEX, GR-CASE-* | LEX-WORK-B1 |
| FN-B1-002 | Участвовать в совещании: согласие, сомнение, уточнение | WORK | GR-WORDORDER, GR-COND, GR-TV/ty | LEX-MEETING |
| FN-B1-003 | Объяснить квалификацию и опыт на собеседовании | WORK | GR-TENSE-PAST, GR-ASPECT, GR-CASE-INS | LEX-CV-ORAL |
| FN-B1-004 | Написать служебный e-mail: status, blocker, prośba | WORK, FORMAL | GR-TV, GR-COMPLEX, GR-ORTH | LEX-EMAIL-B1 |
| FN-B1-005 | Сообщить о конфликте смены / недопонимании инструкции | WORK, COMPLAINT | GR-TENSE-PAST, GR-ASPECT, GR-REFL | LEX-WORK-CONFLICT |
| FN-B1-006 | Вести переговоры об условиях аренды и ремонте | HOUSING | GR-COND, GR-NUM, GR-COMPLEX | LEX-HOUSING-B1 |
| FN-B1-007 | Понять и оспорить пункт umowy (своими словами) | HOUSING, FORMAL | рецептив GR-COMPLEX, GR-CASE-GEN | LEX-CONTRACT-B1 |
| FN-B1-008 | Написать pismo / e-mail do wspólnoty / właściciela | HOUSING, FORMAL | GR-TV, GR-CASE-DAT/GEN | LEX-FORMAL-B1 |
| FN-B1-009 | Пройти сложный визит в urzędzie: объяснить historię sprawy | URZAD | GR-TENSE-*, GR-ASPECT, GR-COMPLEX | LEX-URZAD-B1 |
| FN-B1-010 | Запросить / предоставить дополнительные документы с обоснованием | URZAD | GR-CASE-GEN, GR-MODAL, GR-FORMAL | LEX-DOCS-B1 |
| FN-B1-011 | Понять решение / wezwanie / pismo urzędowe (главное) | URZAD | рецептив, GR-PASS/PART по уровню | LEX-URZAD-READ |
| FN-B1-012 | Описать историю болезни и лекарства связно | MED | GR-ASPECT, GR-TENSE-PAST, GR-NUM | LEX-MED-B1 |
| FN-B1-013 | Задать врачу уточняющие вопросы о рисках / сроках | MED | GR-Q, GR-COND, GR-TV | LEX-MED-B1 |
| FN-B1-014 | Обжаловать запись / отказ wizyty (вежливо, аргументированно) | MED, COMPLAINT | GR-COMPLEX, GR-FORMAL | LEX-COMPLAINT-B1 |
| FN-B1-015 | Обсудить z nauczycielami plan wsparcia ребёнка | SCHOOL | GR-TV, GR-COMPLEX, GR-COND | LEX-SCHOOL-B1 |
| FN-B1-016 | Написать uzasadnienie / wniosek szkolny | SCHOOL, FORMAL | GR-FORMAL, GR-CASE-*, GR-ORTH | LEX-SCHOOL-WRITE |
| FN-B1-017 | Понять komunikat szkoły о wycieczce / zagrożeniu | SCHOOL | рецептив | LEX-SCHOOL-READ |
| FN-B1-018 | Решить спорную ситуацию в банке (opłata, blokada karty) | BANK, COMPLAINT | GR-TENSE-PAST, GR-NUM, GR-FORMAL | LEX-BANK-B1 |
| FN-B1-019 | Сравнить продукты банка / страхование на бытовом уровне | BANK | GR-COMP, GR-COND | LEX-BANK-B1 |
| FN-B1-020 | Провести reklamację с ссылкой на срок / чек / ustawę (бытовая формулировка) | SHOP, COMPLAINT | GR-COMPLEX, GR-CASE-GEN | LEX-COMPLAINT-B1 |
| FN-B1-021 | Отказаться от навязанной услуги и зафиксировать отказ | SHOP, BANK, PHONE | GR-NEG, GR-FORMAL, GR-IMP | LEX-REFUSAL-B1 |
| FN-B1-022 | Объяснить опоздание транспорта и последствия для работы | TRANS, WORK | GR-ASPECT, GR-CAUSE | LEX-TRANS-B1 |
| FN-B1-023 | Пожаловаться перевозчику / найти альтернативу | TRANS, COMPLAINT | GR-COND, GR-MODAL | LEX-TRANS-B1 |
| FN-B1-024 | Урегулировать конфликт с соседом (шум, запах, место parking) | NEIGHBOR, COMPLAINT | GR-TV, GR-COND, GR-COMPLEX | LEX-NEIGHBOR-B1 |
| FN-B1-025 | Участвовать в zebranie wspólnoty: кратко взять слово | NEIGHBOR, HOUSING | GR-WORDORDER, GR-FORMAL | LEX-MEETING |
| FN-B1-026 | Вести телефонные переговоры с несколькими темами | PHONE | GR-COMPLEX, repair strategies | LEX-PHONE-B1 |
| FN-B1-027 | Оставить структурированное голосовое: контекст–просьба–контакт | PHONE | GR-IMP, GR-CASE-* | LEX-PHONE-B1 |
| FN-B1-028 | Сформулировать skargę письменно по схеме | COMPLAINT, FORMAL | GR-FORMAL, GR-TENSE-PAST, GR-ASPECT | LEX-COMPLAINT-WRITE |
| FN-B1-029 | Смягчить отказ и сохранить отношения | COMPLAINT, WORK, SOCIAL | GR-COND, GR-TV | LEX-SOFTEN |
| FN-B1-030 | Настоять на просьбе без грубости (escalation вежливая) | COMPLAINT, URZAD | GR-MODAL, GR-COMPLEX | LEX-ASSERTIVE |
| FN-B1-031 | Управлять регистром pan/pani/ty в смешанной группе | TV, WORK | GR-TV, GR-MASC-PERS | LEX-TV-B1 |
| FN-B1-032 | Выбрать wołacz / имя / должность уместно | TV, SCHOOL, MED, WORK | GR-CASE-VOC, GR-TV | LEX-ADDRESS-FORMS |
| FN-B1-033 | Написать oficjalne pismo: nagłówek, cel, uzasadnienie, zakończenie | FORMAL | GR-FORMAL, GR-COMPLEX, GR-ORTH | LEX-LETTER-B1 |
| FN-B1-034 | Написать полуформальный e-mail «на грани» ty/pan | FORMAL, WORK | GR-TV | LEX-EMAIL-B1 |
| FN-B1-035 | Рассказать историю с причиной–следствием и оценкой | EVERYDAY, WORK | GR-ASPECT, GR-COMPLEX, GR-WORDORDER | LEX-NARRATIVE-B1 |
| FN-B1-036 | Аргументировать «за/против» бытового решения | HOUSING, SCHOOL, WORK | GR-COND, GR-COMP, GR-COMPLEX | LEX-ARGUMENT-B1 |
| FN-B1-037 | Пересказать содержание новости / объявления / письма | URZAD, SCHOOL, WORK | рецептив + продакшн | LEX-MEDIATION-B1 |
| FN-B1-038 | Посредничать между поляком и L1-говорящим (устно, просто) | SOCIAL, SCHOOL, MED | mediation, GR-COMPLEX | LEX-MEDIATION-B1 |
| FN-B1-039 | Использовать liczebniki в деньгах, сроках, людях без срыва согласования | BANK, WORK, SCHOOL | GR-NUM, GR-MASC-PERS | LEX-NUM-B1 |
| FN-B1-040 | Выбрать видовую пару в прошлом/будущем по смыслу ситуации | ALL | GR-ASPECT, GR-TENSE-* | LEX-ASPECT-PAIRS |
| FN-B1-041 | Описать правила на работе / в доме и исключения | WORK, HOUSING | GR-COMPLEX, GR-MODAL | LEX-RULES-B1 |
| FN-B1-042 | Выразить гипотезу и условие (*gdyby*, *jeśli*) | WORK, HOUSING | GR-COND, GR-COMPLEX | LEX-HYPOTHESIS |
| FN-B1-043 | Дать развёрнутый отзыв об услуге (устно/письменно) | SHOP, MED, SCHOOL | GR-COMP, GR-ASPECT | LEX-REVIEW |
| FN-B1-044 | Понять и выполнить многошаговую инструкцию | WORK, MED, URZAD | рецептив | LEX-INSTRUCTIONS-B1 |
| FN-B1-045 | Сообщить плохие новости вежливо (отказ, задержка, отказ в визе/документе — бытовой тон) | FORMAL, WORK, URZAD | GR-SOFTEN, GR-TV | LEX-BADNEWS |
| FN-B1-046 | Запросить feedback и отреагировать на критику | WORK | GR-REFL, GR-COND | LEX-FEEDBACK |
| FN-B1-047 | Обсудить здоровье ребёнка / absencje со школой без паники | SCHOOL, MED | GR-TV, GR-ASPECT | LEX-SCHOOL-MED |
| FN-B1-048 | Спланировать бюджет месяца (язык: rachunki, limity) | BANK, HOUSING | GR-NUM, GR-FUT | LEX-BUDGET |
| FN-B1-049 | Объяснить культурное/прагматическое различие L1 vs PL (мета) | TV, SOCIAL | лексика вежливости | LEX-PRAG-META |
| FN-B1-050 | Подготовиться к устной части B1: описание + диалог + мнение | EXAM-ALIGNED | все столпы B1 | LEX-EXAM-ORAL-B1 |
| FN-B1-051 | Подготовиться к письму B1: выбор жанра под polecenie | EXAM-ALIGNED | GR-FORMAL/informal | LEX-EXAM-WRITE-B1 |
| FN-B1-052 | Распознать ловушки rekcja/aspect в grammar-модуле (тренировка) | EXAM-ALIGNED | GR-REKCJA, GR-ASPECT | — |
| FN-B1-053 | Вести разговор о правах потребителя / гарантии на бытовом уровне | SHOP, COMPLAINT | GR-COMPLEX | LEX-CONSUMER |
| FN-B1-054 | Согласовать совместный план (родители, коллеги, соседи) | SCHOOL, WORK, NEIGHBOR | GR-IMP/COND, GR-FUT | LEX-PLANNING |
| FN-B1-055 | Резюмировать договорённость и подтвердить письменно | WORK, HOUSING, SCHOOL | GR-FORMAL, GR-ASPECT | LEX-SUMMARY |

## B1.2 Сценарии

Rozmowa kwalifikacyjna; spotkanie z HR; negocjacje czynszu; reklamacja wieloetapowa; urząd z historią sprawy; wizyta u specjalisty; wywiadówka; spór z bankiem o opłatę; kontrola + odwołanie; zebranie mieszkańców; telefon z call center; skarga pisemna; przejście na ty w zespole; oficjalny e-mail «po spotkaniu».

## B1.3 Речевые акты

Аргументация; контраргумент; гипотеза; условие; резюме; эскалация вежливая; mediacja; оценка; критика смягчённая; настойчивая просьба; формальная жалоба; подтверждение договорённости.

## B1.4 Письменные жанры

Oficjalny e-mail; półformalny e-mail; skarga; wniosek; usprawiedliwienie rozbudowane; opis zdarzenia z chronologią; notatka służbowa; экзаменационно-совместимые wypowiedzi (оригинальные polecenia продукта).

## B1.5 Устные жанры

Монолог 2–3 мин; диалог с инициативой; telefon wielowątkowy; mini-presentation опыта; описание графика/схемы; выражение мнения с примерами; устная mediacja.

## B1.6 Прагматика

Face-saving при отказе; различение *proszę o* vs приказа; когда эскалировать на pismo; регистр на wywiadówka vs rozmowa z sąsiadem; избегание кальки «слишком прямого» отказа из L1.

## B1.7 Регистр

Полный спектр: oficjalny ↔ półoficjalny ↔ potoczny ostrożny. Осознание, что «бытовая беглость» ≠ официальная грамотность (важно для P-VIKTOR).

## B1.8 Компенсации

Определение через описание; аппроксимация + проверка; просьба о синониме; структурирование: *po pierwsze…*; переспрос фактов цифрами; письменное подтверждение после устного.

## B1.9 Чтение и аудирование

**Чтение:** pisma urzędowe (главное), umowy (ключевые статьи), artikuly popularne, e-maile wieloabzacowe, regulaminy, komunikaty szkoły.  
**Аудирование:** naturalniejsze tempo; dialogi z zakłóceniami; komunikaty; rozmowy służbowe; materiały exam-aligned (оригинальные). По стандарту B1 — отдельная оценка грамматики не заменяет R/L.

---

# B2

**CEFR-ориентир:** свободное подробное высказывание; нюансы мнения; понимание сложных текстов на конкретные и частично абстрактные темы в знакомых областях.  
**Госстандарт:** B2 — порог ≥60% каждой части (§ 23); сессии 2026 **announced** (часть дат; проверка 2026-09-05).

## B2.1 Коммуникативные функции

| ID | Функция | Домены | GR-пререквизиты | LEX-пререквизиты |
| --- | --- | --- | --- | --- |
| FN-B2-001 | Вести сложные переговоры об условиях работы / повышении | WORK | GR-COND, GR-COMPLEX, GR-WORDORDER | LEX-WORK-B2 |
| FN-B2-002 | Дать развёрнутую обратную связь коллеге / подчинённому | WORK | GR-SOFTEN, GR-ASPECT, GR-TV | LEX-FEEDBACK-B2 |
| FN-B2-003 | Защитить свою позицию на совещании с контраргументами | WORK | GR-WORDORDER, GR-COMPLEX | LEX-DEBATE-B2 |
| FN-B2-004 | Написать analityczny e-mail / notatkę z rekomendacją | WORK, FORMAL | GR-FORMAL, GR-PART/PASS по уровню | LEX-ANALYTIC |
| FN-B2-005 | Обсудить риски договора найма и предложить правки | HOUSING, FORMAL | GR-COND, GR-COMPLEX | LEX-CONTRACT-B2 |
| FN-B2-006 | Вести конфликт z wynajmującym до ugody / wypowiedzenia | HOUSING, COMPLAINT | GR-FORMAL, GR-ASPECT | LEX-HOUSING-B2 |
| FN-B2-007 | Понять сложное pismo urzędowe и составить odpowiedь | URZAD, FORMAL | рецептив высокий, GR-PASS | LEX-URZAD-B2 |
| FN-B2-008 | Обжаловать решение / złożyć odwołanie (язык структуры) | URZAD, COMPLAINT | GR-FORMAL, GR-COMPLEX | LEX-APPEAL |
| FN-B2-009 | Обсудить с врачом варианты лечения и побочные эффекты | MED | GR-COND, GR-COMPLEX, термины бытовые | LEX-MED-B2 |
| FN-B2-010 | Написать жалобу в placówka / NFZ-бытовой контур | MED, FORMAL | GR-FORMAL | LEX-COMPLAINT-B2 |
| FN-B2-011 | Участвовать в szkolne spotkanie z wieloma stronami | SCHOOL | GR-TV, GR-MEDIATION, GR-COMPLEX | LEX-SCHOOL-B2 |
| FN-B2-012 | Сформулировать wniosek o dostosowanie / indywidualny tok (бытовой язык) | SCHOOL, FORMAL | GR-FORMAL | LEX-SCHOOL-WRITE-B2 |
| FN-B2-013 | Вести спор с банком / страховой с опорой на документы | BANK, COMPLAINT | GR-FORMAL, GR-NUM, GR-COMPLEX | LEX-BANK-B2 |
| FN-B2-014 | Сравнить оферты и обосновать выбор | BANK, HOUSING, WORK | GR-COMP, GR-COND | LEX-COMPARE-B2 |
| FN-B2-015 | Провести сложную reklamację (seria usterek, terminy ustawowe — бытовая точность) | SHOP, COMPLAINT | GR-ASPECT, GR-FORMAL | LEX-CONSUMER-B2 |
| FN-B2-016 | Отказаться и зафиксировать отказ в переписке (dowód) | COMPLAINT, FORMAL | GR-NEG, GR-FORMAL | LEX-REFUSAL-B2 |
| FN-B2-017 | Решить транспортный спор (odszkodowanie za opóźnienie — язык претензии) | TRANS, COMPLAINT | GR-FORMAL | LEX-TRANS-B2 |
| FN-B2-018 | Модерировать конфликт соседей / предложить kompromis | NEIGHBOR | GR-COND, mediation | LEX-MEDIATION-B2 |
| FN-B2-019 | Выступить кратко на zebraniu z argumentacją | NEIGHBOR, WORK | GR-WORDORDER, GR-FORMAL | LEX-PUBLIC-SPEAK |
| FN-B2-020 | Вести трудный телефон: call center, эскалация, запись rozmowy (мета) | PHONE, COMPLAINT | repair + formal | LEX-PHONE-B2 |
| FN-B2-021 | Написать wielostronicowe pismo: chronologia, żądanie, załączniki | FORMAL, COMPLAINT | GR-FORMAL, GR-COMPLEX | LEX-LETTER-B2 |
| FN-B2-022 | Стилизовать один и тот же смысл под 3 регистра | TV, FORMAL | GR-TV, GR-WORDORDER | LEX-REGISTER-FLEX |
| FN-B2-023 | Распознать и скорректировать неуместный ty/pan в команде | TV, WORK | GR-TV | LEX-TV-B2 |
| FN-B2-024 | Использовать/избегать zdrobnienia и коллоквиализмы по ситуации | TV, SOCIAL | прагматика | LEX-COLLOQ-CONTROL |
| FN-B2-025 | Строить развёрнутую аргументацию с уступкой (*co prawda… jednak*) | ALL | GR-COMPLEX, GR-WORDORDER | LEX-ARGUMENT-B2 |
| FN-B2-026 | Гипотезы, контрфактивы, осторожные выводы | WORK, URZAD, MED | GR-COND, GR-COMPLEX | LEX-HYPOTHESIS-B2 |
| FN-B2-027 | Пересказать и оценить позицию автора текста | READING→SPEAK | mediation | LEX-MEDIATION-B2 |
| FN-B2-028 | Объяснить абстрактное правило на конкретном примере | WORK, URZAD, SCHOOL | GR-COMPLEX | LEX-EXPLAIN-B2 |
| FN-B2-029 | Вести small talk + переход к делу без прагматического сбоя | WORK, SOCIAL | GR-TV | LEX-SMALLTALK-B2 |
| FN-B2-030 | Описать сложный процесс (jak załatwić sprawę end-to-end) | URZAD, BANK, HOUSING | GR-ASPECT, GR-IMP/INF chains | LEX-PROCESS |
| FN-B2-031 | Выразить нюанс мнения (pewność, wątpliwość, dystans) | ALL | modality particles | LEX-STANCE |
| FN-B2-032 | Исправить себя и собеседника тактично | SOCIAL, WORK | GR-SOFTEN | LEX-REPAIR-B2 |
| FN-B2-033 | Синтезировать несколько источников (e-mail + umowa + rozmowa) | FORMAL, WORK | mediation | LEX-SYNTHESIS |
| FN-B2-034 | Подготовка к B2 mówienie: развёрнутое высказывание + реакция | EXAM-ALIGNED | все столпы B2 | LEX-EXAM-ORAL-B2 |
| FN-B2-035 | Подготовка к B2 pisanie: выбор регистра и структуры | EXAM-ALIGNED | GR-FORMAL | LEX-EXAM-WRITE-B2 |
| FN-B2-036 | Тренировка poprawność gramatyczna B2 (трансформации, rekcja, aspekt) | EXAM-ALIGNED | GR-* advanced | — |
| FN-B2-037 | Критическое чтение regulamin / oferty (ukryte koszty) | BANK, HOUSING, SHOP | рецептив | LEX-CRITICAL-READ |
| FN-B2-038 | Публичное извинение / объяснение инцидента | WORK, SCHOOL, NEIGHBOR | GR-FORMAL, GR-ASPECT | LEX-APOLOGY-B2 |
| FN-B2-039 | Согласовать ugoda и зафиксировать условия | COMPLAINT, HOUSING, WORK | GR-COND, GR-FORMAL | LEX-SETTLEMENT |
| FN-B2-040 | Обсудить этику/границы (dane osobowe, zgody — бытовой уровень) | URZAD, SCHOOL, WORK | GR-FORMAL | LEX-PRIVACY-BASIC |
| FN-B2-041 | Перевод смысла институционального текста «на человеческий» для семьи | MEDIATION | mediation | LEX-MEDIATION-B2 |
| FN-B2-042 | Вести дискуссию о школе/работе/жилье с примерами и обобщением | SCHOOL, WORK, HOUSING | GR-COMPLEX | LEX-DISCUSSION |
| FN-B2-043 | Использовать пассив/безличные формы в официальном стиле | FORMAL | GR-PASS | LEX-FORMAL-B2 |
| FN-B2-044 | Контролировать информационную структуру (тема–рема) в длинном монологе | ALL | GR-WORDORDER | — |
| FN-B2-045 | Распознать манипулятивные формулы call center / sprzedaży и отказать | PHONE, SHOP, BANK | прагматика | LEX-MANIP-RESIST |
| FN-B2-046 | Подготовить i wygłosić krótką prezentację (3–5 мин) | WORK, SCHOOL | GR-WORDORDER | LEX-PRESENTATION |
| FN-B2-047 | Написать recenzję / opinię z uzasadnieniem | SHOP, SCHOOL, WORK | GR-COMPLEX | LEX-REVIEW-B2 |
| FN-B2-048 | Сравнить две версии события и указать расхождения | COMPLAINT, WORK | GR-ASPECT, GR-COMPLEX | LEX-EVIDENCE |
| FN-B2-049 | Поддерживать вежливую твердость в длинной переписке | FORMAL, COMPLAINT | GR-FORMAL | LEX-PERSISTENCE |
| FN-B2-050 | Самооценка пробелов перед экзаменом B2 (метаучебная) | EXAM-ALIGNED | — | — |

## B2.2 Сценарии

Negocjacje wynagrodzenia; wypowiedzenie / aneks umowy najmu; odwołanie od decyzji; konsultacja ze specjalistą; spotkanie interdyscyplinarne w szkole; spór z ubezpieczycielem; reklamacja seryjna; mediacja sąsiedzka; call-center escalation; prezentacja w pracy; długa korespondencja oficjalna; exam-aligned zestawy продукта (не копии Komisji).

## B2.3 Речевые акты

Развёрнутая аргументация; уступка и контраст; гипотеза/контрфакт; оценка источника; эскалация; mediacja; синтез; публичное извинение; рекомендация; отказ с фиксацией.

## B2.4 Письменные жанры

Rozbudowane pismo oficjalne; analityczny e-mail; odwołanie; ugoda/potwierdzenie warunków; opinia/recenzja; notatka z rekomendacją; exam pisanie B2 (оригинальные задания).

## B2.5 Устные жанры

Монолог 3–5 мин; дискуссия; prezentacja; mediacja; трудный телефон; описание процесса; реакция на текст/иллюстрацию с оценкой.

## B2.6 Прагматика

Тонкая настройка дистанции; ирония — только рецептивно/осторожно; различение «прямоты» L1 и польской вежливости в конфликтах; этика цитирования чужих слов в жалобе.

## B2.7 Регистр

Свободное переключение oficjalny / półoficjalny / potoczny; контроль коллоквиализмов в экзаменационной и рабочей речи.

## B2.8 Компенсации

Лексическая аппроксимация с самокоррекцией; переспрос уточняющими категориями; структурация длинного хода; перенос части взаимодействия в письмо; проверка понимания собеседника.

## B2.9 Чтение и аудирование

**Чтение:** сложные pisma, договоры, статьи мнения, длинные e-mail threads, regulaminy с «мелким шрифтом».  
**Аудирование:** быстрая речь, перекрытия реплик, объявления с шумом, совещания, exam-aligned listening B2.

---

## 4. Связь с другими артефактами Phase 2

| Артефакт | Связь |
| --- | --- |
| `lexical-targets.md` | `LEX-*` домены и рабочие диапазоны |
| `level-exit-criteria.md` | когда FN считаются достигнутыми; слои exam readiness |
| `grammar-inventory.md` | замена временных `GR-*` на утверждённые ID |
| `l1-error-model.md` | типичные сбои функций для UKR/RUS/BEL |
| `07-exam-preparation-requirements.md` | статусы сессий и модулей |

---

## 5. История

| Дата | Событие |
| --- | --- |
| 2026-09-05 | Первая полная версия Phase 2 (замена placeholder) |
