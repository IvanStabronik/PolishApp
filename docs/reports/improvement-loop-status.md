# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–6 foundations only — **not** reference quality.  
**Wave 4 re-audit (honest):** ~**30 / 50** against `reference-quality-bar.md` (prior “34” was soft).  
**Wave 5 estimate:** ~**32–33 / 50** — café listening + deepen + ops docs + stimulus harden; EXTERNAL wall unchanged.  
**Wave 6 re-audit (honest):** ~**32.5 / 50** — CODE-DOABLE substance landed; further content/improve waves toward the bar are **diminishing-return waste** until EXTERNAL unlock. Never claim reference quality.  
**Latest independent re-audit (LIVE_TUNNEL day-1 bakeoff, 2026-09-15):** ~**42.5 / 50**. Still **EXTERNAL** until durable Vercel/Neon **and** JPJO.  
**Post–stop-rule micro-fixes (2026-09-10):** ~**33 / 50** — server play-proof + PS L02/L03 listening + foil fix (`e7c7b1a`). Still **EXTERNAL** until live HTTPS or JPJO. Not a marketed wave.  
**Static listening audio (PS + café):** ~**33.5–34 / 50** — six edge-tts MP3s; stimulus `audioUrl` without `textPl`.  
**Full A1 assessed-listening audio (2026-09-10):** ~**34.5 / 50** — **15 / 15** static MP3s wired (sklep + droga + urząd L01–L03 added). §3 listening path at interim ceiling (edge-tts ≠ studio). GitHub Environment `private-beta` shell **exists** (secrets empty). **Primary deploy path: Vercel + Neon/Supabase** (Railway secondary). No live HTTPS. No JPJO. No fake PUBLISHED.
**Post–Vercel preflight (2026-09-10):** ~**35 / 50** — `scripts/vercel-neon-preflight.ps1` + FOUNDER helpers; local day-1 bakeoff checklist; JPJO one-page checklist. `pnpm --dir web build` **PASS**. Probe: `gh` OK; `vercel whoami` **no credentials**; no `.vercel` link. Still waiting Neon+Vercel human. No live HTTPS claimed.
**Post–Neon bootstrap + DB/content NFT (2026-09-10):** ~**35.5 / 50** — `neon-bootstrap` migrate path; production `getSql` globalThis cache (Vercel `/api/ready`); `outputFileTracingRoot` + content NFT markers; first-admin bootstrap script (`bootstrap-first-admin.ps1`, `DEMO_MODE=false`). Still **EXTERNAL** for live HTTPS until founder pastes Neon URL + finishes Vercel. No fake PUBLISHED / JPJO.
**Local day-1 bakeoff executed (2026-09-10):** ~**36 / 50** — checklist **LOCAL_PASS** (invite→onboard→PS L01 listen/speak/wrong+L1→plan); phrasebot compare **LOCAL reasoned**; live week still **FAIL**. Micro-fix: exercise step h2 no longer mid-truncates prompt (`draftLessonToDetail` uses section title). Artifact: `web/playwright-artifacts/day1-bakeoff/result.json`.
**CODE-DOABLE pack (2026-09-10, post-HTTPS-block):** ~**37.5 / 50** — `smoke-vercel.ps1`; Vercel/Neon screenshot-free click checklist; lesson result → plan “tomorrow” CTA; BEL concept-label table + L1→label locale; UK no longer gets Russian SoT titles; listening/speaking failure surfaces; civilian “L1” / closed-beta chrome soften; review due dates localized. **No live HTTPS. No JPJO. No fake PUBLISHED.** Admin freeze held.
**UK/BEL instructional bodies (2026-09-15):** ~**38 / 50** — curated UK+BEL maps for all A1 hall/lesson situation+objective + situation `body_ru` shorts; Pierwsze spotkanie key-line / pan / grammar summaries; wired into lesson player, module hub, dashboard cards; `klatce` typo fixed. Exercise prompt/feedback chrome still mostly RU. **No live HTTPS. No JPJO. No fake PUBLISHED.** Credentials probe: `private-beta` secrets empty; `vercel whoami` no credentials; no Neon env in shell.
**UK/BEL exercise prompt+feedback (2026-09-15):** ~**39 / 50** — curated maps for **all A1** exercise prompts (153) + correct/incorrect feedback (303); wired into `draftLessonToDetail` / standalone ExercisePlayer + `evaluateAnswer` (L1 + UK UI). UK chrome solid; BEL feedback phrase-level (prompts solid, longer feedback uneven — unknown RU still passes through). YAML unchanged (DRAFT honesty). **No live HTTPS. No JPJO. No fake PUBLISHED.** Credentials re-probe: `private-beta` secrets **empty**; `vercel whoami` **no credentials**; no Neon URL in shell env; local `web/.env.local` only (docker closed-beta).
**BEL feedback parity close (2026-09-15):** ~**40 / 50** — `FEEDBACK_BEL` completed to **303 / 303** adult-quality Belarusian (was 260 + slurry). Coverage test: all A1 YAML correct/incorrect localize for `bel` with **0** unmapped. Wire unchanged. YAML still DRAFT. **No live HTTPS. No JPJO. No fake PUBLISHED.** Credentials re-probe: `gh` OK; `private-beta` secrets **0**; `vercel whoami` **no credentials**; no Neon/`DATABASE_URL` in shell — bootstrap/smoke **not runnable**.
**Alternate HTTPS tunnel path (2026-09-15):** ~**41 / 50** — [`scripts/tunnel-closed-beta.ps1`](../../scripts/tunnel-closed-beta.ps1) + [`tunnel-closed-beta.md`](../operations/tunnel-closed-beta.md); `ALLOW_DEV_TUNNEL_ORIGINS` + auth client `window.location.origin` so login works through cloudflared/ngrok. **Live tunnel smoke PASS** this session: health+ready 200 on `https://namespace-buying-retailer-strength.trycloudflare.com` (ephemeral quick tunnel; local DNS NXDOMAIN mitigated via 1.1.1.1). **Tunnel ≠ Vercel/Neon production.** **No Neon done. No fake PUBLISHED / JPJO.**
**Tunnel Session-1 life loop (2026-09-15 ~16:18Z):** ~**42 / 50** — Playwright [`e2e/tunnel-session1.spec.ts`](../../web/e2e/tunnel-session1.spec.ts) + [`playwright.tunnel.config.ts`](../../web/playwright.tunnel.config.ts) against same ephemeral URL: admin sign-in → `/ru/dashboard` DRAFT halls (preview banner) → Pierwsze spotkanie `LES-A1-PS-01` → UI submit `ex-ps-01` → **PASS**. Artifact: `web/playwright-artifacts/tunnel-session1/result.json` (gitignored). **Still not Neon/Vercel. Still DRAFT. No JPJO.**
**LIVE_TUNNEL day-1 bakeoff (2026-09-15 ~16:23Z):** ~**42.5 / 50** — [`e2e/day1-tunnel-bakeoff.spec.ts`](../../web/e2e/day1-tunnel-bakeoff.spec.ts) against `https://namespace-buying-retailer-strength.trycloudflare.com`: invite → onboard → PS L01 listen/speak/wrong+L1 → plan **PASS** (L1–L9). Named-tunnel founder steps documented (needs interactive `cloudflared tunnel login` — no cert.pem yet). **Honest: LIVE_TUNNEL ≠ durable Vercel.** No Neon. No fake PUBLISHED / JPJO.
**CODE theory+chrome pack (2026-09-15):** ~**43.5 / 50** — UK/BEL key-line / pan / grammar bodies for all A1 halls; civilian preview/progress soften; progress next-action CTAs; theory-extra + tunnel Referer unit coverage. Credentials re-probe: `gh` OK; `vercel whoami` **no credentials**; no `.vercel`; `DATABASE_URL`/`NEON_*` unset; `private-beta` secrets **0**. **No deploy. No JPJO. No fake PUBLISHED.** Audit: [`goal-completion-audit.md`](./goal-completion-audit.md).
**BEL UI locale `be` (2026-09-16):** ~**43.8 / 50** — first-class UI locale `be` alongside `ru`/`uk`/`pl` (`UI_LOCALES`, routing, middleware, messages/`be.json`, PG enum migration `0009`). Onboarding prefers `be` when L1=`bel` (manual UI override respected). Settings switcher lists BE. Adult Belarusian learner chrome (dashboard / learn / auth / progress / beta invite / plan strings). **No Neon/Vercel login. No durable HTTPS claimed.** Still **WAITING_ON_FOUNDER**.

