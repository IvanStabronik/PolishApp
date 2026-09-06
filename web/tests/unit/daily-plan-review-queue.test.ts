import { describe, expect, it } from "vitest";
import {
  buildDailyPlan,
  isWeakConcept,
} from "@/modules/learning/daily-plan";
import {
  buildReviewQueue,
  nextReviewDueAt,
} from "@/modules/learning/review-queue";

describe("daily plan algorithm", () => {
  it("prioritizes unfinished lesson then weak concepts then errors then mini-check", () => {
    const plan = buildDailyPlan({
      now: new Date("2026-09-06T10:00:00.000Z"),
      masteryScope: "live",
      modules: [
        {
          id: "pierwsze-spotkanie",
          title: "Pierwsze spotkanie",
          lessonIds: ["l1", "l2"],
          unfinishedLessonId: "l1",
          miniCheckReady: true,
          miniCheckExerciseIds: ["ex-mini"],
        },
      ],
      weakConcepts: [
        {
          conceptCanonicalId: "PRAG-PAN-01",
          state: "LEARNING",
          errorCount: 3,
          masteryScope: "live",
        },
      ],
      recentErrors: [
        {
          exerciseId: "ex-1",
          conceptCanonicalId: "PRAG-PAN-01",
          at: "2026-09-05T10:00:00.000Z",
          masteryScope: "live",
        },
      ],
    });

    expect(plan.targetMinutes).toBe(15);
    expect(plan.items[0]?.kind).toBe("unfinished_lesson");
    expect(plan.items.some((i) => i.kind === "weak_concept")).toBe(true);
    expect(plan.items.reduce((s, i) => s + i.minutes, 0)).toBeLessThanOrEqual(
      15,
    );
  });

  it("never mixes preview and live scopes", () => {
    const plan = buildDailyPlan({
      now: new Date("2026-09-06T10:00:00.000Z"),
      masteryScope: "live",
      modules: [],
      weakConcepts: [
        {
          conceptCanonicalId: "X",
          state: "REVIEW_DUE",
          errorCount: 1,
          masteryScope: "preview",
        },
      ],
      recentErrors: [
        {
          exerciseId: "e",
          conceptCanonicalId: "X",
          at: "2026-09-05T10:00:00.000Z",
          masteryScope: "preview",
        },
      ],
    });
    expect(plan.items).toHaveLength(0);
  });

  it("documents weak-concept thresholds", () => {
    expect(isWeakConcept("REVIEW_DUE", 0)).toBe(true);
    expect(isWeakConcept("LEARNING", 2)).toBe(true);
    expect(isWeakConcept("LEARNING", 1)).toBe(false);
    expect(isWeakConcept("MASTERED", 5)).toBe(false);
  });
});

describe("review queue", () => {
  it("builds due items with explainable sources", () => {
    const queue = buildReviewQueue({
      now: new Date("2026-09-06T12:00:00.000Z"),
      masteryScope: "live",
      scheduled: [
        {
          conceptCanonicalId: "GR-TNS-PRS-01",
          dueAt: "2026-09-05T12:00:00.000Z",
          masteryScope: "live",
        },
      ],
      mastery: [
        {
          conceptCanonicalId: "PRAG-PAN-01",
          state: "LEARNING",
          errorCount: 2,
          lastAttemptAt: "2026-09-05T09:00:00.000Z",
          masteryScope: "live",
        },
      ],
    });
    expect(queue.items.length).toBeGreaterThanOrEqual(2);
    expect(queue.items.every((i) => i.reason.length > 0)).toBe(true);
  });

  it("schedules deterministic next due dates", () => {
    const now = new Date("2026-09-06T00:00:00.000Z");
    const ok = nextReviewDueAt(now, true, 0);
    const bad = nextReviewDueAt(now, false, 3);
    expect(ok.getTime()).toBeGreaterThan(now.getTime());
    expect(bad.getTime()).toBeLessThan(ok.getTime());
  });
});
