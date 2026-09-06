import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessAuthorArea,
  buildReviewPacketMarkdown,
  type ContentVersionView,
} from "@/modules/content/review-workflow";
import { listPreviewModules } from "@/lib/content/load-module";
import { isPrivateAlphaPreviewEnv } from "@/lib/demo";
import { Link } from "@/i18n/navigation";

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

  const versions: ContentVersionView[] = modules.map((m) => ({
    id: `ver-${m.id}-${m.version}`,
    moduleId: m.id,
    title: m.titlePl,
    status: m.status,
    authorId: m.provenance.authorId,
    version: Number(m.version) || 1,
    provenanceNotes: m.provenance.notes ?? "",
    curriculumLinks: m.provenance.sources,
  }));

  return (
    <>
      <SiteHeader signedIn />
      <main id="main-content" className="page-shell" data-testid="author-list-page">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          Author / Review
        </h1>
        <p className="mt-2 text-[var(--color-graphite)]">
          DRAFT workflow only. PUBLISHED blocked pending JPJO / DEC-016.
        </p>
        <ul className="mt-8 flex list-none flex-col gap-4 p-0">
          {versions.map((v) => (
            <li
              key={v.id}
              className="border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-4 rounded-[var(--radius-md)]"
              data-testid={`author-version-${v.moduleId}`}
            >
              <p className="m-0 font-display text-xl">{v.title}</p>
              <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                {v.status} · v{v.version}
              </p>
              <Link
                href={`/author/${v.moduleId}`}
                className="mt-2 inline-block text-sm text-[var(--color-forest)]"
              >
                Open review detail →
              </Link>
              <details className="mt-3">
                <summary className="cursor-pointer text-sm">Review packet</summary>
                <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">
                  {buildReviewPacketMarkdown(v)}
                </pre>
              </details>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
