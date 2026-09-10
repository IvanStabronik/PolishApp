import { getTranslations } from "next-intl/server";
import type { DialogueTurn, KeyLine, DraftModule } from "@/lib/content/types";
import type { LearnerL1 } from "@/lib/enums";

type Props = {
  dialogue: DialogueTurn[];
  keyLines: KeyLine[];
  l1?: LearnerL1;
  pragmatics?: DraftModule["pragmatics"];
  grammar?: DraftModule["grammar"];
};

export async function ModuleOverview({
  dialogue,
  keyLines,
  l1 = "rus",
  pragmatics,
  grammar,
}: Props) {
  const t = await getTranslations("learn");

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="dialogue-heading">
        <h2
          id="dialogue-heading"
          className="font-display text-2xl text-[var(--color-ink)]"
        >
          {t("dialogue")}
        </h2>
        <ul className="mt-4 flex list-none flex-col gap-4 p-0">
          {dialogue.map((turn, i) => (
            <li
              key={`${turn.speaker}-${i}`}
              className="border-l-2 border-[var(--color-forest)] pl-4"
            >
              <p className="m-0 text-xs font-semibold uppercase tracking-wide text-[var(--color-forest)]">
                {turn.speaker}
              </p>
              <p className="m-0 mt-1 font-display text-xl text-[var(--color-ink)]">
                {turn.pl}
              </p>
              {turn.glossRu.trim() ? (
                <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                  {turn.glossRu}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="keylines-heading">
        <h2
          id="keylines-heading"
          className="font-display text-2xl text-[var(--color-ink)]"
        >
          {t("keyLines")}
        </h2>
        <ul className="mt-4 flex list-none flex-col gap-5 p-0">
          {keyLines.map((line) => (
            <li key={line.pl}>
              <p className="m-0 font-display text-xl text-[var(--color-ink)]">
                {line.pl}
              </p>
              <p className="m-0 mt-1 text-[var(--color-graphite)]">
                {line.explanation}
              </p>
              {line.l1Notes?.[l1] ? (
                <p className="m-0 mt-2 text-sm text-[var(--color-moss)]">
                  {line.l1Notes[l1]}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {pragmatics ? (
        <section aria-labelledby="pan-pani-heading">
          <h2
            id="pan-pani-heading"
            className="font-display text-2xl text-[var(--color-ink)]"
          >
            {t("panPani")}
          </h2>
          <p className="mt-3 text-[var(--color-ink-soft)]">{pragmatics.panPani}</p>
          {pragmatics.form ? (
            <p className="mt-2 text-[var(--color-ink)]">
              <span className="text-sm text-[var(--color-graphite)]">
                {t("grammarForm")}:{" "}
              </span>
              {pragmatics.form}
            </p>
          ) : null}
          {pragmatics.examples && pragmatics.examples.length > 0 ? (
            <ul className="mt-3 list-disc pl-5 text-[var(--color-ink-soft)]">
              {pragmatics.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          ) : null}
          {pragmatics.l1Notes?.[l1] ? (
            <p className="m-0 mt-2 text-sm text-[var(--color-moss)]">
              {pragmatics.l1Notes[l1]}
            </p>
          ) : null}
        </section>
      ) : null}

      {grammar ? (
        <section aria-labelledby="grammar-heading">
          <h2
            id="grammar-heading"
            className="font-display text-2xl text-[var(--color-ink)]"
          >
            {t("grammar")}
          </h2>
          <p className="mt-1 font-medium text-[var(--color-ink)]">{grammar.title}</p>
          <p className="mt-2 text-[var(--color-ink-soft)]">{grammar.explanation}</p>
          {grammar.form ? (
            <p className="mt-2 text-[var(--color-ink)]">
              <span className="text-sm text-[var(--color-graphite)]">
                {t("grammarForm")}:{" "}
              </span>
              {grammar.form}
            </p>
          ) : null}
          {grammar.use ? (
            <p className="mt-2 text-[var(--color-ink)]">
              <span className="text-sm text-[var(--color-graphite)]">
                {t("grammarUse")}:{" "}
              </span>
              {grammar.use}
            </p>
          ) : null}
          {grammar.examples.length > 0 ? (
            <ul className="mt-3 list-disc pl-5 text-[var(--color-ink-soft)]">
              {grammar.examples.map((ex) => (
                <li key={ex}>{ex}</li>
              ))}
            </ul>
          ) : null}
          {grammar.l1Notes?.[l1] ? (
            <p className="m-0 mt-2 text-sm text-[var(--color-moss)]">
              {grammar.l1Notes[l1]}
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
