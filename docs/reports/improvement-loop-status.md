# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–6 foundations only — **not** reference quality.  
**Wave 4 re-audit (honest):** ~**30 / 50** against `reference-quality-bar.md` (prior “34” was soft).  
**Wave 5 estimate:** ~**32–33 / 50** — café listening + deepen + ops docs + stimulus harden; EXTERNAL wall unchanged.  
**Wave 6 re-audit (honest):** ~**32.5 / 50** — CODE-DOABLE substance landed; further content/improve waves toward the bar are **diminishing-return waste** until EXTERNAL unlock. Never claim reference quality.  
**Post–stop-rule micro-fixes (2026-09-10):** ~**33 / 50** — server play-proof + PS L02/L03 listening + foil fix (`e7c7b1a`). Still **EXTERNAL** until live HTTPS or JPJO. Not a marketed wave.  
**Static listening audio (PS + café):** ~**33.5–34 / 50** — six edge-tts MP3s; stimulus `audioUrl` without `textPl`.  
**Full A1 assessed-listening audio (2026-09-10):** ~**34.5 / 50** — **15 / 15** static MP3s wired (sklep + droga + urząd L01–L03 added). §3 listening path at interim ceiling (edge-tts ≠ studio). GitHub Environment `private-beta` shell **exists** (secrets empty). **Primary deploy path: Vercel + Neon/Supabase** (Railway secondary). No live HTTPS. No JPJO. No fake PUBLISHED.
**Post–Vercel preflight (2026-09-10):** ~**35 / 50** — `scripts/vercel-neon-preflight.ps1` + FOUNDER helpers; local day-1 bakeoff checklist; JPJO one-page checklist. `pnpm --dir web build` **PASS**. Probe: `gh` OK; `vercel whoami` **no credentials**; no `.vercel` link. Still waiting Neon+Vercel human. No live HTTPS claimed.
**Post–Neon bootstrap + DB/content NFT (2026-09-10):** ~**35.5 / 50** — `neon-bootstrap` migrate path; production `getSql` globalThis cache (Vercel `/api/ready`); `outputFileTracingRoot` + content NFT markers; first-admin bootstrap script (`bootstrap-first-admin.ps1`, `DEMO_MODE=false`). Still **EXTERNAL** for live HTTPS until founder pastes Neon URL + finishes Vercel. No fake PUBLISHED / JPJO.

### Critical re-score (post Neon bootstrap + first-admin path) — `/50`

| # | Criterion | /5 | Note |
| --- | --- | ---: | --- |
| 1 | Session-1 life loop | 3.5 | Local closed-beta PASS; live invite path unproven until Neon+Vercel |
| 2 | Feedback that teaches | 4.0 | incorrect + L1 on deepened halls |
| 3 | Listening + speaking path | 4.0 | All 15 assessed listen have `audio_url`; speaking still interim |
| 4 | Human-readable progress | 3.5 | Labels improved; habit clarity ok |
| 5 | Zero civilian ops jargon | 3.5 | Preview honesty; staff jargon out of learner chrome |
| 6 | BEL first-class L1 | 3.5 | Notes present; UI locale share remains |
| 7 | Content honesty contract | 4.0 | DRAFT + banner; no fake PUBLISHED |
| 8 | Deploy teaches someone | 4.0 | Preflight + neon-bootstrap + first-admin (no DEMO_MODE) + NFT/getSql; secrets/HTTPS still EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | Freeze held; bootstrap is ops, not admin chrome |
| 10 | Competitive first week | 3.0 | Local day-1 checklist added; live week still FAIL / not run |
| | **Total** | **~35.5** | Still far from reference; EXTERNAL wall |

### Waiting on founder (EXTERNAL)

**Blocked on human-owned steps only** — Neon/Supabase `DATABASE_URL` (not pasted yet) + Vercel project + env vars → `neon-bootstrap` → `bootstrap-first-admin` → live `BASE_URL` health·ready, and/or independent JPJO. Code cannot unlock this.

