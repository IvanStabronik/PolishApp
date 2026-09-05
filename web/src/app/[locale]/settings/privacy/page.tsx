import { redirect } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

/** Canonical privacy route is `/[locale]/privacy`. */
export default async function PrivacySettingsRedirect({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  redirect({ href: "/privacy", locale });
}
