# Goal completion audit — reference-quality bar

**Date:** 2026-09-16  
**Branch:** `docs/requirements-r2`  
**HEAD at this audit:** post–CODE_CEILING_A1 (all 5 A1 halls substance deepen CODE-complete; JPJO hall packet polished; still `NOT_STARTED`)  
**Stance:** Honest score ~**43.2 / 50**. **Goal not complete.** No fake JPJO APPROVE / PUBLISHED. No durable Vercel claimed. Tunnel ≠ durable. No Neon/Vercel login forced. **Further YAML churn without Neon/JPJO will not meaningfully raise /50** — agents prefer waiting.

## Criterion map (CODE_CEILING_A1 — current HEAD)

| # | Criterion | Prior (§9) | **Now** | What would make 5/5 | CODE vs EXTERNAL |
| --- | --- | ---: | ---: | --- | --- |
| 1 | Session-1 life loop without staff | 4.5 | **4.5** | Durable HTTPS invite→plan without host machine / ephemeral hostname | **EXTERNAL** (Neon+Vercel or always-on named tunnel) |
| 2 | Feedback that teaches | 4.55 | **4.95** | Deep tutoring beyond A1 chrome; JPJO-reviewed L1 | A1 deepen **CODE done**; further YAML ≠ lift; depth **EXTERNAL**/JPJO |
| 3 | Listening + speaking path | 4.1 | **4.1** | Studio listening + exam-grade speaking | Craft **CODE**; studio/exam still **EXTERNAL** / V2 |
| 4 | Human-readable progress | 4.1 | **4.1** | Multi-day narratable habit on live durable host | Remaining lift mostly **EXTERNAL** week |
| 5 | Zero civilian ops jargon | 4.35 | **4.35** | JPJO human pass on chrome | Mostly **CODE done**; polish ceiling without JPJO |
| 6 | BEL first-class L1 | 5.0 | **5.0** | Optional JPJO pass on `be.json` chrome | **CODE done** for UI locale `be` + key parity; copy not JPJO-reviewed |
| 7 | Content honesty contract | 4.0 | **4.0** | JPJO APPROVE → PUBLISHED **or** keep closed-beta preview forever | **EXTERNAL** JPJO human — packet ready, status `NOT_STARTED` |
| 8 | Deploy teaches someone | 4.45 | **4.45** | Live `BASE_URL` health/ready smoke PASS on Vercel+Neon | **EXTERNAL** credentials — docs alone do **not** max this |
| 9 | Admin weight ≤ learner craft | 3.8 | **3.8** | Keep freeze; more learner craft than admin | Freeze held |
| 10 | Competitive first week | 3.85 | **3.85** | Durable multi-day week beats phrasebot friction | **EXTERNAL** durable host + invitees — LIVE_TUNNEL day-1 ≠ week WIN |
| | **Total** | **~42.7** | **~43.2** | Reference = all ten critically pass | Still **EXTERNAL** wall; **CODE_CEILING_A1** |

**Inflation this arc (honest):** §2/+0.40 across five-hall substance deepen (adult distractors, distinct UK/BEL/RU L1, productive triple gaps, harder same-scenario listening foils). Net **~43.2**. Not reference. YAML-only follow-ups will not move the needle without Neon or JPJO.

## Evidence skim (this pass)

| Surface | Evidence |
| --- | --- |
| Session-1 | Local day-1 **LOCAL_PASS**; LIVE_TUNNEL day-1 **PASS** 2026-09-15 (ephemeral). No durable URL. |
| Feedback / player | Spot-check deepen **real** on PS L02 (triple gap + L1), sklep L01 (adult distractors), droga L01 (hard foils), café L02 (triple gap; foil micro-fix `Co podać?`) |
| Listening / speaking | 15 edge-tts MP3s; Web Speech honesty; play-token gate; §9 craft held |
| Progress | Human concept labels; plan/result CTAs |
| Ops jargon | Learner key+value guard held |
| BEL / `be` | UI locale + parity held |
| Honesty | DRAFT + preview banner; 0 PUBLISHED; JPJO hall packet `NOT_STARTED` (no AI APPROVE) |
| Deploy | Runbooks/scripts present; no Neon/Vercel credentials this session |
| Admin vs learner | No learner→`/admin` nav; freeze held |
| Competitive week | Bakeoff **PARTIAL_TUNNEL**; no durable days 2–7 |

## What must still be true for goal complete

Evidence required — not docs alone:

