import { cva, type VariantProps } from "class-variance-authority";

/** Shared Slowarium button surface — ink/amber archive, not Radix Themes defaults. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-150 disabled:cursor-not-allowed disabled:opacity-50 rounded-[var(--radius-md)]",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0C1A2B] text-[#F2EBDD] hover:bg-[#1A2D42] active:translate-y-px forced-colors:border forced-colors:border-[CanvasText]",
        amber:
          "bg-[#B06D1A] text-[#FFF8EF] hover:bg-[#8A5412] active:translate-y-px forced-colors:border forced-colors:border-[CanvasText]",
        secondary:
          "border border-[#9A8F7C] bg-[#F2EBDD] text-[#0C1A2B] shadow-[var(--shadow-xs)] hover:border-[#B06D1A] hover:shadow-[var(--shadow-sm)]",
        ghost:
          "bg-transparent text-[#1A2D42] underline-offset-4 hover:underline",
        danger:
          "bg-[#6E3D42] text-[#F2EBDD] hover:brightness-110 active:translate-y-px",
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
