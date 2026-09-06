import { z } from "zod";

/** Content lifecycle (ADR-004 / content-pipeline). Direct DRAFT → PUBLISHED is forbidden at process level. */
export const ContentStatusSchema = z.enum([
  "DRAFT",
  "IN_REVIEW",
  "APPROVED",
  "PUBLISHED",
  "REJECTED",
  "ARCHIVED",
]);
export type ContentStatus = z.infer<typeof ContentStatusSchema>;

export const OriginalitySchema = z.enum([
  "created_for_product",
  "common_knowledge",
  "standard_quote",
  "licensed_third_party",
]);

/** Provenance is mandatory for every authored unit (CNT-002 / FUN-174). */
export const ProvenanceSchema = z.object({
  originality: OriginalitySchema,
  author_id: z.string().min(1),
  /** Independent reviewer; required for PUBLISHED (CNT-004). Must ≠ author_id. */
  reviewer_id: z.string().min(1).nullable().optional(),
  sources: z.array(z.string().min(1)).min(1),
  ai_assisted: z.boolean().default(false),
  notes: z.string().optional(),
});
export type Provenance = z.infer<typeof ProvenanceSchema>;

/**
 * L1 methodological notes — separate keys, no silent fallback (ADR-005).
 * Content keys and profile l1 both use ukr/rus/bel (enums.ts).
 */
export const L1NotesSchema = z.object({
  ukr: z.string().min(1),
  rus: z.string().min(1),
  bel: z.string().min(1),
});
export type L1Notes = z.infer<typeof L1NotesSchema>;

export const FeedbackSchema = z.object({
  correct: z.string().min(1),
  incorrect: z.string().min(1),
  hint: z.string().optional(),
  /** Optional L1-specific short explanations after an attempt */
  l1: L1NotesSchema.optional(),
});
export type Feedback = z.infer<typeof FeedbackSchema>;

export const ChoiceOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});

const ExerciseBaseSchema = z.object({
  id: z.string().min(1),
  canonical_id: z.string().min(1),
  version: z.number().int().positive(),
  prompt: z.string().min(1),
  concept_ids: z.array(z.string().min(1)).min(1),
  function_ids: z.array(z.string().min(1)).optional(),
  lex_bundle_ids: z.array(z.string().min(1)).optional(),
  feedback: FeedbackSchema,
  provenance: ProvenanceSchema,
  status: ContentStatusSchema,
  /** Marks item as part of the lesson mini-check */
  mini_check: z.boolean().default(false),
});

export const SingleChoiceExerciseSchema = ExerciseBaseSchema.extend({
  type: z.literal("single_choice"),
  options: z.array(ChoiceOptionSchema).min(2),
  correct_option_id: z.string().min(1),
});

export const MultipleChoiceExerciseSchema = ExerciseBaseSchema.extend({
  type: z.literal("multiple_choice"),
  options: z.array(ChoiceOptionSchema).min(2),
  correct_option_ids: z.array(z.string().min(1)).min(1),
});

export const GapFillSlotSchema = z.object({
  id: z.string().min(1),
  /** Accepted answers (case-insensitive match after normalize) */
  accepted_answers: z.array(z.string().min(1)).min(1),
  placeholder: z.string().optional(),
});

export const GapFillExerciseSchema = ExerciseBaseSchema.extend({
  type: z.literal("gap_fill"),
  /**
   * Prompt may contain `{{gap_id}}` markers.
   * Example: "Nazywam {{się}} Anna."
   */
  gaps: z.array(GapFillSlotSchema).min(1),
});

export const OrderingItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});

export const OrderingExerciseSchema = ExerciseBaseSchema.extend({
  type: z.literal("ordering"),
  items: z.array(OrderingItemSchema).min(2),
  correct_order: z.array(z.string().min(1)).min(2),
});

export const ExerciseSchema = z.discriminatedUnion("type", [
  SingleChoiceExerciseSchema,
  MultipleChoiceExerciseSchema,
  GapFillExerciseSchema,
  OrderingExerciseSchema,
]);
export type Exercise = z.infer<typeof ExerciseSchema>;
export type ExerciseType = Exercise["type"];

export const DialogueTurnSchema = z.object({
  speaker: z.string().min(1),
  text_pl: z.string().min(1),
});

export const KeyLineSchema = z.object({
  text_pl: z.string().min(1),
  explanation_ru: z.string().min(1),
});

export const GrammarPointSchema = z.object({
  id: z.string().min(1),
  title_pl: z.string().min(1),
  summary_ru: z.string().min(1),
  form: z.string().min(1),
  meaning: z.string().min(1),
  use: z.string().min(1),
  examples_pl: z.array(z.string().min(1)).min(1),
  counterexamples_pl: z.array(z.string().min(1)).optional(),
  concept_ids: z.array(z.string().min(1)).min(1),
  l1_notes: L1NotesSchema,
});

