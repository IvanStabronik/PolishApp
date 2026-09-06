"use server";

import { getProgressOverview as loadOverview } from "@/modules/learning";

/** @deprecated Prefer `@/modules/learning` — kept for existing imports. */
export async function getProgressOverview() {
  return loadOverview();
}