### Critical re-score (post BEL UI locale) — `/50` (ruthless independent)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.65 | 4.65 | Unchanged — durable host still EXTERNAL |
| 2 | Feedback that teaches | 4.65 | 4.65 | Unchanged this pack |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged |
| 4 | Human-readable progress | 4.1 | 4.1 | Unchanged |
| 5 | Zero civilian ops jargon | 3.95 | 3.95 | Unchanged |
| 6 | BEL first-class L1 | 4.7 | 4.9 | UI locale `be` + adult `be.json`; L1≠UI still enforced; not JPJO-reviewed copy |
| 7 | Content honesty contract | 4.0 | 4.0 | Still DRAFT; no JPJO |
| 8 | Deploy teaches someone | 4.7 | 4.7 | No Neon/Vercel; agents must not force login |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 4.0 | 4.0 | Unchanged — still PARTIAL_TUNNEL |
| | **Total** | **~43.5** | **~43.8** | §6 CODE lift; goal still EXTERNAL (Vercel/Neon + JPJO) |

### Critical re-score (post CODE theory+chrome pack) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.65 | 4.65 | Unchanged — still ephemeral LIVE_TUNNEL; durable host EXTERNAL |
| 2 | Feedback that teaches | 4.5 | 4.65 | Key-line / pan / grammar UK+BEL all A1; still chrome not deep tutoring |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged — edge-tts + Web Speech interim |
| 4 | Human-readable progress | 3.9 | 4.1 | Progress next-action CTAs; softer lead; “уровень” not “учебный модуль” |
| 5 | Zero civilian ops jargon | 3.75 | 3.95 | Preview badge/status + result/progress copy softened |
| 6 | BEL first-class L1 | 4.5 | 4.7 | Theory bodies beyond situation; UI still shares RU locale |
| 7 | Content honesty contract | 4.0 | 4.0 | Still DRAFT; no JPJO |
| 8 | Deploy teaches someone | 4.7 | 4.7 | Credentials re-probe: still no Vercel/Neon; docs unchanged |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held; learner-only pack |
| 10 | Competitive first week | 3.9 | 4.0 | Slightly clearer habit chrome; week still PARTIAL_TUNNEL |
| | **Total** | **~42.5** | **~43.5** | CODE ceiling rising; goal still EXTERNAL (Vercel/Neon + JPJO) |

