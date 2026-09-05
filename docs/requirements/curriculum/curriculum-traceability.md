# Трассируемость учебной программы (curriculum traceability)

**Статус:** Phase 2 integrity fix — Candidate for independent JPJO review.
**Дата:** 2026-09-05
**Правило:** только канонические `FN-A1-*…FN-B2-*`, `GR-*`, `PHON-*`, `ORTH-*`, `PRAG-*`, `LEX-*`, `ERR-*`.

Это не схема БД.

## Coverage summary

| Объект | Всего | Трассируется | Не трассируется |
| --- | ---: | ---: | ---: |
| FN | 195 | 195 | 0 |
| GR | 110 | 110 | 0 |
| PHON | 4 | 4 | 0 |
| ORTH | 5 | 5 | 0 |
| PRAG | 4 | 4 | 0 |
| LEX bundles | 160 | 160 | 0 |
| ERR (linked from FN) | 72 | 72 | 0 |

### GR without FN (allowed with reason)

| GR ID | Reason |
|---|---|
| — | нет: все 110 GR трассируются минимум в одну FN |

## FN chains (all 195)

| CEFR/official anchor | Level | FN | Language concepts | LEX | L1 | Evidence | Exit | Exam |
|---|---|---|---|---|---|---|---|---|
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-001` | `GR-CAS-NOM-01`, `GR-TNS-PRS-01`, `GR-AGR-ADJ-01`, `GR-GEN-MFN-01`, `GR-PRO-POSS-01`, `GR-PREP-DO-NA-01` | `LEX-IDENTITY` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-002` | `GR-CAS-NOM-01`, `GR-CAS-LOC-01`, `GR-REK-VERB-01`, `GR-NUM-SGPL-01`, `GR-PRO-INT-01`, `GR-PREP-Z-01` | `LEX-WORK-BASIC` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-003` | `GR-CAS-LOC-01`, `GR-REK-VERB-01`, `GR-AGR-VPAST-01`, `GR-NUM-CARD-05`, `GR-TIME-EXPR-01` | `LEX-HOUSING-BASIC` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-004` | `GR-CAS-NOM-01`, `GR-NUM-CARD-01` | `LEX-ADDRESS` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-005` | `PRAG-PAN-01`, `GR-CAS-VOC-01`, `PHON-CORE-01` | `LEX-GREETINGS` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-006` | `PRAG-PAN-01`, `GR-TNS-PRS-01`, `ORTH-CH-H-01` | `LEX-SERVICE` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-007` | `GR-MOD-IMP-01`, `GR-Q-YESNO-01`, `PRAG-REPAIR-01`, `PHON-CI-SI-ZI-01` | `LEX-REPAIR` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-008` | `GR-NEG-01`, `GR-Q-YESNO-01`, `PRAG-REPAIR-01` | `LEX-REPAIR` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-009` | `GR-NUM-CARD-01`, `GR-CAS-GEN-01`, `GR-ALT-STEM-01`, `GR-NUM-ORD-01`, `GR-Q-WH-01` | `LEX-MONEY` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-010` | `GR-CAS-ACC-01`, `GR-CAS-GEN-01`, `GR-REK-VERB-01`, `GR-CAS-NOM-02`, `GR-NUM-MONEY-01`, `GR-GEN-PART-01` | `LEX-SHOP` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-011` | `GR-CAS-ACC-01`, `GR-CAS-GEN-01` | `LEX-FOOD` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-012` | `GR-CAS-ACC-01`, `GR-CAS-LOC-01`, `GR-MOD-IMP-01`, `GR-CAS-ACC-02`, `GR-TNS-FUT-02`, `GR-WO-Q-01` | `LEX-TRANS-BASIC` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-013` | `GR-Q-YESNO-01`, `GR-NUM-CARD-01`, `GR-CAS-ACC-01` | `LEX-TRANS-BASIC` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-014` | `GR-TNS-FUT-01`, `GR-NUM-CARD-01` | `LEX-APPOINTMENT` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-015` | `GR-CAS-ACC-01`, `GR-PRO-REFL-01`, `GR-CAS-GEN-02`, `GR-MOT-BASE-01`, `GR-GEN-ADJ-01` | `LEX-BODY` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-016` | `GR-CAS-ACC-01`, `GR-MOD-IMP-01`, `PRAG-PAN-01` | `LEX-DOCS` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-017` | `PRAG-PAN-01`, `GR-TNS-PRS-01`, `GR-CAS-GEN-01` | `LEX-URZAD-BASIC` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-018` | `GR-CAS-GEN-01`, `GR-Q-YESNO-01` | `LEX-DOCS` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-019` | `GR-TNS-PRS-01`, `GR-NEG-01`, `GR-CAS-GEN-03`, `GR-SYN-COORD-01`, `GR-INF-COMPL-01` | `LEX-SMS` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-020` | `PRAG-PAN-01`, `GR-TNS-PRS-01`, `GR-Q-YESNO-01` | `LEX-PHONE` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-021` | `GR-MOD-IMP-01`, `GR-MOD-VERB-01` | `LEX-PHONE` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-022` | `GR-MOD-VERB-01`, `GR-CAS-ACC-01`, `GR-CAS-GEN-04`, `GR-NEG-GEN-01` | `LEX-REQUEST` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-023` | `GR-NEG-01`, `GR-MOD-VERB-01`, `PRAG-PAN-01` | `LEX-REFUSAL` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-024` | `GR-CAS-DAT-01`, `GR-REK-VERB-01` | `LEX-POLITENESS` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-025` | `GR-CAS-ACC-01`, `GR-TNS-PRS-01` | `LEX-POLITENESS` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-026` | `GR-Q-YESNO-01`, `GR-CAS-NOM-01` | `LEX-AVAILABILITY` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-027` | `GR-NEG-01`, `GR-TNS-PRS-01` | `LEX-HOUSING-FIX` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-028` | `PRAG-PAN-01`, `GR-CAS-GEN-01` | `LEX-SCHOOL-BASIC` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-029` | `GR-TNS-PRS-01`, `GR-NEG-01` | `LEX-SCHOOL-BASIC` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-030` | `PRAG-PAN-01`, `GR-Q-YESNO-01`, `GR-CAS-ACC-01` | `LEX-BANK-BASIC` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-031` | `GR-NUM-CARD-01`, `GR-CAS-ACC-01` | `LEX-BANK-BASIC` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-032` | `GR-TNS-PRS-01`, `GR-ASP-LEX-01`, `GR-CAS-GEN-05`, `GR-TV-AGR-01` | `LEX-ROUTINE` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-033` | `GR-NUM-CARD-01`, `GR-CAS-GEN-01`, `GR-CAS-INS-02`, `GR-EXIST-01` | `LEX-TIME` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-034` | `GR-CAS-NOM-01`, `ORTH-CORE-01`, `ORTH-OU-01`, `GR-CAS-FUNC-MAP-01`, `GR-ANIM-MASC-01` | `LEX-FORMS` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-035` | `GR-TNS-PRS-01`, `GR-AGR-ADJ-01`, `ORTH-IY-01`, `ORTH-RZ-Z-01`, `GR-REK-PREP-01`, `GR-CONJ-TYPE-01` | `LEX-IDENTITY` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-036` | `GR-Q-YESNO-01`, `GR-CAS-ACC-01` | `LEX-MONEY` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-037` | `GR-TNS-PRS-01`, `GR-MOD-VERB-01` | `LEX-AGREEMENT` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-038` | `GR-Q-YESNO-01` | `LEX-SIGNS` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-039` | `PRAG-PAN-01`, `GR-CAS-VOC-01` | `LEX-NEIGHBOR` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-040` | `GR-MOD-IMP-01`, `GR-MOD-VERB-01` | `LEX-EMERGENCY-BASIC` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-041` | `PRAG-PAN-01`, `GR-PRO-PERS-01`, `GR-VERB-IRREG-01` | `LEX-GREETINGS` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A1 can-do (basic needs); Dz.U. zał.1 Katalog A | A1 | `FN-A1-042` | `GR-MOD-IMP-01`, `GR-PRO-DEM-01`, `GR-ZNA-WIED-01` | `LEX-INSTRUCTIONS` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A1-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-001` | `GR-TNS-PRS-01`, `GR-ASP-LEX-01`, `GR-CAS-ACC-01`, `GR-REK-VERB-DAT-01`, `GR-COMP-EQ-01` | `LEX-WORK-A2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-002` | `GR-MOD-VERB-01`, `GR-TNS-FUT-01`, `GR-CAS-GEN-01` | `LEX-WORK-LEAVE` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-003` | `GR-MOD-IMP-01`, `GR-MOD-VERB-01` | `LEX-WORK-RULES` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-004` | `GR-NUM-CARD-01`, `GR-CAS-GEN-01`, `GR-Q-YESNO-01`, `GR-PRO-SWOJ-01`, `GR-DAT-EXP-01` | `LEX-HOUSING-A2` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-005` | `GR-TNS-PRS-01`, `GR-ASP-LEX-01` | `LEX-HOUSING-FIX` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-006` | `GR-DEG-ADJ-01` | `LEX-CONTRACT-BASIC` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-007` | `PRAG-PAN-01`, `GR-Q-YESNO-01`, `GR-CAS-GEN-01` | `LEX-URZAD-A2` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-008` | `GR-TNS-PRS-01`, `GR-CAS-GEN-01` | `LEX-URZAD-A2` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-009` | `GR-AGR-ADJ-01`, `ORTH-CORE-01` | `LEX-FORMS-A2` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-010` | `GR-TNS-PRS-01`, `GR-PRO-REFL-01`, `GR-ASP-LEX-01`, `PHON-NASAL-01`, `PHON-SZ-CZ-01`, `GR-PRO-INDEF-01`, `GR-SYN-TIME-01` | `LEX-MED-A2` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-011` | `GR-NUM-CARD-01`, `GR-MOD-IMP-01` | `LEX-PHARMA` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-012` | `PRAG-PAN-01`, `GR-TNS-PST-01`, `GR-CAS-GEN-01` | `LEX-SCHOOL-A2` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-013` | `PRAG-PAN-01`, `GR-DEG-ADJ-01`, `GR-CAS-INS-01` | `LEX-SCHOOL-A2` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-014` | `GR-CAS-ACC-01`, `GR-NEG-01` | `LEX-KINDER` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-015` | `GR-Q-YESNO-01`, `GR-NUM-CARD-01`, `GR-REK-VERB-01` | `LEX-BANK-A2` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-016` | `GR-TNS-PST-01`, `GR-NEG-01`, `GR-NUM-CARD-01` | `LEX-BANK-A2` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-017` | `GR-TNS-PST-01`, `GR-CAS-GEN-01`, `GR-ASP-LEX-01`, `GR-ASP-PST-01`, `GR-NEG-DOUBLE-01` | `LEX-COMPLAINT` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-018` | `GR-MOD-IMP-01`, `GR-MOD-VERB-01`, `GR-CAS-ACC-01` | `LEX-COMPLAINT` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-019` | `GR-TNS-FUT-01`, `GR-Q-YESNO-01`, `GR-CAS-INS-01` | `LEX-TRANS-A2` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-020` | `GR-TNS-PST-01`, `PRAG-PAN-01` | `LEX-TRANS-A2` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-021` | `PRAG-PAN-01`, `GR-MOD-VERB-01`, `GR-CAS-ACC-01` | `LEX-NEIGHBOR-A2` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-022` | `GR-MOD-COND-01`, `GR-MOD-VERB-01` | `LEX-NEIGHBOR-A2` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-023` | `GR-Q-YESNO-01`, `GR-TNS-PRS-01`, `PRAG-REPAIR-01` | `LEX-PHONE-A2` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-024` | `GR-SYN-SUB-01`, `GR-Q-YESNO-01` | `LEX-REPAIR-A2` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-025` | `GR-SYN-CAUSE-01`, `GR-MOD-VERB-01`, `PRAG-SOFTEN-01`, `GR-ASP-FUT-01`, `GR-PUNCT-LIST-01` | `LEX-REQUEST-A2` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-026` | `GR-NEG-01`, `GR-MOD-COND-01`, `GR-MOD-VERB-01` | `LEX-REFUSAL-A2` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-027` | `PRAG-PAN-01`, `GR-TNS-PST-01` | `LEX-COMPLAINT` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-028` | `GR-CAS-DAT-01`, `GR-TNS-PST-01` | `LEX-POLITENESS-A2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-029` | `PRAG-PAN-01`, `GR-DEG-ADV-01`, `GR-MOD-PERM-01` | `LEX-TV-SHIFT` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-030` | `PRAG-PAN-01`, `GR-NEG-01` | `LEX-TV-SHIFT` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-031` | `PRAG-PAN-01`, `GR-CAS-GEN-01`, `ORTH-CORE-01`, `GR-SYN-SUB-02`, `GR-DIM-01` | `LEX-EMAIL-A2` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-032` | `GR-TNS-PRS-01` | `LEX-CHAT-A2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-033` | `GR-TNS-PST-01`, `GR-ASP-CON-01`, `GR-WO-CLIT-01`, `GR-CAS-GEN-PREP-02` | `LEX-NARRATIVE-A2` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-034` | `GR-DEG-ADJ-01`, `GR-CAS-NOM-01`, `GR-PUNCT-CLAUSE-01`, `GR-CASE-NUM-01` | `LEX-COMPARE` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-035` | `GR-MOD-VERB-01`, `GR-CAS-ACC-01` | `LEX-OPINION-A2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-036` | `GR-SYN-SUB-01` | `LEX-RULES` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-037` | `GR-TNS-FUT-01`, `GR-MOD-VERB-01` | `LEX-MED-A2` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-038` | `GR-NEG-01`, `GR-CAS-ACC-01` | `LEX-HEALTH-LIMIT` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-039` | `GR-TNS-PRS-01`, `GR-Q-YESNO-01` | `LEX-SMALLTALK` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-040` | `GR-TNS-PRS-01`, `PRAG-PAN-01`, `GR-PUNCT-VOC-01`, `GR-VOC-NAME-01` | `LEX-WORK-LEAVE` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-041` | `GR-Q-YESNO-01`, `GR-NUM-CARD-01`, `GR-CAS-GEN-01` | `LEX-BILLS` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-042` | `GR-AGR-ADJ-01`, `GR-CAS-INS-01` | `LEX-DESCRIPTION` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-043` | `GR-MOD-IMP-01`, `GR-MOD-VERB-01` | `LEX-ADVICE-A2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-044` | `GR-TNS-PRS-01` | `LEX-NOTIFY` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-045` | `GR-NUM-CARD-01`, `GR-MOD-VERB-01`, `GR-TNS-FUT-01` | `LEX-SCHEDULING` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-046` | `GR-MOD-VERB-01`, `PRAG-PAN-01` | `LEX-URGENCY` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-047` | `GR-MO-VIR-01`, `GR-AGR-ADJ-01` | `LEX-PEOPLE` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR A2; Dz.U. zał.1 Katalog A | A2 | `FN-A2-048` | `GR-TNS-PRS-01` | `LEX-INSTRUCTIONS-A2` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-A2-INSTR` | standards-aligned / future (session_availability=not_announced 2026) |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-001` | `GR-ASP-CON-01`, `GR-SYN-SUB-01`, `GR-CAS-NOM-01`, `PRAG-MEDIATION-01`, `GR-REK-ADJ-01`, `GR-MOT-PREF-01`, `GR-SYN-COMP-01` | `LEX-WORK-B1` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-002` | `GR-WO-NEUT-01`, `GR-MOD-COND-01`, `PRAG-PAN-01` | `LEX-MEETING` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-003` | `GR-TNS-PST-01`, `GR-ASP-CON-01`, `GR-CAS-INS-01` | `LEX-CV-ORAL` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-004` | `PRAG-PAN-01`, `GR-SYN-SUB-01`, `ORTH-CORE-01` | `LEX-EMAIL-B1` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-005` | `GR-TNS-PST-01`, `GR-ASP-CON-01`, `GR-PRO-REFL-01` | `LEX-WORK-CONFLICT` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-006` | `GR-MOD-COND-01`, `GR-NUM-CARD-01`, `GR-SYN-SUB-01` | `LEX-HOUSING-B1` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-007` | `GR-SYN-SUB-01`, `GR-CAS-GEN-01` | `LEX-CONTRACT-B1` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-008` | `PRAG-PAN-01`, `GR-CAS-DAT-01` | `LEX-FORMAL-B1` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-009` | `GR-TNS-PRS-01`, `GR-ASP-CON-01`, `GR-SYN-SUB-01` | `LEX-URZAD-B1` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-010` | `GR-CAS-GEN-01`, `GR-MOD-VERB-01`, `PRAG-PAN-01`, `GR-NUM-VIR-01`, `GR-SYN-REL-01`, `GR-REPORT-01` | `LEX-DOCS-B1` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-011` | `GR-PASS-01` | `LEX-URZAD-READ` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-012` | `GR-ASP-CON-01`, `GR-TNS-PST-01`, `GR-NUM-CARD-01` | `LEX-MED-B1` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-013` | `GR-Q-YESNO-01`, `GR-MOD-COND-01`, `PRAG-PAN-01` | `LEX-MED-B1` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-014` | `GR-SYN-SUB-01`, `PRAG-PAN-01` | `LEX-COMPLAINT-B1` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-015` | `PRAG-PAN-01`, `GR-SYN-SUB-01`, `GR-MOD-COND-01` | `LEX-SCHOOL-B1` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-016` | `PRAG-PAN-01`, `GR-CAS-NOM-01`, `ORTH-CORE-01` | `LEX-SCHOOL-WRITE` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-017` | `GR-TNS-PRS-01` | `LEX-SCHOOL-READ` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-018` | `GR-TNS-PST-01`, `GR-NUM-CARD-01`, `PRAG-PAN-01` | `LEX-BANK-B1` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-019` | `GR-DEG-ADJ-01`, `GR-MOD-COND-01` | `LEX-BANK-B1` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-020` | `GR-SYN-SUB-01`, `GR-CAS-GEN-01`, `GR-NUM-COL-01`, `GR-SYN-COND-01`, `GR-WF-ASPECT-PAIR-01` | `LEX-COMPLAINT-B1` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-021` | `GR-NEG-01`, `PRAG-PAN-01`, `GR-MOD-IMP-01` | `LEX-REFUSAL-B1` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-022` | `GR-ASP-CON-01`, `GR-SYN-CAUSE-01` | `LEX-TRANS-B1` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-023` | `GR-MOD-COND-01`, `GR-MOD-VERB-01` | `LEX-TRANS-B1` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-024` | `PRAG-PAN-01`, `GR-MOD-COND-01`, `GR-SYN-SUB-01` | `LEX-NEIGHBOR-B1` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-025` | `GR-WO-NEUT-01`, `PRAG-PAN-01` | `LEX-MEETING` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-026` | `GR-SYN-SUB-01` | `LEX-PHONE-B1` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-027` | `GR-MOD-IMP-01`, `GR-CAS-NOM-01` | `LEX-PHONE-B1` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-028` | `PRAG-PAN-01`, `GR-TNS-PST-01`, `GR-ASP-CON-01` | `LEX-COMPLAINT-WRITE` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-029` | `GR-MOD-COND-01`, `PRAG-PAN-01` | `LEX-SOFTEN` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-030` | `GR-MOD-VERB-01`, `GR-SYN-SUB-01`, `GR-ASP-IMP-01`, `GR-WO-IS-01`, `GR-ASP-ITER-01` | `LEX-ASSERTIVE` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-031` | `PRAG-PAN-01`, `GR-MO-VIR-01` | `LEX-TV-B1` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-032` | `GR-CAS-VOC-01`, `PRAG-PAN-01` | `LEX-ADDRESS-FORMS` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-033` | `PRAG-PAN-01`, `GR-SYN-SUB-01`, `ORTH-CORE-01` | `LEX-LETTER-B1` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-034` | `PRAG-PAN-01` | `LEX-EMAIL-B1` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-035` | `GR-ASP-CON-01`, `GR-SYN-SUB-01`, `GR-WO-NEUT-01` | `LEX-NARRATIVE-B1` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-036` | `GR-MOD-COND-01`, `GR-DEG-ADJ-01`, `GR-SYN-SUB-01` | `LEX-ARGUMENT-B1` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-037` | `GR-TNS-PRS-01` | `LEX-MEDIATION-B1` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-038` | `GR-SYN-SUB-01` | `LEX-MEDIATION-B1` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-039` | `GR-NUM-CARD-01`, `GR-MO-VIR-01` | `LEX-NUM-B1` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-040` | `GR-ASP-CON-01`, `GR-TNS-PRS-01`, `GR-ASP-NEG-01`, `GR-WF-PREF-01` | `LEX-ASPECT-PAIRS` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-041` | `GR-SYN-SUB-01`, `GR-MOD-VERB-01` | `LEX-RULES-B1` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-042` | `GR-MOD-COND-01`, `GR-SYN-SUB-01` | `LEX-HYPOTHESIS` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-043` | `GR-DEG-ADJ-01`, `GR-ASP-CON-01` | `LEX-REVIEW` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-044` | `GR-TNS-PRS-01` | `LEX-INSTRUCTIONS-B1` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-045` | `PRAG-SOFTEN-01`, `PRAG-PAN-01` | `LEX-BADNEWS` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-046` | `GR-PRO-REFL-01`, `GR-MOD-COND-01` | `LEX-FEEDBACK` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-047` | `PRAG-PAN-01`, `GR-ASP-CON-01` | `LEX-SCHOOL-MED` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-048` | `GR-NUM-CARD-01`, `GR-TNS-FUT-01` | `LEX-BUDGET` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-049` | `GR-TNS-PRS-01` | `LEX-PRAG-META` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-050` | `GR-TNS-PRS-01`, `GR-ASP-PREF-01`, `GR-WF-NOM-01` | `LEX-EXAM-ORAL-B1` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-051` | `PRAG-PAN-01` | `LEX-EXAM-WRITE-B1` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-052` | `GR-REK-VERB-01`, `GR-ASP-CON-01` | — | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-053` | `GR-SYN-SUB-01` | `LEX-CONSUMER` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-054` | `GR-MOD-IMP-01`, `GR-TNS-FUT-01` | `LEX-PLANNING` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B1 independent user; Dz.U. zał.1 Katalog B / exam modules | B1 | `FN-B1-055` | `PRAG-PAN-01`, `GR-ASP-CON-01`, `GR-ASP-CTRL-01`, `GR-REK-VERB-02` | `LEX-SUMMARY` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B1-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-001` | `GR-MOD-COND-01`, `GR-SYN-SUB-01`, `GR-WO-NEUT-01`, `GR-PART-ACT-01` | `LEX-WORK-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-002` | `PRAG-SOFTEN-01`, `GR-ASP-CON-01`, `PRAG-PAN-01` | `LEX-FEEDBACK-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-003` | `GR-WO-NEUT-01`, `GR-SYN-SUB-01` | `LEX-DEBATE-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-004` | `PRAG-PAN-01`, `GR-PART-PASS-01` | `LEX-ANALYTIC` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-005` | `GR-MOD-COND-01`, `GR-SYN-SUB-01` | `LEX-CONTRACT-B2` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-006` | `PRAG-PAN-01`, `GR-ASP-CON-01` | `LEX-HOUSING-B2` | `ERR-UKR-04`, `ERR-RUS-04`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-007` | `GR-PASS-01` | `LEX-URZAD-B2` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-008` | `PRAG-PAN-01`, `GR-SYN-SUB-01` | `LEX-APPEAL` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-009` | `GR-MOD-COND-01`, `GR-SYN-SUB-01` | `LEX-MED-B2` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-010` | `PRAG-PAN-01`, `GR-PART-ADV-01` | `LEX-COMPLAINT-B2` | `ERR-UKR-15`, `ERR-RUS-15`, `ERR-BEL-15` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-011` | `PRAG-PAN-01`, `PRAG-MEDIATION-01`, `GR-SYN-SUB-01` | `LEX-SCHOOL-B2` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-012` | `PRAG-PAN-01` | `LEX-SCHOOL-WRITE-B2` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-013` | `PRAG-PAN-01`, `GR-NUM-CARD-01`, `GR-SYN-SUB-01` | `LEX-BANK-B2` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-014` | `GR-DEG-ADJ-01`, `GR-MOD-COND-01` | `LEX-COMPARE-B2` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-015` | `GR-ASP-CON-01`, `PRAG-PAN-01` | `LEX-CONSUMER-B2` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-016` | `GR-NEG-01`, `PRAG-PAN-01` | `LEX-REFUSAL-B2` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-017` | `PRAG-PAN-01` | `LEX-TRANS-B2` | `ERR-UKR-12`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-018` | `GR-MOD-COND-01` | `LEX-MEDIATION-B2` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-019` | `GR-WO-NEUT-01`, `PRAG-PAN-01` | `LEX-PUBLIC-SPEAK` | `ERR-UKR-15`, `ERR-RUS-01`, `ERR-BEL-01` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-020` | `GR-TNS-PRS-01`, `GR-IMPERS-SIE-01` | `LEX-PHONE-B2` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-021` | `PRAG-PAN-01`, `GR-SYN-SUB-01` | `LEX-LETTER-B2` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-022` | `PRAG-PAN-01`, `GR-WO-NEUT-01` | `LEX-REGISTER-FLEX` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-023` | `PRAG-PAN-01` | `LEX-TV-B2` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-024` | `GR-TNS-PRS-01` | `LEX-COLLOQ-CONTROL` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-025` | `GR-SYN-SUB-01`, `GR-WO-NEUT-01` | `LEX-ARGUMENT-B2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-026` | `GR-MOD-COND-01`, `GR-SYN-SUB-01` | `LEX-HYPOTHESIS-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-027` | `GR-TNS-PRS-01` | `LEX-MEDIATION-B2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-028` | `GR-SYN-SUB-01` | `LEX-EXPLAIN-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-029` | `PRAG-PAN-01` | `LEX-SMALLTALK-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-030` | `GR-ASP-CON-01`, `GR-MOD-IMP-01`, `GR-IMPERS-NO-01` | `LEX-PROCESS` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-031` | `GR-TNS-PRS-01` | `LEX-STANCE` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-032` | `PRAG-SOFTEN-01` | `LEX-REPAIR-B2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-033` | `GR-TNS-PRS-01` | `LEX-SYNTHESIS` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | portfolio_sample | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-034` | `GR-TNS-PRS-01` | `LEX-EXAM-ORAL-B2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-035` | `PRAG-PAN-01` | `LEX-EXAM-WRITE-B2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-036` | `GR-TNS-PRS-01` | — | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-037` | `GR-TNS-PRS-01` | `LEX-CRITICAL-READ` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-038` | `PRAG-PAN-01`, `GR-ASP-CON-01` | `LEX-APOLOGY-B2` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-039` | `GR-MOD-COND-01`, `PRAG-PAN-01` | `LEX-SETTLEMENT` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-040` | `PRAG-PAN-01`, `GR-PASS-SIE-01` | `LEX-PRIVACY-BASIC` | `ERR-UKR-16`, `ERR-RUS-16`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-041` | `GR-TNS-PRS-01` | `LEX-MEDIATION-B2` | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-042` | `GR-SYN-SUB-01` | `LEX-DISCUSSION` | `ERR-UKR-04`, `ERR-RUS-12`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-043` | `GR-PASS-01` | `LEX-FORMAL-B2` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-044` | `GR-WO-NEUT-01` | — | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-045` | `GR-TNS-PRS-01` | `LEX-MANIP-RESIST` | `ERR-UKR-20`, `ERR-RUS-20`, `ERR-BEL-20` | portfolio_sample | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-046` | `GR-WO-NEUT-01` | `LEX-PRESENTATION` | `ERR-UKR-02`, `ERR-RUS-09`, `ERR-BEL-12` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-047` | `GR-SYN-SUB-01` | `LEX-REVIEW-B2` | `ERR-UKR-09`, `ERR-RUS-09`, `ERR-BEL-09` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-048` | `GR-ASP-CON-01`, `GR-SYN-SUB-01` | `LEX-EVIDENCE` | `ERR-UKR-23`, `ERR-RUS-23`, `ERR-BEL-24` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-049` | `PRAG-PAN-01` | `LEX-PERSISTENCE` | `ERR-UKR-07`, `ERR-RUS-01`, `ERR-BEL-23` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |
| CEFR B2; Dz.U. zał.1 Katalog B / exam modules | B2 | `FN-B2-050` | `GR-TNS-PRS-01`, `GR-B2-STYLE-01` | — | `ERR-UKR-01`, `ERR-RUS-02`, `ERR-BEL-03` | task_performance + closed_item | `EXIT-B2-INSTR` | exam-prep |

