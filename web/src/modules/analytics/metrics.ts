/**
 * Privacy-preserving product analytics — metric definitions.
 * Aggregates only; no ad trackers; no raw answer/PII payloads in dimensions.
 */

export const ANALYTICS_METRICS = {
  activation_invite_to_onboarding: {
    key: "activation_invite_to_onboarding",
    description: "Invite accepted → onboarding complete (cohort count).",
    limits: "Does not imply learning quality; excludes revoked accounts.",
  },
  first_lesson_started: {
    key: "first_lesson_started",
    description: "Learners with ≥1 lesson open event.",
    limits: "Open ≠ complete.",
  },
  first_exercise_submitted: {
    key: "first_exercise_submitted",
    description: "Learners with ≥1 attempt persisted.",
    limits: "Includes formative preview attempts when mode=preview.",
  },
  first_lesson_completed: {
    key: "first_lesson_completed",
    description: "Learners marking a lesson complete path.",
    limits: "Completion heuristic may evolve; not JPJO mastery.",
  },
  day1_readiness: {
    key: "day1_readiness",
    description: "Share of activated learners active within 24h.",
    limits: "Timezone approximated to UTC day buckets.",
  },
  day7_readiness: {
    key: "day7_readiness",
    description: "Share of activated learners active within 7d.",
    limits: "Small-n beta cohorts are noisy.",
  },
  attempts_per_learner: {
    key: "attempts_per_learner",
    description: "Average attempts per active learner in window.",
    limits: "Skewed by power users.",
  },
  les_completion: {
    key: "les_completion",
    description: "Lesson (LES-*) completion counts by lesson id.",
    limits: "Canonical LES ids only; DRAFT content included in beta.",
  },
  review_queue_usage: {
    key: "review_queue_usage",
    description: "Powtórka opens / items practiced.",
    limits: "Does not prove retention.",
  },
  incorrect_rate_by_exercise: {
    key: "incorrect_rate_by_exercise",
    description: "Incorrect / total attempts by exerciseId.",
    limits: "Low sample sizes; not a psychometrics model.",
  },
  incorrect_rate_by_concept: {
    key: "incorrect_rate_by_concept",
    description: "Incorrect / total by concept canonical id.",
    limits: "Concept tagging coverage incomplete.",
  },
  feedback_rate: {
    key: "feedback_rate",
    description: "Feedback reports / active learners.",
    limits: "Voluntary; selection bias.",
  },
} as const;

export type AnalyticsMetricKey =
  (typeof ANALYTICS_METRICS)[keyof typeof ANALYTICS_METRICS]["key"];

export function isKnownMetricKey(key: string): key is AnalyticsMetricKey {
  return Object.values(ANALYTICS_METRICS).some((m) => m.key === key);
}

/** Dimensions must not carry answers, tokens, or emails. */
export function sanitizeAnalyticsDimensions(
  dims: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!dims) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(dims)) {
    if (/email|password|token|answer|secret|session/i.test(k)) continue;
    if (typeof v === "string" && v.length > 200) continue;
    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
      out[k] = v;
    }
  }
  return out;
}
