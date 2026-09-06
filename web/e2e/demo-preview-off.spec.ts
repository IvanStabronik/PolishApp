import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * Without DEMO_PREVIEW, DRAFT must stay hidden even for signed-in previewers.
 * Booted via playwright.no-demo.config.ts (separate port).
 * Server must be up — never skip.
 */

async function assertServerReady(request: APIRequestContext): Promise<void> {
  try {
    const res = await request.get("/", { timeout: 10_000 });
    if (res.status() >= 500) {
      throw new Error(`App returned ${res.status()}`);
    }
  } catch (err) {
    throw new Error(
      `No-preview server not ready: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
}

test.describe("no-preview security gate", () => {
  test.beforeAll(async ({ request }) => {
    await assertServerReady(request);
  });

  test("guest is redirected from dashboard", async ({ page }) => {
    await page.goto("/ru/dashboard");
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
  });

  test("previewer still cannot see DRAFT when preview env is off", async ({
    page,
  }) => {
    await page.goto("/ru/login");
    await page.getByTestId("login-email").fill("learner@demo.slowarium.local");
    await page.getByTestId("login-password").fill("DemoLearner1!");
    const [res] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().includes("/api/auth/sign-in/email") &&
          r.request().method() === "POST",
        { timeout: 30_000 },
      ),
      page.getByTestId("login-submit").click(),
    ]);
    expect(res.ok()).toBeTruthy();
    await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
    await expect(page.getByTestId("preview-banner")).toHaveCount(0);
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toHaveCount(0);

    await page.goto("/ru/learn/pierwsze-spotkanie");
    // 404 or empty — must not render DRAFT exercise player
    await expect(page.getByTestId("exercise-player")).toHaveCount(0);
  });
});
