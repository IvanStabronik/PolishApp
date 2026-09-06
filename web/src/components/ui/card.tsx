import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "li";
  children?: ReactNode;
};

/** Interaction / content container — not decorative chrome. */
export function Card({
  as: Comp = "div",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Comp
      className={cn(
        "border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-[var(--space-5)]",
        "rounded-[var(--radius-lg)]",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
