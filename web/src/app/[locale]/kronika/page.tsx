import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
import { StatusPanel } from "@/components/brand/status-panel";
import { protectApp } from "@/lib/auth/protect";
import { loadProgressOverview } from "@/modules/learning/progress";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Kronika — archival timeline of attempts (light archival tone). */
export default async function KronikaPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/kronika`);
  const t = await getTranslations("learn");
  const tc = await getTranslations("common");
  const progress = await loadProgressOverview(session.user.id);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="kronika-page"
      >
        <PageIntro title={t("kronika")} lead={t("archiwum")} />

        {progress.recentAttempts.length === 0 ? (
          <StatusPanel className="mt-6 sm:mt-8" testId="kronika-empty">
            {tc("kronikaEmpty")}
          </StatusPanel>
        ) : (
          <ol className="surface-panel mt-6 list-none p-0 sm:mt-8">
            {progress.recentAttempts.map((a) => {
              const resultLabel =
                a.result === "correct"
                  ? t("kronikaCorrect")
                  : a.result === "incorrect"
                    ? t("kronikaIncorrect")
                    : t("kronikaUnknown");
              const title =
                a.lessonTitle && a.lessonTitle !== "attempt"
                  ? a.lessonTitle
                  : t("proba");
              return (
                <li
                  key={a.id}
                  className="border-b border-[var(--color-line)] px-4 py-3 last:border-b-0 sm:px-5"
                  data-testid="kronika-entry"
                  data-mode={a.mode}
                >
                  <p className="m-0 font-medium text-[var(--color-ink)]">
                    {t("kronikaEntry", {
                      title,
                      result: resultLabel,
                      date: a.at,
                    })}
                  </p>
                </li>
              );
            })}
          </ol>
        )}

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
