/**
 * Idempotent content import against expected table shapes.
 * Works without a live DB in `--dry-run` mode (default when DATABASE_URL is unset).
 */

import { createHash, randomUUID } from "node:crypto";
import type { ContentPackage, Exercise, Lesson, Module } from "./schemas";
import { answerKeyFromExercise } from "../assessment/evaluate";
import {
  EXPECTED_TABLE_DDL_NOTES,
  type ExpectedContentUnitRow,
  type ExpectedContentVersionRow,
  type ExpectedExerciseRow,
  type ExpectedLessonRow,
  type ExpectedModuleRow,
  type ExpectedPublicationEventRow,
} from "./expected-tables";

export { EXPECTED_TABLE_DDL_NOTES };

export type ImportPlanRow =
  | { table: "content_units"; op: "upsert"; row: ExpectedContentUnitRow }
  | { table: "content_versions"; op: "upsert"; row: ExpectedContentVersionRow }
  | { table: "modules"; op: "upsert"; row: ExpectedModuleRow }
  | { table: "lessons"; op: "upsert"; row: ExpectedLessonRow }
  | { table: "exercises"; op: "upsert"; row: ExpectedExerciseRow }
  | {
      table: "publication_events";
      op: "insert_if_status_changed";
      row: ExpectedPublicationEventRow;
    };

export type ImportPlan = {
  rows: ImportPlanRow[];
  notes: string[];
};

