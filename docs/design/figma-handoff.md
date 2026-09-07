# Figma handoff — SŁOWARIUM Milestone 1 UI

**Product:** SŁOWARIUM (`slowarium`)
**Tone:** Archive of Living Speech · serious academy (not gamified SaaS)
**Figma file:** [SŁOWARIUM — Product Foundation](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G) ([Figma foundation](76b53c41-7623-476c-a042-7b42ca65866a))
**Code source of truth:** `web/src/app/globals.css`, `web/src/components/**`, `web/src/app/[locale]/**`
**UI locales:** `ru` | `uk` | `pl`
**L1 (separate):** `ukr` | `rus` | `bel`

---

## 1. Design tokens

### Color

| Token | Hex | Role |
| --- | --- | --- |
| `--color-ink` / `--color-navy` | `#0C1A2B` | Primary text, primary buttons |
| `--color-ink-soft` | `#1A2D42` | Secondary headings |
| `--color-graphite` | `#3A424C` | Body secondary |
| `--color-graphite-muted` | `#5C6570` | Hints / meta |
| `--color-paper` | `#E9E2D4` | Page ground |
| `--color-paper-raised` | `#F2EBDD` | Surfaces |
| `--color-paper-sunken` | `#DDD4C4` | Recessed |
| `--color-line` | `#C4B9A6` | Borders |
| `--color-amber` | `#B06D1A` | Accent / focus companion |
| `--color-amber-deep` | `#8A5412` | Active nav, emphasis links |
| `--color-burgundy` | `#6E3D42` | Danger / caution |
| `--color-olive` | `#4F5C3E` | Muted secondary |
| `--color-success` | `#2F5D3A` | Correct (+ text label) |
| `--color-error` | `#8B2E2E` | Incorrect (+ text label) |

Compat aliases `--color-forest*` map to navy for older component refs.

**Avoid:** purple SaaS gradients, neon glow, cartoon XP chrome, flat white-only UI.

### Typography

| Role | Family | CSS var |
| --- | --- | --- |
| Display | Source Serif 4 | `--font-display` |
| UI | Source Sans 3 (Cyrillic + Latin) | `--font-ui` |

### Motion

- `fade-rise`, delayed fade, `ink-line`, soft bloom on hero
- Honour `prefers-reduced-motion`

### Focus

`:focus-visible` → paper + amber double ring. Skip link → `#main-content`.

---

## 2. Component inventory

| Component | Path |
| --- | --- |
| Skip link | `components/brand/skip-link.tsx` |
| Brand mark | `components/brand/brand-mark.tsx` |
| Site header / nav | `components/brand/site-header.tsx` |
| Preview / DRAFT banner | `components/brand/preview-banner.tsx` |
| Auth form | `components/brand/auth-form.tsx` |
| Onboarding form | `components/brand/onboarding-form.tsx` |
| Privacy actions | `components/brand/privacy-actions.tsx` |
| Button / LinkButton / Card / Badge | `components/ui/*` |
| Module card / overview | `components/learning/*` |
| Exercise player + choice + feedback | `components/learning/exercise-player.tsx` (+ choice-option, feedback-panel) |
| Lesson player (step shell) | `components/exercise/lesson-player.tsx` |
| Dual module label | `components/dual-module-label.tsx` |
| Mastery badge | `components/mastery-badge.tsx` |

---

## 3. Screen map (implemented routes)

