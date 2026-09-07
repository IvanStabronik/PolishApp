import { and, eq, gt, isNull, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { getDb, type Db } from "@/db/client";
import {
  account,
  adminEvents,
  betaInvites,
  session as authSession,
  user,
  userRoles,
} from "@/db/schema";
import type { UserRole } from "@/lib/enums";
import {
  recordAdminEvent,
  redactAdminDetails,
} from "@/modules/admin/audit";
import { inspectInvite, type InviteInspection } from "./invite-state";
import { generateInviteToken, hashInviteToken } from "./token";

export type CreateInviteInput = {
  actorUserId: string | null;
  expiresAt: Date;
  /** Personal one-time invites only — must be 1 when provided. */
  useLimit?: 1;
  label?: string;
  correlationId?: string;
};

export type CreateInviteResult = {
  inviteId: string;
  /** Plaintext token — return once; never persist. */
  rawToken: string;
  expiresAt: Date;
};

type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

export async function createBetaInvite(
  input: CreateInviteInput,
): Promise<CreateInviteResult> {
  if (input.useLimit !== undefined && input.useLimit !== 1) {
    throw new Error("invite_use_limit_must_be_one");
  }
  const rawToken = generateInviteToken();
  const tokenHash = hashInviteToken(rawToken);
  const db = getDb();
  const [row] = await db
    .insert(betaInvites)
    .values({
      tokenHash,
      status: "pending",
      useLimit: 1,
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
      useLimit: 1,
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

/** Roles granted on invite consume — matches demo learner for DRAFT access. */
const CLOSED_BETA_INVITEE_ROLES = [
  "learner",
  "previewer",
] as const satisfies readonly UserRole[];

async function writeInviteAcceptedAudit(
  executor: Db | Tx,
  input: {
    userId: string;
    inviteId: string;
    correlationId?: string;
  },
): Promise<void> {
  await executor.insert(adminEvents).values({
    actorUserId: input.userId,
    action: "beta.invite_accepted",
    subjectType: "beta_invite",
    subjectId: input.inviteId,
    details: redactAdminDetails({ createdUserId: input.userId }),
    correlationId: input.correlationId ?? null,
  });
}

async function ensureClosedBetaLearnerRolesTx(
  tx: Tx,
  userId: string,
): Promise<void> {
  const existing = await tx.query.user.findFirst({ where: eq(user.id, userId) });
  if (!existing) {
    throw new Error("user_missing_in_txn");
  }
  const roles = new Set<UserRole>([
    ...((existing.roleFlags as UserRole[] | null) ?? []),
    ...CLOSED_BETA_INVITEE_ROLES,
  ]);
  await tx
    .update(user)
    .set({ roleFlags: [...roles], updatedAt: new Date() })
    .where(eq(user.id, userId));
  for (const role of CLOSED_BETA_INVITEE_ROLES) {
    const hasRole = await tx.query.userRoles.findFirst({
      where: and(eq(userRoles.userId, userId), eq(userRoles.role, role)),
    });
    if (!hasRole) {
      await tx.insert(userRoles).values({ userId, role });
    }
  }
}

/**
 * Atomically consume a pending invite for an existing user (row-locked).
 * Prefer registerWithInviteToken for new registrations — that wraps user+account+roles.
 */
export async function consumeInviteForUser(input: {
  rawToken: string;
  userId: string;
  correlationId?: string;
}): Promise<
  | { ok: true; inviteId: string }
  | { ok: false; reason: string }
> {
  const tokenHash = hashInviteToken(input.rawToken);
  const db = getDb();

  return db.transaction(async (tx) => {
    const locked = await tx
      .select()
      .from(betaInvites)
      .where(eq(betaInvites.tokenHash, tokenHash))
      .for("update");
    const invite = locked[0];
    if (!invite) return { ok: false as const, reason: "invalid" };

    const inspection = inspectInvite({
      status: invite.status,
      expiresAt: invite.expiresAt,
      revokedAt: invite.revokedAt,
      acceptedAt: invite.acceptedAt,
      useLimit: invite.useLimit,
      useCount: invite.useCount,
    });
    if (!inspection.ok) {
      return { ok: false as const, reason: inspection.reason };
    }

    const now = new Date();
    const updated = await tx
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
          eq(betaInvites.id, invite.id),
          eq(betaInvites.status, "pending"),
          isNull(betaInvites.revokedAt),
          isNull(betaInvites.acceptedAt),
          gt(betaInvites.expiresAt, now),
          sql`${betaInvites.useCount} < ${betaInvites.useLimit}`,
          eq(betaInvites.useLimit, 1),
        ),
      )
      .returning({ id: betaInvites.id });

    if (!updated.length) {
      return { ok: false as const, reason: "used" };
    }

    await ensureClosedBetaLearnerRolesTx(tx, input.userId);
    await writeInviteAcceptedAudit(tx, {
      userId: input.userId,
      inviteId: invite.id,
      correlationId: input.correlationId,
    });

    return { ok: true as const, inviteId: invite.id };
  });
}

export type RegisterWithInviteInput = {
  rawToken: string;
  email: string;
  passwordHash: string;
  name: string;
  correlationId?: string;
};

export type RegisterWithInviteResult =
  | { ok: true; userId: string; inviteId: string }
  | { ok: false; reason: string };

/**
 * Single PostgreSQL transaction: user + credential account + roles + invite
 * consume + required audit. Loser of a race leaves no orphan rows.
 * Callers must run analytics only after a successful commit.
 */
export async function registerWithInviteToken(
  input: RegisterWithInviteInput,
): Promise<RegisterWithInviteResult> {
  const tokenHash = hashInviteToken(input.rawToken);
  const email = input.email.toLowerCase();
  const db = getDb();

  try {
    return await db.transaction(async (tx) => {
      const locked = await tx
        .select()
        .from(betaInvites)
        .where(eq(betaInvites.tokenHash, tokenHash))
        .for("update");
      const invite = locked[0];
      if (!invite) return { ok: false as const, reason: "invalid" };

      const inspection = inspectInvite({
        status: invite.status,
        expiresAt: invite.expiresAt,
        revokedAt: invite.revokedAt,
        acceptedAt: invite.acceptedAt,
        useLimit: invite.useLimit,
        useCount: invite.useCount,
      });
      if (!inspection.ok) {
        return { ok: false as const, reason: inspection.reason };
      }

      const existing = await tx.query.user.findFirst({
        where: eq(user.email, email),
        columns: { id: true },
      });
      if (existing) {
        return { ok: false as const, reason: "email_taken" };
      }

      const userId = randomUUID();
      const now = new Date();

      await tx.insert(user).values({
        id: userId,
        name: input.name,
        email,
        emailVerified: false,
        roleFlags: [...CLOSED_BETA_INVITEE_ROLES],
        createdAt: now,
        updatedAt: now,
      });

      await tx.insert(account).values({
        id: randomUUID(),
        accountId: userId,
        providerId: "credential",
        issuer: "local:credential",
        userId,
        password: input.passwordHash,
        createdAt: now,
        updatedAt: now,
      });

      for (const role of CLOSED_BETA_INVITEE_ROLES) {
        await tx.insert(userRoles).values({ userId, role });
      }

      const updated = await tx
        .update(betaInvites)
        .set({
          status: "accepted",
          acceptedAt: now,
          useCount: sql`${betaInvites.useCount} + 1`,
          createdUserId: userId,
          updatedAt: now,
        })
        .where(
          and(
            eq(betaInvites.id, invite.id),
            eq(betaInvites.status, "pending"),
            isNull(betaInvites.revokedAt),
            isNull(betaInvites.acceptedAt),
            gt(betaInvites.expiresAt, now),
            sql`${betaInvites.useCount} < ${betaInvites.useLimit}`,
            eq(betaInvites.useLimit, 1),
          ),
        )
        .returning({ id: betaInvites.id });

      if (!updated.length) {
        // Abort entire transaction — no orphan user/account/roles.
        throw new Error("INVITE_RACE_LOST");
      }

      await writeInviteAcceptedAudit(tx, {
        userId,
        inviteId: invite.id,
        correlationId: input.correlationId,
      });

      return { ok: true as const, userId, inviteId: invite.id };
    });
  } catch (err) {
    if (err instanceof Error && err.message === "INVITE_RACE_LOST") {
      return { ok: false, reason: "used" };
    }
    // Unique email race under concurrency
    const msg = err instanceof Error ? err.message : String(err);
    if (/unique|duplicate|email/i.test(msg)) {
      return { ok: false, reason: "email_taken" };
    }
    throw err;
  }
}

export async function deactivateBetaAccess(input: {
  actorUserId: string;
  userId: string;
  reason?: string;
  correlationId?: string;
}): Promise<void> {
  const db = getDb();
  await db.transaction(async (tx) => {
    await tx
      .update(user)
      .set({
        betaAccessRevokedAt: new Date(),
        betaDeactivatedReason: input.reason ?? "admin_deactivated",
        updatedAt: new Date(),
      })
      .where(eq(user.id, input.userId));

    // Immediately invalidate all active Better Auth sessions for this user.
    await tx.delete(authSession).where(eq(authSession.userId, input.userId));

    await tx.insert(adminEvents).values({
      actorUserId: input.actorUserId,
      action: "beta.access_deactivated",
      subjectType: "user",
      subjectId: input.userId,
      details: redactAdminDetails({
        reason: input.reason ?? "admin_deactivated",
      }),
      correlationId: input.correlationId ?? null,
    });
  });
}

export async function listBetaInvites() {
  const db = getDb();
  return db.query.betaInvites.findMany({
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });
}
