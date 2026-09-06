/**
 * REAL PostgreSQL integration tests (no Map / persistence mocks).
 * Requires DATABASE_URL after migrate + seed (CI).
 */

import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { and, eq, sql } from "drizzle-orm";
import { loadEnvFiles } from "@/db/load-env";
import {
  account,
  attempts,
  conceptMastery,
  evidenceRecords,
  exercises,
  learnerProfiles,
  privacyAudit,
  session,
  user,
  userRoles,
} from "@/db/schema";
import {
  persistLearningAttempt,
  resolveExerciseRow,
  resolveModuleContentVersionId,
} from "@/modules/learning/persist-attempt";
import {
  createPrivacyDeleteStore,
  createPrivacyExportStore,
} from "@/modules/privacy/db-store";
import { deleteLearnerAccount } from "@/modules/privacy/delete-account";
import { exportLearnerData } from "@/modules/privacy/export";
import { privacyAuditSubjectId } from "@/modules/privacy/audit-id";
import type { EvalResult } from "@/modules/assessment/evaluate";
import type { AttemptAnswer } from "@/lib/content/evaluate-yaml";

loadEnvFiles();

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set for real DB integration tests (CI migrate/seed).",
  );
}

const { getDb, getSql } = await import("@/db/client");
const db = getDb();

const evaluation: EvalResult = {
  correct: true,
  explanation: "ok",
  evidenceWeight: 0.7,
  conceptId: "GR-TNS-PRS-01",
  revealCorrectIndexes: [0],
};

const answer: AttemptAnswer = {
  type: "single_choice",
  index: 0,
};

