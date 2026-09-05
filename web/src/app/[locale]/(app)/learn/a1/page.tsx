import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DualModuleLabel } from "@/components/dual-module-label";
import { getA1Catalog } from "@/modules/content";
import { isInternalPreview } from "@/lib/content/load-module";

type Props = { params: Promise<{ locale: string }> };

export default async function A1CatalogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("learn");
  const tc = await getTranslations("common");
  const modules = await getA1Catalog();

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display m-0 text-3xl">{t("catalogTitle")}</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-graphite)]">
          {t("catalogLead")}
        </p>
      </header>

      {modules.length === 0 ? (
        <Card>
          <p className="m-0 text-[var(--color-graphite)]">
            Set DEMO_PREVIEW=true for internal DRAFT catalog preview.
          </p>
        </Card>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {modules.map((mod) => (
            <Card as="li" key={mod.id}>
              <DualModuleLabel lore={mod.lore} />
              <h2 className="font-display mt-2 mb-1 text-2xl text-[var(--color-ink)]">
                {mod.titlePl}
              </h2>
              <p className="m-0 text-[var(--color-graphite)]">{mod.summary}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-burgundy)]">
                {isInternalPreview(mod.status) ? tc("draft") : tc("published")}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={`/learn/${mod.id}`}>
                  <Button>{t("openModule")}</Button>
                </Link>
                <Link href={`/learn/modules/${mod.id}`}>
                  <Button variant="secondary">{t("lessons")}</Button>
                </Link>
              </div>
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
