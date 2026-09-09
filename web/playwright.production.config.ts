import { defineConfig, devices } from "@playwright/test";

/**
 * Deployed private-beta smoke — NO local webServer.
 * Requires:
 *   BASE_URL or PLAYWRIGHT_BASE_URL (https://…)
 * Optional operator fixtures (never demo-user dependency):
 *   PROD_SMOKE_ADMIN_EMAIL / PROD_SMOKE_ADMIN_PASSWORD
 *   PROD_SMOKE_ALLOW_DESTRUCTIVE=true  (required for invite/register cleanup path)
 *
 * Refuses destructive cleanup against unknown hosts.
 */

const rawBase =
  process.env.BASE_URL?.trim() ||
  process.env.PLAYWRIGHT_BASE_URL?.trim() ||
  "";

if (!rawBase) {
  throw new Error(
    "playwright.production.config: set BASE_URL (or PLAYWRIGHT_BASE_URL) to the deployed private beta",
  );
}

let baseURL: string;
try {
  baseURL = new URL(rawBase).toString().replace(/\/$/, "");
} catch {
  throw new Error(`Invalid BASE_URL: ${rawBase}`);
}

const parsed = new URL(baseURL);
if (parsed.protocol !== "https:" && parsed.hostname !== "127.0.0.1" && parsed.hostname !== "localhost") {
  throw new Error(
    `Production smoke requires https:// BASE_URL (got ${parsed.protocol}//${parsed.host})`,
  );
}

export default defineConfig({
  testDir: "./e2e",
  testMatch: ["**/production-smoke.spec.ts"],
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  timeout: 180_000,
  expect: { timeout: 20_000 },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    ignoreHTTPSErrors: false,
  },
  projects: [
    {
      name: "production-chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.PLAYWRIGHT_CHROME_CHANNEL,
      },
    },
  ],
  // Intentionally no webServer — target is the deployed environment only.
});
