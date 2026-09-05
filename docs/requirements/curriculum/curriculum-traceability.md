# Трассируемость учебной программы (curriculum traceability)

**Статус:** Phase 2 draft (curriculum)  
**Дата проверки:** 2026-09-05  
**Назначение:** карта связей «официальная функция / CEFR → уровень → коммуникативная цель → грамматика → лексика → L1-риски → тип свидетельства мастерства → экзаменационная релевантность».  
**Это не** схема БД, не ERD, не API и не Figma.

**Связанные артефакты:** `grammar-inventory.md`, `functional-inventory.md`, `lexical-targets.md`, `case-aspect-sequence.md`, `level-exit-criteria.md`, `l1-error-model.md`; требования `PED-*`, `EXM-*`, `ASM-*`, `CNT-*`.

**Семантические ID:** используются стабильные шаблоны `GR-*` (грамматика) и `FN-*` (функция/речевой акт). Точные номера в sibling-файлах могут чуть отличаться при дальнейшей нумерации — **семантика ID сохраняется**.

**Счётчик цепочек в этом документе:** **52** полных трассировочных цепи (CHAIN-01 … CHAIN-52).

---

## 1. Легенда полей цепи

| Поле | Содержание |
| --- | --- |
| CEFR / офиц. функция | Дескриптор умения или функция из каталогов A/B (załącznik nr 1 к Dz.U. 2025 poz. 217) — **семантическая** привязка, не копипаст текста постановления |
| Уровень | A1 / A2 / B1 / B2 (спираль: возврат столпа с новым доменом) |
| Коммуникативная цель | Что учащийся **делает** на польском |
| FN-* | Коммуникативная / функциональная единица |
| GR-* | Грамматические концепты |
| Лексические домены | Тематические поля словаря |
| L1-риски | Ссылки на ERR-* / кластеры из `l1-error-model.md` |
| Свидетельство мастерства | Тип evidence (не метрика vanity) |
| Экзамен | `exam-prep` / `standards-aligned` / `future-exam-compatible` / `low` |

Типы свидетельства (кратко):

- `closed_key` — закрытый ключ (падеж, орфография, rekcja)
- `guided_prod` — управляемая продукция (подстановка, трансформ)
- `spoken_task` — устная ролевая / ответ на стимул
- `written_genre` — письмо заданного жанра
- `receptive` — чтение/слух с проверкой понимания
- `l1_contrast` — XT-33/XT-52 различение L1 vs PL
- `integrated` — интегрированный сценарий домена

---

## 2. Индекс доменов → цепи

| Домен | Код | Цепи |
| --- | --- | --- |
| Работа | WORK | CHAIN-01…04 |
| Аренда жилья | RENT | CHAIN-05…08 |
| Urząd | URZAD | CHAIN-09…12 |
| Медицина | MED | CHAIN-13…16 |
| Школа / дети | SCHOOL | CHAIN-17…20 |
| Банк | BANK | CHAIN-21…24 |
| Покупки | SHOP | CHAIN-25…28 |
| Транспорт | TRANS | CHAIN-29…32 |
| Соседи | NEIGH | CHAIN-33…36 |
| Телефон | PHONE | CHAIN-37…40 |
| Жалобы / претензии | COMPL | CHAIN-41…44 |
| T–V / обращения | TV | CHAIN-45…48 |
| Формальная почта | MAIL | CHAIN-49…52 |

---

## 3. Полные цепи

### 3.1 Работа (WORK)

#### CHAIN-01 — A1 · представиться на работе
| Поле | Значение |
| --- | --- |
| CEFR / офиц. функция | Представиться; назвать профессию; простые сведения о себе (A1 contact / identification) |
| Уровень | A1 |
| Коммуникативная цель | Назвать имя, должность, откуда, язык общения |
| FN-* | `FN-WORK-INTRO` |
| GR-* | `GR-PRES-BYC`, `GR-CASE-NOM`, `GR-ADV-PO` (`po polsku`), `GR-REG-TV` |
| Лексика | zawody, kraje, języki |
| L1-риски | ERR-RUS-19 (`po polsku`); ERR-UKR-18 / ERR-RUS-18 / ERR-BEL-18 (регистр); ERR-*-04/05 (`mam` / `podoba`) |
| Свидетельство | `spoken_task` + `closed_key` (формы `jestem`, `nazywam się`) |
| Экзамен | standards-aligned (A1); future-exam-compatible |

#### CHAIN-02 — A2 · согласовать смену / простой запрос начальнику
| Поле | Значение |
| --- | --- |
| CEFR / функция | Просьба; договорённость о времени (A2 transactions) |
| Уровень | A2 |
| Цель | Попросить перенос смены; подтвердить час |
| FN-* | `FN-WORK-SHIFT` |
| GR-* | `GR-PREP-DAY` (`w środę`), `GR-MODAL-MOC-MUSIEC`, `GR-REG-TV`, `GR-ASP-FUT` (intro) |
| Лексика | zmiana, grafik, urlop (базово) |
| L1-риски | ERR-RUS-10; ERR-UKR-11 / ERR-RUS-12 / ERR-BEL-12; T–V |
| Свидетельство | `guided_prod` + `written_genre` (короткий chat) |
| Экзамен | standards-aligned |

