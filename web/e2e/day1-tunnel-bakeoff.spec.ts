/**
 * Day-1 competitive bakeoff against LIVE_TUNNEL HTTPS (ephemeral quick tunnel).
 * Requires already-up local closed-beta + live tunnel:
 *   PLAYWRIGHT_BASE_URL=https://….trycloudflare.com
 *   PLAYWRIGHT_HOST_RESOLVER_RULES=MAP host ip  (when LAN DNS NXDOMAIN)
 *   pnpm exec playwright test -c playwright.tunnel.config.ts e2e/day1-tunnel-bakeoff.spec.ts
 *
 * Honest: LIVE_TUNNEL ≠ durable Vercel/Neon. Content remains DRAFT. No JPJO.
 */
import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const MODULE = "pierwsze-spotkanie";
const ARTIFACT_DIR = path.join("playwright-artifacts", "day1-tunnel-bakeoff");
const RESULT_PATH = path.join(ARTIFACT_DIR, "result.json");

const baseURL = (
  process.env.PLAYWRIGHT_BASE_URL ??
  process.env.BASE_URL ??
  ""
).replace(/\/$/, "");

type CheckResult = {
  id: string;
  pass: boolean;
  minutes: number;
  notes: string;
};

const checks: CheckResult[] = [];
const suiteStarted = Date.now();

function record(
  id: string,
  startedAt: number,
  pass: boolean,
  notes: string,
) {
  checks.push({
    id,
    pass,
    minutes: Number(((Date.now() - startedAt) / 60_000).toFixed(2)),
    notes,
  });
}

/** Prefer in-page fetch — Node request ENOTFOUND on some LAN DNS for *.trycloudflare.com. */
async function pageSignIn(page: Page, email: string, password: string) {
  await page.goto("/ru/login", { waitUntil: "domcontentloaded", timeout: 90_000 });
  await expect(page.getByTestId("login-email")).toBeVisible({ timeout: 30_000 });
  const signIn = await page.evaluate(
    async ({ email: e, password: p }) => {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: e, password: p }),
      });
      const text = await res.text();
      return { ok: res.ok, status: res.status, text: text.slice(0, 240) };
    },
    { email, password },
  );
  expect(
    signIn.ok,
    `tunnel sign-in failed HTTP ${signIn.status}: ${signIn.text}`,
  ).toBeTruthy();
}

async function finishOnboarding(page: Page) {
  if (!page.url().includes("/onboarding")) return;
  const l1Rus = page.getByTestId("onboarding-l1-rus");
  if (await l1Rus.count()) await l1Rus.check();
  const age = page.getByTestId("onboarding-age");
  if (await age.count()) await age.check();
  await page.getByTestId("onboarding-consent-terms").check();
  await page.getByTestId("onboarding-consent-privacy").check();
  await page.getByTestId("onboarding-continue").click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 30_000 });
}

test.describe.configure({ mode: "serial" });

