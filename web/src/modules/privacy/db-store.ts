/**
 * Drizzle-backed privacy export / delete stores (FUN-210 / FUN-211).
 */

import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  attempts,
  evidenceRecords,
  learnerProfiles,
  privacyAudit,
  session,
  user,
} from "@/db/schema";
import type {
  ExportStore,
  LearnerExportInput,
} from "./export";
import type { DeleteAccountStore } from "./delete-account";

export function createPrivacyExportStore(): ExportStore {
  return {
    async loadLearnerExportInput(userId: string): Promise<LearnerExportInput | null> {
      const db = getDb();
      const account = await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: { id: true, email: true },
      });
      if (!account) return null;

      const profile = await db.query.learnerProfiles.findFirst({
        where: eq(learnerProfiles.userId, userId),
      });

      const profileId = profile?.id;
      const attemptRows = profileId
        ? await db
            .select({
              id: attempts.id,
              exerciseId: attempts.exerciseId,
              correct: attempts.correct,
              mode: attempts.mode,
              response: attempts.response,
              createdAt: attempts.createdAt,
            })
            .from(attempts)
            .where(eq(attempts.learnerProfileId, profileId))
        : [];

      const evidenceRows = profileId
        ? await db
            .select({
              id: evidenceRecords.id,
              conceptCanonicalId: evidenceRecords.conceptCanonicalId,
              skill: evidenceRecords.skill,
              result: evidenceRecords.result,
              hinted: evidenceRecords.hinted,
              createdAt: evidenceRecords.createdAt,
            })
            .from(evidenceRecords)
            .where(eq(evidenceRecords.learnerProfileId, profileId))
        : [];

      const consents = profile?.consents ?? { ageConfirmed18: false };
      const consentRows = [
        {
          key: "terms",
          granted: Boolean(consents.termsAcceptedAt),
          grantedAt: consents.termsAcceptedAt ?? null,
        },
        {
          key: "privacy",
          granted: Boolean(consents.privacyAcceptedAt),
          grantedAt: consents.privacyAcceptedAt ?? null,
        },
        {
          key: "age_18",
          granted: Boolean(profile?.ageConfirmed18 ?? consents.ageConfirmed18),
          grantedAt: profile?.ageConfirmed18
            ? (profile.updatedAt?.toISOString() ?? null)
            : null,
        },
        {
          key: "marketing",
          granted: Boolean(consents.marketingOptIn),
          grantedAt: null,
        },
      ];

      return {
        userId: account.id,
        email: account.email,
        exportedAt: new Date().toISOString(),
        profile: {
          uiLocale: profile?.uiLocale ?? "ru",
          l1: profile?.l1 ?? "ukr",
          level: profile?.level ?? null,
          goals: profile?.goals ?? {},
          weeklyMinutes: profile?.weeklyMinutes ?? null,
          ageConfirmed18: profile?.ageConfirmed18 ?? false,
        },
        consents: consentRows,
        evidence: evidenceRows.map((e) => ({
          id: e.id,
          conceptCanonicalId: e.conceptCanonicalId,
          skill: e.skill,
          result: e.result,
          hinted: e.hinted,
          createdAt: e.createdAt.toISOString(),
        })),
        attempts: attemptRows.map((a) => ({
          id: a.id,
          exerciseId: a.exerciseId ?? "",
          correct: a.correct,
          mode: a.mode,
          response: a.response,
          createdAt: a.createdAt.toISOString(),
        })),
        voiceFileIds: [],
      };
    },

    async writeAudit(event) {
      const db = getDb();
      await db.insert(privacyAudit).values({
        actorUserId: event.userId,
        subjectUserId: event.userId,
        action: event.action,
        details: { at: event.at },
      });
    },
  };
}

export function createPrivacyDeleteStore(): DeleteAccountStore {
  return {
    async revokeSessions(userId: string) {
      const db = getDb();
      await db.delete(session).where(eq(session.userId, userId));
    },

    async deleteLearnerArtifacts(userId: string) {
      const db = getDb();
      // learner_profiles cascade deletes attempts, evidence, mastery, etc.
      await db.delete(learnerProfiles).where(eq(learnerProfiles.userId, userId));
    },

    async anonymizeUser(userId: string, at: string) {
      const db = getDb();
      const tombstone = `deleted+${userId}@deleted.slowarium.local`;
      await db
        .update(user)
        .set({
          name: "Deleted user",
          email: tombstone,
          image: null,
          emailVerified: false,
          roleFlags: [],
          updatedAt: new Date(at),
        })
        .where(eq(user.id, userId));
    },

    async writeAudit(event) {
      const db = getDb();
      // After anonymize, user row still exists — FK ok. On delete_completed after
      // anonymize, still attribute to subject for compliance trail.
      await db.insert(privacyAudit).values({
        actorUserId: event.userId,
        subjectUserId: event.userId,
        action: event.action,
        details: { at: event.at },
      });
    },
  };
}
