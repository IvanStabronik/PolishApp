# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1 + Wave 2 foundations only — **not** reference quality.  
**Re-audit (post–Wave 1):** ~**21.5 / 50** against `reference-quality-bar.md`. Wave 1 **D** (human labels / civilian chrome) was an **overclaim** — Kronika/Progress still leaked `EX-…` and English result tokens; DRAFT badges and ops jargon remained on learner surfaces.

## Wave 1 goals — honest regrade

| ID | Goal | Status |
| --- | --- | --- |
| A | Feedback pipeline: incorrect + L1 notes on wrong answers | **Shipped** (keep) |
| B | Lesson player: structured dialogue / key lines / pan-pani / grammar | **Shipped** (keep) |
| C | Closed-beta DRAFT via `BETA_ALLOW_DRAFT` without DEMO theater | **Shipped** (keep) |
| D | Invite i18n; human review/Kronika labels; BEL respect; soften jargon | **Overclaimed** — fixed in Wave 2 (titles, locale labels, purge badges) |
| E | Lesson result not presented as authoritative mastery from `?c=&n=` | **Partial** — honest copy shipped; Wave 2 adds server session aggregates |

## Wave 2 — shipped this pass (reprioritized order)

1. **Identity leakage** — Kronika/Progress resolve `lessonId` → `titlePl`; never lead with `EX-…`; localize correct/incorrect; concept labels use UI locale (not hardcoded `"ru"`).
2. **Learner ops chrome** — removed DRAFT/Черновик badges from module cards & A1 catalog; one `PreviewBanner` only; softened catalog/review empty copy (no “mastery” / “черновики” in civilian strings).
3. **Attempts reliable** — `ensureModuleContentVersionId` for YAML closed-beta path; idempotent replay restores `l1Note`; attempt API merges fresh profile L1 note on replay.
4. **Session-1 path** — canonical hub `/learn/[moduleId]` → lessons → player; `/learn/modules/[id]` redirects; flat “start practice” / raw path dump removed from module hub; continue CTA prefers lesson routes.
5. **Listening v1** — TTS play/replay on dialogue + key lines (`PolishLineAudio`); optional `audio_url` in schema for future assets; i18n uk/ru/pl.
6. **Speaking v1** — `speaking_practice` step kind + Pierwsze spotkanie lesson 01 fixture; Web Speech when available, self-check degrade otherwise; explicit non-exam framing.
7. **Server-backed lesson results** — `learning_sessions` start/complete API; attempts link `learningSessionId`; result page prefers server aggregate over `?c=&n=` (query kept as degraded fallback).

## Still broken vs reference bar

1. TTS ≠ assessed listening / human audio (FUN-110 / V2).
2. Speaking recognition is best-effort — not JPJO / exam scoring.
3. All content remains DRAFT — no JPJO PUBLISHED hall (§7).
4. Competitive week-1 vs Telegram phrasebot not measured (§10).
5. Admin/learner craft balance not audited (§9).
6. Concept labels still a static map — not full curriculum inventory SoT.
7. Habit / daily-plan outcome sentences incomplete.
8. HTTPS deploy dry-run not proven from `.env.production.example` alone.

## Wave 3 backlog (ordered)

1. **JPJO human review packet** — first PUBLISHED hall without lying about status.
2. **Human listening assets** — replace TTS interim for assessed listening where required.
3. **Concept labels from curriculum inventory** — single source of truth.
4. **Habit / daily plan copy** — outcome sentences (“завтра: заказ в кафе”).
5. **HTTPS deploy dry-run checklist** — operator completes from env example alone.
6. **Admin vs learner craft audit** — freeze admin growth until player polish passes §9.
7. **Competitive week-1 script** — timed walkthrough vs Telegram phrasebot; fix gaps found.
8. **Speaking privacy / upload policy** — if remote recording ever lands.

## External blockers (track)

- Railway / host: set `BETA_ALLOW_DRAFT=true` with `DEMO_*=false` on live HTTPS.
- Independent JPJO human reviewer calendar (content publish gate).
- Production secrets (`INVITE_TOKEN_PEPPER`, DB, auth) if not already provisioned.
- Browser TTS / SpeechRecognition quality and availability (Chrome-first; Safari/Firefox degrade).

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
