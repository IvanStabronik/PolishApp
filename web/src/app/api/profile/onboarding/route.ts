import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { learnerProfiles, type ConsentSnapshot } from "@/db/schema";
import { LEARNER_L1, UI_LOCALES } from "@/lib/enums";
import { getRequestSession } from "@/modules/auth/session";
import { assertBetaAccessActive } from "@/modules/auth/beta-access";
import {
  RATE_LIMIT_BUCKETS,
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
  structuredLog,
} from "@/modules/ops/runtime";
import { clientIpFromRequest, consumeRateLimit } from "@/modules/ops/rate-limit";

const onboardingSchema = z.object({
  uiLocale: z.enum(UI_LOCALES),
  l1: z.enum(LEARNER_L1),
  level: z.string().min(1).max(32),
  goal: z.string().min(1).max(128),
  weeklyGoal: z.coerce.number().int().positive().max(10_000),
  ageConfirmed18: z.literal(true),
  consents: z.object({
    terms: z.literal(true),
    privacy: z.literal(true),
    research: z.boolean().optional().default(false),
  }),
});

function serializeProfile(row: typeof learnerProfiles.$inferSelect) {
  return {
    id: row.id,
    userId: row.userId,
    uiLocale: row.uiLocale,
    l1: row.l1,
    level: row.level,
    goal: row.goal,
    weeklyGoal: row.weeklyGoal,
    weeklyMinutes: row.weeklyMinutes,
    onboardingComplete: row.onboardingComplete,
    timezone: row.timezone,
    ageConfirmed18: row.ageConfirmed18,
    consents: row.consents,
  };
}

export async function POST(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
      status: 403,
    });
  }

  const rl = await consumeRateLimit({
    bucketKey: `${RATE_LIMIT_BUCKETS.onboarding}:${clientIpFromRequest(request)}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!rl.allowed) {
    return NextResponse.json(publicErrorBody("rate_limited", correlationId), {
      status: 429,
    });
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json(publicErrorBody("unauthorized", correlationId), {
      status: 401,
    });
  }
  const denied = assertBetaAccessActive(session);
  if (denied) return denied;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(publicErrorBody("invalid_json", correlationId), {
      status: 400,
    });
  }

  const parsed = onboardingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", correlationId },
      { status: 400 },
    );
  }

  const body = parsed.data;
  const nowIso = new Date().toISOString();
  const consents: ConsentSnapshot = {
    ageConfirmed18: true,
    termsAcceptedAt: nowIso,
    privacyAcceptedAt: nowIso,
    ...(body.consents.research ? { researchAcceptedAt: nowIso } : {}),
  };

  const values = {
    uiLocale: body.uiLocale,
    l1: body.l1,
    level: body.level,
    goal: body.goal,
    weeklyGoal: body.weeklyGoal,
    weeklyMinutes: body.weeklyGoal,
    onboardingComplete: true as const,
    ageConfirmed18: true as const,
    consents,
    goals: { primary: body.goal },
    updatedAt: new Date(),
  };

  try {
    const existing = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, session.user.id),
    });

    let profile: typeof learnerProfiles.$inferSelect;
    if (existing) {
      const [updated] = await db
        .update(learnerProfiles)
        .set(values)
        .where(eq(learnerProfiles.id, existing.id))
        .returning();
      profile = updated!;
    } else {
      const [inserted] = await db
        .insert(learnerProfiles)
        .values({
          userId: session.user.id,
          ...values,
        })
        .returning();
      profile = inserted!;
    }

    return NextResponse.json({
      profile: serializeProfile(profile),
      correlationId,
    });
  } catch (err) {
    structuredLog("error", "onboarding_upsert_failed", {
      correlationId,
      error: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      publicErrorBody("onboarding_failed", correlationId),
      { status: 500 },
    );
  }
}
