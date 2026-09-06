import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessAuthorArea,
  canAccessReviewerArea,
  attemptPublish,
  buildReviewPacketJson,
  type ContentVersionView,
} from "@/modules/content/review-workflow";
import { getModuleById } from "@/lib/content/load-module";
import { isPrivateAlphaPreviewEnv } from "@/lib/demo";
import { Link } from "@/i18n/navigation";
import { ReviewActions } from "@/components/author/review-actions";

type Props = {
  params: Promise<{ locale: string; moduleId: string }>;
};

export default async function AuthorReviewDetailPage({ params }: Props) {
  const { locale, moduleId } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const session = await protectApp(locale, `/${locale}/author/${moduleId}`);
  if (!canAccessAuthorArea(session.roles)) {
    notFound();
  }

  const mod = getModuleById(moduleId, {
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  });
  if (!mod) notFound();

  const version: ContentVersionView = {
    id: `ver-${mod.id}-${mod.version}`,
    moduleId: mod.id,
    title: mod.titlePl,
    status: mod.status,
    authorId: mod.provenance.authorId,
    version: Number(mod.version) || 1,
    provenanceNotes: mod.provenance.notes ?? "",
    curriculumLinks: mod.provenance.sources,
  };

  const isReviewer = canAccessReviewerArea(session.roles);
  const approvedBlocked =
    version.status === "APPROVED"
      ? attemptPublish({
          version,
          actorId: session.user.id,
          actorRoles: session.roles,
        })
      : null;

  return (
    <>
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell"
        data-testid="author-review-detail"
      >
        <h1 className="font-display text-3xl text-[var(--color-ink)]">
          {version.title}
        </h1>
        <p
          className="mt-2 text-[var(--color-graphite)]"
          data-testid="review-status"
        >
          Status: {version.status}
        </p>
        <p className="mt-2 text-sm text-[var(--color-graphite)]">
          Exercises (answers visible to reviewer): {mod.exercises.length}
        </p>
        {approvedBlocked ? (
          <p
            className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-amber)] bg-[var(--color-paper-sunken)] px-4 py-3 text-sm"
            data-testid="approved-but-blocked"
            role="status"
          >
            APPROVED but PUBLISHED blocked: DEC-016 / JPJO gates open. This does
            not simulate an independent expert decision.
          </p>
        ) : null}
        {version.status === "REJECTED" ? (
          <p
            className="mt-4 text-sm text-[var(--color-burgundy)]"
            data-testid="changes-requested"
          >
            Changes requested (REJECTED → author revises in DRAFT).
          </p>
        ) : null}
        <ReviewActions
          moduleId={moduleId}
          canSubmit={version.status === "DRAFT"}
          canReview={isReviewer && version.status === "IN_REVIEW"}
        />
        <pre
          className="mt-8 overflow-auto rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-4 text-xs"
          data-testid="review-packet-json"
        >
          {buildReviewPacketJson(version)}
        </pre>
        <p className="mt-4 text-sm text-[var(--color-graphite)]">
          Link packet to <code>docs/reviews/</code> — do not duplicate JPJO
          decisions here.
        </p>
        <p className="mt-8">
          <Link href="/author" className="text-[var(--color-forest)]">
            ← author list
          </Link>
        </p>
      </main>
    </>
  );
}
