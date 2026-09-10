import type {
  ContentPackage,
  ContentStatus,
  Exercise,
  Lesson,
  Module,
  Provenance,
} from "./schemas";
import { assertKnownCanonicalIds } from "./canonical-registry";

export type ValidationIssue = {
  code:
    | "SCHEMA"
    | "UNKNOWN_CANONICAL_ID"
    | "MISSING_PROVENANCE"
    | "PUBLISHED_WITHOUT_REVIEWER"
    | "AUTHOR_EQUALS_REVIEWER"
    | "PLACEHOLDER_IDENTITY"
    | "FALSE_REVIEWER_ON_DRAFT"
    | "DUPLICATE_ID_VERSION"
    | "REFERENTIAL"
    | "STATUS";
  path: string;
  message: string;
};

export type ValidationResult = {
  ok: boolean;
  issues: ValidationIssue[];
};

function provenanceIssues(
  provenance: Provenance | undefined,
  status: ContentStatus,
  path: string,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!provenance) {
    issues.push({
      code: "MISSING_PROVENANCE",
      path,
      message: "Provenance is required",
    });
    return issues;
  }
  if (!provenance.author_id?.trim()) {
    issues.push({
      code: "MISSING_PROVENANCE",
      path: `${path}.author_id`,
      message: "author_id is required",
    });
  }
  if (!provenance.sources?.length) {
    issues.push({
      code: "MISSING_PROVENANCE",
      path: `${path}.sources`,
      message: "At least one source is required",
    });
  }
  if (!provenance.originality) {
    issues.push({
      code: "MISSING_PROVENANCE",
      path: `${path}.originality`,
      message: "originality is required",
    });
  }

  const author = provenance.author_id?.trim() || "";
  const reviewer = provenance.reviewer_id?.trim() || null;

  if (/placeholder/i.test(author)) {
    issues.push({
      code: "PLACEHOLDER_IDENTITY",
      path: `${path}.author_id`,
      message: 'author_id must not contain "placeholder" (use an honest system or human id)',
    });
  }
  if (reviewer && /placeholder/i.test(reviewer)) {
    issues.push({
      code: "PLACEHOLDER_IDENTITY",
      path: `${path}.reviewer_id`,
      message: 'reviewer_id must not contain "placeholder" (use null until a real review exists)',
    });
  }

  if (status === "DRAFT" && reviewer) {
    issues.push({
      code: "FALSE_REVIEWER_ON_DRAFT",
      path: `${path}.reviewer_id`,
      message: "DRAFT content must not claim a reviewer_id (set reviewer_id to null until reviewed)",
    });
  }

  if (status === "PUBLISHED" && !reviewer) {
    issues.push({
      code: "PUBLISHED_WITHOUT_REVIEWER",
      path: `${path}.reviewer_id`,
      message: "PUBLISHED content requires an independent reviewer_id",
    });
  }
  if (reviewer && reviewer === provenance.author_id) {
    issues.push({
      code: "AUTHOR_EQUALS_REVIEWER",
      path: `${path}.reviewer_id`,
      message: "reviewer_id must differ from author_id (no self-approve)",
    });
  }
  return issues;
}

function collectCurriculumRefs(pkg: ContentPackage): string[] {
  const refs = new Set<string>();
  const addLinks = (links: Module["curriculum_links"] | Lesson["curriculum_links"]) => {
    for (const id of links.scenarios) refs.add(id);
    for (const id of links.functions) refs.add(id);
    for (const id of links.lex_bundles) refs.add(id);
    for (const id of links.concepts) refs.add(id);
  };
  addLinks(pkg.module.curriculum_links);
  for (const lesson of pkg.lessons) {
    addLinks(lesson.curriculum_links);
    for (const id of lesson.pan_pani.concept_ids) refs.add(id);
    for (const gp of lesson.grammar_points) {
      for (const id of gp.concept_ids) refs.add(id);
    }
    for (const ex of lesson.exercises) {
      for (const id of ex.concept_ids) refs.add(id);
      for (const id of ex.function_ids ?? []) refs.add(id);
      for (const id of ex.lex_bundle_ids ?? []) refs.add(id);
    }
    for (const id of lesson.mini_check.concept_ids) refs.add(id);
    for (const id of lesson.result_metadata.linked_function_ids) refs.add(id);
    for (const id of lesson.result_metadata.linked_concept_ids) refs.add(id);
  }
  return [...refs];
}

