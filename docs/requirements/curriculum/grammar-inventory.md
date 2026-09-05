# Инвентарь грамматических концептов A1–B2

**Статус:** Phase 2 draft — не утверждено (см. `PED-015`, `CNT-016`, документ 10 §10.8).  
**Язык документа:** русский; примеры — нормативный польский.  
**Дата сверки источников:** 2026-09-05.

---

## 0. Как читать этот файл

1. **Присутствие концепта в таблице уровня ≠ полное освоение уровня.** Концепт может быть введён (receptive / formulaic / productive-limited); mastery задаётся полем «доказательство освоения» и exit criteria (`level-exit-criteria.md`).
2. Инвентарь — **собственный спиральный syllabus** продукта, сверяемый с официальной *Listą zagadnień gramatycznych* в załącznik nr 1 к Dz.U. 2025 poz. 217 и с CEFR как рамкой компетенций. Он **не** копирует оглавление учебника (`CNT-009`, `PED-015`).
3. ID стабильны: `GR-<ОБЛАСТЬ>-<КОД>-<NN>`. Переименование только через ADR.
4. Риски UKR / RUS / BEL **раздельны** (`PED-013`, `PED-014`): не копировать один абзац на три языка.
5. **Не приведены** выдуманные «нормы CEFR по числу слов»; лексические объёмы — только если явно в официальном стандарте (и тогда с цитатой), иначе → `lexical-targets.md` / REQUIRES VERIFICATION.

### Источники (общие)

| Источник | URL / реквизит | Роль | Проверка | Уверенность |
|---|---|---|---|---|
| Dz.U. 2025 poz. 217, załącznik nr 1 (Listy zagadnień gramatycznych A1–B2; Katalogi A/B) | https://dziennikustaw.gov.pl/D2025000021701.pdf | Нормативный каталог покрытия | 2026-09-05 | High |
| certyfikatpolski.pl — структура экзамена | https://certyfikatpolski.pl/o-egzaminie/struktura-egzaminu/ | Контекст модулей / уровней | 2026-09-05 | High |
| CEFR Companion Volume (Council of Europe) | https://www.coe.int/en/web/common-european-framework-reference-languages | Рамка уровней (не польский минимум форм) | 2026-09-05 | High (рамка) / Low (конкретные польские формы) |
| Oscar E. Swan, *A Grammar of Contemporary Polish* (Slavica) | библиография / ISBN издания; страницы **не** цитируются без сверки экземпляра | Описательная грамматика | — | Medium (явления) / Low (номера страниц → REQUIRES VERIFICATION) |
| Alicja Nagórko, *Zarys gramatyki polskiej* (и смежные академические описания) | академическое издание | Описательная грамматика | — | Medium / Low (стр.) |
| Практики JPJO / Programy nauczania JPJO A1–C2 (UJ и др.) | напр. https://ruj.uj.edu.pl/xmlui/handle/item/69074 | Педагогическая традиция последовательности | 2026-09-05 | Medium |
| `docs/requirements/04-pedagogical-requirements.md` | локальный | Столпы PED-001–012 | 2026-09-05 | High (продукт) |

---

## 1. Сводка: число концептов по уровню **первого введения**

| Уровень первого введения | Число концептов | Комментарий |
|---|---:|---|
| A1 | 38 | Формулы + базовые функции падежей; аспект **лексически** |
| A2 | 28 | Celownik, wołacz продуктивно, męskoosobowy, сознательный аспект, наклонения, степени |
| B1 | 26 | Продуктивный контроль аспекта, числительные męskoosobowe, относительные предложения, приставки |
| B2 | 18 | Причастия, страдательный залог, безличные формы, информационная структура |
| **Всего** | **110** | Цель диапазона 80–120 |

Повторное углубление (re-deepening) **не** увеличивает счётчик «первого введения».

---

## 2. Формат записи

Каждая запись:

- **ID** · PL · RU · **Intro** · **Re-deepen** · **Prereq** · **Функция** · **Form / Meaning / Use** · **Пределы** · **Пример** · **Контрпример** · **UKR / RUS / BEL** · **Evidence** · **Source / Confidence**

Сокращения Evidence: `closed_morph` · `guided_prod` · `free_prod` · `disc_repair` · `receptive` · `pair_choice`.

---

## 3. Концепты

### 3.1 Род, число, согласование, męskoosobowość

#### GR-GEN-MFN-01 — Rodzaj gramatyczny (m/ż/n) · Грамматический род (м/ж/ср)
- **Intro:** A1 · **Re-deepen:** A2 (исключения), B1 (родовые сдвиги в словообразовании)
- **Prereq:** —
- **Функция:** Классификация N для согласования Adj/Pron/V_past.
- **Form / Meaning / Use:** Формальные маркеры (*-a* ж. часто; *-o/-e* ср.; нулевое м.); род лексический, не «биологический».
- **Пределы:** *mężczyzna* м. на *-a*; *dziecko* ср.; заимствования (*muzeum*).
- **Пример:** *To jest nowy dom / nowa książka / nowe okno.*
- **Контрпример:** *\*nowa dom* (ошибка рода).
- **UKR:** Часто верный «смысловой» род, но ломается на *-um*, *dziecko*, *mężczyzna*.  
  **RUS:** Калька рода с русского (*problem* ж. в RUS → *\*ta problem*).  
  **BEL:** Схож с UKR; плюс колебания у заимствований с другой орфоэпией.
- **Evidence:** `closed_morph` + `guided_prod`
- **Source:** Dz.U. 2025 poz. 217 zał. 1 A1 §2.2.1 deklinacja; Swan/Nagórko (род) — **Medium**; стр. Swan — REQUIRES VERIFICATION

#### GR-NUM-SGPL-01 — Liczba pojedyncza / mnoga · Ед. / мн. число
- **Intro:** A1 · **Re-deepen:** A2 (чередования), B1 (suppletive: *człowiek/ludzie*)
- **Prereq:** GR-GEN-MFN-01
- **Функция:** Обозначение количества референтов; триггер согласования.
- **Form / Meaning / Use:** Регулярные мн.; чередования (*ręka → ręce*, *miasto → miasta*).
- **Пределы:** *dziecko → dzieci*; *oko/ucha* (B1+).
- **Пример:** *Jedno dziecko — dwoje dzieci.*
- **Контрпример:** *\*dziecka* как мн.
- **UKR:** Близость *dzieci*, но польские чередования (*książka/książki*) дают гиперкоррекцию.  
  **RUS:** *дети/ребёнок* ≠ польская пара; риск *\*dzieci* в ед. контексте.  
  **BEL:** Как UKR; фонетика мн. может маскировать неверное окончание на письме.
- **Evidence:** `closed_morph`
- **Source:** zał. 1 A1–B1 deklinacja — **High**

#### GR-AGR-ADJ-01 — Zgoda przymiotnika z rzeczownikiem · Согласование прилагательного
- **Intro:** A1 · **Re-deepen:** A2–B2 (все падежи, мн. męskoosobowe)
- **Prereq:** GR-GEN-MFN-01, GR-CAS-NOM-01
- **Функция:** Атрибутивная характеристика.
- **Form / Meaning / Use:** Adj копирует род/число/падеж N.
- **Пределы:** Краткие формы почти нет; предикатив через *być* + Narz (см. GR-CAS-INS-01).
- **Пример:** *To jest mała kawa.*
- **Контрпример:** *\*mały kawa*
- **UKR:** Ожидание кратких форм предикатива.  
  **RUS:** То же + перенос окончаний (*\-ый*).  
  **BEL:** Путаница *-y/-i* на письме при сходном слухе.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A1 odmiana przymiotników — **High**

#### GR-AGR-VPAST-01 — Zgoda rodzaju w czasie przeszłym · Согласование рода в прошедшем
- **Intro:** A1 · **Re-deepen:** A2 (мн.), B1 (męskoosobowy)
- **Prereq:** GR-GEN-MFN-01, GR-TNS-PST-01
- **Функция:** Маркировка субъекта в прош.
- **Form / Meaning / Use:** *-łem/-łam/-ło*; мн. *-li/-ły*.
- **Пределы:** Вежл. *pan/pani* → 3 л. ед. + род адресата.
- **Пример:** *Anna czytała. Piotr czytał.*
- **Контрпример:** *\*Anna czytał*
- **UKR:** Близко; ошибка на *-ło* ср. и на *pan*.  
  **RUS:** Род в прош. знаком, но окончания другие; *вы* вежл. ≠ *pan*.  
  **BEL:** Как UKR; смешение *-лі/-лы* с польск. *-li/-ły*.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A1 czas przeszły — **High**

