import { describe, expect, it } from "vitest";
import {
  applyReviewVerdict,
  attemptPublish,
  canAccessAuthorArea,
  canAccessReviewerArea,
  submitForReview,
  type ContentVersionView,
} from "@/modules/content/review-workflow";

const version: ContentVersionView = {
  id: "v1",
  moduleId: "pierwsze-spotkanie",
  title: "Pierwsze spotkanie",
  status: "DRAFT",
  authorId: "author-1",
  version: 1,
  provenanceNotes: "DRAFT internal",
  curriculumLinks: ["FN-A1-GREET-01"],
};

describe("review workflow auth", () => {
  it("gates author and reviewer areas by role", () => {
    expect(canAccessAuthorArea(["learner"])).toBe(false);
    expect(canAccessAuthorArea(["author"])).toBe(true);
    expect(canAccessReviewerArea(["previewer"])).toBe(false);
    expect(canAccessReviewerArea(["reviewer"])).toBe(true);
  });

  it("lets author submit DRAFT for review", () => {
    const res = submitForReview({
      version,
      actorId: "author-1",
      actorRoles: ["author"],
    });
    expect(res.ok).toBe(true);
    expect(res.to).toBe("IN_REVIEW");
  });

  it("blocks author from approving own version", () => {
    const res = applyReviewVerdict({
      version: { ...version, status: "IN_REVIEW" },
      actorId: "author-1",
      actorRoles: ["author", "reviewer"],
      verdict: "approve",
    });
    expect(res.ok).toBe(false);
    expect(res.error).toBe("self_review_prohibited");
  });

  it("allows independent reviewer to request changes or approve", () => {
    const changes = applyReviewVerdict({
      version: { ...version, status: "IN_REVIEW" },
      actorId: "reviewer-1",
      actorRoles: ["reviewer"],
      verdict: "request_changes",
      comment: "Fix pan/pani note",
    });
    expect(changes.ok).toBe(true);
    expect(changes.to).toBe("REJECTED");

    const approved = applyReviewVerdict({
      version: { ...version, status: "IN_REVIEW" },
      actorId: "reviewer-1",
      actorRoles: ["reviewer"],
      verdict: "approve",
    });
    expect(approved.ok).toBe(true);
    expect(approved.to).toBe("APPROVED");
  });

  it("blocks PUBLISHED while DEC-016 gates are open", () => {
    const res = attemptPublish({
      version: { ...version, status: "APPROVED" },
      actorId: "admin-1",
      actorRoles: ["admin"],
    });
    expect(res.ok).toBe(false);
    expect(res.error).toBe("publication_gates_open");
  });

  it("denies ordinary learner/previewer review actions", () => {
    expect(
      submitForReview({
        version,
        actorId: "learner-1",
        actorRoles: ["learner", "previewer"],
      }).ok,
    ).toBe(false);
    expect(
      applyReviewVerdict({
        version: { ...version, status: "IN_REVIEW" },
        actorId: "learner-1",
        actorRoles: ["learner", "previewer"],
        verdict: "approve",
      }).ok,
    ).toBe(false);
  });
});
