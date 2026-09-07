import fs from "node:fs";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

/** Load web/.env.local so local e2e uses Postgres on :5433 without manual export. */
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
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const port = new URL(baseURL).port || "3000";
const databaseUrl =
  process.env.DATABASE_URL ??
  envLocal.DATABASE_URL ??
  "postgresql://slowarium:slowarium@localhost:5433/slowarium";

/** Milestone 1 acceptance boots with demo preview so DRAFT Pierwsze spotkanie is visible. */
const webServerEnv: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries({ ...envLocal, ...process.env }).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  ),
  PORT: port,
  DATABASE_URL: databaseUrl,
  NEXT_PUBLIC_DEMO_PREVIEW: "true",
  DEMO_PREVIEW: "true",
  DEMO_MODE: "true",
  // Closed-beta e2e must always exercise invite-only registration.
  BETA_MODE: "true",
  // CI `next start` is NODE_ENV=production; allow demo seed only for test runners.
  ALLOW_PRODUCTION_DEMO: process.env.CI ? "true" : (process.env.ALLOW_PRODUCTION_DEMO ?? ""),
  // Match PLAYWRIGHT_BASE_URL (127.0.0.1) so Better Auth origin checks pass.
  BETTER_AUTH_URL: baseURL,
  NEXT_PUBLIC_APP_URL: baseURL,
};

export default defineConfig({
  testDir: "./e2e",
  testIgnore: ["**/demo-preview-off.spec.ts"],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  timeout: 120_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    trace: "on",
    screenshot: "on",
    // Video needs Playwright ffmpeg; CI installs it. Local Windows may lack the binary.
    video: process.env.CI ? "on" : "off",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Prefer installed Google Chrome when Playwright's bundled browser
        // cannot be downloaded (common on locked-down Windows agents).
        channel:
          process.env.PLAYWRIGHT_CHROME_CHANNEL ??
          (process.platform === "win32" ? "chrome" : undefined),
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
