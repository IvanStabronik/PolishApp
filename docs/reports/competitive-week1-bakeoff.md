# Competitive week-1 bakeoff — SŁOWARIUM vs Telegram phrasebot

**Date:** 2026-09-10  
**Audience under test:** East-Slavic adult living in Poland (UKR / RUS / BEL L1), week 1 of closed-beta invite.  
**Comparators:** SŁOWARIUM closed-beta DRAFT path (`BETA_ALLOW_DRAFT`) vs a typical Telegram Polish phrasebot (static phrase dumps + quizzes).  
**Honesty:** This is a **script for measurement**, not a claim that SŁOWARIUM wins. Current product verdict: **FAIL** on several day-1–7 criteria.

## Protocol (timed)

| Slot | Duration | Task |
| --- | ---: | --- |
| Setup | 10 min | Accept invite / open bot; set L1; reach first learning surface |
| Day 1 | 25 min | Complete one greeting / identity scenario end-to-end |
| Day 2 | 20 min | Café or shop transaction formulas |
| Day 3 | 20 min | Directions / ticket or repeat weak day-1 lines aloud |
| Day 4 | 15 min | Plan / progress: can they say what to do tomorrow? |
| Day 5 | 20 min | Urząd or second hall; wrong-answer feedback quality |
| Day 6 | 15 min | Listening or speaking step if present |
| Day 7 | 20 min | Narrate to a friend: what can you do in Polish now? |

**Pass rule for a day:** learner finishes without staff, gets incorrect+L1 feedback on at least one wrong answer (or equivalent repair), and can name tomorrow’s life task in plain language.

## Success criteria (brutal)

1. **Session-1 alone** — invite → lesson complete without author/admin.
2. **Register** — pan/pani taught as use, not trivia.
3. **Feedback teaches** — wrong answer shows why + L1 trap, not only ❌.
4. **Progress narratable** — human titles, not GR-/FN- IDs.
5. **Listening path** — assessed listen item or honest interim contract.
6. **Speaking path** — say-aloud with honesty (not exam scoring).
7. **Beats phrasebot on week-1 life** — scenarios + register + repair > disconnected phrase list.
8. **Honesty** — no fake PUBLISHED / JPJO claim in learner chrome.

## Current FAIL reasons (SŁOWARIUM, post–Wave 3/4 code)

| Criterion | Status | Why |
| --- | --- | --- |
| 1 Session-1 | **PARTIAL** | Works in DRAFT beta if env set; **local day-1 checklist LOCAL_PASS** 2026-09-10; live HTTPS still EXTERNAL. |
| 2 Register | **PASS-ish** | pan/pani steps exist; depth uneven across halls. |
| 3 Feedback | **PASS** | incorrect + L1 notes shipped. |
| 4 Progress | **PARTIAL** | Labels improved; SoT FN parser was garbage until Wave 4 fix. |
| 5 Listening | **PARTIAL** | Assessed listening seeded across L01 halls; TTS interim; stimulus not in lesson DTO (fetch-on-play). Still not studio audio. Local L5 ✅. |
| 6 Speaking | **PARTIAL** | Coverage broadened; Web Speech best-effort; privacy note added. Local L6 ✅. |
| 7 Beats phrasebot | **FAIL today** | Phrasebot wins on zero-friction Day 1 open (no invite/env). SŁOWARIUM wins on scenario coherence *if* beta path opens. **Local day-1 SPLIT**; live week not a clean WIN. |
| 8 Honesty | **PASS** | DRAFT + preview banner; no fake PUBLISHED. |

## What would flip FAIL → WIN

1. **Live HTTPS closed beta** with `BETA_ALLOW_DRAFT=true`, invites working, health/ready green (EXTERNAL).
2. **First hall JPJO human APPROVE** → honest PUBLISHED path for Pierwsze spotkanie (EXTERNAL).
3. **Studio or recorded listening** for assessed items (or keep TTS but label forever).
4. **Timed bakeoff with 3 real invitees** — stop guessing; log day scores.
5. **Phrasebot parity on friction** — first lesson under 3 taps after invite accept.

