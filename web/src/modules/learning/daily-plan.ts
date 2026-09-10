/**
 * Deterministic 15-minute daily plan (server-side, no localStorage).
 *
 * Priority order (documented + tested):
 * 1. Unfinished lesson in the current module (continue)
 * 2. Weak concepts (mastery LEARNING / REVIEW_DUE / NOT_STARTED with evidence)
 * 3. Error review (recent incorrect attempts)
 * 4. Mini-check at module end when lesson practice is complete
 *
 * Preview and live scopes are never mixed — caller passes masteryScope.
 * Reasons are i18n keys (learn.planReason.*) — never English internal strings in UI.
 */

import type { MasteryScope } from "./attempt-mode";

export type DailyPlanInput = {
  now: Date;
  masteryScope: MasteryScope;
  modules: Array<{
    id: string;
    title: string;
    lessonIds: string[];
    unfinishedLessonId: string | null;
    miniCheckReady: boolean;
    miniCheckExerciseIds: string[];
  }>;
  weakConcepts: Array<{
    conceptCanonicalId: string;
    state: string;
    errorCount: number;
    masteryScope: MasteryScope;
    href?: string | null;
  }>;
  recentErrors: Array<{
    exerciseId: string;
    conceptCanonicalId: string | null;
    at: string;
    masteryScope: MasteryScope;
    href?: string | null;
    moduleId?: string | null;
  }>;
};

export type DailyPlanItem =
  | {
      kind: "unfinished_lesson";
      moduleId: string;
      lessonId: string;
      title: string;
      minutes: number;
      reasonKey: "unfinishedLesson";
      href: string;
    }
  | {
      kind: "weak_concept";
      conceptCanonicalId: string;
      minutes: number;
      reasonKey: "weakConcept";
      href: string | null;
    }
  | {
      kind: "error_review";
      exerciseId: string;
      conceptCanonicalId: string | null;
      minutes: number;
      reasonKey: "errorReview";
      href: string | null;
    }
  | {
      kind: "mini_check";
      moduleId: string;
      exerciseIds: string[];
      minutes: number;
      reasonKey: "miniCheck";
      href: string;
    };

/** Life-outcome hall for plan CTA copy (not curriculum IDs). */
export type PlanHallKey =
  | "spotkanie"
  | "kawiarnia"
  | "sklep"
  | "transport"
  | "urzad"
  | "generic";

export type DailyPlan = {
  targetMinutes: 15;
  masteryScope: MasteryScope;
  generatedAt: string;
  items: DailyPlanItem[];
  nextGoalKey:
    | "finishLesson"
    | "miniCheck"
    | "strengthenConcept"
    | "reviewErrors"
    | "openNextSala";
  /** Hall for adaptive planGoal copy. */
  hallKey: PlanHallKey;
  /** @deprecated use nextGoalKey + i18n */
  nextGoal: string;
};

const TARGET = 15;

const MODULE_HALL: Record<string, PlanHallKey> = {
  "pierwsze-spotkanie": "spotkanie",
  "w-kawiarni": "kawiarnia",
  "w-sklepie": "sklep",
  "droga-i-transport": "transport",
  "pierwsza-sprawa-w-urzedzie": "urzad",
};

export function hallKeyForModuleId(moduleId: string | null | undefined): PlanHallKey {
  if (!moduleId) return "generic";
  return MODULE_HALL[moduleId] ?? "generic";
}

/** Explainable weak-concept threshold: REVIEW_DUE always; LEARNING with ≥2 errors. */
export function isWeakConcept(state: string, errorCount: number): boolean {
  if (state === "REVIEW_DUE") return true;
  if (state === "LEARNING" && errorCount >= 2) return true;
  if (state === "NOT_STARTED" && errorCount >= 1) return true;
  return false;
}

function resolveHallKey(
  items: DailyPlanItem[],
  modules: DailyPlanInput["modules"],
): PlanHallKey {
  const first = items[0];
  if (first?.kind === "unfinished_lesson" || first?.kind === "mini_check") {
    return hallKeyForModuleId(first.moduleId);
  }
  const unfinished = modules.find((m) => m.unfinishedLessonId);
  if (unfinished) return hallKeyForModuleId(unfinished.id);
  if (modules[0]) return hallKeyForModuleId(modules[0].id);
  return "generic";
}

export function buildDailyPlan(input: DailyPlanInput): DailyPlan {
  const scope = input.masteryScope;
  const items: DailyPlanItem[] = [];
  let remaining = TARGET;

  const take = (mins: number) => {
    const use = Math.min(mins, remaining);
    remaining -= use;
    return use;
  };

  for (const mod of input.modules) {
    if (remaining <= 0) break;
    if (!mod.unfinishedLessonId) continue;
    const minutes = take(8);
    if (minutes <= 0) break;
    items.push({
      kind: "unfinished_lesson",
      moduleId: mod.id,
      lessonId: mod.unfinishedLessonId,
      title: mod.title,
      minutes,
      reasonKey: "unfinishedLesson",
      href: `/learn/lessons/${mod.unfinishedLessonId}`,
    });
    break;
  }

  const weak = input.weakConcepts
    .filter((c) => c.masteryScope === scope)
    .filter((c) => isWeakConcept(c.state, c.errorCount))
    .sort((a, b) => b.errorCount - a.errorCount);
  for (const c of weak) {
    if (remaining <= 0) break;
    const minutes = take(4);
    if (minutes <= 0) break;
    items.push({
      kind: "weak_concept",
      conceptCanonicalId: c.conceptCanonicalId,
      minutes,
      reasonKey: "weakConcept",
      href: c.href ?? null,
    });
    if (items.filter((i) => i.kind === "weak_concept").length >= 2) break;
  }

  const errors = input.recentErrors
    .filter((e) => e.masteryScope === scope)
    .slice(0, 3);
  for (const e of errors) {
    if (remaining <= 0) break;
    const minutes = take(3);
    if (minutes <= 0) break;
    items.push({
      kind: "error_review",
      exerciseId: e.exerciseId,
      conceptCanonicalId: e.conceptCanonicalId,
      minutes,
      reasonKey: "errorReview",
      href: e.href ?? null,
    });
  }

  for (const mod of input.modules) {
    if (remaining <= 0) break;
    if (!mod.miniCheckReady || mod.miniCheckExerciseIds.length === 0) continue;
    const minutes = take(5);
    if (minutes <= 0) break;
    const lessonId =
      mod.lessonIds[mod.lessonIds.length - 1] ?? mod.lessonIds[0] ?? null;
    items.push({
      kind: "mini_check",
      moduleId: mod.id,
      exerciseIds: [...mod.miniCheckExerciseIds],
      minutes,
      reasonKey: "miniCheck",
      href: lessonId ? `/learn/lessons/${lessonId}` : `/learn/${mod.id}`,
    });
    break;
  }

  const nextGoalKey: DailyPlan["nextGoalKey"] =
    items[0]?.kind === "unfinished_lesson"
      ? "finishLesson"
      : items[0]?.kind === "mini_check"
        ? "miniCheck"
        : items[0]?.kind === "weak_concept"
          ? "strengthenConcept"
          : items[0]?.kind === "error_review"
            ? "reviewErrors"
            : "openNextSala";

  const hallKey = resolveHallKey(items, input.modules);

  return {
    targetMinutes: TARGET,
    masteryScope: scope,
    generatedAt: input.now.toISOString(),
    items,
    nextGoalKey,
    hallKey,
    nextGoal: nextGoalKey,
  };
}
