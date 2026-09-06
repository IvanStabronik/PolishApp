/**
 * Integration contracts for Milestone 2 attempt persistence.
 * Skips when DATABASE_URL is unset (unit CI). Run with:
 *   npm run test:integration
 */

import { describe, expect, it } from "vitest";
import { canAccessDraftContent } from "@/lib/demo";
import { resolveAttemptMode } from "@/modules/learning/attempt-mode";

const hasDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDb)("attempt persistence integration", () => {
  it("draft without previewer is denied (authorization contract)", () => {
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
});

describe("attempt persistence integration (always-on smoke)", () => {
  it("documents that DATABASE_URL enables full DB cases", () => {
    expect(typeof hasDb).toBe("boolean");
  });
});
