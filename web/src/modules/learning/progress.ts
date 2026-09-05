/**
 * Progress overview from DB (attempts + concept_mastery).
 */

import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  attempts,
  conceptMastery,
  learnerProfiles,
} from "@/db/schema";
import { masteryStateToBadge } from "./attempt-mode";

export type ProgressConcept = {
  conceptId: string;
  label: string;
  status: "mastered" | "emerging" | "not_started";
  state: string;
};

export type ProgressAttempt = {
  id: string;
  lessonTitle: string;
  result: "correct" | "incorrect" | "unknown";
  at: string;
  mode: string;
};

export type ProgressOverview = {
  signedIn: boolean;
  concepts: ProgressConcept[];
  recentAttempts: ProgressAttempt[];
};

function labelForConcept(canonicalId: string): string {
  return canonicalId;
}

export async function loadProgressOverview(
  userId: string | null,
): Promise<ProgressOverview> {
  if (!userId) {
    return { signedIn: false, concepts: [], recentAttempts: [] };
  }

  try {
    const db = getDb();
    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
      columns: { id: true },
    });
    if (!profile) {
      return { signedIn: true, concepts: [], recentAttempts: [] };
    }

    const masteryRows = await db
      .select({
        conceptCanonicalId: conceptMastery.conceptCanonicalId,
        state: conceptMastery.state,
      })
      .from(conceptMastery)
      .where(eq(conceptMastery.learnerProfileId, profile.id))
      .orderBy(desc(conceptMastery.updatedAt));

    const concepts: ProgressConcept[] = masteryRows.map((row) => ({
      conceptId: row.conceptCanonicalId,
      label: labelForConcept(row.conceptCanonicalId),
      status: masteryStateToBadge(row.state),
      state: row.state,
    }));

    const attemptRows = await db
      .select({
        id: attempts.id,
        correct: attempts.correct,
        mode: attempts.mode,
        createdAt: attempts.createdAt,
        response: attempts.response,
      })
      .from(attempts)
      .where(eq(attempts.learnerProfileId, profile.id))
      .orderBy(desc(attempts.createdAt))
      .limit(20);

    const recentAttempts: ProgressAttempt[] = attemptRows.map((row) => {
      const response = row.response as Record<string, unknown> | null;
      const exerciseCanonicalId =
        response && typeof response.exerciseCanonicalId === "string"
          ? response.exerciseCanonicalId
          : null;
      const moduleId =
        response && typeof response.moduleId === "string"
          ? response.moduleId
          : null;
      return {
        id: row.id,
        lessonTitle:
          exerciseCanonicalId ?? moduleId ?? "attempt",
        result:
          row.correct === true
            ? "correct"
            : row.correct === false
              ? "incorrect"
              : "unknown",
        at: row.createdAt.toISOString().slice(0, 10),
        mode: row.mode,
      };
    });

    return { signedIn: true, concepts, recentAttempts };
  } catch {
    return { signedIn: true, concepts: [], recentAttempts: [] };
  }
}
