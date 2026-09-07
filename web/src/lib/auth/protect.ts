import { redirect } from "next/navigation";
import {
  requireAuth,
  requireOnboarding,
} from "@/modules/auth/guards";
import { redirectIfBetaAccessRevoked } from "@/modules/auth/beta-access";
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
  redirectIfBetaAccessRevoked(locale, session);
  await requireOnboarding(locale, session);
  return session;
}

/** Authenticated only; completed onboarding → dashboard. */
export async function protectOnboarding(locale: string): Promise<AppSession> {
  const session = await requireAuth(locale, `/${locale}/onboarding`);
  redirectIfBetaAccessRevoked(locale, session);
  const profile = await getLearnerProfile(session.user.id);
  if (profile?.onboardingComplete) {
    redirect(`/${locale}/dashboard`);
  }
  return session;
}

/**
 * Login/register: signed-in users skip auth forms.
 * Complete onboarding → dashboard; otherwise → onboarding.
 * Deactivated invitees go to the explicit disabled state.
 */
export async function protectAuthPages(locale: string): Promise<void> {
  const session = await getRequestSession();
  if (!session) return;

  if (!session.betaAccessActive) {
    redirect(`/${locale}/beta-disabled`);
  }

  const profile = await getLearnerProfile(session.user.id);
  if (profile?.onboardingComplete) {
    redirect(`/${locale}/dashboard`);
  }
  redirect(`/${locale}/onboarding`);
}