#### CHAIN-03 — B1 · устное объяснение задачи коллеге
| Поле | Значение |
| --- | --- |
| CEFR / функция | Описать процедуру; дать инструкцию (B1) |
| Уровень | B1 |
| Цель | Объяснить шаги задачи; уточнить ответственность |
| FN-* | `FN-WORK-INSTRUCT` |
| GR-* | `GR-ASP-IMP`, `GR-ASP-PAST`, `GR-WO-SIE`, `GR-GEN-MO` |
| Лексика | zadanie, termin, odpowiedzialność, raport |
| L1-риски | ERR-RUS-13; ERR-UKR-20; ERR-RUS-22; aspect banks |
| Свидетельство | `spoken_task` + `integrated` |
| Экзамен | exam-prep (B1 mówienie — релевантность сценария) |

#### CHAIN-04 — B2 · совещание: аргумент и компромисс
| Поле | Значение |
| --- | --- |
| CEFR / функция | Аргументировать; согласиться/возразить вежливо (B2) |
| Уровень | B2 |
| Цель | Предложить решение; смягчить несогласие |
| FN-* | `FN-WORK-MEETING` |
| GR-* | `GR-WO-IS`, `GR-COMP-ZE`, `GR-REG-TV`, `GR-CONN-CONTRAST` |
| Лексика | propozycja, ryzyko, kompromis, harmonogram |
| L1-риски | ERR-RUS-20; MUT-01; formal vs informal tone |
| Свидетельство | `spoken_task` (рубрика естественности) |
| Экзамен | exam-prep B2 |

---

### 3.2 Аренда (RENT)

#### CHAIN-05 — A1 · понять объявление / назвать тип жилья
| Поле | Значение |
| --- | --- |
| CEFR / функция | Понять простые объявления; назвать жильё |
| Уровень | A1 |
| Цель | Отличить pokój / kawalerka / mieszkanie |
| FN-* | `FN-RENT-AD-READ` |
| GR-* | `GR-CASE-NOM-ACC`, `GR-NUM-1-4`, `GR-FF-LEX` |
| Лексика | czynsz, kaucja (рецептивно), pokój, piętro |
| L1-риски | ERR-*-13/14/15 FF (`magazyn` не путать); ERR-BEL-15 |
| Свидетельство | `receptive` + `l1_contrast` |
| Экзамен | standards-aligned |

#### CHAIN-06 — A2 · осмотр квартиры: вопросы хозяину
| Поле | Значение |
| --- | --- |
| CEFR / функция | Задать вопросы о месте; понять ответы |
| Уровень | A2 |
| Цель | Спросить о mediаch, kaucji, terminie |
| FN-* | `FN-RENT-VIEWING` |
| GR-* | `GR-INT-CZY`, `GR-REK-CZEKAC` (termin), `GR-PREP-LOC`, `GR-REG-TV` |
| Лексика | media, kaucja, umowa, wynajmujący |
| L1-риски | ERR-UKR-02/06; ERR-RUS-06; T–V |
| Свидетельство | `spoken_task` + `closed_key` (pytania) |
| Экзамен | standards-aligned |

#### CHAIN-07 — B1 · обсудить условия договора
| Поле | Значение |
| --- | --- |
| CEFR / функция | Понять основные условия; выразить согласие/ Condycje |
| Уровень | B1 |
| Цель | Уточнить okres wypowiedzenia, podwyżkę czynszu |
| FN-* | `FN-RENT-CONTRACT` |
| GR-* | `GR-COMP-ZE`, `GR-ASP-FUT`, `GR-CASE-GEN-NEG`, `GR-NUM-5PLUS` |
| Лексика | wypowiedzenie, aneks, podwyżka, protokół |
| L1-риски | ERR-UKR-03; ERR-UKR-22; aspect |
| Свидетельство | `receptive` (fragment umowy) + `written_genre` (pytania mailem) |
| Экзамен | exam-prep (czytanie B1 — бытовой юридический текст упрощённо) |

#### CHAIN-08 — B2 · переговоры о ремонте / спорном пункте
| Поле | Значение |
| --- | --- |
| CEFR / функция | Вести переговоры; жаловаться аргументированно |
| Уровень | B2 |
| Цель | Добиться naprawy без эскалации |
| FN-* | `FN-RENT-NEGOTIATE` |
| GR-* | `GR-REG-TV`, `GR-WO-IS`, `GR-ASP-IMP`, `FN-COMPLAIN` overlap |
| Лексика | usterka, ekspertyza, odszkodowanie (пассивно) |
| L1-риски | ERR-RUS-24; ERR-UKR-24 |
| Свидетельство | `integrated` + `spoken_task` |
| Экзамен | exam-prep B2 |

---

### 3.3 Urząd (URZAD)

#### CHAIN-09 — A1 · записаться / подойти к окенку
| Поле | Значение |
| --- | --- |
| CEFR / функция | Простые контакты с учреждениями; вежливые формулы |
| Уровень | A1 |
| Цель | Взять numerek; сказать cel wizyty |
| FN-* | `FN-URZAD-COUNTER` |
| GR-* | `GR-REG-TV`, `GR-CASE-VOC`, `GR-PRES-BYC`, `GR-INT-CZY` |
| Лексика | urząd, okienko, sprawa, dowód |
| L1-риски | ERR-RUS-01 (wołacz); ERR-*-18; ERR-UKR-02 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned / future-exam-compatible |

#### CHAIN-10 — A2 · подать простой wniosek (устно + форма)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Заполнить простую форму; объяснить цель |
| Уровень | A2 |
| Цель | Назвать rodzaj wniosku; отдать dokumenty |
| FN-* | `FN-URZAD-WNIOSEK` |
| GR-* | `GR-CASE-GEN`, `GR-PREP-DO-NA`, `GR-ASP-FUT` intro, `GR-ORTH-HCH` |
| Лексика | wniosek, załącznik, termin, pieczątka |
| L1-риски | ERR-BEL-01/02 (орфо в формах); ERR-RUS-09 |
| Свидетельство | `guided_prod` + `written_genre` (pola formularza) |
| Экзамен | standards-aligned |

