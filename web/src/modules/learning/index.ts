"use server";

import { getRequestSession } from "@/modules/auth/session";
import {
  canAccessDraftContent,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";
import { getA1Catalog } from "@/modules/content/learner-content";
import { loadProgressOverview } from "./progress";

export async function getNextLearningStep() {
  const modules = await getA1Catalog();
  const first = modules[0];
  if (!first) {
    return { kind: "empty" as const };
  }
  const lessonId = first.lessonIds[0];
  if (!lessonId) {
    return { kind: "empty" as const };
  }
  const session = await getRequestSession();
  const canDraft = canAccessDraftContent({
    roles: session?.roles ?? [],
    email: session?.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  });
  return {
    kind: "lesson" as const,
    moduleId: first.id,
    lessonId,
    dualLore: first.lore,
    moduleHref: `/learn/${first.id}`,
    lessonHref: `/learn/lessons/${lessonId}`,
    preview: canDraft,
  };
}

export async function getProgressOverview(locale?: string | null) {
  const session = await getRequestSession();
  return loadProgressOverview(session?.user.id ?? null, { locale });
}
