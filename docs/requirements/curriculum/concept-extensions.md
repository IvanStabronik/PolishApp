# Неграмматические канонические концепты (PHON / ORTH / PRAG)

**Статус:** Phase 2 integrity fix — Candidate for independent JPJO review.
**Правило:** эти ID **не** входят в namespace `GR-*`.
**Дата сверки:** 2026-09-05.

## Сводка

| Namespace | Число |
|---|---:|
| PHON | 4 |
| ORTH | 5 |
| PRAG | 4 |
| **Всего** | **13** |

**Exit status (продукт):** Required — обязателен для выхода с уровня Intro; Supporting — усиливает FN, но не блокирует exit один; Extension — вне обязательного минимума уровня.

---

## PHON

#### PHON-CORE-01 — Podstawy wymowy polskiej · Базовая польская фонетика
- **Intro:** A1
- **Re-deepen:** A2 (стечения, оглушение на стыках), B1 (темп естественной речи, исключения ударения в длинных словах)
- **Prereq:** —
- **Exit status:** Required
- **Функция:** Сделать устную речь и слушание на A1 понятными: парокситонное ударение, базовые гласные/согласные, запрет «читать по-кириллически».
- **Form / Meaning / Use:** Form — предпоследний слог как дефолт ударения (парокситон); польские графемы как звуки (*ł*≠*l*, *w*≈[v], *c*≈[ts] ≈ кирилл. *ц* по артикуляции — сходство не отрицаем). Meaning — фонетика несёт лексическую идентичность (*kot* ≠ *kod*). Use — приветствия, имена, частотные лексемы сценариев FN A1.
- **Пределы:** Не полный курс IPA. Традиционные исключения ударения (антепенультима) — закрытый список греко-латинских *-ika/-yka* и отдельных лексем: *matematyka* (ma-te-**ma**-ty-ka), *fizyka*, *republika*, *muzyka*, *rzeczpospolita* — не «все слова». *uniwersytet* **не** исключение: следует парокситону (uni-wer-**sy**-tet). Носовые и ряды ć/ś/ź — отдельные ID.
- **Пример (регулярное ударение):** *To jest uniwersytet.* → uniwer**sy**tet (предпоследний слог).
- **Пример (исключение *-yka*):** *Uczę się matematyki.* → mate**ma**tyka (ударение на *-ma-*, не на *-ty-*).
- **Контрпример:** *\*To jest uniwersyTET* с конечным ударением как в L1-модели «как слышу из UKR/RUS»; *\*matematyka* с ударением на *-ty-* (навязанный парокситон вопреки orthoepic норме ряда *-yka*).
- **UKR:** Свободное ударение → перенос подвижного акцента; *ł* часто = [w]/[ў]-подобное чтение или гиперкорректный [l]; *c/ci/cz* — путаница распределения и письма при близком [ts], не «неумение произнести ц».
- **RUS:** Оглушение звонких в конце сильнее ожидаемого; *w* читают как [u]/[w]; стечения упрощают вставкой гласной (*\*szczęście* → *\*szęście*); кластеры *c* vs *cz* и мягкость *ci* ломают орфоэпию при кажущейся «знакомости» [ts].
- **BEL:** Аканне маскирует безударные *o/a* в слухе → письмо и произношение расходятся; *ў*↔*ł* даёт *\*byu* / *\*był* как «одно и то же»; дзеканье/цеканье создаёт ложную уверенность по мягкости и по выбору *c/ci/cz*.
- **Evidence:** `pronunciation_task` + `closed_item` (перцепция ударения)
- **Source:** PED-009; PRODUCT ANALYSIS; описательная фонетика (парокситон) — **High** (правило ударения); список исключений — **Medium**, REQUIRES VERIFICATION полноты для продукта. Дата сверки: 2026-09-05.

