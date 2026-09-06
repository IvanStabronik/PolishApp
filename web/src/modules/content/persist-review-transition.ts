/**
 * Transactional author/reviewer lifecycle against content_versions + reviews +
 * publication_events. Never writes privacy_audit.
 *
 * REJECTED is the DB equivalent of product CHANGES_REQUESTED (see lifecycle.ts).
 */

import { asc, eq } from "drizzle-orm";
import { getDb, type Db } from "@/db/client";
import {
  contentUnits,
  contentVersions,
  modules,
  publicationEvents,
  reviews,
} from "@/db/schema";
import type { ContentStatus } from "@/lib/enums";
import { CHANGES_REQUESTED_DB_STATUS } from "@/modules/content/lifecycle";
import { resolveModuleContentVersionId } from "@/modules/learning/persist-attempt";
import {
  applyReviewVerdict,
  attemptPublish,
  submitForReview,
  type ContentVersionView,
  type ReviewRecordView,
  type ReviewVerdict,
} from "@/modules/content/review-workflow";

export type PersistReviewAction =
  | "submit_for_review"
  | "verdict"
  | "publish";

export type PersistReviewTransitionInput = {
  moduleId: string;
  action: PersistReviewAction;
  actorId: string;
  actorRoles: readonly string[];
  verdict?: ReviewVerdict;
  comment?: string;
};

export type PersistReviewTransitionResult = {
  ok: boolean;
  from: ContentStatus | null;
  to: ContentStatus | null;
  /** Current DB status after the attempt (unchanged on failure). */
  status: ContentStatus | null;
  contentVersionId: string | null;
  error?: string;
  /** True when a publication_events row was written (incl. blocked publish). */
  publicationEventLogged?: boolean;
};

function asContentStatus(value: string): ContentStatus {
  return value as ContentStatus;
}

function versionViewFromRow(
  row: {
    id: string;
    status: string;
    authorUserId: string | null;
    versionNo: number;
    provenance: Record<string, unknown>;
    payload: Record<string, unknown>;
  },
  moduleId: string,
  title: string,
  reviewerId: string | null,
  reviewRows: ReviewRecordView[] = [],
): ContentVersionView {
  const provenance = row.provenance ?? {};
  const payload = row.payload ?? {};
  const curriculumLinks = Array.isArray(payload.curriculum_links)
    ? (payload.curriculum_links as string[])
    : Array.isArray(provenance.sources)
      ? (provenance.sources as string[])
      : [];
  const notes =
    typeof provenance.notes === "string"
      ? provenance.notes
      : typeof provenance.note === "string"
        ? provenance.note
        : "";

  return {
    id: row.id,
    moduleId,
    title,
    status: asContentStatus(row.status),
    authorId: row.authorUserId ?? "",
    reviewerId,
    version: row.versionNo,
    provenanceNotes: notes,
    curriculumLinks,
    reviews: reviewRows,
  };
}

async function writePublicationEvent(
  tx: Db,
  opts: {
    contentVersionId: string;
    actorUserId: string;
    fromStatus: ContentStatus | null;
    toStatus: ContentStatus;
    note?: string | null;
  },
): Promise<void> {
  await tx.insert(publicationEvents).values({
    contentVersionId: opts.contentVersionId,
    actorUserId: opts.actorUserId,
    fromStatus: opts.fromStatus,
    toStatus: opts.toStatus,
    note: opts.note ?? null,
  });
}

async function applyStatusUpdate(
  tx: Db,
  contentVersionId: string,
  to: ContentStatus,
  patch: { reviewerId?: string | null } = {},
): Promise<void> {
  await tx
    .update(contentVersions)
    .set({
      status: to,
      ...(patch.reviewerId !== undefined
        ? { reviewerId: patch.reviewerId }
        : {}),
      updatedAt: new Date(),
    })
    .where(eq(contentVersions.id, contentVersionId));
}

/**
 * Persist a review workflow transition for a module's working content_version.
 * Uses SELECT … FOR UPDATE so concurrent verdicts cannot both succeed.
 */
