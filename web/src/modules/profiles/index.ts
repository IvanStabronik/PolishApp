"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { learnerProfiles } from "@/db/schema";
import type { OnboardingInput } from "../types";
import { getRequestSession } from "@/modules/auth/session";

export async function saveOnboarding(input: OnboardingInput) {
  if (!input.consentTerms || !input.consentPrivacy) {
    return { ok: false as const, error: "consent_required" };
  }
  if (!input.l1 || !input.uiLocale) {
    return { ok: false as const, error: "profile_incomplete" };
  }

  const session = await getRequestSession();
  if (!session) {
    return { ok: false as const, error: "unauthorized" };
  }

  const nowIso = new Date().toISOString();
  const values = {
    uiLocale: input.uiLocale,
    l1: input.l1,
    level: input.level,
    goal: input.goal,
    weeklyGoal: input.weeklyGoal,
    weeklyMinutes: input.weeklyGoal,
    onboardingComplete: true as const,
    ageConfirmed18: true as const,
    consents: {
      ageConfirmed18: true,
      termsAcceptedAt: nowIso,
      privacyAcceptedAt: nowIso,
      ...(input.consentResearch ? { researchAcceptedAt: nowIso } : {}),
    },
    goals: { primary: input.goal },
    updatedAt: new Date(),
  };

  const existing = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, session.user.id),
  });

  if (existing) {
    await db
      .update(learnerProfiles)
      .set(values)
      .where(eq(learnerProfiles.id, existing.id));
    return { ok: true as const, profileId: existing.id };
  }

  const [inserted] = await db
    .insert(learnerProfiles)
    .values({ userId: session.user.id, ...values })
    .returning({ id: learnerProfiles.id });

  return { ok: true as const, profileId: inserted!.id };
}

export async function updateSettings(input: Partial<OnboardingInput>) {
  const session = await getRequestSession();
  if (!session) {
    return { ok: false as const, error: "unauthorized" };
  }

  const existing = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, session.user.id),
  });
  if (!existing) {
    return { ok: false as const, error: "profile_not_found" };
  }

  await db
    .update(learnerProfiles)
    .set({
      ...(input.uiLocale !== undefined ? { uiLocale: input.uiLocale } : {}),
      ...(input.l1 !== undefined ? { l1: input.l1 } : {}),
      ...(input.level !== undefined ? { level: input.level } : {}),
      ...(input.goal !== undefined
        ? { goal: input.goal, goals: { primary: input.goal } }
        : {}),
      ...(input.weeklyGoal !== undefined
        ? { weeklyGoal: input.weeklyGoal, weeklyMinutes: input.weeklyGoal }
        : {}),
      updatedAt: new Date(),
    })
    .where(eq(learnerProfiles.id, existing.id));

  return { ok: true as const, saved: input };
}
