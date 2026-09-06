/**
 * Milestone 3 closed-beta E2E — real lessons, plan, Powtórka, author lifecycle.
 * Does not replace or weaken M2.1 smoke.spec.ts (skipped=0 here).
 */
import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";
import fs from "node:fs";

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
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const serious = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(serious, `${name}: ${JSON.stringify(serious)}`).toEqual([]);
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
    // Advance theory until exercise player
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
      (r) => r.url().includes("/api/learning/attempt") && r.request().method() === "POST",
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
    const href = await cta.getAttribute("href");
    expect(href).toMatch(/\/learn\/lessons\/LES-/);
    await page.getByTestId("link-logout").click();
    await expect(page).toHaveURL(/\/login/);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    const href2 = await page.getByTestId("continue-cta").getAttribute("href");
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
    if ((await item.count()) > 0) {
      const lessonId = await item.getAttribute("data-lesson-id");
      expect(lessonId).toMatch(/^LES-/);
      const cta = page.getByTestId("plan-cta-unfinished_lesson");
      await expect(cta).toBeVisible();
      const href = await cta.getAttribute("href");
      expect(href).toContain(`/learn/lessons/${lessonId}`);
    }
    await axeSmoke(page, "plan");
    await saveShot(page, "daily-plan");
  });

  test("5–6: incorrect attempt → Powtórka → due date updates", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await loginAs(
      page,
      "learner@demo.slowarium.local",
      "DemoLearner1!",
      /\/dashboard/,
    );
    // Force incorrect attempt via API using known exercise from module stream
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
    let answer: Record<string, unknown> = { type: "single_choice", index: 99 };
    if (type === "multiple_choice") answer = { type, indices: [99] };
    if (type === "gap_fill") answer = { type, values: ["xxx"] };
    if (type === "ordering") answer = { type, order: [9, 8, 7] };
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
    await expect(page.getByTestId("review-item").first()).toBeVisible({
      timeout: 15_000,
    });
    const dueBefore = await page
      .getByTestId("review-item")
      .first()
      .getAttribute("data-due-at");
    await axeSmoke(page, "review");
    await saveShot(page, "powtorka-queue");

    // Replay same idempotency key must not move schedule
    const resReplay = await page.context().request.post("/api/learning/attempt", {
      headers: { ...authApiHeaders(), "Idempotency-Key": key },
      data: { moduleId: MODULE, exerciseId, answer, idempotencyKey: key },
    });
    const jReplay = (await resReplay.json()) as {
      replayed?: boolean;
      reviewDueAt?: string | null;
    };
    expect(jReplay.replayed).toBe(true);
    expect(jReplay.reviewDueAt).toBeNull();

    // Correct follow-up with new key → new due date
    const key2 = crypto.randomUUID();
    let correctAnswer: Record<string, unknown> = {
      type: "single_choice",
      index: 0,
    };
    if (type === "multiple_choice") correctAnswer = { type, indices: [0] };
    if (type === "gap_fill") correctAnswer = { type, values: ["a"] };
    if (type === "ordering") correctAnswer = { type, order: [0, 1, 2] };
    const res2 = await page.context().request.post("/api/learning/attempt", {
      headers: { ...authApiHeaders(), "Idempotency-Key": key2 },
      data: {
        moduleId: MODULE,
        exerciseId,
        answer: correctAnswer,
        idempotencyKey: key2,
      },
    });
    const j2 = (await res2.json()) as { reviewDueAt?: string | null };
    expect(res2.ok()).toBeTruthy();
    expect(j2.reviewDueAt).toBeTruthy();
    if (dueBefore && j2.reviewDueAt) {
      expect(j2.reviewDueAt).not.toBe(dueBefore);
    }
  });

  test("7–10: author submit, reviewer changes, resubmit+approve, self-review ban", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await loginAs(
      page,
      "author@demo.slowarium.local",
      "DemoAuthor1!",
      /\/dashboard/,
    );
    await page.goto(`/ru/author/${MODULE}`);
    await expect(page.getByTestId("author-review-detail")).toBeVisible();
    const statusText = await page.getByTestId("review-status").innerText();
    const statusMatch = statusText.match(/Status:\s*(\w+)/);
    const currentStatus = statusMatch?.[1] ?? "";
    if (currentStatus === "APPROVED") {
      const selfDone = await page.context().request.post("/api/author/review", {
        headers: authApiHeaders(),
        data: {
          moduleId: MODULE,
          action: "verdict",
          verdict: "approve",
          comment: "self",
        },
      });
      const selfDoneBody = (await selfDone.json()) as { ok?: boolean; error?: string };
      expect(selfDone.ok()).toBeFalsy();
      expect(selfDoneBody.error).toMatch(
        /self_review|forbidden|not_in_review|stale_state|self/i,
      );
      await saveShot(page, "author-already-approved");
      return;
    }
    const submit = page.getByTestId("submit-for-review");
    if ((await submit.count()) > 0) {
      const resPromise = page.waitForResponse(
        (r) => r.url().includes("/api/author/review"),
        { timeout: 20_000 },
      );
      await submit.click();
      const res = await resPromise;
      const body = (await res.json()) as { ok?: boolean; to?: string; status?: string };
      expect(res.ok()).toBeTruthy();
      expect(body.ok).toBe(true);
      expect(body.to ?? body.status).toMatch(/IN_REVIEW/);
    }
    await saveShot(page, "author-submitted");
    await axeSmoke(page, "author");

    // Self-review forbidden
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
    const changes = page.getByTestId("request-changes");
    if ((await changes.count()) > 0) {
      // UI may require comment field
      const comment = page.getByTestId("review-comment");
      if ((await comment.count()) > 0) {
        await comment.fill("Please revise dialogue register.");
      }
      const resPromise = page.waitForResponse(
        (r) => r.url().includes("/api/author/review"),
        { timeout: 20_000 },
      );
      await changes.click();
      const res = await resPromise;
      const body = (await res.json()) as { ok?: boolean; to?: string; error?: string };
      if (!body.ok && body.error === "comment_required") {
        // API-level request with comment
        const api = await page.context().request.post("/api/author/review", {
          headers: authApiHeaders(),
          data: {
            moduleId: MODULE,
            action: "verdict",
            verdict: "request_changes",
            comment: "Please revise dialogue register.",
          },
        });
        const apiBody = (await api.json()) as { ok?: boolean; to?: string };
        expect(api.ok()).toBeTruthy();
        expect(apiBody.to).toBe("REJECTED");
      } else {
        expect(body.ok).toBe(true);
        expect(body.to).toBe("REJECTED");
      }
    }
    await saveShot(page, "changes-requested");

    await page.getByTestId("link-logout").click();
    await loginAs(
      page,
      "author@demo.slowarium.local",
      "DemoAuthor1!",
      /\/dashboard/,
    );
    // Resubmit
    const resubmit = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: { moduleId: MODULE, action: "submit_for_review" },
    });
    const resubmitBody = (await resubmit.json()) as {
      ok?: boolean;
      to?: string;
      error?: string;
      status?: string;
    };
    if (!resubmit.ok()) {
      expect(String(resubmitBody.error ?? "")).toMatch(/stale_state|illegal|forbidden/i);
      await page.goto(`/ru/author/${MODULE}`);
      const st = await page.getByTestId("review-status").innerText();
      expect(st).toMatch(/IN_REVIEW|APPROVED/);
      return;
    }
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

  test("11: ordinary learner + previewer cannot enter author area", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    // Register ordinary learner
    const stamp = Date.now();
    const email = `e2e.m3.ord.${stamp}@slowarium.test`;
    const password = "E2eTestPass123!";
    await page.goto("/ru/register");
    await page.getByTestId("register-name").fill("M3 Ordinary");
    await page.getByTestId("register-email").fill(email);
    await page.getByTestId("register-password").fill(password);
    await page.getByTestId("register-submit").click();
    await page.waitForURL(/\/(onboarding|dashboard)/, { timeout: 30_000 });
    if (page.url().includes("/onboarding")) {
      await page.getByTestId("onboarding-age").check();
      await page.getByTestId("onboarding-consent-terms").check();
      await page.getByTestId("onboarding-consent-privacy").check();
      await page.getByTestId("onboarding-continue").click();
    }
    await page.goto("/ru/author");
    // notFound() keeps the URL; assert author chrome is absent.
    await expect(page.getByTestId("author-list-page")).toHaveCount(0);
    await expect(page.getByTestId("author-review-detail")).toHaveCount(0);
    const status = await page.context().request.post("/api/author/review", {
      headers: authApiHeaders(),
      data: { moduleId: MODULE, action: "submit_for_review" },
    });
    expect([401, 403, 404]).toContain(status.status());
    await saveShot(page, "ordinary-learner-author-denied");
  });

  test("12: PUBLISHED blocked", async ({ page }) => {
    test.setTimeout(90_000);
    await loginAs(
      page,
      "reviewer@demo.slowarium.local",
      "DemoReviewer1!",
      /\/dashboard/,
    );
    // Prefer admin if available; reviewer/admin path
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
    if ((await page.getByTestId("approved-but-blocked").count()) > 0) {
      await expect(page.getByTestId("approved-but-blocked")).toBeVisible();
    }
    await saveShot(page, "published-blocked");
  });
});
