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

Nav (signed-in): Dashboard · Learn · Progress · Settings · Privacy.

### Onboarding fields

UI locale · L1 (ukr/rus/bel **separate**) · level · goal · weekly · consent (+ age 18+).

### Dual lore label

```text
Зал 1 · Знакомство / Учебный модуль A1
```

### Demo preview

`DEMO_PREVIEW` / `NEXT_PUBLIC_DEMO_PREVIEW` = `true`|`1` → DRAFT catalog + banner. Preview attempts must not write live mastery.

---

## 4. Suggested Figma pages

1. Foundations (color, type, focus, motion)  
2. Components  
3. Flow: Landing → Auth → Onboarding → Dashboard → Learn → Exercise → Result → Progress → Settings → Privacy  
4. States: draft banner, correct/incorrect feedback, delete confirm  
5. a11y: skip link, live region, focus order  

## 5. Out of scope

Architecture ADRs · DB schema docs · authoring CMS · certificate claims · gamification HUD