#### GR-MO-VIR-01 — Męskoosobowy / niemęskoosobowy · Мужсколичный / немужсколичный
- **Intro:** A2 · **Re-deepen:** B1 (liczebniki), B2 (стиль/обобщения)
- **Prereq:** GR-NUM-SGPL-01, GR-AGR-ADJ-01
- **Функция:** Польская категория мн.ч. для групп мужчин vs остальное.
- **Form / Meaning / Use:** *ci nowi studenci byli* vs *te nowe studentki / stoły były*; числительные *czterej / cztery*.
- **Пределы:** Смешанные группы → męskoosobowy; животные обычно niemęskoosobowe.
- **Пример:** *Studenci byli zmęczeni. Studentki były zmęczone.*
- **Контрпример:** *\*Studenci były zmęczone*
- **UKR:** Нет школьной категории «мужсколичности»; учат как «просто мн.».  
  **RUS:** То же; сильный fossil *\*te studenty*.  
  **BEL:** То же; дополнительно орфография *ci/te*.
- **Evidence:** `pair_choice` · `guided_prod` · `disc_repair`
- **Source:** zał. 1 A2 §2.2.1 męskoosobowe/niemęskoosobowe; PED-005 — **High**

#### GR-ALT-STEM-01 — Oboczności tematyczne · Чередования основ
- **Intro:** A1 (распознавание в *w mieście*) · **Re-deepen:** A2–B2
- **Prereq:** GR-CAS-LOC-01
- **Функция:** Предсказуемые изменения основы в падежах/степенях/спряжении.
- **Form / Meaning / Use:** *miasto/mieście, ręka/ręce, Bóg/Bogu, mogę/możesz*.
- **Пределы:** Не все чередования «правило + исключение» одинаково продуктивны.
- **Пример:** *Mieszkam w Krakowie.* (не *\*w Krakówie*)
- **Контрпример:** *\*w miastu*
- **UKR:** Другой набор палатализаций.  
  **RUS:** *в городе* не подсказывает *w mieście*.  
  **BEL:** Риск смешения с бел. *у горадзе*.
- **Evidence:** `closed_morph` · `receptive`
- **Source:** PED-006; Swan/Nagórko — **Medium**

---

### 3.2 Падежи и функции

#### GR-CAS-NOM-01 — Mianownik: podmiot · Именительный: подлежащее
- **Intro:** A1 · **Re-deepen:** A2–B2
- **Prereq:** —
- **Функция:** Назвать деятеля/тему предложения.
- **Form / Meaning / Use:** Словарная форма; согласование с V.
- **Пределы:** Подлежащее в D после *nie ma / nie było* (см. GR-CAS-GEN-04).
- **Пример:** *Uczeń czyta książkę.*
- **Контрпример:** *\*Ucznia czyta książkę* (как подлежащее)
- **UKR/RUS/BEL:** Перенос L1 обычно успешен; ломается при польских исключениях подлежащего в D.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 funkcje: mianownik jako podmiot — **High**

#### GR-CAS-NOM-02 — Mianownik: orzecznik (to / jest + Adj) · Именительный: предикатив
- **Intro:** A1 · **Re-deepen:** A2 (контраст с Narz)
- **Prereq:** GR-CAS-NOM-01
- **Функция:** Классификация/свойство (*to Polka*; *jest mały*).
- **Form / Meaning / Use:** *X to Y*; *X jest + Adj*.
- **Пределы:** Профессия/роль чаще *jest + Narz* (GR-CAS-INS-01).
- **Пример:** *Zosia to Polka. On jest mały.*
- **Контрпример:** *\*On jest nauczyciel* (нужен Narz: *nauczycielem*)
- **UKR:** *Він учитель* без творит. → *\*On jest nauczyciel*.  
  **RUS:** То же сильнее.  
  **BEL:** То же; *ёсть* кальки.
- **Evidence:** `pair_choice`
- **Source:** zał. 1 A1 mianownik jako orzecznik — **High**

#### GR-CAS-ACC-01 — Biernik: dopełnienie bliższe · Винительный: прямое дополнение
- **Intro:** A1 · **Re-deepen:** A2 (żywotność м.), B1
- **Prereq:** GR-CAS-NOM-01
- **Функция:** Объект транзитивного глагола.
- **Form / Meaning / Use:** Ж. *-ę*; м. неодуш. = Nom; м. одуш. = Gen (часто).
- **Пределы:** После отрицания → Gen (GR-CAS-GEN-03).
- **Пример:** *Napisali list. Widzę studenta.*
- **Контрпример:** *\*Widzę student* (одуш. м.)
- **UKR:** Одуш./неодуш. близко, но окончания иные.  
  **RUS:** Сильный перенос *-а/-я* одуш.; риск *\*widzę studentа* орф.  
  **BEL:** Как UKR; путаница *studenta/studenta* с бел. формами.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A1 biernik — **High**

#### GR-CAS-ACC-02 — Biernik z przyimkami (na, o, przez…) · Винительный с предлогами
- **Intro:** A1 · **Re-deepen:** A2–B1 (*na* направление vs Msc место)
- **Prereq:** GR-CAS-ACC-01
- **Функция:** Цель движения, тема (*pytać o*), ожидание (*czekać na*).
- **Form / Meaning / Use:** *idę na pocztę*; *czekam na autobus*; *pytam o godzinę*.
- **Пределы:** *na + Msc* = местонахождение (*na stole*).
- **Пример:** *Czekają na autobus.*
- **Контрпример:** *\*Czekają na autobusie* (в значении «ждут автобус»)
- **UKR:** *чекати на* похоже, но *питати про* ≠ *pytać o*.  
  **RUS:** *ждать + Gen/Acc* ≠ *czekać na + B*; *спрашивать о* → *\*o* калька ок, но падеж N.  
  **BEL:** *чакаць* управление иное; риск *\*czekać autobusu*.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** zał. 1 A1 biernik z przyimkiem; PED-002 — **High**

#### GR-CAS-GEN-01 — Dopełniacz: dopełniacz dzierżawczy / ilości · Родительный: принадлежность / мера
- **Intro:** A1 · **Re-deepen:** A2–B2
- **Prereq:** GR-CAS-NOM-01
- **Функция:** «Чей / сколько чего».
- **Form / Meaning / Use:** *brat Ewy*; *kilogram ryżu*.
- **Пределы:** Не путать с англ. *of*-кальками порядка слов.
- **Пример:** *Kupił kilogram ryżu.*
- **Контрпример:** *\*kilogram ryż*
- **UKR:** Близко; ломается на окончаниях ж. (*Ewy*).  
  **RUS:** * Evы* vs *Ewy*; *риса* vs *ryżu*.  
  **BEL:** Окончания ж. D часто другие.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 dopełniacz jako określenie rzeczownika — **High**

#### GR-CAS-GEN-02 — Dopełniacz z przyimkami (do, u, z, od, bez…) · Родительный с предлогами
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-CAS-GEN-01
- **Функция:** Направление *do*, источник *z/od*, визит *u*, отсутствие *bez*.
- **Form / Meaning / Use:** *Idę do domu. Byliśmy u lekarza. Wracają z Warszawy.*
- **Пределы:** *z + Narz* = «с кем/чем» (орудие/компания) vs *z + D* = «из».
- **Пример:** *Idę do domu.*
- **Контрпример:** *\*Idę do dom* / *\*Idę w dom* (L1)
- **UKR:** *додому* adv. → *\*idę do domu* иногда ок, но *в дім* → *\*w dom*.  
  **RUS:** *домой* / *в дом* → *\*do domu* смешивают с *w dom*.  
  **BEL:** *дахаты* / *у дом* дают те же кальки.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** zał. 1 A1; PED-002 — **High**

#### GR-CAS-GEN-03 — Dopełniacz po negacji (nie + V + obiekt) · Родительный после отрицания
- **Intro:** A1 · **Re-deepen:** A2–B2 (объём «обязательности»)
- **Prereq:** GR-CAS-ACC-01, GR-NEG-01
- **Функция:** Объект отрицаемого транзитива часто в D.
- **Form / Meaning / Use:** *Nie kupiły tego soku.* vs *Kupiły ten sok.*
- **Пределы:** Не все объекты/контексты одинаково жёстко; фиксированные выражения.
- **Пример:** *Nie widziałem tej gazety.*
- **Контрпример:** *\*Nie widziałem tę gazetę* (типичная ошибка)
- **UKR:** Есть аналог, но распределение иное → частичный перенос.  
  **RUS:** Genitive of negation знаком, но польский шире/иначе → ложная уверенность.  
  **BEL:** Аналогично UKR; риск гипергенерализации D.
- **Evidence:** `pair_choice` · `guided_prod`
- **Source:** zał. 1 A1 dopełniacz zaprzeczony; Swan — **Medium** (детали исключений)

#### GR-CAS-GEN-04 — Dopełniacz: podmiot po «nie ma / nie było» · Родительный подлежащего при отсутствии
- **Intro:** A1 · **Re-deepen:** A2
- **Prereq:** GR-CAS-GEN-01
- **Функция:** Отсутствие / ненахождение.
- **Form / Meaning / Use:** *Nie ma pasty. Koleżanki nie było w szkole.*
- **Пределы:** Утверждение *jest pasta* (Nom).
- **Пример:** *Siostry nie ma w domu.*
- **Контрпример:** *\*Siostra nie ma w domu* (как «сестры нет»)
- **UKR:** *немає сестри* близко.  
  **RUS:** *нет сестры* близко; ломается род/число D.  
  **BEL:** *няма* конструкции близки.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 dopełniacz jako podmiot — **High**

