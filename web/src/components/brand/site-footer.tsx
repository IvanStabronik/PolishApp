import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** Minimal product footer — brand + privacy, no marketing clutter. */
export async function SiteFooter() {
  const t = await getTranslations("common");
  const tn = await getTranslations("nav");
  const tm = await getTranslations("meta");

  return (
    <footer
      data-testid="site-footer"
      className="mt-auto border-t border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-sunken)_55%,transparent)]"
    >
      <div className="page-shell flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
        <p className="m-0 text-sm text-[var(--color-graphite-muted)]">
          <span className="font-semibold tracking-[0.06em] text-[var(--color-ink-soft)]">
            {tm("brand")}
          </span>
          <span className="mx-2 text-[var(--color-line-strong)]" aria-hidden>
            ·
          </span>
          {t("footerTagline")}
        </p>
        <nav className="flex flex-wrap gap-x-1 gap-y-1" aria-label={t("footerNav")}>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center px-2 text-sm text-[var(--color-graphite)] no-underline hover:text-[var(--color-ink)]"
          >
            {tn("privacy")}
          </Link>
          <Link
            href="/settings"
            className="inline-flex min-h-11 items-center px-2 text-sm text-[var(--color-graphite)] no-underline hover:text-[var(--color-ink)]"
          >
            {tn("settings")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
