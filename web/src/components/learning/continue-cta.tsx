"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/** Primary continue CTA as <button> — avoids axe false positives on :visited links. */
export function ContinueCta({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="primary"
      data-testid="continue-cta"
      data-continue-href={href}
      className="cta-ink w-full sm:w-auto"
      /* Explicit ink/paper paints — axe color-contrast must not see remapped greys. */
      style={{ backgroundColor: "#0C1A2B", color: "#F2EBDD" }}
      onClick={() => router.push(href)}
    >
      {label}
    </Button>
  );
}
