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

export default async function DailyPlanPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/plan`);
  const t = await getTranslations("learn");
  const accessCtx = {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  };
  const scope = canAccessDraftContent(accessCtx) ? "preview" : "live";
  const snapshot = await loadContinueLearning(session.user.id, accessCtx, scope);
  const plan = snapshot.dailyPlan;

  return (
    <>
      <SiteHeader signedIn />
      <main id="main-content" className="page-shell" data-testid="daily-plan-page">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("dailyPlan")}
        </h1>
        <p className="mt-2 text-[var(--color-graphite)]">{plan.nextGoal}</p>
        <ol className="mt-8 flex list-decimal flex-col gap-4 pl-5">
          {plan.items.length === 0 ? (
            <li className="text-[var(--color-graphite)]">—</li>
          ) : (
            plan.items.map((item, i) => (
              <li key={`${item.kind}-${i}`} data-testid={`plan-item-${item.kind}`}>
                <span className="font-medium text-[var(--color-ink)]">
                  {item.kind}
                </span>
                <span className="text-[var(--color-graphite)]">
                  {" "}
                  · {item.minutes} min — {item.reason}
                </span>
              </li>
            ))
          )}
        </ol>
        <p className="mt-8">
          <Link href="/dashboard" className="text-[var(--color-forest)]">
            ← dashboard
          </Link>
        </p>
      </main>
    </>
  );
}
