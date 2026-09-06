"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type Status = "mastered" | "emerging" | "not_started";

type Props = {
  status: Status;
  className?: string;
};

const TONE: Record<Status, string> = {
  mastered:
    "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]",
  emerging:
    "border-[var(--color-amber)] bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  not_started:
    "border-[var(--color-line)] bg-[var(--color-paper-sunken)] text-[var(--color-graphite)]",
};

export function MasteryBadge({ status, className }: Props) {
  const t = useTranslations("progress");
  const label =
    status === "mastered"
      ? t("mastered")
      : status === "emerging"
        ? t("emerging")
        : t("notStarted");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-2.5 py-1 text-xs font-semibold",
        TONE[status],
        className,
      )}
    >
      <span aria-hidden>
        {status === "mastered" ? "●" : status === "emerging" ? "◐" : "○"}
      </span>
      {label}
    </span>
  );
}