#### PHON-CI-SI-ZI-01 — Szereg ć/ci, ś/si, ź/zi, dź/dzi
- **Intro:** A1
- **Re-deepen:** A2 (орфографический выбор *ć* vs *ci* перед гласной), B1 (скорость в связной речи)
- **Prereq:** PHON-CORE-01
- **Exit status:** Required
- **Функция:** Различать и производить мягкий ряд польских шипяще-свистящих, критичный для смысла (*cienki* ≠ *cenki*-ошибка; *dzień* ≠ *den*).
- **Form / Meaning / Use:** Form — палатальные аффрикаты/фрикативы; перед гласной часто *ci/si/zi/dzi*, в конце/перед согласной — *ć/ś/ź/dź*. Meaning — мягкость фонологична. Use — дни недели, еда, школа (*dzień*, *ciasto*, *zima*, *dziecko*).
- **Пределы:** Не смешивать с рядом *sz/ż/cz* (отдельный ID); не требовать идеальной IPA-точности на A1 — достаточно контраста «мягкий vs твёрдый» в минимальных парах.
- **Пример:** *Dziś jest ciepło.* / *To jest ciasto.*
- **Контрпример:** *\*Dys jest cepło* (потеря мягкости + кириллический перенос).
- **UKR:** Близкие *ть/сь/зь*, но иное распределение и письмо; риск читать *ci* как «цы» или писать без диакритики *\*dzien*.
- **RUS:** Нет школьной пары *ć/ci*; *ь* не спасает — типично *\*slonce*, *\*dzień*→*\*dzen*; путают с *ч/ш*.
- **BEL:** Дзеканье/цеканье даёт **ложную уверенность** («у нас тоже ć») → пропуск нужной мягкости (*\*tepły*) или гиперкоррекция (*\*ciato* без проверки нормы).
- **Evidence:** `pronunciation_task` + `closed_item` (минимальные пары)
- **Source:** PED-009; PED-008 (связь с орфографией мягкости); PED-014 (BEL false confidence) — **High**. Дата сверки: 2026-09-05.

#### PHON-SZ-CZ-01 — Szereg sz/ż/cz/dż vs s/z/c
- **Intro:** A1
- **Re-deepen:** A2 (контраст с *rz/ż* на письме), B1 (быстрая речь, оглушение *ż*→[ʃ] в конце)
- **Prereq:** PHON-CORE-01
- **Exit status:** Required
- **Функция:** Удержать польский «твёрдый» шипящий ряд отдельно от свистящего и от мягкого ряда — иначе ломается понимание (*cas*≠*czas*; *zupa*≠*żupa*).
- **Form / Meaning / Use:** Form — *sz/ż/cz/dż* vs *s/z/c*; *c* = [ts], не «с». Meaning — лексические минимальные пары. Use — быт и услуги (*czas*, *czekać*, *szkoła*, *kawa czy herbata*).
- **Пределы:** Орфография *rz* vs *ż* — `ORTH-RZ-Z-01` (здесь только слух/артикуляция); не учить все исключения этимологии на A1.
- **Пример:** *Czekam na autobus.* / *Szkoła jest blisko.*
- **Контрпример:** *\*Cekam na autobus* / *\*Skoła jest blisko* (свистящий вместо шипящего).
- **UKR:** *ч/ш/ж* близки, но *c*=[ts] и *cz* путают; *szczęście*-кластер упрощают.
- **RUS:** *ц/ч/ш* иной набор; типично *\*czas*→*\*cas*, *\*szczęście* с выпадением согласных; *ż* в конце оглушают без осознания пары.
- **BEL:** Сильнее UKR путаница *ч/ц* при дзеканье; слух «почти как у нас» → меньше внимания к *sz/cz* в продуктивной речи.
- **Evidence:** `pronunciation_task` + `closed_item`
- **Source:** PED-009; PRODUCT ANALYSIS — **High**. Дата сверки: 2026-09-05.

