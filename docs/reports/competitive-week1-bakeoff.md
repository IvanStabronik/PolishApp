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
| 1 Session-1 | **LIVE_TUNNEL PASS** / durable **FAIL** | Local **LOCAL_PASS** 2026-09-10; **LIVE_TUNNEL** day-1 **PASS** 2026-09-15 (invite→plan on public HTTPS). Durable Neon/Vercel still EXTERNAL. |
| 2 Register | **PASS-ish** | pan/pani steps exist; depth uneven across halls. |
| 3 Feedback | **PASS** | incorrect + L1 notes shipped (UK+BEL). |
| 4 Progress | **PARTIAL** | Labels improved; SoT FN parser fixed; plan narratable on tunnel L7. |
| 5 Listening | **PARTIAL** | Assessed listening on path; edge-tts interim; L5 ✅ local + LIVE_TUNNEL. |
| 6 Speaking | **PARTIAL** | Web Speech best-effort + honesty; L6 ✅ local + LIVE_TUNNEL. |
| 7 Beats phrasebot | **SPLIT** | LIVE_TUNNEL: SŁOWARIUM wins scenario/register/repair once invitee has HTTPS; phrasebot still wins zero-friction open. Durable multi-day week still weak. |
| 8 Honesty | **PASS** | DRAFT + preview banner; no fake PUBLISHED / JPJO. |

## What would flip PARTIAL_TUNNEL → WIN

1. **Durable HTTPS closed beta** (Neon + Vercel) with `BETA_ALLOW_DRAFT=true`, invites working, health/ready green — **or** named tunnel + always-on host with stable hostname (EXTERNAL / founder).
2. **First hall JPJO human APPROVE** → honest PUBLISHED path for Pierwsze spotkanie (EXTERNAL).
3. **Studio or recorded listening** for assessed items (or keep TTS but label forever).
4. **Timed bakeoff with 3 real invitees** across days 2–7 — stop guessing; log day scores.
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

**Local day-1 result:** `LOCAL_PASS` — 2026-09-10 (Playwright `e2e/day1-local-bakeoff.spec.ts` + `web/playwright-artifacts/day1-bakeoff/result.json`). Automated wall ~0.5 min.

### LIVE_TUNNEL day-1 (2026-09-15) — honest, not Vercel

| Field | Value |
| --- | --- |
| Mode | **LIVE_TUNNEL** (Cloudflare quick tunnel → local :3000). **Not** durable Vercel/Neon. |
| Public URL | `https://namespace-buying-retailer-strength.trycloudflare.com` |
| Ran at (UTC) | **2026-09-15T16:23:17Z** |
| Spec | `e2e/day1-tunnel-bakeoff.spec.ts` + `playwright.tunnel.config.ts` |
| Result | **PASS** (L1–L9) — invite → onboard → PS L01 listen/speak/wrong+L1 → plan |
| Wall clock | ~0.59 min automated |
| Artifact | `web/playwright-artifacts/day1-tunnel-bakeoff/result.json` (gitignored) |
| Smoke | health/ready **200** via `1.1.1.1` + `curl --resolve` |

**Live week-1 verdict:** **PARTIAL_TUNNEL** — day-1 invite path proven on public HTTPS; hostname ephemeral; host machine must stay up; no timed days 2–7 with real invitees; durable Neon+Vercel still EXTERNAL. Do **not** claim production WIN.

## Operator log (fill when running live or local series)

| Day | SŁOWARIUM (min / pass?) | Phrasebot (min / pass?) | Notes |
| --- | --- | --- | --- |
| 1 | **LOCAL** ~0.5 / **PASS** (2026-09-10) | **LOCAL reasoned** ~10 / PASS on volume | Invite→onboard→PS L01 listen+speak+wrong L1+plan |
| 1 | **LIVE_TUNNEL** ~0.59 / **PASS** (2026-09-15) | reasoned ~10 / PASS volume | Same checklist on public HTTPS; **≠ Vercel** |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |

**Verdict after run:** `SPLIT` / `PARTIAL_TUNNEL` — day-1 **PASS** on local + LIVE_TUNNEL; durable competitive week still **FAIL** until Neon+Vercel (or named stable tunnel + always-on host) + real multi-day invitees. Phrasebot still wins zero-friction open.
