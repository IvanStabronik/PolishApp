/**
 * Milestone 4 operable closed-beta E2E.
 * Real persistence; skipped=0; no conditional if-exists; no production bypass.
 */
import { expect, test, type Page } from "@playwright/test";
import path from "node:path";
import fs from "node:fs";
import {
  adminCreateInvite,
  apiSignIn,
  authApiHeaders,
} from "./helpers/beta-auth";

const ARTIFACT_DIR = path.join("playwright-artifacts", "m4-responsive");
const MODULE = "pierwsze-spotkanie";

async function finishOnboarding(page: Page) {
  if (!page.url().includes("/onboarding")) return;
  await page.getByTestId("onboarding-age").check();
  await page.getByTestId("onboarding-consent-terms").check();
  await page.getByTestId("onboarding-consent-privacy").check();
  await page.getByTestId("onboarding-continue").click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
}

async function loginUi(page: Page, email: string, password: string) {
  await apiSignIn(page.context().request, email, password);
  await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
  await finishOnboarding(page);
}

async function shot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `${name}.png`),
    fullPage: true,
  });
}

test.describe.configure({ mode: "serial" });

test.describe("M4 operable closed beta", () => {
  test.beforeEach(async ({ request }) => {
    const res = await request.get("/", { timeout: 10_000 });
    expect(res.status()).toBeLessThan(500);
  });

  let inviteToken = "";
  let learnerEmail = "";
  let learnerPassword = "";
  let feedbackId = "";

  test("1: admin creates invite", async ({ page }) => {
    test.setTimeout(120_000);
    await loginUi(page, "admin@demo.slowarium.local", "DemoAdmin1!");
    await page.goto("/ru/admin/beta");
    await expect(page.getByTestId("admin-beta-page")).toBeVisible();
    await expect(page.getByTestId("admin-beta-console")).toBeVisible({
      timeout: 20_000,
    });
    await page.getByTestId("admin-create-invite").click();
    await expect(page.getByTestId("admin-invite-token-once")).toBeVisible({
      timeout: 20_000,
    });
    const text = await page.getByTestId("admin-invite-token-once").innerText();
    const match = text.match(/([A-Za-z0-9_-]{20,})/);
    expect(match?.[1]).toBeTruthy();
    inviteToken = match![1]!;
    await shot(page, "admin-beta-1440");
  });

  test("2-3: anonymous accepts invite, registers, onboards", async ({ page }) => {
    test.setTimeout(180_000);
    expect(inviteToken).toBeTruthy();
    const stamp = Date.now();
    learnerEmail = `e2e.m4.${stamp}@slowarium.test`;
    learnerPassword = "E2eM4Pass123!";
    await page.goto(`/ru/invite/${inviteToken}`);
    await expect(page.getByTestId("invite-accept-form")).toBeVisible();
    await page.getByTestId("invite-name").fill("M4 Beta Learner");
    await page.getByTestId("invite-email").fill(learnerEmail);
    await page.getByTestId("invite-password").fill(learnerPassword);
    await page.getByTestId("invite-submit").click();
    await expect(page).toHaveURL(/\/(onboarding|dashboard)/, { timeout: 45_000 });
    await finishOnboarding(page);
    await shot(page, "invite-accept-dashboard");
  });

  test("4: lesson + exercise submit", async ({ page }) => {
    test.setTimeout(180_000);
    await loginUi(page, learnerEmail, learnerPassword);
    // Invitee must see DRAFT module (learner+previewer). Module page is the gate.
    await page.goto(`/ru/learn/${MODULE}`);
    await expect(page.getByTestId("module-page")).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId("module-lesson").first()).toBeVisible();
    const firstId = await page
      .getByTestId("module-lesson")
      .first()
      .getAttribute("data-lesson-id");
    expect(firstId).toMatch(/^LES-/);
    await page.goto(`/ru/learn/lessons/${firstId}`);
    for (let i = 0; i < 12; i += 1) {
      if ((await page.getByTestId("exercise-player").count()) > 0) break;
      const next = page.getByTestId("lesson-next-step");
      if ((await next.count()) === 0) break;
      await next.click();
    }
    await expect(page.getByTestId("exercise-player")).toBeVisible({
      timeout: 20_000,
    });
    const type = await page.getByTestId("exercise-player").getAttribute("data-exercise-type");
    if (type === "single_choice" || type === "multiple_choice") {
      await page.getByTestId("exercise-option").locator("input:not(:disabled)").first().click({ force: true });
    } else if (type === "gap_fill") {
      const gaps = page.locator('[data-testid^="exercise-gap-"]:not([disabled])');
      const count = await gaps.count();
      for (let i = 0; i < count; i += 1) await gaps.nth(i).fill("test");
    }
    await page.getByTestId("exercise-submit").click();
    await expect(page.getByTestId("exercise-feedback")).toBeVisible({
      timeout: 15_000,
    });
  });

  test("5: learner feedback", async ({ page }) => {
    test.setTimeout(120_000);
    await loginUi(page, learnerEmail, learnerPassword);
    await page.goto("/ru/plan");
    await page.getByTestId("report-problem").click();
    await expect(page.getByTestId("feedback-dialog")).toBeVisible();
    await page.getByTestId("feedback-category").selectOption("bug");
    await page.getByTestId("feedback-comment").fill("M4 e2e feedback");
    await page.getByTestId("feedback-submit").click();
    await expect(page.getByTestId("feedback-thanks")).toBeVisible({
      timeout: 15_000,
    });
  });

  test("6-7: admin sees learner + feedback and triages", async ({ page }) => {
    test.setTimeout(120_000);
    await loginUi(page, "admin@demo.slowarium.local", "DemoAdmin1!");
    await page.goto("/ru/admin/beta");
    await expect(page.getByTestId("admin-beta-console")).toBeVisible({
      timeout: 20_000,
    });
    await page.getByTestId("admin-learner-search").fill(learnerEmail);
    await expect(page.locator(`[data-testid^="learner-row-"]`)).toHaveCount(1, {
      timeout: 10_000,
    });
    await expect(page.getByTestId("feedback-inbox")).toBeVisible();
    const row = page.locator('[data-testid^="feedback-row-"]').first();
    await expect(row).toBeVisible();
    const idAttr = await row.getAttribute("data-testid");
    feedbackId = idAttr?.replace("feedback-row-", "") ?? "";
    expect(feedbackId).toBeTruthy();
    await page.getByTestId(`feedback-set-triaged-${feedbackId}`).click();
    await expect(page.getByTestId(`feedback-row-${feedbackId}`)).toContainText(
      "triaged",
      { timeout: 15_000 },
    );
  });

  test("8: revoked invite denied", async ({ page }) => {
    test.setTimeout(120_000);
    const created = await adminCreateInvite(page.context().request);
    await apiSignIn(page.context().request, "admin@demo.slowarium.local", "DemoAdmin1!");
    const rev = await page.context().request.delete("/api/admin/beta/invites", {
      headers: authApiHeaders(),
      data: { inviteId: created.inviteId },
    });
    expect(rev.ok()).toBeTruthy();
    await page.context().clearCookies();
    await page.goto(`/ru/invite/${created.token}`);
    await expect(page.getByTestId("invite-state-revoked")).toBeVisible({
      timeout: 15_000,
    });
  });

  test("9: reused invite denied", async ({ page }) => {
    test.setTimeout(120_000);
    expect(inviteToken).toBeTruthy();
    await page.goto(`/ru/invite/${inviteToken}`);
    await expect(page.getByTestId("invite-state-used")).toBeVisible({
      timeout: 15_000,
    });
  });

  test("10: ordinary learner + previewer denied /admin/beta", async ({ page }) => {
    test.setTimeout(120_000);
    await loginUi(page, "learner@demo.slowarium.local", "DemoLearner1!");
    await page.goto("/ru/admin/beta");
    await expect(page.getByTestId("admin-beta-page")).toHaveCount(0);
    const api = await page.context().request.get("/api/admin/beta/overview", {
      headers: authApiHeaders(),
    });
    expect([401, 403, 404]).toContain(api.status());

    await page.context().clearCookies();
    await loginUi(page, "reviewer@demo.slowarium.local", "DemoReviewer1!");
    await page.goto("/ru/admin/beta");
    await expect(page.getByTestId("admin-beta-page")).toHaveCount(0);
  });

  test("11: responsive smoke 390/834/1440", async ({ page }) => {
    test.setTimeout(180_000);
    await loginUi(page, "admin@demo.slowarium.local", "DemoAdmin1!");
    for (const [w, h, label] of [
      [390, 844, "390"],
      [834, 1112, "834"],
      [1440, 900, "1440"],
    ] as const) {
      await page.setViewportSize({ width: w, height: h });
      await page.goto("/ru/admin/beta");
      await expect(page.getByTestId("admin-beta-console")).toBeVisible();
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });
      expect(overflow, `overflow at ${label}`).toBeFalsy();
      await shot(page, `admin-beta-${label}`);

      await page.goto("/ru/dashboard");
      await expect(page.getByTestId("site-header")).toBeVisible();
      await shot(page, `dashboard-${label}`);
    }
  });

  test("12: public content still unavailable without preview auth", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.context().clearCookies();
    await page.goto("/ru/learn/pierwsze-spotkanie");
    await expect(page.getByTestId("exercise-player")).toHaveCount(0);
    await expect(page).toHaveURL(/\/login|\/learn/);
    // Register without invite blocked in beta mode
    await page.goto("/ru/register");
    await expect(page.getByTestId("register-invite-required")).toBeVisible();
  });

  test("13: admin deactivates invitee — session revoked, product denied", async ({
    browser,
  }) => {
    test.setTimeout(180_000);
    expect(learnerEmail).toBeTruthy();

    const learnerCtx = await browser.newContext();
    const adminCtx = await browser.newContext();
    const learnerPage = await learnerCtx.newPage();
    const adminPage = await adminCtx.newPage();

    try {
      // Learner establishes an active product session.
      await loginUi(learnerPage, learnerEmail, learnerPassword);
      await expect(learnerPage).toHaveURL(/\/dashboard/);
      await expect(learnerPage.getByTestId("site-header")).toBeVisible();

      // Admin deactivates that learner (revokes DB sessions).
      await loginUi(adminPage, "admin@demo.slowarium.local", "DemoAdmin1!");
      await adminPage.goto("/ru/admin/beta");
      await expect(adminPage.getByTestId("admin-beta-console")).toBeVisible({
        timeout: 20_000,
      });
      await adminPage.getByTestId("admin-learner-search").fill(learnerEmail);
      const learnerRow = adminPage.locator(`[data-testid^="learner-row-"]`).first();
      await expect(learnerRow).toBeVisible({ timeout: 10_000 });
      const deactivate = learnerRow.locator(`[data-testid^="admin-deactivate-"]`);
      await expect(deactivate).toBeVisible();
      await deactivate.click();
      await expect(
        learnerRow.locator(`[data-testid^="learner-deactivated-"]`),
      ).toBeVisible({ timeout: 15_000 });

      // Old learner session cookie is now invalid / product denied.
      await learnerPage.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
      await expect(learnerPage).toHaveURL(/\/(login|beta-disabled)/, {
        timeout: 20_000,
      });

      // Re-login allowed only to show explicit disabled state.
      await learnerCtx.clearCookies();
      await learnerPage.goto("/ru/login");
      await learnerPage.getByTestId("login-email").fill(learnerEmail);
      await learnerPage.getByTestId("login-password").fill(learnerPassword);
      await learnerPage.getByTestId("login-submit").click();
      await expect(learnerPage.getByTestId("beta-access-disabled")).toBeVisible({
        timeout: 30_000,
      });

      await learnerPage.goto("/ru/dashboard");
      await expect(learnerPage.getByTestId("beta-access-disabled")).toBeVisible({
        timeout: 15_000,
      });
      await learnerPage.goto(`/ru/learn/${MODULE}`);
      await expect(learnerPage.getByTestId("beta-access-disabled")).toBeVisible({
        timeout: 15_000,
      });
      await learnerPage.goto("/ru/plan");
      await expect(learnerPage.getByTestId("beta-access-disabled")).toBeVisible({
        timeout: 15_000,
      });

      const attempt = await learnerCtx.request.post("/api/learning/attempt", {
        headers: {
          ...authApiHeaders(),
          "Content-Type": "application/json",
        },
        data: {
          moduleId: MODULE,
          exerciseId: "EX-PLACEHOLDER",
          answer: { choice: 0 },
        },
      });
      expect(attempt.status()).toBe(403);
      expect(((await attempt.json()) as { error?: string }).error).toBe(
        "beta_access_revoked",
      );

      const feedback = await learnerCtx.request.post("/api/feedback", {
        headers: {
          ...authApiHeaders(),
          "Content-Type": "application/json",
        },
        data: {
          category: "bug",
          comment: "should fail",
          idempotencyKey: "11111111-1111-4111-8111-111111111111",
          context: { route: "/ru/plan" },
        },
      });
      expect(feedback.status()).toBe(403);
      expect(((await feedback.json()) as { error?: string }).error).toBe(
        "beta_access_revoked",
      );

      // Admin still sees deactivated status after reload.
      await adminPage.goto("/ru/admin/beta");
      await adminPage.getByTestId("admin-learner-search").fill(learnerEmail);
      await expect(
        adminPage.locator(`[data-testid^="learner-deactivated-"]`).first(),
      ).toBeVisible({ timeout: 15_000 });
    } finally {
      await learnerCtx.close();
      await adminCtx.close();
    }
  });
});
