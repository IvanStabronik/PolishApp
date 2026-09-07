import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
import { LinkButton } from "@/components/ui/link-button";
import { requireAuth } from "@/modules/auth/guards";

type Props = { params: Promise<{ locale: string }> };

/**
 * Explicit state for deactivated closed-beta invitees.
 * Auth required so re-login can land here; product surfaces stay blocked.
 */
export default async function BetaDisabledPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const session = await requireAuth(locale, `/${locale}/beta-disabled`);
  const t = await getTranslations("beta");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="beta-access-disabled"
        tabIndex={-1}
      >
        <PageIntro
          title={t("accessDisabledTitle")}
          lead={t("accessDisabledLead")}
        >
          <p className="mt-3 text-sm text-[var(--color-graphite-muted)]">
            {session.user.email}
          </p>
        </PageIntro>
        <div className="surface-panel motion-fade-rise-delay mt-6 max-w-lg p-4 sm:mt-8 sm:p-6">
          <LinkButton
            href="/login"
            data-testid="beta-disabled-sign-in"
            variant="secondary"
          >
            {t("accessDisabledSignIn")}
          </LinkButton>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
