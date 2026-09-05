import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Milestone 1 learner acceptance smoke (DEMO_PREVIEW on):
 * register → onboarding (RU UI + BEL L1) → dashboard → DRAFT module →
 * exercise types → feedback → result → progress → logout/login persistence →
 * export → delete
 *
 * Only skips when the app server is truly unreachable.
 */

async function isServerReady(request: APIRequestContext): Promise<boolean> {
  try {
    const res = await request.get("/", { timeout: 5_000 });
    return res.status() < 500;
  } catch {
    return false;
  }
}

async function answerCurrentExercise(page: Page) {
  const player = page.getByTestId("exercise-player");
  await expect(player).toBeVisible({ timeout: 20_000 });

  // If feedback is already on screen (retry / remount race), advance.
  if ((await page.getByTestId("exercise-feedback").count()) > 0) {
    const next = page.getByTestId("exercise-next");
    if ((await next.count()) > 0) {
      const exerciseId = await player.getAttribute("data-exercise-id");
      await next.click();
      await page.waitForFunction(
        (id) => {
          if (window.location.pathname.includes("/result")) return true;
          const el = document.querySelector('[data-testid="exercise-player"]');
          if (!el) return false;
          return el.getAttribute("data-exercise-id") !== id;
        },
        exerciseId,
        { timeout: 20_000 },
      );
      return;
    }
  }

  await expect(page.getByTestId("exercise-submit")).toBeVisible({
    timeout: 15_000,
  });

  const exerciseId = await player.getAttribute("data-exercise-id");
  const type = await player.getAttribute("data-exercise-type");

  if (type === "single_choice" || type === "multiple_choice") {
    await page
      .getByTestId("exercise-option")
      .locator("input:not(:disabled)")
      .first()
      .click({ force: true });
  } else if (type === "gap_fill") {
    const gaps = page.locator('[data-testid^="exercise-gap-"]:not([disabled])');
    const count = await gaps.count();
    for (let i = 0; i < count; i += 1) {
      await gaps.nth(i).fill("odpowiedz");
    }
  }

  await page.getByTestId("exercise-submit").click();
  await expect(page.getByTestId("exercise-feedback")).toBeVisible({
    timeout: 15_000,
  });
  await page.getByTestId("exercise-next").click();

  await page.waitForFunction(
    (id) => {
      if (window.location.pathname.includes("/result")) return true;
      const el = document.querySelector('[data-testid="exercise-player"]');
      if (!el) return false;
      return el.getAttribute("data-exercise-id") !== id;
    },
    exerciseId,
    { timeout: 20_000 },
  );
}

test.describe.configure({ mode: "serial" });

