import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { rateLimitBuckets } from "@/db/schema";

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; remaining: 0; retryAfterMs: number };

/**
 * Postgres-backed shared rate limiter (works across multiple app instances).
 */
export async function consumeRateLimit(input: {
  bucketKey: string;
  limit: number;
  windowMs: number;
}): Promise<RateLimitResult> {
  const db = getDb();
  const now = new Date();
  const existing = await db.query.rateLimitBuckets.findFirst({
    where: eq(rateLimitBuckets.bucketKey, input.bucketKey),
  });

  if (
    !existing ||
    now.getTime() - existing.windowStartedAt.getTime() >= input.windowMs
  ) {
    await db
      .insert(rateLimitBuckets)
      .values({
        bucketKey: input.bucketKey,
        windowStartedAt: now,
        hitCount: 1,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: rateLimitBuckets.bucketKey,
        set: {
          windowStartedAt: now,
          hitCount: 1,
          updatedAt: now,
        },
      });
    return { allowed: true, remaining: Math.max(0, input.limit - 1) };
  }

  if (existing.hitCount >= input.limit) {
    const retryAfterMs =
      input.windowMs - (now.getTime() - existing.windowStartedAt.getTime());
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, retryAfterMs),
    };
  }

  await db
    .update(rateLimitBuckets)
    .set({
      hitCount: sql`${rateLimitBuckets.hitCount} + 1`,
      updatedAt: now,
    })
    .where(eq(rateLimitBuckets.bucketKey, input.bucketKey));

  return {
    allowed: true,
    remaining: Math.max(0, input.limit - existing.hitCount - 1),
  };
}

export function clientIpFromRequest(request: Request): string {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
