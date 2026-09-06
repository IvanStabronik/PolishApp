"use server";

import { getRequestSession } from "@/modules/auth/session";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { getA1Catalog } from "@/modules/content/learner-content";
import { loadProgressOverview } from "./progress";

export async function getNextLearningStep() {
  const modules = await getA1Catalog();
  const first = modules[0];
  if (!first) {
    return { kind: "empty" as const };
  }
  const lessonId = first.lessonIds[0] ?? `les-${first.id}`;
  const session = await getRequestSession();
  const canDraft = canAccessDraftContent({
    roles: session?.roles ?? [],
    email: session?.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  });
  return {
    kind: "lesson" as const,
    moduleId: first.id,
    lessonId,
    dualLore: first.lore,
    /** Prefer YAML module path when draft package is present */
    moduleHref: `/learn/${first.id}`,
    preview: canDraft,
  };
}

export async function getProgressOverview() {
  const session = await getRequestSession();
  return loadProgressOverview(session?.user.id ?? null);
}
