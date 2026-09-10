import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkButton } from "@/components/ui/link-button";
import { PageIntro } from "@/components/brand/page-intro";
import { StatusPanel } from "@/components/brand/status-panel";
import { DualModuleLabel } from "@/components/dual-module-label";
import { Badge } from "@/components/ui/badge";
import { getA1Catalog } from "@/modules/content";

type Props = { params: Promise<{ locale: string }> };

/** A1 catalog — one open path per module; no DRAFT badges for learners. */
export default async function A1CatalogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("learn");
  const modules = await getA1Catalog();

  return (
    <div className="flex flex-col gap-8" data-testid="a1-catalog">
      <PageIntro title={t("catalogTitle")} lead={t("catalogLead")} />

      {modules.length === 0 ? (
        <StatusPanel testId="catalog-empty">{t("catalogEmptyDraft")}</StatusPanel>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0 sm:gap-5 md:grid-cols-2">
          {modules.map((mod) => (
            <li key={mod.id} className="surface-panel flex flex-col p-4 sm:p-5">
              <DualModuleLabel lore={mod.lore} />
              <h2 className="font-display mt-2 mb-1 text-xl text-[var(--color-ink)] sm:text-2xl">
                {mod.titlePl}
              </h2>
              <p className="m-0 flex-1 text-[var(--color-graphite)]">{mod.summary}</p>
              <div className="mt-3">
                <Badge tone="info">{mod.lore.academicCode || "A1"}</Badge>
              </div>
              <div className="mt-4">
                <LinkButton href={`/learn/${mod.id}`}>{t("openModule")}</LinkButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
