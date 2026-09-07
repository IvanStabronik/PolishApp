import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { protectApp } from "@/lib/auth/protect";
import { canAccessAdminArea } from "@/modules/admin/roles";
import { AdminBetaConsole } from "@/components/admin/admin-beta-console";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminBetaPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/admin/beta`);
  if (!canAccessAdminArea(session.roles)) {
    notFound();
  }

  return (
    <>
      <SiteHeader signedIn />
      <main id="main-content" className="page-shell pb-10 sm:pb-14" data-testid="admin-beta-page">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-amber-deep)]">
          Ops · Closed beta
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
          Closed beta control center
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--color-graphite)] sm:text-base">
          Invite inventory, learner activity, feedback inbox, and aggregate
          analytics. Raw invite tokens are shown only at creation. Public content
          release remains blocked pending independent JPJO review.
        </p>
        <div className="mt-6 sm:mt-8">
          <AdminBetaConsole />
        </div>
      </main>
    </>
  );
}
