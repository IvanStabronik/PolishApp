"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ExercisePlayer } from "@/components/learning/exercise-player";
import { LessonStructuredStep } from "@/components/exercise/lesson-structured-step";
import type { LessonDetail } from "@/lib/mocks/content";

type LessonPlayerProps = {
  lesson: LessonDetail;
  moduleHref: string;
  preview?: boolean;
};

/**
 * Lesson player: structured content + all 4 exercise types via learner-safe DTOs.
 * Attempts go through /api/learning/attempt with real moduleId/lessonId/exerciseId.
 */
export function LessonPlayer({ lesson, moduleHref, preview }: LessonPlayerProps) {
  const t = useTranslations("learn");
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const step = lesson.steps[stepIndex];
  const total = lesson.steps.length;
  const stepLabel = t("stepOf", { current: stepIndex + 1, total });
  const progressWidth = total > 0 ? ((stepIndex + 1) / total) * 100 : 0;

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

  const shellChrome = (
    <div className="lesson-shell sticky top-0 z-[2] -mx-1 mb-5 bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] px-1 py-2 backdrop-blur-sm sm:static sm:mx-0 sm:mb-6 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
      {preview ? (
        <p
          className="m-0 mb-2 text-xs text-[var(--color-amber-deep)]"
          data-testid="lesson-preview-trust"
        >
          {t("previewTrust")}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="m-0 max-w-[70%] truncate text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-graphite-muted)]">
          {lesson.title}
        </p>
        <p className="m-0 shrink-0 text-sm tabular-nums text-[var(--color-graphite)]">
          {stepLabel}
        </p>
      </div>
      <div
        className="lesson-shell__rail"
        role="progressbar"
        aria-valuenow={Math.round(progressWidth)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={stepLabel}
      >
        <div
          className="lesson-shell__rail-fill"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );

  const nextButtons = (
    <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
      <Button
        onClick={() => goNext()}
        data-testid="lesson-next-step"
        className="w-full sm:w-auto"
      >
        {t("nextStep")}
      </Button>
      <Button
        variant="ghost"
        onClick={() => router.push(moduleHref)}
        className="w-full sm:w-auto"
      >
        {t("backToModule")}
      </Button>
    </div>
  );

  if (step.kind === "theory") {
    return (
      <section className="prose-narrow w-full min-w-0" data-testid="lesson-theory-step">
        {shellChrome}
        <p className="m-0 text-sm text-[var(--color-graphite)]">{t("theory")}</p>
        <h1 className="mt-1 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
          {step.title}
        </h1>
        <div className="mt-3 whitespace-pre-wrap text-[var(--color-ink-soft)] sm:mt-4">
          {step.body}
        </div>
        {nextButtons}
      </section>
    );
  }

  if (
    step.kind === "dialogue" ||
    step.kind === "key_lines" ||
    step.kind === "pan_pani" ||
    step.kind === "grammar"
  ) {
    return (
      <section className="prose-narrow w-full min-w-0">
        {shellChrome}
        <LessonStructuredStep step={step} />
        {nextButtons}
      </section>
    );
  }

  const isLast = stepIndex + 1 >= total;

  return (
    <section
      data-testid="lesson-exercise-step"
      data-lesson-id={lesson.id}
      className="prose-narrow w-full min-w-0"
    >
      {shellChrome}
      <p className="m-0 text-sm text-[var(--color-graphite)]">{t("practice")}</p>
      <h2 className="mt-1 font-display text-[clamp(1.35rem,3.5vw,1.5rem)] text-[var(--color-ink)] sm:text-2xl">
        {step.title}
      </h2>
      <div className="mt-3 border-t border-[var(--color-line)] pt-4 sm:mt-4 sm:pt-5">
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
