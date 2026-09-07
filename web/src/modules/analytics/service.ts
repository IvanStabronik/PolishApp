import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { analyticsDailyAggregates, analyticsEvents } from "@/db/schema";
import { structuredLog } from "@/modules/ops/runtime";
import {
  analyticsDimensionsKey,
  canonicalizeAnalyticsDimensions,
} from "./dimensions";
import {
  isKnownMetricKey,
  type AnalyticsMetricKey,
} from "./metrics";

function redactAnalyticsError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  return raw
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, "[redacted-email]")
    .replace(/(password|token|secret|cookie|authorization)=[^\s&]+/gi, "$1=[redacted]")
    .slice(0, 400);
}

/**
 * Atomic daily aggregate bump via PostgreSQL UPSERT.
 * Concurrent events increment value_num / value_count; no empty catch on unique collisions.
 */
async function bumpDailyAggregate(
  metricKey: AnalyticsMetricKey,
  dimensions?: Record<string, unknown>,
): Promise<void> {
  const db = getDb();
  const dims = canonicalizeAnalyticsDimensions(dimensions);
  const dimensionsKey = analyticsDimensionsKey(dims);
  const bucketDate = new Date().toISOString().slice(0, 10);
  const now = new Date();

  await db
    .insert(analyticsDailyAggregates)
    .values({
      metricKey,
      bucketDate,
      dimensions: dims,
      dimensionsKey,
      valueNum: 1,
      valueCount: 1,
      updatedAt: now,
      createdAt: now,
    })
    .onConflictDoUpdate({
      target: [
        analyticsDailyAggregates.metricKey,
        analyticsDailyAggregates.bucketDate,
        analyticsDailyAggregates.dimensionsKey,
      ],
      set: {
        valueNum: sql`${analyticsDailyAggregates.valueNum} + 1`,
        valueCount: sql`${analyticsDailyAggregates.valueCount} + 1`,
        dimensions: dims,
        updatedAt: now,
      },
    });
}

export async function trackAnalyticsEvent(input: {
  eventKey: string;
  userId?: string | null;
  dimensions?: Record<string, unknown>;
}): Promise<void> {
  try {
    const db = getDb();
    const dims = canonicalizeAnalyticsDimensions(input.dimensions);
    await db.insert(analyticsEvents).values({
      eventKey: input.eventKey,
      userId: input.userId ?? null,
      dimensions: dims,
    });

    if (isKnownMetricKey(input.eventKey)) {
      await bumpDailyAggregate(input.eventKey, dims);
    }
  } catch (err) {
    // Telemetry is best-effort — never break product — but never swallow silently.
    structuredLog("warn", "analytics_track_failed", {
      eventKey: input.eventKey,
      error: redactAnalyticsError(err),
    });
  }
}

export async function getDailyAggregateCount(input: {
  metricKey: string;
  dimensions?: Record<string, unknown>;
  bucketDate?: string;
}): Promise<{ valueNum: number; valueCount: number } | null> {
  const db = getDb();
  const dimensionsKey = analyticsDimensionsKey(input.dimensions);
  const bucketDate = input.bucketDate ?? new Date().toISOString().slice(0, 10);
  const row = await db.query.analyticsDailyAggregates.findFirst({
    where: and(
      eq(analyticsDailyAggregates.metricKey, input.metricKey),
      eq(analyticsDailyAggregates.bucketDate, bucketDate),
      eq(analyticsDailyAggregates.dimensionsKey, dimensionsKey),
    ),
  });
  if (!row) return null;
  return { valueNum: Number(row.valueNum), valueCount: Number(row.valueCount) };
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
