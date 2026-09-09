import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { AuthShell } from "@/components/brand/auth-shell";
import { AuthFormSuspense } from "@/components/brand/auth-form-suspense";
import { Link } from "@/i18n/navigation";
import { protectAuthPages } from "@/lib/auth/protect";

type Props = { params: Promise<{ locale: string }> };

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  await protectAuthPages(locale);
  const t = await getTranslations("auth");
  const th = await getTranslations("accountHelp");

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <AuthShell>
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-amber-deep)]">
            Closed beta
          </p>
          <h1 className="mt-3 font-display text-3xl text-[var(--color-ink)] sm:text-[length:var(--text-3xl)]">
            {t("signInTitle")}
          </h1>
          <p className="mt-2 max-w-md text-[var(--color-graphite)]">{t("signInLead")}</p>
          <div className="mt-8">
            <AuthFormSuspense mode="login" />
          </div>
          <p className="mt-6">
            <Link
              href="/account-help"
              className="inline-flex min-h-11 items-center text-sm text-[var(--color-amber-deep)] no-underline hover:underline"
              data-testid="login-account-help"
            >
              {th("title")}
            </Link>
          </p>
        </AuthShell>
      </main>
    </>
  );
}
