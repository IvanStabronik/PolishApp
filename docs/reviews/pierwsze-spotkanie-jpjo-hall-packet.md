# Pierwsze spotkanie — independent JPJO review packet (hall 1)

**Review status:** `NOT_STARTED`  
**Publication:** blocked — do **not** mark YAML `PUBLISHED` or claim JPJO approval.  
**Scope:** first A1 hall only — module `pierwsze-spotkanie` / `MOD-A1-PIERWSZE-SPOTKANIE`.  
**Related:** [`a1-jpjo-review-packet.md`](./a1-jpjo-review-packet.md) (curriculum inventory matrix, 16 rows), [`a1-source-verification.md`](./a1-source-verification.md).

Allowed status values: `NOT_STARTED` · `IN_REVIEW` · `COMPLETED`.

> **AI rule:** leave this file at `NOT_STARTED` with empty log verdicts until a **human** starts. No fake `APPROVE`.

---

## What this packet is for

One human JPJO (or equivalent methods) reviewer finishes **hall content** quality in one sitting (~60–90 min). Curriculum FN/SCN inventory stays in `a1-jpjo-review-packet.md` — do that separately if booked.

**Out of scope here:** Neon/Vercel deploy, product DEC-016 live HTTPS, flipping `status: PUBLISHED`.

---

## One-sitting path (do in order)

1. Open local or live preview with DRAFT access (`BETA_ALLOW_DRAFT=true`, invitee = learner+previewer).
2. Dashboard → hall **Pierwsze spotkanie** → complete **L01 → L02 → L03** in order (situation → dialogue → key lines → speaking → practice → mini-check).
3. On each **listening** item: press play (or note TTS-unavailable unlock), then answer — foils must stay same-scenario (name / skąd / closing), not café/ticket giveaways.
4. Spot-check **UK / RU / BEL** L1 notes on 2–3 wrong answers (distinct traps, not copies).
5. Fill the **Reviewer log** below. Set packet status `NOT_STARTED` → `IN_REVIEW` when you start → `COMPLETED` when all log rows have a real verdict.
6. Record **`reviewer_id`** (see below). **Stop.** Do not edit YAML to `PUBLISHED`.

---

## One-page checklist (print / paste)

Status stays `NOT_STARTED` until a human starts. AI must not tick APPROVE.

| ☐ | Gate | Pass criteria |
| --- | --- | --- |
| ☐ | Access | DRAFT preview opens; banner honest; no PUBLISHED claim |
| ☐ | L01 Polish | Adult spoken PL (`pan`/`pani`); no calque dialogue — `LES-A1-PS-01` |
| ☐ | L02 Polish | Same bar; identity / pochodzenie natural — `LES-A1-PS-02` |
| ☐ | L03 Polish | Same bar; hall exit coherent — `LES-A1-PS-03` |
| ☐ | Keys | Correct options pedagogically right; distractors = adult L1 traps |
| ☐ | L1 notes | UK / RU / BEL distinct on ≥2 wrong answers each locale spot-check |
| ☐ | Listening ×3 | Play-then-answer; same-scenario foils; no visible stimulus as key |
| ☐ | Speaking ×3 | Training honesty; no exam-score theater |
| ☐ | Provenance | YAML `status: DRAFT`, `reviewer_id: null` until this review completes |
| ☐ | Verdict | Fill log → packet `COMPLETED`; **do not** publish YAML |

**Reviewer name:** ________  
**`reviewer_id` string:** ________  
**Date (ISO):** ________  
**Hall verdict:** `APPROVE` / `APPROVE_WITH_CHANGES` / `REJECT` / `NEEDS_EVIDENCE`

---

## Lesson IDs to open

| Sort | Lesson ID | Slug | Title (PL) | Path |
| ---: | --- | --- | --- | --- |
| 1 | `LES-A1-PS-01` | `powitanie-i-przedstawienie` | Powitanie i przedstawienie | `content/a1/modules/pierwsze-spotkanie/lessons/01-powitanie-i-przedstawienie.yaml` |
| 2 | `LES-A1-PS-02` | `pytania-o-imie-i-pochodzenie` | Pytania o imię i pochodzenie | `content/a1/modules/pierwsze-spotkanie/lessons/02-pytania-o-imie-i-pochodzenie.yaml` |
| 3 | `LES-A1-PS-03` | `samodzielne-pierwsze-spotkanie` | Samodzielne pierwsze spotkanie | `content/a1/modules/pierwsze-spotkanie/lessons/03-samodzielne-pierwsze-spotkanie.yaml` |

**Module:** `MOD-A1-PIERWSZE-SPOTKANIE` · slug `pierwsze-spotkanie` · YAML status **DRAFT** · module `version` **5** · `reviewer_id: null`.

### Inventory (honest — still DRAFT)

| Lesson | Lesson ID | Speaking | Assessed listening | Exercises (approx) |
| --- | --- | ---: | ---: | ---: |
| Powitanie i przedstawienie | `LES-A1-PS-01` | 1 | 1 (`EX-A1-PS-LIS-01`) | 11 |
| Pytania o imię i pochodzenie | `LES-A1-PS-02` | 1 | 1 (`EX-A1-PS-L2-LIS-01`) | 10 |
| Samodzielne pierwsze spotkanie | `LES-A1-PS-03` | 1 | 1 (`EX-A1-PS-L3-LIS-01`) | 10 |