### Critical re-score (post LIVE_TUNNEL day-1 bakeoff) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.55 | 4.65 | Full day-1 invite→plan on public HTTPS **PASS**; hostname ephemeral; machine must stay up |
| 2 | Feedback that teaches | 4.5 | 4.5 | Unchanged — chrome solid, not deep tutoring |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged — edge-tts + Web Speech interim |
| 4 | Human-readable progress | 3.9 | 3.9 | Unchanged — L7 narratable on tunnel |
| 5 | Zero civilian ops jargon | 3.75 | 3.75 | Unchanged |
| 6 | BEL first-class L1 | 4.5 | 4.5 | Unchanged — UI still shares RU locale |
| 7 | Content honesty contract | 4.0 | 4.0 | Still DRAFT; LIVE_TUNNEL not PUBLISHED |
| 8 | Deploy teaches someone | 4.65 | 4.7 | Day-1 tunnel runbook + named-tunnel founder steps; Neon/Vercel still EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 3.75 | 3.9 | LIVE_TUNNEL day-1 **PASS**; week **PARTIAL_TUNNEL**; phrasebot still wins friction; no durable multi-day |
| | **Total** | **~42** | **~42.5** | Ruthless: live day-1 proven; EXTERNAL wall = JPJO + durable Vercel/Neon |

### Critical re-score (post tunnel Session-1 life loop) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.15 | 4.55 | Public HTTPS login → DRAFT halls → lesson → one attempt **PASS** (ephemeral tunnel) |
| 2 | Feedback that teaches | 4.5 | 4.5 | Unchanged |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged |
| 4 | Human-readable progress | 3.9 | 3.9 | Unchanged |
| 5 | Zero civilian ops jargon | 3.75 | 3.75 | Unchanged |
| 6 | BEL first-class L1 | 4.5 | 4.5 | Unchanged |
| 7 | Content honesty contract | 4.0 | 4.0 | Still DRAFT; tunnel not PUBLISHED |
| 8 | Deploy teaches someone | 4.5 | 4.65 | Tunnel smoke + Session-1 proven; Neon/Vercel still EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 3.65 | 3.75 | Invitees can run Session-1 on tunnel; host rotates / machine must stay up |
| | **Total** | **~41** | **~42** | Honest: live Session-1 via tunnel; durable production still EXTERNAL |

