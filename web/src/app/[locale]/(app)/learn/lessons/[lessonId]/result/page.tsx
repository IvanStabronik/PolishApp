import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="max-w-xl">
      <h1 className="font-display m-0 text-3xl">{t("resultTitle")}</h1>
      <p className="mt-2 text-[var(--color-graphite)]">{t("resultLead")}</p>
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
        <Link href={`/learn/modules/${moduleId}`}>
          <Button>{t("backToModule")}</Button>
        </Link>
        <Link href={`/learn/${moduleId}`}>
          <Button variant="secondary">{t("startPractice")}</Button>
        </Link>
        <Link href="/progress">
          <Button variant="ghost">{t("toProgress")}</Button>
        </Link>
        <Link href={`/learn/lessons/${lessonId}`}>
          <Button variant="ghost">{t("startLesson")}</Button>
        </Link>
      </div>
    </Card>
  );
}
