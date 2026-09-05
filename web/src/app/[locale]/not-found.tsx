import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("errors");
  const tn = await getTranslations("nav");
  return (
    <div className="page-shell py-16">
      <h1 className="font-display text-3xl text-[var(--color-ink)]">
        {t("notFound")}
      </h1>
      <p className="mt-4">
        <Link href="/" className="text-[var(--color-amber-deep)]">
          {tn("home")}
        </Link>
      </p>
    </div>
  );
}
