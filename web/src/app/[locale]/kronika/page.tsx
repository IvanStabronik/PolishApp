import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { protectApp } from "@/lib/auth/protect";
import { loadProgressOverview } from "@/modules/learning/progress";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Kronika — archival timeline of attempts (light archival tone). */
export default async function KronikaPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/kronika`);
  const t = await getTranslations("learn");
  const progress = await loadProgressOverview(session.user.id);

  return (
    <>
      <SiteHeader signedIn />
      <main id="main-content" className="page-shell" data-testid="kronika-page">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {t("kronika")}
        </h1>
        <p className="mt-2 text-[var(--color-graphite)]">{t("archiwum")}</p>
        <ol className="mt-8 flex list-none flex-col gap-3 p-0">
          {progress.recentAttempts.length === 0 ? (
            <li className="text-[var(--color-graphite)]">—</li>
          ) : (
            progress.recentAttempts.map((a) => (
              <li
                key={a.id}
                className="border-b border-[var(--color-line)] py-3"
                data-testid="kronika-entry"
              >
                <span className="font-medium text-[var(--color-ink)]">
                  {t("proba")}
                </span>
                <span className="text-[var(--color-graphite)]">
                  {" "}
                  · {a.result} · {a.mode} · {a.at}
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