export async function persistReviewTransition(
  input: PersistReviewTransitionInput,
  db: Db = getDb(),
): Promise<PersistReviewTransitionResult> {
  return db.transaction(async (tx) => {
    const contentVersionId = await resolveModuleContentVersionId(
      tx as unknown as Db,
      input.moduleId,
    );
    if (!contentVersionId) {
      return {
        ok: false,
        from: null,
        to: null,
        status: null,
        contentVersionId: null,
        error: "not_found",
      };
    }

    const lockedRows = await tx
      .select()
      .from(contentVersions)
      .where(eq(contentVersions.id, contentVersionId))
      .for("update");
    const locked = lockedRows[0];
    if (!locked) {
      return {
        ok: false,
        from: null,
        to: null,
        status: null,
        contentVersionId,
        error: "not_found",
      };
    }

    const unit = await tx.query.contentUnits.findFirst({
      where: eq(contentUnits.id, locked.unitId),
      columns: { title: true, canonicalId: true },
    });
    const modRow = await tx.query.modules.findFirst({
      where: eq(modules.contentVersionId, contentVersionId),
      columns: { slug: true, workingTitle: true, canonicalId: true },
    });
    const moduleKey =
      modRow?.slug ??
      input.moduleId ??
      modRow?.canonicalId ??
      unit?.canonicalId ??
      contentVersionId;
    const title = modRow?.workingTitle ?? unit?.title ?? moduleKey;

    const fromStatus = asContentStatus(locked.status);
    const view = versionViewFromRow(
      locked,
      moduleKey,
      title,
      locked.reviewerId,
    );

    if (input.action === "publish") {
      const result = attemptPublish({
        version: view,
        actorId: input.actorId,
        actorRoles: input.actorRoles,
        comment: input.comment,
      });
      // Always blocked — may still append a publication_events note.
      await writePublicationEvent(tx as unknown as Db, {
        contentVersionId,
        actorUserId: input.actorId,
        fromStatus,
        toStatus: fromStatus,
        note:
          result.audit?.comment ??
          "PUBLICATION BLOCKED: DEC-016 / JPJO gates open",
      });
      return {
        ok: false,
        from: fromStatus,
        to: null,
        status: fromStatus,
        contentVersionId,
        error: result.error ?? "publication_gates_open",
        publicationEventLogged: true,
      };
    }

    if (input.action === "submit_for_review") {
      let workingStatus = fromStatus;
      let workingFrom = fromStatus;

      // Resubmit after CHANGES_REQUESTED (REJECTED): REJECTED → DRAFT → IN_REVIEW.
      if (workingStatus === CHANGES_REQUESTED_DB_STATUS) {
        await applyStatusUpdate(tx as unknown as Db, contentVersionId, "DRAFT");
        await writePublicationEvent(tx as unknown as Db, {
          contentVersionId,
          actorUserId: input.actorId,
          fromStatus: CHANGES_REQUESTED_DB_STATUS,
          toStatus: "DRAFT",
          note: "author_revise_after_changes_requested",
        });
        workingStatus = "DRAFT";
        workingFrom = "DRAFT";
      }

      const result = submitForReview({
        version: { ...view, status: workingStatus },
        actorId: input.actorId,
        actorRoles: input.actorRoles,
        comment: input.comment,
      });

      if (!result.ok || !result.to) {
        return {
          ok: false,
          from: fromStatus,
          to: null,
          status: fromStatus,
          contentVersionId,
          error:
            result.error === `illegal_transition_${workingStatus}_IN_REVIEW`
              ? "stale_state"
              : (result.error ?? "submit_failed"),
        };
      }

      // Stale-state: row must still be DRAFT after possible revise step.
      if (workingStatus !== "DRAFT") {
        return {
          ok: false,
          from: fromStatus,
          to: null,
          status: fromStatus,
          contentVersionId,
          error: "stale_state",
        };
      }

      await applyStatusUpdate(
        tx as unknown as Db,
        contentVersionId,
        result.to,
      );
      await writePublicationEvent(tx as unknown as Db, {
        contentVersionId,
        actorUserId: input.actorId,
        fromStatus: workingFrom,
        toStatus: result.to,
        note: result.audit?.action ?? "submit_for_review",
      });

      return {
        ok: true,
        from: fromStatus,
        to: result.to,
        status: result.to,
        contentVersionId,
        publicationEventLogged: true,
      };
    }

    // verdict
    const verdict = input.verdict ?? "request_changes";
    if (verdict === "request_changes" && !input.comment?.trim()) {
      return {
        ok: false,
        from: fromStatus,
        to: null,
        status: fromStatus,
        contentVersionId,
        error: "comment_required",
      };
    }

    if (fromStatus !== "IN_REVIEW") {
      return {
        ok: false,
        from: fromStatus,
        to: null,
        status: fromStatus,
        contentVersionId,
        error: "stale_state",
      };
    }

    const result = applyReviewVerdict({
      version: view,
      actorId: input.actorId,
      actorRoles: input.actorRoles,
      verdict,
      comment: input.comment,
    });

    if (!result.ok || !result.to) {
      return {
        ok: false,
        from: fromStatus,
        to: null,
        status: fromStatus,
        contentVersionId,
        error: result.error ?? "verdict_failed",
      };
    }

    const decision = verdict === "approve" ? "approve" : "reject";
    await tx.insert(reviews).values({
      contentVersionId,
      reviewerUserId: input.actorId,
      decision,
      comment: input.comment?.trim() || null,
      checklist: {},
    });

    await applyStatusUpdate(tx as unknown as Db, contentVersionId, result.to, {
      reviewerId: input.actorId,
    });
    await writePublicationEvent(tx as unknown as Db, {
      contentVersionId,
      actorUserId: input.actorId,
      fromStatus,
      toStatus: result.to,
      note:
        verdict === "approve"
          ? "approve"
          : "request_changes (REJECTED = CHANGES_REQUESTED)",
    });

    return {
      ok: true,
      from: fromStatus,
      to: result.to,
      status: result.to,
      contentVersionId,
      publicationEventLogged: true,
    };
  });
}

