/**
 * Pure YAML DraftLesson → learner LessonDetail mapping (no session / DB).
 */

import { toLearnerExercise } from "@/lib/content/learner-dto";
import type { DraftLesson, DraftModule } from "@/lib/content/types";
import type { LessonDetail } from "@/lib/mocks/content";
import type { LearnerL1 } from "@/lib/enums";

/**
 * Expand YAML lesson steps into structured learner steps + exercises.
 * Practice/mini_check steps expand to one player step per exercise.
 */
export function draftLessonToDetail(
  mod: DraftModule,
  lesson: DraftLesson,
  l1?: LearnerL1,
): LessonDetail {
  const byId = new Map(lesson.exercises.map((ex) => [ex.id, ex]));
  const steps: LessonDetail["steps"] = [];
  const note = (notes?: Partial<Record<LearnerL1, string>>) =>
    l1 && notes?.[l1] ? notes[l1] : undefined;

  for (const step of lesson.steps) {
    if (step.kind === "situation" || step.kind === "result") {
      steps.push({
        id: step.id,
        kind: "theory",
        title: step.titleRu,
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
        title: step.titleRu,
        turns: lesson.dialogue.map((t) => ({
          speaker: t.speaker,
          pl: t.pl,
          ...(t.glossRu.trim() ? { gloss: t.glossRu } : {}),
        })),
      });
      continue;
    }
    if (step.kind === "key_lines") {
      steps.push({
        id: step.id,
        kind: "key_lines",
        title: step.titleRu,
        lines: lesson.keyLines.map((k) => ({
          pl: k.pl,
          explanation: k.explanation,
          ...(note(k.l1Notes) ? { l1Note: note(k.l1Notes) } : {}),
        })),
      });
      continue;
    }
    if (step.kind === "pan_pani") {
      steps.push({
        id: step.id,
        kind: "pan_pani",
        title: step.titleRu,
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
        title: step.titleRu,
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
      for (const exerciseId of step.exerciseIds) {
        const authored = byId.get(exerciseId);
        if (!authored) continue;
        steps.push({
          id: authored.id,
          kind: "exercise",
          title: authored.prompt.slice(0, 64),
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
