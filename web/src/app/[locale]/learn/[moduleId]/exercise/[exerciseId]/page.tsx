import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { ExercisePlayer } from "@/components/learning/exercise-player";
import { ReportProblemButton } from "@/components/feedback/report-problem-button";
import {
  getModuleById,
  getExercise,
  isInternalPreview,
} from "@/lib/content/load-module";
import { toLearnerExercise } from "@/lib/content/learner-dto";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessDraftContent,
  isDraftLearningEnvEnabled,
} from "@/lib/demo";

type Props = {
  params: Promise<{ locale: string; moduleId: string; exerciseId: string }>;
};

export default async function ExercisePage({ params }: Props) {
  const { locale, moduleId, exerciseId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const session = await protectApp(
    locale,
    `/${locale}/learn/${moduleId}/exercise/${exerciseId}`,
  );
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isDraftLearningEnvEnabled(),
  };
  const canDraft = canAccessDraftContent(accessCtx);

  const mod = getModuleById(moduleId, accessCtx);
  const authored = getExercise(moduleId, exerciseId, accessCtx);
  if (!mod || !authored) notFound();

  // Strip answer keys before any client serialization (RSC → ExercisePlayer).
  const exercise = toLearnerExercise(authored);

  const t = await getTranslations("learn");
  const ids = mod.exercises.map((ex) => ex.id);
  const index = ids.indexOf(exerciseId);
  const isLast = index === ids.length - 1;
  const nextHref = isLast
    ? `/learn/${moduleId}/result`
    : `/learn/${moduleId}/exercise/${ids[index + 1]}`;
  const showDraftBanner = canDraft && isInternalPreview(mod.status);

  return (
    <>
      <SiteHeader signedIn />
      {showDraftBanner ? <PreviewBanner /> : null}
      <main id="main-content" className="page-shell">
        <p className="text-sm text-[var(--color-graphite)]">
          {t("stepOf", { current: index + 1, total: ids.length })}
        </p>
        <h1 className="mt-2 font-display text-3xl text-[var(--color-ink)]">
          {t("practice")}
        </h1>
        <p className="mt-1 text-[var(--color-graphite)]">{mod.titlePl}</p>
        <div className="mt-8">
          <ExercisePlayer
            moduleId={moduleId}
            exercise={exercise}
            nextHref={nextHref}
            isLast={isLast}
          />
        </div>
        <ReportProblemButton moduleId={moduleId} exerciseId={exerciseId} />
      </main>
    </>
  );
}
