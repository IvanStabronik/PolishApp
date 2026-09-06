import type { APIRequestContext, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export function authApiHeaders(base = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000") {
  return {
    "Content-Type": "application/json",
    Origin: base,
    Referer: `${base}/ru/login`,
  };
}

export async function apiSignIn(
  request: APIRequestContext,
  email: string,
  password: string,
) {
  let res = await request.post("/api/auth/sign-in/email", {
    data: { email, password },
    headers: authApiHeaders(),
    timeout: 30_000,
  });
  for (let attempt = 0; attempt < 3 && res.status() === 429; attempt += 1) {
    await new Promise((r) => setTimeout(r, 11_000));
    res = await request.post("/api/auth/sign-in/email", {
      data: { email, password },
      headers: authApiHeaders(),
      timeout: 30_000,
    });
  }
  expect(res.ok(), await res.text().catch(() => "")).toBeTruthy();
  return res;
}

/** Admin creates invite; returns plaintext token (creation moment only). */
export async function adminCreateInvite(
  request: APIRequestContext,
): Promise<{ token: string; inviteId: string }> {
  await apiSignIn(
    request,
    "admin@demo.slowarium.local",
    "DemoAdmin1!",
  );
  const res = await request.post("/api/admin/beta/invites", {
    data: { expiresInDays: 7, useLimit: 1, label: "e2e" },
    headers: authApiHeaders(),
  });
  expect(res.ok(), await res.text()).toBeTruthy();
  const body = (await res.json()) as { token: string; inviteId: string };
  expect(body.token).toBeTruthy();
  expect(body.inviteId).toBeTruthy();
  await request.post("/api/auth/sign-out", {
    data: {},
    headers: authApiHeaders(),
  });
  return { token: body.token, inviteId: body.inviteId };
}

/**
 * Register a learner. When BETA_MODE is on (CI M4), uses invite acceptance.
 * When off, uses open /register form.
 */
export async function registerLearner(
  page: Page,
  input: { name: string; email: string; password: string },
) {
  const betaMode =
    process.env.BETA_MODE === "true" || process.env.BETA_MODE === "1";

  if (betaMode) {
    const { token } = await adminCreateInvite(page.context().request);
    await page.goto(`/ru/invite/${token}`);
    await expect(page.getByTestId("invite-accept-form")).toBeVisible({
      timeout: 20_000,
    });
    await page.getByTestId("invite-name").fill(input.name);
    await page.getByTestId("invite-email").fill(input.email);
    await page.getByTestId("invite-password").fill(input.password);
    await page.getByTestId("invite-submit").click();
    await expect(page).toHaveURL(/\/(onboarding|dashboard)/, {
      timeout: 45_000,
    });
    return;
  }

  await page.goto("/ru/register");
  await page.getByTestId("register-name").fill(input.name);
  await page.getByTestId("register-email").fill(input.email);
  await page.getByTestId("register-password").fill(input.password);
  await page.getByTestId("register-submit").click();
  await expect(page).toHaveURL(/\/(onboarding|dashboard)/, {
    timeout: 45_000,
  });
}
