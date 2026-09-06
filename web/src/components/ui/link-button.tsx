import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium no-underline transition-colors",
        size === "sm" && "min-h-9 px-3 text-sm",
        size === "md" && "min-h-11 px-4 text-base",
        size === "lg" && "min-h-12 px-5 text-lg",
        variant === "primary" &&
          "bg-[var(--color-ink)] text-[var(--color-paper-raised)] hover:bg-[var(--color-ink-soft)]",
        variant === "secondary" &&
          "border border-[var(--color-line-strong)] bg-[var(--color-paper-raised)] text-[var(--color-ink)] hover:border-[var(--color-amber)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--color-paper-raised)] underline-offset-4 hover:underline",
        "rounded-[var(--radius-md)]",
        className,
      )}
      {...props}
    />
  );
}
