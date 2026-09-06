import { redirect } from "next/navigation";
import {
  requireAuth,
  requireOnboarding,
} from "@/modules/auth/guards";
import {
  getLearnerProfile,
  getRequestSession,
  type AppSession,
} from "@/modules/auth/session";

/** Authenticated + onboarding complete (dashboard, learn, settings, …). */
export async function protectApp(
  locale: string,
  returnTo?: string,
): Promise<AppSession> {
  const session = await requireAuth(locale, returnTo);
  await requireOnboarding(locale, session);
  return session;
}

/** Authenticated only; completed onboarding → dashboard. */
export async function protectOnboarding(locale: string): Promise<AppSession> {
  const session = await requireAuth(locale, `/${locale}/onboarding`);
  const profile = await getLearnerProfile(session.user.id);
  if (profile?.onboardingComplete) {
    redirect(`/${locale}/dashboard`);
  }
  return session;
}

/**
 * Login/register: signed-in users skip auth forms.
 * Complete onboarding → dashboard; otherwise → onboarding.
 */
export async function protectAuthPages(locale: string): Promise<void> {
  const session = await getRequestSession();
  if (!session) return;

  const profile = await getLearnerProfile(session.user.id);
  if (profile?.onboardingComplete) {
    redirect(`/${locale}/dashboard`);
  }
  redirect(`/${locale}/onboarding`);
}
