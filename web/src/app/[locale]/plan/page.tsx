import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
import { StatusPanel } from "@/components/brand/status-panel";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessDraftContent,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";
import { loadContinueLearning } from "@/modules/learning/continue-learning";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { ReportProblemButton } from "@/components/feedback/report-problem-button";
import {
  humanConceptLabel,
  resolveConceptLabelLocale,
} from "@/lib/content/concept-labels";

type Props = { params: Promise<{ locale: string }> };

export default async function DailyPlanPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/plan`);
  const t = await getTranslations("learn");
  const tc = await getTranslations("common");
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  };
  const scope = canAccessDraftContent(accessCtx) ? "preview" : "live";
  const snapshot = await loadContinueLearning(session.user.id, accessCtx, scope);
  const plan = snapshot.dailyPlan;
  const labelLocale = resolveConceptLabelLocale({
    uiLocale: locale,
    l1: snapshot.learnerL1,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="daily-plan-page"
      >
        <PageIntro
          title={t("dailyPlan")}
          lead={t(`planGoal.${plan.nextGoalKey}.${plan.hallKey}`)}
        />

        {plan.items.length === 0 ? (
          <StatusPanel className="mt-6 sm:mt-8" testId="plan-empty">
            {tc("planEmpty")}
          </StatusPanel>
        ) : (
          <ol className="mt-6 flex list-none flex-col gap-3 p-0 sm:mt-8">
            {plan.items.map((item, i) => {
              const href =
                "href" in item && typeof item.href === "string"
                  ? item.href
                  : null;
              const conceptId =
                item.kind === "weak_concept"
                  ? item.conceptCanonicalId
                  : item.kind === "error_review"
                    ? item.conceptCanonicalId
                    : null;
              const conceptLabel = conceptId
                ? humanConceptLabel(conceptId, labelLocale)
                : null;
              return (
                <li
                  key={`${item.kind}-${i}`}
                  className="surface-panel motion-fade-rise-delay flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  data-testid={`plan-item-${item.kind}`}
                  data-lesson-id={
                    item.kind === "unfinished_lesson" ? item.lessonId : undefined
                  }
                  style={{ animationDelay: `${0.04 * i}s` }}
                >
                  <div className="min-w-0">
                    <p className="m-0 font-medium text-[var(--color-ink)]">
                      {t(`planReason.${item.reasonKey}`)}
                    </p>
                    {conceptLabel ? (
                      <p
                        className="m-0 mt-1 text-sm text-[var(--color-ink-soft)]"
                        data-testid="plan-concept-label"
                      >
                        {conceptLabel}
                      </p>
                    ) : null}
                    <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                      {item.minutes} min
                    </p>
                  </div>
                  {href ? (
                    <LinkButton
                      href={href}
                      data-testid={`plan-cta-${item.kind}`}
                      className="w-full sm:w-auto"
                    >
                      {t("openItem")}
                    </LinkButton>
                  ) : null}
                </li>
              );
            })}
          </ol>
        )}

        <ReportProblemButton />
        <p className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex min-h-11 items-center text-[var(--color-amber-deep)] no-underline hover:underline"
          >
            {tc("backToDashboard")}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
