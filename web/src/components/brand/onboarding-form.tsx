"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { LEARNER_L1, UI_LOCALES, type LearnerL1, type UiLocale } from "@/lib/enums";
import { Button } from "@/components/ui/button";

type Goal = "life" | "exam" | "study";
type Weekly = "60" | "180" | "300";
type Level = "a0" | "a1" | "a2";

export function OnboardingForm() {
  const t = useTranslations("onboarding");
  const locale = useLocale() as UiLocale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [uiLocale, setUiLocale] = useState<UiLocale>(locale);
  const [l1, setL1] = useState<LearnerL1>("ukr");
  const [level, setLevel] = useState<Level>("a1");
  const [goal, setGoal] = useState<Goal>("life");
  const [weekly, setWeekly] = useState<Weekly>("180");
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentResearch, setConsentResearch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    ageConfirmed && consentTerms && consentPrivacy && !pending;

  function submit() {
    setError(null);
    if (!canSubmit) {
      setError(t("validation"));
      return;
    }
    startTransition(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "slowarium.onboarding",
          JSON.stringify({
            ageConfirmed18: true,
            uiLocale,
            l1,
            level,
            goal,
            weeklyMinutes: Number(weekly),
            consents: {
              terms: consentTerms,
              privacy: consentPrivacy,
              research: consentResearch,
            },
            at: Date.now(),
          }),
        );
      }
      // Switch UI locale if the learner picked a different menu language.
      if (uiLocale !== locale) {
        router.replace("/dashboard", { locale: uiLocale });
      } else {
        router.push("/dashboard");
      }
    });
  }

  return (
    <form
      data-testid="onboarding-form"
      className="prose-narrow flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepAge")}
        </legend>
        <label className="choice-row mt-3">
          <input
            type="checkbox"
            data-testid="onboarding-age"
            checked={ageConfirmed}
            onChange={(e) => setAgeConfirmed(e.target.checked)}
            required
          />
          <span>{t("ageConfirm")}</span>
        </label>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepLocale")}
        </legend>
        <div className="field mt-3">
          <label htmlFor="uiLocale">{t("stepLocale")}</label>
          <select
            id="uiLocale"
            name="uiLocale"
            data-testid="onboarding-ui-locale"
            value={uiLocale}
            onChange={(e) => setUiLocale(e.target.value as UiLocale)}
          >
            {UI_LOCALES.map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepL1")}
        </legend>
        <p className="mt-2 text-sm text-[var(--color-graphite)]">{t("l1Hint")}</p>
        <div className="mt-3 flex flex-col gap-2" data-testid="onboarding-l1">
          {LEARNER_L1.map((code) => (
            <label key={code} className="choice-row">
              <input
                type="radio"
                name="l1"
                value={code}
                data-testid={`onboarding-l1-${code}`}
                checked={l1 === code}
                onChange={() => setL1(code)}
              />
              <span>
                {code === "ukr"
                  ? t("l1Ukr")
                  : code === "rus"
                    ? t("l1Rus")
                    : t("l1Bel")}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepLevel")}
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {(
            [
              ["a0", "levelA0"],
              ["a1", "levelA1"],
              ["a2", "levelA2"],
            ] as const
          ).map(([value, key]) => (
            <label key={value} className="choice-row">
              <input
                type="radio"
                name="level"
                checked={level === value}
                onChange={() => setLevel(value)}
              />
              <span>{t(key)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepGoal")}
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {(
            [
              ["life", "goalLife"],
              ["exam", "goalExam"],
              ["study", "goalStudy"],
            ] as const
          ).map(([value, key]) => (
            <label key={value} className="choice-row">
              <input
                type="radio"
                name="goal"
                checked={goal === value}
                onChange={() => setGoal(value)}
              />
              <span>{t(key)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepWeekly")}
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          {(
            [
              ["60", "weekly60"],
              ["180", "weekly180"],
              ["300", "weekly300"],
            ] as const
          ).map(([value, key]) => (
            <label key={value} className="choice-row">
              <input
                type="radio"
                name="weekly"
                checked={weekly === value}
                onChange={() => setWeekly(value)}
              />
              <span>{t(key)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="font-display text-xl text-[var(--color-ink)]">
          {t("stepConsent")}
        </legend>
        <div className="mt-3 flex flex-col gap-2">
          <label className="choice-row">
            <input
              type="checkbox"
              data-testid="onboarding-consent-terms"
              checked={consentTerms}
              onChange={(e) => setConsentTerms(e.target.checked)}
              required
            />
            <span>{t("consentTerms")}</span>
          </label>
          <label className="choice-row">
            <input
              type="checkbox"
              data-testid="onboarding-consent-privacy"
              checked={consentPrivacy}
              onChange={(e) => setConsentPrivacy(e.target.checked)}
              required
            />
            <span>{t("consentPrivacy")}</span>
          </label>
          <label className="choice-row">
            <input
              type="checkbox"
              data-testid="onboarding-consent-research"
              checked={consentResearch}
              onChange={(e) => setConsentResearch(e.target.checked)}
            />
            <span>{t("consentResearch")}</span>
          </label>
        </div>
      </fieldset>

      {error ? (
        <p role="alert" className="m-0 text-sm text-[var(--color-error)]">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={!canSubmit}
        data-testid="onboarding-continue"
      >
        {t("submit")}
      </Button>
    </form>
  );
}
