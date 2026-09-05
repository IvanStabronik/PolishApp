import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { AuthForm } from "@/components/brand/auth-form";

type Props = { params: Promise<{ locale: string }> };

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-shell">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("signInTitle")}
        </h1>
        <p className="mt-2 max-w-xl text-[var(--color-graphite)]">
          {t("signInLead")}
        </p>
        <div className="mt-8">
          <AuthForm mode="login" />
        </div>
      </main>
    </>
  );
}
