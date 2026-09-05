# A1 curriculum traceability (semantic reference)

**Статус:** A1 semantic reference — candidate for human / JPJO review.
**A2–B2:** pending semantic migration — **не** объявлены готовыми.
**Дата:** 2026-09-05

Цепочка: `SCN → FN → concepts → LEX → ERR → evidence → exit`.

ID функций и сценариев согласованы с A1 model (`FN-A1-*`, `SCN-A1-*` в `docs/curriculum/`).
Нормативные ячейки CEFR/Dz.U. помечены `REQUIRES VERIFICATION` там, где точная строка не сверена.

## Coverage summary

| Объект | Число | Связано с ≥1 FN/SCN | Доля |
| --- | ---: | ---: | ---: |
| A1 Required concepts (GR+PHON/ORTH/PRAG) | 46 | 46 | **46/46 (100%)** |
| A1 Supporting concepts | 22 | 0 прямых (индивидуальные причины) | n/a (allowed) |
| A1 Extension concepts | 0 | 0 | n/a |
| A1 LEX bundles | 21 | 21 | 100% |
| ERR used in A1 chains | 31 | — | — |
| ERR unused (bank, with grouped reasons) | 41 | — | — |

## SCN → FN → LEX → ERR → evidence → exit

| SCN | FN | LEX | ERR (fit) | Evidence | Exit |
| --- | --- | --- | --- | --- | --- |
| `SCN-A1-EVERYDAY-01` | FN-A1-IDENTIFY-01, FN-A1-LOCATE-01, FN-A1-GREET-01, FN-A1-THANKS-01, FN-A1-TIME-01, FN-A1-NARRATE-01 | LEX-A1-IDENTITY, LEX-A1-GREETINGS, LEX-A1-TIME | ERR-UKR-01, ERR-UKR-04, ERR-UKR-09, ERR-UKR-18, ERR-RUS-02, ERR-RUS-04, ERR-RUS-09, ERR-RUS-18, ERR-BEL-01, ERR-BEL-05, ERR-BEL-09, ERR-BEL-18, ERR-BEL-24 | task_performance / roleplay_tv | `EXIT-A1-INSTR` |
| `SCN-A1-SHOP-01` | FN-A1-ADDRESS-01, FN-A1-ASK-01, FN-A1-TRANS-01, FN-A1-QUANT-01, FN-A1-CONFIRM-01, FN-A1-THANKS-01, FN-A1-GREET-01 | LEX-A1-SERVICE, LEX-A1-MONEY | ERR-UKR-02, ERR-UKR-06, ERR-UKR-13, ERR-UKR-18, ERR-UKR-22, ERR-UKR-23, ERR-RUS-06, ERR-RUS-14, ERR-RUS-18, ERR-RUS-21, ERR-BEL-06, ERR-BEL-10, ERR-BEL-14, ERR-BEL-18, ERR-BEL-21, ERR-BEL-24 | task_performance | `EXIT-A1-INSTR` |
| `SCN-A1-FOOD-01` | FN-A1-TRANS-01, FN-A1-QUANT-01, FN-A1-ASK-01, FN-A1-ADDRESS-01, FN-A1-THANKS-01 | LEX-A1-SERVICE, LEX-A1-MONEY | ERR-UKR-13, ERR-UKR-18, ERR-UKR-22, ERR-RUS-14, ERR-RUS-18, ERR-BEL-14, ERR-BEL-18, ERR-BEL-24 | task_performance | `EXIT-A1-INSTR` |
| `SCN-A1-TICKET-01` | FN-A1-TRANS-01, FN-A1-TIME-01, FN-A1-ASK-01, FN-A1-QUANT-01, FN-A1-READ-01, FN-A1-REPAIR-01 | LEX-A1-TRANSPORT, LEX-A1-SIGNS | ERR-UKR-06, ERR-UKR-10, ERR-UKR-22, ERR-RUS-06, ERR-RUS-10, ERR-BEL-06, ERR-BEL-10 | task_performance + reading_task | `EXIT-A1-INSTR` |
| `SCN-A1-DIRECTIONS-01` | FN-A1-DIRECT-01, FN-A1-REPAIR-01, FN-A1-THANKS-01 | LEX-A1-TRANSPORT | ERR-UKR-10 | task_performance | `EXIT-A1-INSTR` |
| `SCN-A1-HOUSING-01` | FN-A1-LOCATE-01, FN-A1-LOCATE-02, FN-A1-REPORT-01, FN-A1-REQUEST-01, FN-A1-PHONE-01 | LEX-A1-HOUSING, LEX-A1-ADDRESS | ERR-UKR-01, ERR-UKR-04, ERR-UKR-07, ERR-UKR-18, ERR-RUS-02, ERR-RUS-03, ERR-RUS-04, ERR-RUS-07, ERR-RUS-18, ERR-BEL-01, ERR-BEL-05, ERR-BEL-07, ERR-BEL-18, ERR-BEL-24 | task_performance | `EXIT-A1-INSTR` |
| `SCN-A1-URZAD-01` | FN-A1-GREET-01, FN-A1-ADDRESS-01, FN-A1-PURPOSE-01, FN-A1-DOCS-01, FN-A1-IDENTIFY-01, FN-A1-REPAIR-02, FN-A1-REG-01 | LEX-A1-URZAD, LEX-A1-DOCS | ERR-UKR-01, ERR-UKR-04, ERR-UKR-18, ERR-RUS-02, ERR-RUS-04, ERR-RUS-18, ERR-BEL-01, ERR-BEL-05, ERR-BEL-18 | task_performance / roleplay_tv | `EXIT-A1-INSTR` |
| `SCN-A1-MED-01` | FN-A1-HEALTH-01, FN-A1-APPOINT-01, FN-A1-TIME-01, FN-A1-ASK-01, FN-A1-ADDRESS-01, FN-A1-CONFIRM-01 | LEX-A1-HEALTH, LEX-A1-TIME | ERR-UKR-02, ERR-UKR-18, ERR-UKR-23, ERR-RUS-10, ERR-RUS-18, ERR-RUS-21, ERR-BEL-10, ERR-BEL-18, ERR-BEL-21 | task_performance | `EXIT-A1-INSTR` |
| `SCN-A1-EMERGENCY-01` | FN-A1-HELP-01, FN-A1-HEALTH-01, FN-A1-LOCATE-02 | LEX-A1-HELP | ERR-UKR-01, ERR-RUS-02, ERR-RUS-03, ERR-BEL-01 | task_performance (timed) | `EXIT-A1-INSTR` |
| `SCN-A1-WORK-01` | FN-A1-IDENTIFY-02, FN-A1-GREET-01, FN-A1-REQUEST-01, FN-A1-REFUSE-01, FN-A1-CONFIRM-01, FN-A1-APOLOGY-01, FN-A1-REG-01 | LEX-A1-WORK, LEX-A1-POLITENESS, LEX-A1-APOLOGY | ERR-UKR-09, ERR-UKR-18, ERR-RUS-09, ERR-RUS-18, ERR-BEL-09, ERR-BEL-18, ERR-BEL-24 | roleplay_tv | `EXIT-A1-INSTR` |
| `SCN-A1-SCHOOL-01` | FN-A1-IDENTIFY-01, FN-A1-REPORT-01, FN-A1-APOLOGY-01, FN-A1-TIME-01, FN-A1-GREET-01, FN-A1-ADDRESS-01 | LEX-A1-SCHOOL, LEX-A1-APOLOGY | ERR-UKR-01, ERR-UKR-18, ERR-RUS-02, ERR-RUS-10, ERR-RUS-18, ERR-BEL-01, ERR-BEL-18 | task_performance / writing (wiadomość) | `EXIT-A1-INSTR` |
| `SCN-A1-PHONE-01` | FN-A1-PHONE-01, FN-A1-PHONE-02, FN-A1-REPAIR-01, FN-A1-REPAIR-02, FN-A1-CONFIRM-01 | LEX-A1-PHONE, LEX-A1-REPAIR | ERR-UKR-07, ERR-RUS-07, ERR-BEL-07 | task_performance (audio) | `EXIT-A1-INSTR` |
| `SCN-A1-SMS-01` | FN-A1-APOLOGY-01, FN-A1-CONFIRM-01, FN-A1-TIME-01, FN-A1-IDENTIFY-01 | LEX-A1-PHONE, LEX-A1-TIME, LEX-A1-POLITENESS, LEX-A1-APOLOGY | ERR-UKR-01, ERR-UKR-18, ERR-RUS-02, ERR-RUS-10, ERR-RUS-18, ERR-BEL-01, ERR-BEL-18 | writing_task | `EXIT-A1-INSTR` |
| `SCN-A1-BANK-01` | FN-A1-PURPOSE-01, FN-A1-ASK-01, FN-A1-DOCS-01, FN-A1-QUANT-01, FN-A1-ADDRESS-01, FN-A1-REPAIR-02 | LEX-A1-BANK | ERR-UKR-02, ERR-UKR-18, ERR-UKR-22, ERR-UKR-23, ERR-RUS-18, ERR-RUS-21, ERR-BEL-10, ERR-BEL-18, ERR-BEL-21 | task_performance + ASM form-follow | `EXIT-A1-INSTR` |
| `SCN-A1-NEIGHBOR-01` | FN-A1-GREET-01, FN-A1-THANKS-01, FN-A1-REQUEST-01, FN-A1-APOLOGY-01, FN-A1-REG-01, FN-A1-IDENTIFY-01 | LEX-A1-GREETINGS, LEX-A1-POLITENESS | ERR-UKR-01, ERR-UKR-04, ERR-UKR-18, ERR-RUS-02, ERR-RUS-04, ERR-RUS-18, ERR-BEL-01, ERR-BEL-05, ERR-BEL-18, ERR-BEL-24 | roleplay_tv | `EXIT-A1-INSTR` |
| `SCN-A1-FORM-01` | FN-A1-FORM-01, FN-A1-LOCATE-02, FN-A1-IDENTIFY-01 | LEX-A1-ADDRESS, LEX-A1-DOCS, LEX-A1-IDENTITY | ERR-UKR-01, ERR-RUS-02, ERR-RUS-03, ERR-BEL-01 | closed_item / guided_prod | `EXIT-A1-INSTR` |
| `SCN-A1-WRITE-SELF-01` | FN-A1-IDENTIFY-01, FN-A1-IDENTIFY-02, FN-A1-LOCATE-01, FN-A1-NARRATE-01 | LEX-A1-IDENTITY, LEX-A1-ROUTINE | ERR-UKR-01, ERR-UKR-04, ERR-UKR-09, ERR-RUS-02, ERR-RUS-04, ERR-RUS-09, ERR-BEL-01, ERR-BEL-05, ERR-BEL-09 | writing_task (ASM) | `EXIT-A1-INSTR` |

