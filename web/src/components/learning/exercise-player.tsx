"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { ModuleExercise } from "@/lib/content/types";
import { Button } from "@/components/ui/button";
import { ChoiceOption } from "./choice-option";
import { FeedbackPanel } from "./feedback-panel";

type Props = {
  moduleId: string;
  exercise: ModuleExercise;
  nextHref: string;
  isLast: boolean;
};

export function ExercisePlayer({ moduleId, exercise, nextHref, isLast }: Props) {
  const t = useTranslations("learn");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number | null>(null);
  const [multiSelected, setMultiSelected] = useState<number[]>([]);
  const [gapValues, setGapValues] = useState<string[]>(
    exercise.type === "gap_fill" ? exercise.gaps.map(() => "") : [],
  );
  const [order, setOrder] = useState<number[]>(
    exercise.type === "ordering" ? exercise.items.map((_, i) => i) : [],
  );
  const [result, setResult] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);

  function buildAnswer() {
    switch (exercise.type) {
      case "single_choice":
        return { type: "single_choice" as const, index: selected ?? -1 };
      case "multiple_choice":
        return { type: "multiple_choice" as const, indices: multiSelected };
      case "gap_fill":
        return { type: "gap_fill" as const, values: gapValues };
      case "ordering":
        return { type: "ordering" as const, order };
    }
  }

  function canSubmit() {
    switch (exercise.type) {
      case "single_choice":
        return selected !== null;
      case "multiple_choice":
        return multiSelected.length > 0;
      case "gap_fill":
        return gapValues.every((v) => v.trim().length > 0);
      case "ordering":
        return order.length === exercise.items.length;
    }
  }

  async function onSubmit() {
    const answer = buildAnswer();
    const res = await fetch("/api/learning/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moduleId,
        exerciseId: exercise.id,
        answer,
        preview: true,
      }),
    });
    const data = (await res.json()) as {
      correct: boolean;
      explanation: string;
    };
    setResult({ correct: data.correct, explanation: data.explanation });
  }

  function toggleMulti(index: number) {
    setMultiSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }

  function moveItem(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= order.length) return;
    setOrder((prev) => {
      const next = [...prev];
      const tmp = next[from]!;
      next[from] = next[to]!;
      next[to] = tmp;
      return next;
    });
  }

  return (
    <div
      className="prose-narrow flex flex-col gap-5"
      data-testid="exercise-player"
      data-exercise-type={exercise.type}
      data-exercise-id={exercise.id}
    >
      <p
        className="m-0 text-lg text-[var(--color-ink)]"
        data-testid="exercise-prompt"
      >
        {exercise.prompt}
      </p>

      {exercise.type === "single_choice" && (
        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="sr-only">{t("chooseOption")}</legend>
          {exercise.options.map((label, index) => (
            <ChoiceOption
              key={`${exercise.id}-${index}`}
              id={String(index)}
              name={exercise.id}
              label={label}
              selected={selected === index}
              disabled={Boolean(result)}
              state={
                result
                  ? index === exercise.correctIndex
                    ? "correct"
                    : selected === index
                      ? "incorrect"
                      : "idle"
                  : "idle"
              }
              onSelect={(id) => setSelected(Number(id))}
            />
          ))}
        </fieldset>
      )}

      {exercise.type === "multiple_choice" && (
        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="sr-only">{t("chooseOption")}</legend>
          {exercise.options.map((label, index) => (
            <ChoiceOption
              key={`${exercise.id}-${index}`}
              id={String(index)}
              name={exercise.id}
              label={label}
              multi
              selected={multiSelected.includes(index)}
              disabled={Boolean(result)}
              onSelect={() => toggleMulti(index)}
            />
          ))}
        </fieldset>
      )}

      {exercise.type === "gap_fill" && (
        <div className="flex flex-col gap-3" data-testid="exercise-gaps">
          <p className="m-0 font-display text-xl text-[var(--color-ink)]">
            {exercise.textWithGaps}
          </p>
          {exercise.gaps.map((_, index) => (
            <div key={index} className="field">
              <label htmlFor={`gap-${index}`}>
                {t("gapLabel", { n: index + 1 })}
              </label>
              <input
                id={`gap-${index}`}
                data-testid={`exercise-gap-${index}`}
                value={gapValues[index] ?? ""}
                disabled={Boolean(result)}
                onChange={(e) => {
                  const next = [...gapValues];
                  next[index] = e.target.value;
                  setGapValues(next);
                }}
                autoComplete="off"
              />
            </div>
          ))}
        </div>
      )}

      {exercise.type === "ordering" && (
        <ol
          className="m-0 flex list-none flex-col gap-2 p-0"
          data-testid="exercise-ordering"
        >
          {order.map((itemIndex, position) => (
            <li
              key={`${itemIndex}-${position}`}
              className="flex items-center justify-between gap-3 border border-[var(--color-line)] bg-[var(--color-paper-raised)] px-4 py-3 rounded-[var(--radius-md)]"
            >
              <span>
                {position + 1}. {exercise.items[itemIndex]}
              </span>
              <span className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={Boolean(result) || position === 0}
                  onClick={() => moveItem(position, -1)}
                  aria-label={t("moveUp")}
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={Boolean(result) || position === order.length - 1}
                  onClick={() => moveItem(position, 1)}
                  aria-label={t("moveDown")}
                >
                  ↓
                </Button>
              </span>
            </li>
          ))}
        </ol>
      )}

      <FeedbackPanel
        correct={result ? result.correct : null}
        message={result?.explanation ?? ""}
      />

      <div className="flex flex-wrap gap-3">
        {!result ? (
          <Button
            disabled={!canSubmit() || pending}
            onClick={() => startTransition(() => void onSubmit())}
            data-testid="exercise-submit"
          >
            {t("submitAnswer")}
          </Button>
        ) : (
          <Button
            onClick={() => router.push(nextHref)}
            data-testid="exercise-next"
          >
            {isLast ? t("finishLesson") : t("nextStep")}
          </Button>
        )}
        {result && !result.correct && (
          <Button
            variant="secondary"
            data-testid="exercise-retry"
            onClick={() => {
              setResult(null);
              setSelected(null);
              setMultiSelected([]);
              if (exercise.type === "gap_fill") {
                setGapValues(exercise.gaps.map(() => ""));
              }
            }}
          >
            {t("tryAgain")}
          </Button>
        )}
      </div>
    </div>
  );
}
