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

## 8. Out of scope

Architecture ADRs · DB schema docs · certificate claims · gamification HUD · public content release before JPJO · simulating independent JPJO decisions in-app
