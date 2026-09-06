/**
 * Mastery thresholds — ASSUMPTION pending DEC-003 (ASM-005).
 * Mapped to foundation states:
 *   DEMONSTRATED ≈ product "gotowy"
 *   MASTERED     ≈ product "mastered"
 *   REVIEW_DUE   ≈ product "decaying"
 */

export const MASTERY_CONFIG = {
  assumption: true as const,
  source: "ASM-005 / DEC-003 open",
  windowDays: 21,
  demonstrated: {
    minCorrectUnhinted: 5,
    minEvidenceTypes: 2,
    minAccuracy: 0.75,
  },
  mastered: {
    /** In addition to demonstrated thresholds within the same window */
    minCorrectUnhinted: 8,
    minEvidenceTypes: 3,
    minAccuracy: 0.8,
    /** Productive concepts require ≥1 qualified productive evidence */
    requireProductiveEvidence: true,
  },
  reviewDue: {
    /** No fresh evidence for N days → REVIEW_DUE */
    staleDays: 28,
  },
  /** Error while MASTERED demotes to DEMONSTRATED (not all the way to LEARNING). */
  demoteOnErrorFromMastered: "DEMONSTRATED" as const,
} as const;

export type MasteryConfig = typeof MASTERY_CONFIG;