#### GR-CAS-GEN-05 — Rekcja dopełniaczowa czasownika · Глагольное управление D
- **Intro:** A1 (*słuchać*) · **Re-deepen:** A2–B2 (список глаголов)
- **Prereq:** GR-CAS-GEN-01
- **Функция:** Объект глаголов с фиксированным D.
- **Form / Meaning / Use:** *słuchać muzyki; szukać pracy; potrzebować czasu; uczyć się polskiego*.
- **Пределы:** Не путать с Acc-транзитивами L1.
- **Пример:** *Słucha muzyki.*
- **Контрпример:** *\*Słucha muzykę*
- **UKR:** *слухати музику* Acc → *\*słucha muzykę*.  
  **RUS:** *слушать музыку* Acc.  
  **BEL:** *слухаць музыку* Acc.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** zał. 1 A1–A2 rekcja dopełniaczowa; PED-002 — **High**

#### GR-CAS-DAT-01 — Celownik: odbiorca / doświadczający · Дательный: адресат / экспериенцер
- **Intro:** A2 (формулы с A1: *dziękuję*) · **Re-deepen:** B1–B2
- **Prereq:** GR-CAS-NOM-01
- **Функция:** Кому; *podobać się*; *jest mi zimno*.
- **Form / Meaning / Use:** *Daję mamie kwiaty. Film podoba mi się. Czy jest ci zimno?*
- **Пределы:** Полные парадигмы C позже; клитики *mi/ci/mu*.
- **Пример:** *Dziękuję paniom.*
- **Контрпример:** *\*Dziękuję panie* (не тот падеж/форма)
- **UKR:** Датив жив; окончания и клитики иные.  
  **RUS:** Датив жив; *мне нравится* → порядок *podoba mi się* ломают.  
  **BEL:** Датив жив; риск *\*dla mnie podoba*.
- **Evidence:** `guided_prod` · `closed_morph`
- **Source:** zał. 1 A2 celownik; коммуникативные формулы A1 — **High** (уровень введения C в списке A2)

#### GR-CAS-INS-01 — Narzędnik: orzecznik po «być» · Творительный: предикатив профессии/роли
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-CAS-NOM-02
- **Функция:** Кем/чем является.
- **Form / Meaning / Use:** *Paweł jest dobrym uczniem. Ona była aktorką.*
- **Пределы:** Adj-предикатив часто Nom (*jest mały*).
- **Пример:** *On jest nauczycielem.*
- **Контрпример:** *\*On jest nauczyciel*
- **UKR:** Часто именительный в роли.  
  **RUS:** *Он учитель* → сильнейший fossil.  
  **BEL:** То же.
- **Evidence:** `pair_choice` · `guided_prod`
- **Source:** zał. 1 A1 narzędnik jako orzecznik — **High**

#### GR-CAS-INS-02 — Narzędnik: narzędzie / towarzyszenie · Творительный: орудие / совместность
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-CAS-INS-01
- **Функция:** Чем ехать / с чем / интересоваться.
- **Form / Meaning / Use:** *Jechał pociągiem. Kawę z mlekiem. Interesuję się sportem.*
- **Пределы:** *z + D* «из» vs *z + Narz* «с».
- **Пример:** *Interesuję się sportem.*
- **Контрпример:** *\*Interesuję się sport*
- **UKR:** *цікавитися + Instr* близко; *їхати поїздом* близко.  
  **RUS:** *интересоваться + Instr* ок; *на поезде* → *\*na pociągu* вместо *pociągiem*.  
  **BEL:** Смешение предлогов *на/у* с польским Narz.
- **Evidence:** `pair_choice`
- **Source:** zał. 1 A1 narzędnik — **High**

#### GR-CAS-LOC-01 — Miejscownik z «w / na / o / po» · Местный с предлогами
- **Intro:** A1 · **Re-deepen:** A2–B2
- **Prereq:** GR-ALT-STEM-01 (параллельно)
- **Функция:** Место, тема (*o*), время.
- **Form / Meaning / Use:** *Mieszkam w Polsce. Byliśmy na spotkaniu. Rozmawiamy o wakacjach.*
- **Пределы:** *w/na + B* направление; выбор *w/na* лексический.
- **Пример:** *Mieszkam w Polsce.*
- **Контрпример:** *\*Mieszkam w Polska* / *\*w Polskę* (место)
- **UKR:** *в Польщі* близко; выбор *w/na* и чередования — ловушка.  
  **RUS:** *в Польше* → окончания; *на Украине* прагматика ≠ грамматика польск. *na/w*.  
  **BEL:** *у Польшчы*; *h/ch* в основах на письме.
- **Evidence:** `closed_morph` · `pair_choice`
- **Source:** zał. 1 A1 miejscownik — **High**

#### GR-CAS-VOC-01 — Wołacz: zwrot do osoby · Звательный: обращение
- **Intro:** A1 (формулы *panie…*, *Aniu*) · **Re-deepen:** A2 (продуктивно), B1 (регистр)
- **Prereq:** GR-PRAG-PAN-01
- **Функция:** Адресация; живой падеж польского.
- **Form / Meaning / Use:** *Panie doktorze! Aniu! Drogi Marku!*
- **Пределы:** Не все имена имеют частотный Voc; *pan/pani + Voc/Nom* по регистру.
- **Пример:** *Panie dyrektorze!*
- **Контрпример:** *\*Pan dyrektor!* как Voc-обращение в той же функции (часто звучит как номинация, не обращение)
- **UKR:** Voc живее, чем в RUS → ложная полная переносимость форм.  
  **RUS:** Voc почти мёртв → *\*Anna!* / именительный.  
  **BEL:** Voc ограниченнее польского; смешанный перенос.
- **Evidence:** `guided_prod` · `disc_repair`
- **Source:** zał. 1 A2 wołacz (норма списка); PED-001 ранние формулы A1 — **High** (A2 в списке) / **Medium** (объём A1 формул)

#### GR-CAS-FUNC-MAP-01 — Mapa funkcji przypadków · Карта функций падежей (метаконцепт)
- **Intro:** A1 · **Re-deepen:** каждый уровень
- **Prereq:** —
- **Функция:** Не учить «окончания падежа», а функцию + форму.
- **Form / Meaning / Use:** Семь столпов PED-001.
- **Пределы:** Одна форма — несколько функций; одна функция — несколько падежей (предлоги).
- **Пример:** Учебная схема: Acc объект vs Gen после *nie*.
- **Контрпример:** Таблица «выучи 7×3 окончания» без функции.
- **UKR/RUS/BEL:** Иллюзия «падежи уже знаю».
- **Evidence:** `receptive` + диагностический `pair_choice`
- **Source:** PED-001; zał. 1 funkcje przypadków — **High**

---

### 3.3 Предложное и глагольное управление (rekcja)

#### GR-REK-PREP-01 — Rekcja przyimków częstych · Управление частых предлогов
- **Intro:** A1 · **Re-deepen:** A2–B2
- **Prereq:** соответствующие GR-CAS-*
- **Функция:** Стабильные связки предлог→падеж.
- **Form / Meaning / Use:** *w+Msc, do+D, na+B/Msc, z+D/Narz, o+B/Msc, po+Msc, dla+D, bez+D, od+D, u+D, przed/za/nad/pod + B/Narz* (по значению).
- **Пределы:** Полисемия предлога; не учить как перевод «in/on».
- **Пример:** *Książka leży na stole. Kładę książkę na stół.*
- **Контрпример:** *\*mieszkam na Polsce*
- **UKR:** *в/на* распределение иное (*на Україні* vs *w Polsce*).  
  **RUS:** *в/на* + предл./вин. иначе.  
  **BEL:** Сильная интерференция *у/на*.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** PED-002; zał. 1 przykłady przyimków — **High**

#### GR-REK-VERB-01 — Rekcja czasowników (rdzeń A1–A2) · Управление глаголов (ядро)
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-CAS-GEN-05, GR-CAS-ACC-02, GR-CAS-DAT-01
- **Функция:** Лексикализованные рамки.
- **Form / Meaning / Use:** *dziękować + C; pomagać + C; czekać na + B; pytać o + B; bać się + D; lubić + B; uczyć się + D*.
- **Пределы:** Расширение списка на B1–B2 по минимуму.
- **Пример:** *Dziękuję ci. Czekam na ciebie.*
- **Контрпример:** *\*Dziękuję ciebie. \*Czekam ciebie.*
- **UKR:** *дякувати + Dat* ок; *чекати тебе* → Acc без *na*.  
  **RUS:** *благодарить + Acc*; *ждать + Acc/Gen*.  
  **BEL:** *дзякаваць*; *чакаць* без *na*.
- **Evidence:** `pair_choice` · словарь `FUN-103`
- **Source:** PED-002; zał. 1 — **High**

