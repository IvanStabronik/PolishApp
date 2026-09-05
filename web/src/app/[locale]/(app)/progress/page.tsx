import { getTranslations, setRequestLocale } from "next-intl/server";
import { MasteryBadge } from "@/components/mastery-badge";
import { Card } from "@/components/ui/card";
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
      <header>
        <h1 className="font-display m-0 text-3xl">{t("title")}</h1>
        <p className="mt-2 text-[var(--color-graphite)]">{t("lead")}</p>
        <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
          {t("noCertificate")}
        </p>
      </header>

      {empty ? (
        <Card>
          <p className="m-0 text-[var(--color-graphite)]">
            {overview.signedIn ? t("emptySignedIn") : t("emptySignedOut")}
          </p>
          {!overview.signedIn ? (
            <p className="mt-3 text-sm">
              <Link href="/login" className="text-[var(--color-burgundy)] underline">
                {t("signInCta")}
              </Link>
            </p>
          ) : null}
        </Card>
      ) : null}

      {concepts.length > 0 ? (
        <section>
          <h2 className="font-display m-0 text-xl">{t("concepts")}</h2>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {concepts.map((c) => (
              <li
                key={c.conceptId}
                className="flex items-center justify-between gap-3"
              >
                <span className="text-[var(--color-ink)]">{c.label}</span>
                <MasteryBadge status={c.status} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {attempts.length > 0 ? (
        <Card>
          <h2 className="font-display m-0 text-xl">{t("recentAttempts")}</h2>
          <ul className="mt-4 flex list-none flex-col gap-2 p-0">
            {attempts.map((a) => (
              <li key={a.id} className="text-sm text-[var(--color-graphite)]">
                {a.lessonTitle} · {a.result} · {a.at}
                {a.mode === "preview" ? ` · ${t("previewMode")}` : ""}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
