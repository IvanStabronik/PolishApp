/**
 * Domain facades. Prefer real `@/modules/*` implementations when present;
 * these files are swap-ready stubs with local mocks for Milestone 1 UI.
 */

import type { LearnerL1, UiLocale } from "@/lib/enums";

export type { LearnerL1, UiLocale };
/** @deprecated Use LearnerL1 (ukr|rus|bel) */
export type L1Code = LearnerL1;

export type OnboardingInput = {
  uiLocale: UiLocale;
  l1: LearnerL1;
  level: "a0" | "a1" | "a2";
  goal: "life" | "exam" | "study";
  weeklyGoal: number;
  consentTerms: boolean;
  consentPrivacy: boolean;
  consentResearch: boolean;
};

export type AuthCredentials = {
  email: string;
  password: string;
  name?: string;
};

export type CheckAnswerInput = {
  exerciseId: string;
  optionId: string;
  lessonId: string;
  preview?: boolean;
};

export type CheckAnswerResult = {
  correct: boolean;
  feedback: string;
  conceptId: string;
};
