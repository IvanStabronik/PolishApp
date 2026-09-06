"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { safeReturnTo } from "@/modules/auth/safe-return-to";
import { routing } from "@/i18n/routing";

type Mode = "register" | "login";

function defaultPostAuthPath(mode: Mode, locale: string, onboarded: boolean) {
  if (onboarded) return `/${locale}/dashboard`;
  return `/${locale}/onboarding`;
}

export function AuthForm({ mode }: { mode: Mode }) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function resolveDestination(): Promise<string> {
    const fromQuery = safeReturnTo(searchParams.get("returnTo"));
    if (fromQuery) return fromQuery;

    let onboarded = false;
    try {
      const res = await fetch("/api/profile", { credentials: "include" });
      if (res.ok) {
        const data = (await res.json()) as {
          profile?: { onboardingComplete?: boolean } | null;
        };
        onboarded = Boolean(data.profile?.onboardingComplete);
      }
    } catch {
      /* treat as not onboarded */
    }
    return defaultPostAuthPath(mode, locale, onboarded);
  }

  async function submit() {
    setError(null);
    const endpoint =
      mode === "register"
        ? "/api/auth/sign-up/email"
        : "/api/auth/sign-in/email";

    try {
      const body =
        mode === "register"
          ? { email, password, name: name || email.split("@")[0] }
          : { email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let detail = t("errorGeneric");
        try {
          const payload = (await res.json()) as { message?: string };
          if (payload.message) detail = payload.message;
        } catch {
          /* ignore */
        }
        setError(detail);
        return;
      }

      const nextPath = await resolveDestination();
      // Full document navigation (replace) so the session cookie is on the next
      // document request. Prefer absolute same-origin URL for Playwright stability.
      const safe = safeReturnTo(nextPath) ?? `/${locale}/dashboard`;
      const localePrefixed = routing.locales.some(
        (l) => safe === `/${l}` || safe.startsWith(`/${l}/`),
      );
      const href = localePrefixed ? safe : `/${locale}${safe === "/" ? "" : safe}`;
      window.location.replace(href);
    } catch {
      setError(t("errorGeneric"));
    }
  }

  return (
    <form
      data-testid="auth-form"
      className="prose-narrow flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => void submit());
      }}
    >
      {mode === "register" ? (
        <div className="field">
          <label htmlFor="name">{t("name")}</label>
          <input
            id="name"
            name="name"
            data-testid="register-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="email">{t("email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          data-testid={mode === "register" ? "register-email" : "login-email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      <div className="field">
        <label htmlFor="password">{t("password")}</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          data-testid={
            mode === "register" ? "register-password" : "login-password"
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={
            mode === "register" ? "new-password" : "current-password"
          }
        />
      </div>
      {error ? (
        <p
          role="alert"
          data-testid="auth-error"
          className="m-0 text-sm text-[var(--color-error)]"
        >
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={pending}
        data-testid={mode === "register" ? "register-submit" : "login-submit"}
      >
        {mode === "register" ? t("submitRegister") : t("submitSignIn")}
      </Button>
      <p className="m-0 text-sm text-[var(--color-graphite)]">{t("helpNote")}</p>
      <p className="m-0 text-sm">
        {mode === "register" ? (
          <>
            {t("haveAccount")}{" "}
            <Link href="/login" className="text-[var(--color-forest)]">
              {t("submitSignIn")}
            </Link>
          </>
        ) : (
          <>
            {t("needAccount")}{" "}
            <Link href="/register" className="text-[var(--color-forest)]">
              {t("submitRegister")}
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
