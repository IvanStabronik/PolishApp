# Goal completion audit — reference-quality bar

**Date:** 2026-09-15  
**Branch:** `docs/requirements-r2`  
**HEAD at audit start:** `fabb1cb` (~42.5/50)  
**Stance:** Evidence-based. **Goal not complete.** No fake JPJO APPROVE / PUBLISHED. No durable Vercel claimed.

## Criterion map (post CODE pack)

| # | Criterion | Before | After | What would make 5/5 | CODE vs EXTERNAL |
| --- | --- | ---: | ---: | --- | --- |
| 1 | Session-1 life loop without staff | 4.65 | 4.65 | Durable HTTPS invite→plan without host machine / ephemeral hostname | **EXTERNAL** (Neon+Vercel or always-on named tunnel) |
| 2 | Feedback that teaches | 4.5 | 4.65 | Deep tutoring beyond chrome; studio L1 contrast essays if needed | Mostly **CODE done** for A1 chrome; depth **EXTERNAL**/content craft |
| 3 | Listening + speaking path | 4.0 | 4.0 | Studio listening + exam-grade speaking | **EXTERNAL** / V2 (edge-tts + Web Speech interim ceiling) |
| 4 | Human-readable progress | 3.9 | 4.1 | Multi-day narratable habit on live durable host | Remaining lift mostly **EXTERNAL** week |
| 5 | Zero civilian ops jargon | 3.75 | 3.95 | Banner stays honest; no residual “режим/освоение” ops smell | Residual **CODE** polish diminishing |
| 6 | BEL first-class L1 | 4.5 | 4.7 | Optional BEL UI locale (today shares RU menu) | UI locale split = product decision (**CODE** possible later); theory parity **CODE done** |
| 7 | Content honesty contract | 4.0 | 4.0 | JPJO APPROVE → PUBLISHED **or** keep closed-beta preview forever | **EXTERNAL** JPJO human |
| 8 | Deploy teaches someone | 4.7 | 4.7 | Live `BASE_URL` health/ready smoke PASS on Vercel+Neon | **EXTERNAL** credentials |
| 9 | Admin weight ≤ learner craft | 3.5 | 3.5 | Keep freeze; more learner craft than admin | Freeze held — OK |
| 10 | Competitive first week | 3.9 | 4.0 | Durable multi-day week beats phrasebot friction | **EXTERNAL** durable host + invitees |
| | **Total** | **~42.5** | **~43.5** | Reference = all ten critically pass | Still **EXTERNAL** wall |

## What must still be true for goal complete

Evidence required — not docs alone:

1. **Durable live HTTPS** — Vercel (or equivalent) production URL with `GET /api/health` and `GET /api/ready` **200**, plus `scripts/smoke-vercel.ps1 -BaseUrl https://…` **PASS**. Tunnel smoke / LIVE_TUNNEL day-1 does **not** satisfy this.
2. **Invite Session-1 on that durable URL** — invite → onboard → DRAFT hall (preview banner) → lesson with dialogue + practice → honest feedback → plan “tomorrow” — Playwright or recorded bakeoff artifact dated after deploy.
3. **JPJO honesty** — either (a) independent reviewer **APPROVE** recorded in hall packet with `reviewer_id` ≠ author and content may move toward PUBLISHED per pipeline, **or** (b) explicit closed-beta preview contract remains and catalog is non-empty for invitees (already true locally/tunnel). **Never** mark PUBLISHED without JPJO.
4. **Neon (or Supabase) `DATABASE_URL`** — migrate + first-admin bootstrap with `DEMO_MODE=false`; not docker-only.
5. **GitHub `private-beta` secrets** — optional if Vercel Git env alone; currently **count 0**.
6. **Competitive week** — at least one invitee multi-day log on durable host; phrasebot friction comparison **PASS** or documented near-parity. LIVE_TUNNEL day-1 alone = **PARTIAL**.

## Credentials re-probe (this session)

| Probe | Result |
| --- | --- |
| `gh auth status` | **OK** (IvanStabronik) |
| `vercel whoami` | **No credentials** |
| `web/.vercel` link | **Absent** |
| `DATABASE_URL` / `NEON_*` in process env | **Unset** |
| `web/.env.local` | **Exists** (local closed-beta only) |
| GitHub Environment `private-beta` secrets `total_count` | **0** |

**Deploy:** not possible this session. No durable Vercel claim.

## CODE shipped this pass (learner value)

- UK/BEL instructional maps for **all remaining** A1 key-line explanations, pan/pani summaries, and grammar summary/meaning/use (`instructional-theory-extra.ts` → `instructional-body-locale.ts`).
- Civilian chrome soften: preview badge/status, progress/result copy, catalog “уровень {code}” instead of “учебный модуль”.
- Progress page next-action CTAs (plan + dashboard).
- Unit coverage for theory-extra + tunnel cookie/Referer Origin edge.

## Founder actions (ranked)

1. **Neon Create** → paste pooled + direct URLs → `scripts/neon-bootstrap.ps1` → migrate.
2. **`vercel login`** → link project → set production env (`DATABASE_URL`, auth secrets, `BETA_ALLOW_DRAFT=true`, `DEMO_*=false`) → deploy → `scripts/smoke-vercel.ps1`.
3. **`scripts/bootstrap-first-admin.ps1`** on production DB (`DEMO_MODE=false`).
4. Run **live day-1 bakeoff** against durable `BASE_URL`; file artifact.
5. Book **JPJO** reviewer; first hall packet decision (APPROVE/REJECT) — no AI self-approve.
6. Optional: named Cloudflare tunnel + always-on host if Vercel still blocked (still ≠ production bar for §8 durable claim).
7. Optional: fill GitHub `private-beta` secrets if using Actions deploy path.

See [`FOUNDER-UNBLOCK-NOW.md`](../operations/FOUNDER-UNBLOCK-NOW.md) and [`external-unblock-wizard.md`](../operations/external-unblock-wizard.md).
