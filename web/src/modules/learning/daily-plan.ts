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
 */

import type { MasteryScope } from "./attempt-mode";

export type DailyPlanInput = {
  now: Date;
  masteryScope: MasteryScope;
  modules: Array<{
    id: string;
    title: string;
    lessonIds: string[];
    /** First incomplete lesson id, or null if all done / none started */
    unfinishedLessonId: string | null;
    /** True when all non-mini-check exercises done and mini-check remains */
    miniCheckReady: boolean;
    miniCheckExerciseIds: string[];
  }>;
  weakConcepts: Array<{
    conceptCanonicalId: string;
    state: string;
    errorCount: number;
    masteryScope: MasteryScope;
  }>;
  recentErrors: Array<{
    exerciseId: string;
    conceptCanonicalId: string | null;
    at: string;
    masteryScope: MasteryScope;
  }>;
};

export type DailyPlanItem =
  | {
      kind: "unfinished_lesson";
      moduleId: string;
      lessonId: string;
      title: string;
      minutes: number;
      reason: string;
    }
  | {
      kind: "weak_concept";
      conceptCanonicalId: string;
      minutes: number;
      reason: string;
    }
  | {
      kind: "error_review";
      exerciseId: string;
      conceptCanonicalId: string | null;
      minutes: number;
      reason: string;
    }
  | {
      kind: "mini_check";
      moduleId: string;
      exerciseIds: string[];
      minutes: number;
      reason: string;
    };

export type DailyPlan = {
  targetMinutes: 15;
  masteryScope: MasteryScope;
  generatedAt: string;
  items: DailyPlanItem[];
  nextGoal: string;
};

const TARGET = 15;

/** Explainable weak-concept threshold: REVIEW_DUE always; LEARNING with ≥2 errors. */
export function isWeakConcept(state: string, errorCount: number): boolean {
  if (state === "REVIEW_DUE") return true;
  if (state === "LEARNING" && errorCount >= 2) return true;
  if (state === "NOT_STARTED" && errorCount >= 1) return true;
  return false;
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

  // 1. Unfinished lesson
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
      reason: "Continue unfinished lesson before starting new material",
    });
    break;
  }

  // 2. Weak concepts (same scope only)
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
      reason: `Weak concept (${c.state}, errors=${c.errorCount})`,
    });
    if (items.filter((i) => i.kind === "weak_concept").length >= 2) break;
  }

  // 3. Error review
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
      reason: "Revisit a recent incorrect attempt",
    });
  }

  // 4. Mini-check at module end
  for (const mod of input.modules) {
    if (remaining <= 0) break;
    if (!mod.miniCheckReady || mod.miniCheckExerciseIds.length === 0) continue;
    const minutes = take(5);
    if (minutes <= 0) break;
    items.push({
      kind: "mini_check",
      moduleId: mod.id,
      exerciseIds: [...mod.miniCheckExerciseIds],
      minutes,
      reason: "Module practice complete — run mini-check",
    });
    break;
  }

  const nextGoal =
    items[0]?.kind === "unfinished_lesson"
      ? `Finish lesson in ${items[0].title}`
      : items[0]?.kind === "mini_check"
        ? "Complete module mini-check"
        : items[0]?.kind === "weak_concept"
          ? `Strengthen ${items[0].conceptCanonicalId}`
          : items[0]?.kind === "error_review"
            ? "Review yesterday’s errors"
            : "Open the next Sala when ready";

  return {
    targetMinutes: TARGET,
    masteryScope: scope,
    generatedAt: input.now.toISOString(),
    items,
    nextGoal,
  };
}
