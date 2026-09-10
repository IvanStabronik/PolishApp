import { and, eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";
import type { UserRole } from "@/lib/enums";
import { getDb } from "./client";
import { account, user, userRoles } from "./schema";

/** Closed-beta staff: admin console + DRAFT previewer path. */
export const FIRST_ADMIN_ROLES = [
  "admin",
  "learner",
  "previewer",
] as const satisfies readonly UserRole[];

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 200;

export type BootstrapEnv = {
  DEMO_MODE?: string;
  ALLOW_PRODUCTION_DEMO?: string;
  DATABASE_URL?: string;
};

/**
 * Safety gate: first-admin bootstrap must never run under demo theater
 * and must never be used as a path that leaves production DEMO_MODE=true.
 */
export function assertFirstAdminBootstrapAllowed(
  env: BootstrapEnv = process.env,
): void {
  const demo = env.DEMO_MODE;
  if (demo === "true" || demo === "1") {
    throw new Error(
      "Refuse: DEMO_MODE is enabled. Use DEMO_MODE=false (unset DEMO_MODE). This script never sets DEMO_MODE=true and will not bootstrap under demo theater.",
    );
  }
  const allowProdDemo = env.ALLOW_PRODUCTION_DEMO;
  if (allowProdDemo === "true" || allowProdDemo === "1") {
    throw new Error(
      "Refuse: ALLOW_PRODUCTION_DEMO is set. First-admin bootstrap is for real closed beta (DEMO_MODE=false), not production demo.",
    );
  }
  if (!env.DATABASE_URL?.trim()) {
    throw new Error("Refuse: DATABASE_URL is not set.");
  }
}

export function assertBootstrapCredentials(input: {
  email: string;
  password: string;
  name?: string;
}): { email: string; password: string; name: string } {
  const email = input.email.trim().toLowerCase();
  const password = input.password;
  const name = (input.name ?? "Founder Admin").trim() || "Founder Admin";

  if (!email || !email.includes("@") || email.length > 254) {
    throw new Error("Refuse: email looks invalid.");
  }
  if (email.endsWith("@demo.slowarium.local")) {
    throw new Error(
      "Refuse: demo.slowarium.local emails are for DEMO_MODE seed only. Pass a real founder email.",
    );
  }
  if (password.length < MIN_PASSWORD_LEN) {
    throw new Error(`Refuse: password must be at least ${MIN_PASSWORD_LEN} characters.`);
  }
  if (password.length > MAX_PASSWORD_LEN) {
    throw new Error(`Refuse: password must be at most ${MAX_PASSWORD_LEN} characters.`);
  }
  return { email, password, name };
}

async function syncUserRoles(
  userId: string,
  roles: readonly UserRole[],
): Promise<void> {
  const db = getDb();
  for (const role of roles) {
    const existing = await db.query.userRoles.findFirst({
      where: and(eq(userRoles.userId, userId), eq(userRoles.role, role)),
    });
    if (!existing) {
      await db.insert(userRoles).values({ userId, role });
    }
  }
}

/**
 * Upsert one credential user with admin + learner + previewer roles.
 * Does not touch DEMO_MODE, does not seed demo accounts or content.
 */
export async function upsertFirstAdmin(input: {
  email: string;
  password: string;
  name?: string;
  env?: BootstrapEnv;
}): Promise<{ userId: string; created: boolean; email: string }> {
  assertFirstAdminBootstrapAllowed(input.env ?? process.env);
  const creds = assertBootstrapCredentials(input);
  const roles = [...FIRST_ADMIN_ROLES] as UserRole[];
  const db = getDb();

  const existing = await db.query.user.findFirst({
    where: eq(user.email, creds.email),
  });

  const passwordHash = await hashPassword(creds.password);

  if (existing) {
    await db
      .update(user)
      .set({
        name: creds.name,
        roleFlags: roles,
        emailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(user.id, existing.id));
    await syncUserRoles(existing.id, roles);

    const cred = await db.query.account.findFirst({
      where: and(
        eq(account.userId, existing.id),
        eq(account.providerId, "credential"),
      ),
    });
    if (cred) {
      await db
        .update(account)
        .set({ password: passwordHash, updatedAt: new Date() })
        .where(eq(account.id, cred.id));
    } else {
      const now = new Date();
      await db.insert(account).values({
        id: randomUUID(),
        accountId: existing.id,
        providerId: "credential",
        issuer: "local:credential",
        userId: existing.id,
        password: passwordHash,
        createdAt: now,
        updatedAt: now,
      });
    }
    return { userId: existing.id, created: false, email: creds.email };
  }

  const userId = randomUUID();
  const now = new Date();
  await db.insert(user).values({
    id: userId,
    name: creds.name,
    email: creds.email,
    emailVerified: true,
    roleFlags: roles,
    createdAt: now,
    updatedAt: now,
  });
  await db.insert(account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    issuer: "local:credential",
    userId,
    password: passwordHash,
    createdAt: now,
    updatedAt: now,
  });
  await syncUserRoles(userId, roles);
  return { userId, created: true, email: creds.email };
}
