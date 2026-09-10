/**
 * Learner-facing content facade — YAML only (no mockContent for learners).
 * Preserves Course → Module → Lesson → Step → Exercise with real LES-* ids.
 * Client DTOs are learner-safe (no answer keys).
 */

import {
  findLessonById,
  getModuleById as getYamlModule,
  listPreviewModules,
  type ContentAccessContext,
} from "@/lib/content/load-module";
import type { DraftModule } from "@/lib/content/types";
import { isLearnerL1 } from "@/lib/content/types";
import type { LessonDetail, LoreLabel, ModuleSummary } from "@/lib/mocks/content";
import type { LearnerL1, UiLocale } from "@/lib/enums";
import { UI_LOCALES } from "@/lib/enums";
import { getRequestSession, getLearnerProfile } from "@/modules/auth/session";
import { isDraftLearningEnvEnabled } from "@/lib/demo";
import { draftLessonToDetail } from "@/modules/content/draft-lesson-to-detail";

export type CatalogModule = ModuleSummary & {
  draft?: DraftModule;
};

export { draftLessonToDetail } from "@/modules/content/draft-lesson-to-detail";

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
    isPreviewEnv: isDraftLearningEnvEnabled(),
  };
}

async function resolveLearnerChrome(): Promise<{
  l1?: LearnerL1;
  uiLocale?: UiLocale;
}> {
  const session = await getRequestSession();
  if (!session) return {};
  const profile = await getLearnerProfile(session.user.id);
  if (!profile) return {};
  const l1 =
    profile.l1 && isLearnerL1(profile.l1) ? profile.l1 : undefined;
  const uiLocale = (UI_LOCALES as readonly string[]).includes(profile.uiLocale)
    ? (profile.uiLocale as UiLocale)
    : undefined;
  return { l1, uiLocale };
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
  const { l1, uiLocale } = await resolveLearnerChrome();
  return yaml.lessons
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((lesson) => draftLessonToDetail(yaml, lesson, l1, uiLocale));
}

export async function getLessonById(
  lessonId: string,
): Promise<LessonDetail | null> {
  const ctx = await resolveAccessContext();
  const found = findLessonById(lessonId, ctx);
  if (!found) return null;
  const { l1, uiLocale } = await resolveLearnerChrome();
  return draftLessonToDetail(found.module, found.lesson, l1, uiLocale);
}

export {
  listPreviewModules,
  loadAllModulesFromYaml,
  loadDraftModuleFromYaml,
} from "@/lib/content/load-module";