#### GR-REK-ADJ-01 — Rekcja przymiotników / imiesłowów · Управление прилагательных
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-REK-PREP-01
- **Функция:** *zadowolony z + D; podobny do + D; pewny + D*.
- **Form / Meaning / Use:** Adj задаёт падеж/предлог.
- **Пределы:** Не путать с глагольной rekcja той же основы.
- **Пример:** *Jestem zadowolony z wyniku.*
- **Контрпример:** *\*zadowolony wynikiem* (если цель — норма *z + D*; уточнять словарь)
- **UKR/RUS/BEL:** Разные предложные эквиваленты (*доволен чем* vs *zadowolony z*).
- **Evidence:** `pair_choice`
- **Source:** практика JPJO B1–B2; Swan — **Medium** / REQUIRES VERIFICATION (полнота списка)

---

### 3.4 Местоимения

#### GR-PRO-PERS-01 — Zaimki osobowe (odmiana) · Личные местоимения
- **Intro:** A1 · **Re-deepen:** A2 (энклитики), B1
- **Prereq:** GR-CAS-NOM-01
- **Функция:** Замена N; акцент vs клитика (*mnie/mi*).
- **Form / Meaning / Use:** *ja/ty/on…*; ударные vs краткие формы.
- **Пределы:** Пропуск подлежащего возможен; не калькировать обязательное *ja*.
- **Пример:** *Widzę cię. Daj mi to.*
- **Контрпример:** *\*Widzę ty*
- **UKR:** Клитики иные.  
  **RUS:** *меня/мне* ≠ *mnie/mi* распределение.  
  **BEL:** Смешение бел. клитик.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A1 zaimki osobowe — **High**

#### GR-PRO-DEM-01 — Zaimki wskazujące ten/ta/to · Указательные
- **Intro:** A1 · **Re-deepen:** A2–B1 (все падежи, мн. *ci/te*)
- **Prereq:** GR-GEN-MFN-01
- **Функция:** Дейксис, определение.
- **Form / Meaning / Use:** Согласование с N; мн. męskoosobowe *ci*.
- **Пределы:** *to* как связка (*Warszawa to…*).
- **Пример:** *Ten dom, ta książka, to dziecko; ci studenci, te książki.*
- **Контрпример:** *\*te studenci* (мужчины)
- **UKR:** *цей/ця/це* → ошибки мн.  
  **RUS:** *этот/эта/это*; мн. без męskoosobowy.  
  **BEL:** *гэты* и т.п.
- **Evidence:** `closed_morph`
- **Source:** zał. 1 A1–A2 — **High**

#### GR-PRO-POSS-01 — Zaimki dzierżawcze · Притяжательные
- **Intro:** A1 · **Re-deepen:** A2 (*swój*), B1
- **Prereq:** GR-AGR-ADJ-01
- **Функция:** Принадлежность.
- **Form / Meaning / Use:** *mój/twój/nasz/wasz*; согласование.
- **Пределы:** *jego/jej/ich* не склоняются.
- **Пример:** *To jest mój brat.*
- **Контрпример:** *\*To jest mojego brat* (Nom нужен)
- **UKR/RUS/BEL:** Склонение притяжательных иное; *его/её* похожи на *jego/jej*.
- **Evidence:** `closed_morph`
- **Source:** zał. 1 A1 — **High**

#### GR-PRO-SWOJ-01 — Zaimek «swój» · Местоимение *swój*
- **Intro:** A2 · **Re-deepen:** B1–B2
- **Prereq:** GR-PRO-POSS-01
- **Функция:** Рефлексивная принадлежность к субъекту.
- **Form / Meaning / Use:** *On myje swój samochód* (свой), не *\*jego* если субъект = владелец.
- **Пределы:** Сложные референты; акцент на чужом владельце.
- **Пример:** *Anna czyta swoją książkę.*
- **Контрпример:** *\*Anna czyta jej książkę* (если книга Анны; допустимо только при другом владельце)
- **UKR:** *свій* близко → ложная лёгкость распределения.  
  **RUS:** *свой* близко, но ошибки в 3 л. остаются.  
  **BEL:** *свой* близко.
- **Evidence:** `pair_choice`
- **Source:** zał. 1 A2 swój — **High**

#### GR-PRO-INT-01 — Zaimki pytające · Вопросительные
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** —
- **Функция:** Запрос информации.
- **Form / Meaning / Use:** *kto, co, jaki, który, czyj, ile* + склонение.
- **Пределы:** *czy* vs *który*; *ile* + Gen.
- **Пример:** *Ile to kosztuje? Która jest godzina?*
- **Контрпример:** *\*Jakim jest godzina?*
- **UKR/RUS/BEL:** Кальки *как дела* / *котра година*.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 — **High**

#### GR-PRO-INDEF-01 — Zaimki nieokreślone / przeczące · Неопределённые / отрицательные
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-NEG-01, GR-PRO-INT-01
- **Функция:** *ktoś/coś/nikt/nic/żaden*.
- **Form / Meaning / Use:** Отрицательные с *nie*; согласование *żaden*.
- **Пределы:** Двойное отрицание нормативно.
- **Пример:** *Nikt nic nie wie.*
- **Контрпример:** *\*Ktoś nie wie nic* как единственная «логичная» калька без *nikt*
- **UKR:** Двойное отрицание знакомо.  
  **RUS:** То же; формы *nikt/nic* путают с *никто/ничто*.  
  **BEL:** То же.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 B1 zaimki nieokreślone/przeczące — **High**

#### GR-PRO-REFL-01 — «się» / «siebie» · Возвратность
- **Intro:** A1 (*się* лексически) · **Re-deepen:** A2–B1 (позиция, *siebie*)
- **Prereq:** GR-TNS-PRS-01
- **Функция:** Возвратные/reciprocal/лексические *się*.
- **Form / Meaning / Use:** *Myję się. Boję się. Uczę się.* vs *Widzę siebie.*
- **Пределы:** Не каждый *się* = «себя»; позиция клитики.
- **Пример:** *On się myje. On myśli o sobie.*
- **Контрпример:** *\*On myje siebie* (вместо обычного *się* в гигиене)
- **UKR:** *ся* клитика иначе позиционно.  
  **RUS:** *-ся* слитно vs отдельное *się*; *себя* ≠ всегда *siebie*.  
  **BEL:** *-ся* / *сябе*.
- **Evidence:** `pair_choice` · `guided_prod`
- **Source:** zał. 1 B1 siebie/się; A1 лексические возвратные — **High**

---

### 3.5 Числительные

#### GR-NUM-CARD-01 — Liczebniki 1–4 · Числительные 1–4
- **Intro:** A1 · **Re-deepen:** A2 (*dwaj*), B1
- **Prereq:** GR-GEN-MFN-01
- **Функция:** Счёт малых количеств; согласование.
- **Form / Meaning / Use:** *jeden/jedna; dwa/dwie; trzy; cztery* + Nom/Acc N (часто).
- **Пределы:** Одуш. м. позже (*dwaj*).
- **Пример:** *Dwa domy. Dwie książki.*
- **Контрпример:** *\*Dwa książki*
- **UKR:** *два будинки / дві книжки* близко.  
  **RUS:** *два дома / две книги*; род числительного иначе.  
  **BEL:** Близко к UKR.
- **Evidence:** `closed_morph`
- **Source:** zał. 1 A1 liczebniki; PED-007 — **High**

#### GR-NUM-CARD-05 — Liczebniki 5+ i dopełniacz · 5+ и родительный считаемого
- **Intro:** A1 (рецептивно/формулы) · **Re-deepen:** A2 (продуктивно), B1
- **Prereq:** GR-CAS-GEN-01
- **Функция:** Количество ≥5.
- **Form / Meaning / Use:** *pięć książek; mam pięć złotych*.
- **Пределы:** В Acc прямого объекта часто форма как Nom числительного + Gen N.
- **Пример:** *Kupiłem pięć jabłek.*
- **Контрпример:** *\*pięć jabłka*
- **UKR:** *п’ять яблук* близко.  
  **RUS:** *пять яблок* близко; ломается на польских окончаниях D мн.  
  **BEL:** Близко.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A1–A2; PED-007 — **High**

#### GR-NUM-ORD-01 — Liczebniki porządkowe · Порядковые
- **Intro:** A1 · **Re-deepen:** A2–B1 (даты, сложные)
- **Prereq:** GR-AGR-ADJ-01
- **Функция:** Дата, порядок, этаж.
- **Form / Meaning / Use:** *pierwszy maja; na trzecim piętrze*.
- **Пределы:** Склонение как Adj.
- **Пример:** *Dziś jest pierwszy maja.*
- **Контрпример:** *\*pierwszy maj* (дата)
- **UKR/RUS/BEL:** Иной шаблон даты (*первое мая* vs *pierwszy maja*).
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 porządkowe — **High**

#### GR-NUM-VIR-01 — Formy męskoosobowe liczebników · Мужсколичные формы числительных
- **Intro:** B1 (подготовка A2: *dwaj/czterej*) · **Re-deepen:** B2
- **Prereq:** GR-MO-VIR-01, GR-NUM-CARD-01
- **Функция:** Счёт мужчин.
- **Form / Meaning / Use:** *dwaj studenci / dwóch studentów; czterej / czterech*.
- **Пределы:** Выбор конструкции по синтаксической позиции.
- **Пример:** *Czterej studenci przyszli. Widziałem czterech studentów.*
- **Контрпример:** *\*cztery studenci*
- **UKR/RUS/BEL:** Нет прямого аналога парадигмы → высокий риск.
- **Evidence:** `pair_choice` · `free_prod`
- **Source:** zał. 1 A2–B1; PED-007 — **High**

