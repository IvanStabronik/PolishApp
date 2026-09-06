import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
  tone?: "ink" | "paper";
};

export function BrandMark({
  compact = false,
  className,
  tone = "ink",
}: BrandMarkProps) {
  const color =
    tone === "paper" ? "text-[var(--color-paper-raised)]" : "text-[var(--color-ink)]";
  const muted =
    tone === "paper"
      ? "text-[color-mix(in_srgb,var(--color-paper-raised)_75%,transparent)]"
      : "text-[var(--color-graphite)]";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Link
        href="/"
        className={cn(
          "font-display font-semibold tracking-[0.04em] no-underline",
          color,
          compact ? "text-xl" : "text-[length:var(--text-hero)] leading-[var(--leading-tight)]",
        )}
      >
        SŁOWARIUM
      </Link>
      {!compact ? (
        <p className={cn("m-0 text-sm sm:text-base", muted)}>
          Archive of Living Speech · Akademia języka polskiego
        </p>
      ) : (
        <p className={cn("m-0 text-xs", muted)}>Archive of Living Speech</p>
      )}
    </div>
  );
}
