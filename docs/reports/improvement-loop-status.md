# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–6 foundations only — **not** reference quality.  
**Wave 4 re-audit (honest):** ~**30 / 50** against `reference-quality-bar.md` (prior “34” was soft).  
**Wave 5 estimate:** ~**32–33 / 50** — café listening + deepen + ops docs + stimulus harden; EXTERNAL wall unchanged.  
**Wave 6 estimate (this pass):** still ~**32–33 / 50** on the bar — hall deepen + hard listening foils + play-gate + stimulus tests land CODE-DOABLE substance, but EXTERNAL wall (Railway HTTPS proof + JPJO) still blocks reference quality. Never claim reference quality.

## Wave 3 — shipped (summary)

1. Session reliability — `ensureOpenLessonSession` on lesson SSR + first attempt; orphan attempts in window.
2. Hub TTS on dialogue / key lines.
3. Speaking on PS L01–L03 + café L01.
4. PS deepen + assessed listening seed (`listening` type + migration 0008).
5. Habit / plan life-outcome copy (then still spotkanie-biased).
6. Concept labels + broken SoT preference (FN parser bug latent).
7. HTTPS dry-run checklist; admin craft freeze.

## Wave 3 re-audit must-fixes — shipped in Wave 4

| Fix | Status |
| --- | --- |
| FN SoT parser (`\s` crossed CRLF → `**ID:**` junk) | **Fixed** — horizontal WS only + Title(PL) block parse + usable-title gate |
| JPJO in learner chrome (`speakingHonesty` etc.) | **Fixed** — adult honesty without ops acronym |
| Listening `audioTextPl` on client DTO | **Fixed** — fetch-on-play API; DTO has `hasTtsStimulus` only |
| Adaptive planGoal by hall | **Fixed** — `hallKey` + nested i18n (café / tram / urząd / sklep / spotkanie) |

## Wave 4 — honest re-audit (~30/50)

What landed: FN SoT fix, DTO listening leak closed for lesson payload, hall-keyed plan copy, speak/listen seeds on several L01s (not café), competitive bakeoff script, JPJO hall packet `NOT_STARTED`, craft softenings.

Why not 34: **w-kawiarni still had zero assessed listening**; live HTTPS + JPJO + bakeoff execution still EXTERNAL; TTS ≠ studio; speaking not exam-grade; all content DRAFT. Soft inflation corrected here.

## Wave 5 — results

1. **Café deepen + listening** — `w-kawiarni` L01–L03: assessed `listening`, productive dual gaps, adult distractors, distinct UK/BEL/RU L1; module bumped. Still **DRAFT**.
2. **Sklep L01 deepen** — productive dual gap + sharper distractors/L1; listening retained.
3. **Listening stimulus API** — same-origin + beta gate + rate limit; prefer `audioUrl` alone (no `textPl`) when URL present.
4. **Plan UI** — weak/error items show `humanConceptLabel` (not raw GR-/FN- IDs).
5. **Ops** — `docs/operations/local-closed-beta.md`, `docs/operations/external-unblock-wizard.md`.
6. **Honesty** — Wave 4 regraded to ~30/50; Wave 5 held at ~32–33/50; no fake PUBLISHED / JPJO.

## Wave 6 — results this pass

1. **Hall deepen (café/PS L01 quality bar)** — `w-sklepie` L02–L03; `droga-i-transport` L01–L03; `pierwsza-sprawa-w-urzedzie` L01–L03: speaking where missing, assessed listening on L02/L03, productive dual gaps, adult distractors, distinct L1; versions bumped; all still **DRAFT**.
2. **Hard listening foils** — replaced cross-hall cartoon distractors (paszport / bilety / urząd giveaways) with same-scenario near-minimal foils on café + sklep/droga/urząd listening (new + existing).
3. **Listen play-gate** — `ExercisePlayer` requires a successful play start before submit; hint copy in RU/UK/PL.
4. **Stimulus API tests** — unit coverage for same-origin 403, unauthorized 401, rate-limit 429, `audioUrl` without `textPl`.
5. **Honesty** — score still ~**32–33 / 50**; EXTERNAL wall unchanged (Railway + JPJO). No fake PUBLISHED.

## Still broken vs reference bar

1. TTS ≠ studio listening (FUN-110 / V2). Network tab can still see TTS `textPl` when no `audioUrl` (interim).
2. Speaking recognition best-effort — not exam scoring.
3. All content **DRAFT** — no JPJO PUBLISHED hall (§7). **EXTERNAL**
4. Competitive week-1 not yet **run** with real invitees (script only).
5. Live HTTPS not proven without Railway/host secrets. **EXTERNAL**
6. Admin vs learner craft — freeze held; recheck §9 after player polish.
7. Play-gate is client-side (honest UX); server does not yet require play evidence on attempt.

## Wave 7 = after human unlock OR further polish

1. **JPJO human review** — calendar + first hall APPROVE/REJECT in packet (no AI self-approve).
2. **Live HTTPS proof** — operator completes [external-unblock-wizard.md](../operations/external-unblock-wizard.md).
3. **Invite path on live** — `BETA_ALLOW_DRAFT=true`, `DEMO_*=false`.
4. Optional: studio audio pipeline, server-side play evidence, timed bakeoff execution log.

## External blockers (track)

- Railway / host secrets and service ID (wizard §1).
- Independent JPJO reviewer calendar (wizard §3).
- Production `INVITE_TOKEN_PEPPER`, DB, auth if not provisioned.
- Browser TTS / SpeechRecognition variance.

## Admin craft freeze

Still in force. No new admin/author features this wave.

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
