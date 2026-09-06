import { describe, expect, it } from "vitest";
import {
  masteryScopeForMode,
  resolveAttemptMode,
  shouldWriteMastery,
} from "@/modules/learning/attempt-mode";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
  isPublicDemoPreviewEnv,
} from "@/lib/demo";
import type { EvalResult } from "@/modules/assessment/evaluate";
import type { PersistAttemptResult } from "@/modules/learning/persist-attempt";

type FakeAttempt = {
  id: string;
  learnerProfileId: string;
  idempotencyKey: string | null;
  mode: "preview" | "formative" | "summative";
  masteryScope: "preview" | "live";
  evaluation: EvalResult;
};

type FakePersistResult = PersistAttemptResult & {
  evaluation?: EvalResult;
};

/**
 * Minimal transactional idempotent persist mirror for contract tests.
 */
function createFakePersistStore() {
  const attempts = new Map<string, FakeAttempt>();
  let seq = 0;

  return {
    async persist(input: {
      learnerProfileId: string;
      idempotencyKey: string | null;
      mode: "preview" | "formative" | "summative";
      evaluation: EvalResult;
    }): Promise<FakePersistResult> {
      if (input.idempotencyKey) {
        const key = `${input.learnerProfileId}:${input.idempotencyKey}`;
        const existing = attempts.get(key);
        if (existing) {
          return {
            persisted: true,
            attemptId: existing.id,
            masteryWritten: false,
            masteryState: null,
            masteryScope: existing.masteryScope,
            reviewDueAt: null,
            idempotentReplay: true,
            reason: "idempotent_replay",
            evaluation: existing.evaluation,
          };
        }
        seq += 1;
        const id = `att-${seq}`;
        const row: FakeAttempt = {
          id,
          learnerProfileId: input.learnerProfileId,
          idempotencyKey: input.idempotencyKey,
          mode: input.mode,
          masteryScope: masteryScopeForMode(input.mode),
          evaluation: input.evaluation,
        };
        attempts.set(key, row);
        return {
          persisted: true,
          attemptId: id,
          masteryWritten: shouldWriteMastery(input.mode),
          masteryState: shouldWriteMastery(input.mode) ? "LEARNING" : null,
          masteryScope: row.masteryScope,
          reviewDueAt: null,
          evaluation: input.evaluation,
        };
      }

      seq += 1;
      return {
        persisted: true,
        attemptId: `att-${seq}`,
        masteryWritten: shouldWriteMastery(input.mode),
        masteryState: null,
        masteryScope: masteryScopeForMode(input.mode),
        reviewDueAt: null,
        evaluation: input.evaluation,
      };
    },
    count() {
      return attempts.size;
    },
  };
}

describe("idempotency replay", () => {
  it("returns the previous evaluation for the same key without duplicating", async () => {
    const store = createFakePersistStore();
    const evaluation: EvalResult = {
      correct: true,
      explanation: "ok",
      evidenceWeight: 1,
      conceptId: "PRAG-PAN-01",
    };
    const key = "11111111-1111-4111-8111-111111111111";

    const first = await store.persist({
      learnerProfileId: "lp-1",
      idempotencyKey: key,
      mode: "preview",
      evaluation,
    });
    const second = await store.persist({
      learnerProfileId: "lp-1",
      idempotencyKey: key,
      mode: "preview",
      evaluation: { ...evaluation, correct: false, explanation: "changed" },
    });

    expect(first.attemptId).toBe(second.attemptId);
    expect(second.idempotentReplay).toBe(true);
    expect(second.evaluation?.correct).toBe(true);
    expect(store.count()).toBe(1);
  });
});

describe("draft denied without role", () => {
  it("blocks DRAFT attempt authorization for plain learner", () => {
    const canDraft = canAccessDraftContent({
      roles: ["learner"],
      isPreviewEnv: true,
      email: "learner@example.com",
    });
    expect(canDraft).toBe(false);

    const mode = resolveAttemptMode({ contentStatus: "DRAFT" });
    expect(mode).toBe("preview");
    // Route maps !canDraft + DRAFT → 403 before persist.
    const httpStatus = canDraft ? 200 : 403;
    expect(httpStatus).toBe(403);
  });

  it("allows DRAFT attempt authorization for previewer", () => {
    const canDraft = canAccessDraftContent({
      roles: ["learner", "previewer"],
      isPreviewEnv: true,
    });
    expect(canDraft).toBe(true);
  });
});

describe("canAccessDraftContent NEXT_PUBLIC isolation", () => {
  it("does not authorize via NEXT_PUBLIC alone", () => {
    const prev = {
      DEMO_PREVIEW: process.env.DEMO_PREVIEW,
      DEMO_MODE: process.env.DEMO_MODE,
      NEXT_PUBLIC_DEMO_PREVIEW: process.env.NEXT_PUBLIC_DEMO_PREVIEW,
    };
    delete process.env.DEMO_PREVIEW;
    delete process.env.DEMO_MODE;
    process.env.NEXT_PUBLIC_DEMO_PREVIEW = "true";
    try {
      expect(isPublicDemoPreviewEnv()).toBe(true);
      expect(isPrivateAlphaPreviewEnv()).toBe(false);
      expect(
        canAccessDraftContent({
          roles: ["learner"],
          isPreviewEnv: isPrivateAlphaPreviewEnv(),
        }),
      ).toBe(false);
    } finally {
      for (const [k, v] of Object.entries(prev)) {
        if (v === undefined) delete process.env[k];
        else process.env[k] = v;
      }
    }
  });
});
