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
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { loadContinueLearning } from "@/modules/learning/continue-learning";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { ReportProblemButton } from "@/components/feedback/report-problem-button";

type Props = { params: Promise<{ locale: string }> };

export default async function ReviewQueuePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/review`);
  const t = await getTranslations("learn");
  const tc = await getTranslations("common");
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const scope = canAccessDraftContent(accessCtx) ? "preview" : "live";
  const snapshot = await loadContinueLearning(session.user.id, accessCtx, scope);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="review-queue-page"
      >
        <PageIntro title={t("powtorka")} lead={t("reviewQueue")} />

        {snapshot.reviewQueue.items.length === 0 ? (
          <StatusPanel className="mt-6 sm:mt-8" testId="review-empty">
            {tc("reviewEmpty")}
          </StatusPanel>
        ) : (
          <ul className="mt-6 flex list-none flex-col gap-3 p-0 sm:mt-8">
            {snapshot.reviewQueue.items.map((item) => (
              <li
                key={item.conceptCanonicalId}
                className="surface-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                data-testid="review-item"
                data-concept-id={item.conceptCanonicalId}
                data-due-at={item.dueAt}
              >
                <div className="min-w-0">
                  <p className="m-0 font-medium text-[var(--color-ink)]">
                    {item.conceptCanonicalId}
                  </p>
                  <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                    {t(`reviewReason.${item.reasonKey}`)} · {item.dueAt}
                  </p>
                </div>
                {item.href ? (
                  <LinkButton
                    href={item.href}
                    data-testid="review-item-cta"
                    className="w-full sm:w-auto"
                  >
                    {t("openItem")}
                  </LinkButton>
                ) : null}
              </li>
            ))}
          </ul>
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
