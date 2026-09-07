import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui/link-button";
import { PageIntro } from "@/components/brand/page-intro";

type Props = {
  params: Promise<{ locale: string; lessonId: string }>;
  searchParams: Promise<{ c?: string; n?: string; module?: string }>;
};

export default async function LessonResultPage({ params, searchParams }: Props) {
  const { locale, lessonId } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("learn");

  const correct = Number(query.c ?? 0);
  const total = Number(query.n ?? 0);
  const moduleId = query.module ?? "pierwsze-spotkanie";

  return (
    <div
      className="surface-panel motion-fade-rise max-w-xl p-4 sm:p-6"
      data-testid="lesson-result-card"
    >
      <PageIntro title={t("resultTitle")} lead={t("resultLead")} />
      <p className="mt-6 text-lg text-[var(--color-ink)]">
        {t("scoreLabel")}:{" "}
        <strong>
          {correct}/{total}
        </strong>
      </p>
      <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
        {t("masteryHint")}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href={`/learn/modules/${moduleId}`}>
          {t("backToModule")}
        </LinkButton>
        <LinkButton href={`/learn/${moduleId}`} variant="secondary">
          {t("startPractice")}
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
