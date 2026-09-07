import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { learnerProfiles, type ConsentSnapshot } from "@/db/schema";
import { LEARNER_L1, UI_LOCALES } from "@/lib/enums";
import { getRequestSession } from "@/modules/auth/session";
import { assertBetaAccessActive } from "@/modules/auth/beta-access";

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
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const denied = assertBetaAccessActive(session);
  if (denied) return denied;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = onboardingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
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

    return NextResponse.json({ profile: serializeProfile(profile) });
  } catch (err) {
    console.error("onboarding upsert failed", err);
    return NextResponse.json({ error: "onboarding_failed" }, { status: 500 });
  }
}
