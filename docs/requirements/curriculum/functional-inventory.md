# Коммуникативно-функциональный инвентарь (A1–B2)

**Статус:** Phase 2 curriculum draft — A1 semantic reference = **candidate for human review**; A2–B2 = **LEGACY / pending semantic migration** (не эталон). Требует калибровки и JPJO review перед публикацией.
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
| A1 | **30** | Канон после семантической миграции (candidate for review) |
| A2 | **48** | LEGACY — pending semantic migration |
| B1 | **55** | LEGACY — pending semantic migration |
| B2 | **50** | LEGACY — pending semantic migration |
| **Итого (смешанный срез)** | **183** | A1 канон + legacy A2–B2; не объявлять A2–B2 готовыми |

Остальные разделы уровня (сценарии, речевые акты, жанры, прагматика, регистр, компенсации, R/L) — полные перечни **без** отдельной нумерации FN; трассируются к FN через домены.

---

## 3. Канонические языковые ID

Временные ярлыки прежнего черновика (псевдо-ID падежей/регистра без канонической записи) **удалены**.
Канонические определения:

- грамматика: `grammar-inventory.md` (`GR-*`);
- фонетика / орфография / прагматика: `concept-extensions.md` (`PHON-*`, `ORTH-*`, `PRAG-*`);
- таблица миграции старых ID → канонические: `concept-extensions.md`.

Кластеры `GR-CAS-*` / `GR-ASP-*` допустимы только в обзорных картах, не как exact prerequisite.

**Семантическая модель сущностей (A1):** см. [`../../curriculum/entity-definitions.md`](../../curriculum/entity-definitions.md), миграция [`../../curriculum/functional-migration-a1.md`](../../curriculum/functional-migration-a1.md), сценарии [`../../curriculum/scenario-inventory.md`](../../curriculum/scenario-inventory.md), ASM/EXM [`../../curriculum/asm-exm-a1.md`](../../curriculum/asm-exm-a1.md).

---

# A1

**Статус среза:** semantic reference — **candidate for human review**.
**Определения сущностей:** [`../../curriculum/entity-definitions.md`](../../curriculum/entity-definitions.md).
**Миграция 42 → 30:** [`../../curriculum/functional-migration-a1.md`](../../curriculum/functional-migration-a1.md).
**Сценарии:** [`../../curriculum/scenario-inventory.md`](../../curriculum/scenario-inventory.md).
**ASM/EXM:** [`../../curriculum/asm-exm-a1.md`](../../curriculum/asm-exm-a1.md).

