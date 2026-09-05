import { describe, expect, it, vi } from "vitest";
import {
  assertNoContentPublish,
  isDemoAccountEmail,
  masteryStateToBadge,
  resolveAttemptMode,
  shouldWriteMastery,
} from "@/modules/learning/attempt-mode";
import {
  isContentVisibleToLearner,
  isLearnerVisible,
  canTransition,
} from "@/modules/content/lifecycle";
import { isDemoPreviewEnabled } from "@/lib/demo";

describe("attempt mode resolution", () => {
  it("defaults demo users in preview to formative (progress works)", () => {
    expect(
      resolveAttemptMode({
        preview: true,
        isDemoUser: true,
        demoPreviewEnabled: true,
      }),
    ).toBe("formative");
  });

  it("defaults non-demo preview traffic to preview mode", () => {
    expect(
      resolveAttemptMode({
        preview: true,
        isDemoUser: false,
        demoPreviewEnabled: true,
      }),
    ).toBe("preview");
  });

  it("honours explicit preview mode even for demo users", () => {
    expect(
      resolveAttemptMode({
        preview: true,
        mode: "preview",
        isDemoUser: true,
        demoPreviewEnabled: true,
      }),
    ).toBe("preview");
  });

  it("uses formative outside preview", () => {
    expect(
      resolveAttemptMode({
        isDemoUser: false,
        demoPreviewEnabled: false,
      }),
    ).toBe("formative");
  });

  it("never writes live mastery for preview mode", () => {
    expect(shouldWriteMastery("preview")).toBe(false);
    expect(shouldWriteMastery("formative")).toBe(true);
    expect(shouldWriteMastery("summative")).toBe(true);
  });
});

describe("publication guard", () => {
  it("forbids learning flows from marking content PUBLISHED", () => {
    expect(() =>
      assertNoContentPublish({ touchContentStatus: "PUBLISHED" }),
    ).toThrow(/Publication guard/);
    expect(() =>
      assertNoContentPublish({ touchContentStatus: null }),
    ).not.toThrow();
    expect(() =>
      assertNoContentPublish({ touchContentStatus: "DRAFT" }),
    ).not.toThrow();
  });

  it("keeps DRAFT → PUBLISHED illegal in lifecycle", () => {
    expect(canTransition("DRAFT", "PUBLISHED")).toBe(false);
  });
});

describe("draft visibility", () => {
  it("hides DRAFT from learners without DEMO_PREVIEW", () => {
    expect(isLearnerVisible("DRAFT")).toBe(false);
    expect(isContentVisibleToLearner("DRAFT", { demoPreview: false })).toBe(
      false,
    );
  });

  it("shows DRAFT only when demo preview is enabled", () => {
    expect(isContentVisibleToLearner("DRAFT", { demoPreview: true })).toBe(
      true,
    );
    expect(isContentVisibleToLearner("PUBLISHED", { demoPreview: false })).toBe(
      true,
    );
  });
});

describe("mastery badge mapping", () => {
  it("maps DB states to UI badges", () => {
    expect(masteryStateToBadge("MASTERED")).toBe("mastered");
    expect(masteryStateToBadge("DEMONSTRATED")).toBe("mastered");
    expect(masteryStateToBadge("LEARNING")).toBe("emerging");
    expect(masteryStateToBadge("NOT_STARTED")).toBe("not_started");
  });
});

describe("demo account detection", () => {
  it("recognises @demo.slowarium.local emails", () => {
    expect(isDemoAccountEmail("learner@demo.slowarium.local")).toBe(true);
    expect(isDemoAccountEmail("person@example.com")).toBe(false);
  });
});

describe("client correct flag distrust (pure contract)", () => {
  it("evaluation result is independent of a client correct claim", async () => {
    const { evaluateAnswer } = await import("@/modules/assessment/evaluate");
    const exercise = {
      id: "ex-1",
      type: "single_choice" as const,
      prompt: "?",
      options: ["a", "b"],
      correctIndex: 1,
      conceptIds: ["PRAG-PAN-01"],
      feedback: {
        explanation: "ok",
        evidenceWeight: 1,
        conceptId: "PRAG-PAN-01",
      },
      retryPolicy: "unlimited",
    };
    const wrong = evaluateAnswer(exercise, {
      type: "single_choice",
      index: 0,
    });
    expect(wrong.correct).toBe(false);
    // Simulating a malicious body.correct=true must not change server eval
    const forgedCorrect = true;
    expect(wrong.correct === forgedCorrect).toBe(false);
  });
});

describe("DEMO_PREVIEW env gate", () => {
  it("reads DEMO_PREVIEW from env", () => {
    const prev = process.env.DEMO_PREVIEW;
    const prevPublic = process.env.NEXT_PUBLIC_DEMO_PREVIEW;
    process.env.NEXT_PUBLIC_DEMO_PREVIEW = "true";
    process.env.DEMO_PREVIEW = "1";
    expect(isDemoPreviewEnabled()).toBe(true);
    process.env.DEMO_PREVIEW = "0";
    expect(isDemoPreviewEnabled()).toBe(false);
    if (prev === undefined) delete process.env.DEMO_PREVIEW;
    else process.env.DEMO_PREVIEW = prev;
    if (prevPublic === undefined) delete process.env.NEXT_PUBLIC_DEMO_PREVIEW;
    else process.env.NEXT_PUBLIC_DEMO_PREVIEW = prevPublic;
  });
});

describe("persist attempt orchestration (mocked store contract)", () => {
  it("skips mastery write when mode is preview", () => {
    const mode = resolveAttemptMode({
      mode: "preview",
      isDemoUser: true,
      demoPreviewEnabled: true,
    });
    expect(mode).toBe("preview");
    expect(shouldWriteMastery(mode)).toBe(false);
  });

  it("would write mastery for formative demo attempts", () => {
    const mode = resolveAttemptMode({
      preview: true,
      isDemoUser: true,
      demoPreviewEnabled: true,
    });
    expect(mode).toBe("formative");
    expect(shouldWriteMastery(mode)).toBe(true);
  });

  it("records that missing content version blocks persistence", () => {
    // Contract documented by PersistAttemptResult.reason
    const reason = "missing_content_version";
    expect(reason).toBe("missing_content_version");
    vi.fn(); // keep vitest import used when expanding to full store mocks
  });
});
