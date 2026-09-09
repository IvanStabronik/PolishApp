import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { AuthShell } from "@/components/brand/auth-shell";
import { Link } from "@/i18n/navigation";
import { protectAuthPages } from "@/lib/auth/protect";

type Props = { params: Promise<{ locale: string }> };

export default async function AccountHelpPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  await protectAuthPages(locale);
  const t = await getTranslations("accountHelp");

  return (
    <>
      <SiteHeader />
      <main id="main-content" data-testid="account-help-page">
        <AuthShell>
          <h1 className="m-0 font-display text-3xl text-[var(--color-ink)]">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-md text-[var(--color-graphite)]">{t("lead")}</p>
          <p className="mt-8">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center text-[var(--color-amber-deep)] no-underline hover:underline"
            >
              {t("backToLogin")}
            </Link>
          </p>
        </AuthShell>
      </main>
    </>
  );
}