#### GR-NUM-COL-01 — Liczebniki zbiorowe (ograniczone) · Собирательные (ограниченно)
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-NUM-CARD-05
- **Функция:** *dwoje dzieci, oboje*.
- **Form / Meaning / Use:** С *dzieci*, смешанными парами и т.п.
- **Пределы:** Не раздувать до полной школьной таблицы на A2.
- **Пример:** *Mają dwoje dzieci.*
- **Контрпример:** *\*dwa dzieci* (часто слышится, но не цель нормы здесь)
- **UKR:** *двоє дітей* близко.  
  **RUS:** *двое детей* близко.  
  **BEL:** *двое дзяцей*.
- **Evidence:** `guided_prod`
- **Source:** PED-007; zał. 1 (ограниченно) — **Medium**

#### GR-NUM-MONEY-01 — Liczebniki w czasie i pieniądzach · Числительные во времени и деньгах
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-NUM-CARD-01, GR-NUM-ORD-01
- **Функция:** Быт: цена, час, дата.
- **Form / Meaning / Use:** *za pięć złotych; o ósmej; pół godziny*.
- **Пределы:** Разговорные варианты vs экзаменационная норма.
- **Пример:** *Spotkajmy się o ósmej.*
- **Контрпример:** *\*o osiem*
- **UKR/RUS/BEL:** Кальки *в восемь* / *о восьмій*.
- **Evidence:** `guided_prod`
- **Source:** PED-007; Katalog B — **Medium**

---

### 3.6 Времена и наклонения

#### GR-TNS-PRS-01 — Czas teraźniejszy · Настоящее время
- **Intro:** A1 · **Re-deepen:** A2–B1 (классы спряжения, чередования)
- **Prereq:** —
- **Функция:** Сейчас / привычка / ближайшее будущее (ограниченно).
- **Form / Meaning / Use:** Типы *-am/-em/-ę* и др.; *jestem/mam*.
- **Пределы:** Видовые ограничения настоящего для dok.
- **Пример:** *Nazywam się Anna. Pracuję.*
- **Контрпример:** *\*Ja pracować*
- **UKR/RUS/BEL:** Другие личные окончания; риск инфинитива.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A1 czas teraźniejszy — **High**

#### GR-TNS-PST-01 — Czas przeszły · Прошедшее время
- **Intro:** A1 · **Re-deepen:** A2–B2 (аспектный выбор)
- **Prereq:** GR-AGR-VPAST-01
- **Функция:** Прошедшие события/процессы.
- **Form / Meaning / Use:** L-причастие + личные показатели; род/число.
- **Пределы:** Выбор dok/niedok — отдельный столп.
- **Пример:** *Wczoraj czytałem książkę. Przeczytałem tę książkę.*
- **Контрпример:** смешение без контекста аспекта как «ошибка времени»
- **UKR/RUS/BEL:** Формы близки системно, окончания нет.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 — **High**

#### GR-TNS-FUT-01 — Czas przyszły złożony (niedokonany) · Сложное будущее
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-TNS-PRS-01, GR-ASP-LEX-01
- **Функция:** Будущий процесс / незавершённость.
- **Form / Meaning / Use:** *będę czytać / będę czytał(a)*.
- **Пределы:** *\*będę przeczytać* запрещено.
- **Пример:** *Jutro będę pracować.*
- **Контрпример:** *\*będę zrobić*
- **UKR:** *буду робити* ок; риск *буду зроблю*.  
  **RUS:** *буду делать* / *\*буду сделать*.  
  **BEL:** То же.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** zał. 1 A1 przyszły złożony; PED-004 — **High**

#### GR-TNS-FUT-02 — Czas przyszły prosty (dokonany) · Простое будущее
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** GR-ASP-LEX-01
- **Функция:** Целостное будущее событие.
- **Form / Meaning / Use:** Настоящие формы dok. со значением будущего: *przeczytam, kupię*.
- **Пределы:** Не смешивать с настоящим niedok.
- **Пример:** *Jutro kupię chleb.*
- **Контрпример:** *\*Jutro kupuję chleb* (если цель — однократный план; контекст важен)
- **UKR/RUS/BEL:** Система двух будущих «знакома» → ложный перенос пар.
- **Evidence:** `pair_choice`
- **Source:** zał. 1 A1 przyszły prosty — **High**

#### GR-MOD-IMP-01 — Tryb rozkazujący · Повелительное наклонение
- **Intro:** A2 · **Re-deepen:** B1 (аспект в императиве), B2
- **Prereq:** GR-TNS-PRS-01, GR-ASP-CON-01
- **Функция:** Просьба/приказ/инструкция.
- **Form / Meaning / Use:** *czytaj, napiszcie, niech idą*.
- **Пределы:** Вежливость часто через *proszę* + инф./вопрос, не голый императив.
- **Пример:** *Zróbcie porządek w pokoju!*
- **Контрпример:** *\*Proszę zrób* смешение регистров
- **UKR/RUS/BEL:** Императив знаком; польские основы/аспект ломают.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A2 tryb rozkazujący — **High**

#### GR-MOD-COND-01 — Tryb przypuszczający · Сослагательное
- **Intro:** A2 · **Re-deepen:** B1–B2 (*by*, вежливость)
- **Prereq:** GR-TNS-PST-01
- **Функция:** Гипотеза, вежливая просьба (*chciałbym*).
- **Form / Meaning / Use:** L-форма + *by* + лицо: *chciałbym, zrobilibyście*.
- **Пределы:** Порядок *bym/byś*; условные периоды B1+.
- **Пример:** *Chciałbym kawę.*
- **Контрпример:** *\*Ja by chciał*
- **UKR:** *хотів би* близко.  
  **RUS:** *бы* позиция иная.  
  **BEL:** *б* / *бы*.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A2 tryb przypuszczający — **High**

#### GR-MOD-VERB-01 — Czasowniki modalne (móc, musieć, chcieć, mieć, powinien) · Модальность
- **Intro:** A1 (*chcieć/móc/musieć* лексически) · **Re-deepen:** A2–B2
- **Prereq:** GR-TNS-PRS-01
- **Функция:** Возможность, необходимость, желание, мягкий долг.
- **Form / Meaning / Use:** Modal + infinitiv; *powinien/powinna*; *mam + inf* (обязанность).
- **Пределы:** *mieć* полисемия; эпистемическая модальность B1+.
- **Пример:** *Muszę iść. Mogę pomóc. Powinieneś odpocząć.*
- **Контрпример:** *\*Muszę idę*
- **UKR:** *мусити/могти* близко; *мати* иначе.  
  **RUS:** *должен/может*; *иметь + inf* калька.  
  **BEL:** *мусіць/магчы*.
- **Evidence:** `guided_prod` · `pair_choice`
- **Source:** Katalog A funkcje modalne; zał. 1 — **Medium**

---

### 3.7 Аспект

#### GR-ASP-LEX-01 — Aspekt: znajomość leksykalna par · Аспект: лексическое знакомство с парами
- **Intro:** A1 · **Re-deepen:** —
- **Prereq:** —
- **Функция:** Узнать, что глаголы бывают dok/niedok; хранить пары в словаре.
- **Form / Meaning / Use:** *czytać/przeczytać; kupować/kupić* как лексика, **без** требования свободного выбора.
- **Пределы:** **Не** считать освоением аспекта (`PED-004`).
- **Пример:** В словаре помета: *robić (ndk) / zrobić (dk)*.
- **Контрпример:** Урок «выберите вид» на A1 как exit.
- **UKR/RUS/BEL:** «У нас тоже есть вид» → ложная mastery.
- **Evidence:** `receptive` · словарная карточка
- **Source:** zał. 1 A1: «aspekt … wprowadzany leksykalnie» — **High**

#### GR-ASP-CON-01 — Aspekt: pierwszy świadomy kontrast · Аспект: первый сознательный контраст
- **Intro:** A2 · **Re-deepen:** B1
- **Prereq:** GR-ASP-LEX-01, GR-TNS-PST-01
- **Функция:** Процесс/привычка vs целостное событие в понятном контексте.
- **Form / Meaning / Use:** Минимальные пары в прош.: *pisał list / napisał list*.
- **Пределы:** Не все пары прозрачны; префиксация ≠ автоматический dok.
- **Пример:** *Wczoraj pisałem maila przez godzinę. W końcu napisałem maila.*
- **Контрпример:** *\*Wczoraj napisywałem* (неверная имперфективация)
- **UKR:** Высокая ложная переносимость.  
  **RUS:** То же + типичный *\*będę zrobił*.  
  **BEL:** То же.
- **Evidence:** `pair_choice`
- **Source:** zał. 1 A2 aspekt; PED-004 — **High**

