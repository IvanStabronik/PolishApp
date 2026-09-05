import type { ReactNode } from "react";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import { isDemoPreviewEnabled } from "@/lib/demo";

export default function AppShellLayout({
  children,
}: {
  children: ReactNode;
}) {
  const draftPreview = isDemoPreviewEnabled();

  return (
    <>
      <SiteHeader signedIn />
      {draftPreview ? <PreviewBanner /> : null}
      <div id="main-content" className="page-shell pb-16" tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
