import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
import { StatusPanel } from "@/components/brand/status-panel";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessAuthorArea,
  buildReviewPacketMarkdown,
  type ContentVersionView,
} from "@/modules/content/review-workflow";
import { listPreviewModules } from "@/lib/content/load-module";
import { isPrivateAlphaPreviewEnv } from "@/lib/demo";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { loadModuleReviewState } from "@/modules/content/persist-review-transition";

type Props = { params: Promise<{ locale: string }> };

export default async function AuthorListPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/author`);
  if (!canAccessAuthorArea(session.roles)) {
    notFound();
  }

  const modules = listPreviewModules({
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  });

  const versions: ContentVersionView[] = await Promise.all(
    modules.map(async (m) => {
      const dbState = await loadModuleReviewState(m.id);
      if (dbState) return dbState.view;
      return {
        id: `ver-${m.id}-${m.version}`,
        moduleId: m.id,
        title: m.titlePl,
        status: m.status,
        authorId: m.provenance.authorId,
        reviewerId: null,
        version: Number(m.version) || 1,
        provenanceNotes: m.provenance.notes ?? "",
        curriculumLinks: m.provenance.sources,
        reviews: [],
      };
    }),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="author-list-page"
      >
        <PageIntro
          title="Author / Review"
          lead="DRAFT workflow only. PUBLISHED blocked pending JPJO / DEC-016."
        />

        {versions.length === 0 ? (
          <StatusPanel className="mt-6 sm:mt-8">Нет модулей для ревью.</StatusPanel>
        ) : (
          <ul className="mt-6 flex list-none flex-col gap-4 p-0 sm:mt-8">
            {versions.map((v) => (
              <li
                key={v.id}
                className="surface-panel p-4 sm:p-5"
                data-testid={`author-version-${v.moduleId}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="m-0 font-display text-xl text-[var(--color-ink)]">
                    {v.title}
                  </p>
                  <Badge tone={v.status === "DRAFT" ? "draft" : "info"}>
                    {v.status}
                  </Badge>
                </div>
                <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                  v{v.version}
                </p>
                <Link
                  href={`/author/${v.moduleId}`}
                  className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
                >
                  Open review detail →
                </Link>
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm text-[var(--color-graphite)]">
                    Review packet
                  </summary>
                  <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] bg-[var(--color-paper-sunken)] p-3 text-xs">
                    {buildReviewPacketMarkdown(v)}
                  </pre>
                </details>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