export type ModuleReviewState = {
  contentVersionId: string;
  status: ContentStatus;
  authorUserId: string | null;
  reviewerId: string | null;
  versionNo: number;
  title: string;
  provenanceNotes: string;
  curriculumLinks: string[];
  reviews: ReviewRecordView[];
  view: ContentVersionView;
};

/** Load persisted review state for an author/reviewer UI (status from DB). */
export async function loadModuleReviewState(
  moduleId: string,
  db: Db = getDb(),
): Promise<ModuleReviewState | null> {
  const contentVersionId = await resolveModuleContentVersionId(db, moduleId);
  if (!contentVersionId) return null;

  const row = await db.query.contentVersions.findFirst({
    where: eq(contentVersions.id, contentVersionId),
  });
  if (!row) return null;

  const unit = await db.query.contentUnits.findFirst({
    where: eq(contentUnits.id, row.unitId),
    columns: { title: true },
  });
  const modRow = await db.query.modules.findFirst({
    where: eq(modules.contentVersionId, contentVersionId),
    columns: { slug: true, workingTitle: true },
  });

  const reviewRows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.contentVersionId, contentVersionId))
    .orderBy(asc(reviews.createdAt));

  const mappedReviews: ReviewRecordView[] = reviewRows.map((r) => ({
    id: r.id,
    decision: r.decision,
    comment: r.comment,
    reviewerUserId: r.reviewerUserId,
    createdAt: r.createdAt.toISOString(),
  }));

  const moduleKey = modRow?.slug ?? moduleId;
  const title = modRow?.workingTitle ?? unit?.title ?? moduleKey;
  const view = versionViewFromRow(
    row,
    moduleKey,
    title,
    row.reviewerId,
    mappedReviews,
  );

  return {
    contentVersionId,
    status: asContentStatus(row.status),
    authorUserId: row.authorUserId,
    reviewerId: row.reviewerId,
    versionNo: row.versionNo,
    title,
    provenanceNotes: view.provenanceNotes,
    curriculumLinks: view.curriculumLinks,
    reviews: mappedReviews,
    view,
  };
}
