import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
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
  const t = await getTranslations("adminBeta");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="admin-beta-page"
      >
        <PageIntro
          title={t("pageTitle")}
          lead={t("pageLead")}
          eyebrow={t("eyebrow")}
        />
        <div className="mt-6 sm:mt-8">
          <AdminBetaConsole />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
