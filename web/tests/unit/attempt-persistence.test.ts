import { describe, expect, it } from "vitest";
import {
  assertNoContentPublish,
  isDemoAccountEmail,
  masteryScopeForMode,
  masteryStateToBadge,
  resolveAttemptMode,
  shouldWriteLiveMastery,
  shouldWriteMastery,
} from "@/modules/learning/attempt-mode";
import { canTransition } from "@/modules/content/lifecycle";
import { canAccessDraftContent } from "@/lib/demo";

describe("attempt mode resolution", () => {
  it("uses preview mode for DRAFT content", () => {
    expect(
      resolveAttemptMode({
        contentStatus: "DRAFT",
      }),
    ).toBe("preview");
  });

  it("uses formative for PUBLISHED content", () => {
    expect(
      resolveAttemptMode({
        contentStatus: "PUBLISHED",
      }),
    ).toBe("formative");
  });

  it("maps preview mode to preview mastery scope", () => {
    expect(masteryScopeForMode("preview")).toBe("preview");
    expect(masteryScopeForMode("formative")).toBe("live");
  });

  it("writes preview-scoped mastery but not live mastery for preview", () => {
    expect(shouldWriteMastery("preview")).toBe(true);
    expect(shouldWriteLiveMastery("preview")).toBe(false);
    expect(shouldWriteLiveMastery("formative")).toBe(true);
  });
});

describe("draft access matrix", () => {
  it("denies ordinary learner without previewer role", () => {
    expect(
      canAccessDraftContent({
        roles: ["learner"],
        isPreviewEnv: true,
      }),
    ).toBe(false);
  });

  it("allows previewer when preview env is on", () => {
    expect(
      canAccessDraftContent({
        roles: ["learner", "previewer"],
        isPreviewEnv: true,
      }),
    ).toBe(true);
  });

  it("denies previewer when preview env is off", () => {
    expect(
      canAccessDraftContent({
        roles: ["previewer"],
        isPreviewEnv: false,
      }),
    ).toBe(false);
  });
});

describe("publication guard", () => {
  it("forbids learning flows from marking content PUBLISHED", () => {
    expect(() =>
      assertNoContentPublish({ touchContentStatus: "PUBLISHED" }),
    ).toThrow(/Publication guard/);
  });

  it("keeps DRAFT → PUBLISHED illegal in lifecycle", () => {
    expect(canTransition("DRAFT", "PUBLISHED")).toBe(false);
  });
});

describe("demo email helper", () => {
  it("recognises seeded demo domain", () => {
    expect(isDemoAccountEmail("learner@demo.slowarium.local")).toBe(true);
    expect(isDemoAccountEmail("user@example.com")).toBe(false);
  });
});

describe("mastery badge mapping", () => {
  it("maps mastery states", () => {
    expect(masteryStateToBadge("MASTERED")).toBe("mastered");
    expect(masteryStateToBadge("LEARNING")).toBe("emerging");
    expect(masteryStateToBadge("NOT_STARTED")).toBe("not_started");
  });
});