## Required A1 concepts → FN/SCN

| Concept | Linked FN/SCN | Pedagogical fit |
| --- | --- | --- |
| `GR-GEN-MFN-01` | FN-A1-IDENTIFY-01, FN-A1-FORM-01 | Род обязателен для согласования имён/анкетных полей и кратких описаний себя. |
| `GR-NUM-SGPL-01` | FN-A1-QUANT-01, FN-A1-LOCATE-02 | Ед./мн. в ценах, документах и адресах (*numery*, *piętra*). |
| `GR-AGR-ADJ-01` | FN-A1-IDENTIFY-01, FN-A1-FORM-01 | Согласование adj в самоописании и полях анкеты (*nowy adres*). |
| `GR-AGR-VPAST-01` | FN-A1-NARRATE-01, FN-A1-REPORT-01, FN-A1-APOLOGY-01 | Род в прошедшем для рассказа о дне, сообщения об отсутствии и извинения (*spóźniłem/spóźniłam się*). |
| `GR-CAS-NOM-01` | FN-A1-IDENTIFY-01, FN-A1-IDENTIFY-02 | Подлежащее и именные формулы представления. |
| `GR-CAS-ACC-01` | FN-A1-TRANS-01, FN-A1-DOCS-01 | Прямое дополнение в заказе/покупке и передаче документов. |
| `GR-CAS-ACC-02` | FN-A1-DIRECT-01, FN-A1-PHONE-01 | Предложный Acc (*na przystanek*, *przez most*) и phone scripts. |
| `GR-CAS-GEN-01` | FN-A1-QUANT-01, FN-A1-LOCATE-01 | Количественный Gen и посессивные формулы жилья. |
| `GR-CAS-GEN-02` | FN-A1-DIRECT-01, FN-A1-LOCATE-01, FN-A1-PHONE-01 | Gen после *do/u/z/od* в пути, жилье и *dzwonić do*. |
| `GR-CAS-GEN-03` | FN-A1-REFUSE-01, FN-A1-TRANS-01 | Gen после negation объекта в отказе/отсутствии товара. |
| `GR-CAS-GEN-04` | FN-A1-ASK-01, FN-A1-REPORT-01 | *nie ma + Gen* для наличия и неисправностей. |
| `GR-CAS-INS-01` | FN-A1-IDENTIFY-02 | Предикатив профессии *jestem nauczycielem*. |
| `GR-CAS-INS-02` | FN-A1-TRANS-01, FN-A1-DIRECT-01 | Орудие/сопровождение: *płacę kartą*, *autobusem*. |
| `GR-CAS-LOC-01` | FN-A1-LOCATE-01, FN-A1-LOCATE-02, FN-A1-TIME-01 | Место (*w pracy*, *na piętrze*) и час (*o ósmej*). |
| `GR-CAS-VOC-01` | FN-A1-GREET-01, FN-A1-ADDRESS-01 | Wołacz и обращение *panie/pani* в приветствии. |
| `GR-REK-PREP-01` | FN-A1-DIRECT-01, FN-A1-LOCATE-01, SCN-A1-DIRECTIONS-01 | Частые предлоги как каркас навигации и локации. |
| `GR-REK-VERB-01` | FN-A1-TRANS-01, FN-A1-REQUEST-01, FN-A1-PHONE-01 | Управление глаголов транзакции, просьбы и звонка. |
| `GR-PRO-PERS-01` | FN-A1-IDENTIFY-01, FN-A1-HEALTH-01 | Личные местоимения в представлении и *boli mnie*. |
| `GR-PRO-DEM-01` | FN-A1-READ-01, FN-A1-ASK-01 | Указание на вывеску/товар (*ten napis*, *to*). |
| `GR-PRO-POSS-01` | FN-A1-IDENTIFY-01, FN-A1-DOCS-01 | Притяжательные в *moje imię / mój dowód*. |
| `GR-PRO-INT-01` | FN-A1-ASK-01, FN-A1-DIRECT-01, FN-A1-TIME-01 | Вопросительные в запросе информации, пути и времени. |
| `GR-PRO-REFL-01` | FN-A1-IDENTIFY-01, FN-A1-APPOINT-01 | *nazywam się*, *zapisać się* — обязательный *się*. |
| `GR-NUM-CARD-01` | FN-A1-QUANT-01, FN-A1-LOCATE-02, FN-A1-TIME-01 | 1–4 в цене, адресе и часах. |
| `GR-NUM-CARD-05` | FN-A1-QUANT-01, FN-A1-TRANS-01 | 5+ и Gen считаемого в кассе и билетах. |
| `GR-TNS-PRS-01` | FN-A1-IDENTIFY-01, FN-A1-NARRATE-01, FN-A1-TRANS-01 | Настоящее — базовый каркас почти всех A1 устных актов. |
| `GR-TNS-PST-01` | FN-A1-REPORT-01, FN-A1-APOLOGY-01, FN-A1-NARRATE-01 | Прошедшее для факта отсутствия, опоздания и простого рассказа. |
| `GR-TNS-FUT-01` | FN-A1-APPOINT-01, FN-A1-PHONE-02, FN-A1-TIME-01 | Сложное будущее в записи и обещании перезвонить (*będę…*). |
| `GR-MOD-VERB-01` | FN-A1-REQUEST-01, FN-A1-REFUSE-01, FN-A1-HELP-01 | Модалки просьбы/отказа/возможности помощи. |
| `GR-ASP-LEX-01` | FN-A1-TRANS-01, FN-A1-NARRATE-01, SCN-A1-SHOP-01 | Лексическое знакомство с частыми парами без свободного выбора на exit. |
| `GR-SYN-SUB-01` | FN-A1-APOLOGY-01, FN-A1-REPORT-01, FN-A1-PURPOSE-01 | *że/bo/kiedy* в извинении, причине отсутствия и цели визита. |
| `GR-NEG-01` | FN-A1-REFUSE-01, FN-A1-REPAIR-02, FN-A1-ASK-01 | Отрицание в отказе, непонимании и отсутствии товара. |
| `GR-WO-NEUT-01` | FN-A1-IDENTIFY-01, FN-A1-NARRATE-01 | Нейтральный SVO как опора понятности на A1. |
| `GR-TV-AGR-01` | FN-A1-ADDRESS-01, FN-A1-GREET-01, FN-A1-REG-01 | Согласование 3 л. при pan/pani в службе и urzędzie. |
| `GR-Q-YESNO-01` | FN-A1-ASK-01, FN-A1-CONFIRM-01, FN-A1-REPAIR-01 | Общие вопросы наличия, подтверждения и repair. |
| `GR-EXIST-01` | FN-A1-ASK-01, FN-A1-REPORT-01, FN-A1-LOCATE-01 | *jest/są/nie ma* для наличия слота, неисправности и локации. |
| `GR-SYN-CAUSE-01` | FN-A1-APOLOGY-01, FN-A1-REPORT-01, FN-A1-REFUSE-01 | *bo/dlatego* для причины опоздания, отсутствия и отказа. |
| `PHON-CORE-01` | FN-A1-GREET-01, FN-A1-IDENTIFY-01, SCN-A1-EVERYDAY-01 | Парокситон и базовые графемы нужны, чтобы имя/приветствие были узнаваемы. |
| `PHON-CI-SI-ZI-01` | FN-A1-TIME-01, FN-A1-GREET-01, SCN-A1-EVERYDAY-01 | Мягкий ряд в *dzień*, *dziś*, *siostra* и школьных именах. |
| `PHON-SZ-CZ-01` | FN-A1-TRANS-01, FN-A1-ASK-01, SCN-A1-SHOP-01 | Контраст *czas/czeszać*-типа и *czy* в сервисных вопросах. |
| `ORTH-CORE-01` | FN-A1-FORM-01, FN-A1-LOCATE-02, SCN-A1-FORM-01 | Диакритика обязательна в анкете, адресе и ФИО. |
| `ORTH-OU-01` | FN-A1-FORM-01, FN-A1-DOCS-01 | Выбор *ó/u* в частотных полях (*adres*, *który*, *mój*). |
| `ORTH-RZ-Z-01` | FN-A1-FORM-01, FN-A1-READ-01 | Пары *rz/ż* в фамилиях, вывесках и бланках. |
| `ORTH-CH-H-01` | FN-A1-FORM-01, FN-A1-IDENTIFY-01 |  *ch/h* в именах и топонимике анкеты. |
| `ORTH-IY-01` | FN-A1-FORM-01, FN-A1-IDENTIFY-01, SCN-A1-SMS-01 |  *i/y* в именах, SMS и орфографии L1-риска UKR. |
| `PRAG-PAN-01` | FN-A1-ADDRESS-01, FN-A1-GREET-01, FN-A1-REG-01, SCN-A1-URZAD-01 | T–V выбор — условие уместности в службе и urzędzie. |
| `PRAG-REPAIR-01` | FN-A1-REPAIR-01, FN-A1-REPAIR-02, SCN-A1-PHONE-01 | Стратегии ремонта — отдельные can-do A1, не «грамматика». |

