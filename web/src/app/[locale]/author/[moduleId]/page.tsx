import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/brand/site-header";
import { SiteFooter } from "@/components/brand/site-footer";
import { PageIntro } from "@/components/brand/page-intro";
import { protectApp } from "@/lib/auth/protect";
import {
  canAccessAuthorArea,
  canAccessReviewerArea,
  attemptPublish,
  buildReviewPacketJson,
  type ContentVersionView,
} from "@/modules/content/review-workflow";
import { getModuleById } from "@/lib/content/load-module";
import { isDraftLearningEnvEnabled } from "@/lib/demo";
import { Link } from "@/i18n/navigation";
import { ReviewActions } from "@/components/author/review-actions";
import { loadModuleReviewState } from "@/modules/content/persist-review-transition";
import { CHANGES_REQUESTED_DB_STATUS } from "@/modules/content/lifecycle";

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
    isPreviewEnv: isDraftLearningEnvEnabled(),
  });
  if (!mod) notFound();

  const dbState = await loadModuleReviewState(moduleId);

  const version: ContentVersionView = dbState
    ? dbState.view
    : {
        id: `ver-${mod.id}-${mod.version}`,
        moduleId: mod.id,
        title: mod.titlePl,
        status: mod.status,
        authorId: mod.provenance.authorId,
        reviewerId: null,
        version: Number(mod.version) || 1,
        provenanceNotes: mod.provenance.notes ?? "",
        curriculumLinks: mod.provenance.sources,
        reviews: [],
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

  const canSubmit =
    version.status === "DRAFT" ||
    version.status === CHANGES_REQUESTED_DB_STATUS;
  const canReview = isReviewer && version.status === "IN_REVIEW";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader signedIn />
      <main
        id="main-content"
        className="page-shell flex-1 pb-10 sm:pb-14"
        data-testid="author-review-detail"
      >
        <PageIntro title={version.title}>
          <p
            className="mt-3 text-[var(--color-graphite)]"
            data-testid="review-status"
          >
            Status: {version.status}
            {dbState ? " (DB)" : " (YAML fallback)"}
          </p>
        </PageIntro>
        <div className="surface-panel motion-fade-rise-delay mt-6 space-y-3 p-4 sm:mt-8 sm:p-6">
          <p className="m-0 text-sm text-[var(--color-graphite)]">
            Version id: {version.id}
            {version.authorId ? ` · Author: ${version.authorId}` : null}
            {version.reviewerId ? ` · Reviewer: ${version.reviewerId}` : null}
          </p>
          <p className="m-0 text-sm text-[var(--color-graphite)]">
            Exercises (answers visible to reviewer): {mod.exercises.length}
          </p>
          {approvedBlocked ? (
            <p
              className="rounded-[var(--radius-md)] border border-[var(--color-amber)] bg-[var(--color-warning-bg)] px-4 py-3 text-sm text-[var(--color-warning)]"
              data-testid="approved-but-blocked"
              role="status"
            >
              APPROVED but PUBLISHED blocked: DEC-016 / JPJO gates open. This does
              not simulate an independent expert decision.
            </p>
          ) : null}
          {version.status === CHANGES_REQUESTED_DB_STATUS ? (
            <p
              className="text-sm text-[var(--color-burgundy)]"
              data-testid="changes-requested"
            >
              Changes requested (DB status REJECTED = CHANGES_REQUESTED). Author
              revises and resubmits.
            </p>
          ) : null}
          <ReviewActions
            moduleId={moduleId}
            status={version.status}
            canSubmit={canSubmit}
            canReview={canReview}
          />
        </div>
        <pre
          className="mt-6 overflow-auto rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-4 text-xs shadow-[var(--shadow-xs)]"
          data-testid="review-packet-json"
          tabIndex={0}
          role="region"
          aria-label="Review packet JSON"
        >
          {buildReviewPacketJson(version)}
        </pre>
        <p className="mt-4 text-sm text-[var(--color-graphite)]">
          Link packet to <code>docs/reviews/</code> — do not duplicate JPJO
          decisions here.
        </p>
        <p className="mt-8">
          <Link
            href="/author"
            className="inline-flex min-h-11 items-center text-[var(--color-amber-deep)] no-underline hover:underline"
          >
            ← author list
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
