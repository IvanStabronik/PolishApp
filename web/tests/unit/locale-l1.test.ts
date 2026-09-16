import { describe, expect, it } from "vitest";
import {
  LEARNER_L1,
  UI_LOCALES,
  preferredUiLocaleForL1,
  type LearnerL1,
  type UiLocale,
} from "@/lib/enums";
import { locales, routing } from "@/i18n/routing";

describe("locale / L1 enums", () => {
  it("keeps UI locales distinct from learner L1 codes", () => {
    expect(UI_LOCALES).toEqual(["ru", "uk", "pl", "be"]);
    expect(LEARNER_L1).toEqual(["ukr", "rus", "bel"]);
    // No silent collapse: UI "uk"/"be" are not the same tokens as L1 "ukr"/"bel"
    expect(UI_LOCALES.includes("ukr" as UiLocale)).toBe(false);
    expect(UI_LOCALES.includes("bel" as UiLocale)).toBe(false);
    expect(LEARNER_L1.includes("uk" as LearnerL1)).toBe(false);
    expect(LEARNER_L1.includes("be" as LearnerL1)).toBe(false);
  });

  it("exposes be as a first-class next-intl route locale", () => {
    expect(locales).toContain("be");
    expect(routing.locales).toEqual(["ru", "uk", "pl", "be"]);
    expect(routing.defaultLocale).toBe("ru");
  });

  it("prefers matching UI locale for each L1 (BEL → be, not ru)", () => {
    expect(preferredUiLocaleForL1("bel")).toBe("be");
    expect(preferredUiLocaleForL1("ukr")).toBe("uk");
    expect(preferredUiLocaleForL1("rus")).toBe("ru");
  });

  it("does not treat changing UI locale as changing L1", () => {
    const profile = { uiLocale: "ru" as UiLocale, l1: "ukr" as LearnerL1 };
    const nextUi: UiLocale = "pl";
    const updated = { ...profile, uiLocale: nextUi };
    expect(updated.l1).toBe("ukr");
    expect(updated.uiLocale).toBe("pl");
  });

  it("does not treat changing L1 as changing UI locale", () => {
    const profile = { uiLocale: "ru" as UiLocale, l1: "ukr" as LearnerL1 };
    const nextL1: LearnerL1 = "bel";
    const updated = { ...profile, l1: nextL1 };
    expect(updated.uiLocale).toBe("ru");
    expect(updated.l1).toBe("bel");
  });

  it("rejects unknown codes at the type boundary via runtime guards", () => {
    const isUi = (v: string): v is UiLocale =>
      (UI_LOCALES as readonly string[]).includes(v);
    const isL1 = (v: string): v is LearnerL1 =>
      (LEARNER_L1 as readonly string[]).includes(v);

    expect(isUi("ru")).toBe(true);
    expect(isUi("be")).toBe(true);
    expect(isUi("en")).toBe(false);
    expect(isL1("bel")).toBe(true);
    expect(isL1("pl")).toBe(false);
  });
});

describe("be message catalog", () => {
  it("ships learner-facing namespaces with Belarusian (not Russian) chrome", async () => {
    const be = (await import("@/i18n/messages/be.json")).default as {
      nav: { dashboard: string; learn: string };
      dashboard: { title: string; lead: string };
      auth: { signInTitle: string };
      progress: { title: string };
      beta: { inviteTitle: string };
      onboarding: { l1Bel: string; stepLocale: string };
      learn: { dailyPlan: string };
    };
    const ru = (await import("@/i18n/messages/ru.json")).default as {
      nav: { dashboard: string };
      dashboard: { lead: string };
    };

    expect(be.nav.dashboard).toBe("Кабінет");
    expect(be.nav.learn).toBe("Вучоба");
    expect(be.dashboard.title).toBe("Кабінет");
    expect(be.auth.signInTitle).toBe("Уваход");
    expect(be.progress.title).toBe("Прагрэс");
    expect(be.beta.inviteTitle).toMatch(/запрашэнне/i);
    expect(be.onboarding.l1Bel).toBe("Беларуская");
    expect(be.onboarding.stepLocale).toMatch(/інтэрфейсу/i);
    expect(be.learn.dailyPlan).toMatch(/План дня/i);
    // Must not silently ship the Russian lead string.
    expect(be.dashboard.lead).not.toBe(ru.dashboard.lead);
    expect(be.dashboard.lead).toMatch(/маршруце|ачкі/i);
  });
});
