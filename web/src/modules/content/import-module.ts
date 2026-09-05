/**
 * Idempotent upsert of a validated content package into content_* tables.
 * Status is forced to DRAFT (foundation / internal preview — never publish here).
 */
import { and, eq } from "drizzle-orm";
import type { Db } from "@/db/client";
import {
  contentUnits,
  contentVersions,
  exercises,
  lessons,
  modules,
  publicationEvents,
} from "@/db/schema";
import { answerKeyFromExercise } from "@/modules/assessment/evaluate";
import type { ContentPackage, ContentStatus, Exercise, Lesson, Module } from "./schemas";

export type UpsertModuleResult = {
  moduleId: string;
  contentVersionId: string;
  lessonCount: number;
  exerciseCount: number;
};

function stripAnswerKeyFromExercise(ex: Exercise): Record<string, unknown> {
  const base = { ...ex } as Record<string, unknown>;
  delete base.correct_option_id;
  delete base.correct_option_ids;
  delete base.correct_order;
  if (ex.type === "gap_fill") {
    base.gaps = ex.gaps.map((g) => ({
      id: g.id,
      placeholder: g.placeholder,
    }));
  }
  return base;
}

function lessonPayload(lesson: Lesson): Record<string, unknown> {
  return {
    slug: lesson.slug,
    situation_ru: lesson.situation_ru,
    objective_ru: lesson.objective_ru,
    curriculum_links: lesson.curriculum_links,
    dialogue: lesson.dialogue,
    key_lines: lesson.key_lines,
    pan_pani: lesson.pan_pani,
    grammar_points: lesson.grammar_points,
    l1_notes: lesson.l1_notes,
    steps: lesson.steps,
    mini_check: lesson.mini_check,
    result_metadata: lesson.result_metadata,
    visibility: lesson.visibility,
    exercise_ids: lesson.exercises.map((e) => e.id),
  };
}

function modulePayload(mod: Module): Record<string, unknown> {
  return {
    slug: mod.slug,
    level: mod.level,
    situation_ru: mod.situation_ru,
    objective_ru: mod.objective_ru,
    curriculum_links: mod.curriculum_links,
    visibility: mod.visibility,
    internal_preview_only: mod.internal_preview_only,
    lesson_files: mod.lesson_files,
  };
}

async function upsertUnitVersion(
  tx: Db,
  opts: {
    kind: "module" | "lesson" | "exercise";
    canonicalId: string;
    title: string;
    versionNo: number;
    status: ContentStatus;
    authorUserId: string | null;
    provenance: Record<string, unknown>;
    payload: Record<string, unknown>;
  },
): Promise<string> {
  const existingUnit = await tx.query.contentUnits.findFirst({
    where: eq(contentUnits.canonicalId, opts.canonicalId),
  });

  let unitId: string;
  if (existingUnit) {
    unitId = existingUnit.id;
    await tx
      .update(contentUnits)
      .set({
        title: opts.title,
        kind: opts.kind,
        updatedAt: new Date(),
      })
      .where(eq(contentUnits.id, unitId));
  } else {
    const [inserted] = await tx
      .insert(contentUnits)
      .values({
        canonicalId: opts.canonicalId,
        kind: opts.kind,
        title: opts.title,
      })
      .returning({ id: contentUnits.id });
    unitId = inserted!.id;
  }

  const existingVersion = await tx.query.contentVersions.findFirst({
    where: and(
      eq(contentVersions.unitId, unitId),
      eq(contentVersions.versionNo, opts.versionNo),
    ),
  });

  let contentVersionId: string;
  if (existingVersion) {
    contentVersionId = existingVersion.id;
    await tx
      .update(contentVersions)
      .set({
        status: opts.status,
        authorUserId: opts.authorUserId,
        provenance: opts.provenance,
        payload: opts.payload,
      })
      .where(eq(contentVersions.id, contentVersionId));
  } else {
    const [inserted] = await tx
      .insert(contentVersions)
      .values({
        unitId,
        versionNo: opts.versionNo,
        status: opts.status,
        authorUserId: opts.authorUserId,
        provenance: opts.provenance,
        payload: opts.payload,
      })
      .returning({ id: contentVersions.id });
    contentVersionId = inserted!.id;

    await tx.insert(publicationEvents).values({
      contentVersionId,
      actorUserId: opts.authorUserId,
      fromStatus: null,
      toStatus: opts.status,
    });
  }

  return contentVersionId;
}

