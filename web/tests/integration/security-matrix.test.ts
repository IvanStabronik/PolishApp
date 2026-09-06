import { describe, expect, it } from "vitest";
import { canAccessDraftContent } from "@/lib/demo";
import {
  masteryScopeForMode,
  resolveAttemptMode,
} from "@/modules/learning/attempt-mode";

describe("private-alpha security matrix", () => {
  it("separates preview and live mastery scopes", () => {
    expect(masteryScopeForMode("preview")).toBe("preview");
    expect(masteryScopeForMode("formative")).toBe("live");
  });

  it("resolves DRAFT attempts to preview mode", () => {
    expect(resolveAttemptMode({ contentStatus: "DRAFT" })).toBe("preview");
  });

  it("blocks ordinary learners from DRAFT", () => {
    expect(
      canAccessDraftContent({ roles: ["learner"], isPreviewEnv: true }),
    ).toBe(false);
  });
});
