/**
 * Continue-learning dashboard snapshot from Postgres + YAML catalog.
 * Progress and plan use real LES-* lesson ids — no synthetic les-${mod.id}.
 */

import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  attempts,
  conceptMastery,
  learnerProfiles,
  moduleProgress,
  modules,
  reviewSchedule,
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
    lessonsCompleted: number;
    continueHref: string | null;
  }>;
  lastPoint: {
    moduleId: string;
    lessonId: string | null;
    exerciseId: string | null;
    at: string;
  } | null;
  continueCta: { href: string; labelKey: string } | null;
  nextGoal: string;
  dailyPlan: DailyPlan;
  reviewQueue: ReviewQueue;
};

function exerciseDone(
  attempted: Set<string>,
  exerciseId: string,
  canonicalId?: string,
): boolean {
  return (
    attempted.has(exerciseId) ||
    (canonicalId != null && attempted.has(canonicalId))
  );
}

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
    moduleId: string | null;
    conceptCanonicalId: string | null;
    at: string;
    masteryScope: MasteryScope;
  }> = [];
  const conceptToExercise = new Map<
    string,
    { moduleId: string; exerciseId: string }
  >();

  for (const mod of catalog) {
    for (const lesson of mod.lessons) {
      for (const ex of lesson.exercises) {
        const concept = ex.conceptIds[0];
        if (concept && !conceptToExercise.has(concept)) {
          conceptToExercise.set(concept, {
            moduleId: mod.id,
            exerciseId: ex.id,
          });
        }
      }
    }
  }

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
      .limit(80);

    for (const row of recent) {
      const response = row.response as {
        moduleId?: string;
        lessonId?: string;
        exerciseCanonicalId?: string;
        evaluation?: { conceptId?: string };
      };
      const exerciseId =
        typeof response.exerciseCanonicalId === "string"
          ? response.exerciseCanonicalId
          : null;
      const moduleId =
        typeof response.moduleId === "string" ? response.moduleId : null;
      const lessonId =
        typeof response.lessonId === "string" ? response.lessonId : null;
      if (exerciseId) attemptedExerciseIds.add(exerciseId);
      if (!lastPoint && moduleId) {
        lastPoint = {
          moduleId,
          lessonId,
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
          moduleId,
          conceptCanonicalId: conceptId,
          at: row.createdAt.toISOString(),
          masteryScope: row.masteryScope as MasteryScope,
        });
      }
    }
  }

  const perModule = catalog.map((mod) => {
    const lessons = [...mod.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    const lessonsCompleted = lessons.filter((lesson) =>
      lesson.exercises.every((ex) =>
        exerciseDone(attemptedExerciseIds, ex.id, ex.canonicalId),
      ),
    ).length;
    const totalExercises = Math.max(1, mod.exercises.length);
    const doneExercises = mod.exercises.filter((ex) =>
      exerciseDone(attemptedExerciseIds, ex.id, ex.canonicalId),
    ).length;
    const percent = Math.min(
      100,
      Math.round((doneExercises / totalExercises) * 100),
    );

    const unfinishedLesson =
      lessons.find(
        (lesson) =>
          !lesson.exercises.every((ex) =>
            exerciseDone(attemptedExerciseIds, ex.id, ex.canonicalId),
          ),
      ) ?? null;

    return {
      moduleId: mod.id,
      title: mod.title,
      titlePl: mod.titlePl,
      percent,
      lessonsTotal: lessons.length,
      lessonsCompleted,
      continueHref: unfinishedLesson
        ? `/learn/lessons/${unfinishedLesson.id}`
        : `/learn/modules/${mod.id}`,
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

  const scheduleRows = profile
    ? await db
        .select({
          conceptCanonicalId: reviewSchedule.conceptCanonicalId,
          dueAt: reviewSchedule.dueAt,
          masteryScope: reviewSchedule.masteryScope,
        })
        .from(reviewSchedule)
        .where(
          and(
            eq(reviewSchedule.learnerProfileId, profile.id),
            eq(reviewSchedule.masteryScope, masteryScope),
          ),
        )
    : [];

  const dailyPlan = buildDailyPlan({
    now: new Date(),
    masteryScope,
    modules: catalog.map((mod) => {
      const lessons = [...mod.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
      const unfinished = lessons.find(
        (lesson) =>
          !lesson.exercises.every((ex) =>
            exerciseDone(attemptedExerciseIds, ex.id, ex.canonicalId),
          ),
      );
      const practiceDone = lessons.every((lesson) =>
        lesson.exercises
          .filter((ex) => !lesson.miniCheckExerciseIds.includes(ex.id))
          .every((ex) =>
            exerciseDone(attemptedExerciseIds, ex.id, ex.canonicalId),
          ),
      );
      const miniPending = mod.miniCheckExerciseIds.some(
        (id) => !attemptedExerciseIds.has(id),
      );
      return {
        id: mod.id,
        title: mod.titlePl,
        lessonIds: lessons.map((l) => l.id),
        unfinishedLessonId: unfinished?.id ?? null,
        miniCheckReady: practiceDone && miniPending,
        miniCheckExerciseIds: mod.miniCheckExerciseIds,
      };
    }),
    weakConcepts: masteryRows.map((m) => ({
      conceptCanonicalId: m.conceptCanonicalId,
      state: m.state,
      errorCount: errorByConcept.get(m.conceptCanonicalId) ?? 0,
      masteryScope: m.masteryScope as MasteryScope,
      href: conceptToExercise.has(m.conceptCanonicalId)
        ? `/learn/${conceptToExercise.get(m.conceptCanonicalId)!.moduleId}/exercise/${conceptToExercise.get(m.conceptCanonicalId)!.exerciseId}`
        : null,
    })),
    recentErrors: recentErrors.slice(0, 5).map((e) => ({
      ...e,
      href: e.moduleId
        ? `/learn/${e.moduleId}/exercise/${e.exerciseId}`
        : null,
    })),
  });

  const reviewQueue = buildReviewQueue({
    now: new Date(),
    masteryScope,
    scheduled: scheduleRows.map((row) => ({
      conceptCanonicalId: row.conceptCanonicalId,
      dueAt: row.dueAt.toISOString(),
      masteryScope: row.masteryScope as MasteryScope,
      href: conceptToExercise.has(row.conceptCanonicalId)
        ? `/learn/${conceptToExercise.get(row.conceptCanonicalId)!.moduleId}/exercise/${conceptToExercise.get(row.conceptCanonicalId)!.exerciseId}`
        : null,
    })),
    mastery: masteryRows.map((m) => ({
      conceptCanonicalId: m.conceptCanonicalId,
      state: m.state,
      errorCount: errorByConcept.get(m.conceptCanonicalId) ?? 0,
      lastAttemptAt: m.updatedAt.toISOString(),
      masteryScope: m.masteryScope as MasteryScope,
      href: conceptToExercise.has(m.conceptCanonicalId)
        ? `/learn/${conceptToExercise.get(m.conceptCanonicalId)!.moduleId}/exercise/${conceptToExercise.get(m.conceptCanonicalId)!.exerciseId}`
        : null,
    })),
  });

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
              lessonsCompleted: row.lessonsCompleted,
              percentComplete: row.percent,
              state: row.percent >= 100 ? "completed" : "in_progress",
              updatedAt: new Date(),
            })
            .where(eq(moduleProgress.id, existing.id));
        } else {
          await db.insert(moduleProgress).values({
            learnerProfileId: profile.id,
            moduleId: modRow.id,
            lessonsCompleted: row.lessonsCompleted,
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
