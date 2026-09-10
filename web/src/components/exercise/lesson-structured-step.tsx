"use client";

import { useTranslations } from "next-intl";
import type { LessonStep } from "@/lib/mocks/content";
import { PolishLineAudio } from "@/components/exercise/polish-line-audio";

type ContentStep = Exclude<
  LessonStep,
  { kind: "exercise" } | { kind: "theory" } | { kind: "speaking_practice" }
>;

type Props = {
  step: ContentStep;
};

export function LessonStructuredStep({ step }: Props) {
  const t = useTranslations("learn");

  if (step.kind === "dialogue") {
    return (
      <section data-testid="lesson-dialogue-step">
        <p className="m-0 text-sm text-[var(--color-graphite)]">{t("dialogue")}</p>
        <h1 className="mt-1 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
          {step.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-graphite-muted)]">
          {t("listeningHint")}
        </p>
        <ul className="mt-4 flex list-none flex-col gap-4 p-0">
          {step.turns.map((turn, i) => (
            <li
              key={`${turn.speaker}-${i}`}
              className="border-l-2 border-[var(--color-forest)] pl-4"
            >
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-forest)]">
                {turn.speaker}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="m-0 font-display text-xl text-[var(--color-ink)]">
                  {turn.pl}
                </p>
                <PolishLineAudio text={turn.pl} audioUrl={turn.audioUrl} />
              </div>
              {turn.gloss ? (
                <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                  {turn.gloss}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (step.kind === "key_lines") {
    return (
      <section data-testid="lesson-key-lines-step">
        <p className="m-0 text-sm text-[var(--color-graphite)]">{t("keyLines")}</p>
        <h1 className="mt-1 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
          {step.title}
        </h1>
        <ul className="mt-4 flex list-none flex-col gap-5 p-0">
          {step.lines.map((line) => (
            <li key={line.pl}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="m-0 font-display text-xl text-[var(--color-ink)]">
                  {line.pl}
                </p>
                <PolishLineAudio text={line.pl} audioUrl={line.audioUrl} />
              </div>
              <p className="m-0 mt-1 text-[var(--color-graphite)]">
                {line.explanation}
              </p>
              {line.l1Note ? (
                <p className="m-0 mt-2 text-sm text-[var(--color-moss)]">
                  {line.l1Note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (step.kind === "pan_pani") {
    return (
      <section data-testid="lesson-pan-pani-step">
        <p className="m-0 text-sm text-[var(--color-graphite)]">{t("panPani")}</p>
        <h1 className="mt-1 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
          {step.title}
        </h1>
        <p className="mt-3 text-[var(--color-ink-soft)]">{step.summary}</p>
        {step.form ? (
          <p className="mt-3 font-medium text-[var(--color-ink)]">
            <span className="text-sm text-[var(--color-graphite)]">
              {t("grammarForm")}:{" "}
            </span>
            {step.form}
          </p>
        ) : null}
        {step.examples && step.examples.length > 0 ? (
          <ul className="mt-3 list-disc pl-5 text-[var(--color-ink-soft)]">
            {step.examples.map((ex) => (
              <li key={ex}>{ex}</li>
            ))}
          </ul>
        ) : null}
        {step.l1Note ? (
          <p className="mt-3 text-sm text-[var(--color-moss)]">{step.l1Note}</p>
        ) : null}
      </section>
    );
  }

  return (
    <section data-testid="lesson-grammar-step">
      <p className="m-0 text-sm text-[var(--color-graphite)]">{t("grammar")}</p>
      <h1 className="mt-1 font-display text-[clamp(1.5rem,4vw,1.875rem)] text-[var(--color-ink)] sm:text-3xl">
        {step.title}
      </h1>
      <p className="mt-3 text-[var(--color-ink-soft)]">{step.summary}</p>
      {step.form ? (
        <p className="mt-3 text-[var(--color-ink)]">
          <span className="text-sm font-semibold text-[var(--color-graphite)]">
            {t("grammarForm")}:{" "}
          </span>
          {step.form}
        </p>
      ) : null}
      {step.meaning ? (
        <p className="mt-2 text-[var(--color-ink)]">
          <span className="text-sm font-semibold text-[var(--color-graphite)]">
            {t("grammarMeaning")}:{" "}
          </span>
          {step.meaning}
        </p>
      ) : null}
      {step.use ? (
        <p className="mt-2 text-[var(--color-ink)]">
          <span className="text-sm font-semibold text-[var(--color-graphite)]">
            {t("grammarUse")}:{" "}
          </span>
          {step.use}
        </p>
      ) : null}
      {step.examples.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 text-[var(--color-ink-soft)]">
          {step.examples.map((ex) => (
            <li key={ex}>{ex}</li>
          ))}
        </ul>
      ) : null}
      {step.l1Note ? (
        <p className="mt-3 text-sm text-[var(--color-moss)]">{step.l1Note}</p>
      ) : null}
    </section>
  );
}
