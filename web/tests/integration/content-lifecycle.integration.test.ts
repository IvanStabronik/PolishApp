/**
 * REAL PostgreSQL content lifecycle (author/reviewer) integration tests.
 * Requires DATABASE_URL after migrate + seed (CI).
 *
 * REJECTED is the DB equivalent of product CHANGES_REQUESTED.
 */

import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { and, eq, sql } from "drizzle-orm";
import { loadEnvFiles } from "@/db/load-env";
import {
  account,
  contentUnits,
  contentVersions,
  modules,
  privacyAudit,
  publicationEvents,
  reviews,
  session,
  user,
  userRoles,
} from "@/db/schema";
import type { UserRole } from "@/lib/enums";
import { persistReviewTransition } from "@/modules/content/persist-review-transition";

loadEnvFiles();

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set for real DB integration tests (CI migrate/seed).",
  );
}

const { getDb, getSql } = await import("@/db/client");
const db = getDb();

const createdUsers: string[] = [];
const createdModuleIds: string[] = [];
const createdUnitIds: string[] = [];

async function createTestUser(
  label: string,
  roles: UserRole[],
): Promise<string> {
  const id = randomUUID();
  const now = new Date();
  await db.insert(user).values({
    id,
    name: `IT ${label}`,
    email: `it.${label}.${id.slice(0, 8)}@slowarium.test`,
    emailVerified: true,
    roleFlags: roles,
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
  createdUsers.push(id);
  return id;
}

async function cleanupUser(userId: string) {
  await db.delete(session).where(eq(session.userId, userId));
  await db.delete(account).where(eq(account.userId, userId));
  await db.delete(userRoles).where(eq(userRoles.userId, userId));
  await db
    .update(privacyAudit)
    .set({ actorUserId: null, subjectUserId: null })
    .where(eq(privacyAudit.subjectUserId, userId));
  await db.delete(user).where(eq(user.id, userId));
}

async function createDraftModule(authorUserId: string): Promise<{
  moduleSlug: string;
  contentVersionId: string;
  moduleId: string;
}> {
  const suffix = randomUUID().slice(0, 8);
  const canonicalId = `MOD-IT-LIFECYCLE-${suffix}`;
  const slug = `it-lifecycle-${suffix}`;

  const [unit] = await db
    .insert(contentUnits)
    .values({
      canonicalId,
      kind: "module",
      title: `Lifecycle IT ${suffix}`,
    })
    .returning({ id: contentUnits.id });
  createdUnitIds.push(unit!.id);

  const [version] = await db
    .insert(contentVersions)
    .values({
      unitId: unit!.id,
      versionNo: 1,
      status: "DRAFT",
      authorUserId,
      provenance: {
        notes: "integration lifecycle fixture",
        sources: ["FN-A1-IT-01"],
      },
      payload: { curriculum_links: ["FN-A1-IT-01"] },
    })
    .returning({ id: contentVersions.id });

  const [mod] = await db
    .insert(modules)
    .values({
      canonicalId,
      workingTitle: `Lifecycle IT ${suffix}`,
      slug,
      contentVersionId: version!.id,
      publishedVersionId: null,
      sortOrder: 99,
      metadata: { integration: true },
    })
    .returning({ id: modules.id });
  createdModuleIds.push(mod!.id);

  return {
    moduleSlug: slug,
    contentVersionId: version!.id,
    moduleId: mod!.id,
  };
}

afterAll(async () => {
  for (const moduleId of createdModuleIds) {
    try {
      const mod = await db.query.modules.findFirst({
        where: eq(modules.id, moduleId),
        columns: { contentVersionId: true },
      });
      const cvId = mod?.contentVersionId;
      if (cvId) {
        await db.delete(reviews).where(eq(reviews.contentVersionId, cvId));
        await db
          .delete(publicationEvents)
          .where(eq(publicationEvents.contentVersionId, cvId));
      }
      await db.delete(modules).where(eq(modules.id, moduleId));
      if (cvId) {
        await db.delete(contentVersions).where(eq(contentVersions.id, cvId));
      }
    } catch {
      /* best-effort */
    }
  }
  for (const unitId of createdUnitIds) {
    try {
      const versions = await db
        .select({ id: contentVersions.id })
        .from(contentVersions)
        .where(eq(contentVersions.unitId, unitId));
      for (const v of versions) {
        await db.delete(reviews).where(eq(reviews.contentVersionId, v.id));
        await db
          .delete(publicationEvents)
          .where(eq(publicationEvents.contentVersionId, v.id));
      }
      await db.delete(contentVersions).where(eq(contentVersions.unitId, unitId));
      await db.delete(contentUnits).where(eq(contentUnits.id, unitId));
    } catch {
      /* best-effort */
    }
  }
  for (const id of createdUsers) {
    try {
      await cleanupUser(id);
    } catch {
      /* already deleted */
    }
  }
  await getSql().end({ timeout: 5 });
});

describe("PostgreSQL content lifecycle", () => {
  it("submit → request_changes (comment) → resubmit → approve", async () => {
    const authorId = await createTestUser("lc-author", ["author"]);
    const reviewerId = await createTestUser("lc-reviewer", ["reviewer"]);
    const { moduleSlug, contentVersionId } =
      await createDraftModule(authorId);

    const submitted = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });
    expect(submitted.ok).toBe(true);
    expect(submitted.to).toBe("IN_REVIEW");
    expect(submitted.status).toBe("IN_REVIEW");

    const noComment = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "verdict",
      actorId: reviewerId,
      actorRoles: ["reviewer"],
      verdict: "request_changes",
      comment: "",
    });
    expect(noComment.ok).toBe(false);
    expect(noComment.error).toBe("comment_required");

    const changes = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "verdict",
      actorId: reviewerId,
      actorRoles: ["reviewer"],
      verdict: "request_changes",
      comment: "Fix pan/pani note",
    });
    expect(changes.ok).toBe(true);
    expect(changes.to).toBe("REJECTED"); // CHANGES_REQUESTED equivalent
    expect(changes.status).toBe("REJECTED");

    const reviewRows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.contentVersionId, contentVersionId));
    expect(reviewRows).toHaveLength(1);
    expect(reviewRows[0]!.decision).toBe("reject");
    expect(reviewRows[0]!.comment).toBe("Fix pan/pani note");

    const resubmitted = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });
    expect(resubmitted.ok).toBe(true);
    expect(resubmitted.to).toBe("IN_REVIEW");
    expect(resubmitted.status).toBe("IN_REVIEW");

    const approved = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "verdict",
      actorId: reviewerId,
      actorRoles: ["reviewer"],
      verdict: "approve",
    });
    expect(approved.ok).toBe(true);
    expect(approved.to).toBe("APPROVED");

    const version = await db.query.contentVersions.findFirst({
      where: eq(contentVersions.id, contentVersionId),
    });
    expect(version?.status).toBe("APPROVED");
    expect(version?.reviewerId).toBe(reviewerId);

    const events = await db
      .select()
      .from(publicationEvents)
      .where(eq(publicationEvents.contentVersionId, contentVersionId));
    expect(events.length).toBeGreaterThanOrEqual(4);

    const privacyHits = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(privacyAudit)
      .where(
        and(
          eq(privacyAudit.actorUserId, authorId),
          sql`${privacyAudit.action} like 'content_%'`,
        ),
      );
    expect(privacyHits[0]!.c).toBe(0);
  });

  it("self-review is forbidden", async () => {
    const authorId = await createTestUser("lc-self", ["author", "reviewer"]);
    const { moduleSlug } = await createDraftModule(authorId);

    await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });

    const selfApprove = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "verdict",
      actorId: authorId,
      actorRoles: ["author", "reviewer"],
      verdict: "approve",
    });
    expect(selfApprove.ok).toBe(false);
    expect(selfApprove.error).toBe("self_review_prohibited");
    expect(selfApprove.status).toBe("IN_REVIEW");
  });

  it("concurrent verdicts: only one succeeds", async () => {
    const authorId = await createTestUser("lc-conc-a", ["author"]);
    const reviewerA = await createTestUser("lc-conc-r1", ["reviewer"]);
    const reviewerB = await createTestUser("lc-conc-r2", ["reviewer"]);
    const { moduleSlug } = await createDraftModule(authorId);

    await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });

    const [a, b] = await Promise.all([
      persistReviewTransition({
        moduleId: moduleSlug,
        action: "verdict",
        actorId: reviewerA,
        actorRoles: ["reviewer"],
        verdict: "approve",
      }),
      persistReviewTransition({
        moduleId: moduleSlug,
        action: "verdict",
        actorId: reviewerB,
        actorRoles: ["reviewer"],
        verdict: "request_changes",
        comment: "too late",
      }),
    ]);

    const successes = [a, b].filter((r) => r.ok);
    const failures = [a, b].filter((r) => !r.ok);
    expect(successes).toHaveLength(1);
    expect(failures).toHaveLength(1);
    expect(failures[0]!.error).toMatch(/stale_state|self_review|not_in_review/);
  });

  it("PUBLISHED remains blocked; may log publication_events", async () => {
    const authorId = await createTestUser("lc-pub-a", ["author"]);
    const reviewerId = await createTestUser("lc-pub-r", ["reviewer"]);
    const adminId = await createTestUser("lc-pub-admin", ["admin"]);
    const { moduleSlug, contentVersionId } =
      await createDraftModule(authorId);

    await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });
    await persistReviewTransition({
      moduleId: moduleSlug,
      action: "verdict",
      actorId: reviewerId,
      actorRoles: ["reviewer"],
      verdict: "approve",
    });

    const before = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(publicationEvents)
      .where(eq(publicationEvents.contentVersionId, contentVersionId));

    const published = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "publish",
      actorId: adminId,
      actorRoles: ["admin"],
    });
    expect(published.ok).toBe(false);
    expect(published.error).toBe("publication_gates_open");
    expect(published.status).toBe("APPROVED");
    expect(published.publicationEventLogged).toBe(true);

    const version = await db.query.contentVersions.findFirst({
      where: eq(contentVersions.id, contentVersionId),
    });
    expect(version?.status).toBe("APPROVED");
    expect(version?.status).not.toBe("PUBLISHED");

    const after = await db
      .select({ c: sql<number>`count(*)::int` })
      .from(publicationEvents)
      .where(eq(publicationEvents.contentVersionId, contentVersionId));
    expect(after[0]!.c).toBe(before[0]!.c + 1);
  });

  it("rejects stale submit when already IN_REVIEW", async () => {
    const authorId = await createTestUser("lc-stale", ["author"]);
    const { moduleSlug } = await createDraftModule(authorId);

    await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });

    const again = await persistReviewTransition({
      moduleId: moduleSlug,
      action: "submit_for_review",
      actorId: authorId,
      actorRoles: ["author"],
    });
    expect(again.ok).toBe(false);
    expect(again.error).toMatch(/stale_state|illegal_transition/);
    expect(again.status).toBe("IN_REVIEW");
  });
});
