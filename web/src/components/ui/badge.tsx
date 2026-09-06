import { cn } from "@/lib/cn";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "draft" | "info" | "success";
  className?: string;
};

export function Badge({ children, tone = "info", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        tone === "draft" &&
          "border-[var(--color-warning)] bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
        tone === "info" &&
          "border-[var(--color-forest)] bg-[var(--color-forest-soft)] text-[var(--color-forest-deep)]",
        tone === "success" &&
          "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
