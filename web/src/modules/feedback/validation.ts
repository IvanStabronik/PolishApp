import { z } from "zod";

export const FEEDBACK_CATEGORIES = [
  "bug",
  "confusing_content",
  "wrong_answer",
  "translation",
  "UX",
  "other",
] as const;

export const FEEDBACK_STATUSES = [
  "new",
  "triaged",
  "resolved",
  "wont_fix",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];
export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

export const FeedbackContextSchema = z
  .object({
    route: z.string().max(500).optional(),
    moduleId: z.string().max(200).optional(),
    lessonId: z.string().max(200).optional(),
    exerciseId: z.string().max(200).optional(),
    locale: z.string().max(16).optional(),
    l1: z.string().max(16).optional(),
    appVersion: z.string().max(64).optional(),
  })
  .strict();

export const FeedbackCreateSchema = z
  .object({
    category: z.enum(FEEDBACK_CATEGORIES),
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().max(4000).optional(),
    context: z.record(z.string(), z.unknown()).optional(),
    idempotencyKey: z.string().uuid(),
  })
  .strict();

/** Allowed admin status transitions (no arbitrary jumps). */
const TRANSITIONS: Record<FeedbackStatus, readonly FeedbackStatus[]> = {
  new: ["triaged", "resolved", "wont_fix"],
  triaged: ["resolved", "wont_fix", "new"],
  resolved: ["triaged"],
  wont_fix: ["triaged"],
};

export function canTransitionFeedback(
  from: FeedbackStatus,
  to: FeedbackStatus,
): boolean {
  if (from === to) return false;
  return TRANSITIONS[from].includes(to);
}

export function sanitizeFeedbackContext(
  context: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!context) return {};
  const out: Record<string, unknown> = {};
  for (const key of [
    "route",
    "moduleId",
    "lessonId",
    "exerciseId",
    "locale",
    "l1",
    "appVersion",
  ] as const) {
    const value = context[key];
    if (typeof value === "string" && value.length > 0 && value.length <= 500) {
      out[key] = value;
    }
  }
  return out;
}