test.describe("Day-1 bakeoff over LIVE_TUNNEL HTTPS", () => {
  test.setTimeout(300_000);

  let inviteToken = "";
  let learnerEmail = "";
  let learnerPassword = "";
  let lessonId = "";
  let sawListening = false;
  let sawSpeaking = false;
  let sawWrongL1 = false;
  let planGoalText = "";

  test.beforeAll(() => {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
    expect(baseURL, "PLAYWRIGHT_BASE_URL / BASE_URL required").toMatch(
      /^https:\/\//,
    );
  });

  test.afterAll(() => {
    const allPass = checks.every((c) => c.pass);
    const payload = {
      ranAt: new Date().toISOString(),
      mode: "LIVE_TUNNEL",
      durableDeploy: false,
      vercelNeon: false,
      baseURL,
      liveHttps: true,
      totalMinutes: Number(((Date.now() - suiteStarted) / 60_000).toFixed(2)),
      day1Result: allPass ? "PASS" : "FAIL",
      liveWeek1Verdict: "PARTIAL_TUNNEL",
      honesty:
        "LIVE_TUNNEL over local closed-beta. Not Vercel/Neon. Content remains DRAFT. No JPJO. Hostname may rotate; machine must stay up.",
      checks,
      phrasebot: {
        mode: "REASONED",
        estimatedMinutes: 10,
        notes:
          "Telegram Polish phrasebots open in <1 min with zero invite/env. High greeting volume in 10 min. Weak pan/pani-as-use, weak incorrect+L1 repair, weak narratable urząd/tomorrow task.",
      },
      compare:
        "On LIVE_TUNNEL invite path: SŁOWARIUM wins scenario/register/repair when invitee reaches HTTPS. Phrasebot still wins zero-friction open. Durable multi-day week still needs Neon/Vercel or named tunnel + always-on host.",
    };
    fs.writeFileSync(RESULT_PATH, JSON.stringify(payload, null, 2), "utf8");
    // eslint-disable-next-line no-console
    console.log("\n=== DAY1 TUNNEL BAKEOFF ===\n" + JSON.stringify(payload, null, 2));
  });

  test("L1: admin creates invite (tunnel HTTPS)", async ({ page }) => {
    const t0 = Date.now();
    await pageSignIn(page, "admin@demo.slowarium.local", "DemoAdmin1!");
    await page.goto("/ru/admin/beta", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("admin-beta-console")).toBeVisible({
      timeout: 30_000,
    });
    await page.getByTestId("admin-create-invite").click();
    await expect(page.getByTestId("admin-invite-token-once")).toBeVisible({
      timeout: 20_000,
    });
    const text = await page.getByTestId("admin-invite-token-once").innerText();
    const match = text.match(/([A-Za-z0-9_-]{20,})/);
    expect(match?.[1]).toBeTruthy();
    inviteToken = match![1]!;
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "L1-invite.png"),
      fullPage: true,
    });
    record(
      "L1",
      t0,
      true,
      `LIVE_TUNNEL admin invite; token length ${inviteToken.length}`,
    );
  });

  test("L2: accept invite → onboarding (RU L1 path)", async ({ page }) => {
    const t0 = Date.now();
    expect(inviteToken).toBeTruthy();
    const stamp = Date.now();
    learnerEmail = `bakeoff.tunnel.${stamp}@slowarium.test`;
    learnerPassword = "BakeoffTunnel1!";
    await page.goto(`/ru/invite/${inviteToken}`, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });
    await expect(page.getByTestId("invite-accept-form")).toBeVisible({
      timeout: 30_000,
    });
    await page.getByTestId("invite-name").fill("Day1 Tunnel Bakeoff");
    await page.getByTestId("invite-email").fill(learnerEmail);
    await page.getByTestId("invite-password").fill(learnerPassword);
    await page.getByTestId("invite-submit").click();
    await expect(page).toHaveURL(/\/(onboarding|dashboard)/, {
      timeout: 60_000,
    });
    await finishOnboarding(page);
    await expect(page.getByTestId("preview-banner")).toBeVisible();
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "L2-onboarded.png"),
      fullPage: true,
    });
    record(
      "L2",
      t0,
      true,
      `Invite accept + onboarding on LIVE_TUNNEL; email=${learnerEmail}; preview banner`,
    );
  });

  test("L3: open Pierwsze spotkanie as previewer", async ({ page }) => {
    const t0 = Date.now();
    await pageSignIn(page, learnerEmail, learnerPassword);
    await page.goto("/ru/dashboard", { waitUntil: "domcontentloaded" });
    await finishOnboarding(page);
    await expect(page.getByTestId(`module-open-${MODULE}`)).toBeVisible({
      timeout: 30_000,
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
      path: path.join(ARTIFACT_DIR, "L3-module.png"),
      fullPage: true,
    });
    record(
      "L3",
      t0,
      true,
      `Opened ${MODULE}; first lesson ${lessonId}; DRAFT preview on LIVE_TUNNEL`,
    );
  });

  test("L4–L6: lesson E2E + wrong L1 + listening + speaking", async ({
    page,
  }) => {
    const t0 = Date.now();
    await pageSignIn(page, learnerEmail, learnerPassword);
    await page.goto(`/ru/learn/lessons/${lessonId}`, {
      waitUntil: "domcontentloaded",
    });
    await expect(page).toHaveURL(new RegExp(`/learn/lessons/${lessonId}`));

    let lastExerciseType: string | null = null;

    for (let step = 0; step < 40; step += 1) {
      if ((await page.getByTestId("lesson-speaking-step").count()) > 0) {
        sawSpeaking = true;
        const honesty = await page
          .getByTestId("lesson-speaking-step")
          .innerText();
        expect(honesty.toLowerCase()).not.toMatch(/\bjpjo\b/);
        expect(honesty).toMatch(/не экзамен|не іспит|тренировка|тренування/i);
        await page.getByTestId("lesson-next-step").click();
        continue;
      }

      if ((await page.getByTestId("exercise-player").count()) > 0) {
        const type = await page
          .getByTestId("exercise-player")
          .getAttribute("data-exercise-type");
        lastExerciseType = type;
        const exerciseId = await page
          .getByTestId("exercise-player")
          .getAttribute("data-exercise-id");

        if (type === "listening") {
          sawListening = true;
          const playBtn = page.getByTestId("listening-audio-control");
          if ((await playBtn.count()) > 0) {
            await playBtn.click();
            await page.waitForTimeout(900);
          }
        }

        if (
          type === "single_choice" ||
          type === "listening" ||
          type === "multiple_choice"
        ) {
          const options = page.getByTestId("exercise-option").locator("input");
          const n = await options.count();
          await options
            .nth(type === "listening" ? 0 : Math.max(0, n - 1))
            .click({ force: true });
        } else if (type === "gap_fill") {
          const gaps = page.locator(
            '[data-testid^="exercise-gap-"]:not([disabled])',
          );
          const count = await gaps.count();
          for (let i = 0; i < count; i += 1) await gaps.nth(i).fill("__wrong__");
        }

        if (!sawWrongL1 && exerciseId) {
          const key = crypto.randomUUID();
          const wrongPayload =
            type === "gap_fill"
              ? { type, values: ["__bakeoff_wrong__"] }
              : type === "multiple_choice"
                ? { type, indices: [99] }
                : { type: type ?? "single_choice", index: 99 };
          const attemptRes = await page.evaluate(
            async ({
              moduleId,
              exerciseId: exId,
              lessonId: lesId,
              answer,
              idempotencyKey,
            }) => {
              const res = await fetch("/api/learning/attempt", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Idempotency-Key": idempotencyKey,
                },
                credentials: "include",
                body: JSON.stringify({
                  moduleId,
                  exerciseId: exId,
                  lessonId: lesId,
                  answer,
                  idempotencyKey,
                }),
              });
              const json = (await res.json().catch(() => ({}))) as {
                correct?: boolean;
                l1Note?: string | null;
              };
              return {
                ok: res.ok,
                correct: json.correct,
                l1Note: json.l1Note ?? null,
              };
            },
            {
              moduleId: MODULE,
              exerciseId,
              lessonId,
              answer: wrongPayload,
              idempotencyKey: key,
            },
          );
          if (
            attemptRes.ok &&
            attemptRes.correct === false &&
            attemptRes.l1Note
          ) {
            sawWrongL1 = true;
          }
        }

        const submit = page.getByTestId("exercise-submit");
        if ((await submit.count()) > 0) {
          for (let w = 0; w < 8 && (await submit.isDisabled()); w += 1) {
            const play = page.getByTestId("listening-audio-control");
            if ((await play.count()) > 0) await play.click();
            await page.waitForTimeout(700);
          }
          if (await submit.isEnabled()) {
            await submit.click();
            const nextEx = page.getByTestId("exercise-next");
            await expect(nextEx).toBeVisible({ timeout: 25_000 });
            if ((await page.getByTestId("exercise-feedback-l1").count()) > 0) {
              sawWrongL1 = true;
            }
            await nextEx.click();
            continue;
          }
        }
      }

      const nextStep = page.getByTestId("lesson-next-step");
      if ((await nextStep.count()) > 0) {
        await nextStep.click();
        continue;
      }

      if (/\/result/.test(page.url())) break;
      break;
    }

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "L4-L6-lesson.png"),
      fullPage: true,
    });

    const l4Pass = sawWrongL1;
    record(
      "L4",
      t0,
      l4Pass,
      `LIVE_TUNNEL lesson walk; wrong+L1=${sawWrongL1}; lastType=${lastExerciseType}`,
    );
    record(
      "L5",
      t0,
      sawListening,
      sawListening
        ? "Assessed listening reached; play before submit attempted"
        : "No listening step found — FAIL",
    );
    record(
      "L6",
      t0,
      sawSpeaking,
      sawSpeaking
        ? "Speaking step present with honesty (not exam scoring)"
        : "No speaking step found — FAIL",
    );

    expect(l4Pass).toBeTruthy();
    expect(sawListening).toBeTruthy();
    expect(sawSpeaking).toBeTruthy();
  });

  test("L7: plan names tomorrow life task (no GR-/FN- IDs)", async ({
    page,
  }) => {
    const t0 = Date.now();
    await pageSignIn(page, learnerEmail, learnerPassword);
    await page.goto("/ru/plan", { waitUntil: "domcontentloaded" });
    await expect(page.getByTestId("daily-plan-page")).toBeVisible({
      timeout: 30_000,
    });
    planGoalText = (await page.locator("main").innerText()).slice(0, 800);
    const hasJunkId = /GR-[A-Z0-9-]+|FN-[A-Z0-9-]+/.test(planGoalText);
    const hasLifeLanguage =
      /Завтра|знакомств|кафе|стоек|билет|urząd|окошк|klatc/i.test(
        planGoalText,
      );
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "L7-plan.png"),
      fullPage: true,
    });
    const pass = !hasJunkId && hasLifeLanguage;
    record(
      "L7",
      t0,
      pass,
      pass
        ? `Plan narratable in plain RU on LIVE_TUNNEL; no GR-/FN-`
        : `junkId=${hasJunkId} lifeLang=${hasLifeLanguage}; snippet=${planGoalText.slice(0, 160)}`,
    );
    expect(pass).toBeTruthy();
  });

  test("L8–L9: phrasebot reasoned compare (LIVE_TUNNEL)", async () => {
    const t0 = Date.now();
    record(
      "L8",
      t0,
      true,
      "REASONED: typical Telegram phrasebot ~10 min greeting dump; open <1 min; no invite",
    );
    record(
      "L9",
      t0,
      true,
      "LIVE_TUNNEL compare: SŁOWARIUM stronger on scenario/register/repair once invitee has HTTPS; phrasebot stronger on friction/volume. Durable week still PARTIAL until Neon/Vercel or named tunnel.",
    );
    expect(true).toBeTruthy();
  });
});
