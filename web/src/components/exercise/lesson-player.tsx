"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ExercisePlayer } from "@/components/learning/exercise-player";
import type { LessonDetail } from "@/lib/mocks/content";

type LessonPlayerProps = {
  lesson: LessonDetail;
  moduleHref: string;
  preview?: boolean;
};

/**
 * Lesson player: theory + all 4 exercise types via learner-safe DTOs.
 * Attempts go through /api/learning/attempt with real moduleId/lessonId/exerciseId.
 */
export function LessonPlayer({ lesson, moduleHref }: LessonPlayerProps) {
  const t = useTranslations("learn");
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const step = lesson.steps[stepIndex];
  const total = lesson.steps.length;
  const stepLabel = t("stepOf", { current: stepIndex + 1, total });

  function finish(nextScore: { correct: number; total: number }) {
    const params = new URLSearchParams({
      c: String(nextScore.correct),
      n: String(nextScore.total),
      module: lesson.moduleId,
    });
    router.push(`/learn/lessons/${lesson.id}/result?${params.toString()}`);
  }

  function goNext(wasCorrect?: boolean) {
    const nextScore =
      typeof wasCorrect === "boolean"
        ? {
            correct: score.correct + (wasCorrect ? 1 : 0),
            total: score.total + 1,
          }
        : score;
    if (typeof wasCorrect === "boolean") setScore(nextScore);
    if (stepIndex + 1 >= total) {
      finish(nextScore);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  if (!step) return null;

  if (step.kind === "theory") {
    return (
      <section className="prose-narrow" data-testid="lesson-theory-step">
        <p className="m-0 text-sm text-[var(--color-graphite)]">
          {stepLabel} · {t("theory")}
        </p>
        <h1 className="mt-2 font-display text-3xl text-[var(--color-ink)]">
          {step.title}
        </h1>
        <div className="mt-4 whitespace-pre-wrap text-[var(--color-ink-soft)]">
          {step.body}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => goNext()} data-testid="lesson-next-step">
            {t("nextStep")}
          </Button>
          <Button variant="ghost" onClick={() => router.push(moduleHref)}>
            {t("backToModule")}
          </Button>
        </div>
      </section>
    );
  }

  const isLast = stepIndex + 1 >= total;

  return (
    <section
      data-testid="lesson-exercise-step"
      data-lesson-id={lesson.id}
      className="prose-narrow"
    >
      <p className="m-0 text-sm text-[var(--color-graphite)]">
        {stepLabel} · {t("practice")}
      </p>
      <h2 className="mt-2 font-display text-2xl text-[var(--color-ink)]">
        {step.title}
      </h2>
      <div className="mt-4">
        <ExercisePlayer
          key={step.exercise.id}
          moduleId={lesson.moduleId}
          lessonId={lesson.id}
          exercise={step.exercise}
          nextHref={moduleHref}
          isLast={isLast}
          onNext={({ correct }) => goNext(correct)}
        />
      </div>
    </section>
  );
}
