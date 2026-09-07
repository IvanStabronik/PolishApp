import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { Link } from "@/i18n/navigation";
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
    <>
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell prose-narrow py-16"
        data-testid="beta-access-disabled"
        tabIndex={-1}
      >
        <h1 className="font-display m-0 text-3xl text-[var(--color-ink)]">
          {t("accessDisabledTitle")}
        </h1>
        <p className="mt-4 text-[var(--color-graphite)]">
          {t("accessDisabledLead")}
        </p>
        <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
          {session.user.email}
        </p>
        <p className="mt-6">
          <Link
            href="/login"
            className="text-[var(--color-amber-deep)] underline"
            data-testid="beta-disabled-sign-in"
          >
            {t("accessDisabledSignIn")}
          </Link>
        </p>
      </main>
    </>
  );
}
