/**
 * Resolve human lesson titles for learner surfaces (Kronika, Progress).
 * Never use EX-… exercise IDs as the primary label.
 * Uses ungated YAML (peek) so DRAFT closed-beta titles still resolve.
 */

import {
  loadAllModulesFromYaml,
  peekModuleById,
} from "@/lib/content/load-module";

const FALLBACK_BY_LOCALE = {
  ru: "Урок",
  uk: "Урок",
  pl: "Lekcja",
} as const;

export type LessonTitleLocale = keyof typeof FALLBACK_BY_LOCALE;

function findLessonTitlePl(lessonId: string): string | null {
  for (const mod of loadAllModulesFromYaml()) {
    const lesson = mod.lessons.find(
      (l) => l.id === lessonId || l.slug === lessonId,
    );
    if (lesson?.titlePl?.trim()) return lesson.titlePl.trim();
  }
  return null;
}

/** Map attempt response fields → display title (lesson titlePl preferred). */
export function resolveAttemptLessonTitle(
  response: Record<string, unknown> | null | undefined,
  locale: LessonTitleLocale = "ru",
): string {
  const lessonId =
    response && typeof response.lessonId === "string" ? response.lessonId : null;
  if (lessonId) {
    const title = findLessonTitlePl(lessonId);
    if (title) return title;
  }

  const moduleId =
    response && typeof response.moduleId === "string" ? response.moduleId : null;
  if (moduleId) {
    const peeked = peekModuleById(moduleId);
    if (peeked?.titlePl?.trim()) return peeked.titlePl.trim();
  }

  // Never surface EX-… as the primary civilian label
  const exerciseCanonicalId =
    response && typeof response.exerciseCanonicalId === "string"
      ? response.exerciseCanonicalId
      : null;
  if (exerciseCanonicalId) {
    const owner = findLessonOwningExercise(exerciseCanonicalId);
    if (owner) return owner;
  }

  return FALLBACK_BY_LOCALE[locale] ?? FALLBACK_BY_LOCALE.ru;
}

function findLessonOwningExercise(exerciseKey: string): string | null {
  for (const mod of loadAllModulesFromYaml()) {
    for (const lesson of mod.lessons) {
      const hit = lesson.exercises.some(
        (ex) => ex.id === exerciseKey || ex.canonicalId === exerciseKey,
      );
      if (hit) return lesson.titlePl;
    }
  }
  return null;
}

export function uiLocaleToConceptLabelLocale(
  locale: string | null | undefined,
): "ru" | "uk" | "pl" | "be" {
  const base = (locale ?? "ru").toLowerCase().split("-")[0];
  if (base === "uk") return "uk";
  if (base === "pl") return "pl";
  if (base === "be" || base === "bel") return "be";
  return "ru";
}