test.describe("Milestone 1 learner smoke", () => {
  test.beforeAll(async ({ request }) => {
    const ready = await isServerReady(request);
    test.skip(
      !ready,
      "SŁOWARIUM app server is not ready at PLAYWRIGHT_BASE_URL. Start with `pnpm dev` (web/) or let Playwright webServer boot it; use DATABASE_URL from .env.local (port 5433).",
    );
  });

  test("full learner path: register → delete", async ({ page }) => {
    test.setTimeout(240_000);

    const stamp = Date.now();
    const email = `e2e.learner.${stamp}@slowarium.test`;
    const password = "E2eTestPass123!";

    // --- Register ---
    await page.goto("/ru");
    await page.getByTestId("link-register").first().click();
    await expect(page).toHaveURL(/\/ru\/register/);

    await page.getByTestId("register-email").fill(email);
    await page.getByTestId("register-password").fill(password);
    await page.getByTestId("register-submit").click();
    await expect(page).toHaveURL(/\/ru\/onboarding/, { timeout: 20_000 });

    // --- Onboarding: RU UI + BEL L1 ---
    await expect(page.getByTestId("onboarding-form")).toBeVisible();
    await page.getByTestId("onboarding-age").check();
    await page.getByTestId("onboarding-ui-locale").selectOption("ru");
    await page.getByTestId("onboarding-l1-bel").check();
    await page.getByTestId("onboarding-consent-terms").check();
    await page.getByTestId("onboarding-consent-privacy").check();
    await page.getByTestId("onboarding-continue").click();
    await expect(page).toHaveURL(/\/ru\/dashboard/, { timeout: 20_000 });

    const onboarding = await page.evaluate(() =>
      window.localStorage.getItem("slowarium.onboarding"),
    );
    expect(onboarding).toBeTruthy();
    expect(JSON.parse(onboarding!)).toMatchObject({
      uiLocale: "ru",
      l1: "bel",
    });

    // --- Dashboard: DRAFT via demo preview ---
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
    await expect(page.getByTestId("preview-banner")).toBeVisible();
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();
    await page.getByTestId("module-open-pierwsze-spotkanie").click();
    await expect(page).toHaveURL(/\/learn\/pierwsze-spotkanie/);

    // --- Exercises (all types in module) → feedback → result ---
    await page.getByTestId("start-practice").click();
    await expect(page).toHaveURL(/\/exercise\//);

    const seenTypes = new Set<string>();
    for (let i = 0; i < 12; i += 1) {
      if (page.url().includes("/result")) break;
      const player = page.getByTestId("exercise-player");
      if ((await player.count()) === 0) break;
      const type = await player.getAttribute("data-exercise-type");
      if (type) seenTypes.add(type);
      await answerCurrentExercise(page);
    }

    expect(seenTypes.has("single_choice")).toBeTruthy();
    expect(seenTypes.has("multiple_choice")).toBeTruthy();
    expect(seenTypes.has("gap_fill")).toBeTruthy();
    expect(seenTypes.has("ordering")).toBeTruthy();

    await expect(page.getByTestId("lesson-result")).toBeVisible({
      timeout: 20_000,
    });
    await expect(page).toHaveURL(/\/learn\/pierwsze-spotkanie\/result/);

    // --- Progress ---
    await page.getByTestId("link-progress").click();
    await expect(page.getByTestId("progress-page")).toBeVisible();
    await expect(page).toHaveURL(/\/progress/);

    // --- Logout / login persistence (onboarding stays in localStorage) ---
    await page.getByTestId("link-logout").click();
    await expect(page).toHaveURL(/\/login/);
    const sessionAfterLogout = await page.evaluate(() =>
      window.sessionStorage.getItem("slowarium.demoSession"),
    );
    expect(sessionAfterLogout).toBeNull();
    const onboardingAfterLogout = await page.evaluate(() =>
      window.localStorage.getItem("slowarium.onboarding"),
    );
    expect(onboardingAfterLogout).toBeTruthy();

    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill(password);
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();
    const onboardingAfterLogin = await page.evaluate(() =>
      window.localStorage.getItem("slowarium.onboarding"),
    );
    expect(JSON.parse(onboardingAfterLogin!)).toMatchObject({
      uiLocale: "ru",
      l1: "bel",
    });

    // --- Export ---
    await page.getByTestId("link-privacy").click();
    await expect(page).toHaveURL(/\/privacy/);
    const downloadPromise = page
      .waitForEvent("download", { timeout: 15_000 })
      .catch(() => null);
    await page.getByTestId("privacy-export").click();
    await expect(page.getByTestId("privacy-export-status")).toBeVisible({
      timeout: 15_000,
    });
    await downloadPromise;

    // --- Delete ---
    await page.getByTestId("privacy-delete").click();
    const confirmInput = page.getByTestId("privacy-delete-confirm-input");
    await confirmInput.click();
    await confirmInput.fill("");
    await confirmInput.pressSequentially("DELETE", { delay: 20 });
    await expect(confirmInput).toHaveValue("DELETE");
    await expect(page.getByTestId("privacy-delete-confirm")).toBeEnabled();

    const deleteResponsePromise = page.waitForResponse(
      (res) => res.url().includes("/api/privacy/delete"),
      { timeout: 15_000 },
    );
    await page.getByTestId("privacy-delete-confirm").click({ force: true });
    const deleteResponse = await deleteResponsePromise;
    expect([200, 202]).toContain(deleteResponse.status());
    await expect(page.getByTestId("privacy-delete-status")).toBeVisible({
      timeout: 15_000,
    });
    const sessionAfterDelete = await page.evaluate(() =>
      window.sessionStorage.getItem("slowarium.demoSession"),
    );
    expect(sessionAfterDelete).toBeNull();
  });

  test("DEMO_PREVIEW on: banner and DRAFT module listed", async ({ page }) => {
    await page.goto("/ru/dashboard");
    await expect(page.getByTestId("preview-banner")).toBeVisible();
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();
  });
});