#### PHON-NASAL-01 — Samogłoski nosowe ą/ę (recepcja + produkcja ograniczona)
- **Intro:** A2
- **Re-deepen:** B1 (морфологические подсказки: 1 л. *-ę*; чередования *dąb/dęby*), B2 (естественные аллофоны перед смычными)
- **Prereq:** PHON-CORE-01, ORTH-CORE-01
- **Exit status:** Supporting
- **Функция:** Распознать и ограниченно произвести носовые, чтобы не ломать морфологию (*robię*, *są*) и орфографию экзамена.
- **Form / Meaning / Use:** Form — *ą/ę* как носовые (с позиционными [ɔŋ]/[ɛɲ]/denasalized вариантами). Meaning — граммемы лица/числа и корни (*zęby*, *miesiąc*). Use — A2 письмо и медленная речь; полная назальность не обязательна для exit A2.
- **Пределы:** Не требовать «идеальной» назальности во всех позициях; деназализация перед некоторыми согласными — норма, не ошибка; орфография *ą/ę* vs *om/em* — пересечение с PED-008, не дублировать весь банк здесь.
- **Пример:** *Robię kolację. Są w domu.*
- **Контрпример:** *\*Robie kolacje* / *\*Sa w domu* (полная потеря носового + диакритики).
- **UKR:** Носовых нет → слух *om/em* или чистая гласная (*\*robe*, *\*zombe* вм. *ząb*).
- **RUS:** То же отсутствие носовых; чаще пишут *\*robie* / *\*sa*; путают с рус. *он/ен* в заимствованиях.
- **BEL:** Как RUS/UKR по отсутствию носовых, плюс аканне искажает опору на безударный тембр при диктанте (*\*robia* / нестабильный выбор *ą/ę*).
- **Evidence:** `pronunciation_task` + `closed_item` (диктант 1 л.)
- **Source:** PED-008, PED-009; PRODUCT ANALYSIS — **High** (отсутствие носовых в L1); аллофоны — **Medium**, REQUIRES VERIFICATION для порога продуктивности A2. Дата сверки: 2026-09-05.

---

## ORTH

#### ORTH-CORE-01 — Diakrytyki i podstawowa ortografia · Диакритика и база
- **Intro:** A1
- **Re-deepen:** A2 (кластеры пар PED-008), B1 (формальные бланки, e-mail без потери диакритики)
- **Prereq:** —
- **Exit status:** Required
- **Функция:** Считать польские диакритики частью леммы (не «украшением»): смысл и экзаменационная грамотность (*kąt*≠*kat*; *łódka*≠*lodka*).
- **Form / Meaning / Use:** Form — набор *ą ę ć ń ó ś ź ż ł*; раскладка PL. Meaning — диакритика меняет лексему/граммему. Use — ФИО, адреса, анкеты, чат с urzędem.
- **Пределы:** Специальные пары *ó/u*, *rz/ż*, *ch/h*, *i/y* — отдельные ID; не полный свод ortografii polskiej.
- **Пример:** *Mieszkam w Łodzi. Mam na imię Paweł.*
- **Контрпример:** *\*Mieszkam w Lodzi. Mam na imie Pawel.*
- **UKR:** Клавиатура/привычка опускать диакритику; *ь*≠польские знаки — *\*slonce*, *\*kons*.
- **RUS:** Системный пропуск мягкости и *ł* (*\*dzien*, *\*byl*); путают «похоже на ы/и» с выбором графемы.
- **BEL:** **Аканне** → *\*kalacja*, *\*malako*; **ў**→*ł* транслит *\*byu*; диакритика + гласные безударные — двойной удар по письму.
- **Evidence:** `closed_item` + `guided_prod` (ввод с PL-раскладкой)
- **Source:** PED-008; PRODUCT ANALYSIS; PED-014 (BEL early orth focus) — **High**. Дата сверки: 2026-09-05.

