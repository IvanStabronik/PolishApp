/**
 * REAL PostgreSQL review_schedule integration tests.
 * Requires DATABASE_URL after migrate + seed (CI).
 */

import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { and, eq } from "drizzle-orm";
import { loadEnvFiles } from "@/db/load-env";
import {
  account,
  learnerProfiles,
  privacyAudit,
  reviewSchedule,
  session,
  user,
  userRoles,
} from "@/db/schema";
import {
  persistLearningAttempt,
  resolveExerciseRow,
  resolveModuleContentVersionId,
} from "@/modules/learning/persist-attempt";
import { nextReviewDueAt } from "@/modules/learning/review-queue";
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

const answer: AttemptAnswer = {
  type: "single_choice",
  index: 0,
};

function evalFor(correct: boolean): EvalResult {
  return {
    correct,
    explanation: correct ? "ok" : "wrong",
    evidenceWeight: 0.7,
    conceptId: "GR-TNS-PRS-01",
    revealCorrectIndexes: correct ? [0] : [],
  };
}

async function createTestUser(label: string): Promise<string> {
  const id = randomUUID();
  const now = new Date();
  await db.insert(user).values({
    id,
    name: `IT RS ${label}`,
    email: `it.rs.${label}.${id.slice(0, 8)}@slowarium.test`,
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

describe("PostgreSQL review_schedule", () => {
  it("persist attempt updates review_schedule dueAt", async () => {
    const userId = await createTestUser("due");
    createdUsers.push(userId);
    const before = Date.now();

    const result = await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation: evalFor(true),
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    expect(result.persisted).toBe(true);
    expect(result.reviewDueAt).toBeTruthy();

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    expect(profile).toBeTruthy();

    const schedule = await db.query.reviewSchedule.findFirst({
      where: and(
        eq(reviewSchedule.learnerProfileId, profile!.id),
        eq(reviewSchedule.conceptCanonicalId, "GR-TNS-PRS-01"),
        eq(reviewSchedule.masteryScope, "live"),
      ),
    });
    expect(schedule).toBeTruthy();
    expect(schedule!.masteryScope).toBe("live");

    const expected = nextReviewDueAt(new Date(before), true, 0);
    const delta = Math.abs(schedule!.dueAt.getTime() - expected.getTime());
    // Allow a few seconds of clock skew between before/after.
    expect(delta).toBeLessThan(10_000);
  });

  it("correct vs incorrect change dueAt per nextReviewDueAt", async () => {
    const userId = await createTestUser("interval");
    createdUsers.push(userId);

    await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation: evalFor(false),
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    const afterIncorrect = await db.query.reviewSchedule.findFirst({
      where: and(
        eq(reviewSchedule.learnerProfileId, profile!.id),
        eq(reviewSchedule.conceptCanonicalId, "GR-TNS-PRS-01"),
        eq(reviewSchedule.masteryScope, "live"),
      ),
    });
    expect(afterIncorrect).toBeTruthy();
    const incorrectDue = afterIncorrect!.dueAt.getTime();

    // Wait a tick so "now" differs, then correct answer should push further out.
    await new Promise((r) => setTimeout(r, 20));

    await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation: evalFor(true),
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    const afterCorrect = await db.query.reviewSchedule.findFirst({
      where: and(
        eq(reviewSchedule.learnerProfileId, profile!.id),
        eq(reviewSchedule.conceptCanonicalId, "GR-TNS-PRS-01"),
        eq(reviewSchedule.masteryScope, "live"),
      ),
    });
    expect(afterCorrect).toBeTruthy();
    // Correct (+4d) is later than incorrect (+0.5d) from roughly the same now.
    expect(afterCorrect!.dueAt.getTime()).toBeGreaterThan(incorrectDue);
  });

  it("same idempotency key does not move schedule again", async () => {
    const userId = await createTestUser("idem-rs");
    createdUsers.push(userId);
    const key = randomUUID();

    const first = await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation: evalFor(true),
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: key,
      },
      db,
    );
    expect(first.persisted).toBe(true);
    expect(first.reviewDueAt).toBeTruthy();

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    const before = await db.query.reviewSchedule.findFirst({
      where: and(
        eq(reviewSchedule.learnerProfileId, profile!.id),
        eq(reviewSchedule.conceptCanonicalId, "GR-TNS-PRS-01"),
        eq(reviewSchedule.masteryScope, "live"),
      ),
    });
    const dueBefore = before!.dueAt.toISOString();
    const updatedBefore = before!.updatedAt.toISOString();

    await new Promise((r) => setTimeout(r, 30));

    const second = await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation: evalFor(false),
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: key,
      },
      db,
    );
    expect(second.replayed ?? second.idempotentReplay).toBe(true);
    expect(second.reviewDueAt).toBeNull();

    const after = await db.query.reviewSchedule.findFirst({
      where: and(
        eq(reviewSchedule.learnerProfileId, profile!.id),
        eq(reviewSchedule.conceptCanonicalId, "GR-TNS-PRS-01"),
        eq(reviewSchedule.masteryScope, "live"),
      ),
    });
    expect(after!.dueAt.toISOString()).toBe(dueBefore);
    expect(after!.updatedAt.toISOString()).toBe(updatedBefore);
  });

  it("preview vs live mastery_scope schedules stay separated", async () => {
    const userId = await createTestUser("scope-rs");
    createdUsers.push(userId);

    await persistLearningAttempt(
      {
        userId,
        moduleId: "pierwsze-spotkanie",
        exerciseCanonicalId,
        exerciseUuid,
        contentVersionId,
        answer,
        evaluation: evalFor(true),
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
        evaluation: evalFor(false),
        mode: "formative",
        exerciseType: "single_choice",
        idempotencyKey: randomUUID(),
      },
      db,
    );

    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    const rows = await db
      .select()
      .from(reviewSchedule)
      .where(
        and(
          eq(reviewSchedule.learnerProfileId, profile!.id),
          eq(reviewSchedule.conceptCanonicalId, "GR-TNS-PRS-01"),
        ),
      );

    const scopes = new Set(rows.map((r) => r.masteryScope));
    expect(scopes.has("preview")).toBe(true);
    expect(scopes.has("live")).toBe(true);
    expect(rows).toHaveLength(2);
    // Different intervals → different due dates.
    expect(rows[0]!.dueAt.getTime()).not.toBe(rows[1]!.dueAt.getTime());
  });
});
