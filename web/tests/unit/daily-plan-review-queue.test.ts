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
          lessonIds: ["LES-A1-PS-01", "LES-A1-PS-02"],
          unfinishedLessonId: "LES-A1-PS-01",
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
          href: "/learn/pierwsze-spotkanie/exercise/ex-1",
        },
      ],
      recentErrors: [
        {
          exerciseId: "ex-1",
          conceptCanonicalId: "PRAG-PAN-01",
          at: "2026-09-05T10:00:00.000Z",
          masteryScope: "live",
          href: "/learn/pierwsze-spotkanie/exercise/ex-1",
        },
      ],
    });

    expect(plan.targetMinutes).toBe(15);
    expect(plan.items[0]?.kind).toBe("unfinished_lesson");
    if (plan.items[0]?.kind === "unfinished_lesson") {
      expect(plan.items[0].lessonId).toBe("LES-A1-PS-01");
      expect(plan.items[0].href).toBe("/learn/lessons/LES-A1-PS-01");
    }
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
  });
});

describe("review queue", () => {
  it("includes due scheduled items and never mixes scopes", () => {
    const queue = buildReviewQueue({
      now: new Date("2026-09-06T12:00:00.000Z"),
      masteryScope: "preview",
      scheduled: [
        {
          conceptCanonicalId: "PRAG-PAN-01",
          dueAt: "2026-09-06T10:00:00.000Z",
          masteryScope: "preview",
          href: "/learn/pierwsze-spotkanie/exercise/ex-1",
        },
        {
          conceptCanonicalId: "OTHER",
          dueAt: "2026-09-06T10:00:00.000Z",
          masteryScope: "live",
        },
      ],
      mastery: [],
    });
    expect(queue.items).toHaveLength(1);
    expect(queue.items[0]?.conceptCanonicalId).toBe("PRAG-PAN-01");
    expect(queue.items[0]?.href).toContain("/exercise/");
  });

  it("documents next due intervals", () => {
    const now = new Date("2026-09-06T00:00:00.000Z");
    const correct = nextReviewDueAt(now, true, 0);
    const incorrect = nextReviewDueAt(now, false, 1);
    expect(correct.getTime() - now.getTime()).toBe(4 * 86_400_000);
    expect(incorrect.getTime() - now.getTime()).toBe(0.5 * 86_400_000);
  });
});