**CEFR-ориентир (качественно):** очень простые высказывания о себе и ближайших нуждах; понимание медленной чёткой речи в знакомых ситуациях ([CEFR/CV](https://www.coe.int/en/web/common-european-framework-reference-languages), confidence: высокий на характер уровня).
**Связь с госстандартом:** A1 взрослые — `standard_status=current`; модули słuch / czytanie / pisanie + mówienie ([struktura](https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/), Dz.U. 2025 poz. 217); `session_availability` 2026 = **not_announced** ([terminy 2026](https://certyfikatpolski.pl/terminy-sesji-egzaminacyjnych-w-2026-roku/), проверка 2026-09-05).

**Criticality:** Core блокирует exit уровня; Important — провизорный порог; Extension не блокирует exit.

| Показатель | Значение |
| --- | ---: |
| Канонических FN A1 | **30** |
| SCN A1 | см. scenario-inventory |
| Старых FN-A1-001…042 | мигрированы; не используются как канон |

---

### FN-A1-IDENTIFY-01
- **ID:** FN-A1-IDENTIFY-01
- **Title (PL):** Przedstawienie tożsamości
- **Can-do:** Может назвать себя и базовые биографические данные так, чтобы собеседник однозначно идентифицировал человека.
- **Intent:** Сообщить, кто говорит / кто представлен (имя + происхождение/локация L1).
- **Modality/skill:** speaking (primary); writing — копирование тех же слотов в анкете
- **Scenarios:** SCN-A1-EVERYDAY-01, SCN-A1-SCHOOL-01, SCN-A1-URZAD-01, SCN-A1-WORK-01, SCN-A1-NEIGHBOR-01, SCN-A1-FORM-01, SCN-A1-SMS-01, SCN-A1-WRITE-SELF-01
- **Level:** A1
- **Prerequisites (FN):** —
- **Concepts:** GR-CAS-NOM-01, GR-TNS-PRS-01, GR-PRO-POSS-01, GR-PRO-PERS-01, PHON-CORE-01, ORTH-CORE-01
- **LEX bundle:** LEX-A1-IDENTITY
- **Evidence type:** task_performance (oral ID card + optional written slots)
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 załącznik nr 1 — Katalog umiejętności A (tematy: człowiek / dane osobowe) — REQUIRES VERIFICATION exact cell
  - CEFR: Companion Volume — Spoken interaction / Overall oral production A1 (qualitative) — REQUIRES VERIFICATION scale row
  - PRODUCT ANALYSIS: первая аудитория — быстрое самопредставление в школе/urzędzie/работе
  - METHOD: формульный каркас *Nazywam się… / Jestem z… / Mówię po…* до свободной парафразы
- **Completion criterion:** В устном мини-диалоге (до 60 с) учащийся без подсказки названия слотов произносит **четыре** понятных пункта: (1) имя и фамилия или устойчивое имя, (2) страна или город происхождения, (3) текущий город в Польше **или** язык L1, (4) одна уточняющая реплика на вопрос собеседника («Skąd pan/pani jest?» / «Jak się pan/pani nazywa?»). Допускается **одна** лексическая подсказка-карточка. Успех блокируется, если имя неразборчиво, слоты перепутаны так, что идентификация ложна, или ответ дан только на L1.
- **Allowed support:** 1 карточка-подсказка слота; модель *Nazywam się…* на экране до первой попытки
- **Blocking errors:** неразборчивое имя; ответ целиком не по-польски; ложный город/страна относительно задания; отказ от обязательного слота
- **L1 risks:** UKR: ERR-UKR-01 (i/y в имени/городе), ERR-UKR-04 (калька «у мене» вместо *mam* при доп. имуществе); RUS: ERR-RUS-02 (i/y), ERR-RUS-04 (посессивные кальки); BEL: ERR-BEL-01 (орфография имён), ERR-BEL-05 (посессив)
- **Criticality:** Core

### FN-A1-IDENTIFY-02
- **ID:** FN-A1-IDENTIFY-02
- **Title (PL):** Zawód i miejsce pracy
- **Can-do:** Может спросить и назвать профессию и место работы простыми конструкциями.
- **Intent:** Уточнить профессиональную роль собеседника или сообщить свою.
- **Modality/skill:** speaking; listening (понять ответ о работе)
- **Scenarios:** SCN-A1-WORK-01, SCN-A1-EVERYDAY-01, SCN-A1-NEIGHBOR-01, SCN-A1-WRITE-SELF-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01
- **Concepts:** GR-CAS-NOM-01, GR-CAS-INS-01, GR-CAS-LOC-01, GR-TNS-PRS-01, GR-PREP-Z-01, GR-Q-WH-01
- **LEX bundle:** LEX-A1-WORK
- **Evidence type:** task_performance (paired Q–A)
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — tematy praca / zawód — REQUIRES VERIFICATION
  - CEFR: Spoken interaction A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: трудоустройство и HR-знакомство первой аудитории
  - METHOD: сначала *pracuję w… / jestem…* (Ins), затем вопрос *Kim pan/pani jest? / Gdzie pan/pani pracuje?*
- **Completion criterion:** В парном обмене учащийся **и** задаёт, **и** отвечает: минимум один вопрос о профессии **или** месте работы и один ответ с понятной профессией **и** местом (фирма/тип места: sklep, biuro, magazyn). В ответе различимы субъект и локатив/инструменталь без смешения «я есть продавец в» на L1-кальке, ломающей смысл. Лимит: 90 с; до 2 уточняющих переспросов собеседника-робота. Блок: только односложный *tak/nie* без содержания; профессия и место неразличимы.
- **Allowed support:** список из 8 профессий на экране; 1 повтор вопроса ассистентом
- **Blocking errors:** невозможность назвать ни профессию, ни место; вопрос без вопросительного маркера и с полным непониманием собеседника; ответ на другом языке
- **L1 risks:** UKR: ERR-UKR-09 (Ins профессии); RUS: ERR-RUS-09; BEL: ERR-BEL-09
- **Criticality:** Core

### FN-A1-LOCATE-01
- **ID:** FN-A1-LOCATE-01
- **Title (PL):** Miejsce zamieszkania
- **Can-do:** Может сказать, где живёт или снимает жильё, простой формулой.
- **Intent:** Локализовать себя относительно жилья (город/район/тип).
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-HOUSING-01, SCN-A1-EVERYDAY-01, SCN-A1-URZAD-01, SCN-A1-WRITE-SELF-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01
- **Concepts:** GR-CAS-LOC-01, GR-TNS-PRS-01, GR-REK-VERB-01, GR-EXIST-01
- **LEX bundle:** LEX-A1-HOUSING
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — mieszkanie / miejsce zamieszkania — REQUIRES VERIFICATION
  - CEFR: Spoken production A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: аренда и бытовая локализация в Польше
  - METHOD: каркас *Mieszkam w… / Wynajmuję…* до вариаций
- **Completion criterion:** На стимул «где вы живёте?» учащийся даёт **одну** полную польскую реплику с (a) глаголом локализации и (b) понятным местом (город или тип жилья + город). Дополнительно отличает «живу» от «сейчас нахожусь» если в задании дан ложный стимул «где вы сейчас?». Время ответа ≤ 20 с после стимула. Блок: только жест/L1; место без глагола, если из-за этого нельзя понять, живёт ли человек там постоянно.
- **Allowed support:** карта Польши с 3 городами; модель предложения один раз
- **Blocking errors:** отсутствие места; ответ *u mnie jest mieszkanie* как единственная форма без *mieszkam*; полное непонимание стимула после одного повтора
- **L1 risks:** UKR: ERR-UKR-04; RUS: ERR-RUS-04; BEL: ERR-BEL-05; плюс путаница *w/na* (GR-CAS-LOC-01)
- **Criticality:** Core

### FN-A1-LOCATE-02
- **ID:** FN-A1-LOCATE-02
- **Title (PL):** Adres i lokalizacja w budynku
- **Can-do:** Может назвать улицу, номер дома/квартиры и этаж так, чтобы адрес можно было записать.
- **Intent:** Передать записываемый адрес и позицию в здании.
- **Modality/skill:** speaking; writing (диктовка/копирование)
- **Scenarios:** SCN-A1-HOUSING-01, SCN-A1-URZAD-01, SCN-A1-FORM-01, SCN-A1-EMERGENCY-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-LOCATE-01
- **Concepts:** GR-CAS-NOM-01, GR-NUM-CARD-01, GR-NUM-ORD-01, GR-CAS-LOC-01, ORTH-CORE-01
- **LEX bundle:** LEX-A1-ADDRESS
- **Evidence type:** task_performance (oral → listener writes address)
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — dane adresowe — REQUIRES VERIFICATION
  - CEFR: Transactions / information exchange A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: urząd, доставка, экстренные службы
  - METHOD: порядок слотов ulica → numer → mieszkanie → piętro; проверка диктовкой
- **Completion criterion:** Слушатель-ассистент **точно** записывает с устной диктовки учащегося: улицу, номер дома, номер квартиры **и** этаж (4 слота). Допускается **одна** просьба «proszę powtórzyć numer». Успех = запись совпадает с карточкой задания (допустима орфография улицы с 1 опечаткой диакритики, если номерные слоты верны). Блок: перепутаны дом и квартира; этаж не назван; номера неразборчивы после повтора.
- **Allowed support:** 1 повтор числовых слотов; образец порядка полей на экране
- **Blocking errors:** неполный адрес без номера; системная путаница дом/квартира; отказ диктовать по-польски
- **L1 risks:** UKR: ERR-UKR-01; RUS: ERR-RUS-02, ERR-RUS-03; BEL: ERR-BEL-01; риск здесь орфографический (адрес/имя), отдельной A1-карточки диктовки чисел в банке ERR нет
- **Criticality:** Core

### FN-A1-GREET-01
- **ID:** FN-A1-GREET-01
- **Title (PL):** Powitanie i pożegnanie
- **Can-do:** Может поздороваться и попрощаться в официальном и бытовом регистре.
- **Intent:** Открыть и закрыть контакт уместной формулой.
- **Modality/skill:** speaking; listening (распознать формулу)
- **Scenarios:** SCN-A1-EVERYDAY-01, SCN-A1-NEIGHBOR-01, SCN-A1-SHOP-01, SCN-A1-WORK-01, SCN-A1-URZAD-01, SCN-A1-SCHOOL-01
- **Level:** A1
- **Prerequisites (FN):** —
- **Concepts:** PRAG-PAN-01, GR-CAS-VOC-01, PHON-CORE-01 (имена в wołacz — формульно на A1; системный VOC-NAME остаётся A2)
- **LEX bundle:** LEX-A1-GREETINGS
- **Evidence type:** roleplay_tv
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — sytuacje komunikacyjne / kurtuazja — REQUIRES VERIFICATION
  - CEFR: Sociolinguistic appropriateness (pre-A1/A1 qualitative) — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: ежедневные контакты первой аудитории
  - METHOD: пары Dzień dobry / Cześć и Do widzenia / Na razie до выбора по карточке роли
- **Completion criterion:** В двух коротких ролях (≤ 40 с каждая) учащийся: (1) открывает контакт формулой, согласованной с карточкой «urzędnik» vs «kolega», (2) закрывает контакт уместным прощанием. Оценивается **пара** открытие+закрытие в каждом регистре. Блок: *Cześć* официальному незнакомцу на окошке; отсутствие прощания; формула на L1.
- **Allowed support:** карточка роли; список из 6 формул (без пометки регистра — учащийся выбирает)
- **Blocking errors:** регистровая инверсия в официальной роли; нет ни приветствия, ни прощания
- **L1 risks:** UKR: ERR-UKR-18 (T–V); RUS: ERR-RUS-18; BEL: ERR-BEL-18
- **Criticality:** Core

### FN-A1-ADDRESS-01
- **ID:** FN-A1-ADDRESS-01
- **Title (PL):** Zwrot pan/pani
- **Can-do:** Может обратиться pan/pani с глаголом в 3 лице в сервисной ситуации.
- **Intent:** Вежливо адресовать реплику незнакомцу в сервисе.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-SHOP-01, SCN-A1-URZAD-01, SCN-A1-MED-01, SCN-A1-BANK-01, SCN-A1-FOOD-01, SCN-A1-SCHOOL-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01
- **Concepts:** PRAG-PAN-01, GR-TV-AGR-01, GR-TNS-PRS-01, GR-CAS-VOC-01
- **LEX bundle:** LEX-A1-SERVICE
- **Evidence type:** roleplay_tv
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — rejestr oficjalny — REQUIRES VERIFICATION
  - CEFR: Sociolinguistic A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: магазин, ресепшен, окно urzędu
  - METHOD: запрет *ty* в сервисной карточке до автоматизации 3 л.
- **Completion criterion:** В сервисном диалоге (магазин или ресепшен, 4–6 реплик) минимум **две** реплики учащегося содержат уместное *pan/pani* **и** глагол в 3 лице (*czy może mi pan… / proszę pani…*). Собеседник выполняет просьбу — pragmatic success. Блок: устойчивое *ty* + 2 л. к незнакомцу; *pan* + 2 л. (*pan chcesz*); оскорбительный регистр.
- **Allowed support:** 1 коррекция ассистента «proszę w 3. osobie»; визуальная схема pan→on
- **Blocking errors:** полное отсутствие pan/pani в официальной роли; согласование 2 л. с pan
- **L1 risks:** UKR: ERR-UKR-18; RUS: ERR-RUS-18; BEL: ERR-BEL-18
- **Criticality:** Core

### FN-A1-REPAIR-01
- **ID:** FN-A1-REPAIR-01
- **Title (PL):** Prośba o powtórzenie
- **Can-do:** Может попросить повторить или говорить медленнее, чтобы восстановить понимание.
- **Intent:** Восстановить канал связи при недослышанном сообщении.
- **Modality/skill:** speaking; listening
- **Scenarios:** SCN-A1-PHONE-01, SCN-A1-URZAD-01, SCN-A1-EVERYDAY-01, SCN-A1-MED-01, SCN-A1-TICKET-01, SCN-A1-DIRECTIONS-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01
- **Concepts:** PRAG-REPAIR-01, GR-Q-YESNO-01, PHON-CORE-01 (императив в FIX: *powtórz / mów wolniej* — без системного IMP A2)
- **LEX bundle:** LEX-A1-REPAIR
- **Evidence type:** task_performance (noise / fast-speech prompt)
- **Source anchor:**
  - NORMATIVE: CEFR Companion — Communication strategies / Asking for clarification (qualitative A1) — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: телефон и очереди — высокий шум
  - METHOD: *Proszę powtórzyć; Proszę mówić wolniej; Jeszcze raz, proszę*
  - METHOD note: не смешивать с запросом перевода (REPAIR-02)
- **Completion criterion:** После намеренно быстрого/шумного стимула учащийся **до** угадывания содержания использует ≥1 формулу ремонта (повтор или «медленнее»), затем отвечает по существу на **повторенный** стимул. Успех = корректный выбор из 3 опций смысла **после** ремонта. Без формулы ремонта, но с угадыванием — не засчитывается. Лимит попыток ремонта: 2.
- **Allowed support:** список из 3 формул repair; визуальный сигнал «шум»
- **Blocking errors:** молчание/отключение; ответ наугад без repair; формула на L1 без польского эквивалента
- **L1 risks:** UKR/RUS/BEL: кальки «ещё раз» без *proszę*; смешение императива грубости — PRAG-REPAIR-01
- **Criticality:** Core

### FN-A1-REPAIR-02
- **ID:** FN-A1-REPAIR-02
- **Title (PL):** Sygnał niezrozumienia
- **Can-do:** Может сказать, что не понимает, и попросить объяснить/перевести ключевое слово.
- **Intent:** Зафиксировать пробел в понимании и запросить значение.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-URZAD-01, SCN-A1-EVERYDAY-01, SCN-A1-BANK-01, SCN-A1-MED-01, SCN-A1-PHONE-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-REPAIR-01
- **Concepts:** GR-NEG-01, PRAG-REPAIR-01, GR-Q-WH-01, GR-PRO-INT-01
- **LEX bundle:** LEX-A1-REPAIR
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: CEFR — asking for clarification — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: неизвестные термины urzędu/банка
  - METHOD: *Nie rozumiem; Co znaczy…?; Jak to jest po…?*
- **Completion criterion:** В диалоге с одним неизвестным ключевым словом (подсвечено в стенограмме для ассистента) учащийся: (1) явно сигнализирует непонимание по-польски, (2) запрашивает значение **этого** слова или простую парафразу, (3) затем выполняет задание, используя полученное значение. Успех без шага (2) не засчитывается. Блок: игнор неизвестного слова; запрос на L1 без попытки польской формулы.
- **Allowed support:** 1 подсказка жестом на слово; карточка *Co znaczy…?*
- **Blocking errors:** нет сигнала непонимания; продолжение «как будто понял» с ошибкой задания
- **L1 risks:** UKR/RUS/BEL: буквальный перевод формулы «что значит?» и слишком сложное уточнение; отдельная валидированная ERR-карточка для этого repair-акта отсутствует
- **Criticality:** Core

### FN-A1-QUANT-01
- **ID:** FN-A1-QUANT-01
- **Title (PL):** Cena, ilość, reszta
- **Can-do:** Может назвать и понять цену, количество и сдачу на простых числах.
- **Intent:** Обменяться числовой информацией о мере и деньгах.
- **Modality/skill:** speaking; listening; (цифры oral)
- **Scenarios:** SCN-A1-SHOP-01, SCN-A1-FOOD-01, SCN-A1-TICKET-01, SCN-A1-BANK-01
- **Level:** A1
- **Prerequisites (FN):** —
- **Concepts:** GR-NUM-CARD-01, GR-NUM-CARD-05, GR-NUM-MONEY-01, GR-CAS-GEN-01, GR-GEN-PART-01
- **LEX bundle:** LEX-A1-MONEY
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — liczby / zakupy — REQUIRES VERIFICATION
  - CEFR: Transactions A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: касса, билет, сдача
  - METHOD: различать *ile kosztuje* / *ile sztuk* / *reszta*
- **Completion criterion:** В кассовом микродиалоге учащийся корректно обрабатывает **три** числовых слота: названная цена (zł), запрошенное количество товара, и сдача (или констатация «bez reszty» при точной сумме). Слушатель сверяет числа с чеком-заданием; допускается погрешность ±0 только после одного уточняющего вопроса учащегося. Блок: цена и сдача перепутаны; количество не названо при запросе кассира.
- **Allowed support:** калькулятор-экран с суммой (без подсказки сдачи); 1 переспрос
- **Blocking errors:** невозможность произнести/понять цену в злотых; ответ только жестом без числа при требовании сказать
- **L1 risks:** UKR: ERR-UKR-22 (числительные 5+ + Gen); RUS/BEL: отдельные карточки общих количественных конструкций ещё не валидированы
- **Criticality:** Core

### FN-A1-TRANS-01
- **ID:** FN-A1-TRANS-01
- **Title (PL):** Transakcja wyboru i zakupu
- **Can-do:** Может провести простую транзакцию: выразить выбор, завершить обмен «товар/услуга ↔ оплата», подтвердить результат.
- **Intent:** Довести сервисный обмен до наблюдаемого результата (получен товар/заказ/билет).
- **Modality/skill:** speaking; interactive
- **Scenarios:** SCN-A1-SHOP-01, SCN-A1-FOOD-01, SCN-A1-TICKET-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-ADDRESS-01, FN-A1-QUANT-01
- **Concepts:** GR-CAS-ACC-01, GR-TNS-PRS-01, GR-MOD-VERB-01, PRAG-PAN-01, GR-PRO-DEM-01
- **LEX bundle:** LEX-A1-SERVICE (ядро; доменные расширения в SCN FOOD/TICKET)
- **Evidence type:** task_performance (end-to-end transaction)
- **Source anchor:**
  - NORMATIVE: CEFR — obtaining goods and services A1 — REQUIRES VERIFICATION exact descriptor
  - PRODUCT ANALYSIS: единая функция для магазина/еды/билета вместо трёх FN
  - METHOD: слоты wybór → potwierdzenie → płatność → odbiór
  - METHOD: сценарии задают LEX, не плодят FN
- **Completion criterion:** В любом из трёх сервисных сценариев учащийся доводит обмен до **физического/экранного результата** задания (товар в «корзине», заказ принят, билет выдан). Обязательные слоты речи: (1) выбор объекта, (2) реакция на цену или способ оплаты, (3) подтверждение получения/заказа (*tak / proszę / to wszystko*). Допускается ≤2 подсказки кассира типа «co podać?». Блок: обрыв до оплаты без обозначения выбора; только кивок без польских реплик на шагах 1–2.
- **Allowed support:** меню/витрина с 5 позициями; 2 наводящих вопроса кассира
- **Blocking errors:** нет выбора; отказ говорить при необходимости назвать позицию; регистр *ty* к кассиру-незнакомцу при карточке «sklep»
- **L1 risks:** UKR: ERR-UKR-06 (*czekać na* в очереди), ERR-UKR-18; RUS: ERR-RUS-06, ERR-RUS-18; BEL: ERR-BEL-06
- **Criticality:** Core

### FN-A1-ASK-01
- **ID:** FN-A1-ASK-01
- **Title (PL):** Pytanie o dostępność
- **Can-do:** Может спросить о наличии товара, услуги или свободного временного слота.
- **Intent:** Получить информацию «есть / нет / когда».
- **Modality/skill:** speaking; listening
- **Scenarios:** SCN-A1-SHOP-01, SCN-A1-MED-01, SCN-A1-TICKET-01, SCN-A1-BANK-01, SCN-A1-FOOD-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01
- **Concepts:** GR-Q-YESNO-01, GR-Q-WH-01, GR-EXIST-01, GR-NEG-01, GR-CAS-GEN-04
- **LEX bundle:** LEX-A1-SERVICE
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: CEFR — information exchange A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: слияние бывших отдельных «наличие» FN
  - METHOD: *Czy jest…? / Czy są wolne miejsca? / Na kiedy jest termin?*
- **Completion criterion:** Учащийся задаёт **понятный польский вопрос о наличии** и на основе ответа ассистента выбирает верное действие из трёх (купить / записаться / уйти). Вопрос должен содержать маркер существования/наличия или времени слота; ответ «nie ma» должен быть понят (не игнорирован). Блок: утверждение вместо вопроса; вопрос без связи с наличием; непонимание отрицательного ответа.
- **Allowed support:** 1 модель вопроса; карточка объекта запроса
- **Blocking errors:** нет вопросительной формы при задании «спросите»; покупка при ответе «nie ma»
- **L1 risks:** UKR: ERR-UKR-02 (*czy*), ERR-UKR-23 (*nie ma* + Gen); RUS: ERR-RUS-21 (*nie ma* + Gen); BEL: ERR-BEL-10 (*czy/ці*), ERR-BEL-21 (*nie ma/няма*)
- **Criticality:** Important

### FN-A1-DIRECT-01
- **ID:** FN-A1-DIRECT-01
- **Title (PL):** Droga i orientacja
- **Can-do:** Может спросить и дать базовые ориентиры пути (направление, ориентир, транспорт).
- **Intent:** Получить или передать маршрут в пределах 2–3 шагов.
- **Modality/skill:** speaking; listening
- **Scenarios:** SCN-A1-DIRECTIONS-01, SCN-A1-EVERYDAY-01, SCN-A1-TICKET-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-ASK-01
- **Concepts:** GR-MOT-BASE-01, GR-PREP-DO-NA-01, GR-CAS-ACC-02, GR-Q-WH-01 (императив направления — формульный RECP, без IMP A2)
- **LEX bundle:** LEX-A1-TRANSPORT
- **Evidence type:** task_performance (map micro-task)
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — podróżowanie / miasto — REQUIRES VERIFICATION
  - CEFR: Asking for / giving directions (qualitative A1/A2 border) — A1 limited — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: дорога на работу/до urzędu
  - METHOD: *prosto / w lewo / w prawo / przystanek*
- **Completion criterion:** На карте из 4 точек учащийся либо (вариант A) спрашивает путь и отмечает цель по устному ответу ассистента, либо (вариант B) даёт 2–3 понятных шага к отмеченной цели. Успех = цель отмечена верно **или** слушатель доходит по инструкции без тупика. Допустим 1 repair. Блок: только жест без слов; инструкция из одного неясного слова; противоположное направление без самоисправления.
- **Allowed support:** карта; 3 стрелки-легенды; 1 repair
- **Blocking errors:** выбран неверный конечный пункт после инструкции; полный отказ от польских ориентиров
- **L1 risks:** UKR: ERR-UKR-10 (*do/na* в направлении); RUS/BEL: отдельные карточки базовой навигационной рекции ещё не валидированы
- **Criticality:** Important

### FN-A1-APPOINT-01
- **ID:** FN-A1-APPOINT-01
- **Title (PL):** Umówienie wizyty
- **Can-do:** Может записаться на визит, назвав день и час простой фразой.
- **Intent:** Зафиксировать договорённость о времени встречи/приёма.
- **Modality/skill:** speaking; listening
- **Scenarios:** SCN-A1-MED-01, SCN-A1-URZAD-01, SCN-A1-SCHOOL-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-TIME-01, FN-A1-ADDRESS-01
- **Concepts:** GR-TIME-EXPR-01, GR-NUM-ORD-01, GR-TNS-PRS-01, GR-Q-WH-01, PRAG-PAN-01
- **LEX bundle:** LEX-A1-TIME
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — wizyty / usługi — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: przychodnia, urząd, szkoła
  - METHOD: *Poproszę termin / Czy mogę się zapisać na…?*
  - CEFR: arrangements A1 — REQUIRES VERIFICATION
- **Completion criterion:** Учащийся предлагает или принимает слот, назвав **день** и **час**, и получает подтверждение ассистента («zapisuję pana/panią»). В протоколе должны совпасть день+час с целевой карточкой (допуск ±0; при конфликте слотов — одна альтернатива). Блок: запись без времени; время без дня; отсутствие подтверждения понимания (*tak / dobrze*).
- **Allowed support:** календарь на неделю; часы циферблатом
- **Blocking errors:** несогласованные день/час; полный срыв записи без попытки назвать время
- **L1 risks:** RUS: ERR-RUS-10 (дни недели с *w + Acc*); UKR/BEL: отдельные карточки выражения даты/часа ещё не валидированы
- **Criticality:** Core

### FN-A1-HEALTH-01
- **ID:** FN-A1-HEALTH-01
- **Title (PL):** Objawy i dolegliwości
- **Can-do:** Может назвать симптомы списком и формулой *boli mnie…*
- **Intent:** Сообщить о состоянии здоровья собеседнику-медику/аптекарю.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-MED-01, SCN-A1-EMERGENCY-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01
- **Concepts:** GR-CAS-ACC-01, GR-PRO-PERS-01, GR-TNS-PRS-01, PHON-CORE-01 (экспериенцер *mnie* в *boli mnie głowa* — Acc, не Dat; системный DAT-EXP не нужен для этой формулы)
- **LEX bundle:** LEX-A1-HEALTH
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — zdrowie — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: przychodnia / apteka первой аудитории
  - METHOD: список органов + *boli mnie głowa/brzuch…*
  - CEFR: describing health A1 — REQUIRES VERIFICATION
- **Completion criterion:** По карточке симптомов учащийся называет ≥2 понятных симптома, из них ≥1 с конструкцией экспериенцера (*boli mnie…* / *źle się czuję* + уточнение). Врач-ассистент выбирает верный «код жалобы» из 4. Блок: только жест на тело без слов; симптом на L1; *boli ja* без коррекции после одной подсказки.
- **Allowed support:** схема тела; 1 модель *boli mnie…*
- **Blocking errors:** ни одного распознаваемого симптома; отказ говорить о боли при задании
- **L1 risks:** UKR/RUS/BEL: калька конструкции «у меня болит» и формы частей тела; отдельные health-specific ERR-карточки требуют экспертной разработки
- **Criticality:** Core

### FN-A1-HELP-01
- **ID:** FN-A1-HELP-01
- **Title (PL):** Wezwanie pomocy
- **Can-do:** Может сообщить о срочности/боли и попросить помочь вызвать помощь по скрипту.
- **Intent:** Инициировать помощь третьих лиц в угрожающей ситуации.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-EMERGENCY-01, SCN-A1-MED-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-HEALTH-01, FN-A1-REQUEST-01
- **Concepts:** GR-MOD-VERB-01, PRAG-PAN-01, GR-CAS-ACC-01, PHON-CORE-01 (просьба о помощи — модалки + FIX; без системного IMP A2)
- **LEX bundle:** LEX-A1-HELP
- **Evidence type:** task_performance (timed script)
- **Source anchor:**
  - NORMATIVE: PRODUCT SAFETY / first-audience emergency literacy — не подмена мед. протокола
  - CEFR: dealing with emergencies (qualitative; A1 limited scripts) — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: скрипт «нужна помощь / вызовите…»
  - METHOD: приоритет понятности и адреса над граммат. полнотой
- **Completion criterion:** За ≤ 45 с учащийся выдаёт скрипт из ≥3 слотов: (1) сигнал срочности или боли, (2) явная просьба о помощи / вызвать службу, (3) место **или** имя/идентификация пострадавшего. Ассистент должен суметь «набрать» службу по этим данным. Блок: нет просьбы о помощи; только описание без обращения; данные места ложны относительно карточки.
- **Allowed support:** карточка экстренных номеров как рецептив; 1 подсказка «powiedz gdzie»
- **Blocking errors:** отсутствие просьбы; юмор/отказ в ролевой «угрозе»; полный L1
- **L1 risks:** UKR: ERR-UKR-07 (телефонные rekcja при звонке); RUS: ERR-RUS-07; BEL: ERR-BEL-07
- **Criticality:** Important

### FN-A1-DOCS-01
- **ID:** FN-A1-DOCS-01
- **Title (PL):** Dokumenty i formularz
- **Can-do:** Может передать/получить документы на окошке и попросить бланк или указать недостающий документ.
- **Intent:** Обеспечить документооборот в институциональном контакте.
- **Modality/skill:** speaking; interactive
- **Scenarios:** SCN-A1-URZAD-01, SCN-A1-BANK-01, SCN-A1-FORM-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-ADDRESS-01, FN-A1-PURPOSE-01
- **Concepts:** GR-CAS-ACC-01, GR-PRO-DEM-01, PRAG-PAN-01, GR-NEG-01, GR-Q-WH-01
- **LEX bundle:** LEX-A1-DOCS
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — urzędy / dokumenty — REQUIRES VERIFICATION
  - CEFR: Companion Volume — transactions / obtaining goods and services (qualitative A1) — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: слияние «отдать документы» и «попросить форму»
  - METHOD: *Oto dokumenty; Proszę formularz; Brakuje mi…*
- **Completion criterion:** В окошке urzędu учащийся выполняет **оба** действия в одном визите: (A) передаёт названный комплект (паспорт/PESEL-карта по заданию) с понятной репликой, (B) либо просит бланк, либо указывает, чего не хватает, если ассистент сообщает о пробеле. Успех = ассистент отмечает «комплект принят» **или** «бланк выдан». Блок: молчаливая передача без речи при требовании назвать документ; игнор запроса о недостающем.
- **Allowed support:** физические карточки-«документы»; список названий
- **Blocking errors:** неверный документ при наличии названий; отсутствие просьбы о бланке, когда это единственный путь успеха
- **L1 risks:** UKR: ERR-UKR-18; RUS: ERR-RUS-18; BEL: ERR-BEL-18
- **Criticality:** Core

### FN-A1-PURPOSE-01
- **ID:** FN-A1-PURPOSE-01
- **Title (PL):** Cel wizyty
- **Can-do:** Может одной фразой назвать цель визита в учреждении.
- **Intent:** Сориентировать служащего, зачем пришёл посетитель.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-URZAD-01, SCN-A1-BANK-01, SCN-A1-MED-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01, FN-A1-GREET-01
- **Concepts:** GR-TNS-PRS-01, GR-CAS-ACC-01, GR-INF-COMPL-01 (цель визита формулой *w sprawie…*; *żeby* — RECP, не A2 SYN-SUB как prereq)
- **LEX bundle:** LEX-A1-URZAD
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — sytuacje urzędowe — REQUIRES VERIFICATION
  - CEFR: Companion Volume — spoken interaction: stating purpose in service encounters (qualitative A1) — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: очередь / окошко — цель до деталей
  - METHOD: *Przyszedłem / Przyszłam w sprawie… / Chcę złożyć…*
- **Completion criterion:** После приветствия учащийся произносит **одну** фразу цели, по которой ассистент направляет к верному окну (выбор из 3). Цель должна совпасть с карточкой (PESEL / meldunek / wniosek — по заданию). Допускается 1 repair. Блок: только имя без цели; цель на L1; неверное окно из-за неверной цели.
- **Allowed support:** 3 карточки целей; модель *w sprawie…*
- **Blocking errors:** отсутствие цели; цель противоречит документам в руках
- **L1 risks:** UKR/RUS/BEL: родовая форма прошедшего в *przyszedłem/przyszłam*; подходящей отдельной ERR-карточки в текущем банке нет
- **Criticality:** Core

### FN-A1-PHONE-01
- **ID:** FN-A1-PHONE-01
- **Title (PL):** Przedstawienie w telefonie
- **Can-do:** Может по телефону сказать, кто звонит и зачем.
- **Intent:** Открыть телефонный контакт с идентификацией и целью.
- **Modality/skill:** speaking; listening
- **Scenarios:** SCN-A1-PHONE-01, SCN-A1-WORK-01, SCN-A1-SCHOOL-01, SCN-A1-HOUSING-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01, FN-A1-PURPOSE-01
- **Concepts:** GR-REK-VERB-01, PRAG-PAN-01, GR-TNS-PRS-01, PHON-CORE-01
- **LEX bundle:** LEX-A1-PHONE
- **Evidence type:** task_performance (audio-only)
- **Source anchor:**
  - NORMATIVE: CEFR — telephoning (qualitative; A1 scripted) — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: звонок на работу/в школу/в urząd
  - METHOD: *Dzień dobry, z tej strony… / Dzwonię w sprawie…*
  - L1 note: *dzwonić do* — ERR-*-07
- **Completion criterion:** В аудио-диалоге без видео учащийся в первых **двух** своих репликах передаёт (1) кто звонит, (2) зачем. Ассистент заполняет карточку «caller / purpose» без догадок. Допустим 1 repair из-за связи. Блок: цель не названа за 3 реплики; имя неразборчиво после повтора; *dzwonię pani X* без *do* с полной потерей смысла для ассистента.
- **Allowed support:** скрипт-каркас с пропусками; 1 повтор
- **Blocking errors:** анонимный звонок без имени при требовании; нет цели
- **L1 risks:** UKR: ERR-UKR-07; RUS: ERR-RUS-07; BEL: ERR-BEL-07
- **Criticality:** Core

### FN-A1-PHONE-02
- **ID:** FN-A1-PHONE-02
- **Title (PL):** Prośba o oddzwonienie
- **Can-do:** Может оставить голосовое / передать просьбу перезвонить.
- **Intent:** Организовать отложенный контакт.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-PHONE-01, SCN-A1-WORK-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-PHONE-01, FN-A1-TIME-01
- **Concepts:** GR-MOD-VERB-01, GR-INF-COMPL-01, GR-PRO-PERS-01, GR-NUM-CARD-01 (номер телефона как последовательность цифр)
- **LEX bundle:** LEX-A1-PHONE
- **Evidence type:** task_performance (voicemail recording)
- **Source anchor:**
  - PRODUCT ANALYSIS: недоступность собеседника на смене
  - CEFR: leaving a message A1 — REQUIRES VERIFICATION
  - METHOD: *Proszę oddzwonić / Zostawiam numer…*
  - NORMATIVE: — (продуктовый скрипт; не отдельная статья закона)
- **Completion criterion:** Запись голосового ≤ 30 с содержит: имя, просьбу перезвонить, контакт (номер **или** «ten sam numer») и опционально удобный интервал. Ассистент перезванивает по записанным данным успешно. Блок: нет просьбы о callback; номер искажён так, что звонок невозможен; только гудок без речи.
- **Allowed support:** таймер; шаблон из 4 пустых полей
- **Blocking errors:** отсутствует callback-просьба; неверный номер относительно задания
- **L1 risks:** UKR: ERR-UKR-07; RUS: ERR-RUS-07; BEL: ERR-BEL-07; отдельной карточки диктовки номера телефона в ERR-банке нет
- **Criticality:** Important

### FN-A1-REQUEST-01
- **ID:** FN-A1-REQUEST-01
- **Title (PL):** Prosta prośba
- **Can-do:** Может коротко и вежливо попросить о помощи у коллеги или соседа.
- **Intent:** Получить бытовую/рабочую помощь без эскалации.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-WORK-01, SCN-A1-NEIGHBOR-01, SCN-A1-HOUSING-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01
- **Concepts:** GR-MOD-VERB-01, GR-INF-COMPL-01, GR-CAS-ACC-01, PRAG-PAN-01 (смягчение — лексические маркеры *proszę / czy może*; системный SOFTEN остаётся A2)
- **LEX bundle:** LEX-A1-POLITENESS
- **Evidence type:** roleplay_tv
- **Source anchor:**
  - CEFR: requesting assistance A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: сосед / смена
  - METHOD: *Czy możesz mi pomóc…? / Proszę o…*
  - NORMATIVE: — PRODUCT + CEFR
- **Completion criterion:** Учащийся формулирует просьбу с понятным **объектом помощи** и маркером вежливости (*proszę / czy możesz / czy może pan*). Сосед/коллега выполняет действие в роле. После успеха — благодарность (можно связкой с THANKS). Блок: приказ без смягчения в карточке «вежливый сосед»; просьба без содержания (*pomóż*); грубое *ty* незнакомцу.
- **Allowed support:** 2 модели смягчения; карточка объекта
- **Blocking errors:** оскорбительный императив; отсутствие объекта просьбы
- **L1 risks:** UKR: ERR-UKR-18; RUS: ERR-RUS-18; BEL: ERR-BEL-18, ERR-BEL-24 (*proszę / калі ласка*)
- **Criticality:** Important

### FN-A1-REFUSE-01
- **ID:** FN-A1-REFUSE-01
- **Title (PL):** Grzeczna odmowa
- **Can-do:** Может коротко и вежливо отказать (*nie mogę / niestety*).
- **Intent:** Отклонить просьбу без разрыва отношений.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-WORK-01, SCN-A1-NEIGHBOR-01, SCN-A1-PHONE-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01
- **Concepts:** GR-NEG-01, GR-MOD-VERB-01, PRAG-PAN-01 (смягчение отказа — *niestety / przepraszam*; системный SOFTEN остаётся A2)
- **LEX bundle:** LEX-A1-POLITENESS
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — interakcja społeczna / grzeczność — REQUIRES VERIFICATION
  - CEFR: refusing politely A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: смена / соседские просьбы
  - METHOD: *Niestety nie mogę; Przepraszam, ale…*
- **Completion criterion:** На три разные просьбы ассистента учащийся даёт **понятный отказ** минимум в двух, с маркером смягчения (*niestety / przepraszam / nie mogę*). Третья может быть согласием для контроля. Успех = ассистент не интерпретирует отказ как согласие. Блок: *nie* без смягчения в карточке «сохранить отношения»; согласие там, где задан отказ.
- **Allowed support:** 3 формулы отказа; карточка «odmów grzecznie»
- **Blocking errors:** грубый обрыв; ложное согласие
- **L1 risks:** UKR: ERR-UKR-18; RUS: ERR-RUS-18; BEL: ERR-BEL-18
- **Criticality:** Important

### FN-A1-THANKS-01
- **ID:** FN-A1-THANKS-01
- **Title (PL):** Podziękowanie
- **Can-do:** Может поблагодарить и ответить на благодарность.
- **Intent:** Закрыть обмен услугой/информацией этикетной парой.
- **Modality/skill:** speaking
- **Scenarios:** SCN-A1-EVERYDAY-01, SCN-A1-SHOP-01, SCN-A1-NEIGHBOR-01, SCN-A1-WORK-01, SCN-A1-FOOD-01, SCN-A1-DIRECTIONS-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01
- **Concepts:** PRAG-PAN-01, PHON-CORE-01
- **LEX bundle:** LEX-A1-POLITENESS
- **Evidence type:** roleplay_tv
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — formuły grzecznościowe — REQUIRES VERIFICATION
  - CEFR: politeness formulae A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: касса, сосед, коллега
  - METHOD: *Dziękuję / Proszę bardzo / Nie ma za co*
- **Completion criterion:** В двух микроэпизодах учащийся (1) инициирует *dziękuję* после услуги, (2) отвечает на благодарность уместной формулой (*proszę / nie ma za co*). Блок: молчание после явной услуги в карточке; ответ *cześć* на *dziękuję*.
- **Allowed support:** 4 формулы; сигнал «podziękuj»
- **Blocking errors:** нет благодарности при обязательном слоте; нерелевантная формула
- **L1 risks:** BEL: ERR-BEL-24; UKR/RUS: смешение *proszę* (просьба vs ответ на благодарность) требует отдельных карточек
- **Criticality:** Core

### FN-A1-APOLOGY-01
- **ID:** FN-A1-APOLOGY-01
- **Title (PL):** Przeprosiny
- **Can-do:** Может извиниться за опоздание или помеху.
- **Intent:** Восстановить лицо после нарушения нормы (время/пространство).
- **Modality/skill:** speaking; writing (SMS)
- **Scenarios:** SCN-A1-WORK-01, SCN-A1-SCHOOL-01, SCN-A1-NEIGHBOR-01, SCN-A1-SMS-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-TIME-01 (для опоздания), FN-A1-GREET-01
- **Concepts:** PRAG-PAN-01, GR-TNS-PRS-01, GR-CAS-ACC-01, ORTH-CORE-01 (SMS)
- **LEX bundle:** LEX-A1-APOLOGY
- **Evidence type:** task_performance
- **Source anchor:**
  - CEFR: apologising A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: смена, школа, сосед (cisza)
  - METHOD: *Przepraszam za spóźnienie / za hałas*
  - NORMATIVE: — PRODUCT + CEFR (не лексика рекламации)
- **Completion criterion:** По карточке нарушения учащийся произносит или пишет извинение с (1) формулой *przepraszam* и (2) названной причиной/объектом (*spóźnienie / hałas / pomyłka*). Ассистент отмечает «apology accepted». Блок: извинение без объекта при требовании уточнить; лексика жалобы/рекламации вместо извинения; L1-only.
- **Allowed support:** 1 модель; для SMS — лимит 20 слов
- **Blocking errors:** нет *przepraszam*; обвинение собеседника вместо извинения
- **L1 risks:** UKR: ERR-UKR-18; RUS: ERR-RUS-18; BEL: ERR-BEL-18
- **Criticality:** Important

### FN-A1-CONFIRM-01
- **ID:** FN-A1-CONFIRM-01
- **Title (PL):** Potwierdzenie
- **Can-do:** Может согласиться и подтвердить договорённость.
- **Intent:** Зафиксировать согласие на предложенное действие/время.
- **Modality/skill:** speaking; writing (SMS)
- **Scenarios:** SCN-A1-PHONE-01, SCN-A1-WORK-01, SCN-A1-SMS-01, SCN-A1-MED-01, SCN-A1-SHOP-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-ASK-01
- **Concepts:** GR-Q-YESNO-01, GR-NEG-01, GR-TNS-PRS-01
- **LEX bundle:** LEX-A1-POLITENESS
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — proste potwierdzenie / interakcja — REQUIRES VERIFICATION
  - CEFR: agreeing A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: подтверждение смены/визита/SMS
  - METHOD: *Tak / Dobrze / Pasuje mi / Potwierdzam*
- **Completion criterion:** В серии из 4 предложений ассистента учащийся корректно подтверждает **два** подходящих и отклоняет/уточняет **два** неподходящих (связка с REFUSE допустима). Минимум одно подтверждение — развёрнутое (*tak, o 15:00 / dobrze, jutro*). Блок: все ответы *tak* без различения; подтверждение неверного слота времени.
- **Allowed support:** календарь; карточка «potwierdź tylko jeśli…»
- **Blocking errors:** ложное подтверждение конфликтного слота; отсутствие реакции
- **L1 risks:** UKR/RUS/BEL: кальки формул согласия и неоднозначное однословное подтверждение; подходящих отдельных ERR-карточек в текущем банке нет
- **Criticality:** Important

### FN-A1-REPORT-01
- **ID:** FN-A1-REPORT-01
- **Title (PL):** Zgłoszenie zdarzenia
- **Can-do:** Может сообщить о простой неисправности жилья или об отсутствии ребёнка в школе.
- **Intent:** Передать факт проблемы/отсутствия ответственному лицу.
- **Modality/skill:** speaking; writing (SMS/wiadomość)
- **Scenarios:** SCN-A1-HOUSING-01, SCN-A1-SCHOOL-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01, FN-A1-LOCATE-01, FN-A1-TIME-01
- **Concepts:** GR-TNS-PRS-01, GR-NEG-01, GR-EXIST-01, GR-PRO-POSS-01, GR-CAS-NOM-01
- **LEX bundle:** LEX-A1-HOUSING / LEX-A1-SCHOOL (по сценарию)
- **Evidence type:** task_performance
- **Source anchor:**
  - PRODUCT ANALYSIS: слияние usterka + nieobecność dziecka
  - NORMATIVE: Dz.U. 2025 poz. 217 — życie codzienne / edukacja — REQUIRES VERIFICATION
  - METHOD: *Nie działa… / Cieknie… / Dziecko nie przyjdzie, bo…*
  - CEFR: reporting simple incidents A1 — REQUIRES VERIFICATION
- **Completion criterion:** В одном из двух сценариев (карточка выбирается случайно) учащийся передаёт: (1) **что** случилось / кого касается, (2) **где** или **когда**, (3) контакт или просьбу о реакции. Ассистент классифицирует тип события верно (usterka vs nieobecność). Блок: нет субъекта события; описание без факта («źle» без объекта); путаница «ребёнок болен» vs «кран течёт» при явной карточке.
- **Allowed support:** фото-стимул usterki или школьная карточка; 1 вопрос ассистента
- **Blocking errors:** событие не идентифицировано; полный отказ от польских лексем проблемы
- **L1 risks:** UKR/RUS/BEL: кальки безличного сообщения о неисправности/отсутствии; scenario-specific ERR-карточки ещё не валидированы
- **Criticality:** Important

### FN-A1-TIME-01
- **ID:** FN-A1-TIME-01
- **Title (PL):** Czas i termin
- **Can-do:** Может назвать дни, месяцы и часы встречи.
- **Intent:** Задать временную координату события.
- **Modality/skill:** speaking; listening
- **Scenarios:** SCN-A1-EVERYDAY-01, SCN-A1-MED-01, SCN-A1-TICKET-01, SCN-A1-SMS-01, SCN-A1-WORK-01, SCN-A1-SCHOOL-01
- **Level:** A1
- **Prerequisites (FN):** —
- **Concepts:** GR-TIME-EXPR-01, GR-NUM-ORD-01, GR-NUM-CARD-01, GR-CAS-GEN-02 (dni tygodnia patterns)
- **LEX bundle:** LEX-A1-TIME
- **Evidence type:** task_performance
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — czas — REQUIRES VERIFICATION
  - CEFR: telling the time A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: запись, транспорт, смена
  - METHOD: дни недели → месяцы → godziny
- **Completion criterion:** Учащийся в устной проверке корректно озвучивает **три** стимула: день недели, дату (день+месяц), час (в т.ч. *wpół do* **или** цифровой формат 24h — по карточке уровня). Слушатель отмечает совпадение с ключом. Допускается 1 переспрос. Блок: час и день перепутаны местами так, что встреча невозможна; месяц не назван при требовании даты.
- **Allowed support:** календарь; аналоговые часы
- **Blocking errors:** систематическая ошибка am/pm без 24h и без уточнения; отказ от дней недели
- **L1 risks:** RUS: ERR-RUS-10 (дни недели с *w + Acc*); UKR/BEL: отдельные карточки выражения даты/часа ещё не валидированы
- **Criticality:** Important

### FN-A1-FORM-01
- **ID:** FN-A1-FORM-01
- **Title (PL):** Dane w ankiecie
- **Can-do:** Может заполнить анкету: личные данные, адрес, телефон.
- **Intent:** Письменно передать идентифицирующие данные в формуляре.
- **Modality/skill:** writing
- **Scenarios:** SCN-A1-FORM-01, SCN-A1-URZAD-01, SCN-A1-WORK-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01, FN-A1-LOCATE-02
- **Concepts:** ORTH-CORE-01, ORTH-IY-01, GR-CAS-NOM-01, GR-NUM-CARD-01
- **LEX bundle:** LEX-A1-DOCS
- **Evidence type:** writing_task
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — pisanie / formularze — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: HR / urząd анкеты
  - METHOD: поля imię, nazwisko, adres, telefon, PESEL(optional mask)
  - CEFR: filling in forms A1 — REQUIRES VERIFICATION
- **Completion criterion:** На бланке из ≥5 обязательных полей учащийся заполняет все обязательные **разборчиво**: имя и фамилию — как в документе/профиле, польский адрес — с нужными польскими диакритиками; телефон — 9 цифр PL-формата или международный с `+`. Проверка: валидатор полей + сверка с ID-карточкой учащегося. Допускается 1 исправление по пометке. Блок: пустые обязательные поля; телефон < 9 цифр; адрес без улицы и номера.
- **Allowed support:** легенда полей PL→L1 UI; образец заполненного поля «telefon»
- **Blocking errors:** незаполненный обязательный блок; заведомо чужие данные относительно профиля
- **L1 risks:** UKR: ERR-UKR-01; RUS: ERR-RUS-02; BEL: ERR-BEL-01; диакритики ORTH-CORE-01
- **Criticality:** Core

### FN-A1-READ-01
- **ID:** FN-A1-READ-01
- **Title (PL):** Krótki tekst użytkowy
- **Can-do:** Может понять вывеску/короткое объявление и выполнить короткую инструкцию устройства.
- **Intent:** Извлечь действие или запрет из короткого утилитарного текста.
- **Modality/skill:** reading (+ minimal speaking for confirmation)
- **Scenarios:** SCN-A1-TICKET-01, SCN-A1-MED-01, SCN-A1-SHOP-01, SCN-A1-HOUSING-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-REPAIR-02 (если слово неизвестно)
- **Concepts:** GR-PRO-DEM-01, GR-CAS-ACC-01, ORTH-CORE-01 (императив на вывесках — RECP без IMP A2)
- **LEX bundle:** LEX-A1-SIGNS / LEX-A1-SIGNS
- **Evidence type:** reading_task
- **Source anchor:**
  - NORMATIVE: Dz.U. 2025 poz. 217 — czytanie A1 — REQUIRES VERIFICATION
  - CEFR: reading instructions / signs A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: biletomat, apteka, ogłoszenie
  - METHOD: receptive labels; без требования продуктивного императива
- **Completion criterion:** По тексту ≤ 40 слов (вывеска **или** шаги устройства) учащийся выполняет целевое действие в интерфейсе задания (выбор кнопки / порядка шагов) **или** отмечает верный смысл из 4 опций. Успех без угадывания: объясняет одним словом/короткой репликой, *почему* выбран шаг (на L1 UI допустимо). Блок: выбор, противоречащий запрету на вывеске; пропуск обязательного шага «zapłać/odbierz».
- **Allowed support:** словарь 3 слов; 1 уточняющий вопрос
- **Blocking errors:** действие против текста; полный отказ читать
- **L1 risks:** UKR: ERR-UKR-13; RUS: ERR-RUS-14; BEL: ERR-BEL-14 — ложный друг *magazyn* в вывесках/навигации магазина
- **Criticality:** Extension

### FN-A1-REG-01
- **ID:** FN-A1-REG-01
- **Title (PL):** Wybór rejestru
- **Can-do:** Может различить официальное и неофициальное обращение в готовых репликах и выбрать уместную.
- **Intent:** Контролировать регистр T–V на уровне выбора готовых форм.
- **Modality/skill:** listening/reading discrimination; speaking (selection)
- **Scenarios:** SCN-A1-EVERYDAY-01, SCN-A1-URZAD-01, SCN-A1-NEIGHBOR-01, SCN-A1-WORK-01
- **Level:** A1
- **Prerequisites (FN):** FN-A1-GREET-01, FN-A1-ADDRESS-01
- **Concepts:** PRAG-PAN-01, GR-TV-AGR-01, GR-CAS-VOC-01
- **LEX bundle:** LEX-A1-GREETINGS
- **Evidence type:** roleplay_tv / discrimination_task
- **Source anchor:**
  - NORMATIVE: CEFR sociolinguistic A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: критический навык для urzędu vs kolega
  - METHOD: выбор из минимальных пар реплик
  - RELATED FN: ADDRESS-01 (продукция), REG-01 (распознавание+выбор)
- **Completion criterion:** В тесте из 6 минимальных пар (офиц./неофиц.) учащийся выбирает уместную реплику ≥5/6 для описанного адресата. Затем в одном коротком говорящем задании применяет выбор. Блок: <4/6; систематический *ty* к urzędnik.
- **Allowed support:** карточка адресата; без перевода реплик
- **Blocking errors:** порог ниже 4/6; игнор карточки «oficjalnie»
- **L1 risks:** UKR: ERR-UKR-18; RUS: ERR-RUS-18; BEL: ERR-BEL-18
- **Criticality:** Core

### FN-A1-NARRATE-01
- **ID:** FN-A1-NARRATE-01
- **Title (PL):** Typowy dzień
- **Can-do:** Может описать типичный день (работа–дом–магазин) несколькими связными фразами.
- **Intent:** Дать простой линейный рассказ о рутине.
- **Modality/skill:** speaking (monologue); writing optional
- **Scenarios:** SCN-A1-EVERYDAY-01, SCN-A1-WORK-01, SCN-A1-WRITE-SELF-01 (как вход в ASM)
- **Level:** A1
- **Prerequisites (FN):** FN-A1-IDENTIFY-01, FN-A1-TIME-01, FN-A1-LOCATE-01
- **Concepts:** GR-TNS-PRS-01, GR-SYN-COORD-01, GR-TIME-EXPR-01, GR-ASP-LEX-01 (exposure)
- **LEX bundle:** LEX-A1-ROUTINE
- **Evidence type:** task_performance (short monologue)
- **Source anchor:**
  - CEFR: describing daily routine A1 — REQUIRES VERIFICATION
  - PRODUCT ANALYSIS: Extension — не блокирует выживание, усиливает связность
  - METHOD: 4–6 фраз с маркерами времени
  - NORMATIVE: Dz.U. 2025 poz. 217 — mówienie — REQUIRES VERIFICATION
- **Completion criterion:** Устный монолог 40–90 с содержит ≥4 понятных действия рутины в правдоподобном порядке суток и ≥2 маркера времени (*rano / po pracy / wieczorem*). Слушатель восстанавливает порядок дня без дыр. Допускается 3 хезитации. Блок: набор несвязанных слов без глаголов; меньше 3 действий; рассказ целиком о другом человеке без указания при задании «о себе».
- **Allowed support:** timeline из 4 иконок; 1 перезапуск записи
- **Blocking errors:** нет временной линии; полная неразборчивость >50% реплик
- **L1 risks:** UKR: ERR-UKR-09; RUS: ERR-RUS-09; BEL: ERR-BEL-09; аспект — только exposure
- **Criticality:** Extension

---

## A2–B2 (LEGACY — pending semantic migration)
**Не объявлены готовыми.** Записи ниже — pre-refactor inventory; не эталон.

ID `FN-A2-*` / `FN-B1-*` / `FN-B2-*` временно сохранены as-is до отдельной семантической миграции по образцу A1.

---

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
