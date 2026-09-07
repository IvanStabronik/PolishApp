import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";

export default async function MaintenancePage() {
  const t = await getTranslations("errors");
  const tm = await getTranslations("meta");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="maintenance-page"
      >
        <PageIntro title={t("maintenance")} lead={t("generic")}>
          <p className="mt-3 text-sm text-[var(--color-graphite-muted)]">
            {tm("brand")} · Postgres
          </p>
        </PageIntro>
        <div
          className="surface-panel motion-fade-rise-delay mt-6 max-w-lg p-4 sm:mt-8 sm:p-6"
          role="status"
        >
          <p className="m-0 text-[var(--color-graphite)]">{t("maintenance")}</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