| Screen | Route |
| --- | --- |
| Landing | `/[locale]` |
| Register | `/[locale]/register` |
| Invite accept | `/[locale]/invite/[token]` |
| Sign-in | `/[locale]/sign-in` |
| Onboarding | `/[locale]/onboarding` |
| Dashboard | `/[locale]/dashboard` |
| A1 catalog | `/[locale]/learn/a1` |
| Module (YAML overview) | `/[locale]/learn/[moduleId]` |
| Module (lessons list) | `/[locale]/learn/modules/[moduleId]` |
| Lesson player | `/[locale]/learn/lessons/[lessonId]` |
| Exercise player | `/[locale]/learn/[moduleId]/exercise/[exerciseId]` |
| Lesson result | `/[locale]/learn/lessons/[lessonId]/result` |
| Module result | `/[locale]/learn/[moduleId]/result` |
| Progress | `/[locale]/progress` |
| Settings | `/[locale]/settings` |
| Privacy (export/delete) | `/[locale]/privacy` |
| Daily plan (15 min) | `/[locale]/plan` |
| Review queue (Powtórka) | `/[locale]/review` |
| Kronika | `/[locale]/kronika` |
| Author list | `/[locale]/author` |
| Author / review detail | `/[locale]/author/[moduleId]` |
| Admin beta control center | `/[locale]/admin/beta` |
| Maintenance | `/[locale]/maintenance` |

Nav (signed-in): Dashboard · Learn · Progress · Settings · Privacy (+ plan / review / kronika from dashboard).

### Onboarding fields

UI locale · L1 (ukr/rus/bel **separate**) · level · goal · weekly · consent (+ age 18+).

### Dual lore label

```text
Зал 1 · Знакомство / Учебный модуль A1
```

### Demo preview (Milestone 2+)

Server `DEMO_PREVIEW` / `DEMO_MODE` enables private-alpha *environment*. DRAFT visibility still requires roles `previewer|author|reviewer|admin`. `NEXT_PUBLIC_DEMO_PREVIEW` alone is **not** authorization. Preview attempts write **preview** mastery scope only.

---

## 4. Suggested Figma pages (Milestone 3 structure)

Move prior M1–M2 frames to page **`Archive / M1–M2`** (do not delete). Target pages:

1. **Foundations** — color, type, focus, motion
2. **Components**
3. **Learner Desktop / Tablet / Mobile** — dashboard (real content), daily plan, module, lesson, 4 exercise types, feedback, review queue, result, Kronika, settings, privacy success/error
4. **Author & Review** — list, review detail, changes requested, approved-but-blocked
5. **System States** — loading / empty / error / 403 / 404
6. **Archive / M1–M2** — historical frames

**File:** https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G

Created / ensured M3 pages (node ids):

| Page | node-id |
| --- | --- |
| Archive / M1–M2 | `27:2` |
| Foundations | `27:3` |
| Components | `27:4` |
| Learner Desktop | `27:5` |
| Learner Tablet | `27:6` |
| Learner Mobile | `27:7` |
| Author & Review | `27:8` |
| System States | `27:9` |

Prior M1–M2 numbered pages (`01 Foundations` … `10 Auth Complete`) remain in-file for reference; migrate frames into `Archive / M1–M2` in a follow-up design pass without deleting history.

Code remains source of visual truth for implemented screens under `web/src/app/[locale]/**`.

---

## 5. Private Alpha Figma sync

Continue in the same file: https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G

## 6. Private Alpha M2 — frames updated

**File (same, no parallel file):** https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G
**Primary chrome locale:** RU · Polish learning phrases stay Polish
**Breakpoints:** Desktop 1440 · Tablet 834 · Mobile 390

### Components extended (`02 Components`)

- Button: added `State=Hover` for Primary / Amber / Secondary / Ghost (kept Default + Disabled)
- Feedback: added `Kind=Error` (persist failure)
- Nav/Mobile + Nav/MobileTabs
- ChoiceOption variants: Default / Hover / Selected / Disabled / Correct / Incorrect
- Fixed collapsed Auto Layout heights on Input, Card, ProgressBar, Feedback, EmptyState, Modal, ExerciseShell

### Auth & onboarding

| Page | Frames |
| --- | --- |
| `03 Auth & Onboarding` | Landing · RU, Onboarding · RU (localized) |
| `10 Auth Complete` | Login, Login · Focus, Login · Error, Register; Onboarding 01–07 (Age, UI locale, L1, Level, Goal, Weekly, Consent) |