export const PanPaniBlockSchema = z.object({
  summary_ru: z.string().min(1),
  form: z.string().min(1),
  examples_pl: z.array(z.string().min(1)).min(1),
  counterexamples_pl: z.array(z.string().min(1)).optional(),
  concept_ids: z.array(z.string().min(1)).default(["PRAG-PAN-01"]),
  l1_notes: L1NotesSchema,
});

export const LessonStepSchema = z.discriminatedUnion("kind", [
  z.object({
    id: z.string().min(1),
    kind: z.literal("situation"),
    title_ru: z.string().min(1),
    body_ru: z.string().min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("dialogue"),
    title_ru: z.string().min(1),
    dialogue_ref: z.literal("primary"),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("key_lines"),
    title_ru: z.string().min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("pan_pani"),
    title_ru: z.string().min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("grammar"),
    title_ru: z.string().min(1),
    grammar_point_id: z.string().min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("practice"),
    title_ru: z.string().min(1),
    exercise_ids: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("mini_check"),
    title_ru: z.string().min(1),
    exercise_ids: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    id: z.string().min(1),
    kind: z.literal("result"),
    title_ru: z.string().min(1),
  }),
]);
export type LessonStep = z.infer<typeof LessonStepSchema>;

export const MiniCheckSchema = z.object({
  exercise_ids: z.array(z.string().min(1)).min(1),
  pass_threshold: z.number().min(0).max(1),
  concept_ids: z.array(z.string().min(1)).min(1),
});

export const ResultMetadataSchema = z.object({
  title_ru: z.string().min(1),
  success_ru: z.string().min(1),
  retry_ru: z.string().min(1),
  evidence_skill: z.enum([
    "listening",
    "reading",
    "speaking",
    "writing",
    "interaction",
  ]),
  linked_function_ids: z.array(z.string().min(1)).min(1),
  linked_concept_ids: z.array(z.string().min(1)).min(1),
});

export const CurriculumLinksSchema = z.object({
  scenarios: z.array(z.string().min(1)).min(1),
  functions: z.array(z.string().min(1)).min(1),
  lex_bundles: z.array(z.string().min(1)).min(1),
  concepts: z.array(z.string().min(1)).min(1),
});

export const LessonSchema = z.object({
  kind: z.literal("lesson"),
  canonical_id: z.string().min(1),
  slug: z.string().min(1),
  version: z.number().int().positive(),
  status: ContentStatusSchema,
  title_pl: z.string().min(1),
  sort_order: z.number().int().nonnegative(),
  situation_ru: z.string().min(1),
  objective_ru: z.string().min(1),
  curriculum_links: CurriculumLinksSchema,
  dialogue: z.object({
    title_pl: z.string().min(1),
    turns: z.array(DialogueTurnSchema).min(2),
  }),
  key_lines: z.array(KeyLineSchema).min(1),
  pan_pani: PanPaniBlockSchema,
  grammar_points: z.array(GrammarPointSchema).min(1),
  l1_notes: L1NotesSchema,
  steps: z.array(LessonStepSchema).min(1),
  exercises: z.array(ExerciseSchema).min(1),
  mini_check: MiniCheckSchema,
  result_metadata: ResultMetadataSchema,
  provenance: ProvenanceSchema,
  visibility: z.enum(["internal_preview_only", "learner"]).default("internal_preview_only"),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ModuleSchema = z.object({
  kind: z.literal("module"),
  canonical_id: z.string().min(1),
  slug: z.string().min(1),
  version: z.number().int().positive(),
  status: ContentStatusSchema,
  level: z.enum(["A1", "A2", "B1", "B2"]),
  title_pl: z.string().min(1),
  working_title: z.string().min(1),
  situation_ru: z.string().min(1),
  objective_ru: z.string().min(1),
  curriculum_links: CurriculumLinksSchema,
  lesson_files: z.array(z.string().min(1)).min(1),
  provenance: ProvenanceSchema,
  visibility: z.enum(["internal_preview_only", "learner"]).default("internal_preview_only"),
  /** Explicit product flag: DRAFT module is not a published learning path */
  internal_preview_only: z.boolean().default(true),
});
export type Module = z.infer<typeof ModuleSchema>;

export const ContentPackageSchema = z.object({
  module: ModuleSchema,
  lessons: z.array(LessonSchema).min(1),
});
export type ContentPackage = z.infer<typeof ContentPackageSchema>;
