import { describe, expect, it } from "vitest";
import { MASTERY_CONFIG } from "@/modules/progress/mastery-config";
import {
  MasteryState,
  recomputeMastery,
  type EvidenceRecord,
} from "@/modules/progress/mastery";

function ev(
  partial: Partial<EvidenceRecord> &
    Pick<EvidenceRecord, "result" | "evidenceType">,
): EvidenceRecord {
  return {
    conceptCanonicalId: "GR-CAS-NOM-01",
    hinted: false,
    createdAt: partial.createdAt ?? new Date("2026-09-01T10:00:00.000Z"),
    ...partial,
  };
}

function manyCorrect(opts: {
  count: number;
  types: string[];
  start?: Date;
}): EvidenceRecord[] {
  const start = opts.start ?? new Date("2026-09-01T10:00:00.000Z");
  return Array.from({ length: opts.count }, (_, i) =>
    ev({
      result: "correct",
      evidenceType: opts.types[i % opts.types.length]!,
      createdAt: new Date(start.getTime() + i * 60_000),
    }),
  );
}

describe("evidence → mastery transitions", () => {
  it("starts at NOT_STARTED with no evidence", () => {
    const snap = recomputeMastery("GR-CAS-NOM-01", []);
    expect(snap.state).toBe(MasteryState.NOT_STARTED);
    expect(snap.explanation.assumption).toBe(true);
  });

  it("ignores preview evidence", () => {
    const snap = recomputeMastery("GR-CAS-NOM-01", [
      ev({
        result: "correct",
        evidenceType: "single_choice",
        mode: "preview",
      }),
    ]);
    expect(snap.state).toBe(MasteryState.NOT_STARTED);
  });

  it("enters LEARNING / PRACTICING with early evidence", () => {
    const learning = recomputeMastery("GR-CAS-NOM-01", [
      ev({ result: "incorrect", evidenceType: "single_choice" }),
    ]);
    expect(learning.state).toBe(MasteryState.LEARNING);

    const practicing = recomputeMastery(
      "GR-CAS-NOM-01",
      manyCorrect({ count: 2, types: ["single_choice"] }),
    );
    expect(practicing.state).toBe(MasteryState.PRACTICING);
  });

  it("reaches DEMONSTRATED and MASTERED by ASM-005 ASSUMPTION thresholds", () => {
    expect(MASTERY_CONFIG.assumption).toBe(true);

    const demonstrated = recomputeMastery(
      "GR-CAS-NOM-01",
      manyCorrect({
        count: 5,
        types: ["single_choice", "gap_fill"],
      }),
    );
    expect(demonstrated.state).toBe(MasteryState.DEMONSTRATED);
    expect(demonstrated.explanation.correctUnhinted).toBe(5);

    const mastered = recomputeMastery(
      "GR-CAS-NOM-01",
      manyCorrect({
        count: 8,
        types: ["single_choice", "gap_fill", "ordering"],
      }),
    );
    expect(mastered.state).toBe(MasteryState.MASTERED);
  });

  it("marks REVIEW_DUE when evidence is stale", () => {
    const events = manyCorrect({
      count: 8,
      types: ["single_choice", "gap_fill", "ordering"],
      start: new Date("2026-07-01T00:00:00.000Z"),
    });
    const due = recomputeMastery("GR-CAS-NOM-01", events, {
      now: new Date("2026-09-01T00:00:00.000Z"),
    });
    expect(due.state).toBe(MasteryState.REVIEW_DUE);
  });

  it("requires productive evidence for productive concepts at MASTERED", () => {
    const closedOnly = manyCorrect({
      count: 8,
      types: ["single_choice", "gap_fill", "ordering"],
    });
    const blocked = recomputeMastery("GR-CAS-NOM-01", closedOnly, {
      isProductiveConcept: true,
    });
    expect(blocked.state).toBe(MasteryState.DEMONSTRATED);

    const withProd = [
      ...closedOnly,
      ev({
        result: "correct",
        evidenceType: "guided_prod",
        productive: true,
        createdAt: new Date("2026-09-01T12:00:00.000Z"),
      }),
    ];
    const ok = recomputeMastery("GR-CAS-NOM-01", withProd, {
      isProductiveConcept: true,
    });
    expect(ok.state).toBe(MasteryState.MASTERED);
  });
});
