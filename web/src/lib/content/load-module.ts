import fs from "node:fs";
import path from "node:path";
import { isDemoPreviewEnabled } from "@/lib/demo";
import type { ContentStatus, LearnerL1 } from "@/lib/enums";
import {
  defaultModuleDir,
  loadModulePackage,
  resolveContentRoot,
} from "@/modules/content/load-package";
import type { ContentPackage, Exercise as PackageExercise } from "@/modules/content/schemas";
import type {
  DraftModule,
  ModuleExercise,
  SingleChoiceExercise,
  MultipleChoiceExercise,
  GapFillExercise,
  OrderingExercise,
} from "./types";

function resolveModuleDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "..", "content", "a1", "modules", "pierwsze-spotkanie"),
    path.resolve(process.cwd(), "content", "a1", "modules", "pierwsze-spotkanie"),
    path.resolve(process.cwd(), "..", "..", "content", "a1", "modules", "pierwsze-spotkanie"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, "module.yaml"))) return candidate;
  }
  try {
    return defaultModuleDir(resolveContentRoot(process.cwd()));
  } catch {
    throw new Error(
      `Module YAML not found. Tried:\n${candidates.join("\n")}`,
    );
  }
}

function mapExercise(ex: PackageExercise): ModuleExercise {
  const feedback = {
    explanation: ex.feedback.correct,
    l1Notes: ex.feedback.l1,
    conceptId: ex.concept_ids[0],
    evidenceWeight: ex.mini_check ? 1 : 0.6,
  };
  const base = {
    id: ex.id,
    canonicalId: ex.canonical_id,
    prompt: ex.prompt,
    conceptIds: ex.concept_ids,
    feedback,
    retryPolicy: "unlimited",
  };

  switch (ex.type) {
    case "single_choice": {
      const options = ex.options.map((o) => o.text);
      const correctIndex = Math.max(
        0,
        ex.options.findIndex((o) => o.id === ex.correct_option_id),
      );
      return {
        ...base,
        type: "single_choice",
        options,
        correctIndex,
      } satisfies SingleChoiceExercise;
    }
    case "multiple_choice": {
      const options = ex.options.map((o) => o.text);
      const correctIndices = ex.correct_option_ids
        .map((id) => ex.options.findIndex((o) => o.id === id))
        .filter((i) => i >= 0)
        .sort((a, b) => a - b);
      return {
        ...base,
        type: "multiple_choice",
        options,
        correctIndices,
      } satisfies MultipleChoiceExercise;
    }
    case "gap_fill": {
      const gaps = ex.gaps.map((g) => g.accepted_answers[0] ?? "");
      let textWithGaps = ex.prompt;
      for (const gap of ex.gaps) {
        textWithGaps = textWithGaps.replaceAll(`{{${gap.id}}}`, "___");
      }
      return {
        ...base,
        type: "gap_fill",
        prompt: ex.prompt,
        textWithGaps,
        gaps,
        feedback: {
          ...feedback,
          explanation: `${ex.feedback.correct} ${ex.feedback.incorrect}`,
        },
      } satisfies GapFillExercise;
    }
    case "ordering": {
      const items = ex.items.map((i) => i.text);
      const correctOrder = ex.correct_order.map((id) =>
        Math.max(
          0,
          ex.items.findIndex((i) => i.id === id),
        ),
      );
      return {
        ...base,
        type: "ordering",
        items,
        correctOrder,
      } satisfies OrderingExercise;
    }
  }
}

function packageToDraftModule(pkg: ContentPackage): DraftModule {
  const mod = pkg.module;
  const lesson = pkg.lessons[0]!;
  const exercises = lesson.exercises.map(mapExercise);
  const miniIds = new Set(lesson.mini_check.exercise_ids);

  return {
    id: mod.slug,
    version: String(mod.version),
    title: mod.working_title,
    titlePl: mod.title_pl,
    level: mod.level,
    status: mod.status,
    hallLabel: "Зал 1 · Знакомство",
    objective: mod.objective_ru,
    situation: mod.situation_ru,
    uiLocales: ["ru", "uk", "pl"],
    l1Applicability: ["ukr", "rus", "bel"] as LearnerL1[],
    dialogue: lesson.dialogue.turns.map((t) => ({
      speaker: t.speaker,
      pl: t.text_pl,
      glossRu: "",
    })),
    keyLines: lesson.key_lines.map((k) => ({
      pl: k.text_pl,
      explanation: k.explanation_ru,
    })),
    pragmatics: {
      panPani: lesson.pan_pani.summary_ru,
      l1Notes: lesson.pan_pani.l1_notes,
    },
    grammar: {
      title: lesson.grammar_points[0]?.title_pl ?? "Grammar",
      explanation: lesson.grammar_points[0]?.summary_ru ?? "",
      examples: lesson.grammar_points[0]?.examples_pl ?? [],
      conceptId: lesson.grammar_points[0]?.concept_ids[0] ?? "",
      l1Notes: lesson.grammar_points[0]?.l1_notes,
    },
    exercises,
    miniCheckExerciseIds: [...miniIds],
    provenance: {
      authorId: mod.provenance.author_id,
      authorName: mod.provenance.author_id,
      createdAt: new Date().toISOString(),
      sources: mod.provenance.sources,
      notes: mod.provenance.notes,
    },
  };
}

let cached: DraftModule | null = null;

export function loadDraftModuleFromYaml(): DraftModule {
  if (cached) return cached;
  const moduleDir = resolveModuleDir();
  const result = loadModulePackage(moduleDir);
  // Learner fallback tolerates semantic warnings if the package parsed.
  if (!result.package) {
    const detail = result.issues.map((i) => `${i.path}: ${i.message}`).join("\n");
    throw new Error(`Failed to load module package at ${moduleDir}\n${detail}`);
  }
  cached = packageToDraftModule(result.package);
  return cached;
}

export function listPreviewModules(): DraftModule[] {
  const mod = loadDraftModuleFromYaml();
  if (mod.status === "PUBLISHED") return [mod];
  if (mod.status === "DRAFT" && isDemoPreviewEnabled()) return [mod];
  return [];
}

export function getModuleById(moduleId: string): DraftModule | null {
  const mod = loadDraftModuleFromYaml();
  const aliases = new Set([
    mod.id,
    "mod-pierwsze-spotkanie",
    "MOD-A1-PIERWSZE-SPOTKANIE",
  ]);
  if (!aliases.has(moduleId)) return null;
  if (mod.status === "DRAFT" && !isDemoPreviewEnabled()) return null;
  return mod;
}

export function getExercise(
  moduleId: string,
  exerciseId: string,
): ModuleExercise | null {
  const mod = getModuleById(moduleId);
  if (!mod) return null;
  return mod.exercises.find((ex) => ex.id === exerciseId) ?? null;
}

export function getModuleExerciseIds(moduleId: string): string[] {
  const mod = getModuleById(moduleId);
  if (!mod) return [];
  return mod.exercises.map((ex) => ex.id);
}

export function isInternalPreview(status: ContentStatus): boolean {
  return status === "DRAFT" || status === "IN_REVIEW" || status === "APPROVED";
}
