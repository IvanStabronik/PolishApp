"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { BrandMark } from "./brand-mark";

const LINKS = [
  { href: "/dashboard" as const, key: "dashboard" as const, testId: "link-dashboard" },
  { href: "/learn/a1" as const, key: "learn" as const, testId: "link-learn" },
  { href: "/progress" as const, key: "progress" as const, testId: "link-progress" },
  { href: "/settings" as const, key: "settings" as const, testId: "link-settings" },
  { href: "/privacy" as const, key: "privacy" as const, testId: "link-privacy" },
];

export function SiteHeader({ signedIn = false }: { signedIn?: boolean }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* still redirect — server session may already be gone */
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      data-testid="site-header"
      className="border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-paper-raised)_90%,transparent)] backdrop-blur-sm"
    >
      <div className="page-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-end sm:justify-between">
        <BrandMark compact />
        <nav aria-label={t("menu")} className="flex flex-wrap gap-x-4 gap-y-2">
          {signedIn ? (
            <>
              {LINKS.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-testid={item.testId}
                    className={cn(
                      "text-sm font-medium no-underline transition-colors",
                      active
                        ? "text-[var(--color-amber-deep)]"
                        : "text-[var(--color-graphite)] hover:text-[var(--color-ink)]",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
              <button
                type="button"
                data-testid="link-logout"
                onClick={() => void signOut()}
                className="cursor-pointer border-0 bg-transparent p-0 text-sm font-medium text-[var(--color-graphite)] hover:text-[var(--color-ink)]"
              >
                {t("signOut")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                data-testid="link-login"
                className="text-sm font-medium text-[var(--color-graphite)] no-underline hover:text-[var(--color-ink)]"
              >
                {t("signIn")}
              </Link>
              <Link
                href="/register"
                data-testid="link-register"
                className="text-sm font-medium text-[var(--color-amber-deep)] no-underline hover:underline"
              >
                {t("register")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
