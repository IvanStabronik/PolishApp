"use client";

import { PrivacyActions } from "@/components/brand/privacy-actions";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display m-0 text-3xl text-[var(--color-ink)]">
          {t("title")}
        </h1>
        <p className="mt-2 max-w-xl text-[var(--color-graphite)]">{t("lead")}</p>
      </header>
      <div className="max-w-xl">
        <PrivacyActions />
      </div>
    </div>
  );
}