#### CHAIN-11 — B1 · объяснить статус дела / донести документ
| Поле | Значение |
| --- | --- |
| CEFR / функция | Описать ситуацию; понять инструкции чиновника |
| Уровень | B1 |
| Цель | Сказать, czego brakuje; kiedy wrócę |
| FN-* | `FN-URZAD-STATUS` |
| GR-* | `GR-ASP-FUT`, `GR-ASP-PAST`, `GR-NEG-NIEMA`, `GR-REK-CZEKAC` |
| Лексика | braki, uzupełnienie, decyzja, odwołanie (intro) |
| L1-риски | ERR-*-11/12 aspect; ERR-RUS-21 |
| Свидетельство | `spoken_task` + `receptive` |
| Экзамен | exam-prep B1 |

#### CHAIN-12 — B2 · понять решение / подготовить odwołanie (учебный жанр)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Понять официальный текст; аргументированное письмо |
| Уровень | B2 |
| Цель | Выделить решение; набросать odwołanie по шаблону продукта |
| FN-* | `FN-URZAD-ODWOLANIE` |
| GR-* | `GR-COMP-ZE`, `GR-CONN-*`, `GR-REG-TV`, `FN-MAIL-FORMAL` |
| Лексика | decyzja, uzasadnienie, odwołanie, termin |
| L1-риски | ERR-UKR-24; ERR-BEL-23; MUT-01 |
| Свидетельство | `written_genre` + `receptive` |
| Экзамен | exam-prep B2 (pisanie); **не** юридическая услуга (EXM-013) |

---

### 3.4 Медицина (MED)

#### CHAIN-13 — A1 · записаться к врачу / назвать симптом просто
| Поле | Значение |
| --- | --- |
| CEFR / функция | Сообщить о самочувствии простыми словами |
| Уровень | A1 |
| Цель | Umówić wizytę; сказать *boli mnie…* |
| FN-* | `FN-MED-APPOINT` |
| GR-* | `GR-REK-BOLEC`, `GR-PREP-DAY`, `GR-REG-TV`, `GR-CASE-VOC` |
| Лексика | lekarz, recepcja, gardło, temperatura |
| L1-риски | ERR-RUS-01; ERR-RUS-10; T–V |
| Свидетельство | `spoken_task` + `closed_key` |
| Экзамен | standards-aligned |

#### CHAIN-14 — A2 · описать симптомы и длительность
| Поле | Значение |
| --- | --- |
| CEFR / функция | Описать простую проблему здоровья |
| Уровень | A2 |
| Цель | Сказать od kiedy; co przyjmuję |
| FN-* | `FN-MED-SYMPTOMS` |
| GR-* | `GR-ASP-PAST` intro, `GR-PREP-OD-DO`, `GR-NUM-TIME` |
| Лексика | objawy, tablełka, recepta, alergia |
| L1-риски | ERR-UKR-12; ERR-BEL-13 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-15 — B1 · понять zalecenia / пересказать
| Поле | Значение |
| --- | --- |
| CEFR / функция | Понять инструкции; пересказать третьему лицу |
| Уровень | B1 |
| Цель | Powtórzyć dawkowanie; kiedy wrócić |
| FN-* | `FN-MED-ADVICE` |
| GR-* | `GR-ASP-IMP`, `GR-MODAL`, `GR-COMP-ZE`, `GR-GEN-MO` |
| Лексика | dawkowanie, skierowanie, badania |
| L1-риски | ERR-RUS-13; ERR-BEL-22 |
| Свидетельство | `receptive` + `guided_prod` |
| Экзамен | exam-prep |

#### CHAIN-16 — B2 · объяснить хроническую ситуацию / страх ошибки регистра
| Поле | Значение |
| --- | --- |
| CEFR / функция | Подробный рассказ о здоровье; вежливые уточнения |
| Уровень | B2 |
| Цель | Описать historię; задать уточняющие вопросы |
| FN-* | `FN-MED-HISTORY` |
| GR-* | `GR-WO-IS`, `GR-ASP-*`, `GR-REG-TV` |
| Лексика | przewlekły, diagnoza, ubezpieczenie |
| L1-риски | MUT-01; register High severity |
| Свидетельство | `integrated` |
| Экзамен | exam-prep B2 |

---

### 3.5 Школа (SCHOOL)

#### CHAIN-17 — A1 · представиться в szkole ребёнка / понять расписание дня
| Поле | Значение |
| --- | --- |
| CEFR / функция | Простые контакты школа–родитель |
| Уровень | A1 |
| Цель | Назвать ребёнка; день недели |
| FN-* | `FN-SCHOOL-INTRO` |
| GR-* | `GR-PREP-DAY`, `GR-POSS-MAM`, `GR-REG-TV` |
| Лексика | szkoła, klasa, wychowawca, lekcja |
| L1-риски | ERR-*-04; ERR-RUS-10 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-18 — A2 · объяснение неявки / prośba o usprawiedliwienie
| Поле | Значение |
| --- | --- |
| CEFR / функция | Объяснить отсутствие; короткая просьба |
| Уровень | A2 |
| Цель | Napisać usprawiedliwienie |
| FN-* | `FN-SCHOOL-ABSENCE` |
| GR-* | `GR-PREP-PO`, `GR-ASP-PAST`, `FN-MAIL` light, `GR-COMP-ZE` |
| Лексика | nieobecność, usprawiedliwienie, choroba |
| L1-риски | ERR-UKR-21; ERR-RUS-11; ERR-UKR-03 |
| Свидетельство | `written_genre` |
| Экзамен | standards-aligned |

