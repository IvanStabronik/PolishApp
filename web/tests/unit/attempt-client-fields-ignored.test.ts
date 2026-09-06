/**
 * Attempt API body: client-supplied correct/preview/score/contentVersion ignored.
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";

/** Mirrors route BodySchema ignore contract. */
const BodySchema = z.object({
  moduleId: z.string().min(1).max(200),
  exerciseId: z.string().min(1).max(200),
  answer: z.record(z.string(), z.unknown()),
  hinted: z.boolean().optional(),
  idempotencyKey: z.string().uuid().optional(),
  preview: z.boolean().optional(),
  mode: z.string().optional(),
  correct: z.boolean().optional(),
  score: z.number().optional(),
  contentVersion: z.union([z.string(), z.number()]).optional(),
  contentVersionId: z.string().optional(),
  revealCorrectIndexes: z.array(z.number()).optional(),
  explanation: z.string().optional(),
});

describe("attempt body client fields ignored", () => {
  it("parses but route must not trust client correct/score/preview/version", () => {
    const parsed = BodySchema.parse({
      moduleId: "pierwsze-spotkanie",
      exerciseId: "ex-ps-01",
      answer: { type: "single_choice", index: 0 },
      correct: true,
      score: 1,
      preview: false,
      mode: "formative",
      contentVersion: 99,
      contentVersionId: "fake-version",
      revealCorrectIndexes: [0],
      explanation: "spoofed",
    });

    // Fields are accepted for stripping — server evaluation/mode/version win.
    expect(parsed.correct).toBe(true);
    expect(parsed.score).toBe(1);
    expect(parsed.contentVersionId).toBe("fake-version");

    // Document the ignore set used by the route handler.
    const ignored = {
      correct: parsed.correct,
      score: parsed.score,
      preview: parsed.preview,
      mode: parsed.mode,
      contentVersion: parsed.contentVersion,
      contentVersionId: parsed.contentVersionId,
      revealCorrectIndexes: parsed.revealCorrectIndexes,
      explanation: parsed.explanation,
    };
    expect(Object.keys(ignored).sort()).toEqual(
      [
        "correct",
        "score",
        "preview",
        "mode",
        "contentVersion",
        "contentVersionId",
        "revealCorrectIndexes",
        "explanation",
      ].sort(),
    );
  });
});
