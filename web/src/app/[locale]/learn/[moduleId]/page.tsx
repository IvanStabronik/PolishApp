import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { PageIntro } from "@/components/brand/page-intro";
import { ModuleOverview } from "@/components/learning/module-overview";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { getModuleById, isInternalPreview } from "@/lib/content/load-module";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessDraftContent,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";
import { Link } from "@/i18n/navigation";
import { getLearnerProfile } from "@/modules/auth/session";
import { isLearnerL1 } from "@/lib/content/types";

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
    isPreviewEnv: isDraftLearningEnvEnabled(),
  };
  const canDraft = canAccessDraftContent(accessCtx);

  const mod = getModuleById(moduleId, accessCtx);
  if (!mod) notFound();

  const profile = await getLearnerProfile(session.user.id);
  const l1 =
    profile?.l1 && isLearnerL1(profile.l1) ? profile.l1 : ("rus" as const);

  const t = await getTranslations("learn");
  const tDash = await getTranslations("dashboard");
  const firstExercise = mod.exercises[0];
  const preview = canDraft && isInternalPreview(mod.status);
  const lessons = [...mod.lessons].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      {preview ? <PreviewBanner /> : null}
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="module-page"
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="info">{mod.level}</Badge>
          {preview ? <Badge tone="draft">{tDash("previewBadge")}</Badge> : null}
        </div>
        <PageIntro
          className="mt-3"
          title={mod.titlePl}
          lead={mod.title}
          eyebrow={mod.hallLabel}
        >
          <p className="mt-4 max-w-2xl text-[var(--color-ink-soft)]">
            {mod.situation}
          </p>
          <p className="mt-2 max-w-2xl text-[var(--color-ink-soft)]">
            <strong>{t("objective")}:</strong> {mod.objective}
          </p>
        </PageIntro>

        <div className="surface-panel mt-8 p-4 sm:p-6">
          <ModuleOverview
            dialogue={mod.dialogue}
            keyLines={mod.keyLines}
            l1={l1}
            pragmatics={mod.pragmatics}
            grammar={mod.grammar}
          />
        </div>

        <section className="mt-10" data-testid="module-lessons">
          <h2 className="font-display m-0 text-xl text-[var(--color-ink)] sm:text-2xl">
            {t("lessons")}
          </h2>
          <ul className="mt-4 flex list-none flex-col gap-3 p-0">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="surface-panel flex flex-wrap items-center justify-between gap-3 p-4"
                data-testid="module-lesson"
                data-lesson-id={lesson.id}
              >
                <div className="min-w-0">
                  <p className="m-0 font-medium text-[var(--color-ink)]">
                    {lesson.titlePl}
                  </p>
                  <p className="m-0 text-sm text-[var(--color-graphite-muted)]">
                    {lesson.objective}
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
            className="inline-flex min-h-11 items-center text-sm text-[var(--color-amber-deep)] no-underline hover:underline"
          >
            /learn/modules/{mod.id}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
