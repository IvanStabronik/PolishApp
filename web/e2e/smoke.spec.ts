import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Milestone 2 private-alpha learner path.
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

async function loginAs(
  page: Page,
  email: string,
  password: string,
  expectUrl: RegExp,
) {
  await page.goto("/ru/login", { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("login-email")).toBeVisible();
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);

  const signIn = page.waitForResponse(
    (res) =>
      res.url().includes("/api/auth/sign-in/email") && res.request().method() === "POST",
    { timeout: 30_000 },
  );
  await page.getByTestId("login-submit").click();
  const res = await signIn;
  expect(
    res.ok(),
    `sign-in failed: ${res.status()} ${await res.text().catch(() => "")}`,
  ).toBeTruthy();

  await expect(page).toHaveURL(expectUrl, { timeout: 30_000 });
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

  test("register onboarding delete cycle", async ({ page }) => {
    test.setTimeout(180_000);
    const stamp = Date.now();
    const email = `e2e.delete.${stamp}@slowarium.test`;
    const password = "E2eTestPass123!";

    await page.goto("/ru/register");
    await page.getByTestId("register-name").fill("E2E Delete");
    await page.getByTestId("register-email").fill(email);
    await page.getByTestId("register-password").fill(password);
    await page.getByTestId("register-submit").click();
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 30_000 });

    await page.getByTestId("onboarding-age").check();
    await page.getByTestId("onboarding-consent-terms").check();
    await page.getByTestId("onboarding-consent-privacy").check();
    await page.getByTestId("onboarding-continue").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });

    // Ordinary learner must not see DRAFT modules.
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toHaveCount(0);

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
    await expect(page.getByTestId("privacy-delete-status")).toBeVisible({
      timeout: 10_000,
    });

    // Soft-wait for post-delete landing redirect, then assert re-login fails.
    await page.waitForURL(/\/ru\/?$/, { timeout: 15_000 }).catch(() => undefined);
    await page.goto("/ru/login", { waitUntil: "domcontentloaded" });
    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill(password);
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("auth-error")).toBeVisible({ timeout: 15_000 });
  });

  test("previewer DRAFT path with persistence", async ({ page }) => {
    test.setTimeout(300_000);

    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/(dashboard|onboarding)/,
    );
    if (page.url().includes("/onboarding")) {
      await page.getByTestId("onboarding-age").check();
      await page.getByTestId("onboarding-consent-terms").check();
      await page.getByTestId("onboarding-consent-privacy").check();
      await page.getByTestId("onboarding-continue").click();
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
    }

    await expect(page.getByTestId("preview-banner")).toBeVisible();
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();

    await page.getByTestId("module-open-pierwsze-spotkanie").click();
    await expect(page).toHaveURL(/\/learn\/pierwsze-spotkanie/, {
      timeout: 20_000,
    });
    await page.getByTestId("start-practice").click();

    for (let i = 0; i < 12; i += 1) {
      if (page.url().includes("/result")) break;
      await answerCurrentExercise(page);
    }
    await expect(page).toHaveURL(/\/result/, { timeout: 30_000 });

    await page.getByTestId("link-progress").click();
    await expect(page.getByTestId("progress-page")).toBeVisible();

    await page.getByTestId("link-logout").click();
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
    await page.goto("/ru/dashboard");
    await expect(page).toHaveURL(/\/login/);

    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toBeVisible();

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
  });
});