### Learning flow (`04 Learning Flow`)

- Desktop / Dashboard · 5 A1 Modules (Pierwsze spotkanie, W kawiarni, W sklepie, Droga i transport, Pierwsza sprawa w urzędzie)
- Desktop / Module, Lesson, Result
- Exercise types: Single Choice, Multiple Choice, Gap Fill, Ordering
- Feedback: Correct, Incorrect, Persist Error
- Prior M1 frames kept as `M1 / *` reference

### Progress / settings / privacy

| Page | Frames |
| --- | --- |
| `05 Progress` | Desktop / Progress, Progress · Empty |
| `07 Settings & Privacy` | Settings, Privacy Export, Delete Confirmation |

### System states (`08 System States`)

Empty · Loading · Error · 403 · 404 · Feedback Correct/Incorrect/Persist Error · Focus/Hover/Disabled showcase

### Responsive

| Page | Frames |
| --- | --- |
| `09 Tablet` | Login, Dashboard (5 modules), Exercise, Settings, Progress |
| `06 Mobile` | Login, Dashboard, Module, Exercise · Single Choice, Settings, Privacy, Nav Drawer (+ top nav / tab bar) |

### Locale rule used in frames

- Product chrome (nav, buttons, settings, errors): Russian
- Learning content titles / prompts / options: Polish (e.g. `Szukam ___`, module titles)

## 7. Milestone 3 closed-beta screens (code)

Implemented in app (sync into Learner / Author pages above):

- Dashboard continue-learning + per-module %
- `/plan` daily plan, `/review` Powtórka, `/kronika`
- Author list + review detail (changes requested / approved-but-blocked)
- Privacy export success **and** error states (M2.1)

## 7b. Milestone 3 Figma frames (filled)

**File:** https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G
**Source clones:** `04 Learning Flow`, `06 Mobile`, `08 System States`, `09 Tablet` (Archive/M1–M2 untouched).

### Learner Desktop (`27:5`)

| Frame | node-id | Link |
| --- | --- | --- |
| M3 / Desktop · Dashboard | `30:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=30-2) |
| M3 / Desktop · Module + Lessons | `30:44` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=30-44) |
| M3 / Desktop · Lesson | `30:71` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=30-71) |
| M3 / Desktop · Plan | `32:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=32-2) |
| M3 / Desktop · Powtórka | `32:52` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=32-52) |
| M3 / Desktop · Exercise · Single Choice | `35:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-2) |
| M3 / Desktop · Exercise · Multiple Choice | `35:19` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-19) |
| M3 / Desktop · Exercise · Gap Fill | `35:42` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-42) |
| M3 / Desktop · Exercise · Ordering | `35:58` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-58) |
| M3 / Desktop · Feedback · Correct | `35:89` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-89) |
| M3 / Desktop · Feedback · Incorrect | `35:97` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-97) |
| M3 / Desktop · Feedback · Persist Error | `35:105` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-105) |
| M3 / Desktop · Kronika | `35:113` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=35-113) |

### Learner Tablet (`27:6`)

| Frame | node-id | Link |
| --- | --- | --- |
| M3 / Tablet · Dashboard | `36:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=36-2) |
| M3 / Tablet · Module + Lessons | `36:219` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=36-219) |
| M3 / Tablet · Lesson | `40:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=40-2) |
| M3 / Tablet · Plan | `40:18` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=40-18) |

### Learner Mobile (`27:7`)

| Frame | node-id | Link |
| --- | --- | --- |
| M3 / Mobile · Dashboard | `36:114` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=36-114) |
| M3 / Mobile · Module | `36:137` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=36-137) |
| M3 / Mobile · Lesson | `41:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=41-2) |
| M3 / Mobile · Plan | `41:20` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=41-20) |

### Author & Review (`27:8`)

