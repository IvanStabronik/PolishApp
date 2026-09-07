import { cva, type VariantProps } from "class-variance-authority";

/** Shared Slowarium button surface — ink/amber archive, not Radix Themes defaults. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-150 disabled:cursor-not-allowed disabled:opacity-50 rounded-[var(--radius-md)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-ink)] text-[var(--color-paper-raised)] hover:bg-[var(--color-ink-soft)] active:translate-y-px",
        amber:
          "bg-[var(--color-amber)] text-[var(--accent-foreground)] hover:bg-[var(--color-amber-deep)] active:translate-y-px",
        secondary:
          "border border-[var(--color-line-strong)] bg-[var(--color-paper-raised)] text-[var(--color-ink)] shadow-[var(--shadow-xs)] hover:border-[var(--color-amber)] hover:shadow-[var(--shadow-sm)]",
        ghost:
          "bg-transparent text-[var(--color-ink-soft)] underline-offset-4 hover:underline",
        danger:
          "bg-[var(--color-burgundy)] text-[var(--color-paper-raised)] hover:brightness-110 active:translate-y-px",
      },
      size: {
        /* Touch floor ≥44px across sizes */
        sm: "min-h-11 px-3 text-sm",
        md: "min-h-11 px-4 text-base",
        lg: "min-h-12 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
