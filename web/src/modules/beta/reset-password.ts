import { randomBytes } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { getDb } from "@/db/client";
import { account, session, user } from "@/db/schema";
import { recordAdminEvent } from "@/modules/admin/audit";

/**
 * Admin-issued temporary password for closed-beta recovery (no email mailer).
 * Revokes all sessions so the next login must use the new password.
 */
export async function adminResetLearnerPassword(input: {
  actorUserId: string;
  userId: string;
  correlationId?: string;
}): Promise<
  | { ok: true; temporaryPassword: string }
  | { ok: false; reason: "not_found" | "no_credential" }
> {
  const db = getDb();
  const target = await db.query.user.findFirst({
    where: eq(user.id, input.userId),
  });
  if (!target) return { ok: false, reason: "not_found" };

  const cred = await db.query.account.findFirst({
    where: and(
      eq(account.userId, input.userId),
      eq(account.providerId, "credential"),
    ),
  });
  if (!cred) return { ok: false, reason: "no_credential" };

  const temporaryPassword = `Tmp-${randomBytes(9).toString("base64url")}!9`;
  const passwordHash = await hashPassword(temporaryPassword);

  await db
    .update(account)
    .set({ password: passwordHash, updatedAt: new Date() })
    .where(eq(account.id, cred.id));

  await db.delete(session).where(eq(session.userId, input.userId));

  await recordAdminEvent({
    actorUserId: input.actorUserId,
    action: "beta.password_reset",
    subjectType: "user",
    subjectId: input.userId,
    details: { revokedSessions: true },
    correlationId: input.correlationId,
  });

  return { ok: true, temporaryPassword };
}