**Hall totals:** 3 lessons · 3 speaking steps · **3 assessed listening** · ~31 exercises · all **DRAFT**.

Listening foils (micro-fix expectation): same-scenario near-minimal (name vs skąd vs closing). Cross-hall café/ticket giveaways should fail review.

---

## What APPROVE / REJECT means

| Verdict | Meaning | Required fields in log |
| --- | --- | --- |
| `APPROVE` | Hall content is ready to publish **after** product gates (DEC-016 / live HTTPS). Language, keys, L1, listening, speaking honesty pass. | reviewer name, `reviewer_id`, date, short rationale |
| `APPROVE_WITH_CHANGES` | Fixable language/key/L1 issues; not a full rewrite. Publish only after listed corrections land. | reviewer, `reviewer_id`, date, rationale, **concrete** lesson/exercise IDs + corrections |
| `REJECT` | Blocks publication of this hall. Serious pedagogical/language failure or honesty breach. | reviewer, `reviewer_id`, date, severity (`blocker` if publish-blocking), rationale |
| `NEEDS_EVIDENCE` | Missing normative/source backing for a claim the hall depends on. | reviewer, `reviewer_id`, date, severity, what evidence is missing |
| `NOT_REVIEWED` | Default until human starts that row | leave empty (`—`) |

**Rules**

- Positive verdicts (`APPROVE` / `APPROVE_WITH_CHANGES`) are **forbidden** while packet `Review status=NOT_STARTED`.
- AI must **never** self-APPROVE or fill reviewer fields.
- On real start: set `Review status=IN_REVIEW`. When every log row has a human verdict: `COMPLETED`.
- Hall `APPROVE` ≠ automatic YAML `PUBLISHED`. Product ops remain separate.
- Curriculum matrix items remain in `a1-jpjo-review-packet.md` (16 rows).

---

## How to record `reviewer_id`

1. Choose a stable id string, e.g. `jpjo:anna.kowalska` or email local-part you will reuse.
2. Write it in the checklist header **and** every log row you complete.
3. After `COMPLETED` + hall `APPROVE` or `APPROVE_WITH_CHANGES` (and fixes done), a **maintainer** (not the AI inventing approval) may set YAML:

```yaml
provenance:
  reviewer_id: jpjo:anna.kowalska   # was null
```

on module + touched lessons — **only** when the human review actually finished. Until then keep `reviewer_id: null`.

Do **not** set `status: PUBLISHED` from this packet alone.

---

## What the human reviewer must verify

1. **Polish object language** — dialogue and key lines are adult, spoken Polish (`pan`/`pani`), not RU/UK calque.
2. **Instructional chrome** — RU prompts/explanations short, adult, non-канцелярит; UK/BEL L1 notes are distinct traps, not RU copies.
3. **Exercise keys** — correct options pedagogically right; distractors are plausible adult errors.
4. **Listening items** — prompt/options fair given TTS interim (no studio claim); stimulus text must not appear as visible answer key in learner UI.
5. **Speaking practice** — framed as training, not exam scoring; no false mastery claims.
6. **Curriculum links** — FN/SCN/LEX/concepts cited are coherent for A1 exit of this hall.
7. **Provenance honesty** — `status: DRAFT`, `reviewer_id: null`, `ai_assisted: true` until this review completes.
8. **No product theater** — reject copy that implies government certificate or PUBLISHED release.

## Known AI-draft risks (call out explicitly)

- Over-smooth “textbook NPC” dialogue vs klatka reality.
- UK/BEL notes drifting toward RU wording.
- Distractors that are childish or impossible rather than adult L1 traps.
- Listening items authored against TTS — phonetics may not match a human recording later.
- Speaking recognition false confidence if UI language ever sounds like scoring.
- Version/provenance notes claiming review that did not happen (must stay null).

---

## Reviewer log (empty until human)

| Item | Entity | Verdict | Severity | Reviewer / `reviewer_id` | Date | Rationale / correction |
| --- | --- | --- | --- | --- | --- | --- |
| Hall dialogue PS-01 | `LES-A1-PS-01` | `NOT_REVIEWED` | — | — | — | — |
| Hall dialogue PS-02 | `LES-A1-PS-02` | `NOT_REVIEWED` | — | — | — | — |
| Hall dialogue PS-03 | `LES-A1-PS-03` | `NOT_REVIEWED` | — | — | — | — |
| Exercises + L1 notes | `EX-A1-PS-*` | `NOT_REVIEWED` | — | — | — | — |
| Listening L01 | `EX-A1-PS-LIS-01` | `NOT_REVIEWED` | — | — | — | — |
| Listening L02 | `EX-A1-PS-L2-LIS-01` | `NOT_REVIEWED` | — | — | — | — |
| Listening L03 | `EX-A1-PS-L3-LIS-01` | `NOT_REVIEWED` | — | — | — | — |
| Speaking steps | `speaking_practice` | `NOT_REVIEWED` | — | — | — | — |
| **Hall rollup** | `MOD-A1-PIERWSZE-SPOTKANIE` | `NOT_REVIEWED` | — | — | — | — |

**Hall publish gate:** closed until human packet `COMPLETED` + product DEC-016 / HTTPS ops allow release. No fake PUBLISHED. No AI `APPROVE`.
