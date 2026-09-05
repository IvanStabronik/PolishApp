import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { DraftModule } from "@/lib/content/types";
import { isInternalPreview } from "@/lib/content/load-module";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Props = {
  module: DraftModule;
};

export async function ModuleCard({ module }: Props) {
  const t = await getTranslations("dashboard");
  const tLearn = await getTranslations("learn");
  const tCommon = await getTranslations("common");
  const preview = isInternalPreview(module.status);

  return (
    <Card
      as="article"
      className="flex flex-col gap-4"
      data-testid={`module-${module.id}`}
      data-module-status={module.status}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info">{module.level}</Badge>
        {preview ? <Badge tone="draft">{t("previewBadge")}</Badge> : null}
        {module.status === "DRAFT" ? (
          <Badge tone="draft">{tCommon("draft")}</Badge>
        ) : null}
      </div>
      <div>
        <p className="m-0 text-sm text-[var(--color-graphite)]">
          {module.hallLabel}
        </p>
        <h2 className="m-0 mt-1 font-display text-2xl text-[var(--color-ink)]">
          {module.titlePl}
        </h2>
        <p className="m-0 mt-1 text-[var(--color-graphite)]">{module.title}</p>
      </div>
      <p className="m-0 text-[var(--color-ink-soft)]">{module.objective}</p>
      <Link
        href={`/learn/${module.id}`}
        data-testid={`module-open-${module.id}`}
        className="font-medium text-[var(--color-forest)] no-underline hover:underline"
      >
        {tLearn("openModule")} →
      </Link>
    </Card>
  );
}
