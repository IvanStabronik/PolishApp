import { describe, expect, it } from "vitest";
import {
  L1NotesSchema,
  ModuleSchema,
  ProvenanceSchema,
  type Module,
} from "@/modules/content/schemas";
import { validateContentPackage } from "@/modules/content/validate-package";
import {
  assertAuthorNotReviewer,
  assertTransition,
  canTransition,
  isContentVisibleToLearner,
  isLearnerVisible,
} from "@/modules/content/lifecycle";

const l1Notes = {
  ukr: "Нотатка ukr",
  rus: "Заметка rus",
  bel: "Нататка bel",
};

function baseModule(overrides: Partial<Module> = {}): Module {
  return ModuleSchema.parse({
    kind: "module",
    canonical_id: "MOD-A1-PIERWSZE-SPOTKANIE",
    slug: "pierwsze-spotkanie",
    version: 1,
    status: "DRAFT",
    level: "A1",
    title_pl: "Pierwsze spotkanie",
    working_title: "Pierwsze spotkanie",
    situation_ru: "Первая встреча",
    objective_ru: "Представиться и поприветствовать",
    curriculum_links: {
      scenarios: ["SCN-A1-EVERYDAY-01"],
      functions: ["FN-A1-IDENTIFY-01", "FN-A1-GREET-01"],
      lex_bundles: ["LEX-A1-IDENTITY"],
      concepts: ["GR-CAS-NOM-01", "PRAG-PAN-01"],
    },
    lesson_files: ["lessons/01-powitanie-i-przedstawienie.yaml"],
    provenance: {
      originality: "created_for_product",
      author_id: "author-1",
      sources: ["original"],
      ai_assisted: false,
    },
    visibility: "internal_preview_only",
    internal_preview_only: true,
    ...overrides,
  });
}

describe("content schema", () => {
  it("accepts a valid DRAFT module", () => {
    const mod = baseModule();
    expect(mod.status).toBe("DRAFT");
    expect(mod.internal_preview_only).toBe(true);
  });

  it("requires separate L1 notes (ukr/rus/bel)", () => {
    expect(() =>
      L1NotesSchema.parse({ ukr: "ok", rus: "ok" }),
    ).toThrow();
    expect(L1NotesSchema.parse(l1Notes)).toEqual(l1Notes);
  });

  it("flags PUBLISHED without independent reviewer", () => {
    const mod = baseModule({
      status: "PUBLISHED",
      internal_preview_only: false,
      visibility: "learner",
      provenance: {
        originality: "created_for_product",
        author_id: "author-1",
        sources: ["original"],
        ai_assisted: false,
      },
    });
    const result = validateContentPackage(
      { module: mod, lessons: [] },
      new Set([
        "SCN-A1-EVERYDAY-01",
        "FN-A1-IDENTIFY-01",
        "FN-A1-GREET-01",
        "LEX-A1-IDENTITY",
        "GR-CAS-NOM-01",
        "PRAG-PAN-01",
      ]),
    );
    // lessons.min(1) is schema-level; semantic gate still catches reviewer
    expect(
      result.issues.some((i) => i.code === "PUBLISHED_WITHOUT_REVIEWER"),
    ).toBe(true);
  });

  it("flags author === reviewer", () => {
    const provenance = ProvenanceSchema.parse({
      originality: "created_for_product",
      author_id: "same-person",
      reviewer_id: "same-person",
      sources: ["original"],
      ai_assisted: false,
    });
    const mod = baseModule({
      status: "APPROVED",
      provenance,
    });
    const result = validateContentPackage(
      { module: mod, lessons: [] },
      new Set([
        "SCN-A1-EVERYDAY-01",
        "FN-A1-IDENTIFY-01",
        "FN-A1-GREET-01",
        "LEX-A1-IDENTITY",
        "GR-CAS-NOM-01",
        "PRAG-PAN-01",
      ]),
    );
    expect(
      result.issues.some((i) => i.code === "AUTHOR_EQUALS_REVIEWER"),
    ).toBe(true);
  });

  it("flags placeholder author_id / reviewer_id", () => {
    const mod = baseModule({
      provenance: {
        originality: "created_for_product",
        author_id: "author-placeholder-ola-nowak",
        reviewer_id: "reviewer-placeholder-igor-savchuk",
        sources: ["original"],
        ai_assisted: true,
      },
    });
    const result = validateContentPackage(
      { module: mod, lessons: [] },
      new Set([
        "SCN-A1-EVERYDAY-01",
        "FN-A1-IDENTIFY-01",
        "FN-A1-GREET-01",
        "LEX-A1-IDENTITY",
        "GR-CAS-NOM-01",
        "PRAG-PAN-01",
      ]),
    );
    expect(
      result.issues.filter((i) => i.code === "PLACEHOLDER_IDENTITY"),
    ).toHaveLength(2);
  });

  it("flags non-null reviewer_id on DRAFT", () => {
    const mod = baseModule({
      status: "DRAFT",
      provenance: {
        originality: "created_for_product",
        author_id: "system:ai-draft-slowarium",
        reviewer_id: "human-reviewer-1",
        sources: ["original"],
        ai_assisted: true,
      },
    });
    const result = validateContentPackage(
      { module: mod, lessons: [] },
      new Set([
        "SCN-A1-EVERYDAY-01",
        "FN-A1-IDENTIFY-01",
        "FN-A1-GREET-01",
        "LEX-A1-IDENTITY",
        "GR-CAS-NOM-01",
        "PRAG-PAN-01",
      ]),
    );
    expect(
      result.issues.some((i) => i.code === "FALSE_REVIEWER_ON_DRAFT"),
    ).toBe(true);
  });
});

describe("author ≠ reviewer helper", () => {
  it("throws when ids match", () => {
    expect(() => assertAuthorNotReviewer("u1", "u1")).toThrow(/Self-review/);
  });

  it("allows distinct ids", () => {
    expect(() => assertAuthorNotReviewer("u1", "u2")).not.toThrow();
  });
});

describe("content lifecycle", () => {
  it("allows DRAFT → IN_REVIEW and forbids DRAFT → PUBLISHED", () => {
    expect(canTransition("DRAFT", "IN_REVIEW")).toBe(true);
    expect(canTransition("DRAFT", "PUBLISHED")).toBe(false);
    expect(() => assertTransition("DRAFT", "PUBLISHED")).toThrow(
      /Illegal content lifecycle/,
    );
  });

  it("allows IN_REVIEW → APPROVED → PUBLISHED", () => {
    expect(canTransition("IN_REVIEW", "APPROVED")).toBe(true);
    expect(canTransition("APPROVED", "PUBLISHED")).toBe(true);
  });

  it("marks only PUBLISHED as learner-visible", () => {
    expect(isLearnerVisible("DRAFT")).toBe(false);
    expect(isLearnerVisible("APPROVED")).toBe(false);
    expect(isLearnerVisible("PUBLISHED")).toBe(true);
  });

  it("allows DRAFT in DEMO_PREVIEW without treating it as published", () => {
    expect(isContentVisibleToLearner("DRAFT", { demoPreview: true })).toBe(
      true,
    );
    expect(isLearnerVisible("DRAFT")).toBe(false);
  });
});
