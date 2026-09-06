import { getTranslations } from "next-intl/server";
import type { DialogueTurn, KeyLine } from "@/lib/content/types";
import type { LearnerL1 } from "@/lib/enums";

type Props = {
  dialogue: DialogueTurn[];
  keyLines: KeyLine[];
  l1?: LearnerL1;
};

export async function ModuleOverview({ dialogue, keyLines, l1 = "rus" }: Props) {
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
              <p className="m-0 mt-1 text-sm text-[var(--color-graphite)]">
                {turn.glossRu}
              </p>
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
    </div>
  );
}
