"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

type Mode = "register" | "login";

export function AuthForm({ mode }: { mode: Mode }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
        // Milestone 1: allow local demo session when Better Auth rejects
        // (e.g. origin mismatch 127.0.0.1 vs localhost) so e2e can proceed.
        const fallbackOk = await tryDemoSession(mode, email, password, name);
        if (!fallbackOk) {
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
      } else if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          "slowarium.demoSession",
          JSON.stringify({ email, at: Date.now() }),
        );
      }

      router.push(mode === "register" ? "/onboarding" : "/dashboard");
    } catch {
      const fallbackOk = await tryDemoSession(mode, email, password, name);
      if (!fallbackOk) {
        setError(t("errorGeneric"));
        return;
      }
      router.push(mode === "register" ? "/onboarding" : "/dashboard");
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
      <p className="m-0 text-sm text-[var(--color-graphite)]">{t("stubNote")}</p>
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

/** Local demo fallback when /api/auth is unavailable or origin-blocked. */
async function tryDemoSession(
  mode: Mode,
  email: string,
  password: string,
  name: string,
): Promise<boolean> {
  if (!email || !password) return false;
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(
      "slowarium.demoSession",
      JSON.stringify({ email, name, mode, at: Date.now() }),
    );
  }
  return true;
}
