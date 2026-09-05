"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { checkClosedAnswer } from "@/modules/assessment";
import { Button } from "@/components/ui/button";
import type { LessonDetail, LessonStep } from "@/lib/mocks/content";
import { cn } from "@/lib/cn";

type LessonPlayerProps = {
  lesson: LessonDetail;
  moduleHref: string;
  preview?: boolean;
};

export function LessonPlayer({
  lesson,
  moduleHref,
  preview = false,
}: LessonPlayerProps) {
  const t = useTranslations("learn");
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [pending, startTransition] = useTransition();

  const step = lesson.steps[stepIndex];
  const total = lesson.steps.length;
  const stepLabel = t("stepOf", { current: stepIndex + 1, total });

  function goNext() {
    setSelected(null);
    setCorrect(null);
    setFeedback("");
    if (stepIndex + 1 >= total) {
      const params = new URLSearchParams({
        c: String(score.correct),
        n: String(score.total),
        module: lesson.moduleId,
      });
      router.push(`/learn/lessons/${lesson.id}/result?${params.toString()}`);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function onCheck(exercise: Extract<LessonStep, { kind: "exercise" }>) {
    if (!selected) return;
    startTransition(async () => {
      const result = await checkClosedAnswer({
        exerciseId: exercise.id,
        optionId: selected,
        lessonId: lesson.id,
        preview,
      });
      setCorrect(result.correct);
      setFeedback(result.feedback);
      setScore((prev) => ({
        correct: prev.correct + (result.correct ? 1 : 0),
        total: prev.total + 1,
      }));
    });
  }

  if (!step) return null;

  if (step.kind === "theory") {
    return (
      <section className="prose-narrow">
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
          <Button onClick={() => goNext()}>{t("nextStep")}</Button>
          <Button variant="ghost" onClick={() => router.push(moduleHref)}>
            {t("backToModule")}
          </Button>
        </div>
      </section>
    );
  }

  const locked = correct !== null;

  return (
    <section className="prose-narrow">
      <p className="m-0 text-sm text-[var(--color-graphite)]">
        {stepLabel} · {t("practice")}
      </p>
      <h1 className="mt-2 font-display text-3xl text-[var(--color-ink)]">
        {step.title}
      </h1>
      <p className="mt-4 font-medium text-[var(--color-ink)]">{step.promptPl}</p>
      <fieldset className="m-0 mt-4 border-0 p-0">
        <legend className="sr-only">{t("chooseOption")}</legend>
        <div className="flex flex-col gap-2" role="radiogroup">
          {step.options.map((opt) => {
            let state: "idle" | "correct" | "incorrect" = "idle";
            if (locked && selected === opt.id) {
              state = correct ? "correct" : "incorrect";
            }
            return (
              <label
                key={opt.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 border px-4 py-3 rounded-[var(--radius-md)]",
                  selected === opt.id
                    ? "border-[var(--color-forest)] bg-[var(--color-forest-soft)]"
                    : "border-[var(--color-line)] bg-[var(--color-paper-raised)]",
                  state === "correct" &&
                    "border-[var(--color-success)] bg-[var(--color-success-bg)]",
                  state === "incorrect" &&
                    "border-[var(--color-error)] bg-[var(--color-error-bg)]",
                )}
              >
                <input
                  type="radio"
                  name={step.id}
                  value={opt.id}
                  checked={selected === opt.id}
                  disabled={locked || pending}
                  onChange={() => setSelected(opt.id)}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {feedback ? (
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "mt-4 rounded-[var(--radius-md)] border px-4 py-3 text-sm",
            correct
              ? "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]"
              : "border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]",
          )}
        >
          {feedback}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {correct === null ? (
          <Button
            onClick={() => onCheck(step)}
            disabled={!selected || pending}
          >
            {t("submitAnswer")}
          </Button>
        ) : (
          <Button onClick={goNext}>
            {stepIndex + 1 >= total ? t("finishLesson") : t("nextStep")}
          </Button>
        )}
        {correct === false ? (
          <Button
            variant="secondary"
            onClick={() => {
              setSelected(null);
              setCorrect(null);
              setFeedback("");
              setScore((prev) =>
                prev.total > 0
                  ? { correct: prev.correct, total: prev.total - 1 }
                  : prev,
              );
            }}
          >
            {t("tryAgain")}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
