import { redirect } from "next/navigation";
import {
  getLearnerProfile,
  getRequestSession,
  type AppSession,
} from "./session";
import { safeReturnTo } from "./safe-return-to";

export { safeReturnTo };
export { canPreviewDraft } from "./roles";

/** Redirect to login when there is no Better Auth session. */
export async function requireAuth(
  locale: string,
  returnTo?: string,
): Promise<AppSession> {
  const session = await getRequestSession();
  if (session) return session;

  const safe = safeReturnTo(returnTo);
  const query = safe ? `?returnTo=${encodeURIComponent(safe)}` : "";
  redirect(`/${locale}/login${query}`);
}

/**
 * When the user has a session but has not finished onboarding, send them there.
 * Call after requireAuth.
 */
export async function requireOnboarding(
  locale: string,
  session?: AppSession,
): Promise<AppSession> {
  const resolved = session ?? (await requireAuth(locale));
  const profile = await getLearnerProfile(resolved.user.id);
  if (!profile?.onboardingComplete) {
    redirect(`/${locale}/onboarding`);
  }
  return resolved;
}