### Critical re-score (post tunnel alternate HTTPS) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.0 | 4.15 | Tunnel can expose local invite path on real HTTPS; still not durable Vercel |
| 2 | Feedback that teaches | 4.5 | 4.5 | Unchanged |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged |
| 4 | Human-readable progress | 3.9 | 3.9 | Unchanged |
| 5 | Zero civilian ops jargon | 3.75 | 3.75 | Unchanged |
| 6 | BEL first-class L1 | 4.5 | 4.5 | Unchanged |
| 7 | Content honesty contract | 4.0 | 4.0 | Still DRAFT; tunnel not PUBLISHED |
| 8 | Deploy teaches someone | 4.25 | 4.5 | Founder one-command tunnel when local PASS; Neon/Vercel still EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 3.5 | 3.65 | Live week possible via tunnel invitees; host ephemeral ≠ production |
| | **Total** | **~40** | **~41** | Honest: tunnel unblocks HTTPS demo, not production deploy |

### Critical re-score (post BEL feedback parity) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.0 | 4.0 | Local LOCAL_PASS; live invite EXTERNAL |
| 2 | Feedback that teaches | 4.35 | 4.5 | UK+BEL correct/incorrect all A1; L1 notes unchanged; still chrome not deep tutoring |
| 3 | Listening + speaking path | 4.0 | 4.0 | 15 edge-tts listenings; speaking practice interim ASR |
| 4 | Human-readable progress | 3.9 | 3.9 | Unchanged this pass |
| 5 | Zero civilian ops jargon | 3.75 | 3.75 | Preview banner; no JPJO in learner chrome |
| 6 | BEL first-class L1 | 4.25 | 4.5 | Full BEL prompt+feedback parity; UI still shares RU locale; some hall theory bodies still RU |
| 7 | Content honesty contract | 4.0 | 4.0 | All A1 DRAFT + banner; 0 PUBLISHED |
| 8 | Deploy teaches someone | 4.25 | 4.25 | Scripts/docs ready; Vercel/Neon secrets still EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 3.5 | 3.5 | Local day-1 LOCAL_PASS; live week FAIL |
| | **Total** | **~39** | **~40** | Still far from reference; EXTERNAL wall |

### Critical re-score (post exercise prompt/feedback chrome) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.0 | 4.0 | Local still LOCAL_PASS; live invite EXTERNAL |
| 2 | Feedback that teaches | 4.0 | 4.35 | UK correct/incorrect chrome; L1 notes unchanged |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged; interim TTS/ASR |
| 4 | Human-readable progress | 3.85 | 3.9 | Exercise prompts localized in player |
| 5 | Zero civilian ops jargon | 3.75 | 3.75 | Unchanged |
| 6 | BEL first-class L1 | 4.1 | 4.25 | BEL prompts mapped; BEL feedback partial (not slurry-forced) |
| 7 | Content honesty contract | 4.0 | 4.0 | DRAFT + banner; maps not fake PUBLISHED |
| 8 | Deploy teaches someone | 4.25 | 4.25 | Docs/scripts ready; secrets/HTTPS EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 3.5 | 3.5 | Local day-1 LOCAL_PASS; live week FAIL |
| | **Total** | **~38** | **~39** | Still far from reference; EXTERNAL wall |

