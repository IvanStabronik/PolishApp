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

function authApiHeaders(baseURL: string): Record<string, string> {
  const base = baseURL.replace(/\/$/, "");
  return {
    "Content-Type": "application/json",
    Origin: base,
    Referer: `${base}/ru/login`,
  };
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
    baseURL,
  }) => {
    const origin = (baseURL ?? "http://127.0.0.1:3001").replace(/\/$/, "");
    let res = await page.context().request.post("/api/auth/sign-in/email", {
      data: {
        email: "learner@demo.slowarium.local",
        password: "DemoLearner1!",
      },
      headers: authApiHeaders(origin),
    });
    for (let attempt = 0; attempt < 3 && res.status() === 429; attempt += 1) {
      const retryAfter = Number(res.headers()["x-retry-after"] ?? "11");
      await page.waitForTimeout(Math.min(Math.max(retryAfter, 1), 15) * 1000);
      res = await page.context().request.post("/api/auth/sign-in/email", {
        data: {
          email: "learner@demo.slowarium.local",
          password: "DemoLearner1!",
        },
        headers: authApiHeaders(origin),
      });
    }
    expect(
      res.ok(),
      `sign-in failed: ${res.status()} ${await res.text().catch(() => "")}`,
    ).toBeTruthy();
    await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
    await expect(page.getByTestId("preview-banner")).toHaveCount(0);
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toHaveCount(0);

    await page.goto("/ru/learn/pierwsze-spotkanie");
    // 404 or empty — must not render DRAFT exercise player
    await expect(page.getByTestId("exercise-player")).toHaveCount(0);
  });
});
