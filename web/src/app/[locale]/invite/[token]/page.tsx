import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { BrandMark } from "@/components/brand/brand-mark";
import { InviteAcceptForm } from "@/components/beta/invite-accept-form";

type Props = {
  params: Promise<{ locale: string; token: string }>;
};

export default async function InviteAcceptPage({ params }: Props) {
  const { locale, token } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-shell" data-testid="invite-page">
        <div className="prose-narrow">
          <BrandMark />
          <h1 className="mt-6 font-display text-3xl text-[var(--color-ink)]">
            Accept beta invite
          </h1>
          <p className="mt-2 text-[var(--color-graphite)]">
            SŁOWARIUM closed beta is invite-only. Create your account with a valid
            one-time invite.
          </p>
          <div className="mt-8">
            <InviteAcceptForm token={token} />
          </div>
        </div>
      </main>
    </>
  );
}