async function createTestUser(label: string): Promise<string> {
  const id = randomUUID();
  const now = new Date();
  await db.insert(user).values({
    id,
    name: `IT ${label}`,
    email: `it.${label}.${id.slice(0, 8)}@slowarium.test`,
    emailVerified: true,
    roleFlags: ["learner"],
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(account).values({
    id: randomUUID(),
    accountId: id,
    providerId: "credential",
    issuer: "local:credential",
    userId: id,
    password: "not-a-real-hash",
    createdAt: now,
    updatedAt: now,
  });
  return id;
}

async function cleanupUser(userId: string) {
  await db.delete(session).where(eq(session.userId, userId));
  await db.delete(account).where(eq(account.userId, userId));
  await db.delete(userRoles).where(eq(userRoles.userId, userId));
  await db.delete(learnerProfiles).where(eq(learnerProfiles.userId, userId));
  await db
    .update(privacyAudit)
    .set({ actorUserId: null, subjectUserId: null })
    .where(eq(privacyAudit.subjectUserId, userId));
  await db.delete(user).where(eq(user.id, userId));
}

let contentVersionId: string;
let exerciseUuid: string;
let exerciseCanonicalId: string;
const createdUsers: string[] = [];

beforeAll(async () => {
  const cv = await resolveModuleContentVersionId(db, "pierwsze-spotkanie");
  if (!cv) {
    throw new Error(
      "missing content version for pierwsze-spotkanie — run db:seed",
    );
  }
  contentVersionId = cv;

  const row =
    (await resolveExerciseRow(db, "EX-A1-PS-SC-01")) ??
    (await db.query.exercises.findFirst({
      columns: { id: true, canonicalId: true, contentVersionId: true },
    }));
  if (!row) throw new Error("no seeded exercises — run db:seed");
  exerciseUuid = row.id;
  exerciseCanonicalId = row.canonicalId;
});

afterAll(async () => {
  for (const id of createdUsers) {
    try {
      await cleanupUser(id);
    } catch {
      /* already deleted */
    }
  }
  await getSql().end({ timeout: 5 });
});

describe("PostgreSQL attempt + evidence + mastery", () => {
  it("1. persists attempt + evidence + mastery update together", async () => {
    const userId = await createTestUser("persist");
    createdUsers.push(userId);
    const key = randomUUID();

    const result = await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: key,
      },
      db,
    );

    expect(result.persisted).toBe(true);
    expect(result.attemptId).toBeTruthy();
    expect(result.masteryWritten).toBe(true);
    expect(result.masteryScope).toBe("live");

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    expect(profile).toBeTruthy();

    const attemptRows = await db
      .select()
      .from(attempts)
      .where(eq(attempts.learnerProfileId, profile!.id));
    expect(attemptRows).toHaveLength(1);

    const evidenceRows = await db
      .select()
      .from(evidenceRecords)
      .where(eq(evidenceRecords.learnerProfileId, profile!.id));
    expect(evidenceRows.length).toBeGreaterThanOrEqual(1);

    const masteryRows = await db
      .select()
      .from(conceptMastery)
      .where(
        and(
          eq(conceptMastery.learnerProfileId, profile!.id),
          eq(conceptMastery.masteryScope, "live"),
        ),
      );
    expect(masteryRows.length).toBeGreaterThanOrEqual(1);
  });

  it("2. same idempotency key → no second attempt/evidence", async () => {
    const userId = await createTestUser("idem");
    createdUsers.push(userId);
    const key = randomUUID();
    const input = {
      userId,
      moduleId: "pierwsze-spotkanie",
      exerciseCanonicalId,
      exerciseUuid,
      contentVersionId,
      answer,
      evaluation,
      mode: "formative" as const,
      exerciseType: "single_choice" as const,
      idempotencyKey: key,
    };

    const first = await persistLearningAttempt(input, db);
    const second = await persistLearningAttempt(input, db);

    expect(first.persisted).toBe(true);
    expect(second.persisted).toBe(true);
    expect(second.replayed ?? second.idempotentReplay).toBe(true);
    expect(second.attemptId).toBe(first.attemptId);

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    const attemptCount = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(attempts)
      .where(eq(attempts.learnerProfileId, profile!.id));
    expect(attemptCount[0]!.c).toBe(1);

    const evidenceCount = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(evidenceRecords)
      .where(eq(evidenceRecords.learnerProfileId, profile!.id));
    expect(evidenceCount[0]!.c).toBe(1);
  });

  it("3. same key different user → isolation", async () => {
    const userA = await createTestUser("iso-a");
    const userB = await createTestUser("iso-b");
    createdUsers.push(userA, userB);
    const sharedKey = randomUUID();

    const a = await persistLearningAttempt(
      {
        userId: userA,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: sharedKey,
      },
      db,
    );
    const b = await persistLearningAttempt(
      {
        userId: userB,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: sharedKey,
      },
      db,
    );

    expect(a.persisted).toBe(true);
    expect(b.persisted).toBe(true);
    expect(a.attemptId).not.toBe(b.attemptId);
    expect(b.replayed).not.toBe(true);
  });

  it("4. preview attempt only preview scope", async () => {
    const userId = await createTestUser("preview");
    createdUsers.push(userId);

    const result = await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "preview",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    expect(result.persisted).toBe(true);
    expect(result.masteryScope).toBe("preview");

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    const attempt = await db.query.attempts.findFirst({
      where: eq(attempts.learnerProfileId, profile!.id),
    });
    expect(attempt?.mode).toBe("preview");
    expect(attempt?.masteryScope).toBe("preview");
  });

  it("5. live/preview mastery not mixed", async () => {
    const userId = await createTestUser("scope-mix");
    createdUsers.push(userId);

    await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "preview",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );
    await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    const mastery = await db
      .select()
      .from(conceptMastery)
      .where(eq(conceptMastery.learnerProfileId, profile!.id));

    const scopes = new Set(mastery.map((m) => m.masteryScope));
    expect(scopes.has("preview")).toBe(true);
    expect(scopes.has("live")).toBe(true);
    // Same concept may exist in both scopes as separate rows.
    const preview = mastery.filter((m) => m.masteryScope === "preview");
    const live = mastery.filter((m) => m.masteryScope === "live");
    expect(preview.length).toBeGreaterThanOrEqual(1);
    expect(live.length).toBeGreaterThanOrEqual(1);
  });

  it("6. missing content version → rollback (no persist)", async () => {
    const userId = await createTestUser("missing-cv");
    createdUsers.push(userId);

    const result = await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId: null,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    expect(result.persisted).toBe(false);
    expect(result.reason).toBe("missing_content_version");

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    if (profile) {
      const attemptCount = await db
        .select({ c: sql<number>`count(*)::int` })
        .from(attempts)
        .where(eq(attempts.learnerProfileId, profile.id));
      expect(attemptCount[0]!.c).toBe(0);
    }
  });

  it("7. mid-transaction failure → no partial data", async () => {
    const userId = await createTestUser("partial");
    createdUsers.push(userId);

    // Force failure after profile create by using invalid exercise FK uuid.
    const bogusExerciseId = "00000000-0000-4000-8000-000000000099";
    let threw = false;
    try {
      await persistLearningAttempt(
        {
          userId,
          moduleId: "pierwsze-spotkanie",
          exerciseCanonicalId,
          exerciseUuid: bogusExerciseId,
          contentVersionId,
          answer,
          evaluation,
          mode: "formative",
          exerciseType: "single_choice",
          idempotencyKey: randomUUID(),
        },
        db,
      );
    } catch {
      threw = true;
    }

    expect(threw).toBe(true);

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    if (profile) {
      const attemptCount = await db
        .select({ c: sql<number>`count(*)::int` })
        .from(attempts)
        .where(eq(attempts.learnerProfileId, profile.id));
      expect(attemptCount[0]!.c).toBe(0);

      const evidenceCount = await db
        .select({ c: sql<number>`count(*)::int` })
        .from(evidenceRecords)
        .where(eq(evidenceRecords.learnerProfileId, profile.id));
      expect(evidenceCount[0]!.c).toBe(0);
    }
  });
});

