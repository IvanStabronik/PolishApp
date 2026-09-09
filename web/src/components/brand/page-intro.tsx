import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageIntroProps = {
  title: string;
  lead?: string;
  eyebrow?: string;
  children?: ReactNode;
  className?: string;
};

/** Shared archive-panel page header — brand eyebrow, display title, optional lead. */
export function PageIntro({
  title,
  lead,
  eyebrow = "SŁOWARIUM",
  children,
  className,
}: PageIntroProps) {
  return (
    <header className={cn("motion-fade-rise max-w-3xl", className)}>
      {eyebrow ? (
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-amber-deep)]">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[var(--leading-tight)] text-[var(--color-ink)]",
          eyebrow ? "mt-2" : "m-0",
        )}
      >
        {title}
      </h1>
      <div
        className="motion-ink-line mt-3 h-px w-16 bg-[var(--color-amber-soft)]"
        aria-hidden
      />
      {lead ? (
        <p className="motion-fade-rise-delay mt-3 max-w-xl text-[var(--color-graphite)] sm:text-lg">
          {lead}
        </p>
      ) : null}
      {children}
    </header>
  );
}
