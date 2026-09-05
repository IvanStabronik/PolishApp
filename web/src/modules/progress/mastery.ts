import { MASTERY_CONFIG } from "./mastery-config";

export const MasteryState = {
  NOT_STARTED: "NOT_STARTED",
  LEARNING: "LEARNING",
  PRACTICING: "PRACTICING",
  DEMONSTRATED: "DEMONSTRATED",
  MASTERED: "MASTERED",
  REVIEW_DUE: "REVIEW_DUE",
} as const;

export type MasteryStateName =
  (typeof MasteryState)[keyof typeof MasteryState];

export type EvidenceResult = "correct" | "incorrect" | "partial" | "pending";

export type EvidenceRecord = {
  conceptCanonicalId: string;
  /** Closed item type / evidence channel, e.g. single_choice, gap_fill, roleplay_tv */
  evidenceType: string;
  skill?: string;
  result: EvidenceResult;
  hinted: boolean;
  /** Productive (speaking/writing scored) vs receptive/closed */
  productive?: boolean;
  examLike?: boolean;
  createdAt: Date;
  /** preview / non-learner modes must not be passed into recompute */
  mode?: "formative" | "summative" | "preview";
};

export type MasterySnapshot = {
  conceptCanonicalId: string;
  state: MasteryStateName;
  explanation: {
    windowDays: number;
    correctUnhinted: number;
    totalInWindow: number;
    accuracy: number;
    evidenceTypes: string[];
    productiveCorrect: number;
    lastEvidenceAt: string | null;
    assumption: true;
  };
};

function daysBetween(a: Date, b: Date): number {
  return Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
}

function inWindow(ev: EvidenceRecord, now: Date, windowDays: number): boolean {
  return daysBetween(now, ev.createdAt) <= windowDays;
}

/**
 * Pure recompute of concept mastery from evidence (ADR-006).
 * Callers must exclude preview attempts before invoking.
 */
export function recomputeMastery(
  conceptCanonicalId: string,
  evidence: EvidenceRecord[],
  opts?: {
    now?: Date;
    isProductiveConcept?: boolean;
    config?: typeof MASTERY_CONFIG;
  },
): MasterySnapshot {
  const config = opts?.config ?? MASTERY_CONFIG;
  const now = opts?.now ?? new Date();
  const isProductive = opts?.isProductiveConcept ?? false;

  const relevant = evidence
    .filter((e) => e.conceptCanonicalId === conceptCanonicalId)
    .filter((e) => e.mode !== "preview")
    .filter((e) => e.result !== "pending")
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const last = relevant[relevant.length - 1] ?? null;
  const window = relevant.filter((e) => inWindow(e, now, config.windowDays));

  const scored = window.filter((e) => e.result === "correct" || e.result === "incorrect");
  const correctUnhinted = scored.filter(
    (e) => e.result === "correct" && !e.hinted,
  );
  const accuracy =
    scored.length === 0
      ? 0
      : scored.filter((e) => e.result === "correct").length / scored.length;

  const evidenceTypes = [
    ...new Set(correctUnhinted.map((e) => e.evidenceType)),
  ];
  const productiveCorrect = correctUnhinted.filter((e) => e.productive).length;

  const explanation = {
    windowDays: config.windowDays,
    correctUnhinted: correctUnhinted.length,
    totalInWindow: scored.length,
    accuracy,
    evidenceTypes,
    productiveCorrect,
    lastEvidenceAt: last ? last.createdAt.toISOString() : null,
    assumption: true as const,
  };

  if (relevant.length === 0) {
    return { conceptCanonicalId, state: MasteryState.NOT_STARTED, explanation };
  }

  if (
    last &&
    daysBetween(now, last.createdAt) > config.reviewDue.staleDays
  ) {
    // Stale after any prior progress
    const priorProgress =
      correctUnhinted.length > 0 ||
      relevant.some((e) => e.result === "correct");
    if (priorProgress) {
      return { conceptCanonicalId, state: MasteryState.REVIEW_DUE, explanation };
    }
  }

  const meetsDemonstrated =
    correctUnhinted.length >= config.demonstrated.minCorrectUnhinted &&
    evidenceTypes.length >= config.demonstrated.minEvidenceTypes &&
    accuracy >= config.demonstrated.minAccuracy;

  const meetsMastered =
    meetsDemonstrated &&
    correctUnhinted.length >= config.mastered.minCorrectUnhinted &&
    evidenceTypes.length >= config.mastered.minEvidenceTypes &&
    accuracy >= config.mastered.minAccuracy &&
    (!isProductive ||
      !config.mastered.requireProductiveEvidence ||
      productiveCorrect >= 1);

  // Demotion: incorrect while previously mastered (approximate via window + last error)
  const lastIncorrect = [...relevant].reverse().find((e) => e.result === "incorrect");
  const hadMasteredBand =
    correctUnhinted.length >= config.mastered.minCorrectUnhinted &&
    evidenceTypes.length >= config.mastered.minEvidenceTypes;

  if (
    lastIncorrect &&
    hadMasteredBand &&
    lastIncorrect.createdAt >= (last?.createdAt ?? lastIncorrect.createdAt) &&
    lastIncorrect === last
  ) {
    // Most recent event is an error after a mastered-level streak → demote
    if (meetsDemonstrated) {
      return {
        conceptCanonicalId,
        state: MasteryState.DEMONSTRATED,
        explanation,
      };
    }
  }

  if (meetsMastered) {
    return { conceptCanonicalId, state: MasteryState.MASTERED, explanation };
  }
  if (meetsDemonstrated) {
    return { conceptCanonicalId, state: MasteryState.DEMONSTRATED, explanation };
  }

  if (correctUnhinted.length >= 2 || scored.length >= 3) {
    return { conceptCanonicalId, state: MasteryState.PRACTICING, explanation };
  }

  return { conceptCanonicalId, state: MasteryState.LEARNING, explanation };
}
