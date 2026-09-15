import dns from "node:dns";
import { defineConfig, devices } from "@playwright/test";

/**
 * Session-1 against live Cloudflare quick tunnel (local closed-beta behind it).
 * Requires PLAYWRIGHT_BASE_URL or BASE_URL (https://….trycloudflare.com).
 * Optional PLAYWRIGHT_HOST_RESOLVER_RULES when LAN DNS NXDOMAIN on *.trycloudflare.com
 *   e.g. MAP namespace-buying-retailer-strength.trycloudflare.com 104.16.230.132
 *
 * Some home routers NXDOMAIN *.trycloudflare.com — force Node API requests onto public DNS
 * and Chromium onto host-resolver-rules when provided.
 *
 * Tunnel ≠ Vercel/Neon. Does not claim PUBLISHED / JPJO.
 */

// Playwright request fixtures use Node DNS; LAN resolvers often fail on trycloudflare.com.
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

const rawBase =
  process.env.BASE_URL?.trim() ||
  process.env.PLAYWRIGHT_BASE_URL?.trim() ||
  "";

if (!rawBase) {
  throw new Error(
    "playwright.tunnel.config: set BASE_URL or PLAYWRIGHT_BASE_URL to the tunnel HTTPS URL",
  );
}

let baseURL: string;
try {
  baseURL = new URL(rawBase).toString().replace(/\/$/, "");
} catch {
  throw new Error(`Invalid BASE_URL: ${rawBase}`);
}

const parsed = new URL(baseURL);
if (parsed.protocol !== "https:") {
  throw new Error(`Tunnel Session-1 requires https:// BASE_URL (got ${parsed.protocol})`);
}

// Align Origin headers in e2e helpers with the public tunnel host.
process.env.PLAYWRIGHT_BASE_URL = baseURL;

const resolverRules = process.env.PLAYWRIGHT_HOST_RESOLVER_RULES?.trim() ?? "";
const launchArgs = [
  "--disable-features=ForcedColors",
  "--force-color-profile=srgb",
];
if (resolverRules) {
  launchArgs.push(`--host-resolver-rules=${resolverRules}`);
}

export default defineConfig({
  testDir: "./e2e",
  testMatch: ["**/tunnel-session1.spec.ts", "**/day1-tunnel-bakeoff.spec.ts"],
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: "list",
  timeout: 240_000,
  expect: { timeout: 20_000 },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    ignoreHTTPSErrors: false,
  },
  projects: [
    {
      name: "tunnel-chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.PLAYWRIGHT_CHROME_CHANNEL ?? (process.platform === "win32" ? "chrome" : undefined),
        launchOptions: {
          args: launchArgs,
        },
      },
    },
  ],
});
