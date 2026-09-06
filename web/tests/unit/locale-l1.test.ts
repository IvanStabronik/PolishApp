import { describe, expect, it } from "vitest";
import {
  LEARNER_L1,
  UI_LOCALES,
  type LearnerL1,
  type UiLocale,
} from "@/lib/enums";

describe("locale / L1 enums", () => {
  it("keeps UI locales distinct from learner L1 codes", () => {
    expect(UI_LOCALES).toEqual(["ru", "uk", "pl"]);
    expect(LEARNER_L1).toEqual(["ukr", "rus", "bel"]);
    // No silent collapse: UI "uk" is not the same token as L1 "ukr"
    expect(UI_LOCALES.includes("ukr" as UiLocale)).toBe(false);
    expect(LEARNER_L1.includes("uk" as LearnerL1)).toBe(false);
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
    expect(isUi("en")).toBe(false);
    expect(isL1("bel")).toBe(true);
    expect(isL1("pl")).toBe(false);
  });
});
