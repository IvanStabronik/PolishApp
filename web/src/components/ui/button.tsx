import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "min-h-9 px-3 text-sm",
        size === "md" && "min-h-11 px-4 text-base",
        size === "lg" && "min-h-12 px-5 text-lg",
        variant === "primary" &&
          "bg-[var(--color-ink)] text-[var(--color-paper-raised)] hover:bg-[var(--color-ink-soft)]",
        variant === "secondary" &&
          "border border-[var(--color-line-strong)] bg-[var(--color-paper-raised)] text-[var(--color-ink)] hover:border-[var(--color-amber)]",
        variant === "ghost" &&
          "bg-transparent text-[var(--color-ink-soft)] underline-offset-4 hover:underline",
        variant === "danger" &&
          "bg-[var(--color-burgundy)] text-[var(--color-paper-raised)] hover:brightness-110",
        "rounded-[var(--radius-md)]",
        className,
      )}
      {...props}
    />
  );
}
