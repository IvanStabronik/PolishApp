/**
 * Pure YAML DraftLesson → learner LessonDetail mapping (no session / DB).
 */

import { toLearnerExercise } from "@/lib/content/learner-dto";
import type { DraftLesson, DraftModule } from "@/lib/content/types";
import type { LessonDetail } from "@/lib/mocks/content";
import type { LearnerL1, UiLocale } from "@/lib/enums";
import {
  localizeSpeakingPrompt,
  localizeStepTitle,
} from "@/lib/content/step-title-locale";

/**
 * Expand YAML lesson steps into structured learner steps + exercises.
 * Practice/mini_check steps expand to one player step per exercise.
 */
export function draftLessonToDetail(
  mod: DraftModule,
  lesson: DraftLesson,
  l1?: LearnerL1,
  uiLocale?: UiLocale | string | null,
): LessonDetail {
  const byId = new Map(lesson.exercises.map((ex) => [ex.id, ex]));
  const steps: LessonDetail["steps"] = [];
  const note = (notes?: Partial<Record<LearnerL1, string>>) =>
    l1 && notes?.[l1] ? notes[l1] : undefined;
  const titleOf = (titleRu: string) =>
    localizeStepTitle(titleRu, l1, uiLocale);

  for (const step of lesson.steps) {
    if (step.kind === "situation" || step.kind === "result") {
      steps.push({
        id: step.id,
        kind: "theory",
        title: titleOf(step.titleRu),
        body:
          step.kind === "situation"
            ? (step.bodyRu ?? lesson.situation)
            : lesson.objective,
      });
      continue;
    }
    if (step.kind === "dialogue") {
      steps.push({
        id: step.id,
        kind: "dialogue",
        title: titleOf(step.titleRu),
        turns: lesson.dialogue.map((t) => ({
          speaker: t.speaker,
          pl: t.pl,
          ...(t.glossRu.trim() ? { gloss: t.glossRu } : {}),
          ...(t.audioUrl ? { audioUrl: t.audioUrl } : {}),
        })),
      });
      continue;
    }
    if (step.kind === "key_lines") {
      steps.push({
        id: step.id,
        kind: "key_lines",
        title: titleOf(step.titleRu),
        lines: lesson.keyLines.map((k) => ({
          pl: k.pl,
          explanation: k.explanation,
          ...(note(k.l1Notes) ? { l1Note: note(k.l1Notes) } : {}),
          ...(k.audioUrl ? { audioUrl: k.audioUrl } : {}),
        })),
      });
      continue;
    }
    if (step.kind === "speaking_practice") {
      steps.push({
        id: step.id,
        kind: "speaking_practice",
        title: titleOf(step.titleRu),
        ...(step.promptRu
          ? {
              prompt: localizeSpeakingPrompt(step.promptRu, l1, uiLocale),
            }
          : {}),
        lines: [...step.linesPl],
      });
      continue;
    }
    if (step.kind === "pan_pani") {
      steps.push({
        id: step.id,
        kind: "pan_pani",
        title: titleOf(step.titleRu),
        summary: lesson.pragmatics.panPani,
        form: lesson.pragmatics.form,
        examples: lesson.pragmatics.examples,
        ...(note(lesson.pragmatics.l1Notes)
          ? { l1Note: note(lesson.pragmatics.l1Notes) }
          : {}),
      });
      continue;
    }
    if (step.kind === "grammar") {
      steps.push({
        id: step.id,
        kind: "grammar",
        title: titleOf(step.titleRu),
        summary: lesson.grammar.explanation,
        form: lesson.grammar.form,
        meaning: lesson.grammar.meaning,
        use: lesson.grammar.use,
        examples: lesson.grammar.examples,
        ...(note(lesson.grammar.l1Notes)
          ? { l1Note: note(lesson.grammar.l1Notes) }
          : {}),
      });
      continue;
    }
    if (step.kind === "practice" || step.kind === "mini_check") {
      // Use hall step title (Практика / Короткая проверка) — never slice the
      // exercise prompt into an h2 (mid-word truncation + duplicate chrome).
      const sectionTitle = titleOf(step.titleRu);
      for (const exerciseId of step.exerciseIds) {
        const authored = byId.get(exerciseId);
        if (!authored) continue;
        steps.push({
          id: authored.id,
          kind: "exercise",
          title: sectionTitle,
          exercise: toLearnerExercise(authored),
        });
      }
    }
  }

  return {
    id: lesson.id,
    moduleId: mod.id,
    title: lesson.titlePl,
    sortOrder: lesson.sortOrder,
    ...(l1 ? { l1 } : {}),
    steps,
  };
}
