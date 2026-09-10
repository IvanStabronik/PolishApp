import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui/link-button";
import { PageIntro } from "@/components/brand/page-intro";
import { protectApp } from "@/lib/auth/protect";
import {
  loadLatestLessonSessionSummary,
  loadLessonSessionSummary,
} from "@/modules/learning/lesson-session";

type Props = {
  params: Promise<{ locale: string; lessonId: string }>;
  searchParams: Promise<{
    c?: string;
    n?: string;
    module?: string;
    session?: string;
  }>;
};

/**
 * Session practice summary — prefers server learning_sessions aggregates.
 * Query ?c=&n= is degraded fallback only (not mastery).
 */
export default async function LessonResultPage({ params, searchParams }: Props) {
  const { locale, lessonId } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("learn");
  const auth = await protectApp(locale, `/${locale}/learn/lessons/${lessonId}/result`);

  let correct = 0;
  let total = 0;
  let fromServer = false;

  if (query.session) {
    const summary = await loadLessonSessionSummary({
      userId: auth.user.id,
      sessionId: query.session,
    });
    if (summary && summary.total > 0) {
      correct = summary.correct;
      total = summary.total;
      fromServer = true;
    }
  }

  if (!fromServer) {
    const latest = await loadLatestLessonSessionSummary({
      userId: auth.user.id,
      lessonId,
    });
    if (latest && latest.total > 0) {
      correct = latest.correct;
      total = latest.total;
      fromServer = true;
    }
  }

  if (!fromServer) {
    correct = Number(query.c ?? 0);
    total = Number(query.n ?? 0);
  }

  const moduleId = query.module ?? "pierwsze-spotkanie";
  const hasSessionScore =
    Number.isFinite(correct) &&
    Number.isFinite(total) &&
    total > 0 &&
    correct >= 0 &&
    correct <= total;

  return (
    <div
      className="surface-panel motion-fade-rise max-w-xl p-4 sm:p-6"
      data-testid="lesson-result-card"
      data-score-source={fromServer ? "server" : "query"}
    >
      <PageIntro title={t("resultTitle")} lead={t("resultLead")} />
      {hasSessionScore ? (
        <p className="mt-6 text-lg text-[var(--color-ink)]">
          {t("sessionScoreLabel")}:{" "}
          <strong>
            {correct}/{total}
          </strong>
        </p>
      ) : (
        <p className="mt-6 text-[var(--color-ink-soft)]">{t("sessionScoreMissing")}</p>
      )}
      <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
        {t("sessionScoreHint")}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href={`/learn/${moduleId}`}>
          {t("backToModule")}
        </LinkButton>
        <LinkButton href="/progress" variant="ghost">
          {t("toProgress")}
        </LinkButton>
        <LinkButton href={`/learn/lessons/${lessonId}`} variant="ghost">
          {t("startLesson")}
        </LinkButton>
      </div>
    </div>
  );
}
