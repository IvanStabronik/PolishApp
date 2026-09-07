import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BrandMark } from "@/components/brand/brand-mark";

type AuthShellProps = {
  children: ReactNode;
  /** Short RU chrome line under brand on the ink panel */
  atmosphereLine?: string;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Brand-first auth composition: ink archive panel + paper form.
 * Desktop split; stacks on narrow viewports. One job: get the researcher in.
 */
export function AuthShell({
  children,
  atmosphereLine = "Od podobnych słów do własnego głosu",
  className,
  ...props
}: AuthShellProps) {
  return (
    <div
      className={cn(
        "auth-shell grid min-h-[calc(100vh-4.5rem)] overflow-hidden lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]",
        className,
      )}
      {...props}
    >
      <aside
        className="auth-shell__atmosphere relative isolate flex flex-col justify-between gap-10 overflow-hidden px-6 py-10 text-[var(--color-paper-raised)] sm:px-10 lg:px-12 lg:py-14"
        aria-hidden={false}
      >
        <div className="motion-fade-rise relative z-[1]">
          <BrandMark tone="paper" />
        </div>
        <div className="motion-fade-rise-delay relative z-[1] max-w-md">
          <p className="font-display m-0 text-[clamp(1.75rem,4vw,2.75rem)] leading-[var(--leading-tight)]">
            {atmosphereLine}
          </p>
          <div
            className="motion-ink-line mt-5 h-px w-24 bg-[var(--color-amber-soft)]"
            aria-hidden
          />
        </div>
      </aside>

      <div className="auth-shell__form flex items-start lg:items-center">
        <div className="page-shell w-full max-w-xl py-8 sm:py-12">{children}</div>
      </div>
    </div>
  );
}
