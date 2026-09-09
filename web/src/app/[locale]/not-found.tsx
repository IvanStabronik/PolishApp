import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageIntro } from "@/components/brand/page-intro";
import { LinkButton } from "@/components/ui/link-button";

export default async function NotFound() {
  const t = await getTranslations("errors");
  const tn = await getTranslations("nav");
  return (
    <div className="page-shell py-16">
      <PageIntro title={t("notFound")} lead={t("generic")} />
      <div className="mt-8">
        <LinkButton href="/">{tn("home")}</LinkButton>
      </div>
      <p className="mt-4">
        <Link
          href="/dashboard"
          className="inline-flex min-h-11 items-center text-sm text-[var(--color-amber-deep)] no-underline hover:underline"
        >
          {tn("dashboard")}
        </Link>
      </p>
    </div>
  );
}