describe("PostgreSQL privacy export / delete", () => {
  it("8. delete account removes credentials/sessions; re-login material gone", async () => {
    const userId = await createTestUser("delete");
    createdUsers.push(userId);

    await db.insert(session).values({
      id: randomUUID(),
      token: `tok-${randomUUID()}`,
      userId,
      expiresAt: new Date(Date.now() + 86_400_000),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await deleteLearnerAccount(
      createPrivacyDeleteStore(),
      userId,
    );
    expect(result.status).toBe("deleted");

    const userRow = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });
    expect(userRow).toBeUndefined();

    const creds = await db
      .select()
      .from(account)
      .where(eq(account.userId, userId));
    expect(creds).toHaveLength(0);

    const sessions = await db
      .select()
      .from(session)
      .where(eq(session.userId, userId));
    expect(sessions).toHaveLength(0);

    const audit = await db
      .select()
      .from(privacyAudit)
      .where(eq(privacyAudit.action, "delete_completed"));
    const match = audit.find((row) => {
      const details = row.details as { subjectHash?: string } | null;
      return details?.subjectHash === privacyAuditSubjectId(userId);
    });
    expect(match).toBeTruthy();
    const details = match!.details as { subjectHash: string };
    expect(details.subjectHash).not.toContain("@");
    expect(JSON.stringify(match!.details)).not.toMatch(/slowarium\.test/i);
  });

  it("9. export only current user’s data", async () => {
    const userA = await createTestUser("export-a");
    const userB = await createTestUser("export-b");
    createdUsers.push(userA, userB);

    await persistLearningAttempt(
      {
        userId: userA,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );
    await persistLearningAttempt(
      {
        userId: userB,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation,
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    const jsonA = await exportLearnerData(createPrivacyExportStore(), userA);
    expect(jsonA).toBeTruthy();
    const docA = JSON.parse(jsonA!) as {
      userId: string;
      email: string;
      attempts: unknown[];
    };
    expect(docA.userId).toBe(userA);
    expect(docA.email).toContain("export-a");
    expect(docA.email).not.toContain("export-b");
    expect(JSON.stringify(docA)).not.toContain(userB);
  });
});

describe("seeded content still present", () => {
  it("exercises table has seeded DRAFT rows", async () => {
    const count = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(exercises);
    expect(count[0]!.c).toBeGreaterThan(0);
  });
});
