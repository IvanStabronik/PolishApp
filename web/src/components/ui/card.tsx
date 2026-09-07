import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "li";
  children?: ReactNode;
  /** Raised paper surface with soft archive shadow — for interactive containers only. */
  elevated?: boolean;
};

/** Interaction / content container — not decorative chrome. */
export function Card({
  as: Comp = "div",
  className,
  children,
  elevated = false,
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(
        "border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-[var(--space-5)]",
        "rounded-[var(--radius-lg)]",
        elevated && "shadow-[var(--shadow-sm)] border-[var(--color-line)]",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
