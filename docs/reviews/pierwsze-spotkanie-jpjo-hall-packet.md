# Pierwsze spotkanie — independent JPJO review packet (hall 1)

**Review status:** `NOT_STARTED`  
**Publication:** blocked — do **not** mark PUBLISHED or claim JPJO approval.  
**Scope:** first A1 hall only — module `pierwsze-spotkanie` / `MOD-A1-PIERWSZE-SPOTKANIE`.  
**Related:** [`a1-jpjo-review-packet.md`](./a1-jpjo-review-packet.md) (curriculum inventory matrix), [`a1-source-verification.md`](./a1-source-verification.md).

Allowed status values: `NOT_STARTED` · `IN_REVIEW` · `COMPLETED`.

---

## One-sitting reviewer path (~60–90 min)

1. Open local or live preview with DRAFT access (`BETA_ALLOW_DRAFT=true`, invitee = learner+previewer).
2. Hall home → complete **L01 → L02 → L03** in order (dialogue, key lines, speaking, practice, mini-check).
3. On each **listening** item: press play (or note TTS-unavailable unlock), then answer — foils must be same-scenario, not café/ticket giveaways.
4. Spot-check UK / RU / BEL L1 notes on 2–3 wrong answers (distinct traps, not copies).
5. Fill the log below (`APPROVE` / `APPROVE_WITH_CHANGES` / `REJECT` / `NEEDS_EVIDENCE`). Leave status `NOT_STARTED` until you actually start → then `IN_REVIEW` → `COMPLETED`.
6. **Stop.** Do not flip YAML to `PUBLISHED`. Product gates (DEC-016 / live HTTPS) are separate.

---

## Wave 6+ inventory (honest counts — still DRAFT)

| Lesson | Lesson ID | Speaking | Assessed listening | Exercises (approx) |
| --- | --- | ---: | ---: | ---: |
| Powitanie i przedstawienie | `LES-A1-PS-01` | 1 | 1 (`EX-A1-PS-LIS-01`) | 11 |
| Pytania o imię i pochodzenie | `LES-A1-PS-02` | 1 | 1 (`EX-A1-PS-L2-LIS-01`) | 9 |
| Samodzielne pierwsze spotkanie | `LES-A1-PS-03` | 1 | 1 (`EX-A1-PS-L3-LIS-01`) | 9 |

**Hall totals:** 3 lessons · 3 speaking steps · **3 assessed listening** · ~29 exercises · module version **3** · all **DRAFT** · `reviewer_id: null`.

Listening foils (micro-fix): same-scenario near-minimal (name vs skąd vs A pan? / close vs name). Café «сколько стоит кофе» giveaway removed from L01.

---

## What the human reviewer must verify

1. **Polish object language** — dialogue and key lines are adult, spoken Polish (pan/pani), not RU/UK calque.
2. **Instructional chrome** — RU prompts/explanations are short, adult, non-канцелярит; UK/BEL L1 notes are distinct traps, not RU copies.
3. **Exercise keys** — correct options are pedagogically right; distractors are plausible adult errors.
4. **Listening items** — prompt/options fair given TTS interim (no studio claim); stimulus text must not appear as visible answer key in learner UI.
5. **Speaking practice** — framed as training, not exam scoring; no false mastery claims.
6. **Curriculum links** — FN/SCN/LEX/concepts cited are coherent for A1 exit of this hall.
7. **Provenance honesty** — `status: DRAFT`, `reviewer_id: null`, `ai_assisted: true` until this review completes.
8. **No product theater** — reject any copy that implies government certificate or PUBLISHED release.

## Lesson export (IDs to open)

| Sort | Lesson ID | Slug | Title (PL) |
| ---: | --- | --- | --- |
| 1 | `LES-A1-PS-01` | `powitanie-i-przedstawienie` | Powitanie i przedstawienie |
| 2 | `LES-A1-PS-02` | `pytania-o-imie-i-pochodzenie` | Pytania o imię i pochodzenie |
| 3 | `LES-A1-PS-03` | `samodzielne-pierwsze-spotkanie` | Samodzielne pierwsze spotkanie |

**Module:** `MOD-A1-PIERWSZE-SPOTKANIE` · slug `pierwsze-spotkanie` · status **DRAFT**.

Paths under repo:

- `content/a1/modules/pierwsze-spotkanie/module.yaml`
- `content/a1/modules/pierwsze-spotkanie/lessons/01-powitanie-i-przedstawienie.yaml`
- `content/a1/modules/pierwsze-spotkanie/lessons/02-pytania-o-imie-i-pochodzenie.yaml`
- `content/a1/modules/pierwsze-spotkanie/lessons/03-samodzielne-pierwsze-spotkanie.yaml`

## Known AI-draft risks (call out explicitly)

- Over-smooth “textbook NPC” dialogue vs klatka reality.
- UK/BEL notes drifting toward RU wording.
- Distractors that are childish or impossible rather than adult L1 traps.
- Listening items authored against TTS — phonetics may not match a human recording later.
- Speaking recognition false confidence if UI language ever sounds like scoring.
- Version/provenance notes claiming review that did not happen (must stay null).

## How to mark APPROVE / REJECT

| Verdict | When | Required fields |
| --- | --- | --- |
| `APPROVE` | Hall ready to publish after gates | reviewer name, date, short rationale |
| `APPROVE_WITH_CHANGES` | Fixable language/key issues | reviewer, date, rationale, concrete corrections (lesson/exercise IDs) |
| `REJECT` | Blocks publication | reviewer, date, severity (`blocker` if publish-blocking), rationale |
| `NEEDS_EVIDENCE` | Missing normative/source backing | reviewer, date, severity, what evidence is missing |
| `NOT_REVIEWED` | Default until human starts | leave empty |

**Rules**

- Positive verdicts are **forbidden** while `Review status=NOT_STARTED`.
- AI must **never** self-APPROVE.
- On real start: set `Review status=IN_REVIEW`. On finish of all hall items: `COMPLETED`.
- Curriculum-wide matrix items remain in `a1-jpjo-review-packet.md` (16 rows) — this file is the **hall content** packet.

## Reviewer log (empty until human)

| Item | Entity | Verdict | Severity | Reviewer | Date | Rationale / correction |
| --- | --- | --- | --- | --- | --- | --- |
| Hall dialogue PS-01 | `LES-A1-PS-01` | `NOT_REVIEWED` | — | — | — | — |
| Hall dialogue PS-02 | `LES-A1-PS-02` | `NOT_REVIEWED` | — | — | — | — |
| Hall dialogue PS-03 | `LES-A1-PS-03` | `NOT_REVIEWED` | — | — | — | — |
| Exercises + L1 notes | `EX-A1-PS-*` | `NOT_REVIEWED` | — | — | — | — |
| Listening L01 | `EX-A1-PS-LIS-01` | `NOT_REVIEWED` | — | — | — | — |
| Listening L02 | `EX-A1-PS-L2-LIS-01` | `NOT_REVIEWED` | — | — | — | — |
| Listening L03 | `EX-A1-PS-L3-LIS-01` | `NOT_REVIEWED` | — | — | — | — |
| Speaking steps | `speaking_practice` | `NOT_REVIEWED` | — | — | — | — |

**Hall publish gate:** closed until human `COMPLETED` + product DEC-016 / HTTPS ops allow release. No fake PUBLISHED.
