/**
 * Session-1 life loop over public tunnel HTTPS (ephemeral).
 * Requires already-up local closed-beta + live tunnel:
 *   PLAYWRIGHT_NO_WEBSERVER=1
 *   PLAYWRIGHT_BASE_URL=https://….trycloudflare.com
 *   PLAYWRIGHT_HOST_RESOLVER_RULES=MAP host ip  (when local DNS NXDOMAIN)
 *
 * Honest: proves tunnel invitee path — NOT Neon/Vercel / PUBLISHED / JPJO.
 */
import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

/**
 * Prefer Chromium navigation + UI (host-resolver-rules) over Node request fixtures.
 * On some LANs, Node getaddrinfo NXDOMAIN for *.trycloudflare.com even when
 * public DNS (1.1.1.1) and curl --resolve succeed.
 */

const MODULE = "pierwsze-spotkanie";
const ARTIFACT_DIR = path.join("playwright-artifacts", "tunnel-session1");
const RESULT_PATH = path.join(ARTIFACT_DIR, "result.json");

const baseURL = (
  process.env.PLAYWRIGHT_BASE_URL ??
  process.env.BASE_URL ??
  ""
).replace(/\/$/, "");

test.describe.configure({ mode: "serial" });

test.describe("Tunnel Session-1 life loop", () => {
  test.setTimeout(240_000);

  let lessonId = "";
  let exerciseId = "";
  let attemptOk = false;
  let sawDraftHalls = false;
  let attemptVia = "";

  test.beforeAll(() => {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
    expect(baseURL, "PLAYWRIGHT_BASE_URL / BASE_URL required").toMatch(
      /^https:\/\//,
    );
  });

  test.afterAll(() => {
    const payload = {
      ranAt: new Date().toISOString(),
      mode: "TUNNEL_HTTPS",
      baseURL,
      liveHttps: true,
      session1Result: attemptOk && sawDraftHalls && lessonId ? "PASS" : "FAIL",
      lessonId,
      exerciseId,
      attemptVia,
      notes:
        "Ephemeral Cloudflare quick tunnel over local closed-beta. Not Vercel/Neon. Content remains DRAFT. No JPJO.",
    };
    fs.writeFileSync(RESULT_PATH, JSON.stringify(payload, null, 2), "utf8");
    // eslint-disable-next-line no-console
    console.log("\n=== TUNNEL SESSION-1 ===\n" + JSON.stringify(payload, null, 2));
  });

  test("login admin → dashboard DRAFT halls → lesson → one attempt", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    // Load shell on public HTTPS (Chromium host-resolver-rules). Prefer in-page
    // fetch for sign-in: Node request fixtures ENOTFOUND on LAN DNS; native form
    // submit can race before React hydration under turbopack+tunnel.
    await page.goto("/ru/login", { waitUntil: "networkidle", timeout: 90_000 });
    await expect(page.getByTestId("login-email")).toBeVisible({
      timeout: 30_000,
    });

    const signIn = await page.evaluate(async () => {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: "admin@demo.slowarium.local",
          password: "DemoAdmin1!",
        }),
      });
      const text = await res.text();
      return { ok: res.ok, status: res.status, text: text.slice(0, 240) };
    });
    expect(
      signIn.ok,
      `tunnel sign-in failed HTTP ${signIn.status}: ${signIn.text}; console=${consoleErrors.slice(0, 3).join(" | ")}`,
    ).toBeTruthy();

    await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
    await expect(page.getByTestId("preview-banner")).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByTestId(`module-open-${MODULE}`)).toBeVisible({
      timeout: 20_000,
    });
    sawDraftHalls = true;
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "01-dashboard.png"),
      fullPage: true,
    });

    await page.getByTestId(`module-open-${MODULE}`).click();
    await expect(page).toHaveURL(new RegExp(`/learn/${MODULE}`));
    await expect(page.getByTestId("module-page")).toBeVisible();
    await expect(page.getByTestId("preview-banner")).toBeVisible();
    lessonId =
      (await page
        .getByTestId("module-lesson")
        .first()
        .getAttribute("data-lesson-id")) ?? "";
    expect(lessonId).toMatch(/^LES-/);
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "02-module.png"),
      fullPage: true,
    });

    await page.goto(`/ru/learn/lessons/${lessonId}`, {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveURL(new RegExp(`/learn/lessons/${lessonId}`));

    // Advance until first exercise player (skip theory / speaking honesty screens).
    for (let step = 0; step < 20; step += 1) {
      if ((await page.getByTestId("exercise-player").count()) > 0) break;
      if ((await page.getByTestId("lesson-speaking-step").count()) > 0) {
        await page.getByTestId("lesson-next-step").click();
        continue;
      }
      const nextStep = page.getByTestId("lesson-next-step");
      if ((await nextStep.count()) > 0) {
        await nextStep.click();
        continue;
      }
      break;
    }

    await expect(page.getByTestId("exercise-player")).toBeVisible({
      timeout: 30_000,
    });
    exerciseId =
      (await page
        .getByTestId("exercise-player")
        .getAttribute("data-exercise-id")) ?? "";
    expect(exerciseId).toBeTruthy();
    const type =
      (await page
        .getByTestId("exercise-player")
        .getAttribute("data-exercise-type")) ?? "single_choice";

    if (type === "listening") {
      const playBtn = page.getByTestId("listening-audio-control");
      if ((await playBtn.count()) > 0) {
        await playBtn.click();
        await page.waitForTimeout(800);
      }
    }

    if (
      type === "single_choice" ||
      type === "listening" ||
      type === "multiple_choice"
    ) {
      const options = page.getByTestId("exercise-option").locator("input");
      await expect(options.first()).toBeVisible({ timeout: 15_000 });
      await options.first().click({ force: true });
    } else if (type === "gap_fill") {
      const gaps = page.locator(
        '[data-testid^="exercise-gap-"]:not([disabled])',
      );
      const count = await gaps.count();
      for (let i = 0; i < count; i += 1) await gaps.nth(i).fill("cześć");
    }

    const submit = page.getByTestId("exercise-submit");
    expect(await submit.count()).toBeGreaterThan(0);
    for (let w = 0; w < 12 && (await submit.isDisabled()); w += 1) {
      const play = page.getByTestId("listening-audio-control");
      if ((await play.count()) > 0) await play.click();
      await page.waitForTimeout(700);
    }
    await expect(submit).toBeEnabled({ timeout: 20_000 });
    await submit.click();
    await expect(page.getByTestId("exercise-next")).toBeVisible({
      timeout: 25_000,
    });
    attemptOk = true;
    attemptVia = "ui-submit";

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "03-after-attempt.png"),
      fullPage: true,
    });

    expect(sawDraftHalls).toBeTruthy();
    expect(attemptOk).toBeTruthy();
  });
});
