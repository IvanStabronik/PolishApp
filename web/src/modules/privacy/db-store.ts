/**
 * Drizzle-backed privacy export / delete stores (FUN-210 / FUN-211).
 */

import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import {
  account,
  attempts,
  conceptMastery,
  evidenceRecords,
  learnerProfiles,
  privacyAudit,
  session,
  user,
  userRoles,
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
      const accountRow = await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: { id: true, email: true },
      });
      if (!accountRow) return null;

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
              masteryScope: attempts.masteryScope,
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

      const masteryRows = profileId
        ? await db
            .select({
              conceptCanonicalId: conceptMastery.conceptCanonicalId,
              state: conceptMastery.state,
              masteryScope: conceptMastery.masteryScope,
              updatedAt: conceptMastery.updatedAt,
              explanationSnapshot: conceptMastery.explanationSnapshot,
            })
            .from(conceptMastery)
            .where(eq(conceptMastery.learnerProfileId, profileId))
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
        userId: accountRow.id,
        email: accountRow.email,
        exportedAt: new Date().toISOString(),
        profile: {
          uiLocale: profile?.uiLocale ?? "ru",
          l1: profile?.l1 ?? "ukr",
          level: profile?.level ?? null,
          goals: profile?.goals ?? {},
          weeklyMinutes: profile?.weeklyMinutes ?? null,
          ageConfirmed18: profile?.ageConfirmed18 ?? false,
          consents,
        },
        consents: consentRows,
        mastery: masteryRows.map((m) => ({
          conceptCanonicalId: m.conceptCanonicalId,
          state: m.state,
          masteryScope: m.masteryScope,
          updatedAt: m.updatedAt.toISOString(),
          explanationSnapshot: m.explanationSnapshot ?? null,
        })),
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
          masteryScope: a.masteryScope,
          // Strip any accidental token-like keys from response blobs.
          response: sanitizeExportResponse(a.response),
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

function sanitizeExportResponse(
  response: Record<string, unknown> | null | undefined,
): Record<string, unknown> {
  if (!response || typeof response !== "object") return {};
  const blocked = new Set([
    "password",
    "token",
    "accessToken",
    "refreshToken",
    "idToken",
    "secret",
  ]);
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(response)) {
    if (blocked.has(key)) continue;
    out[key] = value;
  }
  return out;
}

export function createPrivacyDeleteStore(): DeleteAccountStore {
  return {
    async deleteAccountTransactional(userId: string, at: string) {
      const db = getDb();
      await db.transaction(async (tx) => {
        // Audit first while user FK still resolves; store no PII.
        await tx.insert(privacyAudit).values({
          actorUserId: userId,
          subjectUserId: userId,
          action: "delete_requested",
          details: { at },
        });

        await tx.delete(session).where(eq(session.userId, userId));
        await tx.delete(account).where(eq(account.userId, userId));
        await tx.delete(userRoles).where(eq(userRoles.userId, userId));
        // Cascades attempts, evidence, mastery, enrollments, etc.
        await tx
          .delete(learnerProfiles)
          .where(eq(learnerProfiles.userId, userId));

        // Clear FK on prior audit rows, then hard-delete user.
        await tx
          .update(privacyAudit)
          .set({ actorUserId: null, subjectUserId: null })
          .where(eq(privacyAudit.subjectUserId, userId));

        await tx.delete(user).where(eq(user.id, userId));

        await tx.insert(privacyAudit).values({
          actorUserId: null,
          subjectUserId: null,
          action: "delete_completed",
          details: { at, subjectHash: hashSubject(userId) },
        });
      });
    },
  };
}

/** Minimal non-reversible marker for compliance trail (not PII). */
function hashSubject(userId: string): string {
  let h = 0;
  for (let i = 0; i < userId.length; i++) {
    h = (h * 31 + userId.charCodeAt(i)) >>> 0;
  }
  return `u${h.toString(16)}`;
}
