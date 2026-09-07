import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatusKind = "empty" | "loading" | "error" | "info";

type StatusPanelProps = {
  kind?: StatusKind;
  title?: string;
  children: ReactNode;
  className?: string;
  testId?: string;
};

const KIND_STYLES: Record<StatusKind, string> = {
  empty: "border-[var(--color-line)] bg-[var(--color-paper-raised)]",
  loading: "border-[var(--color-line)] bg-[var(--color-paper-raised)]",
  error:
    "border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]",
  info: "border-[var(--color-line)] bg-[var(--color-paper-raised)]",
};

/** Consistent empty / loading / error surface for key learner flows. */
export function StatusPanel({
  kind = "empty",
  title,
  children,
  className,
  testId,
}: StatusPanelProps) {
  return (
    <div
      role={kind === "error" ? "alert" : kind === "loading" ? "status" : undefined}
      aria-busy={kind === "loading" || undefined}
      data-testid={testId}
      className={cn(
        "surface-panel motion-fade-rise-delay p-4 sm:p-5",
        KIND_STYLES[kind],
        className,
      )}
    >
      {title ? (
        <p className="m-0 font-display text-lg text-[var(--color-ink)]">{title}</p>
      ) : null}
      <div
        className={cn(
          "text-[var(--color-graphite)]",
          title ? "mt-2" : null,
          kind === "error" && "text-[var(--color-error)]",
        )}
      >
        {children}
      </div>
      {kind === "loading" ? (
        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--color-paper-sunken)]"
          aria-hidden
        >
          <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--color-amber-soft)]" />
        </div>
      ) : null}
    </div>
  );
}
