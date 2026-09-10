# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1 is foundation only — **not** reference quality.

## Wave 1 goals — shipped

| ID | Goal | Status |
| --- | --- | --- |
| A | Feedback pipeline: incorrect + L1 notes on wrong answers | **Shipped** — load keeps correct/incorrect; `evaluateAnswer` selects by outcome + profile L1; `FeedbackPanel` shows L1 line |
| B | Lesson player: structured dialogue / key lines / pan-pani / grammar | **Shipped** — `draftLessonToDetail` emits structured steps; LessonPlayer + ModuleOverview render form/use/examples |
| C | Closed-beta DRAFT via `BETA_ALLOW_DRAFT` without DEMO theater; civilian empty-state; short preview banner | **Shipped** — env + runtime + runbook; copy softened |
| D | Invite i18n; human review/Kronika labels; BEL respect; soften learner jargon | **Shipped** |
| E | Lesson result not presented as authoritative mastery from `?c=&n=` | **Shipped** — session-score framing only |

## Still broken vs reference bar

1. No listening audio path yet (§3).
2. No speaking path v1 yet (§3).
3. Result still uses client query params for session count — honest copy, not DB aggregate (§4/§E).
4. All content remains DRAFT — no JPJO PUBLISHED hall (§7).
5. Competitive week-1 vs Telegram phrasebot not measured (§10).
6. Admin/learner craft balance not audited (§9).

## Wave 2 backlog (ordered)

1. **Listening path** — audio for dialogue/key lines; interim contract if TTS/recording blocked.
2. **Speaking path v1** — constrained shadow / read-aloud / later record; define UX + data.
3. **Server-backed lesson result** — aggregate attempts for lesson session; retire `?c=&n=` as score source.
4. **JPJO human review packet execution** — first PUBLISHED hall without lying about status.
5. **Concept labels from curriculum inventory** — single source of truth (replace static map).
6. **Habit / daily plan copy** — outcome sentences (“завтра: заказ в кафе”), not ops modes.
7. **HTTPS deploy dry-run checklist** — operator completes from `.env.production.example` alone.
8. **Admin vs learner craft audit** — freeze admin growth until player polish passes bar §9.
9. **Competitive week-1 script** — timed walkthrough vs Telegram phrasebot; fix gaps found.

## External blockers (track)

- Railway / host: set `BETA_ALLOW_DRAFT=true` with `DEMO_*=false` on live HTTPS.
- Independent JPJO human reviewer calendar (content publish gate).
- Production secrets (`INVITE_TOKEN_PEPPER`, DB, auth) if not already provisioned.

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
