/**
 * M4 acceptance — analytics UPSERT, transactional registration race,
 * beta deactivation + session revoke.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { eq, sql } from "drizzle-orm";
import { getDb, getSql } from "@/db/client";
import {
  account,
  betaInvites,
  session as authSession,
  user,
  userRoles,
} from "@/db/schema";
import {
  createBetaInvite,
  deactivateBetaAccess,
  registerWithInviteToken,
} from "@/modules/beta";
import {
  getDailyAggregateCount,
  trackAnalyticsEvent,
} from "@/modules/analytics/service";
import { resolveBetaAccessActive } from "@/modules/auth/beta-access";

const hasDb = Boolean(process.env.DATABASE_URL);

describe.skipIf(!hasDb)("M4 acceptance fixes (postgres)", () => {
  let adminId = "";

  beforeAll(async () => {
    const db = getDb();
    adminId = randomUUID();
    const now = new Date();
    await db.insert(user).values({
      id: adminId,
      name: "IT Admin Acc",
      email: `it.admin.acc.${adminId}@slowarium.test`,
      emailVerified: true,
      roleFlags: ["admin"],
      createdAt: now,
      updatedAt: now,
    });
  });

  afterAll(async () => {
    try {
      await getSql().end({ timeout: 5 });
    } catch {
      /* ignore */
    }
  });

  it("analytics: 1 event → count 1; 5 sequential → count 5", async () => {
    const dim = { suite: `agg-seq-${randomUUID().slice(0, 8)}` };
    await trackAnalyticsEvent({
      eventKey: "first_lesson_started",
      dimensions: dim,
    });
    let row = await getDailyAggregateCount({
      metricKey: "first_lesson_started",
      dimensions: dim,
    });
    expect(row?.valueCount).toBe(1);
    expect(row?.valueNum).toBe(1);

    for (let i = 0; i < 4; i += 1) {
      await trackAnalyticsEvent({
        eventKey: "first_lesson_started",
        dimensions: dim,
      });
    }
    row = await getDailyAggregateCount({
      metricKey: "first_lesson_started",
      dimensions: dim,
    });
    expect(row?.valueCount).toBe(5);
    expect(row?.valueNum).toBe(5);
  });

  it("analytics: parallel events reach exact total", async () => {
    const dim = { suite: `agg-par-${randomUUID().slice(0, 8)}` };
    const n = 12;
    await Promise.all(
      Array.from({ length: n }, () =>
        trackAnalyticsEvent({
          eventKey: "first_exercise_submitted",
          dimensions: dim,
        }),
      ),
    );
    const row = await getDailyAggregateCount({
      metricKey: "first_exercise_submitted",
      dimensions: dim,
    });
    expect(row?.valueCount).toBe(n);
    expect(row?.valueNum).toBe(n);
  });

  it("analytics: different dimensions → different buckets", async () => {
    const a = { suite: `agg-a-${randomUUID().slice(0, 8)}` };
    const b = { suite: `agg-b-${randomUUID().slice(0, 8)}` };
    await trackAnalyticsEvent({
      eventKey: "les_completion",
      dimensions: a,
    });
    await trackAnalyticsEvent({
      eventKey: "les_completion",
      dimensions: b,
    });
    await trackAnalyticsEvent({
      eventKey: "les_completion",
      dimensions: b,
    });
    expect(
      (await getDailyAggregateCount({ metricKey: "les_completion", dimensions: a }))
        ?.valueCount,
    ).toBe(1);
    expect(
      (await getDailyAggregateCount({ metricKey: "les_completion", dimensions: b }))
        ?.valueCount,
    ).toBe(2);
  });

  it("analytics failure does not throw to caller (best-effort)", async () => {
    await expect(
      trackAnalyticsEvent({
        eventKey: "first_lesson_started",
        dimensions: { suite: "ok" },
      }),
    ).resolves.toBeUndefined();
  });

  it("invite use_limit is constrained to 1", async () => {
    const created = await createBetaInvite({
      actorUserId: adminId,
      expiresAt: new Date(Date.now() + 86_400_000),
      label: "limit-one",
    });
    const row = await getDb().query.betaInvites.findFirst({
      where: eq(betaInvites.id, created.inviteId),
    });
    expect(row?.useLimit).toBe(1);

    await expect(
      getDb().execute(
        sql`UPDATE beta_invites SET use_limit = 3 WHERE id = ${created.inviteId}::uuid`,
      ),
    ).rejects.toThrow();
  });

  it("parallel registerWithInviteToken: exactly one winner, no orphans", async () => {
    const created = await createBetaInvite({
      actorUserId: adminId,
      expiresAt: new Date(Date.now() + 86_400_000),
      label: "race",
    });
    const passwordHash = await hashPassword("RacePass123!");
    const emailA = `race.a.${randomUUID().slice(0, 8)}@slowarium.test`;
    const emailB = `race.b.${randomUUID().slice(0, 8)}@slowarium.test`;

    const [r1, r2] = await Promise.all([
      registerWithInviteToken({
        rawToken: created.rawToken,
        email: emailA,
        passwordHash,
        name: "Race A",
      }),
      registerWithInviteToken({
        rawToken: created.rawToken,
        email: emailB,
        passwordHash,
        name: "Race B",
      }),
    ]);

    const oks = [r1, r2].filter((r) => r.ok);
    const fails = [r1, r2].filter((r) => !r.ok);
    expect(oks).toHaveLength(1);
    expect(fails).toHaveLength(1);
    expect(fails[0] && !fails[0].ok && fails[0].reason).toBe("used");

    const winner = oks[0];
    if (!winner || !winner.ok) throw new Error("expected winner");

    const invite = await getDb().query.betaInvites.findFirst({
      where: eq(betaInvites.id, created.inviteId),
    });
    expect(invite?.status).toBe("accepted");
    expect(invite?.createdUserId).toBe(winner.userId);
    expect(invite?.useCount).toBe(1);

    const uA = await getDb().query.user.findFirst({ where: eq(user.email, emailA) });
    const uB = await getDb().query.user.findFirst({ where: eq(user.email, emailB) });
    const present = [uA, uB].filter(Boolean);
    expect(present).toHaveLength(1);
    expect(present[0]!.id).toBe(winner.userId);

    const accounts = await getDb().query.account.findMany({
      where: eq(account.userId, winner.userId),
    });
    expect(accounts).toHaveLength(1);
    expect(accounts[0]!.providerId).toBe("credential");

    const roles = await getDb().query.userRoles.findMany({
      where: eq(userRoles.userId, winner.userId),
    });
    expect(roles.map((r) => r.role).sort()).toEqual(["learner", "previewer"]);

    // Loser email must not have account
    const loserEmail = emailA === present[0]!.email ? emailB : emailA;
    const loserUser = await getDb().query.user.findFirst({
      where: eq(user.email, loserEmail),
    });
    expect(loserUser).toBeUndefined();
  });

  it("deactivate sets flag, revokes sessions, resolveBetaAccessActive false", async () => {
    const learnerId = randomUUID();
    const now = new Date();
    await getDb().insert(user).values({
      id: learnerId,
      name: "Deact Learner",
      email: `deact.${learnerId}@slowarium.test`,
      emailVerified: true,
      roleFlags: ["learner", "previewer"],
      createdAt: now,
      updatedAt: now,
    });
    await getDb().insert(authSession).values({
      id: randomUUID(),
      token: `tok-${learnerId}`,
      userId: learnerId,
      expiresAt: new Date(Date.now() + 86_400_000),
      createdAt: now,
      updatedAt: now,
    });

    await deactivateBetaAccess({
      actorUserId: adminId,
      userId: learnerId,
      reason: "it_deactivate",
    });

    const dbUser = await getDb().query.user.findFirst({
      where: eq(user.id, learnerId),
    });
    expect(dbUser?.betaAccessRevokedAt).toBeTruthy();

    const sessions = await getDb().query.session.findMany({
      where: eq(authSession.userId, learnerId),
    });
    expect(sessions).toHaveLength(0);

    expect(
      resolveBetaAccessActive({
        roles: ["learner", "previewer"],
        email: dbUser!.email,
        betaAccessRevokedAt: dbUser!.betaAccessRevokedAt,
      }),
    ).toBe(false);

    // Demo/admin not gated
    expect(
      resolveBetaAccessActive({
        roles: ["admin"],
        email: "admin@demo.slowarium.local",
        betaAccessRevokedAt: new Date(),
      }),
    ).toBe(true);
  });
});