**Run (Windows):**
1. [`scripts/vercel-neon-preflight.ps1`](../../scripts/vercel-neon-preflight.ps1) — fast config/auth probe (primary helper alongside wizard).
2. After Neon Create: [`scripts/neon-bootstrap.ps1`](../../scripts/neon-bootstrap.ps1) `-DirectUrl` / `-PooledUrl`.
3. After migrate + Vercel env: [`scripts/bootstrap-first-admin.ps1`](../../scripts/bootstrap-first-admin.ps1) `-DatabaseUrl` `-Email` `-Password` (`DEMO_MODE=false`).
4. [`scripts/founder-unblock.ps1`](../../scripts/founder-unblock.ps1) — interactive secret capture + Done/Blocked paste-back.

See [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md). Do not invent secrets; do not claim HTTPS without curl 200.

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
| Vercel+Neon preflight script | **Done** — [`scripts/vercel-neon-preflight.ps1`](../../scripts/vercel-neon-preflight.ps1); stops when `vercel login` / secrets missing |
| Neon bootstrap + production getSql cache + content NFT | **Done** — [`scripts/neon-bootstrap.ps1`](../../scripts/neon-bootstrap.ps1); `client.ts` always caches sql; `next.config` tracing root |
| First-admin bootstrap without DEMO_MODE | **Done** — [`scripts/bootstrap-first-admin.ps1`](../../scripts/bootstrap-first-admin.ps1); refuses DEMO_MODE / ALLOW_PRODUCTION_DEMO; FORCE_SEED hardened |
| Local day-1 competitive checklist | **Done** — in [`competitive-week1-bakeoff.md`](./competitive-week1-bakeoff.md); live week still **FAIL** until HTTPS |
| JPJO one-page reviewer checklist | **Done** — in hall packet; status remains `NOT_STARTED` |
| Static assessed-listening audio — all 5 A1 halls L01–L03 | **Done** — **15×** MP3 under `web/public/audio/a1/`; YAML `audio_url`; see [`audio-assets.md`](../operations/audio-assets.md) |
| JPJO hall packet inventory refresh | **Done** — status remains `NOT_STARTED` |

Score estimate ~**35.5 / 50**. No fake PUBLISHED. No live HTTPS claimed. Waiting on founder **EXTERNAL** (Neon URL + Vercel).

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
4. Competitive week-1 not yet **run** with real invitees (local day-1 checklist exists; live still FAIL).
5. Live HTTPS not proven without Neon/Vercel (human). **EXTERNAL** — founder path: [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md) + preflight.
6. Admin vs learner craft — freeze held; recheck §9 after player polish.
7. ~~Play-gate is client-side only~~ — **mitigated**: server requires `listeningPlayToken` (stimulus or `tts_unavailable` unlock). Still interim vs studio audio.

## After STOP RULE — human unlock only

Do **not** start Wave 7 as another content deepen. Founder path = [`scripts/vercel-neon-preflight.ps1`](../../scripts/vercel-neon-preflight.ps1) → [`scripts/neon-bootstrap.ps1`](../../scripts/neon-bootstrap.ps1) → [`scripts/bootstrap-first-admin.ps1`](../../scripts/bootstrap-first-admin.ps1) → [FOUNDER-UNBLOCK-NOW.md](../operations/FOUNDER-UNBLOCK-NOW.md) + [external-unblock-wizard.md](../operations/external-unblock-wizard.md):

1. **Live HTTPS proof** — Neon + Vercel env + migrate + `BASE_URL` health/ready (§1–§2, §4).
2. **First admin** — bootstrap script with real email (`DEMO_MODE=false`); then invite-first on live.
3. **JPJO human review** — calendar + first hall APPROVE/REJECT in packet (§3; no AI self-approve).
4. **Invite path on live** — same closed-beta flags as local (`BETA_ALLOW_DRAFT=true`, `DEMO_*=false`).

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
