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
  const progressWidth = Math.max(0, Math.min(100, snapshot.overallPercent));

  return (
    <>
      <SiteHeader signedIn />
      {showPreview ? <PreviewBanner /> : null}
      <main id="main-content" className="page-shell" data-testid="dashboard-page">
        <header className="motion-fade-rise max-w-3xl">
          <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-amber-deep)]">
            SŁOWARIUM
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[var(--leading-tight)] text-[var(--color-ink)]">
            {t("title")}
          </h1>
          <p className="mt-2 text-lg text-[var(--color-ink-soft)]">
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
        </header>

        <section
          className="surface-panel motion-fade-rise-delay mt-8 p-5 sm:p-6"
          data-testid="continue-learning"
          aria-labelledby="continue-heading"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2
                id="continue-heading"
                className="m-0 font-display text-xl text-[var(--color-ink)] sm:text-2xl"
              >
                {t("continueLearning")}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-graphite)]">
                {t("overallProgress", { percent: snapshot.overallPercent })}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                {t("nextGoal")}:{" "}
                {tLearn(`planGoal.${snapshot.dailyPlan.nextGoalKey}`)}
              </p>
            </div>
            {snapshot.continueCta ? (
              <LinkButton href={snapshot.continueCta.href} data-testid="continue-cta">
                {t("continueLearning")}
              </LinkButton>
            ) : null}
          </div>

          <div
            className="lesson-shell__rail mt-5"
            role="progressbar"
            aria-valuenow={progressWidth}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t("overallProgress", { percent: snapshot.overallPercent })}
          >
            <div
              className="lesson-shell__rail-fill"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <ul className="mt-5 grid list-none gap-2 p-0 sm:grid-cols-2">
            {snapshot.perModule.map((m) => (
              <li
                key={m.moduleId}
                className="flex items-baseline justify-between gap-3 border-b border-[var(--color-line)] py-2 text-sm text-[var(--color-graphite)]"
                data-testid={`module-progress-${m.moduleId}`}
              >
                <span className="font-medium text-[var(--color-ink)]">{m.titlePl}</span>
                <span className="tabular-nums text-[var(--color-ink-soft)]">
                  {m.percent}%
                </span>
              </li>
            ))}
          </ul>

          <nav
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"
            aria-label={t("continueLearning")}
          >
            <Link
              href="/plan"
              className="font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
              data-testid="link-daily-plan"
            >
              {tLearn("dailyPlan")} →
            </Link>
            <Link
              href="/review"
              className="font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
              data-testid="link-review-queue"
            >
              {tLearn("reviewQueue")} →
            </Link>
            <Link
              href="/kronika"
              className="font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
              data-testid="link-kronika"
            >
              {tLearn("kronika")} →
            </Link>
          </nav>
        </section>

        <section className="mt-12" aria-labelledby="modules-heading">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="modules-heading"
              className="font-display text-2xl text-[var(--color-ink)]"
            >
              {t("modulesHeading")}
            </h2>
            <Link
              href="/learn/a1"
              className="text-sm font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
            >
              {t("openCatalog")}
            </Link>
          </div>
          {modules.length === 0 ? (
            <p className="mt-4 text-[var(--color-graphite)]">{t("emptyPublished")}</p>
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
