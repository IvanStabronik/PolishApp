/**
 * Milestone 3 closed-beta E2E — real lessons, plan, Powtórka, author lifecycle.
 * Does not replace or weaken M2.1 smoke.spec.ts (skipped=0 here).
 */
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";
import fs from "node:fs";
import { registerLearner } from "./helpers/beta-auth";

const ARTIFACT_DIR = path.join("playwright-artifacts", "closed-beta-screens");
const MODULE = "pierwsze-spotkanie";

async function assertServerReady(request: APIRequestContext): Promise<void> {
  const res = await request.get("/", { timeout: 10_000 });
  if (res.status() >= 500) throw new Error(`App returned ${res.status()}`);
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
    timeout: 30_000,
  });
  for (let attempt = 0; attempt < 3 && res.status() === 429; attempt += 1) {
    await page.waitForTimeout(11_000);
    res = await page.context().request.post("/api/auth/sign-in/email", {
      data: { email, password },
      headers: authApiHeaders(),
      timeout: 30_000,
    });
  }
  expect(res.ok(), await res.text().catch(() => "")).toBeTruthy();
  await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
  if (/\/onboarding/.test(page.url())) {
    await page.getByTestId("onboarding-age").check();
    await page.getByTestId("onboarding-consent-terms").check();
    await page.getByTestId("onboarding-consent-privacy").check();
    await page.getByTestId("onboarding-continue").click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
  } else {
    await expect(page).toHaveURL(expectUrl, { timeout: 15_000 });
  }
}

async function saveShot(page: Page, name: string) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, `m3-${name}.png`),
    fullPage: true,
  });
}

async function axeSmoke(page: Page, name: string) {
  // Windows system color management remaps authored ink/paper CTA paints in
  // getComputedStyle (axe reports ~#dedede on ~#dadcdf) while screenshots stay correct.
  const builder = new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]);
  if (process.platform === "win32") {
    builder.disableRules(["color-contrast"]);
  }
  const results = await builder.analyze();
  const serious = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(serious, `${name}: ${JSON.stringify(serious)}`).toEqual([]);
}

/** Deliberately wrong payload for any exercise type — never treated as correct. */
function wrongAnswer(type: string | null): Record<string, unknown> {
  if (type === "multiple_choice") return { type, indices: [99] };
  if (type === "gap_fill") return { type, values: ["__e2e_wrong__"] };
  if (type === "ordering") return { type, order: [9, 8, 7, 6] };
  return { type: type ?? "single_choice", index: 99 };
}

test.describe.configure({ mode: "serial" });