/**
 * Upsert a full module package (module + lessons + exercises).
 * Always writes status DRAFT; never sets published_version_id.
 */
export async function upsertModulePackage(
  db: Db,
  pkg: ContentPackage,
  opts: { authorUserId?: string | null } = {},
): Promise<UpsertModuleResult> {
  const status: ContentStatus = "DRAFT";
  const authorUserId = opts.authorUserId ?? null;
  const mod = pkg.module;
  const importedAt = new Date().toISOString();

  return db.transaction(async (tx) => {
    const provenance = {
      ...(mod.provenance as unknown as Record<string, unknown>),
      importedAt,
      importForcedStatus: "DRAFT",
    };

    const contentVersionId = await upsertUnitVersion(tx as unknown as Db, {
      kind: "module",
      canonicalId: mod.canonical_id,
      title: mod.title_pl,
      versionNo: mod.version,
      status,
      authorUserId,
      provenance,
      payload: modulePayload(mod),
    });

    const existingModule = await tx.query.modules.findFirst({
      where: eq(modules.canonicalId, mod.canonical_id),
    });

    let moduleId: string;
    if (existingModule) {
      moduleId = existingModule.id;
      await tx
        .update(modules)
        .set({
          workingTitle: mod.working_title || mod.title_pl,
          contentVersionId,
          publishedVersionId: null,
          updatedAt: new Date(),
        })
        .where(eq(modules.id, moduleId));
    } else {
      const [inserted] = await tx
        .insert(modules)
        .values({
          canonicalId: mod.canonical_id,
          workingTitle: mod.working_title || mod.title_pl,
          contentVersionId,
          publishedVersionId: null,
        })
        .returning({ id: modules.id });
      moduleId = inserted!.id;
    }

    let exerciseCount = 0;

    for (const lesson of pkg.lessons) {
      const lessonProvenance = {
        ...(lesson.provenance as unknown as Record<string, unknown>),
        importedAt,
        importForcedStatus: "DRAFT",
      };

      const lessonVersionId = await upsertUnitVersion(tx as unknown as Db, {
        kind: "lesson",
        canonicalId: lesson.canonical_id,
        title: lesson.title_pl,
        versionNo: lesson.version,
        status,
        authorUserId,
        provenance: lessonProvenance,
        payload: lessonPayload(lesson),
      });

      const existingLesson = await tx.query.lessons.findFirst({
        where: eq(lessons.canonicalId, lesson.canonical_id),
      });

      let lessonId: string;
      if (existingLesson) {
        lessonId = existingLesson.id;
        await tx
          .update(lessons)
          .set({
            moduleId,
            sortOrder: lesson.sort_order,
            contentVersionId: lessonVersionId,
            updatedAt: new Date(),
          })
          .where(eq(lessons.id, lessonId));
      } else {
        const [inserted] = await tx
          .insert(lessons)
          .values({
            moduleId,
            canonicalId: lesson.canonical_id,
            sortOrder: lesson.sort_order,
            contentVersionId: lessonVersionId,
          })
          .returning({ id: lessons.id });
        lessonId = inserted!.id;
      }

      for (const ex of lesson.exercises) {
        const exProvenance = {
          ...(ex.provenance as unknown as Record<string, unknown>),
          importedAt,
          importForcedStatus: "DRAFT",
        };

        const exVersionId = await upsertUnitVersion(tx as unknown as Db, {
          kind: "exercise",
          canonicalId: ex.canonical_id,
          title: ex.prompt.slice(0, 200),
          versionNo: ex.version,
          status,
          authorUserId,
          provenance: exProvenance,
          payload: stripAnswerKeyFromExercise(ex),
        });

        const answerKey = answerKeyFromExercise(ex) as unknown as Record<
          string,
          unknown
        >;

        const existingExercise = await tx.query.exercises.findFirst({
          where: eq(exercises.canonicalId, ex.canonical_id),
        });

        if (existingExercise) {
          await tx
            .update(exercises)
            .set({
              lessonId,
              exerciseType: ex.type,
              contentVersionId: exVersionId,
              answerKey,
              updatedAt: new Date(),
            })
            .where(eq(exercises.id, existingExercise.id));
        } else {
          await tx.insert(exercises).values({
            lessonId,
            canonicalId: ex.canonical_id,
            exerciseType: ex.type,
            contentVersionId: exVersionId,
            answerKey,
          });
        }
        exerciseCount += 1;
      }
    }

    return {
      moduleId,
      contentVersionId,
      lessonCount: pkg.lessons.length,
      exerciseCount,
    };
  });
}