/** Deterministic UUID from canonical key so re-imports stay idempotent without DB lookup. */
export function stableUuid(namespace: string, key: string): string {
  const hash = createHash("sha256")
    .update(`${namespace}:${key}`)
    .digest();
  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function stripAnswerKeyFromExercise(ex: Exercise): Record<string, unknown> {
  const base = { ...ex } as Record<string, unknown>;
  delete base.correct_option_id;
  delete base.correct_option_ids;
  delete base.correct_order;
  if (ex.type === "gap_fill") {
    base.gaps = ex.gaps.map((g) => ({
      id: g.id,
      placeholder: g.placeholder,
      // accepted_answers stay only in answer_key
    }));
  }
  return base;
}

function buildAnswerKey(ex: Exercise): Record<string, unknown> {
  return answerKeyFromExercise(ex) as unknown as Record<string, unknown>;
}

export function buildImportPlan(pkg: ContentPackage): ImportPlan {
  const notes: string[] = [
    "Import is idempotent on (canonical_id) for units/modules/lessons/exercises and (unit_id, version_no) for versions.",
    "Author/reviewer placeholder strings are stored in provenance; FK uuid columns use null until auth users exist.",
    "PUBLISHED gate is enforced at validate time; DRAFT modules never set published_version_id.",
    EXPECTED_TABLE_DDL_NOTES,
  ];
  const rows: ImportPlanRow[] = [];
  const now = new Date();

  const upsertUnitVersion = (
    kind: ExpectedContentUnitRow["kind"],
    canonicalId: string,
    title: string,
    versionNo: number,
    status: Module["status"],
    provenance: Module["provenance"],
    payload: Record<string, unknown>,
  ) => {
    const unitId = stableUuid("content_unit", canonicalId);
    const versionId = stableUuid(
      "content_version",
      `${canonicalId}:${versionNo}`,
    );
    rows.push({
      table: "content_units",
      op: "upsert",
      row: { id: unitId, canonical_id: canonicalId, kind, title },
    });
    rows.push({
      table: "content_versions",
      op: "upsert",
      row: {
        id: versionId,
        unit_id: unitId,
        version_no: versionNo,
        status: "DRAFT",
        author_user_id: null,
        provenance: provenance as unknown as Record<string, unknown>,
        payload,
        created_at: now,
      },
    });
    rows.push({
      table: "publication_events",
      op: "insert_if_status_changed",
      row: {
        id: randomUUID(),
        content_version_id: versionId,
        actor_user_id: null,
        from_status: null,
        to_status: "DRAFT",
        created_at: now,
      },
    });
    return { unitId, versionId };
  };

  const mod = pkg.module;
  const { versionId: moduleVersionId } = upsertUnitVersion(
    "module",
    mod.canonical_id,
    mod.title_pl,
    mod.version,
    mod.status,
    mod.provenance,
    {
      slug: mod.slug,
      level: mod.level,
      situation_ru: mod.situation_ru,
      objective_ru: mod.objective_ru,
      curriculum_links: mod.curriculum_links,
      visibility: mod.visibility,
      internal_preview_only: mod.internal_preview_only,
    },
  );

  const moduleRowId = stableUuid("module", mod.canonical_id);
  rows.push({
    table: "modules",
    op: "upsert",
    row: {
      id: moduleRowId,
      canonical_id: mod.canonical_id,
      published_version_id: null,
      working_title: mod.working_title,
      content_version_id: moduleVersionId,
    },
  });

  for (const lesson of pkg.lessons) {
    const lessonPayload = buildLessonPayload(lesson);
    const { versionId: lessonVersionId } = upsertUnitVersion(
      "lesson",
      lesson.canonical_id,
      lesson.title_pl,
      lesson.version,
      lesson.status,
      lesson.provenance,
      lessonPayload,
    );
    const lessonRowId = stableUuid("lesson", lesson.canonical_id);
    rows.push({
      table: "lessons",
      op: "upsert",
      row: {
        id: lessonRowId,
        module_id: moduleRowId,
        canonical_id: lesson.canonical_id,
        sort_order: lesson.sort_order,
        content_version_id: lessonVersionId,
      },
    });

    for (const ex of lesson.exercises) {
      const { versionId: exVersionId } = upsertUnitVersion(
        "exercise",
        ex.canonical_id,
        ex.prompt.slice(0, 120),
        ex.version,
        ex.status,
        ex.provenance,
        stripAnswerKeyFromExercise(ex),
      );
      rows.push({
        table: "exercises",
        op: "upsert",
        row: {
          id: stableUuid("exercise", ex.canonical_id),
          lesson_id: lessonRowId,
          canonical_id: ex.canonical_id,
          exercise_type: ex.type,
          content_version_id: exVersionId,
          answer_key: buildAnswerKey(ex),
        },
      });
    }
  }

  return { rows, notes };
}

function buildLessonPayload(lesson: Lesson): Record<string, unknown> {
  return {
    slug: lesson.slug,
    situation_ru: lesson.situation_ru,
    objective_ru: lesson.objective_ru,
    curriculum_links: lesson.curriculum_links,
    dialogue: lesson.dialogue,
    key_lines: lesson.key_lines,
    pan_pani: lesson.pan_pani,
    grammar_points: lesson.grammar_points,
    l1_notes: lesson.l1_notes,
    steps: lesson.steps,
    mini_check: lesson.mini_check,
    result_metadata: lesson.result_metadata,
    visibility: lesson.visibility,
    exercise_ids: lesson.exercises.map((e) => e.id),
  };
}

export type DbExecutor = {
  /**
   * Execute parameterized SQL. Implementations may wrap postgres.js / drizzle.
   */
  execute: (sql: string, params: unknown[]) => Promise<void>;
};

/**
 * Apply plan with upsert SQL matching expected shapes.
 * No-op if executor is null (dry-run).
 */
export async function applyImportPlan(
  plan: ImportPlan,
  executor: DbExecutor | null,
): Promise<{ applied: number; dryRun: boolean }> {
  if (!executor) {
    return { applied: 0, dryRun: true };
  }

  let applied = 0;
  for (const item of plan.rows) {
    if (item.table === "content_units") {
      await executor.execute(
        `insert into content_units (id, canonical_id, kind, title)
         values ($1, $2, $3, $4)
         on conflict (canonical_id) do update set
           kind = excluded.kind,
           title = excluded.title`,
        [
          item.row.id,
          item.row.canonical_id,
          item.row.kind,
          item.row.title,
        ],
      );
      applied += 1;
    } else if (item.table === "content_versions") {
      await executor.execute(
        `insert into content_versions (
           id, unit_id, version_no, status, author_user_id,
           provenance, payload, created_at
         ) values ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8)
         on conflict (unit_id, version_no) do update set
           status = excluded.status,
           author_user_id = excluded.author_user_id,
           provenance = excluded.provenance,
           payload = excluded.payload`,
        [
          item.row.id,
          item.row.unit_id,
          item.row.version_no,
          item.row.status,
          item.row.author_user_id,
          JSON.stringify(item.row.provenance),
          JSON.stringify(item.row.payload),
          item.row.created_at.toISOString(),
        ],
      );
      applied += 1;
    } else if (item.table === "modules") {
      await executor.execute(
        `insert into modules (
           id, canonical_id, published_version_id, working_title, content_version_id
         ) values ($1,$2,$3,$4,$5)
         on conflict (canonical_id) do update set
           published_version_id = excluded.published_version_id,
           working_title = excluded.working_title,
           content_version_id = excluded.content_version_id`,
        [
          item.row.id,
          item.row.canonical_id,
          item.row.published_version_id,
          item.row.working_title,
          item.row.content_version_id,
        ],
      );
      applied += 1;
    } else if (item.table === "lessons") {
      await executor.execute(
        `insert into lessons (
           id, module_id, canonical_id, sort_order, content_version_id
         ) values ($1,$2,$3,$4,$5)
         on conflict (canonical_id) do update set
           module_id = excluded.module_id,
           sort_order = excluded.sort_order,
           content_version_id = excluded.content_version_id`,
        [
          item.row.id,
          item.row.module_id,
          item.row.canonical_id,
          item.row.sort_order,
          item.row.content_version_id,
        ],
      );
      applied += 1;
    } else if (item.table === "exercises") {
      await executor.execute(
        `insert into exercises (
           id, lesson_id, canonical_id, exercise_type, content_version_id, answer_key
         ) values ($1,$2,$3,$4,$5,$6::jsonb)
         on conflict (canonical_id) do update set
           lesson_id = excluded.lesson_id,
           exercise_type = excluded.exercise_type,
           content_version_id = excluded.content_version_id,
           answer_key = excluded.answer_key`,
        [
          item.row.id,
          item.row.lesson_id,
          item.row.canonical_id,
          item.row.exercise_type,
          item.row.content_version_id,
          JSON.stringify(item.row.answer_key),
        ],
      );
      applied += 1;
    } else if (item.table === "publication_events") {
      await executor.execute(
        `insert into publication_events (
           id, content_version_id, actor_user_id, from_status, to_status, created_at
         )
         select $1,$2,$3,$4,$5,$6
         where not exists (
           select 1 from publication_events pe
           where pe.content_version_id = $2 and pe.to_status = $5
         )`,
        [
          item.row.id,
          item.row.content_version_id,
          item.row.actor_user_id,
          item.row.from_status,
          item.row.to_status,
          item.row.created_at.toISOString(),
        ],
      );
      applied += 1;
    }
  }

  return { applied, dryRun: false };
}
