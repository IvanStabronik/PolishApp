/**
 * Pure access/mode matrix — not DB. Kept separate from real Postgres suite.
 */

import { describe, expect, it } from "vitest";
import { canAccessDraftContent } from "@/lib/demo";
import {
  masteryScopeForMode,
  resolveAttemptMode,
} from "@/modules/learning/attempt-mode";

describe("draft access / attempt mode matrix", () => {
  it("draft without previewer is denied", () => {
    expect(
      canAccessDraftContent({
        roles: ["learner"],
        isPreviewEnv: true,
      }),
    ).toBe(false);
  });

  it("DRAFT content resolves to preview mode", () => {
    expect(resolveAttemptMode({ contentStatus: "DRAFT" })).toBe("preview");
  });

  it("preview and live mastery scopes stay separate", () => {
    expect(masteryScopeForMode("preview")).toBe("preview");
    expect(masteryScopeForMode("formative")).toBe("live");
  });
});
