"use client";

import { useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type InviteState =
  | { kind: "loading" }
  | { kind: "ok"; expiresAt: string }
  | { kind: "error"; reason: string };

export function InviteAcceptForm({ token }: { token: string }) {
  const t = useTranslations("beta");
  const locale = useLocale();
  const [state, setState] = useState<InviteState>({ kind: "loading" });
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const res = await fetch(`/api/beta/invite?token=${encodeURIComponent(token)}`);
      const data = (await res.json()) as {
        ok?: boolean;
        reason?: string;
        expiresAt?: string;
      };
      if (cancelled) return;
      if (data.ok && data.expiresAt) {
        setState({ kind: "ok", expiresAt: data.expiresAt });
      } else {
        setState({ kind: "error", reason: data.reason ?? "invalid" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (state.kind === "loading") {
    return (
      <p data-testid="invite-loading" className="text-[var(--color-graphite)]">
        {t("loading")}
      </p>
    );
  }

  if (state.kind === "error") {
    return (
      <div
        data-testid={`invite-state-${state.reason}`}
        className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-raised)] p-6"
        role="alert"
      >
        <h2 className="m-0 font-display text-2xl text-[var(--color-ink)]">
          {t(`reason_${state.reason}` as "reason_invalid")}
        </h2>
        <p className="mt-2 text-[var(--color-graphite)]">{t("reasonLead")}</p>
      </div>
    );
  }

  async function submit(form: HTMLFormElement) {
    setError(null);
    const fd = new FormData(form);
    const res = await fetch("/api/beta/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: window.location.origin,
        Referer: window.location.href,
      },
      credentials: "include",
      body: JSON.stringify({
        token,
        email: String(fd.get("email") ?? "").trim(),
        password: String(fd.get("password") ?? ""),
        name: String(fd.get("name") ?? "").trim(),
      }),
    });
    if (!res.ok) {
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      setError(payload.error ?? t("errorGeneric"));
      return;
    }
    // Sign in via Better Auth then go to onboarding
    const signIn = await fetch("/api/auth/sign-in/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: window.location.origin,
        Referer: window.location.href,
      },
      credentials: "include",
      body: JSON.stringify({
        email: String(fd.get("email") ?? "").trim(),
        password: String(fd.get("password") ?? ""),
      }),
    });
    if (!signIn.ok) {
      window.location.replace(`/${locale}/login`);
      return;
    }
    window.location.replace(`/${locale}/onboarding`);
  }

  return (
    <form
      data-testid="invite-accept-form"
      className="prose-narrow flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        startTransition(() => void submit(form));
      }}
    >
      <p className="m-0 text-sm text-[var(--color-graphite)]" data-testid="invite-valid">
        {t("validUntil", { date: new Date(state.expiresAt).toLocaleString(locale) })}
      </p>
      <div className="field">
        <label htmlFor="name">{t("name")}</label>
        <input
          id="name"
          name="name"
          data-testid="invite-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="email">{t("email")}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          data-testid="invite-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          data-testid="invite-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error ? (
        <p role="alert" data-testid="invite-error" className="m-0 text-sm text-[var(--color-error)]">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} data-testid="invite-submit">
        {t("submit")}
      </Button>
    </form>
  );
}
