import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db/client";
import { learnerProfiles, user } from "@/db/schema";
import type { UserRole } from "@/lib/enums";
import { USER_ROLES } from "@/lib/enums";
import { isDemoAccountEmail } from "@/modules/learning/attempt-mode";
import { auth } from "./auth";
import { DEMO_ACCOUNTS } from "./demo";
import { canPreviewDraft } from "./roles";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export type AppSession = {
  user: SessionUser;
  roles: UserRole[];
  canPreviewDraft: boolean;
  isDemoUser: boolean;
};

export type LearnerProfileRow = typeof learnerProfiles.$inferSelect;

function normalizeRoles(raw: unknown): UserRole[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (role): role is UserRole =>
      typeof role === "string" &&
      (USER_ROLES as readonly string[]).includes(role),
  );
}

function seededDemoHasPreviewer(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  for (const account of Object.values(DEMO_ACCOUNTS)) {
    if (account.email.toLowerCase() === normalized) {
      return (account.roles as readonly UserRole[]).includes("previewer");
    }
  }
  return false;
}

export function resolveCanPreviewDraft(
  roles: UserRole[],
  email: string,
): boolean {
  if (canPreviewDraft(roles)) return true;
  return seededDemoHasPreviewer(email);
}

/** Resolve Better Auth session from the current request headers. */
export async function getRequestSession(): Promise<AppSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) return null;

    const email = session.user.email ?? "";
    const sessionRoles = normalizeRoles(
      (session.user as { roleFlags?: unknown }).roleFlags,
    );

    let roles = sessionRoles;
    try {
      const dbUser = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
        columns: { roleFlags: true },
      });
      if (dbUser?.roleFlags?.length) {
        roles = normalizeRoles(dbUser.roleFlags);
      }
    } catch {
      /* DB unavailable — fall back to session additionalFields */
    }

    return {
      user: {
        id: session.user.id,
        email,
        name: session.user.name ?? "",
      },
      roles,
      canPreviewDraft: resolveCanPreviewDraft(roles, email),
      isDemoUser: isDemoAccountEmail(email),
    };
  } catch {
    return null;
  }
}

/** Throws when no authenticated session is present. */
export async function requireSession(): Promise<AppSession> {
  const session = await getRequestSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function getLearnerProfile(
  userId: string,
): Promise<LearnerProfileRow | null> {
  try {
    const profile = await db.query.learnerProfiles.findFirst({
      where: eq(learnerProfiles.userId, userId),
    });
    return profile ?? null;
  } catch {
    return null;
  }
}
