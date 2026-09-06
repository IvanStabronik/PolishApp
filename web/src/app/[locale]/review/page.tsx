import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { loadContinueLearning } from "@/modules/learning/continue-learning";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function ReviewQueuePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/review`);
  const t = await getTranslations("learn");
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const scope = canAccessDraftContent(accessCtx) ? "preview" : "live";
  const snapshot = await loadContinueLearning(session.user.id, accessCtx, scope);

  return (
    <>
      <SiteHeader signedIn />
      <main id="main-content" className="page-shell" data-testid="review-queue-page">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("powtorka")}
        </h1>
        <p className="mt-2 text-[var(--color-graphite)]">{t("reviewQueue")}</p>
        <ul className="mt-8 flex list-none flex-col gap-3 p-0">
          {snapshot.reviewQueue.items.length === 0 ? (
            <li className="text-[var(--color-graphite)]">—</li>
          ) : (
            snapshot.reviewQueue.items.map((item) => (
              <li
                key={item.conceptCanonicalId}
                className="border border-[var(--color-line)] bg-[var(--color-paper-raised)] px-4 py-3 rounded-[var(--radius-md)]"
                data-testid="review-item"
              >
                <p className="m-0 font-medium text-[var(--color-ink)]">
                  {item.conceptCanonicalId}
                </p>
                <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                  {item.source} · errors={item.errorCount} · {item.reason}
                </p>
              </li>
            ))
          )}
        </ul>
        <p className="mt-8">
          <Link href="/dashboard" className="text-[var(--color-forest)]">
            ← dashboard
          </Link>
        </p>
      </main>
    </>
  );
}
