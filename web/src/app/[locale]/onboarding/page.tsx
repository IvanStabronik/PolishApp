import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
import { OnboardingForm } from "@/components/brand/onboarding-form";
import { protectOnboarding } from "@/lib/auth/protect";

type Props = { params: Promise<{ locale: string }> };

export default async function OnboardingPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  await protectOnboarding(locale);
  const t = await getTranslations("onboarding");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main id="main-content" className="page-shell flex-1 pb-10 sm:pb-14">
        <PageIntro title={t("title")} lead={t("lead")} />
        <div className="surface-panel motion-fade-rise-delay mt-6 max-w-xl p-4 sm:mt-8 sm:p-6">
          <OnboardingForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