#### ORTH-OU-01 — ó / u
- **Intro:** A1
- **Re-deepen:** A2 (чередования *Bóg/Bogiem*, *mróz/mrozu*), B1 (частотный банк без опоры только на «звук»)
- **Prereq:** ORTH-CORE-01
- **Exit status:** Required
- **Функция:** Выбрать графему при одном звуке [u]: письмо и бланки без *\*mur* вм. *mur* ок, но *\*stul* вм. *stół*.
- **Form / Meaning / Use:** Form — *ó* и *u* = [u]; подсказки: чередование *ó→o* в формах (*stół/stołu*), закрытый список частотных лексем. Meaning — орфографическая идентичность слова. Use — школа, работа, документы.
- **Пределы:** Не сводить к одной «магической» формуле; этимология не обязательна на A1; омофоны редки — не путать с *rz/ż*.
- **Пример:** *Kupiłem żółty stół.* / *To jest mój dom.*
- **Контрпример:** *\*Kupiłem żułty stuł.* / *\*To jest muj dom.*
- **UKR:** Один слух [u] → случайный выбор; опора на укр. *і/о* чередования не 1:1 с PL *ó/o*.
- **RUS:** То же омофония; чаще пишут всё через *u*; чередование *стол/стола* не переносится на *stół/stołu* автоматически.
- **BEL:** Слух + **аканне** маскирует безударные опоры; выше риск *\*kalacja*-типа ошибок рядом, и нестабильный *ó/u* в безударных слогах письма.
- **Evidence:** `closed_item` (выбор ó/u) + периодический dictation cluster
- **Source:** PED-008; PRODUCT ANALYSIS — **High**. Дата сверки: 2026-09-05.

