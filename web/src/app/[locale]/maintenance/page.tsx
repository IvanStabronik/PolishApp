import { SiteHeader } from "@/components/brand/site-header";

export default function MaintenancePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-shell" data-testid="maintenance-page">
        <h1 className="font-display text-3xl">Maintenance</h1>
        <p className="mt-2 text-[var(--color-graphite)]">
          SŁOWARIUM is temporarily unavailable. Learning progress is safe in
          Postgres; try again shortly.
        </p>
      </main>
    </>
  );
}
