import { getDb } from "@/db/client";
import { adminEvents } from "@/db/schema";

const SENSITIVE_KEYS = new Set([
  "token",
  "rawToken",
  "password",
  "passwordHash",
  "sessionToken",
  "authorization",
  "cookie",
  "answer",
  "learnerAnswer",
  "privacyPayload",
]);

export function redactAdminDetails(
  details: Record<string, unknown> | undefined,
): Record<string, unknown> {
  if (!details) return {};
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(details)) {
    if (SENSITIVE_KEYS.has(key) || /token|password|secret|answer/i.test(key)) {
      out[key] = "[redacted]";
      continue;
    }
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = redactAdminDetails(value as Record<string, unknown>);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export async function recordAdminEvent(input: {
  actorUserId: string | null;
  action: string;
  subjectType?: string;
  subjectId?: string;
  details?: Record<string, unknown>;
  correlationId?: string | null;
}): Promise<void> {
  const db = getDb();
  await db.insert(adminEvents).values({
    actorUserId: input.actorUserId,
    action: input.action,
    subjectType: input.subjectType ?? null,
    subjectId: input.subjectId ?? null,
    details: redactAdminDetails(input.details),
    correlationId: input.correlationId ?? null,
  });
}
