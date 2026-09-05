import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { ModuleCard } from "@/components/learning/module-card";
import { listPreviewModules } from "@/lib/content/load-module";
import { isDemoPreviewEnabled } from "@/lib/demo";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("dashboard");
  const modules = listPreviewModules();
  const preview = isDemoPreviewEnabled();

  return (
    <>
      <SiteHeader signedIn />
      {preview ? <PreviewBanner /> : null}
      <main id="main-content" className="page-shell" data-testid="dashboard-page">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("title")}
        </h1>
        <p className="mt-1 text-lg text-[var(--color-graphite)]">{t("welcome")}</p>
        <p className="mt-2 max-w-xl text-[var(--color-graphite)]">{t("lead")}</p>

        <section className="mt-10" aria-labelledby="modules-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="modules-heading"
              className="font-display text-2xl text-[var(--color-ink)]"
            >
              {t("modulesHeading")}
            </h2>
            <Link
              href="/learn/a1"
              className="text-sm font-medium text-[var(--color-amber-deep)]"
            >
              {t("openCatalog")}
            </Link>
          </div>
          {modules.length === 0 ? (
            <p className="mt-4 text-[var(--color-graphite)]">
              {t("emptyPublished")}
            </p>
          ) : (
            <ul className="mt-6 grid list-none gap-5 p-0 md:grid-cols-2">
              {modules.map((mod) => (
                <li key={mod.id}>
                  <ModuleCard module={mod} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
