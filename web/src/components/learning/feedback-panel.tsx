"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type FeedbackPanelProps = {
  correct: boolean | null;
  message: string;
};

export function FeedbackPanel({ correct, message }: FeedbackPanelProps) {
  const t = useTranslations("learn");
  if (correct === null || !message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      data-testid="exercise-feedback"
      data-correct={correct ? "true" : "false"}
      className={cn(
        "mt-4 border px-4 py-3 rounded-[var(--radius-md)]",
        correct
          ? "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]"
          : "border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]",
      )}
    >
      <p className="m-0 font-semibold">
        {correct ? t("correct") : t("incorrect")}
      </p>
      <p className="m-0 mt-1 text-[var(--color-ink-soft)]">{message}</p>
    </div>
  );
}
