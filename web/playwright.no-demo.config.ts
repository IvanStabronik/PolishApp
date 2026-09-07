import fs from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

/**
 * Second e2e server: DEMO_PREVIEW off → DRAFT modules must not appear.
 * Run via `pnpm test:e2e` (after the main suite) or
 * `pnpm exec playwright test -c playwright.no-demo.config.ts`.
 */

function loadEnvLocal(): Record<string, string> {
  const envPath = path.join(__dirname, ".env.local");
  const out: Record<string, string> = {};
  if (!fs.existsSync(envPath)) return out;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const envLocal = loadEnvLocal();
const baseURL =
  process.env.PLAYWRIGHT_NO_DEMO_BASE_URL ?? "http://127.0.0.1:3001";
const port = new URL(baseURL).port || "3001";
const databaseUrl =
  process.env.DATABASE_URL ??
  envLocal.DATABASE_URL ??
  "postgresql://slowarium:slowarium@localhost:5433/slowarium";

const webServerEnv: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries({ ...envLocal, ...process.env }).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  ),
  PORT: port,
  DATABASE_URL: databaseUrl,
  NEXT_PUBLIC_DEMO_PREVIEW: "false",
  DEMO_PREVIEW: "false",
  DEMO_MODE: "true",
  BETA_MODE: "true",
  ALLOW_PRODUCTION_DEMO: process.env.CI ? "true" : (process.env.ALLOW_PRODUCTION_DEMO ?? ""),
  BETTER_AUTH_URL: baseURL,
  NEXT_PUBLIC_APP_URL: baseURL,
};

export default defineConfig({
  testDir: "./e2e",
  testMatch: ["**/demo-preview-off.spec.ts"],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL,
    trace: "on",
    screenshot: "on",
    video: process.env.CI ? "on" : "off",
  },
  projects: [
    {
      name: "chromium-no-demo",
      use: {
        ...devices["Desktop Chrome"],
        // Windows CI/local often lacks bundled Chromium; use system Chrome.
        ...(process.platform === "win32" || process.env.PLAYWRIGHT_CHROME_CHANNEL
          ? { channel: process.env.PLAYWRIGHT_CHROME_CHANNEL || "chrome" }
          : {}),
      },
    },
  ],
  webServer: process.env.PLAYWRIGHT_NO_WEBSERVER
    ? undefined
    : {
        command: process.env.CI
          ? `pnpm exec next start -H 127.0.0.1 -p ${port}`
          : `pnpm exec next dev --turbopack -H 127.0.0.1 -p ${port}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        stdout: "pipe",
        stderr: "pipe",
        env: webServerEnv,
      },
});
