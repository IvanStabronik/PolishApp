import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { betaInvites, user, userRoles } from "@/db/schema";
import type { UserRole } from "@/lib/enums";
import { recordAdminEvent } from "@/modules/admin/audit";
import { inspectInvite, type InviteInspection } from "./invite-state";
import { generateInviteToken, hashInviteToken } from "./token";

export type CreateInviteInput = {
  actorUserId: string | null;
  expiresAt: Date;
  useLimit?: number;
  label?: string;
  correlationId?: string;
};

export type CreateInviteResult = {
  inviteId: string;
  /** Plaintext token — return once; never persist. */
  rawToken: string;
  expiresAt: Date;
};

export async function createBetaInvite(
  input: CreateInviteInput,
): Promise<CreateInviteResult> {
  const rawToken = generateInviteToken();
  const tokenHash = hashInviteToken(rawToken);
  const db = getDb();
  const [row] = await db
    .insert(betaInvites)
    .values({
      tokenHash,
      status: "pending",
      useLimit: input.useLimit ?? 1,
      useCount: 0,
      expiresAt: input.expiresAt,
      createdByUserId: input.actorUserId || null,
      label: input.label ?? null,
    })
    .returning({
      id: betaInvites.id,
      expiresAt: betaInvites.expiresAt,
    });

  await recordAdminEvent({
    actorUserId: input.actorUserId || null,
    action: "beta.invite_created",
    subjectType: "beta_invite",
    subjectId: row!.id,
    details: {
      expiresAt: input.expiresAt.toISOString(),
      useLimit: input.useLimit ?? 1,
      label: input.label ?? null,
      tokenHashPrefix: tokenHash.slice(0, 8),
    },
    correlationId: input.correlationId,
  });

  return {
    inviteId: row!.id,
    rawToken,
    expiresAt: row!.expiresAt,
  };
}

export async function revokeBetaInvite(input: {
  actorUserId: string;
  inviteId: string;
  correlationId?: string;
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  const db = getDb();
  const existing = await db.query.betaInvites.findFirst({
    where: eq(betaInvites.id, input.inviteId),
  });
  if (!existing) return { ok: false, reason: "not_found" };
  if (existing.status === "revoked" || existing.revokedAt) {
    return { ok: false, reason: "already_revoked" };
  }

  await db
    .update(betaInvites)
    .set({
      status: "revoked",
      revokedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(betaInvites.id, input.inviteId));

  await recordAdminEvent({
    actorUserId: input.actorUserId,
    action: "beta.invite_revoked",
    subjectType: "beta_invite",
    subjectId: input.inviteId,
    correlationId: input.correlationId,
  });

  return { ok: true };
}

export async function lookupInviteByRawToken(
  rawToken: string,
): Promise<{ invite: typeof betaInvites.$inferSelect; inspection: InviteInspection } | null> {
  const tokenHash = hashInviteToken(rawToken);
  const db = getDb();
  const invite = await db.query.betaInvites.findFirst({
    where: eq(betaInvites.tokenHash, tokenHash),
  });
  if (!invite) return null;
  const inspection = inspectInvite({
    status: invite.status,
    expiresAt: invite.expiresAt,
    revokedAt: invite.revokedAt,
    acceptedAt: invite.acceptedAt,
    useLimit: invite.useLimit,
    useCount: invite.useCount,
  });
  if (
    !inspection.ok &&
    inspection.reason === "expired" &&
    invite.status === "pending"
  ) {
    await db
      .update(betaInvites)
      .set({ status: "expired", updatedAt: new Date() })
      .where(and(eq(betaInvites.id, invite.id), eq(betaInvites.status, "pending")));
  }
  return { invite, inspection };
}

/**
 * Atomically consume a pending invite for a newly created user.
 * Race-safe: single UPDATE with status/use guards.
 */
export async function consumeInviteForUser(input: {
  rawToken: string;
  userId: string;
  correlationId?: string;
}): Promise<
  | { ok: true; inviteId: string }
  | { ok: false; reason: InviteInspection["ok"] extends false ? string : string }
> {
  const found = await lookupInviteByRawToken(input.rawToken);
  if (!found) return { ok: false, reason: "invalid" };
  if (!found.inspection.ok) {
    return { ok: false, reason: found.inspection.reason };
  }

  const db = getDb();
  const now = new Date();
  const updated = await db
    .update(betaInvites)
    .set({
      status: "accepted",
      acceptedAt: now,
      useCount: sql`${betaInvites.useCount} + 1`,
      createdUserId: input.userId,
      updatedAt: now,
    })
    .where(
      and(
        eq(betaInvites.id, found.invite.id),
        eq(betaInvites.status, "pending"),
        sql`${betaInvites.revokedAt} IS NULL`,
        sql`${betaInvites.acceptedAt} IS NULL`,
        sql`${betaInvites.expiresAt} > ${now}`,
        sql`${betaInvites.useCount} < ${betaInvites.useLimit}`,
      ),
    )
    .returning({ id: betaInvites.id });

  if (!updated.length) {
    return { ok: false, reason: "used" };
  }

  await ensureLearnerRole(input.userId);

  await recordAdminEvent({
    actorUserId: input.userId,
    action: "beta.invite_accepted",
    subjectType: "beta_invite",
    subjectId: found.invite.id,
    details: { createdUserId: input.userId },
    correlationId: input.correlationId,
  });

  return { ok: true, inviteId: found.invite.id };
}

async function ensureLearnerRole(userId: string): Promise<void> {
  const db = getDb();
  const existing = await db.query.user.findFirst({ where: eq(user.id, userId) });
  if (!existing) return;
  const roles = new Set<UserRole>([
    ...((existing.roleFlags as UserRole[] | null) ?? []),
    "learner",
  ]);
  await db
    .update(user)
    .set({ roleFlags: [...roles], updatedAt: new Date() })
    .where(eq(user.id, userId));
  const hasLearner = await db.query.userRoles.findFirst({
    where: and(eq(userRoles.userId, userId), eq(userRoles.role, "learner")),
  });
  if (!hasLearner) {
    await db.insert(userRoles).values({ userId, role: "learner" });
  }
}

export async function deactivateBetaAccess(input: {
  actorUserId: string;
  userId: string;
  reason?: string;
  correlationId?: string;
}): Promise<void> {
  const db = getDb();
  await db
    .update(user)
    .set({
      betaAccessRevokedAt: new Date(),
      betaDeactivatedReason: input.reason ?? "admin_deactivated",
      updatedAt: new Date(),
    })
    .where(eq(user.id, input.userId));

  await recordAdminEvent({
    actorUserId: input.actorUserId,
    action: "beta.access_deactivated",
    subjectType: "user",
    subjectId: input.userId,
    details: { reason: input.reason ?? "admin_deactivated" },
    correlationId: input.correlationId,
  });
}

export async function listBetaInvites() {
  const db = getDb();
  return db.query.betaInvites.findMany({
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });
}