function exerciseShapeIssues(ex: Exercise, path: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (ex.type === "single_choice" || ex.type === "listening") {
    const ids = new Set(ex.options.map((o) => o.id));
    if (!ids.has(ex.correct_option_id)) {
      issues.push({
        code: "REFERENTIAL",
        path: `${path}.correct_option_id`,
        message: `correct_option_id "${ex.correct_option_id}" not in options`,
      });
    }
  }
  if (ex.type === "multiple_choice") {
    const ids = new Set(ex.options.map((o) => o.id));
    for (const cid of ex.correct_option_ids) {
      if (!ids.has(cid)) {
        issues.push({
          code: "REFERENTIAL",
          path: `${path}.correct_option_ids`,
          message: `correct option "${cid}" not in options`,
        });
      }
    }
  }
  if (ex.type === "ordering") {
    const ids = new Set(ex.items.map((i) => i.id));
    if (ex.correct_order.length !== ex.items.length) {
      issues.push({
        code: "REFERENTIAL",
        path: `${path}.correct_order`,
        message: "correct_order length must equal items length",
      });
    }
    for (const id of ex.correct_order) {
      if (!ids.has(id)) {
        issues.push({
          code: "REFERENTIAL",
          path: `${path}.correct_order`,
          message: `order id "${id}" not in items`,
        });
      }
    }
  }
  if (ex.type === "gap_fill") {
    for (const gap of ex.gaps) {
      if (!ex.prompt.includes(`{{${gap.id}}}`) && !ex.prompt.includes(`[${gap.id}]`)) {
        // Soft structural hint — prompt should reference the gap
        issues.push({
          code: "REFERENTIAL",
          path: `${path}.gaps.${gap.id}`,
          message: `prompt should include {{${gap.id}}} or [${gap.id}] marker`,
        });
      }
    }
  }
  return issues;
}

/**
 * Semantic validation beyond Zod parse.
 * Unknown curriculum IDs, provenance, publish gates, duplicate (id, version).
 */
export function validateContentPackage(
  pkg: ContentPackage,
  canonicalIds: Set<string>,
): ValidationResult {
  const issues: ValidationIssue[] = [];

  issues.push(
    ...provenanceIssues(pkg.module.provenance, pkg.module.status, "module.provenance"),
  );

  if (pkg.module.status === "PUBLISHED" && pkg.module.internal_preview_only) {
    issues.push({
      code: "STATUS",
      path: "module.internal_preview_only",
      message: "internal_preview_only module cannot be PUBLISHED",
    });
  }

  const versionKeys = new Map<string, string>();
  const remember = (canonicalId: string, version: number, path: string) => {
    const key = `${canonicalId}::${version}`;
    const prev = versionKeys.get(key);
    if (prev) {
      issues.push({
        code: "DUPLICATE_ID_VERSION",
        path,
        message: `Duplicate canonical_id+version ${key} (also at ${prev})`,
      });
    } else {
      versionKeys.set(key, path);
    }
  };

  remember(pkg.module.canonical_id, pkg.module.version, "module");

  for (const [li, lesson] of pkg.lessons.entries()) {
    const lpath = `lessons[${li}]`;
    issues.push(
      ...provenanceIssues(lesson.provenance, lesson.status, `${lpath}.provenance`),
    );
    remember(lesson.canonical_id, lesson.version, lpath);

    const exerciseIdSet = new Set(lesson.exercises.map((e) => e.id));
    for (const [ei, ex] of lesson.exercises.entries()) {
      const epath = `${lpath}.exercises[${ei}]`;
      issues.push(...provenanceIssues(ex.provenance, ex.status, `${epath}.provenance`));
      remember(ex.canonical_id, ex.version, epath);
      issues.push(...exerciseShapeIssues(ex, epath));
    }

    for (const step of lesson.steps) {
      if (step.kind === "practice" || step.kind === "mini_check") {
        for (const eid of step.exercise_ids) {
          if (!exerciseIdSet.has(eid)) {
            issues.push({
              code: "REFERENTIAL",
              path: `${lpath}.steps.${step.id}`,
              message: `Unknown exercise id "${eid}"`,
            });
          }
        }
      }
      if (step.kind === "grammar") {
        const ok = lesson.grammar_points.some((g) => g.id === step.grammar_point_id);
        if (!ok) {
          issues.push({
            code: "REFERENTIAL",
            path: `${lpath}.steps.${step.id}`,
            message: `Unknown grammar_point_id "${step.grammar_point_id}"`,
          });
        }
      }
    }

    for (const eid of lesson.mini_check.exercise_ids) {
      if (!exerciseIdSet.has(eid)) {
        issues.push({
          code: "REFERENTIAL",
          path: `${lpath}.mini_check`,
          message: `Unknown mini_check exercise id "${eid}"`,
        });
      }
    }
  }

  const unknown = assertKnownCanonicalIds(collectCurriculumRefs(pkg), canonicalIds);
  for (const id of unknown) {
    issues.push({
      code: "UNKNOWN_CANONICAL_ID",
      path: "curriculum_links",
      message: `Unknown canonical curriculum id: ${id}`,
    });
  }

  return { ok: issues.length === 0, issues };
}