#### ORTH-RZ-Z-01 — rz / ż
- **Intro:** A1
- **Re-deepen:** A2 (омофоны *może/morze*; чередования *garaż/garażu* vs *morze/morza*), B1 (расширенный банк)
- **Prereq:** ORTH-CORE-01, PHON-SZ-CZ-01
- **Exit status:** Required
- **Функция:** Развести на письме омофоны и частотные корни при общем звуке [ʐ]/[ʒ] (и оглушении [ʃ]).
- **Form / Meaning / Use:** Form — *rz* vs *ż*; эвристики (после *p/b/t/d/k/g/ch/j/w* часто *rz*; чередование *r↔rz*). Meaning — *może* («может») ≠ *morze* («море»). Use — письма, SMS, школа.
- **Пределы:** Не обещать безошибочность по одному правилу; заимствования и исключения — список; произношение почти одинаковое — ставка на письмо.
- **Пример:** *Może pójdziemy nad morze?*
- **Контрпример:** *\*Morze pójdziemy nad może?*
- **UKR:** Слух один → калька с укр. *ж/рж* без польских правил; *може* смыслово тянет к неверной графеме.
- **RUS:** *ж* один символ; *rz* воспринимают как «р+з»; типично *\*może*/*\*morze* путают местами.
- **BEL:** Как RUS по слуху; плюс орфографическая неуверенность из аканне усиливает «угадывание» буквы в безударных формах.
- **Evidence:** `closed_item` (омофоны + выбор rz/ż)
- **Source:** PED-008; описательная орфография — **High**; полнота эвристик для V1 — **Medium**, REQUIRES VERIFICATION. Дата сверки: 2026-09-05.

#### ORTH-CH-H-01 — ch / h
- **Intro:** A1
- **Re-deepen:** A2 (заимствования *hotel*, *historia*, *chemia*), B1 (топонимы, бланки)
- **Prereq:** ORTH-CORE-01
- **Exit status:** Required
- **Функция:** Выбрать *ch* vs *h* при одном (почти) звуке [x]/[ɦ]-зоне — критично для письма и экзаменов.
- **Form / Meaning / Use:** Form — две графемы; частотный список + осторожные этимо-подсказки. Meaning — *chleb* ≠ *\*hleb*; *herbata* ≠ *\*cherbata*. Use — еда, медицина, услуги, документы.
- **Пределы:** Произносительное различие минимально/нулево для многих говорящих — не строить урок на «слышу h»; не смешивать с *g* без отдельного стимула.
- **Пример:** *Herbata i chleb są na stole. Chemia jest trudna.*
- **Контрпример:** *\*Cherbata i hleb są na stole. Hemia jest trudna.*
- **UKR:** Укр. *г* [ɦ] ↔ PL *h/g/ch* не 1:1; ошибки стабильны, но обычно слабее, чем у BEL (*\*chigiena*, путаница *hotel*).
- **RUS:** Рус. *х* один звук на обе графемы → *\*cherbata*, *\*hemia* / *\*chemia*↔*h*; высокая вероятность на письме.
- **BEL:** **Раньше и жёстче**, чем UKR/RUS (PED-014): бел. *г* [ɣ]/h-подобн. и орфография *г/х* ≠ PL; топонимы (*Grodno/Hrodna*-зона) усиливают перенос.
- **Evidence:** `closed_item` (орфо-набор заимствований и бытовой лексики)
- **Source:** PED-008, PED-014; PRODUCT ANALYSIS — **High**. Дата сверки: 2026-09-05.

#### ORTH-IY-01 — i / y
- **Intro:** A1
- **Re-deepen:** A2 (после согласных в парадигмах), B1 (омография *sin/syn*-зона в свободном письме)
- **Prereq:** ORTH-CORE-01
- **Exit status:** Required
- **Функция:** Развести графемы *i* и *y* там, где L1-слух и кириллические *і/и/ы* подсказывают неверно.
- **Form / Meaning / Use:** Form — *i* (часто «мягкий» контекст) vs *y* (после твёрдых); позиционные правила. Meaning — *syn* ≠ *\*sin*; *myli* ≠ *\*mili*. Use — имена, родство, школа, диктанты.
- **Пределы:** Не сводить к «i всегда мягкий»; заимствования и исключения — банк; фонетический контраст тоньше орфографического для части пар.
- **Пример:** *Mój syn lubi myszy. Oni myli samochód.*
- **Контрпример:** *\*Mój sin lubi miszy. Oni mili samochód.*
- **UKR:** Проекция *і/и* на *i/y* не 1:1; типичны *\*mili*, *\*sin* при верном «мягкий/твёрдый» ощущении.
- **RUS:** *ы*≠PL *y* по тембру; гиперкоррекция *\*misz* / *\*sin*; путают с *и* в безударных.
- **BEL:** Ближе к UKR по *і/и*, но письмо нестабильнее из-за аканне и смешанных норм; отдельные пары требуют BEL-глосс, не RUS-таблицы.
- **Evidence:** `closed_item` (минимальные пары в диктанте/выборе)
- **Source:** PED-008; l1-error-model ERR-UKR-01 / ERR-RUS-02 — **High** (механизм); частотность пар — **Medium**, REQUIRES VERIFICATION. Дата сверки: 2026-09-05.

---

## PRAG

#### PRAG-PAN-01 — Rejestr pan/pani ↔ ty · Регистр T–V
- **Intro:** A1
- **Re-deepen:** A2 (сдвиг ty на работе/у соседей; e-mail), B1–B2 (тонкие сдвиги, отказ от преждевременного ty, zdrobnienia)
- **Prereq:** —
- **Exit status:** Required
- **Функция:** Выбрать и удержать вежливый адрес *pan/pani* + 3 л. vs *ty* + 2 л. в urzędzie, медицине, банке, школе.
- **Form / Meaning / Use:** Form — *Czy może mi Pan/Pani pomóc?*; *Pani Anno…* / *Panie doktorze…*; согласование рода в прош. Meaning — социальная дистанция. Use — все FN первой аудитории с институциями.
- **Пределы:** Не покрывает весь этикет жалоб (`PRAG-SOFTEN-01`); wołacz имён — связь с `GR-CAS-VOC-01`, но регистр шире падежа; культура сдвига ty локальна — учить сценариями, не одной догмой.
- **Пример:** *Czy może mi Pani powiedzieć, gdzie jest poczta?*
- **Контрпример:** *\*Czy wy możecie powiedzieć, gdzie jest poczta?* к незнакомке в окне urzędu.
- **UKR:** Калька *ви* без польской 3-л. модели; иногда преждевременное *ty* среди «своих славян».
- **RUS:** *вы* + 2 л. мн. (*\*Wy jesteście kierownikiem?*); вокатив слабее — именительный в обращении.
- **BEL:** Как RUS/UKR по *вы*, плюс региональные привычки обращения; риск смешения польск. *pan* с калькой белорусского/русского формального «вы».
- **Evidence:** `roleplay_tv` + `closed_item` (выбор регистра)
- **Source:** PED-010; PRODUCT ANALYSIS; CEFR/стандарт odmiana oficjalna уже на A1 — **High**. Дата сверки: 2026-09-05.

#### PRAG-REPAIR-01 — Strategie naprawy komunikacji · Стратегии ремонта
- **Intro:** A1
- **Re-deepen:** A2 (уточнение деталей), B1 (парафраз до медиации), B2 (реPAIR в быстром диалоге)
- **Prereq:** PRAG-PAN-01
- **Exit status:** Required
- **Функция:** Восстановить понимание без срыва диалога: переспрос, просьба повторить медленнее, частичный повтор.
- **Form / Meaning / Use:** Form — *Przepraszam, nie rozumiem. Czy może Pan powtórzyć wolniej?*; *Chodzi o…?*; *Jak się pisze…?* Meaning — метакоммуникация. Use — urząd, врач, школа, телефон.
- **Пределы:** Не заменяет знание лексики сценария; не обучение «любому английскому»; грубый *\*Co?* без смягчения — контрпример регистра.
- **Пример:** *Przepraszam, nie rozumiem. Czy może Pani powtórzyć wolniej?*
- **Контрпример:** *\*Co?! Nie rozumiem nic!* на стойке в urzędzie без смягчения и адреса.
- **UKR:** Часто уход в украинский/смесь вместо польского repair; *що?* звучит резче нужного.
- **RUS:** *Что?* / *Ещё раз* калькой; меньше готовых польских формул вежливого переспроса.
- **BEL:** Переключение на RU/BEL-код как «ремонт»; нужно якорить именно польские формулы + регистр *pan/pani*.
- **Evidence:** `roleplay_tv` + `disc_repair`
- **Source:** PED-010; PRODUCT ANALYSIS (коммуникативное выживание первой аудитории) — **High**. Дата сверки: 2026-09-05.

#### PRAG-SOFTEN-01 — Łagodzenie próśb i odmów · Смягчение просьб и отказов
- **Intro:** A2
- **Re-deepen:** B1 (жалобы, bad news), B2 (обратная связь на работе, апелляции)
- **Prereq:** PRAG-PAN-01, GR-MOD-COND-01
- **Exit status:** Supporting
- **Функция:** Смягчить директив и отказ: *proszę*, условное *czy mógłby Pan…*, отказ без конфликта.
- **Form / Meaning / Use:** Form — *Czy mógłby Pan otworzyć okno?*; *Niestety, nie mogę…*; *Chciałbym zgłosić…*. Meaning — лицо собеседника, вежливость. Use — соседи, работа, аренда, школа.
- **Пределы:** Не отменяет прямые императивы там, где они уместны (безопасность); не полный курс вежливости PL; пересекается с модальностью, но фокус — прагматика акта.
- **Пример:** *Czy mógłby Pan otworzyć okno? Niestety, dziś nie mogę przyjść.*
- **Контрпример:** *\*Otwórz okno!* соседу-незнакомцу / *\*Nie przyjdę.* без смягчения в формальном контексте.
- **UKR:** Прямее императивы в быту → жёсткий тон в PL; смягчение через *будь ласка* не = польские конструкции.
- **RUS:** Прямой императив / *вы должны* в претензиях (*\*Wy musicie naprawić to teraz!*); слабее привычка к *czy mógłby*.
- **BEL:** Смешение RU-прямости и локальных формул; нужны польские шаблоны, не перевод бел. вежливости дословно.
- **Evidence:** `roleplay_tv` + `guided_prod`
- **Source:** PED-010; PRODUCT ANALYSIS — **High**; границы «Supporting vs Required на B1» — **Medium**, зафиксировано как Supporting на Intro A2. Дата сверки: 2026-09-05.

#### PRAG-MEDIATION-01 — Mediacja / parafraza · Медиация
- **Intro:** B1
- **Re-deepen:** B2 (школа, работа, многосторонние встречи; сжатие длинных текстов)
- **Prereq:** PRAG-REPAIR-01, PRAG-PAN-01, GR-SYN-SUB-01
- **Exit status:** Required
- **Функция:** Передать смысл третьему лицу / упростить сообщение: школа (родитель↔учитель), работа (коллега↔клиент), urzędowe пояснения — core для взрослой аудитории продукта на B1.
- **Form / Meaning / Use:** Form — *Chodzi o to, że…*; *Nauczycielka prosi, żeby…*; *Podsumowując…*. Meaning — посредничество без дословного перевода всего. Use — FN-B1/B2 mediation и exam-prep speaking/writing.
- **Пределы:** Не синхронный перевод профессионала; не требует полного B2 синтаксиса на Intro; точность фактов важнее красивого стиля.
- **Пример:** *Pani Nowak prosi, żebyście jutro przynieśli zgody na wycieczkę. Chodzi o podpis rodziców.*
- **Контрпример:** *\*Она сказала, что надо согласия* (код-свитч) / дословная калька без польской перестройки *\*Ona mówiła że wy musicie…* без адресата и ясности.
- **UKR:** Риск дословного перевода с укр. на PL с *що*-кальками; удержание *pan/pani* при пересказе третьему лицу.
- **RUS:** Калька русского пересказа (*\*Она сказала вам…*); потеря польских связок *żeby* / *chodzi o*.
- **BEL:** Часто посредничество через RU как «понятный» язык семье — продукт требует именно польской медиации; глоссы BEL ≠ RUS-шаблоны пересказа.
- **Evidence:** `mediation_task` + `roleplay_tv`
- **Source:** PED-010; CEFR Companion Volume (mediation); PRODUCT ANALYSIS (B1 core audience) — **High** (роль медиации); детальный банк рубрик — **Medium**, REQUIRES VERIFICATION. Дата сверки: 2026-09-05.

---

## Таблица миграции временных ID → канонические

**Правило:** неоднозначные старые ярлыки **не** автоподменяются одним ID. Их нужно разбирать по смыслу конкретной FN.

| Старый временный ID | Канонический ID / действие | Причина |
|---|---|---|
| `GR-ASPECT` | `GR-ASP-CON-01` (или иной `GR-ASP-*` по смыслу) | conscious contrast default; проверить этап аспекта |
| `GR-ASPECT-LEX` | `GR-ASP-LEX-01` | lexical aspect pairs |
| `GR-CASE` | **DISAMBIGUATE per FN** — запрет авто-Nom | падеж обязан быть выбран по функции |
| `GR-CASE-ACC` | `GR-CAS-ACC-01` | canonical accusative DO |
| `GR-CASE-DAT` | `GR-CAS-DAT-01` | canonical dative |
| `GR-CASE-GEN` | `GR-CAS-GEN-01` | canonical genitive core |
| `GR-CASE-INS` | `GR-CAS-INS-01` | canonical instrumental predicative |
| `GR-CASE-LOC` | `GR-CAS-LOC-01` | canonical locative |
| `GR-CASE-NOM` | `GR-CAS-NOM-01` | canonical nominative subject |
| `GR-CASE-VOC` | `GR-CAS-VOC-01` | canonical vocative |
| `GR-CAUSE` | `GR-SYN-CAUSE-01` | cause/effect |
| `GR-COMP` | `GR-DEG-ADJ-01` | comparison |
| `GR-COMP-ZE` | `GR-SYN-SUB-01` | że-clauses |
| `GR-COMPLEX` | `GR-SYN-SUB-01` (или `GR-SYN-REL-01` / `GR-SYN-COND-01` по смыслу) | subordination family |
| `GR-CONCORD` | `GR-AGR-ADJ-01` (или `GR-AGR-VPAST-01`) | agreement — выбрать тип |
| `GR-COND` | `GR-MOD-COND-01` | conditional mood |
| `GR-FORMAL` | `PRAG-PAN-01` | formal address |
| `GR-FUT` | **DISAMBIGUATE** `GR-TNS-FUT-01` vs `GR-TNS-FUT-02` | compound vs simple future |
| `GR-GENDER` | `GR-GEN-MFN-01` | gender |
| `GR-IMP` | `GR-MOD-IMP-01` или formulaic exposure без системного IMP | imperative vs формулы |
| `GR-MASC-PERS` | `GR-MO-VIR-01` | męskoosobowy |
| `GR-MEDIATION` | `PRAG-MEDIATION-01` | mediation |
| `GR-MODAL` | `GR-MOD-VERB-01` | modals |
| `GR-NEG` | `GR-NEG-01` | negation nie |
| `GR-NUM` | **DISAMBIGUATE** `GR-NUM-CARD-01` / `GR-NUM-CARD-05` / `GR-NUM-ORD-01` / `GR-NUM-MONEY-01` | не всегда 1–4 |
| `GR-ORTH` | `ORTH-CORE-01` (или точечный `ORTH-*`) | orthography not GR namespace |
| `GR-PART` | **DISAMBIGUATE** `GR-PART-ACT-01` / `GR-PART-PASS-01` / `GR-PART-ADV-01` | не только passive |
| `GR-PASS` | `GR-PASS-01` | passive |
| `GR-PHON` | `PHON-CORE-01` (или точечный `PHON-*`) | phonetics not GR namespace |
| `GR-PRAG-PAN-01` | `PRAG-PAN-01` | moved from GR namespace to PRAG |
| `GR-PRES` | `GR-TNS-PRS-01` | alias |
| `GR-Q` | **DISAMBIGUATE** `GR-Q-YESNO-01` / `GR-Q-WH-01` | вопросный тип |
| `GR-REFL` | `GR-PRO-REFL-01` | się |
| `GR-REKCJA` | **DISAMBIGUATE** `GR-REK-VERB-01` / `GR-REK-PREP-01` / `GR-REK-VERB-DAT-01` | government type |
| `GR-REPAIR` | `PRAG-REPAIR-01` | repair strategies |
| `GR-SOFTEN` | `PRAG-SOFTEN-01` | mitigation |
| `GR-TENSE` | **DISAMBIGUATE** `GR-TNS-PRS-01` / `GR-TNS-PST-01` / `GR-TNS-FUT-01` | запрет авто-present |
| `GR-TENSE-FUT` | **DISAMBIGUATE** `GR-TNS-FUT-01` / `GR-TNS-FUT-02` | compound vs simple |
| `GR-TENSE-PAST` | `GR-TNS-PST-01` | canonical past |
| `GR-TENSE-PRES` | `GR-TNS-PRS-01` | canonical present |
| `GR-TV` | `PRAG-PAN-01` (+ `GR-TV-AGR-01` при согласовании) | T–V pragmatic + optional agr |
| `GR-WORDORDER` | **DISAMBIGUATE** `GR-WO-NEUT-01` / `GR-WO-CLIT-01` / `GR-WO-IS-01` / `GR-WO-Q-01` | word order facet |
