/**
 * Progress overview from DB (attempts + concept_mastery).
 * Learner-facing labels: human lesson titles + locale-aware concept labels.
 */

import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  attempts,
  conceptMastery,
  learnerProfiles,
} from "@/db/schema";
import { masteryStateToBadge } from "./attempt-mode";
import {
  humanConceptLabel,
  type ConceptLabelLocale,
} from "@/lib/content/concept-labels";
import {
  resolveAttemptLessonTitle,
  uiLocaleToConceptLabelLocale,
  type LessonTitleLocale,
} from "@/lib/content/lesson-titles";

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

export type LoadProgressOptions = {
  /** UI locale (uk|ru|pl) for concept labels and fallbacks. */
  locale?: string | null;
};

export async function loadProgressOverview(
  userId: string | null,
  options: LoadProgressOptions = {},
): Promise<ProgressOverview> {
  const labelLocale: ConceptLabelLocale = uiLocaleToConceptLabelLocale(
    options.locale,
  );

  if (!userId) {
    return { signedIn: false, concepts: [], recentAttempts: [] };
  }

  try {
    const db = getDb();
    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
      columns: { id: true, uiLocale: true },
    });
    if (!profile) {
      return { signedIn: true, concepts: [], recentAttempts: [] };
    }

    const effectiveLocale: ConceptLabelLocale = options.locale
      ? labelLocale
      : uiLocaleToConceptLabelLocale(profile.uiLocale);
    const effectiveTitleLocale = effectiveLocale as LessonTitleLocale;

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
      label: humanConceptLabel(row.conceptCanonicalId, effectiveLocale),
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
      return {
        id: row.id,
        lessonTitle: resolveAttemptLessonTitle(response, effectiveTitleLocale),
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

/** @deprecated Prefer loadProgressOverview with locale; kept for callers. */
export function labelForConcept(
  canonicalId: string,
  locale: ConceptLabelLocale = "ru",
): string {
  return humanConceptLabel(canonicalId, locale);
}