#### GR-ASP-PST-01 — Wybór aspektu w czasie przeszłym · Выбор аспекта в прошедшем
- **Intro:** A2 · **Re-deepen:** B1–B2
- **Prereq:** GR-ASP-CON-01
- **Функция:** Нарратив: фон vs событие.
- **Form / Meaning / Use:** Правила контекста + лексика.
- **Пределы:** Итератив, попытка, контив — постепенно.
- **Пример:** *Gdy wchodziłem, zobaczyłem Annę.*
- **Контрпример:** *\*Gdy wszedłem, widziałem Annę* (если цель: фон/событие наоборот)
- **UKR/RUS/BEL:** Не переносится один в один; см. `case-aspect-sequence.md`.
- **Evidence:** `pair_choice` · `free_prod`
- **Source:** zał. 1 B1 «znaczenie i użycie składniowe aspektu» — **High**

#### GR-ASP-FUT-01 — Wybór aspektu w przyszłości · Выбор аспекта в будущем
- **Intro:** A2 · **Re-deepen:** B1
- **Prereq:** GR-TNS-FUT-01, GR-TNS-FUT-02, GR-ASP-CON-01
- **Функция:** *będę pisać* vs *napiszę*.
- **Form / Meaning / Use:** Запрет *będę* + dok. инф.
- **Пределы:** Планы, обещания, отказы — нюансы B1+.
- **Пример:** *Jutro będę pisać raport. Jutro napiszę raport.*
- **Контрпример:** *\*będę napisać / \*będę napisał raport* как норма сложного будущего dok.
- **UKR:** *буду написати* ошибка.  
  **RUS:** *буду написать* ошибка.  
  **BEL:** *буду напісаць* ошибка.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** zał. 1; PED-004 — **High**

#### GR-ASP-IMP-01 — Aspekt w imperatywie · Аспект в императиве
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-MOD-IMP-01, GR-ASP-CON-01
- **Функция:** *pisz* (процесс/общая инструкция) vs *napisz* (конкретный результат).
- **Form / Meaning / Use:** Зависит от иллокуции.
- **Пределы:** Вежливые обходы.
- **Пример:** *Napisz do mnie jutro. Pisz do mnie częściej.*
- **Контрпример:** взаимная замена без смены смысла
- **UKR/RUS/BEL:** Частичный перенос; польские пары иные.
- **Evidence:** `pair_choice`
- **Source:** JPJO B1 практика; zał. 1 B1 aspekt — **Medium**

#### GR-ASP-NEG-01 — Aspekt a negacja · Аспект и отрицание
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-ASP-PST-01, GR-NEG-01
- **Функция:** Отрицание результата vs процесса (*nie przeczytał* vs *nie czytał*).
- **Form / Meaning / Use:** Контекст «не сумел / не делал».
- **Пределы:** Сильная зависимость от глагола.
- **Пример:** *Nie przeczytałem tej książki* (не довёл до результата).
- **Контрпример:** автоматическое «при отрицании всегда niedok»
- **UKR/RUS/BEL:** Школьные мифы L1 о виде + отрицании переносятся неверно.
- **Evidence:** `pair_choice` · `disc_repair`
- **Source:** Swan/Nagórko — **Medium**; REQUIRES VERIFICATION для жёстких правил урока

#### GR-ASP-PREF-01 — Prefiksy a aspekt · Приставки и аспект
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-ASP-CON-01, GR-WF-PREF-01
- **Функция:** Приставка часто (но не всегда) делает dok и меняет лексику.
- **Form / Meaning / Use:** *robić → zrobić / przerobić / wyrobić* — разные значения.
- **Пределы:** Не учить «приставка = совершенный вид» как абсолют.
- **Пример:** *Zrobiłem zadanie. Przerobiłem stare spodnie.*
- **Контрпример:** *\*przerobić* как синоним *zrobić*
- **UKR/RUS/BEL:** Ложные друзья приставок (*za-/wy-/prze-*).
- **Evidence:** `pair_choice` · словарь
- **Source:** PED-012; zał. 1 B1 tworzenie form aspektu — **High**

#### GR-ASP-CTRL-01 — Produktywna kontrola aspektu B1–B2 · Продуктивный контроль аспекта
- **Intro:** B1 · **Re-deepen:** B2 (стиль, нарратив)
- **Prereq:** GR-ASP-PST-01, GR-ASP-FUT-01, GR-ASP-IMP-01, GR-ASP-NEG-01
- **Функция:** Свободный выбор вида в речи/письме на знакомые темы.
- **Form / Meaning / Use:** Интеграция всех предыдущих узлов.
- **Пределы:** **Не** заявлять полный перенос с UKR/RUS/BEL.
- **Пример:** Связный рассказ с чередованием фона и событий.
- **Контрпример:** Список пар без контекстных заданий.
- **Evidence:** `free_prod` · exam-like `pair_choice`
- **Source:** zał. 1 B1–B2; PED-004 — **High**

---

### 3.8 Глаголы движения

#### GR-MOT-BASE-01 — iść / chodzić, jechać / jeździć · Базовые глаголы движения
- **Intro:** A1 (лексика *iść/jechać*) · **Re-deepen:** A2 (привычка vs однонаправленность)
- **Prereq:** GR-TNS-PRS-01
- **Функция:** Пешком/транспортом; однократное направление vs хабитуалис.
- **Form / Meaning / Use:** *Idę do sklepu. Chodzę do pracy piechotą. Jadę tramwajem.*
- **Пределы:** Не сводить к рус. *идти/ходить* один в один.
- **Пример:** *Teraz idę do domu. Często chodzę piechotą.*
- **Контрпример:** *\*Teraz chodzę do domu* (если одноразово «сейчас иду»)
- **UKR:** *іти/ходити* близко, но пары и приставки иные.  
  **RUS:** Сильнейшая интерференция *идти/ходить*.  
  **BEL:** *ісці/хадзіць*.
- **Evidence:** `pair_choice`
- **Source:** PED-012; JPJO — **Medium**

#### GR-MOT-PREF-01 — Ruch z przedrostkami · Движение с приставками
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-MOT-BASE-01, GR-WF-PREF-01
- **Функция:** *przyjść, wyjść, wejść, dojść, przejść, wrócić…*
- **Form / Meaning / Use:** Пространственная конфигурация + часто dok.
- **Пределы:** Супплетивизм (*iść → pójść*).
- **Пример:** *Wyszedłem z domu i poszedłem do sklepu.*
- **Контрпример:** *\*wychodziłem z domu* как однократное событие без нужды в процессе
- **UKR/RUS/BEL:** Приставки «почти те же» → ложные эквиваленты.
- **Evidence:** `guided_prod` · `pair_choice`
- **Source:** PED-012 — **Medium**

---

### 3.9 Степени сравнения

#### GR-DEG-ADJ-01 — Stopniowanie przymiotników · Степени прилагательных
- **Intro:** A2 · **Re-deepen:** B1 (чередования), B2
- **Prereq:** GR-AGR-ADJ-01
- **Функция:** Сравнение свойств.
- **Form / Meaning / Use:** *ładniejszy; lepszy; bardziej chory*.
- **Пределы:** Супплетивы; выбор простая vs opisowa.
- **Пример:** *Ten film jest lepszy.*
- **Контрпример:** *\*bardziej dobry* (вместо *lepszy*)
- **UKR/RUS/BEL:** Супплетивы другие; *более хороший* калька.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** zał. 1 A2 stopniowanie — **High**

#### GR-DEG-ADV-01 — Stopniowanie przysłówków · Степени наречий
- **Intro:** A2 · **Re-deepen:** B1
- **Prereq:** GR-DEG-ADJ-01
- **Функция:** Сравнение образа действия.
- **Form / Meaning / Use:** *szybciej, lepiej, więcej, bardziej kolorowo*.
- **Пределы:** *dużo/więcej/najwięcej*.
- **Пример:** *Mówi wolniej.*
- **Контрпример:** *\*bardziej szybko* при наличии *szybciej*
- **UKR/RUS/BEL:** Кальки аналитических степеней.
- **Evidence:** `closed_morph`
- **Source:** zał. 1 A2 — **High**

---

### 3.10 Синтаксис сложного предложения

#### GR-SYN-COORD-01 — Zdania współrzędne · Сочинительная связь
- **Intro:** A1 · **Re-deepen:** A2–B1
- **Prereq:** —
- **Функция:** Связка равноправных клауз.
- **Form / Meaning / Use:** *i, a, ale, lub, więc…*
- **Пределы:** *a* ≠ русский «а» всегда.
- **Пример:** *Lubię herbatę, a on lubi kawę.*
- **Контрпример:** *\*Lubię herbatę, i on lubi kawę* (контраст)
- **UKR/RUS/BEL:** Ложные друзья союзов *a/i/ale*.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 zdania złożone współrzędnie — **High**

#### GR-SYN-SUB-01 — Zdania podrzędne (że, bo, kiedy) · Подчинение базовое
- **Intro:** A1 · **Re-deepen:** A2
- **Prereq:** GR-SYN-COORD-01
- **Функция:** Содержание, причина, время.
- **Form / Meaning / Use:** *Myślę, że…; bo…; kiedy…*
- **Пределы:** Запятая перед *że* (см. пунктуацию).
- **Пример:** *Wiem, że jesteś zajęty.*
- **Контрпример:** *\*Wiem że jesteś zajęty* (письменная норма с запятой)
- **UKR/RUS/BEL:** Порядок и запятые иные.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 — **High**

