# Goal completion audit — reference-quality bar

**Date:** 2026-09-16  
**Branch:** `docs/requirements-r2`  
**HEAD at this audit:** post–§9 speaking/listening craft (follows ruthless ~42.4 re-score)  
**Stance:** Ruthless independent re-score against **current** code+docs. **Goal not complete.** No fake JPJO APPROVE / PUBLISHED. No durable Vercel claimed. Tunnel ≠ durable. No Neon/Vercel login forced.

## Criterion map (ruthless independent — current HEAD)

| # | Criterion | Prior claim | **Now** | What would make 5/5 | CODE vs EXTERNAL |
| --- | --- | ---: | ---: | --- | --- |
| 1 | Session-1 life loop without staff | 4.5 | **4.5** | Durable HTTPS invite→plan without host machine / ephemeral hostname | **EXTERNAL** (Neon+Vercel or always-on named tunnel) |
| 2 | Feedback that teaches | 4.55 | **4.55** | Deep tutoring beyond A1 chrome; studio L1 contrast essays if needed | Mostly **CODE done** for A1; depth **EXTERNAL**/content craft |
| 3 | Listening + speaking path | 4.0 | **4.1** | Studio listening + exam-grade speaking | **CODE** craft lift (controls/empty/error/try-first); studio/exam still **EXTERNAL** / V2 |
| 4 | Human-readable progress | 4.1 | **4.1** | Multi-day narratable habit on live durable host | Remaining lift mostly **EXTERNAL** week |
| 5 | Zero civilian ops jargon | 4.35 | **4.35** | JPJO human pass on chrome; zero residual beta-theater smell | Mostly **CODE done**; key+value guard; polish ceiling without JPJO |
| 6 | BEL first-class L1 | 5.0 | **5.0** | Optional JPJO pass on `be.json` chrome | **CODE done** for UI locale `be` + key parity; copy not JPJO-reviewed |
| 7 | Content honesty contract | 4.0 | **4.0** | JPJO APPROVE → PUBLISHED **or** keep closed-beta preview forever | **EXTERNAL** JPJO human |
| 8 | Deploy teaches someone | 4.45 | **4.45** | Live `BASE_URL` health/ready smoke PASS on Vercel+Neon | **EXTERNAL** credentials — docs alone do **not** max this |
| 9 | Admin weight ≤ learner craft | 3.55 | **3.8** | Keep freeze; more learner craft than admin | Confirmed no learner→`/admin` nav; speaking+listening craft > admin chrome |
| 10 | Competitive first week | 3.85 | **3.85** | Durable multi-day week beats phrasebot friction | **EXTERNAL** durable host + invitees — LIVE_TUNNEL day-1 ≠ week WIN |
| | **Total** | **~42.4** | **~42.7** | Reference = all ten critically pass | Still **EXTERNAL** wall |

**Inflation this pass (honest, small):** §3/+0.10 (adult speaking try-first + listening empty/error/retry; still interim TTS/Web Speech). §9/+0.25 (admin freeze re-confirmed; learner craft shipped without admin growth). Net **~42.7** — not reference.

## Evidence skim (this pass)

| Surface | Evidence |
| --- | --- |
| Session-1 | Local day-1 **LOCAL_PASS**; LIVE_TUNNEL day-1 **PASS** 2026-09-15 (ephemeral). No durable URL. |
| Feedback / player | `ExercisePlayer` + `FeedbackPanel` L1 notes; UK/BEL prompt+feedback maps; theory UK/BEL |
| Listening / speaking | 15 edge-tts MP3s; Web Speech honesty; play-token gate; **§9 craft:** primary try-first speaking (next line soft-gated), listening secondary control + idle/error/retry/unavailable states |
| Progress | Human concept labels; plan/result CTAs; RU `кlatka` mixed-script typo **fixed** → `klatka` |
| Ops jargon | Learner values clean; keys renamed off `mastery*` / `status_triaged` / `common.draft`; unit guard checks **keys+values** |
| BEL / `be` | `UI_LOCALES`+middleware+`be.json` parity; onboarding L1=`bel`→`be`; locale-l1 tests **PASS** |
| Honesty | DRAFT + one-sentence preview banner; 0 PUBLISHED; no JPJO |
| Deploy | Runbooks/scripts present; `vercel whoami` **no credentials**; `DATABASE_URL`/`NEON_*` **unset**; `private-beta` secrets **0** |
| Admin vs learner | `SiteHeader`/`SiteFooter` have **no** `/admin` link; only `/[locale]/admin/beta` + `canAccessAdminArea` → `notFound`; adminBeta chrome **not** in learner nav (no trim needed) |
| Competitive week | Bakeoff **PARTIAL_TUNNEL**; phrasebot still wins friction; no days 2–7 invitee log |

