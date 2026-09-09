"use client";

import { PrivacyActions } from "@/components/brand/privacy-actions";
import { PageIntro } from "@/components/brand/page-intro";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="flex flex-col gap-6">
      <PageIntro title={t("title")} lead={t("lead")} />
      <div className="surface-panel motion-fade-rise-delay max-w-xl p-4 sm:p-6">
        <PrivacyActions />
      </div>
    </div>
  );
}
