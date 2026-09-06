/**
 * Review queue (Powtórka) — due items from mastery + review_schedule + errors.
 * No fake AI score. Preview/live scopes never mixed.
 */

import type { MasteryScope } from "./attempt-mode";
import { isWeakConcept } from "./daily-plan";

export type ReviewQueueInput = {
  now: Date;
  masteryScope: MasteryScope;
  scheduled: Array<{
    conceptCanonicalId: string;
    dueAt: string;
    masteryScope: MasteryScope;
    href?: string | null;
  }>;
  mastery: Array<{
    conceptCanonicalId: string;
    state: string;
    errorCount: number;
    lastAttemptAt: string | null;
    masteryScope: MasteryScope;
    href?: string | null;
  }>;
};

export type ReviewQueueItem = {
  conceptCanonicalId: string;
  source: "schedule" | "weak_mastery" | "error_threshold";
  dueAt: string;
  errorCount: number;
  lastAttemptAt: string | null;
  masteryState: string;
  reasonKey: "scheduledDue" | "masteryReviewDue" | "errorThreshold";
  href: string | null;
};

export type ReviewQueue = {
  masteryScope: MasteryScope;
  generatedAt: string;
  items: ReviewQueueItem[];
};

export function buildReviewQueue(input: ReviewQueueInput): ReviewQueue {
  const scope = input.masteryScope;
  const nowMs = input.now.getTime();
  const byConcept = new Map<string, ReviewQueueItem>();

  for (const row of input.scheduled) {
    if (row.masteryScope !== scope) continue;
    const dueMs = Date.parse(row.dueAt);
    if (Number.isNaN(dueMs) || dueMs > nowMs) continue;
    byConcept.set(row.conceptCanonicalId, {
      conceptCanonicalId: row.conceptCanonicalId,
      source: "schedule",
      dueAt: row.dueAt,
      errorCount: 0,
      lastAttemptAt: null,
      masteryState: "REVIEW_DUE",
      reasonKey: "scheduledDue",
      href: row.href ?? null,
    });
  }

  for (const m of input.mastery) {
    if (m.masteryScope !== scope) continue;
    if (!isWeakConcept(m.state, m.errorCount)) continue;
    const existing = byConcept.get(m.conceptCanonicalId);
    const source: ReviewQueueItem["source"] =
      m.state === "REVIEW_DUE" ? "weak_mastery" : "error_threshold";
    const reasonKey: ReviewQueueItem["reasonKey"] =
      m.state === "REVIEW_DUE" ? "masteryReviewDue" : "errorThreshold";
    const item: ReviewQueueItem = {
      conceptCanonicalId: m.conceptCanonicalId,
      source: existing?.source === "schedule" ? "schedule" : source,
      dueAt: existing?.dueAt ?? m.lastAttemptAt ?? input.now.toISOString(),
      errorCount: Math.max(existing?.errorCount ?? 0, m.errorCount),
      lastAttemptAt: m.lastAttemptAt,
      masteryState: m.state,
      reasonKey: existing?.source === "schedule" ? "scheduledDue" : reasonKey,
      href: existing?.href ?? m.href ?? null,
    };
    byConcept.set(m.conceptCanonicalId, item);
  }

  const items = [...byConcept.values()].sort((a, b) => {
    if (b.errorCount !== a.errorCount) return b.errorCount - a.errorCount;
    return Date.parse(a.dueAt) - Date.parse(b.dueAt);
  });

  return {
    masteryScope: scope,
    generatedAt: input.now.toISOString(),
    items,
  };
}

/**
 * After a review answer: bump due date on correct, pull sooner on incorrect.
 * Deterministic intervals — not an AI score.
 * Correct + priorErrorCount ≥ 2 → +2 days; correct otherwise → +4 days;
 * incorrect → +0.5 days.
 */
export function nextReviewDueAt(
  now: Date,
  correct: boolean,
  priorErrorCount: number,
): Date {
  const day = 86_400_000;
  if (correct) {
    const days = priorErrorCount >= 2 ? 2 : 4;
    return new Date(now.getTime() + days * day);
  }
  return new Date(now.getTime() + 0.5 * day);
}
