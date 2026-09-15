import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { DraftModule } from "@/lib/content/types";
import type { LearnerL1, UiLocale } from "@/lib/enums";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  localizeHallLabel,
  localizeInstructionalBody,
} from "@/lib/content/instructional-body-locale";

type Props = {
  module: DraftModule;
  l1?: LearnerL1;
  uiLocale?: UiLocale | string | null;
};

/**
 * Learner module card — no DRAFT / Черновик badges.
 * Closed-beta honesty lives on PreviewBanner once, not per card.
 */
export async function ModuleCard({ module, l1, uiLocale }: Props) {
  const tLearn = await getTranslations("learn");

  return (
    <Card
      as="article"
      elevated
      className="flex flex-col gap-4 transition-[box-shadow,border-color] duration-150 hover:border-[var(--color-line-strong)] hover:shadow-[var(--shadow-md)]"
      data-testid={`module-${module.id}`}
      data-module-status={module.status}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info">{module.level}</Badge>
      </div>
      <div>
        <p className="m-0 text-sm text-[var(--color-graphite)]">
          {localizeHallLabel(module.hallLabel, l1, uiLocale)}
        </p>
        <h2 className="m-0 mt-1 font-display text-2xl text-[var(--color-ink)]">
          {module.titlePl}
        </h2>
        <p className="m-0 mt-1 text-[var(--color-graphite)]">{module.title}</p>
      </div>
      <p className="m-0 text-[var(--color-ink-soft)]">
        {localizeInstructionalBody(module.objective, l1, uiLocale)}
      </p>
      <Link
        href={`/learn/${module.id}`}
        data-testid={`module-open-${module.id}`}
        className="inline-flex min-h-11 items-center font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
      >
        {tLearn("openModule")} →
      </Link>
    </Card>
  );
}
