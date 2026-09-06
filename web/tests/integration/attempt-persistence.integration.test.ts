/**
 * Integration contracts for Milestone 2 attempt persistence / draft gates.
 * Full DB round-trips run when DATABASE_URL is available (CI after migrate).
 */

import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { canAccessDraftContent } from "@/lib/demo";
import {
  masteryScopeForMode,
  resolveAttemptMode,
} from "@/modules/learning/attempt-mode";
import { loadEnvFiles } from "@/db/load-env";

loadEnvFiles();

describe("attempt persistence integration", () => {
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

describe("database round-trip", () => {
  it("seeded demo learner has previewer role when DATABASE_URL is set", async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set for DB integration tests (CI migrate/seed).",
      );
    }
    const { getDb, getSql } = await import("@/db/client");
    const { user } = await import("@/db/schema");
    const db = getDb();
    const row = await db.query.user.findFirst({
      where: eq(user.email, "learner@demo.slowarium.local"),
      columns: { roleFlags: true },
    });
    expect(row).toBeTruthy();
    expect(row!.roleFlags).toContain("previewer");
    await getSql().end({ timeout: 5 });
  });
});
