"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateSettings } from "@/modules/profiles";
import {
  LEARNER_L1,
  UI_LOCALES,
  type LearnerL1,
  type UiLocale,
} from "@/lib/enums";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const to = useTranslations("onboarding");
  const locale = useLocale() as UiLocale;
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [uiLocale, setUiLocale] = useState<UiLocale>(locale);
  const [l1, setL1] = useState<LearnerL1>("ukr");
  const [weeklyGoal, setWeeklyGoal] = useState<"3" | "5" | "8">("5");
  const [goal, setGoal] = useState<"life" | "exam" | "study">("life");

  function onSave(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateSettings({ uiLocale, l1, weeklyGoal, goal });
      setSaved(true);
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display m-0 text-3xl">{t("title")}</h1>
        <p className="mt-2 text-[var(--color-graphite)]">{t("lead")}</p>
      </header>

      <Card>
        <form onSubmit={onSave} className="flex flex-col gap-6">
          <fieldset className="m-0 border-0 p-0">
            <legend className="font-medium">{t("uiLocale")}</legend>
            <div className="mt-2 flex gap-4">
              {UI_LOCALES.map((code) => (
                <label key={code} className="flex items-center gap-2 text-sm">
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

          <fieldset className="m-0 border-0 p-0">
            <legend className="font-medium">{t("l1")}</legend>
            <div className="mt-2 flex flex-col gap-2">
              {LEARNER_L1.map((code) => (
                <label key={code} className="flex items-center gap-2 text-sm">
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

          <fieldset className="m-0 border-0 p-0">
            <legend className="font-medium">{t("goal")}</legend>
            <div className="mt-2 flex flex-col gap-2">
              {(
                [
                  ["life", "goalLife"],
                  ["exam", "goalExam"],
                  ["study", "goalStudy"],
                ] as const
              ).map(([code, key]) => (
                <label key={code} className="flex items-center gap-2 text-sm">
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

          <fieldset className="m-0 border-0 p-0">
            <legend className="font-medium">{t("weeklyGoal")}</legend>
            <div className="mt-2 flex flex-col gap-2">
              {(
                [
                  ["3", "weekly3"],
                  ["5", "weekly5"],
                  ["8", "weekly8"],
                ] as const
              ).map(([code, key]) => (
                <label key={code} className="flex items-center gap-2 text-sm">
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
          {saved ? (
            <p role="status" className="m-0 text-sm text-[var(--color-success)]">
              {t("saved")}
            </p>
          ) : null}
        </form>
      </Card>
    </div>
  );
}
