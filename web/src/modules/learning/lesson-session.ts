/**
 * Lesson-session start/complete + aggregate attempt scores for result page.
 * Uses existing learning_sessions table; never claims mastery.
 */

import { and, desc, eq } from "drizzle-orm";
import { getDb, type Db } from "@/db/client";
import { attempts, learnerProfiles, learningSessions, modules } from "@/db/schema";
import { getOrCreateLearnerProfile } from "./persist-attempt";

export type LessonSessionSummary = {
  sessionId: string;
  lessonId: string;
  moduleId: string;
  correct: number;
  total: number;
  endedAt: string | null;
};

type SessionMeta = {
  kind?: string;
  lessonId?: string;
  moduleId?: string;
  correct?: number;
  total?: number;
};

async function resolveModuleUuid(
  db: Db,
  moduleId: string,
): Promise<string | null> {
  const bySlug = await db.query.modules.findFirst({
    where: eq(modules.slug, moduleId),
    columns: { id: true },
  });
  if (bySlug) return bySlug.id;
  const byCanonical = await db.query.modules.findFirst({
    where: eq(modules.canonicalId, moduleId),
    columns: { id: true },
  });
  return byCanonical?.id ?? null;
}

export async function startLessonSession(input: {
  userId: string;
  lessonId: string;
  moduleId: string;
}): Promise<{ sessionId: string }> {
  const db = getDb();
  const profile = await getOrCreateLearnerProfile(db, input.userId);
  const moduleUuid = await resolveModuleUuid(db, input.moduleId);

  const [row] = await db
    .insert(learningSessions)
    .values({
      learnerProfileId: profile.id,
      moduleId: moduleUuid,
      metadata: {
        kind: "lesson",
        lessonId: input.lessonId,
        moduleId: input.moduleId,
      } satisfies SessionMeta,
    })
    .returning({ id: learningSessions.id });

  return { sessionId: row!.id };
}

async function aggregateAttempts(
  db: Db,
  learnerProfileId: string,
  opts: {
    sessionId?: string | null;
    lessonId: string;
    since?: Date | null;
  },
): Promise<{ correct: number; total: number }> {
  const rows = await db
    .select({
      correct: attempts.correct,
      response: attempts.response,
      learningSessionId: attempts.learningSessionId,
      createdAt: attempts.createdAt,
    })
    .from(attempts)
    .where(eq(attempts.learnerProfileId, learnerProfileId))
    .orderBy(desc(attempts.createdAt))
    .limit(200);

  let correct = 0;
  let total = 0;
  for (const row of rows) {
    if (opts.sessionId && row.learningSessionId === opts.sessionId) {
      total += 1;
      if (row.correct === true) correct += 1;
      continue;
    }
    if (opts.sessionId) continue;
    const response = row.response as Record<string, unknown> | null;
    const lessonId =
      response && typeof response.lessonId === "string"
        ? response.lessonId
        : null;
    if (lessonId !== opts.lessonId) continue;
    if (opts.since && row.createdAt < opts.since) continue;
    total += 1;
    if (row.correct === true) correct += 1;
  }
  return { correct, total };
}

export async function completeLessonSession(input: {
  userId: string;
  sessionId?: string | null;
  lessonId: string;
  moduleId: string;
}): Promise<LessonSessionSummary> {
  const db = getDb();
  const profile = await getOrCreateLearnerProfile(db, input.userId);

  let sessionId = input.sessionId ?? null;
  let startedAt: Date | null = null;

  if (sessionId) {
    const existing = await db.query.learningSessions.findFirst({
      where: and(
        eq(learningSessions.id, sessionId),
        eq(learningSessions.learnerProfileId, profile.id),
      ),
    });
    if (existing) {
      startedAt = existing.startedAt;
    } else {
      sessionId = null;
    }
  }

  if (!sessionId) {
    const created = await startLessonSession({
      userId: input.userId,
      lessonId: input.lessonId,
      moduleId: input.moduleId,
    });
    sessionId = created.sessionId;
    startedAt = new Date();
  }

  const fromSession = await aggregateAttempts(db, profile.id, {
    sessionId,
    lessonId: input.lessonId,
  });
  const scores =
    fromSession.total > 0
      ? fromSession
      : await aggregateAttempts(db, profile.id, {
          lessonId: input.lessonId,
          since: startedAt ?? new Date(Date.now() - 4 * 60 * 60 * 1000),
        });

  const endedAt = new Date();
  await db
    .update(learningSessions)
    .set({
      endedAt,
      metadata: {
        kind: "lesson",
        lessonId: input.lessonId,
        moduleId: input.moduleId,
        correct: scores.correct,
        total: scores.total,
      } satisfies SessionMeta,
    })
    .where(eq(learningSessions.id, sessionId));

  return {
    sessionId,
    lessonId: input.lessonId,
    moduleId: input.moduleId,
    correct: scores.correct,
    total: scores.total,
    endedAt: endedAt.toISOString(),
  };
}

export async function loadLessonSessionSummary(input: {
  userId: string;
  sessionId: string;
}): Promise<LessonSessionSummary | null> {
  const db = getDb();
  const profile = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, input.userId),
    columns: { id: true },
  });
  if (!profile) return null;

  const row = await db.query.learningSessions.findFirst({
    where: and(
      eq(learningSessions.id, input.sessionId),
      eq(learningSessions.learnerProfileId, profile.id),
    ),
  });
  if (!row) return null;

  const meta = (row.metadata ?? {}) as SessionMeta;
  const lessonId = typeof meta.lessonId === "string" ? meta.lessonId : "";
  const moduleId = typeof meta.moduleId === "string" ? meta.moduleId : "";

  let correct = typeof meta.correct === "number" ? meta.correct : 0;
  let total = typeof meta.total === "number" ? meta.total : 0;

  if (total === 0 && lessonId) {
    const agg = await aggregateAttempts(db, profile.id, {
      sessionId: row.id,
      lessonId,
    });
    correct = agg.correct;
    total = agg.total;
  }

  return {
    sessionId: row.id,
    lessonId,
    moduleId,
    correct,
    total,
    endedAt: row.endedAt?.toISOString() ?? null,
  };
}

/** Latest completed lesson session for a lesson (fallback without session id). */
export async function loadLatestLessonSessionSummary(input: {
  userId: string;
  lessonId: string;
}): Promise<LessonSessionSummary | null> {
  const db = getDb();
  const profile = await db.query.learnerProfiles.findFirst({
    where: eq(learnerProfiles.userId, input.userId),
    columns: { id: true },
  });
  if (!profile) return null;

  const rows = await db
    .select()
    .from(learningSessions)
    .where(eq(learningSessions.learnerProfileId, profile.id))
    .orderBy(desc(learningSessions.startedAt))
    .limit(20);

  for (const row of rows) {
    const meta = (row.metadata ?? {}) as SessionMeta;
    if (meta.kind === "lesson" && meta.lessonId === input.lessonId) {
      return loadLessonSessionSummary({
        userId: input.userId,
        sessionId: row.id,
      });
    }
  }
  return null;
}