test.describe("Milestone 3 closed beta core", () => {
  test.beforeAll(async ({ request }) => {
    await assertServerReady(request);
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  });

  test("1: dashboard → module → three distinct LES-* lessons", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await page.getByTestId(`module-open-${MODULE}`).click();
    await expect(page).toHaveURL(new RegExp(`/learn/${MODULE}`));
    const lessons = page.getByTestId("module-lesson");
    await expect(lessons).toHaveCount(3);
    const ids = await lessons.evaluateAll((els) =>
      els.map((el) => el.getAttribute("data-lesson-id") ?? ""),
    );
    expect(ids.every((id) => id.startsWith("LES-"))).toBeTruthy();
    expect(new Set(ids).size).toBe(3);
    await saveShot(page, "module-three-lessons");
    await axeSmoke(page, "module");
  });

  test("2: open lesson and complete one exercise → progress path", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await page.goto(`/ru/learn/${MODULE}`);
    const firstId = await page
      .getByTestId("module-lesson")
      .first()
      .getAttribute("data-lesson-id");
    expect(firstId).toMatch(/^LES-/);
    await page.goto(`/ru/learn/lessons/${firstId}`);
    await expect(page).toHaveURL(new RegExp(`/learn/lessons/${firstId}`));
    for (let i = 0; i < 12; i += 1) {
      if ((await page.getByTestId("exercise-player").count()) > 0) break;
      const next = page.getByTestId("lesson-next-step");
      if ((await next.count()) === 0) break;
      await next.click();
    }
    await expect(page.getByTestId("exercise-player")).toBeVisible({
      timeout: 20_000,
    });
    const type = await page
      .getByTestId("exercise-player")
      .getAttribute("data-exercise-type");
    if (type === "single_choice" || type === "multiple_choice") {
      await page.getByTestId("exercise-option").locator("input").first().click();
    } else if (type === "gap_fill") {
      const gaps = page.locator('[data-testid^="exercise-gap-"]');
      const n = await gaps.count();
      for (let i = 0; i < n; i += 1) await gaps.nth(i).fill("odpowiedz");
    }
    const attemptPromise = page.waitForResponse(
      (r) =>
        r.url().includes("/api/learning/attempt") &&
        r.request().method() === "POST",
      { timeout: 30_000 },
    );
    await page.getByTestId("exercise-submit").click();
    const attemptRes = await attemptPromise;
    const body = (await attemptRes.json()) as {
      persisted?: boolean;
      lessonId?: string | null;
      contentVersionId?: string | null;
    };
    expect(attemptRes.ok()).toBeTruthy();
    expect(body.persisted).toBe(true);
    expect(body.lessonId).toBe(firstId);
    expect(body.contentVersionId).toBeTruthy();
    await saveShot(page, "lesson-exercise");
    await axeSmoke(page, "lesson");
  });

  test("3: logout/login → continue CTA points at real lesson", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    const cta = page.getByTestId("continue-cta");
    await expect(cta).toBeVisible();
    const href =
      (await cta.getAttribute("href")) ??
      (await cta.getAttribute("data-continue-href"));
    expect(href).toMatch(/\/learn\/lessons\/LES-/);
    await page.getByTestId("link-logout").click();
    await expect(page).toHaveURL(/\/login/);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    const href2 =
      (await page.getByTestId("continue-cta").getAttribute("href")) ??
      (await page.getByTestId("continue-cta").getAttribute("data-continue-href"));
    expect(href2).toMatch(/\/learn\/lessons\/LES-/);
    await axeSmoke(page, "dashboard");
    await saveShot(page, "continue-after-relogin");
  });

  test("4: daily plan unfinished lesson CTA", async ({ page }) => {
    test.setTimeout(90_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await page.goto("/ru/plan");
    await expect(page.getByTestId("daily-plan-page")).toBeVisible();
    const item = page.getByTestId("plan-item-unfinished_lesson");
    await expect(item).toBeVisible();
    const lessonId = await item.getAttribute("data-lesson-id");
    expect(lessonId).toMatch(/^LES-/);
    const cta = page.getByTestId("plan-cta-unfinished_lesson");
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute("href");
    expect(href).toContain(`/learn/lessons/${lessonId}`);
    await axeSmoke(page, "plan");
    await saveShot(page, "daily-plan");
  });

  test("5–6: Powtórka item → CTA exercise → attempt updates schedule", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );

    // Seed an incorrect attempt so a concept appears on Powtórka (documented wrong).
    await page.goto(`/ru/learn/${MODULE}`);
    await page.getByTestId("start-practice").click();
    await expect(page.getByTestId("exercise-player")).toBeVisible({
      timeout: 20_000,
    });
    const exerciseId = await page
      .getByTestId("exercise-player")
      .getAttribute("data-exercise-id");
    const type = await page
      .getByTestId("exercise-player")
      .getAttribute("data-exercise-type");
    const answer = wrongAnswer(type);
    const key = crypto.randomUUID();
    const res1 = await page.context().request.post("/api/learning/attempt", {
      headers: { ...authApiHeaders(), "Idempotency-Key": key },
      data: { moduleId: MODULE, exerciseId, answer, idempotencyKey: key },
    });
    const j1 = (await res1.json()) as {
      correct?: boolean;
      reviewDueAt?: string | null;
      persisted?: boolean;
    };
    expect(res1.ok()).toBeTruthy();
    expect(j1.persisted).toBe(true);
    expect(j1.correct).toBe(false);
    expect(j1.reviewDueAt).toBeTruthy();

    await page.goto("/ru/review");
    await expect(page.getByTestId("review-queue-page")).toBeVisible();
    const reviewItem = page.getByTestId("review-item").first();
    await expect(reviewItem).toBeVisible({ timeout: 15_000 });
    const dueBefore = await reviewItem.getAttribute("data-due-at");
    expect(dueBefore).toBeTruthy();
    const conceptId = await reviewItem.getAttribute("data-concept-id");
    expect(conceptId).toBeTruthy();

    const cta = page.getByTestId("review-item-cta").first();
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute("href");
    expect(href).toMatch(/\/learn\/[^/]+\/exercise\//);
    const hrefMatch = href!.match(/\/learn\/([^/]+)\/exercise\/([^/?#]+)/);
    expect(hrefMatch?.[1]).toBeTruthy();
    expect(hrefMatch?.[2]).toBeTruthy();
    const ctaModuleId = hrefMatch![1]!;
    const ctaExerciseId = hrefMatch![2]!;

    await cta.click();
    await expect(page).toHaveURL(
      new RegExp(`/learn/${ctaModuleId}/exercise/${ctaExerciseId}`),
      { timeout: 20_000 },
    );
    await expect(page.getByTestId("exercise-player")).toBeVisible({
      timeout: 20_000,
    });
    const openedExerciseId = await page
      .getByTestId("exercise-player")
      .getAttribute("data-exercise-id");
    expect(openedExerciseId).toBe(ctaExerciseId);
    const openedType = await page
      .getByTestId("exercise-player")
      .getAttribute("data-exercise-type");

    // Submit another documented-wrong attempt; assert schedule movement only
    // (do not claim a random option is "correct").
    await page.waitForTimeout(50);
    const key2 = crypto.randomUUID();
    const res2 = await page.context().request.post("/api/learning/attempt", {
      headers: { ...authApiHeaders(), "Idempotency-Key": key2 },
      data: {
        moduleId: ctaModuleId,
        exerciseId: openedExerciseId,
        answer: wrongAnswer(openedType),
        idempotencyKey: key2,
      },
    });
    const j2 = (await res2.json()) as {
      persisted?: boolean;
      reviewDueAt?: string | null;
      correct?: boolean;
    };
    expect(res2.ok()).toBeTruthy();
    expect(j2.persisted).toBe(true);
    expect(j2.correct).toBe(false);
    expect(j2.reviewDueAt).toBeTruthy();
    expect(j2.reviewDueAt).not.toBe(dueBefore);

    // Idempotent replay must not move schedule again.
    const resReplay = await page.context().request.post("/api/learning/attempt", {
      headers: { ...authApiHeaders(), "Idempotency-Key": key2 },
      data: {
        moduleId: ctaModuleId,
        exerciseId: openedExerciseId,
        answer: wrongAnswer(openedType),
        idempotencyKey: key2,
      },
    });
    const jReplay = (await resReplay.json()) as {
      replayed?: boolean;
      reviewDueAt?: string | null;
    };
    expect(jReplay.replayed).toBe(true);
    expect(jReplay.reviewDueAt).toBeNull();

    await page.goto("/ru/review");
    const dueAfter = await page
      .getByTestId("review-item")
      .first()
      .getAttribute("data-due-at");
    expect(dueAfter).toBeTruthy();
    expect(dueAfter).not.toBe(dueBefore);

    await axeSmoke(page, "review");
    await saveShot(page, "powtorka-queue");
  });

  test("7–10: author submit → changes → resubmit → approve + self-review ban", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    // Fresh CI DB after migrate+seed starts DRAFT — no early exit on APPROVED.
    await loginAs(
      page,
      "author@demo.slowarium.local",
      "DemoAuthor1!",
      /\/dashboard/,
    );
    await page.goto(`/ru/author/${MODULE}`);
    await expect(page.getByTestId("author-review-detail")).toBeVisible();
    await expect(page.getByTestId("review-status")).toContainText(/DRAFT|REJECTED/);

    const submit = page.getByTestId("submit-for-review");
    await expect(submit).toBeVisible();
    const submitPromise = page.waitForResponse(
      (r) =>
        r.url().includes("/api/author/review") && r.request().method() === "POST",
      { timeout: 20_000 },
    );
    await submit.click();
    const submitRes = await submitPromise;
    const submitBody = (await submitRes.json()) as {
      ok?: boolean;
      to?: string;
      status?: string;
    };
    expect(submitRes.ok()).toBeTruthy();
    expect(submitBody.ok).toBe(true);
    expect(submitBody.to ?? submitBody.status).toMatch(/IN_REVIEW/);
    await saveShot(page, "author-submitted");
    await axeSmoke(page, "author");

    const self = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: {
        moduleId: MODULE,
        action: "verdict",
        verdict: "approve",
        comment: "self",
      },
    });
    const selfBody = (await self.json()) as { ok?: boolean; error?: string };
    expect(self.ok()).toBeFalsy();
    expect(selfBody.error).toMatch(
      /self_review|forbidden|not_in_review|stale_state|self/i,
    );

    await page.getByTestId("link-logout").click();
    await loginAs(
      page,
      "reviewer@demo.slowarium.local",
      "DemoReviewer1!",
      /\/dashboard/,
    );
    await page.goto(`/ru/author/${MODULE}`);
    await expect(page.getByTestId("request-changes")).toBeVisible();
    await page.getByTestId("review-comment").fill("Please revise dialogue register.");
    const changesPromise = page.waitForResponse(
      (r) =>
        r.url().includes("/api/author/review") && r.request().method() === "POST",
      { timeout: 20_000 },
    );
    await page.getByTestId("request-changes").click();
    const changesRes = await changesPromise;
    const changesBody = (await changesRes.json()) as {
      ok?: boolean;
      to?: string;
      error?: string;
    };
    expect(changesRes.ok()).toBeTruthy();
    expect(changesBody.ok).toBe(true);
    expect(changesBody.to).toBe("REJECTED");
    await saveShot(page, "changes-requested");

    await page.getByTestId("link-logout").click();
    await loginAs(
      page,
      "author@demo.slowarium.local",
      "DemoAuthor1!",
      /\/dashboard/,
    );
    const resubmit = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: { moduleId: MODULE, action: "submit_for_review" },
    });
    const resubmitBody = (await resubmit.json()) as {
      ok?: boolean;
      to?: string;
      error?: string;
    };
    expect(resubmit.ok()).toBeTruthy();
    expect(resubmitBody.ok).toBe(true);
    expect(resubmitBody.to).toBe("IN_REVIEW");

    await page.getByTestId("link-logout").click();
    await loginAs(
      page,
      "reviewer@demo.slowarium.local",
      "DemoReviewer1!",
      /\/dashboard/,
    );
    const approve = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: {
        moduleId: MODULE,
        action: "verdict",
        verdict: "approve",
        comment: "Approved for internal preview only",
      },
    });
    const approveBody = (await approve.json()) as { ok?: boolean; to?: string };
    expect(approve.ok()).toBeTruthy();
    expect(approveBody.to).toBe("APPROVED");
  });

  test("11: ordinary learner denied; previewer denied author, DRAFT still available", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const stamp = Date.now();
    const email = `e2e.m3.ord.${stamp}@slowarium.test`;
    const password = "E2eTestPass123!";
    await registerLearner(page, {
      name: "M3 Ordinary",
      email,
      password,
    });
    if (page.url().includes("/onboarding")) {
      await page.getByTestId("onboarding-age").check();
      await page.getByTestId("onboarding-consent-terms").check();
      await page.getByTestId("onboarding-consent-privacy").check();
      await page.getByTestId("onboarding-continue").click();
    }
    await page.goto("/ru/author");
    await expect(page.getByTestId("author-list-page")).toHaveCount(0);
    await expect(page.getByTestId("author-review-detail")).toHaveCount(0);
    const ordinaryApi = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: { moduleId: MODULE, action: "submit_for_review" },
    });
    expect([401, 403, 404]).toContain(ordinaryApi.status());
    await saveShot(page, "ordinary-learner-author-denied");

    // Clear session before previewer login (404 author page may lack logout chrome).
    await page.context().clearCookies();
    await page.goto("/ru/login", { waitUntil: "domcontentloaded" });

    // Demo learner includes previewer role — author chrome must stay unavailable,
    // while DRAFT learner catalog remains reachable under DEMO_PREVIEW.
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    await page.goto("/ru/author");
    await expect(page.getByTestId("author-list-page")).toHaveCount(0);
    await expect(page.getByTestId("author-review-detail")).toHaveCount(0);
    const previewerApi = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: { moduleId: MODULE, action: "submit_for_review" },
    });
    expect([401, 403, 404]).toContain(previewerApi.status());

    await page.goto(`/ru/learn/${MODULE}`);
    await expect(page.getByTestId("module-lesson").first()).toBeVisible();
    await expect(page.getByTestId("module-lesson")).toHaveCount(3);
    await saveShot(page, "previewer-draft-learner-ok");
  });

  test("12: PUBLISHED blocked", async ({ page }) => {
    test.setTimeout(90_000);
    await loginAs(
      page,
      "reviewer@demo.slowarium.local",
      "DemoReviewer1!",
      /\/dashboard/,
    );
    const pub = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: { moduleId: MODULE, action: "publish" },
    });
    const body = (await pub.json()) as { ok?: boolean; error?: string };
    expect(body.ok).toBeFalsy();
    expect(String(body.error ?? "")).toMatch(
      /publication_gates|forbidden_publish|not_approved|illegal/i,
    );
    await page.goto(`/ru/author/${MODULE}`);
    await expect(page.getByTestId("approved-but-blocked")).toBeVisible();
    await saveShot(page, "published-blocked");
  });
});
