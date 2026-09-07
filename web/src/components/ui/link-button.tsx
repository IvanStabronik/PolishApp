import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";
import { buttonVariants, type ButtonVariantProps } from "@/lib/ui-variants";

type LinkButtonProps = ComponentProps<typeof Link> &
  ButtonVariantProps & {
    variant?: NonNullable<ButtonVariantProps["variant"]> | "primary" | "secondary" | "ghost" | "amber";
  };

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), "no-underline", className)}
      {...props}
    />
  );
}
