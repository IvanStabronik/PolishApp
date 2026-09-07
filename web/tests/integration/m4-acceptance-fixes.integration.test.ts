/**
 * M4 acceptance — analytics UPSERT, transactional registration race,
 * beta deactivation + session revoke.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { eq, and, sql } from "drizzle-orm";
import { getDb, getSql } from "@/db/client";
import {
  account,
  analyticsDailyAggregates,
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
  analyticsDimensionsKey,
  canonicalizeAnalyticsDimensions,
} from "@/modules/analytics/dimensions";
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

  it("upgrade-path: old MD5 backfill row merges; unique key holds", async () => {
    const dim = canonicalizeAnalyticsDimensions({
      suite: `agg-upgrade-${randomUUID().slice(0, 8)}`,
      z: true,
      a: "x",
    });
    const runtimeKey = analyticsDimensionsKey(dim);
    expect(runtimeKey).toMatch(/^[a-f0-9]{32}$/);

    const bucketDate = new Date().toISOString().slice(0, 10);
    const now = new Date();
    const db = getDb();

    // Old 0006-style key: md5(jsonb::text) — differs from runtime MD5(JSON.stringify).
    const oldKeyRows = await db.execute<{ k: string }>(
      sql`SELECT md5((${JSON.stringify(dim)}::jsonb)::text) AS k`,
    );
    const oldBackfillKey = Array.from(oldKeyRows)[0]?.k;
    expect(oldBackfillKey).toBeTruthy();
    expect(oldBackfillKey).not.toBe(runtimeKey);

    await db.insert(analyticsDailyAggregates).values({
      metricKey: "day1_readiness",
      bucketDate,
      dimensions: dim,
      dimensionsKey: oldBackfillKey!,
      valueNum: 7,
      valueCount: 7,
      updatedAt: now,
      createdAt: now,
    });

    // Re-apply 0007 reconciliation (idempotent with migration on fresh DBs).
    await db.execute(sql`
      WITH keyed AS (
        SELECT
          id,
          metric_key,
          bucket_date,
          md5(
            CASE
              WHEN dimensions IS NULL OR dimensions = '{}'::jsonb THEN '{}'
              ELSE (
                SELECT '{' || string_agg(
                  to_json(e.key)::text || ':' ||
                    CASE jsonb_typeof(e.value)
                      WHEN 'string' THEN e.value::text
                      WHEN 'number' THEN (e.value #>> '{}')
                      WHEN 'boolean' THEN (e.value #>> '{}')
                      WHEN 'null' THEN 'null'
                      ELSE e.value::text
                    END,
                  ','
                  ORDER BY e.key
                ) || '}'
                FROM jsonb_each(dimensions) AS e
              )
            END
          ) AS target_key,
          dimensions_key,
          value_num,
          value_count,
          updated_at
        FROM analytics_daily_aggregates
        WHERE metric_key = 'day1_readiness'
          AND bucket_date = ${bucketDate}::date
          AND dimensions_key = ${oldBackfillKey}
      ),
      ranked AS (
        SELECT
          id,
          target_key,
          value_num,
          value_count,
          ROW_NUMBER() OVER (
            PARTITION BY metric_key, bucket_date, target_key
            ORDER BY
              CASE WHEN dimensions_key = target_key THEN 0 ELSE 1 END,
              updated_at DESC,
              id
          ) AS rn,
          SUM(value_num) OVER (
            PARTITION BY metric_key, bucket_date, target_key
          ) AS sum_num,
          SUM(value_count) OVER (
            PARTITION BY metric_key, bucket_date, target_key
          ) AS sum_count
        FROM keyed
      ),
      deleted AS (
        DELETE FROM analytics_daily_aggregates AS a
        USING ranked AS r
        WHERE a.id = r.id
          AND r.rn > 1
        RETURNING a.id
      )
      UPDATE analytics_daily_aggregates AS a
      SET
        dimensions_key = r.target_key,
        value_num = r.sum_num,
        value_count = r.sum_count::integer,
        updated_at = now()
      FROM ranked AS r
      WHERE a.id = r.id
        AND r.rn = 1
    `);

    const rekeyed = await db
      .select()
      .from(analyticsDailyAggregates)
      .where(
        and(
          eq(analyticsDailyAggregates.metricKey, "day1_readiness"),
          eq(analyticsDailyAggregates.bucketDate, bucketDate),
          eq(analyticsDailyAggregates.dimensionsKey, runtimeKey),
        ),
      );
    expect(rekeyed).toHaveLength(1);
    expect(Number(rekeyed[0]?.valueCount)).toBe(7);

    await trackAnalyticsEvent({
      eventKey: "day1_readiness",
      dimensions: dim,
    });

    const afterOne = await db
      .select()
      .from(analyticsDailyAggregates)
      .where(
        and(
          eq(analyticsDailyAggregates.metricKey, "day1_readiness"),
          eq(analyticsDailyAggregates.bucketDate, bucketDate),
          eq(analyticsDailyAggregates.dimensionsKey, runtimeKey),
        ),
      );
    expect(afterOne).toHaveLength(1);
    expect(Number(afterOne[0]?.valueCount)).toBe(8);
    expect(Number(afterOne[0]?.valueNum)).toBe(8);

    const lookup = await getDailyAggregateCount({
      metricKey: "day1_readiness",
      dimensions: dim,
      bucketDate,
    });
    expect(lookup).toEqual({ valueNum: 8, valueCount: 8 });

    const parallel = 5;
    await Promise.all(
      Array.from({ length: parallel }, () =>
        trackAnalyticsEvent({
          eventKey: "day1_readiness",
          dimensions: dim,
        }),
      ),
    );

    const afterParallel = await db
      .select()
      .from(analyticsDailyAggregates)
      .where(
        and(
          eq(analyticsDailyAggregates.metricKey, "day1_readiness"),
          eq(analyticsDailyAggregates.bucketDate, bucketDate),
          eq(analyticsDailyAggregates.dimensionsKey, runtimeKey),
        ),
      );
    expect(afterParallel).toHaveLength(1);
    expect(Number(afterParallel[0]?.valueCount)).toBe(8 + parallel);
    expect(Number(afterParallel[0]?.valueNum)).toBe(8 + parallel);

    const uniqueIdxRows = await db.execute<{ indexname: string }>(
      sql`SELECT indexname FROM pg_indexes
          WHERE tablename = 'analytics_daily_aggregates'
            AND indexname = 'analytics_daily_metric_bucket_dims_key_uidx'`,
    );
    expect(Array.from(uniqueIdxRows)).toHaveLength(1);
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