## What must still be true for goal complete

Evidence required — not docs alone:

1. **Durable live HTTPS** — Vercel (or equivalent) production URL with `GET /api/health` and `GET /api/ready` **200**, plus `scripts/smoke-vercel.ps1 -BaseUrl https://…` **PASS**. Tunnel smoke / LIVE_TUNNEL day-1 does **not** satisfy this.
2. **Invite Session-1 on that durable URL** — invite → onboard → DRAFT hall (preview banner) → lesson with dialogue + practice → honest feedback → plan “tomorrow” — Playwright or recorded bakeoff artifact dated after deploy.
3. **JPJO honesty** — either (a) independent reviewer **APPROVE** recorded in hall packet with `reviewer_id` ≠ author and content may move toward PUBLISHED per pipeline, **or** (b) explicit closed-beta preview contract remains and catalog is non-empty for invitees (already true locally/tunnel). **Never** mark PUBLISHED without JPJO.
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

## CODE shipped this pass (§9 Admin ≤ learner craft)

- Confirmed: no learner `Link`/`href` to `/admin` except intentional admin role gate on `/[locale]/admin/beta` (`canAccessAdminArea` → `notFound`).
- Speaking practice: primary Speak CTA; dead “Reveal” removed; empty try-first hint; next-line soft-gated until attempt; mic-error → self-check; listening status / unsupported empty states.
- Listening: secondary play control (not ghost); idle hint; error + retry; unavailable path with status (not silent null).
- RU speakingHint mixed-script `кlatce` → `klatce`.
- Admin beta console **not** gutted; no learner-nav leak of adminBeta strings.

## WAITING_ON_FOUNDER

**Status:** ~**42.7 / 50** — CODE craft on §3/§9; LIVE_TUNNEL day-1 still **done**; prior ruthless ~42.4 **held** as baseline. Goal **not** complete.

**Blocked on:** durable HTTPS (Neon + Vercel preferred) **and** independent JPJO. Do **not** force Neon/Vercel logins.

**Founder: reply with exactly ONE of:**

1. **Neon Direct URL** (paste) — agent runs bootstrap/migrate only after that
2. **`vercel залогинен`** — founder already logged in; agent may then use CLI without opening browser auth
3. **`пауза эталона`** — pause reference-quality push; no deploy / no auth work

**Hard rule for agents:** do **not** run `vercel login`, browser OAuth, or any credential probe that opens a browser until the founder chooses (1), (2), or (3). No deploy attempts while waiting.

### After founder chooses (ranked)

1. **Neon Create** → paste pooled + direct URLs → `scripts/neon-bootstrap.ps1` → migrate *(only if (1))*
2. Link Vercel project → set production env → deploy → `scripts/smoke-vercel.ps1` *(only if (2) or after founder auth)*
3. **`scripts/bootstrap-first-admin.ps1`** on production DB (`DEMO_MODE=false`)
4. Run **live day-1 bakeoff** against durable `BASE_URL`; file artifact
5. Book **JPJO** reviewer; first hall packet decision (APPROVE/REJECT) — no AI self-approve
6. Optional: named Cloudflare tunnel + always-on host if Vercel still blocked (still ≠ §8 durable claim)
7. Optional: fill GitHub `private-beta` secrets if using Actions deploy path

See [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md) and [`external-unblock-wizard.md`](../operations/external-unblock-wizard.md).
