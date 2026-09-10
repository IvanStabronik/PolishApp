# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–6 foundations only — **not** reference quality.  
**Wave 4 re-audit (honest):** ~**30 / 50** against `reference-quality-bar.md` (prior “34” was soft).  
**Wave 5 estimate:** ~**32–33 / 50** — café listening + deepen + ops docs + stimulus harden; EXTERNAL wall unchanged.  
**Wave 6 re-audit (honest):** ~**32.5 / 50** — CODE-DOABLE substance landed; further content/improve waves toward the bar are **diminishing-return waste** until EXTERNAL unlock. Never claim reference quality.

### STOP RULE

**No more content / improve waves marketed toward reference quality** until [`external-unblock-wizard.md`](../operations/external-unblock-wizard.md) has **at least one real Done row** — either live HTTPS smoke (§4) **or** a JPJO human decision (§3). Optional micro-fixes only (e.g. server play-gate, PS L02/03 listen) — not another scored “wave toward reference.”

### Local closed-beta smoke (2026-09-10)

| Check | Result |
| --- | --- |
| Postgres `docker compose` :5433 | **PASS** (healthy) |
| `pnpm db:migrate` + `pnpm db:seed` | **PASS** (5 A1 modules DRAFT) |
| `.env.local` closed-beta shape (`BETA_ALLOW_DRAFT=true`, `DEMO_*=false`) | **PASS** (`ops:validate-env` OK) |
| `GET /api/health` / `GET /api/ready` | **PASS** 200 / 200 |
| Admin sign-in + DRAFT halls on `/ru/dashboard` | **PASS** (5 halls) |
| Open lesson `LES-A1-WK-01` | **PASS** 200 + preview honesty |
| Ordinary learner (no previewer) DRAFT halls | **PASS** (0 hall links) |

**Blocker during smoke:** stale `node` on `127.0.0.1:3000` made health hang — documented in [local-closed-beta.md](../operations/local-closed-beta.md). Not an app defect.

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
5. **Honesty** — re-audit ~**32.5 / 50**; EXTERNAL wall unchanged (Railway + JPJO). No fake PUBLISHED.
6. **Local closed-beta path** — proven **PASS** (see smoke table above). Not live HTTPS; not JPJO.

## Still broken vs reference bar

1. TTS ≠ studio listening (FUN-110 / V2). Network tab can still see TTS `textPl` when no `audioUrl` (interim).
2. Speaking recognition best-effort — not exam scoring.
3. All content **DRAFT** — no JPJO PUBLISHED hall (§7). **EXTERNAL**
4. Competitive week-1 not yet **run** with real invitees (script only).
5. Live HTTPS not proven without Railway/host secrets. **EXTERNAL**
6. Admin vs learner craft — freeze held; recheck §9 after player polish.
7. Play-gate is client-side (honest UX); server does not yet require play evidence on attempt.

## After STOP RULE — human unlock only

Do **not** start Wave 7 as another content deepen. Founder path = [external-unblock-wizard.md](../operations/external-unblock-wizard.md):

1. **Live HTTPS proof** — Railway/host secrets + `BASE_URL` health/ready (§1–§2, §4).
2. **JPJO human review** — calendar + first hall APPROVE/REJECT in packet (§3; no AI self-approve).
3. **Invite path on live** — same closed-beta flags as local (`BETA_ALLOW_DRAFT=true`, `DEMO_*=false`).

Optional micro-fixes (not a reference wave): server-side play evidence; PS L02/03 listen polish; studio audio pipeline; timed bakeoff log.

## External blockers (track)

- Railway / host secrets and service ID (wizard §1).
- Independent JPJO reviewer calendar (wizard §3).
- Production `INVITE_TOKEN_PEPPER`, DB, auth if not provisioned.
- Browser TTS / SpeechRecognition variance.

## Admin craft freeze

Still in force. No new admin/author features this wave.

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
