# Improvement loop status

**Branch:** `docs/requirements-r2`  
**Stance:** Wave 1–3 foundations only — **not** reference quality.  
**Re-audit (post–Wave 2):** ~**30.5 / 50** against `reference-quality-bar.md`.  
Wave 2 listening/speaking were **PARTIAL / thin** (TTS on dialogue ≠ assessed listening; speaking only on PS L01). Session-link race left early attempts unlinked until Wave 3 harden.

## Wave 1 goals — honest regrade

| ID | Goal | Status |
| --- | --- | --- |
| A | Feedback pipeline: incorrect + L1 notes on wrong answers | **Shipped** (keep) |
| B | Lesson player: structured dialogue / key lines / pan-pani / grammar | **Shipped** (keep) |
| C | Closed-beta DRAFT via `BETA_ALLOW_DRAFT` without DEMO theater | **Shipped** (keep) |
| D | Invite i18n; human review/Kronika labels; BEL respect; soften jargon | **Overclaimed** in W1 — fixed in Wave 2 |
| E | Lesson result not presented as authoritative mastery from `?c=&n=` | **Partial** → Wave 2 session aggregates; Wave 3 session-link harden |

## Wave 2 — honest regrade (~30.5/50)

| Item | Claimed | Honest |
| --- | --- | --- |
| Identity leakage / ops chrome purge | Shipped | **Keep** |
| Attempts + YAML content version | Shipped | **Keep** |
| Session-1 hub path | Shipped | **Keep** |
| Listening v1 (TTS on dialogue) | Shipped | **PARTIAL** — not assessed listening |
| Speaking v1 | Shipped | **PARTIAL / thin** — PS L01 only; best-effort Web Speech |
| Server lesson results | Shipped | **PARTIAL** — race: `useEffect` session start after early attempts |

## Wave 3 — shipped this pass

1. **Session reliability** — `ensureOpenLessonSession` on lesson page (SSR) + on first attempt persist; aggregates include orphan attempts in session window; client picks up `learningSessionId` from attempt response.
2. **Hub TTS** — `ModuleOverview` dialogue + key lines use `PolishLineAudio` (was silent).
3. **Speaking coverage** — `speaking_practice` on Pierwsze spotkanie L01–L03 and W kawiarni L01; non-exam honesty copy retained.
4. **Content deepen (PS 01–03)** — adult distractors, distinct UK/BEL/RU L1 traps, productive dual gap; versions bumped; still **DRAFT**.
5. **Assessed listening type** — schema `listening` + PS L01 `ex-ps-listen-01` (TTS interim for `audio_text_pl`); migration `0008_listening_exercise_type`.
6. **Habit / plan life-outcome copy** — uk/ru/pl `planGoal` / `planReason` / dashboard CTA (“завтра: знакомство / кафе / tram / urząd”).
7. **Concept labels** — expanded map + curriculum inventory SoT fallback (`curriculum-labels.ts`); GR-/FN- never primary UI.
8. **HTTPS dry-run checklist** — `docs/operations/https-deploy-dry-run.md` fail-closed; `deploy.yml` Railway path requires `RAILWAY_SERVICE_ID` (no invented secrets).
9. **Learner craft polish** — speaking/listen controls quieter Archive tone; **admin craft freeze** this wave (no new admin features).

## Still broken vs reference bar

1. TTS ≠ human/studio listening assets (FUN-110 / V2).
2. Speaking recognition still best-effort — not JPJO / exam scoring.
3. All content remains DRAFT — no JPJO PUBLISHED hall (§7).
4. Competitive week-1 vs Telegram phrasebot not measured (§10).
5. HTTPS dry-run checklist exists; **live** HTTPS not proven without external secrets.
6. Concept SoT parser covers inventory headings — curated map still needed for life-outcome phrasing.
7. Listening assessed items are sparse (one vertical seed).

## Wave 4 backlog (ranked by audit pressure)

1. **JPJO human review packet** — first PUBLISHED hall without lying about status. **EXTERNAL**
2. **Human listening assets** — replace TTS interim for assessed listening where required.
3. **Competitive week-1 script** — timed walkthrough vs Telegram phrasebot; fix gaps found.
4. **HTTPS live proof** — operator completes dry-run with real Railway/host secrets; health/ready on public URL. **EXTERNAL**
5. **Speaking privacy / upload policy** — if remote recording ever lands.
6. **Broader speaking + listening coverage** — remaining A1 halls beyond PS / café seed.
7. **Admin vs learner craft audit** — keep freeze until player polish passes §9 again.

## Admin craft freeze (Wave 3+)

No new admin/author/reviewer features this wave. Learner player, feedback, progress, and copy take priority until §9 no longer fails by attention imbalance.

## External blockers (track)

- Railway / host: set `BETA_ALLOW_DRAFT=true` with `DEMO_*=false` on live HTTPS; provision `RAILWAY_TOKEN` + `RAILWAY_SERVICE_ID` or `DEPLOY_WEBHOOK_URL`.
- Independent JPJO human reviewer calendar (content publish gate).
- Production secrets (`INVITE_TOKEN_PEPPER`, DB, auth) if not already provisioned.
- Browser TTS / SpeechRecognition quality and availability (Chrome-first; Safari/Firefox degrade).

## Loop ritual

improve → critical recheck against `reference-quality-bar.md` → refresh this backlog → improve.
