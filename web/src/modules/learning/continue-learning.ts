/**
 * Continue-learning dashboard snapshot from Postgres + YAML catalog.
 */

import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  attempts,
  conceptMastery,
  learnerProfiles,
  moduleProgress,
  modules,
} from "@/db/schema";
import {
  listPreviewModules,
  type ContentAccessContext,
} from "@/lib/content/load-module";
import { buildDailyPlan, type DailyPlan } from "./daily-plan";
import { buildReviewQueue, type ReviewQueue } from "./review-queue";
import type { MasteryScope } from "./attempt-mode";

export type ContinueLearningSnapshot = {
  overallPercent: number;
  perModule: Array<{
    moduleId: string;
    title: string;
    titlePl: string;
    percent: number;
    lessonsTotal: number;
    continueHref: string | null;
  }>;
  lastPoint: {
    moduleId: string;
    exerciseId: string | null;
    at: string;
  } | null;
  continueCta: { href: string; labelKey: string } | null;
  nextGoal: string;
  dailyPlan: DailyPlan;
  reviewQueue: ReviewQueue;
};

export async function loadContinueLearning(
  userId: string,
  access: ContentAccessContext,
  masteryScope: MasteryScope = "preview",
): Promise<ContinueLearningSnapshot> {
  const catalog = listPreviewModules(access);
  const db = getDb();

  const profile = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, userId),
    columns: { id: true },
  });

  let lastPoint: ContinueLearningSnapshot["lastPoint"] = null;
  const attemptedExerciseIds = new Set<string>();
  const errorByConcept = new Map<string, number>();
  const recentErrors: Array<{
    exerciseId: string;
    conceptCanonicalId: string | null;
    at: string;
    masteryScope: MasteryScope;
  }> = [];

  if (profile) {
    const recent = await db
      .select({
        id: attempts.id,
        correct: attempts.correct,
        createdAt: attempts.createdAt,
        response: attempts.response,
        masteryScope: attempts.masteryScope,
      })
      .from(attempts)
      .where(
        and(
          eq(attempts.learnerProfileId, profile.id),
          eq(attempts.masteryScope, masteryScope),
        ),
      )
      .orderBy(desc(attempts.createdAt))
      .limit(50);

    for (const row of recent) {
      const response = row.response as {
        moduleId?: string;
        exerciseCanonicalId?: string;
        answer?: { type?: string };
        evaluation?: { conceptId?: string };
      };
      const exerciseId =
        typeof response.exerciseCanonicalId === "string"
          ? response.exerciseCanonicalId
          : null;
      const moduleId =
        typeof response.moduleId === "string" ? response.moduleId : null;
      if (exerciseId) attemptedExerciseIds.add(exerciseId);
      if (!lastPoint && moduleId) {
        lastPoint = {
          moduleId,
          exerciseId,
          at: row.createdAt.toISOString(),
        };
      }
      if (row.correct === false && exerciseId) {
        const conceptId =
          typeof response.evaluation?.conceptId === "string"
            ? response.evaluation.conceptId
            : null;
        if (conceptId) {
          errorByConcept.set(
            conceptId,
            (errorByConcept.get(conceptId) ?? 0) + 1,
          );
        }
        recentErrors.push({
          exerciseId,
          conceptCanonicalId: conceptId,
          at: row.createdAt.toISOString(),
          masteryScope: row.masteryScope as MasteryScope,
        });
      }
    }
  }

  const perModule = catalog.map((mod) => {
    const total = Math.max(1, mod.exercises.length);
    const done = mod.exercises.filter(
      (ex) =>
        attemptedExerciseIds.has(ex.id) ||
        (ex.canonicalId && attemptedExerciseIds.has(ex.canonicalId)),
    ).length;
    const percent = Math.min(100, Math.round((done / total) * 100));
    const next = mod.exercises.find(
      (ex) =>
        !attemptedExerciseIds.has(ex.id) &&
        !(ex.canonicalId && attemptedExerciseIds.has(ex.canonicalId)),
    );
    return {
      moduleId: mod.id,
      title: mod.title,
      titlePl: mod.titlePl,
      percent,
      lessonsTotal: 3,
      continueHref: next
        ? `/learn/${mod.id}/exercise/${next.id}`
        : `/learn/${mod.id}`,
    };
  });

  const overallPercent =
    perModule.length === 0
      ? 0
      : Math.round(
          perModule.reduce((s, m) => s + m.percent, 0) / perModule.length,
        );

  const continueTarget =
    perModule.find((m) => m.percent < 100) ?? perModule[0] ?? null;

  const masteryRows = profile
    ? await db
        .select({
          conceptCanonicalId: conceptMastery.conceptCanonicalId,
          state: conceptMastery.state,
          masteryScope: conceptMastery.masteryScope,
          updatedAt: conceptMastery.updatedAt,
        })
        .from(conceptMastery)
        .where(
          and(
            eq(conceptMastery.learnerProfileId, profile.id),
            eq(conceptMastery.masteryScope, masteryScope),
          ),
        )
    : [];

  const dailyPlan = buildDailyPlan({
    now: new Date(),
    masteryScope,
    modules: catalog.map((mod) => {
      const unfinished = mod.exercises.find(
        (ex) =>
          !attemptedExerciseIds.has(ex.id) &&
          !(ex.canonicalId && attemptedExerciseIds.has(ex.canonicalId)) &&
          !mod.miniCheckExerciseIds.includes(ex.id),
      );
      const practiceDone = mod.exercises
        .filter((ex) => !mod.miniCheckExerciseIds.includes(ex.id))
        .every(
          (ex) =>
            attemptedExerciseIds.has(ex.id) ||
            (ex.canonicalId != null &&
              attemptedExerciseIds.has(ex.canonicalId)),
        );
      return {
        id: mod.id,
        title: mod.titlePl,
        lessonIds: [`les-${mod.id}-1`, `les-${mod.id}-2`, `les-${mod.id}-3`],
        unfinishedLessonId: unfinished ? `les-${mod.id}` : null,
        miniCheckReady: practiceDone && mod.miniCheckExerciseIds.length > 0,
        miniCheckExerciseIds: mod.miniCheckExerciseIds,
      };
    }),
    weakConcepts: masteryRows.map((m) => ({
      conceptCanonicalId: m.conceptCanonicalId,
      state: m.state,
      errorCount: errorByConcept.get(m.conceptCanonicalId) ?? 0,
      masteryScope: m.masteryScope as MasteryScope,
    })),
    recentErrors: recentErrors.slice(0, 5),
  });

  const reviewQueue = buildReviewQueue({
    now: new Date(),
    masteryScope,
    scheduled: [],
    mastery: masteryRows.map((m) => ({
      conceptCanonicalId: m.conceptCanonicalId,
      state: m.state,
      errorCount: errorByConcept.get(m.conceptCanonicalId) ?? 0,
      lastAttemptAt: m.updatedAt.toISOString(),
      masteryScope: m.masteryScope as MasteryScope,
    })),
  });

  // Best-effort module_progress sync (ignore conflicts).
  if (profile) {
    for (const row of perModule) {
      try {
        const modRow = await db.query.modules.findFirst({
          where: eq(modules.slug, row.moduleId),
          columns: { id: true },
        });
        if (!modRow) continue;
        const existing = await db.query.moduleProgress.findFirst({
          where: and(
            eq(moduleProgress.learnerProfileId, profile.id),
            eq(moduleProgress.moduleId, modRow.id),
          ),
        });
        if (existing) {
          await db
            .update(moduleProgress)
            .set({
              lessonsCompleted: Math.floor((row.percent / 100) * 3),
              percentComplete: row.percent,
              state: row.percent >= 100 ? "completed" : "in_progress",
              updatedAt: new Date(),
            })
            .where(eq(moduleProgress.id, existing.id));
        } else {
          await db.insert(moduleProgress).values({
            learnerProfileId: profile.id,
            moduleId: modRow.id,
            lessonsCompleted: Math.floor((row.percent / 100) * 3),
            percentComplete: row.percent,
            state: row.percent >= 100 ? "completed" : "in_progress",
          });
        }
      } catch {
        /* non-fatal for dashboard */
      }
    }
  }

  return {
    overallPercent,
    perModule,
    lastPoint,
    continueCta: continueTarget?.continueHref
      ? { href: continueTarget.continueHref, labelKey: "continueLearning" }
      : null,
    nextGoal: dailyPlan.nextGoal,
    dailyPlan,
    reviewQueue,
  };
}
