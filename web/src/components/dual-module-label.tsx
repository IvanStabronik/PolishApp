import { getTranslations } from "next-intl/server";
import type { LoreLabel } from "@/lib/mocks/content";

type Props = {
  lore: LoreLabel;
};

export async function DualModuleLabel({ lore }: Props) {
  const t = await getTranslations("common");
  const loreText = t("loreModule", {
    hall: lore.hall,
    loreTitle: lore.loreTitle,
  });
  const academic = t("academicModule", { code: lore.academicCode });

  return (
    <p className="m-0 text-sm text-[var(--color-graphite)]">
      <span className="text-[var(--color-ink-soft)]">{loreText}</span>
      <span aria-hidden> / </span>
      <span>{academic}</span>
    </p>
  );
}