## Supporting A1 concepts without direct FN link (individual reasons)

| Concept | Reason |
| --- | --- |
| `GR-ALT-STEM-01` | Supporting: чередование основ вводится точечно в частотных леммах (*mogę/możesz*), без отдельного FN-can-do; спираль в ROUTINE/REQUEST. |
| `GR-CAS-NOM-02` | Supporting: расширенные номинативные конструкции (именования на вывесках) усиливают READ-01, но exit держит NOM-01. |
| `GR-CAS-GEN-05` | Supporting: дополнительные Gen-контексты (даты на бланках) усиливают FORM-01; не блокируют exit отдельно от GEN-01..04. |
| `GR-CAS-FUNC-MAP-01` | Supporting: обзорная карта функций падежей для преподавателя/спирали; учащийся закрывает exit через конкретные CAS-* Required. |
| `GR-NUM-ORD-01` | Supporting: порядковые усиливают адрес/этаж (*na drugim piętrze*) и TIME, но кардиналы Required покрывают минимум кассы. |
| `GR-NUM-MONEY-01` | Supporting: денежный формат уточняет QUANT/TRANS; базовый счёт уже на CARD-01/05. |
| `GR-TNS-FUT-02` | Supporting: простое будущее dok — рецептивно рядом с FUT-01; продуктивный минимум записи закрывает сложное будущее. |
| `GR-MOT-BASE-01` | Supporting: *iść/jechać* различаются в DIRECT/TRANSPORT сценариях как лексика движения, без отдельного exit-столпа. |
| `GR-SYN-COORD-01` | Supporting: *i/a/ale* усиливают NARRATE-01 связность, но подчинение Required уже даёт *bo/że*. |
| `GR-NEG-GEN-01` | Supporting: углубление Gen negation; базовый NEG-01 + GEN-03 закрывают отказ/отсутствие на exit. |
| `GR-ANIM-MASC-01` | Supporting: одушевлённость Acc уточняет людей в GREET/HELP; не отдельный блокирующий столп A1. |
| `GR-CONJ-TYPE-01` | Supporting: типы спряжения — метакарта для автора контента; учащийся видит формы через TNS-PRS-01. |
| `GR-VERB-IRREG-01` | Supporting: частотные неправильные (*być, mieć, iść*) вшиты в FN скрипты, без отдельного can-do. |
| `GR-ZNA-WIED-01` | Supporting: контраст *znać/wiedzieć* полезен в ASK/REPAIR, но не обязателен для instructional exit A1. |
| `GR-PREP-DO-NA-01` | Supporting: тонкий контраст *do/na* усиливает DIRECT/WORK; базовые рекции уже в REK-PREP/CAS-GEN-02. |
| `GR-PREP-Z-01` | Supporting: *z/ze* в происхождении и транспорте связано с IDENTIFY/DIRECT, калибруется как Supporting. |
| `GR-TIME-EXPR-01` | Supporting: расширенные временные обороты рядом с TIME-01; якорные *dziś/o ósmej* закрывают Required через CAS-LOC + NUM. |
| `GR-Q-WH-01` | Supporting: частные вопросы усиливают ASK/DIRECT; yes-no Required уже на Q-YESNO-01. |
| `GR-GEN-PART-01` | Supporting: партитивный Gen в магазине — расширение QUANT, не отдельный блокер. |
| `GR-WO-Q-01` | Supporting: порядок в вопросе уточняет Q-YESNO/WH; нейтральный WO-NEUT остаётся Required. |
| `GR-GEN-ADJ-01` | Supporting: род прилагательных в расширенных НР; AGR-ADJ-01 закрывает минимум. |
| `GR-INF-COMPL-01` | Supporting: инфинитивные комплементы модалок углубляют REQUEST/REFUSE; модалки Required уже в MOD-VERB-01. |

