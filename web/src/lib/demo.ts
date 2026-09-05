/**
 * Demo / internal preview gate.
 * DRAFT modules (e.g. Pierwsze spotkanie) appear only when enabled.
 *
 * Explicit DEMO_PREVIEW=false|0 wins so ops/e2e can force the publish gate
 * even when NEXT_PUBLIC_DEMO_PREVIEW was inlined at build time.
 */
export function isDemoPreviewEnabled(): boolean {
  const demo = process.env.DEMO_PREVIEW;
  if (demo === "0" || demo === "false") return false;
  if (demo === "1" || demo === "true") return true;

  return (
    process.env.NEXT_PUBLIC_DEMO_PREVIEW === "1" ||
    process.env.NEXT_PUBLIC_DEMO_PREVIEW === "true"
  );
}
