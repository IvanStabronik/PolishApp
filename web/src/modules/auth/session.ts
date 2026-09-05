import { headers } from "next/headers";
import { auth } from "./auth";
import { isDemoAccountEmail } from "@/modules/learning/attempt-mode";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

export type AppSession = {
  user: SessionUser;
  isDemoUser: boolean;
};

/** Resolve Better Auth session from the current request headers. */
export async function getRequestSession(): Promise<AppSession | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) return null;
    const email = session.user.email ?? "";
    return {
      user: {
        id: session.user.id,
        email,
        name: session.user.name ?? "",
      },
      isDemoUser: isDemoAccountEmail(email),
    };
  } catch {
    return null;
  }
}
