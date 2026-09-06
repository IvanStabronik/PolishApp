import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { BrandMark } from "@/components/brand/brand-mark";
import { LinkButton } from "@/components/ui/link-button";

type Props = { params: Promise<{ locale: string }> };

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("landing");
  const tMeta = await getTranslations("meta");

  return (
    <main id="main-content">
      <section className="hero-atmosphere flex flex-col justify-end">
        <div className="page-shell pb-16 pt-24 sm:pb-24">
          <BrandMark tone="paper" className="motion-fade-rise" />
          <div
            className="motion-ink-line mt-6 h-px w-24 bg-[var(--color-forest-soft)]"
            aria-hidden
          />
          <h1 className="sr-only">{tMeta("brand")}</h1>
          <p className="motion-fade-rise-delay mt-8 max-w-xl text-lg text-[color-mix(in_srgb,var(--color-paper-raised)_90%,transparent)] sm:text-xl">
            {t("lead")}
          </p>
          <div className="motion-fade-rise-delay mt-10 flex flex-wrap gap-3">
            <LinkButton href="/register" size="lg" data-testid="link-register">
              {t("ctaPrimary")}
            </LinkButton>
            <LinkButton href="/login" variant="secondary" size="lg" data-testid="link-login">
              {t("ctaSecondary")}
            </LinkButton>
          </div>
          <p className="mt-8 max-w-md text-sm text-[color-mix(in_srgb,var(--color-paper-raised)_70%,transparent)]">
            {t("aside")}
          </p>
        </div>
      </section>
    </main>
  );
}
