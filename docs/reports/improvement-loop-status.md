# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–4 foundations only — **not** reference quality.  
**Re-audit (post–Wave 3):** ~**31 / 50** against `reference-quality-bar.md`.  
**Wave 4 estimate (this pass):** ~**34 / 50** — code/docs moved; EXTERNAL wall unchanged. Never claim reference quality.

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

## Wave 4 — results this pass

1. **Broader listening + speaking** — assessed `listening` + `speaking_practice` on L01 of w-sklepie, droga-i-transport, pierwsza-sprawa-w-urzedzie; café L02/L03 speaking. Still **DRAFT**; versions bumped.
2. **Competitive week-1 bakeoff** — `docs/reports/competitive-week1-bakeoff.md` (script + current FAIL honesty).
3. **JPJO hall packet** — `docs/reviews/pierwsze-spotkanie-jpjo-hall-packet.md`, status **`NOT_STARTED`** (no fake APPROVE).
4. **Learner craft** — previewNoMastery softened; MasteryBadge “Уверенно/Впевнено/Pewnie”; UK/BEL step title fallback; speaking privacy note for mic.
5. **Tests** — curriculum labels / listening DTO leak / hallKey plan / ensure export; content:validate + tsc + vitest expected green.

## Still broken vs reference bar

1. TTS ≠ studio listening (FUN-110 / V2).
2. Speaking recognition best-effort — not exam scoring.
3. All content **DRAFT** — no JPJO PUBLISHED hall (§7). **EXTERNAL**
4. Competitive week-1 not yet **run** with real invitees (script only).
5. Live HTTPS not proven without Railway/host secrets. **EXTERNAL**
6. Admin vs learner craft — freeze held; recheck §9 after player polish.

## Wave 5 = EXTERNAL wall (+ leftover code)

1. **JPJO human review** — calendar + first hall APPROVE/REJECT in packet (no AI self-approve).
2. **Live HTTPS proof** — operator completes dry-run with real `RAILWAY_*` / webhook / secrets; health/ready public.
3. **Invite path on live** — `BETA_ALLOW_DRAFT=true`, `DEMO_*=false`, invite pepper.
4. Optional code leftovers: studio audio pipeline, deeper speaking upload policy, remaining L02/L03 listening seeds, timed bakeoff execution log.

## External blockers (track)

- Railway / host secrets and service ID.
- Independent JPJO reviewer calendar.
- Production `INVITE_TOKEN_PEPPER`, DB, auth if not provisioned.
- Browser TTS / SpeechRecognition variance.

## Admin craft freeze

Still in force. No new admin/author features this wave.

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