### Critical re-score (post UK/BEL instructional bodies) — `/50`

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.0 | 4.0 | Local still LOCAL_PASS; live invite EXTERNAL |
| 2 | Feedback that teaches | 4.0 | 4.0 | L1 notes OK; exercise correct/incorrect still RU |
| 3 | Listening + speaking path | 4.0 | 4.0 | Unchanged; interim TTS/ASR |
| 4 | Human-readable progress | 3.75 | 3.85 | Hall label «Зала»; localized objectives on cards/hub |
| 5 | Zero civilian ops jargon | 3.75 | 3.75 | Unchanged |
| 6 | BEL first-class L1 | 3.75 | 4.1 | Situation/objective bodies UK+BEL all halls; PS theory; café+ other hall theory explanations still RU |
| 7 | Content honesty contract | 4.0 | 4.0 | DRAFT + banner; no fake PUBLISHED |
| 8 | Deploy teaches someone | 4.25 | 4.25 | Docs/scripts ready; secrets/HTTPS EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held |
| 10 | Competitive first week | 3.5 | 3.5 | Local day-1 LOCAL_PASS; live week FAIL |
| | **Total** | **~37.5** | **~38** | Still far from reference; EXTERNAL wall |

### Critical re-score (post CODE-DOABLE pack) — `/50` (historical)

| # | Criterion | before | after | Note |
| --- | --- | ---: | ---: | --- |
| 1 | Session-1 life loop | 4.0 | 4.0 | Local still LOCAL_PASS; result→plan CTA; live invite EXTERNAL |
| 2 | Feedback that teaches | 4.0 | 4.0 | Unchanged this pack |
| 3 | Listening + speaking path | 4.0 | 4.0 | Play/unlock + mic errors surfaced; still interim TTS/ASR |
| 4 | Human-readable progress | 3.5 | 3.75 | Tomorrow CTA; review dates; BEL/UK labels |
| 5 | Zero civilian ops jargon | 3.5 | 3.75 | “L1” out of chrome; beta jargon softened |
| 6 | BEL first-class L1 | 3.5 | 3.75 | `CONCEPT_LABELS_BE` + L1 wiring; theory bodies still RU |
| 7 | Content honesty contract | 4.0 | 4.0 | DRAFT + banner; no fake PUBLISHED |
| 8 | Deploy teaches someone | 4.0 | 4.25 | smoke-vercel + click checklist; secrets/HTTPS EXTERNAL |
| 9 | Admin ≤ learner craft | 3.5 | 3.5 | Freeze held; learner-only pack |
| 10 | Competitive first week | 3.5 | 3.5 | Local day-1 LOCAL_PASS; live week FAIL |
| | **Total** | **~36** | **~37.5** | Still far from reference; EXTERNAL wall |

### WAITING_ON_FOUNDER

**Status:** ~**43.8 / 50** — CODE + LIVE_TUNNEL day-1 **done**; BEL UI locale `be` shipped. Goal still **EXTERNAL**.

**Blocked on:** durable HTTPS (Neon + Vercel preferred) **and** independent JPJO. Agents must **not** force Neon/Vercel logins.

**Founder: reply with exactly ONE of:**

1. **Neon Direct URL** (paste) — agent runs bootstrap/migrate only after that
2. **`vercel залогинен`** — founder already logged in; agent may then use CLI without opening browser auth
3. **`пауза эталона`** — pause reference-quality push; no deploy / no auth work

**Hard rule for agents:** do **not** run `vercel login`, browser OAuth, or any credential probe that opens a browser until the founder chooses (1), (2), or (3). No deploy attempts while waiting.

After founder chooses, helpers (only then): [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md), [`scripts/neon-bootstrap.ps1`](../../scripts/neon-bootstrap.ps1), [`scripts/smoke-vercel.ps1`](../../scripts/smoke-vercel.ps1), click path [`vercel-neon-click-checklist.md`](../operations/vercel-neon-click-checklist.md). Tunnel ≠ Neon/Vercel Done. Do not invent secrets; do not claim HTTPS without curl 200 / smoke PASS.

### Waiting on founder (EXTERNAL) — historical note

