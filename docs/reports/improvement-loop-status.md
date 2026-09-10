# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–6 foundations only — **not** reference quality.  
**Wave 4 re-audit (honest):** ~**30 / 50** against `reference-quality-bar.md` (prior “34” was soft).  
**Wave 5 estimate:** ~**32–33 / 50** — café listening + deepen + ops docs + stimulus harden; EXTERNAL wall unchanged.  
**Wave 6 re-audit (honest):** ~**32.5 / 50** — CODE-DOABLE substance landed; further content/improve waves toward the bar are **diminishing-return waste** until EXTERNAL unlock. Never claim reference quality.  
**Post–stop-rule micro-fixes (2026-09-10):** ~**33 / 50** — server play-proof + PS L02/L03 listening + foil fix (`e7c7b1a`). Still **EXTERNAL** until live HTTPS or JPJO. Not a marketed wave.  
**Static listening audio (PS + café):** ~**33.5–34 / 50** — six edge-tts MP3s; stimulus `audioUrl` without `textPl`.  
**Full A1 assessed-listening audio (2026-09-10):** ~**34.5 / 50** — **15 / 15** static MP3s wired (sklep + droga + urząd L01–L03 added). §3 listening path at interim ceiling (edge-tts ≠ studio). GitHub Environment `private-beta` shell **exists** (secrets empty). **Primary deploy path: Vercel + Neon/Supabase** (Railway secondary). No live HTTPS. No JPJO. No fake PUBLISHED.

### Critical re-score (post full audio) — `/50`

| # | Criterion | /5 | Note |
| --- | --- | --- | --- |
| 1 | Session-1 life loop | 3.5 | Local closed-beta PASS; live invite path unproven |
| 2 | Feedback that teaches | 4.0 | incorrect + L1 on deepened halls |
| 3 | Listening + speaking path | 4.0 | All 15 assessed listen have `audio_url`; speaking still interim |
| 4 | Human-readable progress | 3.5 | Labels improved; habit clarity ok |
| 5 | Zero civilian ops jargon | 3.5 | Preview honesty; staff jargon out of learner chrome |
| 6 | BEL first-class L1 | 3.5 | Notes present; UI locale share remains |
| 7 | Content honesty contract | 4.0 | DRAFT + banner; no fake PUBLISHED |
| 8 | Deploy teaches someone | 3.0 | Runbooks + env shell; secrets / HTTPS EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | Freeze held |
| 10 | Competitive first week | 3.0 | Script only; not run with invitees |
| | **Total** | **~34.5** | Still far from reference; EXTERNAL wall |

### Waiting on founder (EXTERNAL)

**Blocked on human-owned steps only** — Neon/Supabase + Vercel project + env vars → `pnpm db:migrate` → live `BASE_URL` health·ready, and/or independent JPJO. Code cannot unlock this.

**Run:** [`scripts/founder-unblock.ps1`](../../scripts/founder-unblock.ps1) (primary on Windows) — see [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md). Paste the wizard’s Done/Blocked block back into chat when finished. Do not invent secrets; do not claim HTTPS without curl 200.

### STOP RULE

**No more content / improve waves marketed toward reference quality** until [`external-unblock-wizard.md`](../operations/external-unblock-wizard.md) has **at least one real Done row** — either live HTTPS smoke (§4) **or** a JPJO human decision (§3). Optional micro-fixes only (e.g. server play-gate, static audio) — not another scored “wave toward reference.”

### Micro-fixes under stop-rule exception (shipped)

| Fix | Status |
| --- | --- |
| Server listening play evidence on attempt (HMAC `listeningPlayToken` from stimulus; unlock via `/api/learning/listening-play-unlock` when TTS unavailable) | **Done** — `e7c7b1a`; client gate alone was PARTIAL |
| PS L02–L03 assessed listening + hard same-scenario foils; L01 café «сколько стоит кофе» giveaway removed | **Done** — `e7c7b1a`; still DRAFT |
| Founder unblock one-pager + interactive wizard | **Done** — [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md) + `scripts/founder-unblock.ps1` |
| GitHub Environment `private-beta` shell | **Done** — created via `gh api …/environments/private-beta` PUT; **secrets still empty** |
| Deploy story → Vercel + Neon/Supabase primary | **Done docs/config** — founder still must create Neon + Vercel accounts |
| Static assessed-listening audio — all 5 A1 halls L01–L03 | **Done** — **15×** MP3 under `web/public/audio/a1/`; YAML `audio_url`; see [`audio-assets.md`](../operations/audio-assets.md) |
| JPJO hall packet inventory refresh | **Done** — status remains `NOT_STARTED` |

Score estimate ~**34.5 / 50**. No fake PUBLISHED. No live HTTPS claimed. Waiting on founder **EXTERNAL**.

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
5. **Honesty** — re-audit ~**32.5 / 50**; EXTERNAL wall unchanged (Vercel/Neon + JPJO). No fake PUBLISHED.
6. **Local closed-beta path** — proven **PASS** (see smoke table above). Not live HTTPS; not JPJO.

## Still broken vs reference bar

1. Static edge-tts ≠ studio listening (FUN-110 / V2). All assessed items now have `audioUrl` (no `textPl` on stimulus) — still interim Neural TTS.
2. Speaking recognition best-effort — not exam scoring.
3. All content **DRAFT** — no JPJO PUBLISHED hall (§7). **EXTERNAL**
4. Competitive week-1 not yet **run** with real invitees (script only).
5. Live HTTPS not proven without Neon/Vercel (human). **EXTERNAL** — founder path: [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md).
6. Admin vs learner craft — freeze held; recheck §9 after player polish.
7. ~~Play-gate is client-side only~~ — **mitigated**: server requires `listeningPlayToken` (stimulus or `tts_unavailable` unlock). Still interim vs studio audio.

## After STOP RULE — human unlock only

Do **not** start Wave 7 as another content deepen. Founder path = run [`scripts/founder-unblock.ps1`](../../scripts/founder-unblock.ps1) → [FOUNDER-UNBLOCK-NOW.md](../operations/FOUNDER-UNBLOCK-NOW.md) + [external-unblock-wizard.md](../operations/external-unblock-wizard.md):

1. **Live HTTPS proof** — Neon + Vercel env + migrate + `BASE_URL` health/ready (§1–§2, §4).
2. **JPJO human review** — calendar + first hall APPROVE/REJECT in packet (§3; no AI self-approve).
3. **Invite path on live** — same closed-beta flags as local (`BETA_ALLOW_DRAFT=true`, `DEMO_*=false`).

Optional further micro-fixes (not a reference wave): studio voiceover replace; timed bakeoff log. Still waiting on founder **EXTERNAL**.

## External blockers (track)

- Neon (or Supabase) project + `DATABASE_URL` — **human**.
- Vercel project linked to `IvanStabronik/PolishApp` + production env — **human**.
- `pnpm db:migrate` against direct DB URL — **human**.
- GitHub Environment `private-beta` — **shell exists; secrets empty** (optional if Vercel Git alone).
- Independent JPJO reviewer calendar (wizard §3).
- Browser TTS / SpeechRecognition variance.

## Admin craft freeze

Still in force. No new admin/author features this wave.

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
