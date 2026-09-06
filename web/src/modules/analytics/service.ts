import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { analyticsDailyAggregates, analyticsEvents } from "@/db/schema";
import {
  isKnownMetricKey,
  sanitizeAnalyticsDimensions,
  type AnalyticsMetricKey,
} from "./metrics";

async function bumpDailyAggregate(
  metricKey: AnalyticsMetricKey,
  dimensions?: Record<string, unknown>,
): Promise<void> {
  const db = getDb();
  const dims = sanitizeAnalyticsDimensions(dimensions);
  const bucketDate = new Date().toISOString().slice(0, 10);
  const now = new Date();
  try {
    await db.insert(analyticsDailyAggregates).values({
      metricKey,
      bucketDate,
      dimensions: dims,
      valueNum: 1,
      valueCount: 1,
      updatedAt: now,
      createdAt: now,
    });
  } catch {
    // Aggregates must never break product flows (incl. unique dim collisions).
  }
}

export async function trackAnalyticsEvent(input: {
  eventKey: string;
  userId?: string | null;
  dimensions?: Record<string, unknown>;
}): Promise<void> {
  try {
    const db = getDb();
    await db.insert(analyticsEvents).values({
      eventKey: input.eventKey,
      userId: input.userId ?? null,
      dimensions: sanitizeAnalyticsDimensions(input.dimensions),
    });

    if (isKnownMetricKey(input.eventKey)) {
      await bumpDailyAggregate(input.eventKey, input.dimensions);
    }
  } catch {
    // Telemetry is best-effort.
  }
}

export async function listAggregateMetrics(limit = 100) {
  const db = getDb();
  return db.query.analyticsDailyAggregates.findMany({
    orderBy: [desc(analyticsDailyAggregates.bucketDate)],
    limit,
  });
}

export async function adminAnalyticsSnapshot() {
  const db = getDb();
  const aggregates = await listAggregateMetrics(50);
  const recentEvents = await db
    .select({
      eventKey: analyticsEvents.eventKey,
      count: sql<number>`count(*)::int`,
    })
    .from(analyticsEvents)
    .groupBy(analyticsEvents.eventKey);

  return { aggregates, recentEvents };
}

export async function countEventsByKey(eventKey: string) {
  const db = getDb();
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvents)
    .where(eq(analyticsEvents.eventKey, eventKey));
  return rows[0]?.count ?? 0;
}
