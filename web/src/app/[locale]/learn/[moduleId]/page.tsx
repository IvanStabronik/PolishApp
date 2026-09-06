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

type Props = {
  params: Promise<{ locale: string; moduleId: string }>;
};

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

  return (
    <>
      <SiteHeader signedIn />
      {preview ? <PreviewBanner /> : null}
      <main id="main-content" className="page-shell">
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
      </main>
    </>
  );
}
