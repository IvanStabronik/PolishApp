/**
 * Learner-facing content facade.
 * Tries DB-backed content when available; falls back to file-based YAML
 * at ../../content/a1/modules/pierwsze-spotkanie/module.yaml (relative to web/).
 */

import { isDemoPreviewEnabled } from "@/lib/demo";
import {
  getModuleById as getYamlModule,
  listPreviewModules,
  loadDraftModuleFromYaml,
} from "@/lib/content/load-module";
import type { DraftModule } from "@/lib/content/types";
import {
  mockContent,
  type LessonDetail,
  type ModuleSummary,
  type LoreLabel,
} from "@/lib/mocks/content";

export type CatalogModule = ModuleSummary & {
  /** Raw YAML draft when loaded from files */
  draft?: DraftModule;
};

function draftToSummary(mod: DraftModule): CatalogModule {
  const lore: LoreLabel = {
    hall: 1,
    loreTitle: "Знакомство",
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

/** List A1 catalog — YAML fallback when DB empty / DEMO_PREVIEW. */
export async function getA1Catalog(): Promise<CatalogModule[]> {
  try {
    const yamlMods = listPreviewModules().map(draftToSummary);
    if (yamlMods.length > 0) return yamlMods;
  } catch {
    // fall through to mock
  }
  return mockContent.listA1Modules(isDemoPreviewEnabled());
}

export async function getModuleById(
  moduleId: string,
): Promise<CatalogModule | null> {
  try {
    const yaml = getYamlModule(moduleId);
    if (yaml) return draftToSummary(yaml);
  } catch {
    // fall through
  }
  const mock = mockContent.getModule(moduleId);
  return mock ?? null;
}

export async function listModuleLessons(
  moduleId: string,
): Promise<LessonDetail[]> {
  try {
    const yaml = getYamlModule(moduleId);
    if (yaml) {
      return [yamlLessonToDetail(yaml)];
    }
  } catch {
    // fall through
  }
  return mockContent.listLessonsForModule(moduleId);
}

export async function getLessonById(
  lessonId: string,
): Promise<LessonDetail | null> {
  try {
    const mod = loadDraftModuleFromYaml();
    const derivedId = `les-${mod.id}`;
    if (lessonId === derivedId || lessonId === "les-powitanie") {
      const visible = getYamlModule(mod.id);
      if (visible) return yamlLessonToDetail(visible);
    }
  } catch {
    // fall through
  }
  return mockContent.getLesson(lessonId) ?? null;
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
      if (ex.type !== "single_choice") {
        throw new Error("unreachable");
      }
      return {
        id: ex.id,
        kind: "exercise" as const,
        title: ex.prompt.slice(0, 48),
        promptPl: ex.prompt,
        options: ex.options.map((label, i) => ({
          id: String(i),
          label,
        })),
        correctOptionId: String(ex.correctIndex),
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

export { loadDraftModuleFromYaml, listPreviewModules };
