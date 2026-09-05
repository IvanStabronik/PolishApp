"use server";

import type { OnboardingInput } from "../types";

export async function saveOnboarding(input: OnboardingInput) {
  if (!input.consentTerms || !input.consentPrivacy) {
    return { ok: false as const, error: "consent_required" };
  }
  if (!input.l1 || !input.uiLocale) {
    return { ok: false as const, error: "profile_incomplete" };
  }
  // L1 and UI locale stay separate — never overwrite one with the other.
  return { ok: true as const, profileId: "demo-profile" };
}

export async function updateSettings(input: Partial<OnboardingInput>) {
  return { ok: true as const, saved: input };
}
