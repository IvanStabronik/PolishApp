import type { ReactNode } from "react";
import { SiteHeader } from "@/components/brand/site-header";
import { PreviewBanner } from "@/components/brand/preview-banner";
import {
  canAccessDraftContent,
  isPrivateAlphaPreviewEnv,
} from "@/lib/demo";
import { protectApp } from "@/lib/auth/protect";

export default async function AppShellLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await protectApp(locale);
  const canDraft = canAccessDraftContent({
    roles: session.roles,
    email: session.user.email,
    isPreviewEnv: isPrivateAlphaPreviewEnv(),
  });

  return (
    <>
      <SiteHeader signedIn />
      {canDraft ? <PreviewBanner /> : null}
      <div id="main-content" className="page-shell pb-16" tabIndex={-1}>
        {children}
      </div>
    </>
  );
}