Preferred durable path remains Neon/Supabase `DATABASE_URL` + Vercel. Alternate ephemeral HTTPS: [`scripts/tunnel-closed-beta.ps1`](../../scripts/tunnel-closed-beta.ps1) (already proven; does **not** complete Neon/Vercel). JPJO is independent EXTERNAL.

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
| Local day-1 competitive checklist | **Done + executed LOCAL_PASS** — [`competitive-week1-bakeoff.md`](./competitive-week1-bakeoff.md); live week still **FAIL** until HTTPS |
| JPJO one-page reviewer checklist | **Done** — in hall packet; status remains `NOT_STARTED` |
| Static assessed-listening audio — all 5 A1 halls L01–L03 | **Done** — **15×** MP3 under `web/public/audio/a1/`; YAML `audio_url`; see [`audio-assets.md`](../operations/audio-assets.md) |
| JPJO hall packet inventory refresh | **Done** — status remains `NOT_STARTED` |
| Exercise step h2 mid-truncation | **Done** — `draftLessonToDetail` uses practice/mini_check section title (not `prompt.slice(0,64)`) |
| Production smoke script for BASE_URL | **Done** — [`scripts/smoke-vercel.ps1`](../../scripts/smoke-vercel.ps1) |
| Vercel/Neon screenshot-free click checklist | **Done** — [`vercel-neon-click-checklist.md`](../operations/vercel-neon-click-checklist.md) |
| Result → plan “tomorrow” CTA | **Done** — lesson + module result pages |
| BEL concept labels + L1 locale wiring | **Done** — `CONCEPT_LABELS_BE`; UK SoT no longer leaks Russian |
| Listening/speaking failure surfaces | **Done** — unlock/play + mic error copy |
| Civilian chrome soften (L1 acronym / beta jargon) | **Done** — onboarding/settings/banner/previewMode |
| UK/BEL instructional bodies (situation/objective + PS theory) | **Done** — `instructional-body-locale.ts`; player + hub + dashboard; other-hall key-line/grammar still RU |
| UK/BEL exercise prompt + correct/incorrect feedback (all A1) | **Done** — `exercise-chrome-locale.ts`; `draftLessonToDetail` + ExercisePlayer + `evaluateAnswer`; UK solid; BEL feedback was partial |
| BEL feedback parity (all A1 correct/incorrect, adult BE) | **Done** — `FEEDBACK_BEL` 303/303; coverage unit test; no slurry |
| Alternate live HTTPS via free tunnel (cloudflared/ngrok) | **Done** — [`scripts/tunnel-closed-beta.ps1`](../../scripts/tunnel-closed-beta.ps1); auth Origin trust + client baseURL; **≠ Neon/Vercel** |
| Tunnel Session-1 life loop (login → DRAFT halls → lesson → attempt) | **Done PASS** — `e2e/tunnel-session1.spec.ts` on `https://namespace-buying-retailer-strength.trycloudflare.com` at **2026-09-15T16:18:40Z**; ephemeral; **≠ Neon/Vercel** |
| LIVE_TUNNEL day-1 bakeoff (invite → plan on public HTTPS) | **Done PASS** — `e2e/day1-tunnel-bakeoff.spec.ts` at **2026-09-15T16:23:17Z**; **PARTIAL_TUNNEL** week; **≠ Vercel** |
| Named tunnel stable hostname docs | **Done docs** — founder interactive `cloudflared tunnel login` still required (no cert.pem this machine) |
| UK/BEL theory beyond situation (key lines / pan / grammar all A1) | **Done** — `instructional-theory-extra.ts`; player already wires `localizeInstructionalBody` |
| Civilian preview/progress chrome soften + progress next-action | **Done** — messages + progress page CTAs |
| Theory-extra + tunnel Referer Origin unit coverage | **Done** — wave2 + m5 tests |
| Goal completion audit (evidence checklist) | **Done** — [`goal-completion-audit.md`](./goal-completion-audit.md) |
| BEL UI locale `be` (menu language) | **Done** — `UI_LOCALES`+routing+middleware+`be.json`+migration `0009`; onboarding prefers `be` for L1=`bel` |

Score estimate ~**43.8 / 50**. No fake PUBLISHED. No Neon claimed. LIVE_TUNNEL day-1 **PASS** (ephemeral). BEL learners can use `/be/…` menu. See **WAITING_ON_FOUNDER** above — durable Neon+Vercel **and** JPJO; agents must not force logins.

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
4. Competitive week-1 **local day-1 LOCAL_PASS** (2026-09-10); **LIVE_TUNNEL day-1 PASS** (2026-09-15). Week verdict **PARTIAL_TUNNEL** — durable multi-day still needs Neon/Vercel or named/stable tunnel + always-on host.
5. Durable production HTTPS (Neon+Vercel) still **EXTERNAL**. Alternate LIVE_TUNNEL health/ready + Session-1 + day-1 bakeoff **PASS** — founder path: [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md) + [`tunnel-closed-beta.md`](../operations/tunnel-closed-beta.md).
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
