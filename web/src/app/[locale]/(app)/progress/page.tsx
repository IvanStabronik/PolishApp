import { getTranslations, setRequestLocale } from "next-intl/server";
import { MasteryBadge } from "@/components/mastery-badge";
import { PageIntro } from "@/components/brand/page-intro";
import { StatusPanel } from "@/components/brand/status-panel";
import { getProgressOverview } from "@/modules/learning";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function ProgressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("progress");
  const overview = await getProgressOverview();
  const concepts = overview.concepts;
  const attempts = overview.recentAttempts;
  const empty = concepts.length === 0 && attempts.length === 0;

  return (
    <div className="flex flex-col gap-8" data-testid="progress-page">
      <PageIntro title={t("title")} lead={t("lead")}>
        <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
          {t("noCertificate")}
        </p>
      </PageIntro>

      {empty ? (
        <StatusPanel>
          <p className="m-0">
            {overview.signedIn ? t("emptySignedIn") : t("emptySignedOut")}
          </p>
          {!overview.signedIn ? (
            <p className="mt-3 text-sm">
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center text-[var(--color-amber-deep)] underline"
              >
                {t("signInCta")}
              </Link>
            </p>
          ) : null}
        </StatusPanel>
      ) : null}

      {concepts.length > 0 ? (
        <section className="surface-panel p-4 sm:p-6">
          <h2 className="font-display m-0 text-xl text-[var(--color-ink)]">
            {t("concepts")}
          </h2>
          <ul className="mt-4 flex list-none flex-col gap-0 p-0">
            {concepts.map((c) => (
              <li
                key={c.conceptId}
                className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] py-2.5 last:border-b-0"
              >
                <span className="text-[var(--color-ink)]">{c.label}</span>
                <MasteryBadge status={c.status} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {attempts.length > 0 ? (
        <section className="surface-panel p-4 sm:p-6">
          <h2 className="font-display m-0 text-xl text-[var(--color-ink)]">
            {t("recentAttempts")}
          </h2>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            {attempts.map((a) => (
              <li key={a.id} className="text-sm text-[var(--color-graphite)]">
                {a.lessonTitle} · {a.result} · {a.at}
                {a.mode === "preview" ? ` · ${t("previewMode")}` : ""}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
