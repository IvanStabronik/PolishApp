import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { AuthShell } from "@/components/brand/auth-shell";
import { AuthFormSuspense } from "@/components/brand/auth-form-suspense";
import { protectAuthPages } from "@/lib/auth/protect";
import { isBetaModeEnabled } from "@/modules/admin/roles";

type Props = { params: Promise<{ locale: string }> };

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  await protectAuthPages(locale);
  const t = await getTranslations("auth");
  const tb = await getTranslations("beta");
  const inviteOnly = isBetaModeEnabled();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <AuthShell>
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-amber-deep)]">
            Closed beta
          </p>
          <h1 className="mt-3 font-display text-3xl text-[var(--color-ink)]">
            {t("registerTitle")}
          </h1>
          <p className="mt-2 max-w-md text-[var(--color-graphite)]">
            {t("registerLead")}
          </p>
          <div className="mt-8">
            {inviteOnly ? (
              <p
                role="alert"
                data-testid="register-invite-required"
                className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-4 shadow-[var(--shadow-xs)]"
              >
                {tb("registerBlocked")}
              </p>
            ) : (
              <AuthFormSuspense mode="register" />
            )}
          </div>
        </AuthShell>
      </main>
    </>
  );
}
