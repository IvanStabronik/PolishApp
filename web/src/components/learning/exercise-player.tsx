"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type {
  EvaluationResultDto,
  LearnerExercise,
} from "@/lib/content/learner-dto";
import { Button } from "@/components/ui/button";
import { ChoiceOption } from "./choice-option";
import { FeedbackPanel } from "./feedback-panel";
import { ListeningAudioControl } from "@/components/learning/listening-audio-control";

type Props = {
  moduleId: string;
  /** Real lesson id when playing inside a lesson (persisted on attempt). */
  lessonId?: string;
  /** Optional learning_sessions id for server-backed lesson results. */
  learningSessionId?: string;
  /** Learner-safe DTO only — never ModuleExercise / AuthoredExercise. */
  exercise: LearnerExercise;
  nextHref: string;
  isLast: boolean;
  /** When set, called instead of router.push(nextHref) after feedback. */
  onNext?: (result: { correct: boolean }) => void;
  /** Server may ensure a session on first persist — bubble id to parent. */
  onSessionId?: (sessionId: string) => void;
};

export function ExercisePlayer({
  moduleId,
  lessonId,
  learningSessionId,
  exercise,
  nextHref,
  isLast,
  onNext,
  onSessionId,
}: Props) {
  const t = useTranslations("learn");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number | null>(null);
  const [multiSelected, setMultiSelected] = useState<number[]>([]);
  const [gapValues, setGapValues] = useState<string[]>(
    exercise.type === "gap_fill" ? Array.from({ length: exercise.gapCount }, () => "") : [],
  );
  const [order, setOrder] = useState<number[]>(
    exercise.type === "ordering" ? exercise.items.map((_, i) => i) : [],
  );
  const [result, setResult] = useState<EvaluationResultDto | null>(null);
  const [persistError, setPersistError] = useState<string | null>(null);
  const [listeningPlayed, setListeningPlayed] = useState(false);

  function buildAnswer() {
    switch (exercise.type) {
      case "single_choice":
        return { type: "single_choice" as const, index: selected ?? -1 };
      case "listening":
        return { type: "listening" as const, index: selected ?? -1 };
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
      case "listening":
        // Play-gate: must start audio before submit (blocks skip-audio gaming).
        return selected !== null && listeningPlayed;
      case "multiple_choice":
        return multiSelected.length > 0;
      case "gap_fill":
        return gapValues.every((v) => v.trim().length > 0);
      case "ordering":
        return order.length === exercise.items.length;
    }
  }

  async function onSubmit() {
    setPersistError(null);
    const answer = buildAnswer();
    const idempotencyKey = crypto.randomUUID();
    const res = await fetch("/api/learning/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        moduleId,
        lessonId: lessonId ?? undefined,
        learningSessionId: learningSessionId ?? undefined,
        exerciseId: exercise.id,
        answer,
        idempotencyKey,
      }),
    });

    let data: {
      correct?: boolean;
      explanation?: string;
      l1Note?: string;
      revealCorrectIndexes?: number[];
      learningSessionId?: string;
      error?: string;
      reason?: string;
      persisted?: boolean;
    };
    try {
      data = (await res.json()) as typeof data;
    } catch {
      setPersistError(t("persistError"));
      return;
    }

    if (data.learningSessionId) {
      onSessionId?.(data.learningSessionId);
    }

    // Correctness comes only from the server — never computed on the client.
    if (typeof data.correct === "boolean") {
      setResult({
        correct: data.correct,
        explanation: data.explanation ?? "",
        l1Note: data.l1Note,
        revealCorrectIndexes: data.revealCorrectIndexes,
      });
    }

    if (!res.ok || data.persisted === false || data.error) {
      setPersistError(
        data.reason === "missing_content_version"
          ? t("persistErrorMissingVersion")
          : t("persistError"),
      );
    }
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

  function optionState(index: number): "idle" | "correct" | "incorrect" {
    if (!result) return "idle";
    const revealed = result.revealCorrectIndexes ?? [];
    if (revealed.includes(index)) return "correct";
    if (selected === index || multiSelected.includes(index)) return "incorrect";
    return "idle";
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

      {exercise.type === "listening" ? (
        <div
          className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] px-4 py-4"
          data-testid="exercise-listening-audio"
        >
          <p className="m-0 text-sm text-[var(--color-graphite-muted)]">
            {t("listeningExerciseHint")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {exercise.hasTtsStimulus || exercise.audioUrl ? (
              <ListeningAudioControl
                moduleId={moduleId}
                exerciseId={exercise.id}
                audioUrl={exercise.audioUrl}
                className="min-h-10 px-4 text-base"
                onPlayed={() => setListeningPlayed(true)}
                onUnavailable={() => setListeningPlayed(true)}
              />
            ) : null}
            <span className="text-xs text-[var(--color-graphite-muted)]">
              {t("listeningReplayOk")}
            </span>
          </div>
          {!listeningPlayed && !result ? (
            <p
              className="m-0 text-xs text-[var(--color-graphite-muted)]"
              data-testid="listening-play-gate-hint"
            >
              {t("listeningPlayBeforeSubmit")}
            </p>
          ) : null}
        </div>
      ) : null}

      {(exercise.type === "single_choice" || exercise.type === "listening") && (
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
              state={optionState(index)}
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
              state={optionState(index)}
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
          {Array.from({ length: exercise.gapCount }, (_, index) => (
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
        l1Note={result?.l1Note}
      />

      {persistError ? (
        <p
          role="alert"
          data-testid="exercise-persist-error"
          className="m-0 rounded-[var(--radius-md)] border border-[var(--color-error)] bg-[var(--color-error-bg)] px-4 py-3 text-sm text-[var(--color-error)]"
        >
          {persistError}
        </p>
      ) : null}

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
            onClick={() => {
              if (onNext && result) {
                onNext({ correct: result.correct });
                return;
              }
              router.push(nextHref);
            }}
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
              setPersistError(null);
              setSelected(null);
              setMultiSelected([]);
              if (exercise.type === "gap_fill") {
                setGapValues(Array.from({ length: exercise.gapCount }, () => ""));
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
