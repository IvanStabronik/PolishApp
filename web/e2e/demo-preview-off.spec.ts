import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * Product gate: without DEMO_PREVIEW / NEXT_PUBLIC_DEMO_PREVIEW,
 * DRAFT Pierwsze spotkanie must not appear in the learner catalog.
 *
 * Booted via playwright.no-demo.config.ts (port 3001, preview env false).
 */

async function isServerReady(request: APIRequestContext): Promise<boolean> {
  try {
    const res = await request.get("/", { timeout: 5_000 });
    return res.status() < 500;
  } catch {
    return false;
  }
}

test.describe("DEMO_PREVIEW off gate", () => {
  test.beforeAll(async ({ request }) => {
    const ready = await isServerReady(request);
    test.skip(
      !ready,
      "No-demo Playwright server is not ready (expected on :3001). Run via `pnpm test:e2e` or playwright.no-demo.config.ts.",
    );
  });

  test("draft module is not listed and preview banner is absent", async ({
    page,
  }) => {
    await page.goto("/ru/dashboard");
    await expect(page.getByTestId("dashboard-page")).toBeVisible();
    await expect(page.getByTestId("preview-banner")).toHaveCount(0);
    await expect(page.getByTestId("module-pierwsze-spotkanie")).toHaveCount(0);
  });
});
