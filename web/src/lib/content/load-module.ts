import fs from "node:fs";
import path from "node:path";
import type { ContentStatus, LearnerL1, UserRole } from "@/lib/enums";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import {
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

function resolveModulesRoot(): string {
  const candidates = [
    path.resolve(process.cwd(), "..", "content", "a1", "modules"),
    path.resolve(process.cwd(), "content", "a1", "modules"),
    path.resolve(process.cwd(), "..", "..", "content", "a1", "modules"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  try {
    return path.join(resolveContentRoot(process.cwd()), "content", "a1", "modules");
  } catch {
    throw new Error(`Modules root not found. Tried:\n${candidates.join("\n")}`);
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

function packageToDraftModule(pkg: ContentPackage, hallIndex: number): DraftModule {
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
    hallLabel: `Зал ${hallIndex} · ${mod.working_title}`,
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

let cache: DraftModule[] | null = null;

export function loadAllModulesFromYaml(): DraftModule[] {
  if (cache) return cache;
  const root = resolveModulesRoot();
  const dirs = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const modules: DraftModule[] = [];
  let hall = 1;
  for (const dir of dirs) {
    const moduleDir = path.join(root, dir);
    if (!fs.existsSync(path.join(moduleDir, "module.yaml"))) continue;
    const result = loadModulePackage(moduleDir);
    if (!result.package) continue;
    modules.push(packageToDraftModule(result.package, hall));
    hall += 1;
  }
  cache = modules;
  return modules;
}

/** @deprecated Prefer loadAllModulesFromYaml */
export function loadDraftModuleFromYaml(): DraftModule {
  const all = loadAllModulesFromYaml();
  const first = all[0];
  if (!first) throw new Error("No modules found under content/a1/modules");
  return first;
}

export type ContentAccessContext = {
  roles?: readonly UserRole[];
  email?: string | null;
  /** When omitted, uses isPrivateAlphaPreviewEnv(). */
  isPreviewEnv?: boolean;
};

function allowDraft(ctx?: ContentAccessContext): boolean {
  return canAccessDraftContent({
    roles: ctx?.roles ?? [],
    email: ctx?.email,
    isPreviewEnv: ctx?.isPreviewEnv ?? isPrivateAlphaPreviewEnv(),
  });
}

function findModuleRaw(moduleId: string): DraftModule | null {
  return (
    loadAllModulesFromYaml().find((m) => {
      const aliases = new Set([m.id, `mod-${m.id}`, m.id.toUpperCase()]);
      if (m.id === "pierwsze-spotkanie") {
        aliases.add("mod-pierwsze-spotkanie");
        aliases.add("MOD-A1-PIERWSZE-SPOTKANIE");
      }
      return aliases.has(moduleId) || m.id === moduleId;
    }) ?? null
  );
}

/** Resolve module without visibility gate (for 403 vs 404 authorization). */
export function peekModuleById(moduleId: string): DraftModule | null {
  return findModuleRaw(moduleId);
}

export function listPreviewModules(ctx?: ContentAccessContext): DraftModule[] {
  return loadAllModulesFromYaml().filter((mod) => {
    if (mod.status === "PUBLISHED") return true;
    if (isInternalPreview(mod.status)) return allowDraft(ctx);
    return false;
  });
}

export function getModuleById(
  moduleId: string,
  ctx?: ContentAccessContext,
): DraftModule | null {
  const mod = findModuleRaw(moduleId);
  if (!mod) return null;
  if (isInternalPreview(mod.status) && !allowDraft(ctx)) return null;
  return mod;
}

export function getExercise(
  moduleId: string,
  exerciseId: string,
  ctx?: ContentAccessContext,
): ModuleExercise | null {
  const mod = getModuleById(moduleId, ctx);
  if (!mod) return null;
  return (
    mod.exercises.find(
      (ex) => ex.id === exerciseId || ex.canonicalId === exerciseId,
    ) ?? null
  );
}

export function getModuleExerciseIds(
  moduleId: string,
  ctx?: ContentAccessContext,
): string[] {
  const mod = getModuleById(moduleId, ctx);
  if (!mod) return [];
  return mod.exercises.map((ex) => ex.id);
}

export function isInternalPreview(status: ContentStatus): boolean {
  return status === "DRAFT" || status === "IN_REVIEW" || status === "APPROVED";
}
