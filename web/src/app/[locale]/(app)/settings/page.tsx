"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/brand/page-intro";
import { StatusPanel } from "@/components/brand/status-panel";
import { MyFeedbackList } from "@/components/feedback/my-feedback-list";
import {
  LEARNER_L1,
  UI_LOCALES,
  type LearnerL1,
  type UiLocale,
} from "@/lib/enums";

type WeeklyGoal = "60" | "180" | "300" | "3" | "5" | "8";
type Goal = "life" | "exam" | "study";

function normalizeWeekly(value: number | null | undefined): WeeklyGoal {
  if (value === 60 || value === 180 || value === 300) return String(value) as WeeklyGoal;
  if (value === 3 || value === 5 || value === 8) return String(value) as WeeklyGoal;
  return "180";
}

function normalizeGoal(value: string | null | undefined): Goal {
  if (value === "life" || value === "exam" || value === "study") return value;
  return "life";
}

export default function SettingsPage() {
  const t = useTranslations("settings");
  const to = useTranslations("onboarding");
  const tc = useTranslations("common");
  const locale = useLocale() as UiLocale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [pwPending, startPwTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uiLocale, setUiLocale] = useState<UiLocale>(locale);
  const [l1, setL1] = useState<LearnerL1>("ukr");
  const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal>("180");
  const [goal, setGoal] = useState<Goal>("life");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/profile", { credentials: "include" });
        if (!res.ok) return;
        const data = (await res.json()) as {
          profile?: {
            uiLocale?: UiLocale;
            l1?: LearnerL1;
            weeklyGoal?: number | null;
            goal?: string | null;
          } | null;
        };
        if (cancelled || !data.profile) return;
        if (data.profile.uiLocale) setUiLocale(data.profile.uiLocale);
        if (data.profile.l1) setL1(data.profile.l1);
        setWeeklyGoal(normalizeWeekly(data.profile.weeklyGoal ?? undefined));
        setGoal(normalizeGoal(data.profile.goal));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function onChangePassword(e: FormEvent) {
    e.preventDefault();
    setPwSaved(false);
    setPwError(null);
    if (newPassword !== confirmPassword) {
      setPwError(t("passwordMismatch"));
      return;
    }
    startPwTransition(async () => {
      try {
        const res = await fetch("/api/profile/password", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          if (
            body?.error === "invalid_current" ||
            body?.error === "too_short" ||
            body?.error === "same_password" ||
            body?.error === "validation_failed"
          ) {
            setPwError(t("passwordInvalid"));
          } else {
            setPwError(t("passwordFailed"));
          }
          return;
        }
        setPwSaved(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch {
        setPwError(t("passwordFailed"));
      }
    });
  }

  function onSave(e: FormEvent) {
    e.preventDefault();
    setSaved(false);
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uiLocale,
            l1,
            weeklyGoal: Number(weeklyGoal),
            goal,
          }),
        });
        if (!res.ok) {
          setError(t("save"));
          return;
        }
        setSaved(true);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(
            "slowarium.onboarding",
            JSON.stringify({
              uiLocale,
              l1,
              weeklyGoal: Number(weeklyGoal),
              goal,
              at: Date.now(),
            }),
          );
        }
        if (uiLocale !== locale) {
          router.replace("/settings", { locale: uiLocale });
        }
      } catch {
        setError(t("save"));
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageIntro title={t("title")} lead={t("lead")} />

      {loading ? (
        <StatusPanel kind="loading">{tc("loading")}</StatusPanel>
      ) : (
        <div className="surface-panel motion-fade-rise-delay max-w-xl p-4 sm:p-6">
          <form onSubmit={onSave} className="flex flex-col gap-6">
            <fieldset className="m-0 border-0 p-0" disabled={pending}>
              <legend className="font-medium text-[var(--color-ink)]">
                {t("uiLocale")}
              </legend>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {UI_LOCALES.map((code) => (
                  <label
                    key={code}
                    className="inline-flex min-h-11 items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      checked={uiLocale === code}
                      onChange={() => setUiLocale(code)}
                    />
                    {code.toUpperCase()}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="m-0 border-0 p-0" disabled={pending}>
              <legend className="font-medium text-[var(--color-ink)]">
                {t("l1")}
              </legend>
              <div className="mt-2 flex flex-col gap-1">
                {LEARNER_L1.map((code) => (
                  <label
                    key={code}
                    className="inline-flex min-h-11 items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      checked={l1 === code}
                      onChange={() => setL1(code)}
                    />
                    {code === "ukr"
                      ? to("l1Ukr")
                      : code === "rus"
                        ? to("l1Rus")
                        : to("l1Bel")}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="m-0 border-0 p-0" disabled={pending}>
              <legend className="font-medium text-[var(--color-ink)]">
                {t("goal")}
              </legend>
              <div className="mt-2 flex flex-col gap-1">
                {(
                  [
                    ["life", "goalLife"],
                    ["exam", "goalExam"],
                    ["study", "goalStudy"],
                  ] as const
                ).map(([code, key]) => (
                  <label
                    key={code}
                    className="inline-flex min-h-11 items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      checked={goal === code}
                      onChange={() => setGoal(code)}
                    />
                    {to(key)}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="m-0 border-0 p-0" disabled={pending}>
              <legend className="font-medium text-[var(--color-ink)]">
                {t("weeklyGoal")}
              </legend>
              <div className="mt-2 flex flex-col gap-1">
                {(
                  [
                    ["60", "weekly60"],
                    ["180", "weekly180"],
                    ["300", "weekly300"],
                  ] as const
                ).map(([code, key]) => (
                  <label
                    key={code}
                    className="inline-flex min-h-11 items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      checked={weeklyGoal === code}
                      onChange={() => setWeeklyGoal(code)}
                    />
                    {to(key)}
                  </label>
                ))}
              </div>
            </fieldset>

            <Button type="submit" disabled={pending}>
              {t("save")}
            </Button>
            {error ? (
              <p role="alert" className="m-0 text-sm text-[var(--color-error)]">
                {error}
              </p>
            ) : null}
            {saved ? (
              <p role="status" className="m-0 text-sm text-[var(--color-success)]">
                {t("saved")}
              </p>
            ) : null}
          </form>
        </div>
      )}

      {!loading ? (
        <div className="surface-panel motion-fade-rise-delay max-w-xl p-4 sm:p-6">
          <form onSubmit={onChangePassword} className="flex flex-col gap-4">
            <h2 className="m-0 text-base font-medium text-[var(--color-ink)]">
              {t("passwordTitle")}
            </h2>
            <label className="flex flex-col gap-1 text-sm">
              <span>{t("currentPassword")}</span>
              <input
                type="password"
                autoComplete="current-password"
                className="min-h-11 rounded border border-[var(--color-border)] bg-transparent px-3"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                data-testid="settings-current-password"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>{t("newPassword")}</span>
              <input
                type="password"
                autoComplete="new-password"
                minLength={8}
                className="min-h-11 rounded border border-[var(--color-border)] bg-transparent px-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                data-testid="settings-new-password"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span>{t("confirmPassword")}</span>
              <input
                type="password"
                autoComplete="new-password"
                minLength={8}
                className="min-h-11 rounded border border-[var(--color-border)] bg-transparent px-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                data-testid="settings-confirm-password"
              />
            </label>
            <Button type="submit" disabled={pwPending}>
              {t("changePassword")}
            </Button>
            {pwError ? (
              <p role="alert" className="m-0 text-sm text-[var(--color-error)]">
                {pwError}
              </p>
            ) : null}
            {pwSaved ? (
              <p role="status" className="m-0 text-sm text-[var(--color-success)]">
                {t("passwordChanged")}
              </p>
            ) : null}
          </form>
        </div>
      ) : null}

      <MyFeedbackList />
    </div>
  );
}