#### CHAIN-19 — B1 · zebranie: понять i zabrać głos
| Поле | Значение |
| --- | --- |
| CEFR / функция | Участие в обсуждении; мнение |
| Уровень | B1 |
| Цель | Задать вопрос o oceny / wycieczkę |
| FN-* | `FN-SCHOOL-MEETING` |
| GR-* | `GR-GEN-MO`, `GR-NUM-MO`, `GR-REG-TV`, `GR-WO-SIE` |
| Лексика | zebranie, oceny, wycieczka, składek |
| L1-риски | ERR-RUS-22/23; ERR-UKR-22 |
| Свидетельство | `spoken_task` + `receptive` |
| Экзамен | exam-prep |

#### CHAIN-20 — B2 · спор о оценке / конфликт вежливо
| Поле | Значение |
| --- | --- |
| CEFR / функция | Аргументация; выражение несогласия |
| Уровень | B2 |
| Цель | Objaśnić stanowisko bez agresji |
| FN-* | `FN-SCHOOL-DISPUTE` |
| GR-* | `GR-WO-IS`, `GR-CONN-*`, `GR-REG-TV` |
| Лексика | odwołanie oceny, kryteria, zachowanie |
| L1-риски | ERR-RUS-24 pattern; MUT |
| Свидетельство | `integrated` |
| Экзамен | exam-prep B2 |

---

### 3.6 Банк (BANK)

