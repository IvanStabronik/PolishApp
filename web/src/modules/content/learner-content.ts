/**
 * Learner-facing content facade — YAML only (no mockContent for learners).
 */

import {
  getModuleById as getYamlModule,
  listPreviewModules,
  loadAllModulesFromYaml,
  type ContentAccessContext,
} from "@/lib/content/load-module";
import type { DraftModule } from "@/lib/content/types";
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
    lessonIds: [`les-${mod.id}`],
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
  return [yamlLessonToDetail(yaml)];
}

export async function getLessonById(
  lessonId: string,
): Promise<LessonDetail | null> {
  const ctx = await resolveAccessContext();
  for (const mod of loadAllModulesFromYaml()) {
    const derivedId = `les-${mod.id}`;
    if (lessonId === derivedId) {
      const visible = getYamlModule(mod.id, ctx);
      if (visible) return yamlLessonToDetail(visible);
    }
  }
  if (lessonId === "les-powitanie") {
    const visible = getYamlModule("pierwsze-spotkanie", ctx);
    if (visible) return yamlLessonToDetail(visible);
  }
  return null;
}

function yamlLessonToDetail(mod: DraftModule): LessonDetail {
  const theorySteps = [
    {
      id: "th-situation",
      kind: "theory" as const,
      title: "Sytuacja",
      body: mod.situation,
    },
    {
      id: "th-objective",
      kind: "theory" as const,
      title: "Cel",
      body: mod.objective,
    },
  ];

  const exerciseSteps = mod.exercises
    .filter((ex) => ex.type === "single_choice")
    .map((ex) => {
      if (ex.type !== "single_choice") throw new Error("unreachable");
      return {
        id: ex.id,
        kind: "exercise" as const,
        title: ex.prompt.slice(0, 48),
        promptPl: ex.prompt,
        options: ex.options.map((label, i) => ({
          id: String(i),
          label,
        })),
        correctOptionId: "",
        feedbackCorrect: ex.feedback.explanation,
        feedbackIncorrect: ex.feedback.explanation,
        conceptId: ex.conceptIds[0] ?? "",
      };
    });

  return {
    id: `les-${mod.id}`,
    moduleId: mod.id,
    title: mod.titlePl,
    steps: [...theorySteps, ...exerciseSteps],
  };
}

export {
  listPreviewModules,
  loadAllModulesFromYaml,
  loadDraftModuleFromYaml,
} from "@/lib/content/load-module";