#### GR-SYN-SUB-02 — «żeby» / cel i uzupełnienie · *żeby*
- **Intro:** A2 · **Re-deepen:** B1–B2
- **Prereq:** GR-SYN-SUB-01, GR-MOD-COND-01 (частично)
- **Функция:** Цель / желаемое дополнение.
- **Form / Meaning / Use:** *Chcę, żeby przyszedł. Uczę się, żeby pracować.*
- **Пределы:** Лицо/время в придаточном; не смешивать с *że*.
- **Пример:** *Proszę, żebyś napisał.*
- **Контрпример:** *\*Chcę, że przyszedł*
- **UKR:** *щоб* близко.  
  **RUS:** *чтобы*.  
  **BEL:** *каб*.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A2 żeby — **High**

#### GR-SYN-REL-01 — Zdania względne z «który» · Относительные с *który*
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-AGR-ADJ-01, падежи A2
- **Функция:** Определение через клаузу.
- **Form / Meaning / Use:** *który* согласуется с антецедентом; падеж по роли в придаточном.
- **Пределы:** *co* разговорное; книжные варианты B2.
- **Пример:** *To jest pan, którego widziałem wczoraj.*
- **Контрпример:** *\*pan, który widziałem*
- **UKR:** *який* склонение иное.  
  **RUS:** *который*.  
  **BEL:** *які*.
- **Evidence:** `closed_morph` · `guided_prod`
- **Source:** JPJO B1; zał. 1 B1 składnia — **Medium**

#### GR-SYN-COND-01 — Okresy warunkowe · Условные периоды
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-MOD-COND-01
- **Функция:** Реальное/гипотетическое условие.
- **Form / Meaning / Use:** *Jeśli będę miał czas, przyjdę. Gdybym miał czas, przyszedłbym.*
- **Пределы:** Смешение типов.
- **Пример:** *Gdybyś zadzwonił, wiedziałbym.*
- **Контрпример:** *\*Jeśli byś zadzwonił, ja wiem*
- **UKR/RUS/BEL:** Другие союзы и времена.
- **Evidence:** `guided_prod` · `free_prod`
- **Source:** Katalog A; JPJO — **Medium**

---

### 3.11 Отрицание

#### GR-NEG-01 — Negacja «nie» · Отрицание *nie*
- **Intro:** A1 · **Re-deepen:** A2–B1 (слитное/раздельное, Gen)
- **Prereq:** —
- **Функция:** Отрицание предиката/элемента.
- **Form / Meaning / Use:** *nie* + V; орфография *nie* с Adj/Adv по правилам.
- **Пределы:** Двойное отрицание с *nikt/nic*.
- **Пример:** *Nie rozumiem.*
- **Контрпример:** *\*Ja розумію не*
- **UKR/RUS/BEL:** Позиция *не* иная в части конструкций.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 zdania zaprzeczone — **High**

#### GR-NEG-GEN-01 — Negacja a dopełniacz · Связка отрицания с D
- **Intro:** A1 · **Re-deepen:** B1
- **Prereq:** GR-CAS-GEN-03, GR-NEG-01
- **Функция:** Контроль объекта при *nie*.
- **Form / Meaning / Use:** См. GR-CAS-GEN-03.
- **Пределы:** Исключения/вариативность — не скрывать.
- **Пример:** *Nie mam czasu.*
- **Контрпример:** *\*Nie mam czas*
- **UKR/RUS/BEL:** См. GR-CAS-GEN-03 (разные профили).
- **Evidence:** `pair_choice`
- **Source:** zał. 1 — **High**

---

### 3.12 Порядок слов и информационная структура

#### GR-WO-NEUT-01 — Neutralny szyk SVO · Нейтральный порядок
- **Intro:** A1 · **Re-deepen:** A2
- **Prereq:** —
- **Функция:** Базовая декларативка.
- **Form / Meaning / Use:** *Anna czyta książkę.*
- **Пределы:** Польский не «фиксированный SVO», но не «любой порядок ок» (`PED-011`).
- **Пример:** *Piotr pije kawę.*
- **Контрпример:** Утверждение «порядок свободен = всё правильно».
- **UKR/RUS/BEL:** Перенос свободного порядка даёт непольский акцент.
- **Evidence:** `guided_prod`
- **Source:** PED-011 — **Medium**

#### GR-WO-CLIT-01 — Pozycja «się» i enklityk · Позиция *się* и энклитик
- **Intro:** A2 · **Re-deepen:** B1–B2
- **Prereq:** GR-PRO-REFL-01
- **Функция:** Нормативная позиция клитик.
- **Form / Meaning / Use:** *On się boi. Boję się.*
- **Пределы:** Стилистические варианты.
- **Пример:** *Jak się masz?*
- **Контрпример:** *\*Jak masz się?* (часто воспринимается как ненорма)
- **UKR:** *як ся маєш* иначе.  
  **RUS:** нет отдельного *się*.  
  **BEL:** клитика *ся*.
- **Evidence:** `pair_choice`
- **Source:** PED-011; Swan — **Medium**

#### GR-WO-IS-01 — Tema–rema / fokus · Тема–рема / фокус
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-WO-NEUT-01
- **Функция:** Выделение данного/нового.
- **Form / Meaning / Use:** Перестановки и интонация меняют акцент.
- **Пределы:** Не учить произвольность.
- **Пример:** *Kawę pije Piotr* (фокус на субъекте).
- **Контрпример:** Перестановка без учебной задачи «что новое».
- **UKR/RUS/BEL:** Иная привычная информационная структура.
- **Evidence:** `guided_prod` · `receptive`
- **Source:** PED-011 — **Medium**

---

### 3.13 Словообразование и приставки

#### GR-WF-PREF-01 — Przedrostki czasownikowe (system) · Глагольные приставки как система
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** GR-ASP-LEX-01
- **Функция:** Значение + часто аспект (*w-, wy-, przy-, za-, po-, u-, roz-, prze-*).
- **Form / Meaning / Use:** Учить как сеть, не алфавит глаголов (`PED-012`).
- **Пределы:** Полисемия приставок.
- **Пример:** *napisać, wypisać, przepisać* — разные операции письма.
- **Контрпример:** Список 200 глаголов без сети значений.
- **UKR/RUS/BEL:** Ложные друзья приставок.
- **Evidence:** `pair_choice` · словарь
- **Source:** PED-012; zał. 1 B1 — **High**

#### GR-WF-NOM-01 — Słowotwórstwo rzeczowników / przymiotników (B1–B2) · Именное словообразование
- **Intro:** B1 · **Re-deepen:** B2
- **Prereq:** —
- **Функция:** Суффиксы деятеля, признака, абстракции (*-arz, -ka, -ość…*) в объёме уровня.
- **Form / Meaning / Use:** Продуктивные модели рецептивно→продуктивно.
- **Пределы:** Не обещать полный словообразовательный минимум без отдельной матрицы.
- **Пример:** *nauczyciel – nauczycielka; wolność*.
- **Контрпример:** Калька суффиксов L1 (*\*-ник*).
- **UKR/RUS/BEL:** Схожие суффиксы с другим значением.
- **Evidence:** `receptive` · `guided_prod`
- **Source:** zał. 1 B2 słowotwórstwo (расширение) — **Medium**

---

### 3.14 Причастия, страдательный залог, безличность (уровень-уместно)

#### GR-PART-ACT-01 — Imiesłów przymiotnikowy czynny · Действительное причастие
- **Intro:** B2 · **Re-deepen:** —
- **Prereq:** GR-TNS-PRS-01, GR-AGR-ADJ-01
- **Функция:** *słuchający, czytające*.
- **Form / Meaning / Use:** Образование и согласование; стиль.
- **Пределы:** На B2 — в объёме списка; не C1-стилистика.
- **Пример:** *Widziałem czytającą dziewczynę.*
- **Контрпример:** Калька русских причастных оборотов дословно.
- **UKR/RUS/BEL:** Причастия L1 провоцируют тяжёлые обороты.
- **Evidence:** `closed_morph` · `receptive`
- **Source:** zał. 1 B2 imiesłowy przymiotnikowe czynne — **High**

#### GR-PART-PASS-01 — Imiesłów przymiotnikowy bierny · Страдательное причастие
- **Intro:** B2 · **Re-deepen:** —
- **Prereq:** GR-ASP-CON-01
- **Функция:** *zmęczony, zabici, wypoczęte*; база пассива.
- **Form / Meaning / Use:** Часто от dok.; согласование.
- **Пределы:** Лексикализация (*zmęczony*).
- **Пример:** *Jestem zmęczony.*
- **Контрпример:** *\*Jestem zmęczyć*
- **UKR/RUS/BEL:** Формы близки, суффиксы нет.
- **Evidence:** `closed_morph`
- **Source:** zał. 1 B2 imiesłowy bierne — **High**

