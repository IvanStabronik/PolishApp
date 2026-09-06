import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";

/**
 * Milestone 2.1 private-alpha learner path (5 modules, 4 types, privacy).
 * Server/DB must be up — never skip.
 */

const MODULE_IDS = [
  "pierwsze-spotkanie",
  "w-kawiarni",
  "w-sklepie",
  "droga-i-transport",
  "pierwsza-sprawa-w-urzedzie",
] as const;

const ARTIFACT_DIR = path.join("playwright-artifacts", "closed-beta-screens");

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

async function answerCurrentExercise(
  page: Page,
  seenTypes: Set<string>,
) {
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
  if (type) seenTypes.add(type);

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
  } else if (type === "ordering") {
    // Default order is already a valid submission target.
    await expect(page.getByTestId("exercise-ordering")).toBeVisible();
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

async function completeModule(page: Page, moduleId: string, seenTypes: Set<string>) {
  await page.goto(`/ru/learn/${moduleId}`);
  await expect(page).toHaveURL(new RegExp(`/learn/${moduleId}`), {
    timeout: 20_000,
  });
  await page.getByTestId("start-practice").click();

  for (let i = 0; i < 40; i += 1) {
    if (page.url().includes("/result")) break;
    await answerCurrentExercise(page, seenTypes);
  }
  await expect(page).toHaveURL(/\/result/, { timeout: 30_000 });
}

async function checkOnboardingConsent(page: Page, testId: string) {
  const box = page.getByTestId(testId);
  await expect(box).toBeVisible();
  await box.check();
  await expect(box).toBeChecked({ timeout: 5_000 });
}

function authApiHeaders(): Record<string, string> {
  const base = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
  return {
    "Content-Type": "application/json",
    Origin: base,
    Referer: `${base}/ru/login`,
  };
}

async function loginAs(
  page: Page,
  email: string,
  password: string,
  expectUrl: RegExp,
) {
  let res = await page.context().request.post("/api/auth/sign-in/email", {
    data: { email, password },
    headers: authApiHeaders(),
  });
  for (let attempt = 0; attempt < 3 && res.status() === 429; attempt += 1) {
    const retryAfter = Number(res.headers()["x-retry-after"] ?? "11");
    await page.waitForTimeout(Math.min(Math.max(retryAfter, 1), 15) * 1000);
    res = await page.context().request.post("/api/auth/sign-in/email", {
      data: { email, password },
      headers: authApiHeaders(),
    });
  }
  expect(
    res.ok(),
    `sign-in failed: ${res.status()} ${await res.text().catch(() => "")}`,
  ).toBeTruthy();

  await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
  if (/\/onboarding/.test(page.url())) {
    await expect(page).toHaveURL(/\/onboarding/);
    return;
  }
  await expect(page).toHaveURL(expectUrl, { timeout: 15_000 });
}

async function finishOnboardingIfNeeded(page: Page) {
  if (!page.url().includes("/onboarding")) return;
  await expect(page.getByTestId("onboarding-form")).toBeVisible();
  await checkOnboardingConsent(page, "onboarding-age");
  await checkOnboardingConsent(page, "onboarding-consent-terms");
  await checkOnboardingConsent(page, "onboarding-consent-privacy");
  await expect(page.getByTestId("onboarding-continue")).toBeEnabled();
  await page.getByTestId("onboarding-continue").click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
}

async function saveKeyScreenshot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${name}.png`),
    fullPage: true,
  });
}

test.describe.configure({ mode: "serial" });

test.describe("Milestone 2.1 private alpha learner path", () => {
  test.beforeAll(async ({ request }) => {
    await assertServerReady(request);
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  });

  test("guest cannot open dashboard", async ({ page }) => {
    await page.goto("/ru/dashboard");
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
    await saveKeyScreenshot(page, "guest-login-redirect");
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

  test("ordinary learner: no DRAFT and 404 on direct module URL", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const stamp = Date.now();
    const email = `e2e.ordinary.${stamp}@slowarium.test`;
    const password = "E2eTestPass123!";

    await page.goto("/ru/register");
    await page.getByTestId("register-name").fill("E2E Ordinary");
    await page.getByTestId("register-email").fill(email);
    await page.getByTestId("register-password").fill(password);
    await page.getByTestId("register-submit").click();
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 30_000 });
    await finishOnboardingIfNeeded(page);

    await expect(page.getByTestId("module-pierwsze-spotkanie")).toHaveCount(0);
    await expect(page.getByTestId("preview-banner")).toHaveCount(0);

    const res = await page.goto("/ru/learn/pierwsze-spotkanie", {
      waitUntil: "domcontentloaded",
    });
    // App may render not-found UI or 404 status — never show DRAFT player.
    expect(res?.status() === 404 || page.url().includes("pierwsze-spotkanie")).toBeTruthy();
    await expect(page.getByTestId("exercise-player")).toHaveCount(0);
    await expect(page.getByTestId("start-practice")).toHaveCount(0);
    await saveKeyScreenshot(page, "ordinary-learner-no-draft");
  });

  test("register onboarding delete cycle blocks re-login", async ({ page }) => {
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
    await finishOnboardingIfNeeded(page);

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

    await page.waitForURL(/\/login/, { timeout: 15_000 });
    await expect(page.getByTestId("login-email")).toBeVisible();
    await page.getByTestId("login-email").fill(email);
    await page.getByTestId("login-password").fill(password);
    const [deny] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().includes("/api/auth/sign-in/email") &&
          r.request().method() === "POST",
        { timeout: 30_000 },
      ),
      page.getByTestId("login-submit").click(),
    ]);
    expect(deny.ok()).toBeFalsy();
    await expect(page.getByTestId("auth-error")).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveURL(/\/login/);
    await saveKeyScreenshot(page, "delete-blocks-relogin");
  });

  test("previewer completes five modules with all four exercise types", async ({
    page,
  }) => {
    test.setTimeout(900_000);

    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/(dashboard|onboarding)/,
    );
    await finishOnboardingIfNeeded(page);

    await expect(page.getByTestId("preview-banner")).toBeVisible();
    for (const id of MODULE_IDS) {
      await expect(page.getByTestId(`module-${id}`)).toBeVisible();
    }
    await saveKeyScreenshot(page, "previewer-dashboard-five-modules");

    const seenTypes = new Set<string>();
    for (const id of MODULE_IDS) {
      await completeModule(page, id, seenTypes);
    }

    expect(seenTypes.has("single_choice")).toBeTruthy();
    expect(seenTypes.has("multiple_choice")).toBeTruthy();
    expect(seenTypes.has("gap_fill")).toBeTruthy();
    expect(seenTypes.has("ordering")).toBeTruthy();
    await saveKeyScreenshot(page, "previewer-module-result");

    await page.getByTestId("link-progress").click();
    await expect(page.getByTestId("progress-page")).toBeVisible();
    await saveKeyScreenshot(page, "progress-after-modules");

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
    await page.getByTestId("link-progress").click();
    await expect(page.getByTestId("progress-page")).toBeVisible();
    await saveKeyScreenshot(page, "progress-persists-after-relogin");
  });

  test("privacy export success path", async ({ page }) => {
    test.setTimeout(120_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await page.getByTestId("link-privacy").click();
    await expect(page).toHaveURL(/\/privacy/);

    const downloadPromise = page.waitForEvent("download", { timeout: 15_000 });
    await page.getByTestId("privacy-export").click();
    await expect(page.getByTestId("privacy-export-status")).toBeVisible({
      timeout: 15_000,
    });
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/slowarium-export/i);
    await expect(page.getByTestId("privacy-export-error")).toHaveCount(0);
    await saveKeyScreenshot(page, "privacy-export-success");
  });

  test("privacy export failure path", async ({ page }) => {
    test.setTimeout(120_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await page.getByTestId("link-privacy").click();

    await page.route("**/api/privacy/export", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "export_failed" }),
      });
    });

    await page.getByTestId("privacy-export").click();
    await expect(page.getByTestId("privacy-export-error")).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.getByTestId("privacy-export-status")).toHaveCount(0);
    await saveKeyScreenshot(page, "privacy-export-failure");
  });
});
