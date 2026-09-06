import { describe, expect, it, vi } from "vitest";
import {
  buildLearnerExport,
  exportLearnerData,
  type ExportStore,
  type LearnerExportInput,
} from "@/modules/privacy/export";
import {
  deleteLearnerAccount,
  type DeleteAccountStore,
} from "@/modules/privacy/delete-account";

const sampleInput: LearnerExportInput = {
  userId: "user-1",
  email: "learner@slowarium.demo",
  exportedAt: "2026-09-05T10:00:00.000Z",
  profile: {
    uiLocale: "ru",
    l1: "ukr",
    level: "A1",
    goals: { primary: "everyday" },
    weeklyMinutes: 120,
    ageConfirmed18: true,
  },
  consents: [
    { key: "privacy", granted: true, grantedAt: "2026-09-01T00:00:00.000Z" },
  ],
  mastery: [
    {
      conceptCanonicalId: "PRAG-PAN-01",
      state: "LEARNING",
      masteryScope: "preview",
      updatedAt: "2026-09-05T10:00:00.000Z",
      explanationSnapshot: null,
    },
  ],
  evidence: [],
  attempts: [],
  voiceFileIds: [],
};

describe("privacy export", () => {
  it("builds a versioned machine-readable document with mastery", () => {
    const doc = buildLearnerExport(sampleInput);
    expect(doc.product).toBe("SŁOWARIUM");
    expect(doc.format).toBe("slowarium.learner-export.v2");
    expect(doc.schemaVersion).toBe(2);
    expect(doc.userId).toBe("user-1");
    expect(doc.mastery).toHaveLength(1);
    expect(doc.profile.l1).toBe("ukr");
  });

  it("exports via store and writes audit events", async () => {
    const store: ExportStore = {
      loadLearnerExportInput: vi.fn(async () => sampleInput),
      writeAudit: vi.fn(async () => undefined),
    };
    const json = await exportLearnerData(store, "user-1");
    expect(json).toContain("slowarium.learner-export.v2");
    expect(json).not.toMatch(/password|accessToken|refreshToken/i);
    expect(store.writeAudit).toHaveBeenCalledTimes(2);
  });
});

describe("privacy delete-account", () => {
  it("runs a single transactional delete", async () => {
    const store: DeleteAccountStore = {
      deleteAccountTransactional: vi.fn(async () => undefined),
    };
    const result = await deleteLearnerAccount(store, "user-1");
    expect(result.status).toBe("deleted");
    expect(store.deleteAccountTransactional).toHaveBeenCalledWith(
      "user-1",
      expect.any(String),
    );
  });
});