#### GR-PART-ADV-01 — Imiesłowy przysłówkowe · Деепричастия
- **Intro:** B2 · **Re-deepen:** —
- **Prereq:** GR-ASP-CON-01
- **Функция:** *słuchając* (współczesny); распознавание *wysłuchawszy* (uprzedni).
- **Form / Meaning / Use:** Ограниченный продуктивный контроль; uprzedni чаще receptive.
- **Пределы:** zał. 1: «w ograniczonym zakresie».
- **Пример:** *Słuchając radia, gotowała obiad.*
- **Контрпример:** Перевод русских деепричастных оборотов один в один всегда.
- **UKR/RUS/BEL:** Высокий перенос тяжёлых оборотов.
- **Evidence:** `receptive` · ограниченный `guided_prod`
- **Source:** zał. 1 B2 imiesłowy przysłówkowe — **High**

#### GR-PASS-01 — Strona bierna (ograniczona) · Страдательный залог
- **Intro:** B2 · **Re-deepen:** —
- **Prereq:** GR-PART-PASS-01, GR-TNS-PRS-01
- **Функция:** *Dziecko jest myte. Pokój zostanie uporządkowany.*
- **Form / Meaning / Use:** *być* + imiesłów bierny; агенс *przez + B*.
- **Пределы:** Ограниченный объём B2; часто предпочтительнее актив/`się`.
- **Пример:** *Dokumenty są podpisane.*
- **Контрпример:** Злоупотребление пассивом в бытовом диалоге.
- **UKR/RUS/BEL:** Пассив L1 иной частотностью.
- **Evidence:** `guided_prod` · `receptive`
- **Source:** zał. 1 B2 strona bierna — **High**

#### GR-IMPERS-SIE-01 — Formy bezosobowe z «się» · Безличность на *się*
- **Intro:** B2 · **Re-deepen:** —
- **Prereq:** GR-PRO-REFL-01
- **Функция:** *mówi się, robiło się, będzie się mówiło*.
- **Form / Meaning / Use:** Обобщённый субъект / процесс.
- **Пределы:** Не путать с возвратным *się*.
- **Пример:** *W Polsce mówi się po polsku.*
- **Контрпример:** *\*W Polsce mówią się po polsku*
- **UKR:** *кажеться* частично.  
  **RUS:** *говорят* / *\-ся*.  
  **BEL:** *гаворыцца*.
- **Evidence:** `pair_choice` · `guided_prod`
- **Source:** zał. 1 B2 formy bezosobowe z się — **High**

#### GR-IMPERS-NO-01 — Formy na -no / -to · Безличные *-no/-to*
- **Intro:** B2 · **Re-deepen:** —
- **Prereq:** GR-TNS-PST-01
- **Функция:** *zrobiono, otwarto, czytano* — результат без агенса.
- **Form / Meaning / Use:** Ограниченный объём; часто офиц./медийный регистр.
- **Пределы:** Не как главный бытовой способ.
- **Пример:** *Otwarto nowe muzeum.*
- **Контрпример:** Подстановка вместо любого пассива всегда.
- **UKR:** *-но/-то* близко (*зроблено*).  
  **RUS:** Нет прямой живой параллели той же продуктивности.  
  **BEL:** *-на/-та* формы.
- **Evidence:** `receptive` · `guided_prod`
- **Source:** zał. 1 B2 formy -no/-to — **High**

---

### 3.15 Пунктуация, связанная с синтаксисом

#### GR-PUNCT-CLAUSE-01 — Przecinek w zdaniu złożonym · Запятая в сложном предложении
- **Intro:** A2 · **Re-deepen:** B1–B2
- **Prereq:** GR-SYN-SUB-01
- **Функция:** Граница клауз (*że, bo, kiedy, który…*).
- **Form / Meaning / Use:** Нормы польской пунктуации придаточных.
- **Пределы:** Неполный курс орфографии; только синтаксические узлы.
- **Пример:** *Myślę, że to prawda.*
- **Контрпример:** *\*Myślę że to prawda*
- **UKR/RUS/BEL:** Иные правила запятых → устойчивые ошибки письма.
- **Evidence:** `guided_prod` (письмо)
- **Source:** zał. 1 A2 interpunkcja (podstawy); нормы языка — **Medium**

#### GR-PUNCT-VOC-01 — Interpunkcja wołacza i wtrąceń · Пунктуация обращения
- **Intro:** A2 · **Re-deepen:** B1
- **Prereq:** GR-CAS-VOC-01
- **Функция:** Выделение Voc/обращений запятыми.
- **Form / Meaning / Use:** *Anno, chodź tutaj!*
- **Пределы:** E-mail формулы.
- **Пример:** *Panie Profesorze, dziękuję za list.*
- **Контрпример:** отсутствие запятых в обращении
- **UKR/RUS/BEL:** Частично знакомо; ломается в польских формулах *Pan/Pani*.
- **Evidence:** `guided_prod`
- **Source:** нормы пунктуации + PED-010 — **Medium**

---

### 3.16 Прагматика грамматических форм (обязательные смежные концепты)

#### GR-PRAG-PAN-01 — Pan / pani + 3. osoba · Вежливое обращение
- **Intro:** A1 · **Re-deepen:** A2–B2
- **Prereq:** GR-TNS-PRS-01
- **Функция:** T–V; официальный регистр.
- **Form / Meaning / Use:** *Czy pan mieszka w Warszawie?* (не 2 л.).
- **Пределы:** Переход на *ty*; Voc.
- **Пример:** *Proszę pani, gdzie jest przystanek?*
- **Контрпример:** *\*Czy ty mieszkasz…?* незнакомцу в urzęd
- **UKR:** *ви* ≠ *pan/pani* морфологически.  
  **RUS:** *вы* ≠ *pan*.  
  **BEL:** *вы* ≠ *pan*.
- **Evidence:** `disc_repair` · `guided_prod`
- **Source:** PED-010; zał. 1 A1 odmiana oficjalna/nieoficjalna — **High**

#### GR-Q-YESNO-01 — Pytania rozstrzygające (czy) · Общие вопросы
- **Intro:** A1 · **Re-deepen:** A2
- **Prereq:** GR-WO-NEUT-01
- **Функция:** Да/нет вопрос.
- **Form / Meaning / Use:** *Czy Anna uczyła się w Warszawie?*
- **Пределы:** Интонационные вопросы без *czy*.
- **Пример:** *Czy lubisz kawę?*
- **Контрпример:** калька порядка L1 без *czy* в учебной норме A1 письма
- **UKR/RUS/BEL:** Частица ли / чи иные.
- **Evidence:** `guided_prod`
- **Source:** zał. 1 A1 pytania rozstrzygające — **High**

#### GR-EXIST-01 — Konstrukcje z «jest / są / nie ma» · Бытийные конструкции
- **Intro:** A1 · **Re-deepen:** A2
- **Prereq:** GR-CAS-GEN-04, GR-CAS-NOM-01
- **Функция:** Наличие/отсутствие.
- **Form / Meaning / Use:** *Jest kawa. Są książki. Nie ma cukru.*
- **Пределы:** Согласование *jest/są*.
- **Пример:** *W lodówce jest mleko.*
- **Контрпример:** *\*W lodówce nie ma mleko*
- **UKR:** *є / немає*.  
  **RUS:** *есть / нет*.  
  **BEL:** *ёсць / няма*.
- **Evidence:** `pair_choice`
- **Source:** zał. 1 A1 — **High**

---

## 4. Покрытие обязательных зон (чеклист)

| Зона требования | ID (представители) |
|---|---|
| Падежи и функции | GR-CAS-* , GR-CAS-FUNC-MAP-01 |
| Rekcja | GR-REK-* , GR-CAS-GEN-05 |
| Род/число/согласование | GR-GEN-*, GR-NUM-SGPL-01, GR-AGR-* |
| Męskoosobowy | GR-MO-VIR-01, GR-NUM-VIR-01 |
| Местоимения | GR-PRO-* |
| Числительные | GR-NUM-* |
| Времена и наклонения | GR-TNS-*, GR-MOD-* |
| Аспект | GR-ASP-* |
| Модальность | GR-MOD-VERB-01, GR-MOD-COND-01 |
| Глаголы движения | GR-MOT-* |
| Reflexive / się | GR-PRO-REFL-01, GR-WO-CLIT-01 |
| Степени сравнения | GR-DEG-* |
| Сложный синтаксис | GR-SYN-* |
| Отрицание | GR-NEG-* |
| Порядок слов / IS | GR-WO-* |
| Словообразование / приставки | GR-WF-* |
| Причастия / пассив / безличность | GR-PART-*, GR-PASS-01, GR-IMPERS-* |
| Пунктуация ↔ синтаксис | GR-PUNCT-* |

---

## 5. Замечания о статусе

- Документ **не** утверждает полноту продукта A1–B2 до formal sign-off Phase 2.
- Расширение до атомарных micro-skills (отдельный ID на каждый трудный тип склонения из listy) допускается в Phase 3 как детализация **без** ломки стабильных ID этого файла.
- Любая жёсткая «частотность падежа в корпусе» без цитаты корпуса = REQUIRES VERIFICATION.
