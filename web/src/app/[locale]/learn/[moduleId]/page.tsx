import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { ModuleOverview } from "@/components/learning/module-overview";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { getModuleById, isInternalPreview } from "@/lib/content/load-module";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string; moduleId: string }>;
};

/**
 * Compatible adapter: module overview + flat start-practice (M2.1)
 * plus real lesson list (M3). Flat exercises are derived from lessons.
 */
export default async function ModulePage({ params }: Props) {
  const { locale, moduleId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const session = await protectApp(locale, `/${locale}/learn/${moduleId}`);
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const canDraft = canAccessDraftContent(accessCtx);

  const mod = getModuleById(moduleId, accessCtx);
  if (!mod) notFound();

  const t = await getTranslations("learn");
  const tDash = await getTranslations("dashboard");
  const firstExercise = mod.exercises[0];
  const preview = canDraft && isInternalPreview(mod.status);
  const lessons = [...mod.lessons].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <SiteHeader signedIn />
      {preview ? <PreviewBanner /> : null}
      <main id="main-content" className="page-shell" data-testid="module-page">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="info">{mod.level}</Badge>
          {preview ? <Badge tone="draft">{tDash("previewBadge")}</Badge> : null}
        </div>
        <p className="mt-3 text-sm text-[var(--color-graphite)]">{mod.hallLabel}</p>
        <h1 className="font-display text-3xl text-[var(--color-ink)] sm:text-4xl">
          {mod.titlePl}
        </h1>
        <p className="mt-1 text-lg text-[var(--color-graphite)]">{mod.title}</p>
        <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">{mod.situation}</p>
        <p className="mt-2 max-w-2xl text-[var(--color-ink-soft)]">
          <strong>{t("objective")}:</strong> {mod.objective}
        </p>

        <div className="mt-10">
          <ModuleOverview dialogue={mod.dialogue} keyLines={mod.keyLines} />
        </div>

        <section className="mt-10" data-testid="module-lessons">
          <h2 className="font-display m-0 text-xl text-[var(--color-ink)]">
            {t("lessons")}
          </h2>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex flex-wrap items-center justify-between gap-3 border border-[var(--color-line)] bg-[var(--color-paper-raised)] px-4 py-3 rounded-[var(--radius-md)]"
                data-testid="module-lesson"
                data-lesson-id={lesson.id}
              >
                <div>
                  <p className="m-0 font-medium text-[var(--color-ink)]">
                    {lesson.titlePl}
                  </p>
                  <p className="m-0 text-sm text-[var(--color-graphite-muted)]">
                    {lesson.id}
                  </p>
                </div>
                <LinkButton href={`/learn/lessons/${lesson.id}`}>
                  {t("startLesson")}
                </LinkButton>
              </li>
            ))}
          </ul>
        </section>

        {firstExercise ? (
          <div className="mt-10">
            <LinkButton
              href={`/learn/${mod.id}/exercise/${firstExercise.id}`}
              data-testid="start-practice"
            >
              {t("startPractice")}
            </LinkButton>
          </div>
        ) : null}

        <p className="mt-6">
          <Link
            href={`/learn/modules/${mod.id}`}
            className="text-sm text-[var(--color-forest)]"
          >
            /learn/modules/{mod.id}
          </Link>
        </p>
      </main>
    </>
  );
}
