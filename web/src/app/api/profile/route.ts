import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/client";
import { learnerProfiles } from "@/db/schema";
import { LEARNER_L1, UI_LOCALES } from "@/lib/enums";
import { getRequestSession } from "@/modules/auth/session";
import {
  assertSameOrigin,
  getCorrelationId,
  publicErrorBody,
} from "@/modules/ops/runtime";

const patchSchema = z
  .object({
    uiLocale: z.enum(UI_LOCALES).optional(),
    l1: z.enum(LEARNER_L1).optional(),
    level: z.string().min(1).max(32).optional(),
    goal: z.string().min(1).max(128).optional(),
    weeklyGoal: z.coerce.number().int().positive().max(10_000).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "empty_patch",
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

export async function GET() {
  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, session.user.id),
    });
    return NextResponse.json({
      user: session.user,
      roles: session.roles,
      canPreviewDraft: session.canPreviewDraft,
      betaAccessActive: session.betaAccessActive,
      profile: profile ? serializeProfile(profile) : null,
    });
  } catch (err) {
    console.error("profile get failed", err);
    return NextResponse.json({ error: "profile_failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const correlationId = getCorrelationId(request);
  if (!assertSameOrigin(request)) {
    return NextResponse.json(publicErrorBody("origin_rejected", correlationId), {
      status: 403,
    });
  }

  const session = await getRequestSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

  try {
    const existing = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, session.user.id),
    });
    if (!existing) {
      return NextResponse.json({ error: "profile_not_found" }, { status: 404 });
    }

    const [updated] = await db
      .update(learnerProfiles)
      .set({
        ...(body.uiLocale !== undefined ? { uiLocale: body.uiLocale } : {}),
        ...(body.l1 !== undefined ? { l1: body.l1 } : {}),
        ...(body.level !== undefined ? { level: body.level } : {}),
        ...(body.goal !== undefined
          ? { goal: body.goal, goals: { primary: body.goal } }
          : {}),
        ...(body.weeklyGoal !== undefined
          ? { weeklyGoal: body.weeklyGoal, weeklyMinutes: body.weeklyGoal }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(learnerProfiles.id, existing.id))
      .returning();

    return NextResponse.json({ profile: serializeProfile(updated!) });
  } catch (err) {
    console.error("profile patch failed", err);
    return NextResponse.json({ error: "profile_failed" }, { status: 500 });
  }
}
