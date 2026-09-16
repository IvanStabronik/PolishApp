# Goal completion audit — reference-quality bar

**Date:** 2026-09-16  
**Branch:** `docs/requirements-r2`  
**HEAD at audit start (prior pass):** ~43.9/50  
**Stance:** Evidence-based. **Goal not complete.** No fake JPJO APPROVE / PUBLISHED. No durable Vercel claimed. No Neon/Vercel login forced.

## Criterion map (post §5 civilian ops jargon sweep)

| # | Criterion | Before | After | What would make 5/5 | CODE vs EXTERNAL |
| --- | --- | ---: | ---: | --- | --- |
| 1 | Session-1 life loop without staff | 4.65 | 4.65 | Durable HTTPS invite→plan without host machine / ephemeral hostname | **EXTERNAL** (Neon+Vercel or always-on named tunnel) |
| 2 | Feedback that teaches | 4.65 | 4.65 | Deep tutoring beyond chrome; studio L1 contrast essays if needed | Mostly **CODE done** for A1 chrome; depth **EXTERNAL**/content craft |
| 3 | Listening + speaking path | 4.0 | 4.0 | Studio listening + exam-grade speaking | **EXTERNAL** / V2 (edge-tts + Web Speech interim ceiling) |
| 4 | Human-readable progress | 4.1 | 4.1 | Multi-day narratable habit on live durable host | Remaining lift mostly **EXTERNAL** week |
| 5 | Zero civilian ops jargon | 3.95 | 4.3 | JPJO human pass on chrome; zero residual “beta theater” smell on every surface | Mostly **CODE done**; polish ceiling without JPJO |
| 6 | BEL first-class L1 | 5.0 | 5.0 | Optional JPJO pass on `be.json` chrome | **CODE done** for UI locale `be` + key parity; copy not JPJO-reviewed |
| 7 | Content honesty contract | 4.0 | 4.0 | JPJO APPROVE → PUBLISHED **or** keep closed-beta preview forever | **EXTERNAL** JPJO human |
| 8 | Deploy teaches someone | 4.7 | 4.7 | Live `BASE_URL` health/ready smoke PASS on Vercel+Neon | **EXTERNAL** credentials |
| 9 | Admin weight ≤ learner craft | 3.5 | 3.5 | Keep freeze; more learner craft than admin | Freeze held — OK |
| 10 | Competitive first week | 4.0 | 4.0 | Durable multi-day week beats phrasebot friction | **EXTERNAL** durable host + invitees |
| | **Total** | **~43.9** | **~44.3** | Reference = all ten critically pass | Still **EXTERNAL** wall |

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

## CODE shipped this pass (§5 civilian ops jargon)

- Learner i18n (`ru`/`uk`/`be`/`pl`): removed `DEMO_PREVIEW`, `/admin/beta`, English `triage`, admin-path dumps, «освоение»/опанування/засваенне/opanowanie calques; DRAFT badge labels → adult «в подготовке» / equivalents.
- Honest preview banner kept as one short sentence (no ops dump); invite email template softened for civilians.
- Unit guard in `locale-l1.test.ts`: forbids JPJO / `DEMO_*` / `DRAFT` / `previewer` / `mastery` / `triage` / `/admin` in non-`adminBeta` message namespaces.
- Admin chrome may keep JPJO / ops vocabulary.

## WAITING_ON_FOUNDER

**Status:** ~**44.3 / 50** — CODE + LIVE_TUNNEL day-1 **done**; §5 jargon sweep shipped. Goal **not** complete.

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