| Frame | node-id | Link |
| --- | --- | --- |
| M3 / Desktop · Author List | `34:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=34-2) |
| M3 / Desktop · Author Review Detail | `37:33` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-33) |
| M3 / Desktop · Changes Requested | `37:87` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-87) |
| M3 / Desktop · Approved · Publication Blocked | `37:141` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-141) |

### System States (`27:9`)

| Frame | node-id | Link |
| --- | --- | --- |
| M3 / Desktop · Empty | `37:2` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-2) |
| M3 / Desktop · Loading | `37:8` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-8) |
| M3 / Desktop · Error | `37:13` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-13) |
| M3 / Desktop · 403 | `37:19` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-19) |
| M3 / Desktop · 404 | `37:26` | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=37-26) |

### Responsive rebuild (acceptance pass)

Fully rebuilt with auto-layout (not clipped desktop clones). Content width ≤ viewport; headlines/cards/CTAs visible; mobile Plan is a vertical step sequence; touch targets ≥ 44×44.

| Frame | node-id | Viewport |
| --- | --- | --- |
| M3 / Tablet · Lesson | `40:2` | 834×1112 |
| M3 / Tablet · Plan | `40:18` | 834×1020 |
| M3 / Mobile · Lesson | `41:2` | 390×844 |
| M3 / Mobile · Plan | `41:20` | 390×844 |

Prior clipped clones (`36:246`, `36:255`, `36:156`, `36:165`) were replaced.

### Design debt (deferred — not claimed as completed M3 work)

- Foundations (`27:3`) and Components (`27:4`) M3 copies remain empty; M1–M2 foundations/components already exist in-file and remain the visual source until a dedicated design-system sync pass.

## 7b. Milestone 4 — Operable Closed Beta

**Page:** `M4 Operable Closed Beta` (`45:2`)
Rebuilt for acceptance (2026-09): real RU chrome, metric cards, invite/learner/feedback UI, auto-layout, touch targets ≥44px. No placeholder “Counts / Actions / Learner table” blocks.

**Screenshots (repo):** `docs/design/figma-m4-screens/`

| Frame | node-id | Viewport | Link |
| --- | --- | --- | --- |
| M4 / Desktop · Invite accept | `45:3` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-3) |
| M4 / Mobile · Invite accept | `45:15` | 390×844 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-15) |
| M4 / Desktop · Invite invalid | `45:27` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-27) |
| M4 / Desktop · Invite expired | `45:33` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-33) |
| M4 / Desktop · Invite used | `45:39` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-39) |
| M4 / Desktop · Invite revoked | `45:45` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-45) |
| M4 / Desktop · Admin beta | `45:51` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-51) |
| M4 / Tablet · Admin beta | `45:61` | 834×1112 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-61) |
| M4 / Mobile · Admin beta | `45:69` | 390×844 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-69) |
| M4 / Desktop · Invite management | `45:77` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-77) |
| M4 / Desktop · Feedback form | `45:87` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-87) |
| M4 / Mobile · Feedback form | `45:99` | 390×844 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-99) |
| M4 / Desktop · Feedback inbox | `45:109` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-109) |
| M4 / Desktop · Ops error | `45:119` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-119) |
| M4 / Desktop · Maintenance | `45:125` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=45-125) |
| M4 / Desktop · Beta access disabled | `51:190` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=51-190) |
| M4 / Desktop · Feedback success | `51:101` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=51-101) |
| M4 / Desktop · Feedback error | `51:108` | 1440×900 | [open](https://www.figma.com/design/lKdDOQ9za0oYr0nS3c1g1G?node-id=51-108) |

Chrome language: **RU**. Polish appears only in learning content frames (not these ops/beta surfaces).

Note: long desktop Admin beta content may require vertical scrolling inside the 1440×900 frame (accepted as-is; not rebuilt in the dimensions_key fix).

## 8. Out of scope

Architecture ADRs · DB schema docs · certificate claims · gamification HUD · public content release before JPJO · simulating independent JPJO decisions in-app