#### CHAIN-21 — A1 · открыть простой контакт / понять суммы
| Поле | Значение |
| --- | --- |
| CEFR / функция | Числа, деньги, простые услуги |
| Уровень | A1 |
| Цель | Сказать, że chcę konto; понять kwotę |
| FN-* | `FN-BANK-BASIC` |
| GR-* | `GR-NUM-1-4`, `GR-NUM-MONEY` intro, `GR-REG-TV` |
| Лексика | konto, karta, wpłata, wypłata |
| L1-риски | T–V High; liczebniki |
| Свидетельство | `closed_key` + `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-22 — A2 · объяснить problem z kartą
| Поле | Значение |
| --- | --- |
| CEFR / функция | Сообщить о проблеме; понять инструкцию |
| Уровень | A2 |
| Цель | Zastrzec kartę / zgłosić brak przelewu |
| FN-* | `FN-BANK-CARD` |
| GR-* | `GR-ASP-PAST`, `GR-REK-DZWONIC`, `GR-NEG-NIEMA` |
| Лексика | zastrzeżenie, przelew, prowizja |
| L1-риски | ERR-*-07; ERR-RUS-21 |
| Свидетельство | `spoken_task` + phone overlap |
| Экзамен | standards-aligned |

#### CHAIN-23 — B1 · понять umowę / opłaty
| Поле | Значение |
| --- | --- |
| CEFR / функция | Понять информационный текст об услугах |
| Уровень | B1 |
| Цель | Wyjaśnić opłaty; zadać pytania |
| FN-* | `FN-BANK-FEES` |
| GR-* | `GR-NUM-5PLUS`, `GR-CASE-GEN`, `GR-COMP-ZE` |
| Лексика | opłata, oprocentowanie, limity |
| L1-риски | ERR-UKR-22; ERR-RUS-23 |
| Свидетельство | `receptive` + `guided_prod` |
| Экзамен | exam-prep |

#### CHAIN-24 — B2 · рекламация банковской услуги
| Поле | Значение |
| --- | --- |
| CEFR / функция | Формальная жалоба; аргументы |
| Уровень | B2 |
| Цель | Napisać reklamację |
| FN-* | `FN-BANK-RECLAIM` |
| GR-* | `FN-MAIL-FORMAL`, `GR-ASP-*`, `GR-CONN-*` |
| Лексика | reklamacja, odstąpienie, potwierdzenie |
| L1-риски | ERR-UKR-24; ERR-BEL-23 |
| Свидетельство | `written_genre` |
| Экзамен | exam-prep B2 pisanie |

---

### 3.7 Покупки (SHOP)

#### CHAIN-25 — A1 · купить / спросить цену
| Поле | Значение |
| --- | --- |
| CEFR / функция | Покупки; цены; количество |
| Уровень | A1 |
| Цель | Poprosić o produkt; zapłacić |
| FN-* | `FN-SHOP-BUY` |
| GR-* | `GR-CASE-ACC-GEN`, `GR-NEG-NIEMA`, `GR-NUM-1-4`, `GR-REG-PROSZE` |
| Лексика | sklep, cena, kilogram, kolejka |
| L1-риски | ERR-*-13 FF magazyn; ERR-BEL-24; ERR-*-23 |
| Свидетельство | `spoken_task` + `l1_contrast` |
| Экзамен | standards-aligned |

#### CHAIN-26 — A2 · обмен / возврат
| Поле | Значение |
| --- | --- |
| CEFR / функция | Просьба об обмене; объяснить причину |
| Уровень | A2 |
| Цель | Zwrócić towar; poprosić o paragon |
| FN-* | `FN-SHOP-RETURN` |
| GR-* | `GR-ASP-PAST`, `GR-PREP-PO`, `GR-REG-TV` |
| Лексика | paragon, zwrot, reklamacja (intro), rozmiar |
| L1-риски | aspect; register |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-27 — B1 · сравнить oferty / online vs stacjonarnie
| Поле | Значение |
| --- | --- |
| CEFR / функция | Сравнение; мнение; совет |
| Уровень | B1 |
| Цель | Porównać ceny i jakość |
| FN-* | `FN-SHOP-COMPARE` |
| GR-* | `GR-COMP-ADJ`, `GR-ASP-FUT`, `GR-WO-IS` |
| Лексика | promocja, dostawa, opinia |
| L1-риски | MUT-01; word order |
| Свидетельство | `guided_prod` + `spoken_task` |
| Экзамен | exam-prep |

#### CHAIN-28 — B2 · сложная reklamacja produktu
| Поле | Значение |
| --- | --- |
| CEFR / функция | Развёрнутая жалоба; переговоры |
| Уровень | B2 |
| Цель | Добиться wymiany / zwrotu z uzasadnieniem |
| FN-* | `FN-SHOP-CLAIM` |
| GR-* | `FN-MAIL-FORMAL`, `GR-CONN-*`, `GR-ASP-IMP` |
| Лексика | wada, gwarancja, ekspertyza |
| L1-риски | ERR-RUS-24; complaints cluster |
| Свидетельство | `written_genre` + `integrated` |
| Экзамен | exam-prep B2 |

---

### 3.8 Транспорт (TRANS)

#### CHAIN-29 — A1 · спросить дорогу / билет
| Поле | Значение |
| --- | --- |
| CEFR / функция | Ориентация в городе; транспорт |
| Уровень | A1 |
| Цель | Kupić bilet; spytać o przystanek |
| FN-* | `FN-TRANS-TICKET` |
| GR-* | `GR-PREP-DIR`, `GR-REK-CZEKAC`, `GR-INT-CZY` |
| Лексика | autobus, bilet, przystanek, kierunek |
| L1-риски | ERR-UKR-06/10; ERR-RUS-06/09 |
| Свидетельство | `spoken_task` + `closed_key` |
| Экзамен | standards-aligned |

#### CHAIN-30 — A2 · объяснить опоздание / przesiadkę
| Поле | Значение |
| --- | --- |
| CEFR / функция | Рассказать о перемещении; причины |
| Уровень | A2 |
| Цель | Opowiedzieć o spóźnieniu |
| FN-* | `FN-TRANS-DELAY` |
| GR-* | `GR-ASP-PAST`, `GR-PREP-PO`, `GR-COMP-ZE` |
| Лексика | opóźnienie, przesiadka, rozkład |
| L1-риски | ERR-UKR-12; ERR-UKR-03 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-31 — B1 · спланировать podróż intercity
| Поле | Значение |
| --- | --- |
| CEFR / функция | Планирование; сравнение вариантов |
| Уровень | B1 |
| Цель | Wybrać pociąg; uzasadnić |
| FN-* | `FN-TRANS-PLAN` |
| GR-* | `GR-ASP-FUT`, `GR-NUM-TIME`, `GR-COMP-ADJ` |
| Лексика | rezerwacja, peron, zniżka |
| L1-риски | ERR-*-11/12 future aspect |
| Свидетельство | `integrated` |
| Экзамен | exam-prep |

#### CHAIN-32 — B2 · спор / wyjaśnienie mandatu (учебный)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Объяснить ситуацию властям/контролёру вежливо |
| Уровень | B2 |
| Цель | Wyjaśnić okoliczności bez eskalacji |
| FN-* | `FN-TRANS-FINE` |
| GR-* | `GR-REG-TV`, `GR-WO-IS`, `GR-ASP-PAST` |
| Лексика | mandat, kontroler, odwołanie |
| L1-риски | register High; MUT |
| Свидетельство | `spoken_task` |
| Экзамен | exam-prep (sytuacje) |

---

### 3.9 Соседи (NEIGH)

#### CHAIN-33 — A1 · поздороваться / представить себя
| Поле | Значение |
| --- | --- |
| CEFR / функция | Контакты с соседями; формулы |
| Уровень | A1 |
| Цель | Przywitać się; powiedzieć skąd jestem |
| FN-* | `FN-NEIGH-HELLO` |
| GR-* | `GR-CASE-VOC`, `GR-REG-TV`, `GR-PRES` |
| Лексика | sąsiad, klatka, piętro |
| L1-риски | ERR-RUS-01; ERR-UKR-19; ERR-BEL-19 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-34 — A2 · попросить o ciszę / pożyczyć narzędzie
| Поле | Значение |
| --- | --- |
| CEFR / функция | Просьба; согласие/отказ |
| Уровень | A2 |
| Цель | Poprosić o ciszę po 22:00 |
| FN-* | `FN-NEIGH-REQUEST` |
| GR-* | `GR-ASP-IMP`, `GR-REG-TV`, `GR-PREP-PO` |
| Лексика | hałas, wiertarka, cisza nocna |
| L1-риски | ERR-RUS-13; register |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-35 — B1 · mediować drobny konflikt
| Поле | Значение |
| --- | --- |
| CEFR / функция | Выразить недовольство; предложить решение |
| Уровень | B1 |
| Цель | Zaproponować kompromis |
| FN-* | `FN-NEIGH-CONFLICT` |
| GR-* | `GR-WO-SIE`, `GR-CONN-*`, `GR-GEN-MO` |
| Лексика | kompromis, administracja, protokół |
| L1-риски | ERR-UKR-20; ERR-RUS-22 |
| Свидетельство | `integrated` |
| Экзамен | exam-prep |

#### CHAIN-36 — B2 · zebrać wspólnotę / napisać do administracji
| Поле | Значение |
| --- | --- |
| CEFR / функция | Формальное письмо; убеждение |
| Уровень | B2 |
| Цель | Napisać petycję / zgłoszenie |
| FN-* | `FN-NEIGH-ADMIN` |
| GR-* | `FN-MAIL-FORMAL`, `GR-NUM-MO`, `GR-WO-IS` |
| Лексика | wspólnota, zarządca, usterka |
| L1-риски | ERR-*-24 mail; ERR-RUS-23 |
| Свидетельство | `written_genre` |
| Экзамен | exam-prep B2 |

---

### 3.10 Телефон (PHONE)

#### CHAIN-37 — A1 · начать / закончить rozmowę
| Поле | Значение |
| --- | --- |
| CEFR / функция | Телефонные формулы A1 |
| Уровень | A1 |
| Цель | Odebrać; przedstawić się; pożegnać |
| FN-* | `FN-PHONE-OPEN` |
| GR-* | `GR-REG-TV`, `GR-REK-DZWONIC`, `GR-INT-CZY` |
| Лексика | słucham, proszę, dziękuję, do widzenia |
| L1-риски | ERR-*-07; ERR-BEL-24 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-38 — A2 · zostawić wiadomość / umówić callback
| Поле | Значение |
| --- | --- |
| CEFR / функция | Передать сообщение; договориться о звонке |
| Уровень | A2 |
| Цель | Poprosić o oddzwonienie |
| FN-* | `FN-PHONE-CALLBACK` |
| GR-* | `GR-ASP-FUT`, `GR-REK-CZEKAC`, `GR-PREP-DAY` |
| Лексика | oddzwonić, sekretariat, numer |
| L1-риски | ERR-*-06; ERR-RUS-10 |
| Свидетельство | `spoken_task` + `guided_prod` |
| Экзамен | standards-aligned |

#### CHAIN-39 — B1 · wyjaśnić sprawę w urzędzie telefonicznie
| Поле | Значение |
| --- | --- |
| CEFR / функция | Сложная телефонная интеракция |
| Уровень | B1 |
| Цель | Opisać sprawę; zrozumieć instrukcję |
| FN-* | `FN-PHONE-URZAD` |
| GR-* | `GR-ASP-*`, `GR-COMP-ZE`, `GR-NEG-NIEMA`, `GR-REG-TV` |
| Лексика | sygnatura, dokument, termin |
| L1-риски | aspect; ERR-UKR-03; T–V |
| Свидетельство | `integrated` (phone+urząd) |
| Экзамен | exam-prep |

#### CHAIN-40 — B2 · trudny rozmówca / eskalacja bez agresji
| Поле | Значение |
| --- | --- |
| CEFR / функция | Управление диалогом; вежливая настойчивость |
| Уровень | B2 |
| Цель | Powtórzyć prośbę; poprosić o przełożenie |
| FN-* | `FN-PHONE-ESCALATE` |
| GR-* | `GR-WO-IS`, `GR-REG-TV`, `GR-CONN-*` |
| Лексика | przełożenie, skarga, opiekun sprawy |
| L1-риски | ERR-RUS-24 tone; MUT |
| Свидетельство | `spoken_task` (рубрика) |
| Экзамен | exam-prep B2 |

---

### 3.11 Жалобы (COMPL)

#### CHAIN-41 — A1 · сказать, что coś nie działa (быт)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Сообщить о простой проблеме |
| Уровень | A1 |
| Цель | *Nie działa internet / ogrzewanie* |
| FN-* | `FN-COMPL-BASIC` |
| GR-* | `GR-NEG`, `GR-PRES`, `GR-REG-TV` |
| Лексика | zepsuty, nie działa, proszę o pomoc |
| L1-риски | register; ERR-RUS-21 |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-42 — A2 · ustna reklamacja w sklepie / do wynajmującego
| Поле | Значение |
| --- | --- |
| CEFR / функция | Жалоба с причиной |
| Уровень | A2 |
| Цель | Opisać problem i oczekiwać rozwiązania |
| FN-* | `FN-COMPL-ORAL` |
| GR-* | `GR-ASP-PAST`, `GR-ASP-IMP`, `GR-REG-TV` |
| Лексика | usterka, naprawa, termin |
| L1-риски | ERR-RUS-13; ERR-RUS-24 seed |
| Свидетельство | `spoken_task` |
| Экзамен | standards-aligned |

#### CHAIN-43 — B1 — письменная skarga / zgłoszenie
| Поле | Значение |
| --- | --- |
| CEFR / функция | Формальное письменное выражение претензии |
| Уровень | B1 |
| Цель | Napisać skargę z faktami i prośbą |
| FN-* | `FN-COMPL-WRITE` |
| GR-* | `FN-MAIL-FORMAL`, `GR-ASP-*`, `GR-COMP-ZE`, `GR-CONN-SEQ` |
| Лексика | skarga, załącznik, oczekuję |
| L1-риски | ERR-UKR-24; ERR-BEL-23 |
| Свидетельство | `written_genre` |
| Экзамен | exam-prep B1 pisanie |

#### CHAIN-44 — B2 · переговоры после жалобы
| Поле | Значение |
| --- | --- |
| CEFR / функция | Компромисс; оценка предложения |
| Уровень | B2 |
| Цель | Przyjąć / odrzucić ofertę z uzasadnieniem |
| FN-* | `FN-COMPL-NEGOTIATE` |
| GR-* | `GR-WO-IS`, `GR-CONN-CONTRAST`, `GR-REG-TV` |
| Лексика | ugoda, odszkodowanie, termin ostateczny |
| L1-риски | MUT-01; tone |
| Свидетельство | `integrated` |
| Экзамен | exam-prep B2 |

---

### 3.12 T–V / обращения (TV)

#### CHAIN-45 — A1 · pan/pani + 3 л. в сервисе
| Поле | Значение |
| --- | --- |
| CEFR / функция | odmiana oficjalna / nieoficjalna (уже с A1 в стандарте) |
| Уровень | A1 |
| Цель | Обратиться в sklepie / na poczcie |
| FN-* | `FN-TV-SERVICE` |
| GR-* | `GR-REG-TV`, `GR-CASE-VOC`, `GR-PRES-3SG` |
| Лексика | pan, pani, proszę |
| L1-риски | ERR-*-18; ERR-RUS-01 |
| Свидетельство | `closed_key` + `spoken_task` + `l1_contrast` |
| Экзамен | standards-aligned (**критично**) |

#### CHAIN-46 — A2 · переход ty / pan в полуформальных контекстах
| Поле | Значение |
| --- | --- |
| CEFR / функция | Выбор регистра по ситуации |
| Уровень | A2 |
| Цель | Распознать сигнал перехода на *ty* |
| FN-* | `FN-TV-SWITCH` |
| GR-* | `GR-REG-TV`, `GR-IMP-ASPECT` light |
| Лексика | możemy na ty?, panie kolego |
| L1-риски | ERR-BEL-18 (семья партнёра); P-NATALLIA |
| Свидетельство | `guided_prod` (выбор реплики) |
| Экзамен | standards-aligned |

#### CHAIN-47 — B1 · смешанные аудитории (zebranie, praca)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Поддержание регистра в группе |
| Уровень | B1 |
| Цель | Не смешать *ty* к szefowi и *pan* к koledze ошибочно |
| FN-* | `FN-TV-MIXED` |
| GR-* | `GR-REG-TV`, `GR-GEN-MO`, `GR-WO-IS` |
| Лексика | zwrot grzecznościowy, tytuł |
| L1-риски | High severity errors |
| Свидетельство | `integrated` |
| Экзамен | exam-prep |

#### CHAIN-48 — B2 · тонкая прагматика (ironia, смягчение)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Гибкость регистра; смягчение FTA |
| Уровень | B2 |
| Цель | Смягчить отказ / критику |
| FN-* | `FN-TV-MITIGATE` |
| GR-* | `GR-WO-IS`, `GR-MODAL`, `GR-CONN-*` |
| Лексика | ewentualnie, obawiam się, czy byłoby możliwe |
| L1-риски | MUT; calques of bluntness |
| Свидетельство | `spoken_task` (рубрика прагматики) |
| Экзамен | exam-prep B2 |

---

### 3.13 Формальная почта (MAIL)

#### CHAIN-49 — A1 · понять простой e-mail / SMS от urzędu (рецепция)
| Поле | Значение |
| --- | --- |
| CEFR / функция | Понять короткие официальные сообщения |
| Уровень | A1 |
| Цель | Wyłowić datę i miejsce |
| FN-* | `FN-MAIL-READ-A1` |
| GR-* | `GR-PREP-DAY`, `GR-NUM`, `GR-REG` receptive |
| Лексика | spotkanie, godzina, adres |
| L1-риски | orthography BEL/UKR; FF |
| Свидетельство | `receptive` |
| Экзамен | standards-aligned |

#### CHAIN-50 — A2 · napisać krótkie podanie / prośbę
| Поле | Значение |
| --- | --- |
| CEFR / функция | Простое формальное письмо |
| Уровень | A2 |
| Цель | Szablon: zwrot–treść–pożegnanie |
| FN-* | `FN-MAIL-REQUEST` |
| GR-* | `FN-MAIL-FORMAL`, `GR-ASP-FUT`, `GR-REG-TV`, `GR-CASE-VOC` |
| Лексика | szanowny, z poważaniem, proszę o |
| L1-риски | ERR-UKR-24; ERR-BEL-23; ERR-RUS-01 |
| Свидетельство | `written_genre` |
| Экзамен | standards-aligned |

#### CHAIN-51 — B1 · e-mail z załącznikiem / statusem sprawy
| Поле | Значение |
| --- | --- |
| CEFR / функция | Информативное формальное письмо |
| Уровень | B1 |
| Цель | Opisać sprawę; wskazać załączniki |
| FN-* | `FN-MAIL-STATUS` |
| GR-* | `GR-ASP-*`, `GR-COMP-ZE`, `GR-CONN-SEQ`, `GR-NEG-NIEMA` |
| Лексика | w załączeniu, uprzejmie informuję, sygnatura |
| L1-риски | aspect; ERR-UKR-03; ERR-*-11 |
| Свидетельство | `written_genre` |
| Экзамен | exam-prep B1 |

#### CHAIN-52 — B2 · list motywacyjny / reklamacja rozbudowana
| Поле | Значение |
| --- | --- |
| CEFR / функция | Развёрнутый официальный текст; аргументация |
| Уровень | B2 |
| Цель | Spójny list z akapitami i wnioskiem |
| FN-* | `FN-MAIL-EXTENDED` |
| GR-* | `GR-WO-IS`, `GR-CONN-*`, `GR-ASP-*`, `GR-REG-TV` |
| Лексика | motywacja, doświadczenie, oczekuję odpowiedzi |
| L1-риски | word order B2; calques; ERR-*-24 |
| Свидетельство | `written_genre` + peer/JPJO rubric |
| Экзамен | exam-prep B2 pisanie |

---

## 4. Сводная матрица: домен × уровень

| Домен | A1 | A2 | B1 | B2 |
| --- | --- | --- | --- | --- |
| WORK | CHAIN-01 | CHAIN-02 | CHAIN-03 | CHAIN-04 |
| RENT | CHAIN-05 | CHAIN-06 | CHAIN-07 | CHAIN-08 |
| URZAD | CHAIN-09 | CHAIN-10 | CHAIN-11 | CHAIN-12 |
| MED | CHAIN-13 | CHAIN-14 | CHAIN-15 | CHAIN-16 |
| SCHOOL | CHAIN-17 | CHAIN-18 | CHAIN-19 | CHAIN-20 |
| BANK | CHAIN-21 | CHAIN-22 | CHAIN-23 | CHAIN-24 |
| SHOP | CHAIN-25 | CHAIN-26 | CHAIN-27 | CHAIN-28 |
| TRANS | CHAIN-29 | CHAIN-30 | CHAIN-31 | CHAIN-32 |
| NEIGH | CHAIN-33 | CHAIN-34 | CHAIN-35 | CHAIN-36 |
| PHONE | CHAIN-37 | CHAIN-38 | CHAIN-39 | CHAIN-40 |
| COMPL | CHAIN-41 | CHAIN-42 | CHAIN-43 | CHAIN-44 |
| TV | CHAIN-45 | CHAIN-46 | CHAIN-47 | CHAIN-48 |
| MAIL | CHAIN-49 | CHAIN-50 | CHAIN-51 | CHAIN-52 |

**13 доменов × 4 уровня = 52 цепи.**

---

## 5. Сквозные GR-* столпы → где обязаны появиться в цепях

| Столп / GR-кластер | Первое появление | Спираль | L1-банк |
| --- | --- | --- | --- |
| `GR-CASE-*` (7 падежей, PED-001) | A1 (NOM/ACC/LOC/GEN базово) | каждый домен | pan-Slavic + RUS voc |
| `GR-REK-*` (PED-002) | A1 TRANS/PHONE/SHOP | B1 URZAD | ERR-*-06/07/08 |
| `GR-ASP-*` (PED-004) | A2 intro | B1 choice; B2 nuance | ERR-*-11/12/13 |
| `GR-GEN-MO` / `GR-NUM-*` (PED-005/007) | A2 / B1 | SCHOOL/BANK/WORK | ERR-RUS-22/23, UKR-22 |
| `GR-ORTH-*` (PED-008) | A1 | все письменные | BEL аканне early |
| `GR-PHON-*` (PED-009) | A1–A2 | listening | stress/nasal |
| `GR-REG-TV` (PED-010) | A1 | все High-stakes | ERR-*-18 |
| `GR-WO-*` (PED-011) | A2–B1 | B2 naturalness | ERR-RUS-20 |
| `GR-FF-*` (PED-024) | A1 SHOP/RENT | B1 | ERR-*-13/14/15 |

---

## 6. Типы свидетельства мастерства × экзамен

| Уровень | Преобладающие evidence | Экзаменационная рамка (на 2026-09-05) |
| --- | --- | --- |
| A1 | `closed_key`, `spoken_task`, `receptive`, `l1_contrast` | standards-aligned / future-exam-compatible (A1 взрослых сессий может отсутствовать — см. `07`) |
| A2 | + `written_genre` short, aspect intro | standards-aligned |
| B1 | `integrated`, aspect choice, formal mail | **exam-prep** взрослая сессия B1 |
| B2 | naturalness, argumentation, extended mail | **exam-prep** B2 |

Мастерство **не** равно «процент правильных кликов»: для High-severity регистра обязателен `spoken_task` или `written_genre` с рубрикой.

---

## 7. L1-риски: минимальное покрытие по доменам

Каждый домен на каждом уровне должен ссылать **хотя бы один** L1-риск из банка; High-severity домены (URZAD, MED, BANK, MAIL, TV, COMPL) — **риски всех трёх L1** (UKR/RUS/BEL), не «общий славянский».

| Домен | Обязательный акцент UKR | RUS | BEL |
| --- | --- | --- | --- |
| URZAD | T–V, mail | wołacz, T–V | h/ch+аканне в формах, mail UI≠L1 |
| SHOP | FF magazyn | FF + nie ma | proszę / FF |
| TRANS | czekać/do | czekać+R, na pracę | czekać BEL глоссы |
| TV | voc endings | нет voc | семья партнёра |
| ASP-heavy (WORK/RENT B1+) | UKR пары | *będę* mixes | BEL не-клон пар |

---

## 8. Правила изменения карты

1. Добавление урока без цепи `FN-*`↔`GR-*`↔evidence — отклонение review (`CNT`/`PED-015`).
2. Смена ID только с alias-строкой в этом файле.
3. Copy-paste цепи с заменой названия домена — запрещён; лексика и L1-риски должны отличаться.
4. Перед публикацией контента уровня — JPJO + сверка с `level-exit-criteria.md`.

---

## 9. Статус

| Элемент | Статус 2026-09-05 |
| --- | --- |
| 52 цепи доменов | Phase 2 draft |
| Семантические GR-*/FN-* | стабильные ярлыки; inventory-файлы могут уточнить нумерацию |
| Привязка к тексту załącznik | семантическая; не дословная выписка |
| Готовность считать A1–B2 «полными» | **нет** до JPJO и заполнения остальных curriculum matrices |

**Итог для отчёта Phase 2:** трассировочных цепей — **52**; ошибок в `l1-error-model.md` — **24 UKR + 24 RUS + 24 BEL = 72**.