1. **Durable live HTTPS** — Vercel (or equivalent) production URL with `GET /api/health` and `GET /api/ready` **200**, plus `scripts/smoke-vercel.ps1 -BaseUrl https://…` **PASS**. Tunnel smoke / LIVE_TUNNEL day-1 does **not** satisfy this.
2. **Invite Session-1 on that durable URL** — invite → onboard → DRAFT hall (preview banner) → lesson with dialogue + practice → honest feedback → plan “tomorrow” — Playwright or recorded bakeoff artifact dated after deploy.
3. **JPJO honesty** — either (a) independent reviewer **APPROVE** recorded in hall packet with `reviewer_id` ≠ author and content may move toward PUBLISHED per pipeline, **or** (b) explicit closed-beta preview contract remains and catalog is non-empty for invitees (already true locally/tunnel). **Never** mark PUBLISHED without JPJO. Start: [`pierwsze-spotkanie-jpjo-hall-packet.md`](../reviews/pierwsze-spotkanie-jpjo-hall-packet.md).
4. **Neon (or Supabase) `DATABASE_URL`** — migrate + first-admin bootstrap with `DEMO_MODE=false`; not docker-only.
5. **GitHub `private-beta` secrets** — optional if Vercel Git env alone; currently **count 0**.
6. **Competitive week** — at least one invitee multi-day log on durable host; phrasebot friction comparison **PASS** or documented near-parity. LIVE_TUNNEL day-1 alone = **PARTIAL**.

## Credentials (last known; no browser probes)

| Probe | Result |
| --- | --- |
| `gh auth status` | **OK** (IvanStabronik) |
| `vercel whoami` | **No credentials** (do not run `vercel login`) |
| `web/.vercel` link | **Absent** |
| `DATABASE_URL` / `NEON_*` in process env | **Unset** |
| `web/.env.local` | **Exists** (local closed-beta only) |
| GitHub Environment `private-beta` secrets `total_count` | **0** |

**Deploy:** not attempted. No durable Vercel claim. **Agents must not open browser auth** until founder replies under **WAITING_ON_FOUNDER**.

## CODE shipped this arc (A1 substance deepen + ceiling)

- All 5 halls L01–L03 deepen: adult same-scenario distractors, distinct UK/BEL/RU L1, productive triple gaps, harder listening foils; DRAFT + `reviewer_id: null`.
- Spot-check confirmation: not empty version bumps.
- Quick café L02 foil: cross-hall `Miło pana poznać` → same-scenario `Co podać?` + chrome locale sync.
- JPJO hall packet polished for one-sitting independent review (checklist, lesson IDs, APPROVE/REJECT, `reviewer_id` how-to); status remains `NOT_STARTED`.

## WAITING_ON_FOUNDER

**Status:** ~**43.2 / 50** — **CODE_CEILING_A1**. Goal **not** complete.

**Blocked on:** durable HTTPS (Neon + Vercel preferred) **and** independent JPJO. Do **not** force Neon/Vercel logins. Do **not** invent another scored content wave.

**Founder: reply with exactly ONE of:**

1. **Neon Direct URL** (paste) — agent runs bootstrap/migrate only after that
2. **`vercel залогинен`** — founder already logged in; agent may then use CLI without opening browser auth
3. **`пауза эталона`** — pause reference-quality push; no deploy / no auth work

**Hard rule for agents:** do **not** run `vercel login`, browser OAuth, or any credential probe that opens a browser until the founder chooses (1), (2), or (3). No deploy attempts while waiting. Prefer **waiting** over YAML churn.

### After founder chooses (ranked)

1. **Neon Create** → paste pooled + direct URLs → `scripts/neon-bootstrap.ps1` → migrate *(only if (1))*
2. Link Vercel project → set production env → deploy → `scripts/smoke-vercel.ps1` *(only if (2) or after founder auth)*
3. **`scripts/bootstrap-first-admin.ps1`** on production DB (`DEMO_MODE=false`)
4. Run **live day-1 bakeoff** against durable `BASE_URL`; file artifact
5. Book **JPJO** reviewer; first hall packet decision (APPROVE/REJECT) — no AI self-approve
6. Optional: named Cloudflare tunnel + always-on host if Vercel still blocked (still ≠ §8 durable claim)
7. Optional: fill GitHub `private-beta` secrets if using Actions deploy path

See [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md) and [`external-unblock-wizard.md`](../operations/external-unblock-wizard.md).
