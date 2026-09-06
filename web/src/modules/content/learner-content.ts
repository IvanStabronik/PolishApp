/**
 * Learner-facing content facade — YAML only (no mockContent for learners).
 * Preserves Course → Module → Lesson → Step → Exercise with real LES-* ids.
 * Client DTOs are learner-safe (no answer keys).
 */

import {
  findLessonById,
  getModuleById as getYamlModule,
  listPreviewModules,
  loadAllModulesFromYaml,
  type ContentAccessContext,
} from "@/lib/content/load-module";
import { toLearnerExercise } from "@/lib/content/learner-dto";
import type { DraftLesson, DraftModule } from "@/lib/content/types";
import type { LessonDetail, LoreLabel, ModuleSummary } from "@/lib/mocks/content";
import { getRequestSession } from "@/modules/auth/session";
import { isPrivateAlphaPreviewEnv } from "@/lib/demo";

export type CatalogModule = ModuleSummary & {
  draft?: DraftModule;
};

function draftToSummary(mod: DraftModule, hall: number): CatalogModule {
  const lore: LoreLabel = {
    hall,
    loreTitle: mod.title,
    academicCode: mod.level || "A1",
  };
  return {
    id: mod.id,
    status: mod.status as ModuleSummary["status"],
    lore,
    titlePl: mod.titlePl,
    summary: mod.situation || mod.objective,
    lessonIds: mod.lessons.map((l) => l.id),
    draft: mod,
  };
}

async function resolveAccessContext(): Promise<ContentAccessContext> {
  const session = await getRequestSession();
  return {
    roles: session?.roles ?? [],
    email: session?.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
}

export async function getA1Catalog(): Promise<CatalogModule[]> {
  const ctx = await resolveAccessContext();
  return listPreviewModules(ctx).map((mod, i) => draftToSummary(mod, i + 1));
}

export async function getModuleById(
  moduleId: string,
): Promise<CatalogModule | null> {
  const ctx = await resolveAccessContext();
  const yaml = getYamlModule(moduleId, ctx);
  if (!yaml) return null;
  const all = listPreviewModules(ctx);
  const hall = Math.max(1, all.findIndex((m) => m.id === yaml.id) + 1);
  return draftToSummary(yaml, hall);
}

export async function listModuleLessons(
  moduleId: string,
): Promise<LessonDetail[]> {
  const ctx = await resolveAccessContext();
  const yaml = getYamlModule(moduleId, ctx);
  if (!yaml) return [];
  return yaml.lessons
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((lesson) => draftLessonToDetail(yaml, lesson));
}

export async function getLessonById(
  lessonId: string,
): Promise<LessonDetail | null> {
  const ctx = await resolveAccessContext();
  const found = findLessonById(lessonId, ctx);
  if (!found) return null;
  return draftLessonToDetail(found.module, found.lesson);
}

/**
 * Expand YAML lesson steps into learner-safe theory + exercise steps.
 * Practice/mini_check steps expand to one player step per exercise.
 */
function draftLessonToDetail(
  mod: DraftModule,
  lesson: DraftLesson,
): LessonDetail {
  const byId = new Map(lesson.exercises.map((ex) => [ex.id, ex]));
  const steps: LessonDetail["steps"] = [];

  for (const step of lesson.steps) {
    if (step.kind === "situation") {
      steps.push({
        id: step.id,
        kind: "theory",
        title: step.titleRu,
        body: step.bodyRu ?? lesson.situation,
      });
      continue;
    }
    if (
      step.kind === "dialogue" ||
      step.kind === "key_lines" ||
      step.kind === "pan_pani" ||
      step.kind === "grammar" ||
      step.kind === "result"
    ) {
      let body = "";
      if (step.kind === "dialogue") {
        body = lesson.dialogue
          .map((t) => `${t.speaker}: ${t.pl}`)
          .join("\n");
      } else if (step.kind === "key_lines") {
        body = lesson.keyLines
          .map((k) => `${k.pl}\n${k.explanation}`)
          .join("\n\n");
      } else if (step.kind === "pan_pani") {
        body = lesson.pragmatics.panPani;
      } else if (step.kind === "grammar") {
        body = `${lesson.grammar.title}\n${lesson.grammar.explanation}\n${lesson.grammar.examples.join("\n")}`;
      } else {
        body = lesson.objective;
      }
      steps.push({
        id: step.id,
        kind: "theory",
        title: step.titleRu,
        body,
      });
      continue;
    }
    if (step.kind === "practice" || step.kind === "mini_check") {
      for (const exerciseId of step.exerciseIds) {
        const authored = byId.get(exerciseId);
        if (!authored) continue;
        steps.push({
          id: authored.id,
          kind: "exercise",
          title: authored.prompt.slice(0, 64),
          exercise: toLearnerExercise(authored),
        });
      }
    }
  }

  return {
    id: lesson.id,
    moduleId: mod.id,
    title: lesson.titlePl,
    sortOrder: lesson.sortOrder,
    steps,
  };
}

export {
  listPreviewModules,
  loadAllModulesFromYaml,
  loadDraftModuleFromYaml,
} from "@/lib/content/load-module";
