import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { ModuleCard } from "@/components/learning/module-card";
import { listPreviewModules } from "@/lib/content/load-module";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { protectApp } from "@/lib/auth/protect";
import { loadContinueLearning } from "@/modules/learning/continue-learning";

type Props = { params: Promise<{ locale: string }> };

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const session = await protectApp(locale, `/${locale}/dashboard`);
  const t = await getTranslations("dashboard");
  const tLearn = await getTranslations("learn");

  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const showPreview = canAccessDraftContent(accessCtx);
  const modules = listPreviewModules(accessCtx);
  const scope = showPreview ? "preview" : "live";
  const snapshot = await loadContinueLearning(session.user.id, accessCtx, scope);

  const displayName = session.user.name || session.user.email;

  return (
    <>
      <SiteHeader signedIn />
      {showPreview ? <PreviewBanner /> : null}
      <main id="main-content" className="page-shell" data-testid="dashboard-page">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("title")}
        </h1>
        <p className="mt-1 text-lg text-[var(--color-graphite)]">
          {t("welcomeName", { name: displayName })}
        </p>
        <p className="mt-2 max-w-xl text-[var(--color-graphite)]">{t("lead")}</p>
        {showPreview ? (
          <p
            className="mt-3 max-w-xl text-sm text-[var(--color-amber-deep)]"
            data-testid="preview-status"
          >
            {t("previewStatus")}
          </p>
        ) : null}

        <section
          className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-5"
          data-testid="continue-learning"
          aria-labelledby="continue-heading"
        >
          <h2
            id="continue-heading"
            className="m-0 font-display text-xl text-[var(--color-ink)]"
          >
            {t("continueLearning")}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-graphite)]">
            {t("overallProgress", { percent: snapshot.overallPercent })}
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
            {t("nextGoal")}: {snapshot.nextGoal}
          </p>
          {snapshot.continueCta ? (
            <div className="mt-4">
              <LinkButton
                href={snapshot.continueCta.href}
                data-testid="continue-cta"
              >
                {t("continueLearning")}
              </LinkButton>
            </div>
          ) : null}
          <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2">
            {snapshot.perModule.map((m) => (
              <li
                key={m.moduleId}
                className="text-sm text-[var(--color-graphite)]"
                data-testid={`module-progress-${m.moduleId}`}
              >
                <span className="font-medium text-[var(--color-ink)]">
                  {m.titlePl}
                </span>
                {" — "}
                {m.percent}%
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/plan"
              className="font-medium text-[var(--color-forest)]"
              data-testid="link-daily-plan"
            >
              {tLearn("dailyPlan")} →
            </Link>
            <Link
              href="/review"
              className="font-medium text-[var(--color-forest)]"
              data-testid="link-review-queue"
            >
              {tLearn("reviewQueue")} →
            </Link>
            <Link
              href="/kronika"
              className="font-medium text-[var(--color-forest)]"
              data-testid="link-kronika"
            >
              {tLearn("kronika")} →
            </Link>
          </div>
        </section>

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
