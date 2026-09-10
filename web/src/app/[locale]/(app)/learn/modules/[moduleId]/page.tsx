import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect, notFound } from "next/navigation";
import { getModuleById } from "@/modules/content";

type Props = {
  params: Promise<{ locale: string; moduleId: string }>;
};

/**
 * Compat alias — collapse to canonical /learn/[moduleId] hub.
 * Keeps old bookmarks working without a second lesson list UI.
 */
export default async function ModulePageAlias({ params }: Props) {
  const { locale, moduleId } = await params;
  setRequestLocale(locale);
  await getTranslations("learn");

  const mod = await getModuleById(moduleId);
  if (!mod) notFound();

  redirect(`/${locale}/learn/${mod.id}`);
}
