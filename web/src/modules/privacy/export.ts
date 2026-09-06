/**
 * FUN-210 — learner data export (server-side).
 * Builds a machine-readable payload; never includes other users' data,
 * password hashes, or auth tokens.
 */

export type ConsentSnapshot = {
  key: string;
  granted: boolean;
  grantedAt: string | null;
};

export type EvidenceExportRow = {
  id: string;
  conceptCanonicalId: string;
  skill: string | null;
  result: string;
  hinted: boolean;
  createdAt: string;
};

export type AttemptExportRow = {
  id: string;
  exerciseId: string;
  correct: boolean | null;
  mode: string;
  masteryScope?: string;
  response: unknown;
  createdAt: string;
};

export type MasteryExportRow = {
  conceptCanonicalId: string;
  state: string;
  masteryScope: string;
  updatedAt: string;
  explanationSnapshot: unknown;
};

export type LearnerExportInput = {
  userId: string;
  email: string;
  exportedAt: string;
  profile: {
    uiLocale: string;
    l1: string;
    level: string | null;
    goals: unknown;
    weeklyMinutes: number | null;
    ageConfirmed18: boolean;
    consents?: unknown;
  };
  consents: ConsentSnapshot[];
  mastery: MasteryExportRow[];
  evidence: EvidenceExportRow[];
  attempts: AttemptExportRow[];
  voiceFileIds: string[];
};

export type LearnerExportDocument = LearnerExportInput & {
  schemaVersion: 2;
  product: "SŁOWARIUM";
  format: "slowarium.learner-export.v2";
};

/** Pure builder — call only after ownership check on the server. */
export function buildLearnerExport(
  input: LearnerExportInput,
): LearnerExportDocument {
  return {
    schemaVersion: 2,
    product: "SŁOWARIUM",
    format: "slowarium.learner-export.v2",
    ...input,
  };
}

export function serializeLearnerExport(doc: LearnerExportDocument): string {
  return `${JSON.stringify(doc, null, 2)}\n`;
}

export type ExportStore = {
  loadLearnerExportInput(userId: string): Promise<LearnerExportInput | null>;
  writeAudit(event: {
    userId: string;
    action: "export_requested" | "export_completed";
    at: string;
  }): Promise<void>;
};

/**
 * Server entry: load owned data, audit, return JSON string.
 * Returns null if the user has no learner profile / data.
 */
export async function exportLearnerData(
  store: ExportStore,
  userId: string,
  now = new Date(),
): Promise<string | null> {
  const at = now.toISOString();
  await store.writeAudit({ userId, action: "export_requested", at });
  const input = await store.loadLearnerExportInput(userId);
  if (!input) return null;
  const doc = buildLearnerExport({ ...input, exportedAt: at, userId });
  await store.writeAudit({ userId, action: "export_completed", at });
  return serializeLearnerExport(doc);
}
