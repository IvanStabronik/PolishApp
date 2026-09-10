import { and, eq, ne } from "drizzle-orm";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import { getDb } from "@/db/client";
import { account, session } from "@/db/schema";

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 200;

export type ChangePasswordResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "no_credential"
        | "invalid_current"
        | "too_short"
        | "too_long"
        | "same_password";
    };

/**
 * Logged-in learner changes their own credential password.
 * Verifies current password; keeps the active session; drops other sessions.
 */
export async function changeOwnPassword(input: {
  userId: string;
  currentPassword: string;
  newPassword: string;
  currentSessionToken?: string | null;
}): Promise<ChangePasswordResult> {
  if (input.newPassword.length < MIN_PASSWORD_LEN) {
    return { ok: false, reason: "too_short" };
  }
  if (input.newPassword.length > MAX_PASSWORD_LEN) {
    return { ok: false, reason: "too_long" };
  }
  if (input.newPassword === input.currentPassword) {
    return { ok: false, reason: "same_password" };
  }

  const db = getDb();
  const cred = await db.query.account.findFirst({
    where: and(
      eq(account.userId, input.userId),
      eq(account.providerId, "credential"),
    ),
  });
  if (!cred?.password) return { ok: false, reason: "no_credential" };

  const valid = await verifyPassword({
    hash: cred.password,
    password: input.currentPassword,
  });
  if (!valid) return { ok: false, reason: "invalid_current" };

  const passwordHash = await hashPassword(input.newPassword);
  await db
    .update(account)
    .set({ password: passwordHash, updatedAt: new Date() })
    .where(eq(account.id, cred.id));

  if (input.currentSessionToken) {
    await db
      .delete(session)
      .where(
        and(
          eq(session.userId, input.userId),
          ne(session.token, input.currentSessionToken),
        ),
      );
  }

  return { ok: true };
}
