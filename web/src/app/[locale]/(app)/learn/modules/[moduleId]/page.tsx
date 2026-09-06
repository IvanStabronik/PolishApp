import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DualModuleLabel } from "@/components/dual-module-label";
import { getModuleById, listModuleLessons } from "@/modules/content";

type Props = {
  params: Promise<{ locale: string; moduleId: string }>;
};

export default async function ModulePage({ params }: Props) {
  const { locale, moduleId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("learn");
  const tc = await getTranslations("common");
  const td = await getTranslations("demo");

  const mod = await getModuleById(moduleId);
  if (!mod) notFound();

  const lessons = await listModuleLessons(moduleId);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <DualModuleLabel lore={mod.lore} />
        <h1 className="font-display mt-2 mb-0 text-3xl">{mod.titlePl}</h1>
        <p className="mt-2 text-[var(--color-graphite)]">{mod.summary}</p>
        {mod.status === "DRAFT" ? (
          <p className="mt-2 text-sm text-[var(--color-warning)]">
            {tc("draft")} · {td("draftOnly")}
          </p>
        ) : null}
      </header>

      <section>
        <h2 className="font-display m-0 text-xl">{t("lessons")}</h2>
        <ul className="mt-4 flex list-none flex-col gap-3 p-0">
          {lessons.map((lesson) => (
            <Card
              as="li"
              key={lesson.id}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="m-0 font-medium text-[var(--color-ink)]">
                  {lesson.title}
                </p>
                <p className="m-0 text-sm text-[var(--color-graphite-muted)]">
                  {lesson.steps.length} steps
                </p>
              </div>
              <Link href={`/learn/lessons/${lesson.id}`}>
                <Button>{t("startLesson")}</Button>
              </Link>
            </Card>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/learn/${mod.id}`}>
          <Button variant="secondary">{t("startPractice")}</Button>
        </Link>
        <Link href="/learn/a1">
          <Button variant="ghost">{tc("back")}</Button>
        </Link>
      </div>
    </div>
  );
}
