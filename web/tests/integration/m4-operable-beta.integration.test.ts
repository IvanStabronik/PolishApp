/**
 * M4 Postgres integration — invites, feedback, JPJO, rate-limit shared state.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { getDb, getSql } from "@/db/client";
import { contentUnits, contentVersions, user, userRoles } from "@/db/schema";
import { canAccessDraftContent } from "@/lib/demo";
import {
  consumeInviteForUser,
  createBetaInvite,
  lookupInviteByRawToken,
  revokeBetaInvite,
} from "@/modules/beta";
import {
  createFeedbackReport,
  transitionFeedbackStatus,
} from "@/modules/feedback/service";
import { importJpjoVerdict, fingerprintContentPayload } from "@/modules/jpjo/service";
import { consumeRateLimit } from "@/modules/ops/rate-limit";
import { canAccessAdminArea } from "@/modules/admin/roles";

const hasDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDb)("M4 operable closed beta (postgres)", () => {
  let adminId = "";
  let learnerId = "";
  let versionId = "";

  beforeAll(async () => {
    const db = getDb();
    adminId = randomUUID();
    learnerId = randomUUID();
    const now = new Date();
    await db.insert(user).values([
      {
        id: adminId,
        name: "IT Admin",
        email: `it.admin.${adminId}@slowarium.test`,
        emailVerified: true,
        roleFlags: ["admin"],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: learnerId,
        name: "IT Learner",
        email: `it.learner.${learnerId}@slowarium.test`,
        emailVerified: true,
        roleFlags: ["learner"],
        createdAt: now,
        updatedAt: now,
      },
    ]);

    const [unit] = await db
      .insert(contentUnits)
      .values({
        canonicalId: `UNIT-IT-M4-${randomUUID().slice(0, 8)}`,
        kind: "module",
        title: "M4 IT",
      })
      .returning({ id: contentUnits.id });
    const payload = { m4: true, n: 1 };
    const [ver] = await db
      .insert(contentVersions)
      .values({
        unitId: unit!.id,
        versionNo: 1,
        status: "DRAFT",
        authorUserId: adminId,
        provenance: { test: true },
        payload,
      })
      .returning({ id: contentVersions.id, payload: contentVersions.payload });
    versionId = ver!.id;
  });

  afterAll(async () => {
    try {
      await getSql().end({ timeout: 5 });
    } catch {
      /* ignore */
    }
  });

  it("one-time accept + concurrent reuse denied", async () => {
    const created = await createBetaInvite({
      actorUserId: adminId,
      expiresAt: new Date(Date.now() + 86_400_000),
      label: "it-once",
    });
    const first = await consumeInviteForUser({
      rawToken: created.rawToken,
      userId: learnerId,
    });
    expect(first.ok).toBe(true);

    const other = randomUUID();
    await getDb().insert(user).values({
      id: other,
      name: "Other",
      email: `it.other.${other}@slowarium.test`,
      emailVerified: true,
      roleFlags: ["learner"],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const second = await consumeInviteForUser({
      rawToken: created.rawToken,
      userId: other,
    });
    expect(second.ok).toBe(false);
  });

  it("invite consume grants learner+previewer for DRAFT access", async () => {
    const inviteeId = randomUUID();
    await getDb().insert(user).values({
      id: inviteeId,
      name: "Invitee Draft",
      email: `it.invitee.${inviteeId}@slowarium.test`,
      emailVerified: true,
      roleFlags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const created = await createBetaInvite({
      actorUserId: adminId,
      expiresAt: new Date(Date.now() + 86_400_000),
      label: "it-draft-roles",
    });
    const consumed = await consumeInviteForUser({
      rawToken: created.rawToken,
      userId: inviteeId,
    });
    expect(consumed.ok).toBe(true);

    const dbUser = await getDb().query.user.findFirst({
      where: eq(user.id, inviteeId),
    });
    const flags = (dbUser?.roleFlags as string[] | null) ?? [];
    expect(flags).toEqual(expect.arrayContaining(["learner", "previewer"]));

    const roleRows = await getDb().query.userRoles.findMany({
      where: eq(userRoles.userId, inviteeId),
    });
    expect(roleRows.map((r) => r.role).sort()).toEqual(["learner", "previewer"]);

    expect(
      canAccessDraftContent({
        roles: flags as ("learner" | "previewer")[],
        isPreviewEnv: true,
      }),
    ).toBe(true);
    // Ordinary non-invite learner still denied without previewer.
    expect(
      canAccessDraftContent({
        roles: ["learner"],
        isPreviewEnv: true,
      }),
    ).toBe(false);
  });

  it("revoked and expired invites denied", async () => {
    const created = await createBetaInvite({
      actorUserId: adminId,
      expiresAt: new Date(Date.now() + 86_400_000),
    });
    await revokeBetaInvite({ actorUserId: adminId, inviteId: created.inviteId });
    const found = await lookupInviteByRawToken(created.rawToken);
    expect(found?.inspection.ok).toBe(false);
    expect(found?.inspection.ok === false && found.inspection.reason).toBe(
      "revoked",
    );

    const expired = await createBetaInvite({
      actorUserId: adminId,
      expiresAt: new Date(Date.now() - 1000),
    });
    const exp = await lookupInviteByRawToken(expired.rawToken);
    expect(exp?.inspection.ok).toBe(false);
  });

  it("admin role gate", () => {
    expect(canAccessAdminArea(["admin"])).toBe(true);
    expect(canAccessAdminArea(["learner"])).toBe(false);
  });

  it("feedback persist + idempotency + lifecycle", async () => {
    const key = randomUUID();
    const a = await createFeedbackReport({
      reporterUserId: learnerId,
      category: "bug",
      comment: "it",
      idempotencyKey: key,
      context: { route: "/ru/plan" },
    });
    const b = await createFeedbackReport({
      reporterUserId: learnerId,
      category: "bug",
      comment: "it",
      idempotencyKey: key,
      context: { route: "/ru/plan" },
    });
    expect(a.id).toBe(b.id);
    expect(b.deduped).toBe(true);

    const ok = await transitionFeedbackStatus({
      actorUserId: adminId,
      feedbackId: a.id,
      toStatus: "triaged",
    });
    expect(ok.ok).toBe(true);
    const resolved = await transitionFeedbackStatus({
      actorUserId: adminId,
      feedbackId: a.id,
      toStatus: "resolved",
    });
    expect(resolved.ok).toBe(true);
    const bad = await transitionFeedbackStatus({
      actorUserId: adminId,
      feedbackId: a.id,
      toStatus: "new",
    });
    expect(bad.ok).toBe(false);
  });

  it("JPJO version binding rejects wrong fingerprint / conflict", async () => {
    const payload = (
      await getDb().query.contentVersions.findFirst({
        where: eq(contentVersions.id, versionId),
      })
    )?.payload;
    const fp = fingerprintContentPayload(payload);
    const first = await importJpjoVerdict({
      actorUserId: adminId,
      reviewerIdentity: "jpjo-it-1",
      externalRef: "ref-1",
      contentVersionId: versionId,
      expectedFingerprint: fp,
      verdict: "approve",
      comment: "evidence only",
    });
    expect(first.ok).toBe(true);

    const mismatch = await importJpjoVerdict({
      actorUserId: adminId,
      reviewerIdentity: "jpjo-it-2",
      contentVersionId: versionId,
      expectedFingerprint: "0".repeat(64),
      verdict: "reject",
    });
    expect(mismatch.ok).toBe(false);

    const conflict = await importJpjoVerdict({
      actorUserId: adminId,
      reviewerIdentity: "jpjo-it-1",
      externalRef: "ref-1",
      contentVersionId: versionId,
      expectedFingerprint: fp,
      verdict: "abstain",
    });
    expect(conflict.ok).toBe(false);
  });

  it("rate-limit shared state across calls", async () => {
    const key = `it:rl:${randomUUID()}`;
    const a = await consumeRateLimit({ bucketKey: key, limit: 2, windowMs: 60_000 });
    const b = await consumeRateLimit({ bucketKey: key, limit: 2, windowMs: 60_000 });
    const c = await consumeRateLimit({ bucketKey: key, limit: 2, windowMs: 60_000 });
    expect(a.allowed).toBe(true);
    expect(b.allowed).toBe(true);
    expect(c.allowed).toBe(false);
  });
});