## ERR used in canonical A1 chains

| ERR | Точное соответствие |
| --- | --- |
| `ERR-UKR-01` | `i/y` в имени, адресе, анкете и коротком письме. |
| `ERR-UKR-02` | `czy` в общем вопросе ASK-01. |
| `ERR-UKR-04` | `mam` вместо кальки «у мене є» в IDENTIFY/LOCATE. |
| `ERR-UKR-06` | `czekać na + Acc` в очереди/транспорте. |
| `ERR-UKR-07` | `dzwonić do + Gen` в PHONE. |
| `ERR-UKR-09` | `w pracy / do pracy` в WORK/NARRATE. |
| `ERR-UKR-10` | направление `do + Gen / na + Acc` в DIRECT. |
| `ERR-UKR-13` | ложный друг `magazyn` в SHOP/READ. |
| `ERR-UKR-18` | регистр `pan/pani`. |
| `ERR-UKR-22` | числительные 5+ и Gen в QUANT. |
| `ERR-UKR-23` | `nie ma + Gen` в ASK. |
| `ERR-RUS-02` | `i/y` в имени, адресе и форме. |
| `ERR-RUS-03` | мягкость и польские графемы в адресе/форме. |
| `ERR-RUS-04` | `mam` вместо `u mnie jest` в IDENTIFY/LOCATE. |
| `ERR-RUS-06` | `czekać na + Acc` в очереди/транспорте. |
| `ERR-RUS-07` | `dzwonić do + Gen` в PHONE. |
| `ERR-RUS-09` | `w pracy / do pracy` в WORK/NARRATE. |
| `ERR-RUS-10` | дни недели с `w + Acc` в TIME/APPOINT. |
| `ERR-RUS-14` | ложный друг `magazyn` в SHOP/READ. |
| `ERR-RUS-18` | регистр `pan/pani`. |
| `ERR-RUS-21` | `nie ma + Gen` в ASK. |
| `ERR-BEL-01` | аканне и польская орфография в имени/адресе/форме. |
| `ERR-BEL-05` | `mam` вместо кальки `у мяне ёсць` в IDENTIFY/LOCATE. |
| `ERR-BEL-06` | `czekać na + Acc` в очереди/транспорте. |
| `ERR-BEL-07` | `dzwonić do + Gen` в PHONE. |
| `ERR-BEL-09` | `w pracy` в WORK/NARRATE. |
| `ERR-BEL-10` | `czy` vs `ці` в ASK. |
| `ERR-BEL-14` | ложный друг `magazyn` в SHOP/READ. |
| `ERR-BEL-18` | регистр `pan/pani`. |
| `ERR-BEL-21` | `nie ma` vs `няма` в ASK. |
| `ERR-BEL-24` | прагматика `proszę` vs `калі ласка` в REQUEST/THANKS. |

