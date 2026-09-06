import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";

type PreviewBannerProps = {
  className?: string;
};

export async function PreviewBanner({ className }: PreviewBannerProps) {
  const t = await getTranslations("demo");
  return (
    <aside
      role="status"
      data-testid="preview-banner"
      className={cn(
        "border-b border-[var(--color-warning)] bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
        className,
      )}
    >
      <div className="page-shell py-3">
        <p className="m-0 font-display text-base font-semibold">
          {t("bannerTitle")}
        </p>
        <p className="m-0 mt-1 text-sm text-[var(--color-ink-soft)]">
          {t("bannerBody")}
        </p>
      </div>
    </aside>
  );
}
