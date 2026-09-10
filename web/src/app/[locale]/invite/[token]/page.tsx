import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { AuthShell } from "@/components/brand/auth-shell";
import { InviteAcceptForm } from "@/components/beta/invite-accept-form";

type Props = {
  params: Promise<{ locale: string; token: string }>;
};

export default async function InviteAcceptPage({ params }: Props) {
  const { locale, token } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("beta");

  return (
    <>
      <SiteHeader />
      <main id="main-content" data-testid="invite-page">
        <AuthShell>
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-amber-deep)]">
            {t("inviteEyebrow")}
          </p>
          <h1 className="mt-3 font-display text-3xl text-[var(--color-ink)]">
            {t("inviteTitle")}
          </h1>
          <p className="mt-2 max-w-md text-[var(--color-graphite)]">
            {t("inviteLead")}
          </p>
          <div className="mt-8">
            <InviteAcceptForm token={token} />
          </div>
        </AuthShell>
      </main>
    </>
  );
}