## ERR not selected in A1 chains (allowed)

| Группа | ID | Причина |
| --- | --- | --- |
| UKR: сложный синтаксис / rekcja | `03, 05, 08, 21` | Не являются точным fit текущих A1 FN; сохраняются для поздней спирали/диагностики. |
| UKR: аспект | `11, 12` | Системный выбор вида выше текущего A1 formulaic exposure. |
| UKR: лексика вне текущего SCN | `14` | `dywan` требует отдельного housing-viewing задания. |
| UKR: орфография / фонетика | `15, 16, 17` | Банковые карточки; не назначаются FN только ради coverage. |
| UKR: vocative / word order / formal writing | `19, 20, 24` | Нужны отдельные stimuli и review, а не механический линк. |
| RUS: rekcja / порядок | `05, 08, 11` | Не являются точным fit текущих A1 цепей. |
| RUS: аспект | `12, 13` | Системный выбор вида/императива выше текущего A1 scope. |
| RUS: лексика вне текущего SCN | `15` | Пресса не входит в reference slice. |
| RUS: фонетика / орфография | `16, 17` | Банковые карточки; требуют отдельного evidence. |
| RUS: vocative / `po polsku` / word order | `01, 19, 20` | Возможны в A1, но не форсируются без отдельного stimulus. |
| RUS: męskoosobowy | `22, 23` | Выше текущего A1 core. |
| RUS: complaint | `24` | Рекламация не входит в A1 APOLOGY/REFUSE. |
| BEL: орфография / фонетика | `02, 03, 04, 16, 17` | Банковые карточки; требуют отдельного evidence. |
| BEL: rekcja / сложное изъяснение | `08, 11` | Не являются точным fit текущих A1 цепей. |
| BEL: аспект | `12, 13` | Системный выбор вида выше текущего A1 scope. |
| BEL: лексика вне текущего SCN | `15` | `dywan` требует отдельного housing-viewing задания. |
| BEL: vocative / clitics / gender | `19, 20, 22` | Не форсируются без отдельного задания. |
| BEL: formal e-mail | `23` | Жанр выше текущего A1 SMS/FORM scope. |

## Exit criterion pointer

Instructional exit A1: `EXIT-A1-INSTR` в `docs/requirements/curriculum/level-exit-criteria.md` (не смешивать с `session_availability` госэкзамена A1 2026 = not_announced).

## Limits of this file

- Структурная и семантическая трассировка reference-slice A1; **не** доказательство JPJO.
- Новые FN/SCN IDs должны совпадать с `functional-inventory.md` / `scenario-inventory.md` после параллельной миграции.
- A2–B2 chains здесь не утверждаются.