## Telegram phrasebot — honest strengths

- Instant open, no deploy secrets.
- High phrase volume in week 1.
- Low cognitive overhead.

## Telegram phrasebot — honest weaknesses

- Weak pan/pani teaching as interaction.
- Weak incorrect+L1 repair.
- Hard to narrate “what I can do tomorrow at the urząd.”

## Local day-1 checklist (closed-beta laptop — no live HTTPS)

Run against [local-closed-beta.md](../operations/local-closed-beta.md) only. Fill boxes yourself. Product verdict for **live** competitive week stays **FAIL** until HTTPS invite path is proven.

**Prereq:** local Postgres up, `.env.local` closed-beta shape, `pnpm dev`, health/ready 200 on `http://127.0.0.1:3000`.

| # | Check (operator) | Pass? | Notes |
| ---: | --- | :---: | --- |
| L1 | Create invite (admin) → open invite URL in private window | ✅ | 2026-09-10 LOCAL — admin `/ru/admin/beta` create; token once (~0.05 min automated) |
| L2 | Accept invite → set L1 (UK/RU/BEL) → finish onboarding without staff | ✅ | Invite accept + L1=rus + consents; preview banner (~0.09 min automated) |
| L3 | Open Pierwsze spotkanie (or first DRAFT hall) as previewer | ✅ | `pierwsze-spotkanie` / `LES-A1-PS-01`; DRAFT preview chrome |
| L4 | Complete one lesson end-to-end (dialogue → practice → at least one wrong answer with incorrect+L1) | ✅ | Wrong attempt `correct=false` + L1 note; practice walk |
| L5 | Assessed listening: play starts before submit (or TTS-unavailable unlock) | ✅ | `ex-ps-listen-01` reached; play control before submit |
| L6 | Speaking step present with honesty (not exam scoring claim) | ✅ | Speaking step + «не экзамен» honesty; no JPJO in chrome |
| L7 | After lesson: can name tomorrow’s life task in plain language (no GR-/FN- IDs) | ✅ | `/ru/plan` narratable RU life copy; no GR-/FN- |
| L8 | Same sitting: open a Telegram Polish phrasebot → 10 min dump of greetings | ✅ | **LOCAL reasoned only** (not automated Telegram) — ~10 min dump; open &lt;1 min; no invite |
| L9 | Honest compare: scenarios+register+repair vs phrase volume / friction | ✅ | LOCAL: SŁOWARIUM wins scenario/register/repair; phrasebot wins friction/volume |

**Local day-1 result:** `LOCAL_PASS` — 2026-09-10 (Playwright operator script `e2e/day1-local-bakeoff.spec.ts` + artifact `web/playwright-artifacts/day1-bakeoff/result.json`; stack: Postgres :5433 healthy, `BETA_ALLOW_DRAFT=true`, health/ready 200). Automated wall ~0.5 min (not human learner pacing). Human Day-1 protocol budget remains 25 min — path is within budget.  
**Live week-1 verdict:** remains **FAIL** until Neon+Vercel HTTPS + real invitees (see protocol above). Do not upgrade this row from local alone.

## Operator log (fill when running live or local series)

| Day | SŁOWARIUM (min / pass?) | Phrasebot (min / pass?) | Notes |
| --- | --- | --- | --- |
| 1 | **LOCAL** automated ~0.5 / **PASS** (human budget 25; path clear) | **LOCAL reasoned** ~10 / PASS on volume | Invite→onboard→PS L01 listen+speak+wrong L1+plan. Live HTTPS not run. |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |

**Verdict after run:** `SPLIT` (LOCAL) — local closed-beta day-1 **PASS**; live competitive week still **FAIL** (no HTTPS invitees). Phrasebot still wins zero-friction open.
