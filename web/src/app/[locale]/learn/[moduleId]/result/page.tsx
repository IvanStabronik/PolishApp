import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { LinkButton } from "@/components/ui/link-button";
import {
  getModuleById,
  isInternalPreview,
} from "@/lib/content/load-module";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";

type Props = {
  params: Promise<{ locale: string; moduleId: string }>;
};

export default async function ResultPage({ params }: Props) {
  const { locale, moduleId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const session = await protectApp(
    locale,
    `/${locale}/learn/${moduleId}/result`,
  );
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const canDraft = canAccessDraftContent(accessCtx);

  const mod = getModuleById(moduleId, accessCtx);
  if (!mod) notFound();

  const t = await getTranslations("learn");
  const showDraftBanner = canDraft && isInternalPreview(mod.status);

  return (
    <>
      <SiteHeader signedIn />
      {showDraftBanner ? <PreviewBanner /> : null}
      <main
        id="main-content"
        className="page-shell prose-narrow"
        data-testid="lesson-result"
      >
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("resultTitle")}
        </h1>
        <p className="mt-2 text-[var(--color-graphite)]">{t("resultLead")}</p>
        <p className="mt-6 text-[var(--color-ink-soft)]">
          {mod.titlePl} · {mod.exercises.length} {t("exercisesCount")}
        </p>
        <p className="mt-2 text-sm text-[var(--color-graphite)]">
          {t("masteryHint")}
        </p>
        {showDraftBanner ? (
          <p className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-warning)] bg-[var(--color-warning-bg)] px-4 py-3 text-sm text-[var(--color-warning)]">
            {t("previewNoMastery")}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={`/learn/${mod.id}`}>{t("backToModule")}</LinkButton>
          <LinkButton href="/dashboard" variant="secondary">
            {t("toDashboard")}
          </LinkButton>
        </div>
      </main>
    </>
  );
}