## Reverse index: language concept → FN

| Concept | Intro | FN using it | Evidence types |
|---|---|---|---|
| `GR-AGR-ADJ-01` | A1 | `FN-A1-001`, `FN-A1-035`, `FN-A2-009`, `FN-A2-042`, `FN-A2-047` (5) | closed_item / task_performance |
| `GR-AGR-VPAST-01` | A1 | `FN-A1-003` (1) | closed_item / task_performance |
| `GR-ALT-STEM-01` | A1 | `FN-A1-009` (1) | closed_item / task_performance |
| `GR-ANIM-MASC-01` | A1 | `FN-A1-034` (1) | closed_item / task_performance |
| `GR-ASP-CON-01` | A2 | `FN-A2-033`, `FN-B1-001`, `FN-B1-003`, `FN-B1-005`, `FN-B1-009`, `FN-B1-012`, `FN-B1-022`, `FN-B1-028`… (20) | closed_item / task_performance |
| `GR-ASP-CTRL-01` | B1 | `FN-B1-055` (1) | closed_item / task_performance |
| `GR-ASP-FUT-01` | A2 | `FN-A2-025` (1) | closed_item / task_performance |
| `GR-ASP-IMP-01` | B1 | `FN-B1-030` (1) | closed_item / task_performance |
| `GR-ASP-ITER-01` | B1 | `FN-B1-030` (1) | closed_item / task_performance |
| `GR-ASP-LEX-01` | A1 | `FN-A1-032`, `FN-A2-001`, `FN-A2-005`, `FN-A2-010`, `FN-A2-017` (5) | closed_item / task_performance |
| `GR-ASP-NEG-01` | B1 | `FN-B1-040` (1) | closed_item / task_performance |
| `GR-ASP-PREF-01` | B1 | `FN-B1-050` (1) | closed_item / task_performance |
| `GR-ASP-PST-01` | A2 | `FN-A2-017` (1) | closed_item / task_performance |
| `GR-B2-STYLE-01` | B2 | `FN-B2-050` (1) | closed_item / task_performance |
| `GR-CAS-ACC-01` | A1 | `FN-A1-010`, `FN-A1-011`, `FN-A1-012`, `FN-A1-013`, `FN-A1-015`, `FN-A1-016`, `FN-A1-022`, `FN-A1-025`… (17) | closed_item / task_performance |
| `GR-CAS-ACC-02` | A1 | `FN-A1-012` (1) | closed_item / task_performance |
| `GR-CAS-DAT-01` | A2 | `FN-A1-024`, `FN-A2-028`, `FN-B1-008` (3) | closed_item / task_performance |
| `GR-CAS-FUNC-MAP-01` | A1 | `FN-A1-034` (1) | closed_item / task_performance |
| `GR-CAS-GEN-01` | A1 | `FN-A1-009`, `FN-A1-010`, `FN-A1-011`, `FN-A1-017`, `FN-A1-018`, `FN-A1-028`, `FN-A1-033`, `FN-A2-002`… (18) | closed_item / task_performance |
| `GR-CAS-GEN-02` | A1 | `FN-A1-015` (1) | closed_item / task_performance |
| `GR-CAS-GEN-03` | A1 | `FN-A1-019` (1) | closed_item / task_performance |
| `GR-CAS-GEN-04` | A1 | `FN-A1-022` (1) | closed_item / task_performance |
| `GR-CAS-GEN-05` | A1 | `FN-A1-032` (1) | closed_item / task_performance |
| `GR-CAS-GEN-PREP-02` | A2 | `FN-A2-033` (1) | closed_item / task_performance |
| `GR-CAS-INS-01` | A1 | `FN-A2-013`, `FN-A2-019`, `FN-A2-042`, `FN-B1-003` (4) | closed_item / task_performance |
| `GR-CAS-INS-02` | A1 | `FN-A1-033` (1) | closed_item / task_performance |
| `GR-CAS-LOC-01` | A1 | `FN-A1-002`, `FN-A1-003`, `FN-A1-012` (3) | closed_item / task_performance |
| `GR-CAS-NOM-01` | A1 | `FN-A1-001`, `FN-A1-002`, `FN-A1-004`, `FN-A1-026`, `FN-A1-034`, `FN-A2-034`, `FN-B1-001`, `FN-B1-016`… (9) | closed_item / task_performance |
| `GR-CAS-NOM-02` | A1 | `FN-A1-010` (1) | closed_item / task_performance |
| `GR-CAS-VOC-01` | A1 | `FN-A1-005`, `FN-A1-039`, `FN-B1-032` (3) | closed_item / task_performance |
| `GR-CASE-NUM-01` | A2 | `FN-A2-034` (1) | closed_item / task_performance |
| `GR-COMP-EQ-01` | A2 | `FN-A2-001` (1) | closed_item / task_performance |
| `GR-CONJ-TYPE-01` | A1 | `FN-A1-035` (1) | closed_item / task_performance |
| `GR-DAT-EXP-01` | A2 | `FN-A2-004` (1) | closed_item / task_performance |
| `GR-DEG-ADJ-01` | A2 | `FN-A2-006`, `FN-A2-013`, `FN-A2-034`, `FN-B1-019`, `FN-B1-036`, `FN-B1-043`, `FN-B2-014` (7) | closed_item / task_performance |
| `GR-DEG-ADV-01` | A2 | `FN-A2-029` (1) | closed_item / task_performance |
| `GR-DIM-01` | A2 | `FN-A2-031` (1) | closed_item / task_performance |
| `GR-EXIST-01` | A1 | `FN-A1-033` (1) | closed_item / task_performance |
| `GR-GEN-ADJ-01` | A1 | `FN-A1-015` (1) | closed_item / task_performance |
| `GR-GEN-MFN-01` | A1 | `FN-A1-001` (1) | closed_item / task_performance |
| `GR-GEN-PART-01` | A1 | `FN-A1-010` (1) | closed_item / task_performance |
| `GR-IMPERS-NO-01` | B2 | `FN-B2-030` (1) | closed_item / task_performance |
| `GR-IMPERS-SIE-01` | B2 | `FN-B2-020` (1) | closed_item / task_performance |
| `GR-INF-COMPL-01` | A1 | `FN-A1-019` (1) | closed_item / task_performance |
| `GR-MO-VIR-01` | A2 | `FN-A2-047`, `FN-B1-031`, `FN-B1-039` (3) | closed_item / task_performance |
| `GR-MOD-COND-01` | A2 | `FN-A2-022`, `FN-A2-026`, `FN-B1-002`, `FN-B1-006`, `FN-B1-013`, `FN-B1-015`, `FN-B1-019`, `FN-B1-023`… (20) | closed_item / task_performance |
| `GR-MOD-IMP-01` | A2 | `FN-A1-007`, `FN-A1-012`, `FN-A1-016`, `FN-A1-021`, `FN-A1-040`, `FN-A1-042`, `FN-A2-003`, `FN-A2-011`… (14) | closed_item / task_performance |
| `GR-MOD-PERM-01` | A2 | `FN-A2-029` (1) | closed_item / task_performance |
| `GR-MOD-VERB-01` | A1 | `FN-A1-021`, `FN-A1-022`, `FN-A1-023`, `FN-A1-037`, `FN-A1-040`, `FN-A2-002`, `FN-A2-003`, `FN-A2-018`… (21) | closed_item / task_performance |
| `GR-MOT-BASE-01` | A1 | `FN-A1-015` (1) | closed_item / task_performance |
| `GR-MOT-PREF-01` | B1 | `FN-B1-001` (1) | closed_item / task_performance |
| `GR-NEG-01` | A1 | `FN-A1-008`, `FN-A1-019`, `FN-A1-023`, `FN-A1-027`, `FN-A1-029`, `FN-A2-014`, `FN-A2-016`, `FN-A2-026`… (12) | closed_item / task_performance |
| `GR-NEG-DOUBLE-01` | A2 | `FN-A2-017` (1) | closed_item / task_performance |
| `GR-NEG-GEN-01` | A1 | `FN-A1-022` (1) | closed_item / task_performance |
| `GR-NUM-CARD-01` | A1 | `FN-A1-004`, `FN-A1-009`, `FN-A1-013`, `FN-A1-014`, `FN-A1-031`, `FN-A1-033`, `FN-A2-004`, `FN-A2-011`… (18) | closed_item / task_performance |
| `GR-NUM-CARD-05` | A1 | `FN-A1-003` (1) | closed_item / task_performance |
| `GR-NUM-COL-01` | B1 | `FN-B1-020` (1) | closed_item / task_performance |
| `GR-NUM-MONEY-01` | A1 | `FN-A1-010` (1) | closed_item / task_performance |
| `GR-NUM-ORD-01` | A1 | `FN-A1-009` (1) | closed_item / task_performance |
| `GR-NUM-SGPL-01` | A1 | `FN-A1-002` (1) | closed_item / task_performance |
| `GR-NUM-VIR-01` | B1 | `FN-B1-010` (1) | closed_item / task_performance |
| `GR-PART-ACT-01` | B2 | `FN-B2-001` (1) | closed_item / task_performance |
| `GR-PART-ADV-01` | B2 | `FN-B2-010` (1) | closed_item / task_performance |
| `GR-PART-PASS-01` | B2 | `FN-B2-004` (1) | closed_item / task_performance |
| `GR-PASS-01` | B2 | `FN-B1-011`, `FN-B2-007`, `FN-B2-043` (3) | closed_item / task_performance |
| `GR-PASS-SIE-01` | B2 | `FN-B2-040` (1) | closed_item / task_performance |
| `GR-PREP-DO-NA-01` | A1 | `FN-A1-001` (1) | closed_item / task_performance |
| `GR-PREP-Z-01` | A1 | `FN-A1-002` (1) | closed_item / task_performance |
| `GR-PRO-DEM-01` | A1 | `FN-A1-042` (1) | closed_item / task_performance |
| `GR-PRO-INDEF-01` | A2 | `FN-A2-010` (1) | closed_item / task_performance |
| `GR-PRO-INT-01` | A1 | `FN-A1-002` (1) | closed_item / task_performance |
| `GR-PRO-PERS-01` | A1 | `FN-A1-041` (1) | closed_item / task_performance |
| `GR-PRO-POSS-01` | A1 | `FN-A1-001` (1) | closed_item / task_performance |
| `GR-PRO-REFL-01` | A1 | `FN-A1-015`, `FN-A2-010`, `FN-B1-005`, `FN-B1-046` (4) | closed_item / task_performance |
| `GR-PRO-SWOJ-01` | A2 | `FN-A2-004` (1) | closed_item / task_performance |
| `GR-PUNCT-CLAUSE-01` | A2 | `FN-A2-034` (1) | closed_item / task_performance |
| `GR-PUNCT-LIST-01` | A2 | `FN-A2-025` (1) | closed_item / task_performance |
| `GR-PUNCT-VOC-01` | A2 | `FN-A2-040` (1) | closed_item / task_performance |
| `GR-Q-WH-01` | A1 | `FN-A1-009` (1) | closed_item / task_performance |
| `GR-Q-YESNO-01` | A1 | `FN-A1-007`, `FN-A1-008`, `FN-A1-013`, `FN-A1-018`, `FN-A1-020`, `FN-A1-026`, `FN-A1-030`, `FN-A1-036`… (18) | closed_item / task_performance |
| `GR-REK-ADJ-01` | B1 | `FN-B1-001` (1) | closed_item / task_performance |
| `GR-REK-PREP-01` | A1 | `FN-A1-035` (1) | closed_item / task_performance |
| `GR-REK-VERB-01` | A1 | `FN-A1-002`, `FN-A1-003`, `FN-A1-010`, `FN-A1-024`, `FN-A2-015`, `FN-B1-052` (6) | closed_item / task_performance |
| `GR-REK-VERB-02` | B1 | `FN-B1-055` (1) | closed_item / task_performance |
| `GR-REK-VERB-DAT-01` | A2 | `FN-A2-001` (1) | closed_item / task_performance |
| `GR-REPORT-01` | B1 | `FN-B1-010` (1) | closed_item / task_performance |
| `GR-SYN-CAUSE-01` | A1 | `FN-A2-025`, `FN-B1-022` (2) | closed_item / task_performance |
| `GR-SYN-COMP-01` | B1 | `FN-B1-001` (1) | closed_item / task_performance |
| `GR-SYN-COND-01` | B1 | `FN-B1-020` (1) | closed_item / task_performance |
| `GR-SYN-COORD-01` | A1 | `FN-A1-019` (1) | closed_item / task_performance |
| `GR-SYN-REL-01` | B1 | `FN-B1-010` (1) | closed_item / task_performance |
| `GR-SYN-SUB-01` | A1 | `FN-A2-024`, `FN-A2-036`, `FN-B1-001`, `FN-B1-004`, `FN-B1-006`, `FN-B1-007`, `FN-B1-009`, `FN-B1-014`… (34) | closed_item / task_performance |
| `GR-SYN-SUB-02` | A2 | `FN-A2-031` (1) | closed_item / task_performance |
| `GR-SYN-TIME-01` | A2 | `FN-A2-010` (1) | closed_item / task_performance |
| `GR-TIME-EXPR-01` | A1 | `FN-A1-003` (1) | closed_item / task_performance |
| `GR-TNS-FUT-01` | A1 | `FN-A1-014`, `FN-A2-002`, `FN-A2-019`, `FN-A2-037`, `FN-A2-045`, `FN-B1-048`, `FN-B1-054` (7) | closed_item / task_performance |
| `GR-TNS-FUT-02` | A1 | `FN-A1-012` (1) | closed_item / task_performance |
| `GR-TNS-PRS-01` | A1 | `FN-A1-001`, `FN-A1-006`, `FN-A1-017`, `FN-A1-019`, `FN-A1-020`, `FN-A1-025`, `FN-A1-027`, `FN-A1-029`… (39) | closed_item / task_performance |
| `GR-TNS-PST-01` | A1 | `FN-A2-012`, `FN-A2-016`, `FN-A2-017`, `FN-A2-020`, `FN-A2-027`, `FN-A2-028`, `FN-A2-033`, `FN-B1-003`… (12) | closed_item / task_performance |
| `GR-TV-AGR-01` | A1 | `FN-A1-032` (1) | closed_item / task_performance |
| `GR-VERB-IRREG-01` | A1 | `FN-A1-041` (1) | closed_item / task_performance |
| `GR-VOC-NAME-01` | A2 | `FN-A2-040` (1) | closed_item / task_performance |
| `GR-WF-ASPECT-PAIR-01` | B1 | `FN-B1-020` (1) | closed_item / task_performance |
| `GR-WF-NOM-01` | B1 | `FN-B1-050` (1) | closed_item / task_performance |
| `GR-WF-PREF-01` | B1 | `FN-B1-040` (1) | closed_item / task_performance |
| `GR-WO-CLIT-01` | A2 | `FN-A2-033` (1) | closed_item / task_performance |
| `GR-WO-IS-01` | B1 | `FN-B1-030` (1) | closed_item / task_performance |
| `GR-WO-NEUT-01` | A1 | `FN-B1-002`, `FN-B1-025`, `FN-B1-035`, `FN-B2-001`, `FN-B2-003`, `FN-B2-019`, `FN-B2-022`, `FN-B2-025`… (10) | closed_item / task_performance |
| `GR-WO-Q-01` | A1 | `FN-A1-012` (1) | closed_item / task_performance |
| `GR-ZNA-WIED-01` | A1 | `FN-A1-042` (1) | closed_item / task_performance |
| `ORTH-CH-H-01` | A1 | `FN-A1-006` (1) | closed_item / task_performance |
| `ORTH-CORE-01` | A1 | `FN-A1-034`, `FN-A2-009`, `FN-A2-031`, `FN-B1-004`, `FN-B1-016`, `FN-B1-033` (6) | closed_item / task_performance |
| `ORTH-IY-01` | A1 | `FN-A1-035` (1) | closed_item / task_performance |
| `ORTH-OU-01` | A1 | `FN-A1-034` (1) | closed_item / task_performance |
| `ORTH-RZ-Z-01` | A1 | `FN-A1-035` (1) | closed_item / task_performance |
| `PHON-CI-SI-ZI-01` | A1 | `FN-A1-007` (1) | closed_item / task_performance |
| `PHON-CORE-01` | A1 | `FN-A1-005` (1) | closed_item / task_performance |
| `PHON-NASAL-01` | A2 | `FN-A2-010` (1) | closed_item / task_performance |
| `PHON-SZ-CZ-01` | A1 | `FN-A2-010` (1) | closed_item / task_performance |
| `PRAG-MEDIATION-01` | B1 | `FN-B1-001`, `FN-B2-011` (2) | closed_item / task_performance |
| `PRAG-PAN-01` | A1 | `FN-A1-005`, `FN-A1-006`, `FN-A1-016`, `FN-A1-017`, `FN-A1-020`, `FN-A1-023`, `FN-A1-028`, `FN-A1-030`… (64) | closed_item / task_performance |
| `PRAG-REPAIR-01` | A1 | `FN-A1-007`, `FN-A1-008`, `FN-A2-023` (3) | closed_item / task_performance |
| `PRAG-SOFTEN-01` | A2 | `FN-A2-025`, `FN-B1-045`, `FN-B2-002`, `FN-B2-032` (4) | closed_item / task_performance |