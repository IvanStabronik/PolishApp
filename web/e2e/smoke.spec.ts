import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Milestone 2 private-alpha learner path (DEMO_PREVIEW on + seeded previewer):
 * register → onboarding (DB) → dashboard → DRAFT module → exercises →
 * result → progress → logout/login persistence from DB → export → delete
 *
 * Server/DB must be up — never skip.
 */

async function assertServerReady(request: APIRequestContext): Promise<void> {
  try {
    const res = await request.get("/", { timeout: 10_000 });
    if (res.status() >= 500) {
      throw new Error(`App returned ${res.status()}`);
    }
  } catch (err) {
    throw new Error(
      `SŁOWARIUM app server is not ready at PLAYWRIGHT_BASE_URL: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

async function answerCurrentExercise(page: Page) {
  const player = page.getByTestId("exercise-player");
  await expect(player).toBeVisible({ timeout: 20_000 });

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

test.describe("Milestone 2 private alpha learner path", () => {
  test.beforeAll(async ({ request }) => {
    await assertServerReady(request);
  });

  test("guest cannot open dashboard", async ({ page }) => {
    await page.goto("/ru/dashboard");
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });

  test("wrong password does not create a session", async ({ page }) => {
    await page.goto("/ru/login");
    await page.getByTestId("login-email").fill("learner@demo.slowarium.local");
    await page.getByTestId("login-password").fill("DefinitelyWrongPass1!");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("auth-error")).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveURL(/\/login/);
    await page.goto("/ru/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("full learner path: register → delete", async ({ page }) => {
    test.setTimeout(300_000);

    const stamp = Date.now();
    const email = `e2e.learner.${stamp}@slowarium.test`;
    const password = "E2eTestPass123!";

    // --- Register ---
    await page.goto("/ru/register");
    await page.getByTestId("register-name").fill("E2E Learner");
    await page.getByTestId("register-email").fill(email);
    await page.getByTestId("register-password").fill(password);
    await page.getByTestId("register-submit").click();
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 30_000 });

    // --- Onboarding → PostgreSQL ---
    await page.getByTestId("onboarding-age").check();
    await page.getByTestId("onboarding-ui-locale").selectOption("ru");
    await page.getByTestId("onboarding-l1-bel").check();
    await page.getByTestId("onboarding-consent-terms").check();
    await page.getByTestId("onboarding-consent-privacy").check();
    await page.getByTestId("onboarding-continue").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });

    // Newly registered users are learners without previewer — may not see DRAFT.
    // Use seeded demo previewer for DRAFT path.
    await page.getByTestId("link-logout").click();
    await expect(page).toHaveURL(/\/login/);

    await page.getByTestId("login-email").fill("learner@demo.slowarium.local");
    await page.getByTestId("login-password").fill("DemoLearner1!");
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
    await expect(page.getByTestId("preview-banner")).toBeVisible();
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();

    // --- Module → exercise ---
    await page.getByTestId("module-pierwsze-spotkanie").click();
    await expect(page).toHaveURL(/\/learn\/pierwsze-spotkanie/);
    const start = page.getByTestId("start-practice");
    if ((await start.count()) > 0) {
      await start.click();
    } else {
      await page.goto("/ru/learn/pierwsze-spotkanie/exercise/ex-1");
    }

    for (let i = 0; i < 12; i += 1) {
      if (page.url().includes("/result")) break;
      await answerCurrentExercise(page);
    }
    await expect(page).toHaveURL(/\/result/, { timeout: 30_000 });

    // --- Progress ---
    await page.getByTestId("link-progress").click();
    await expect(page.getByTestId("progress-page")).toBeVisible();

    // --- Logout / login restores from DB ---
    await page.getByTestId("link-logout").click();
    await expect(page).toHaveURL(/\/login/);
    await page.goto("/ru/dashboard");
    await expect(page).toHaveURL(/\/login/);

    await page.getByTestId("login-email").fill("learner@demo.slowarium.local");
    await page.getByTestId("login-password").fill("DemoLearner1!");
    await page.getByTestId("login-submit").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();

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

    // --- Delete fresh account only (keep seeded demo for other tests) ---
    await page.getByTestId("link-logout").click();
    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill(password);
    await page.getByTestId("login-submit").click();
    // May land onboarding or dashboard depending on incomplete path
    await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 20_000 });
    if (page.url().includes("/onboarding")) {
      await page.getByTestId("onboarding-age").check();
      await page.getByTestId("onboarding-consent-terms").check();
      await page.getByTestId("onboarding-consent-privacy").check();
      await page.getByTestId("onboarding-continue").click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
    }

    await page.getByTestId("link-privacy").click();
    await page.getByTestId("privacy-delete").click();
    await page.getByTestId("privacy-delete-confirm-input").fill("DELETE");
    await expect(page.getByTestId("privacy-delete-confirm")).toBeEnabled();
    const deleteResponsePromise = page.waitForResponse(
      (res) => res.url().includes("/api/privacy/delete"),
      { timeout: 15_000 },
    );
    await page.getByTestId("privacy-delete-confirm").click();
    const deleteResponse = await deleteResponsePromise;
    expect([200, 202]).toContain(deleteResponse.status());

    // Re-login with deleted credentials must fail
    await page.goto("/ru/login");
    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill(password);
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("auth-error")).toBeVisible({ timeout: 15_000 });
  });
});
