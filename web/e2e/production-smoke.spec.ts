import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * M5 production smoke against a deployed private beta.
 * Does NOT depend on seeded demo users.
 * Invite/register path requires PROD_SMOKE_ADMIN_* + PROD_SMOKE_ALLOW_DESTRUCTIVE=true.
 */

const baseURL = (
  process.env.BASE_URL ??
  process.env.PLAYWRIGHT_BASE_URL ??
  ""
).replace(/\/$/, "");

const adminEmail = process.env.PROD_SMOKE_ADMIN_EMAIL?.trim() ?? "";
const adminPassword = process.env.PROD_SMOKE_ADMIN_PASSWORD?.trim() ?? "";
const allowDestructive =
  process.env.PROD_SMOKE_ALLOW_DESTRUCTIVE === "true" ||
  process.env.PROD_SMOKE_ALLOW_DESTRUCTIVE === "1";

const KNOWN_HOST_SUFFIXES = [
  "railway.app",
  "up.railway.app",
  "slowarium.",
  "localhost",
  "127.0.0.1",
];

function hostIsKnown(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return KNOWN_HOST_SUFFIXES.some(
      (s) => host === s || host.endsWith(s) || host.includes(s.replace(/\.$/, "")),
    );
  } catch {
    return false;
  }
}

function assertDestructiveAllowed(): void {
  if (!allowDestructive) {
    throw new Error(
      "Refusing destructive production smoke: set PROD_SMOKE_ALLOW_DESTRUCTIVE=true",
    );
  }
  if (!hostIsKnown(baseURL)) {
    throw new Error(
      `Refusing destructive cleanup against unknown host: ${baseURL}. ` +
        "Add the hostname to the known list only after operator review.",
    );
  }
  if (!adminEmail || !adminPassword) {
    throw new Error("PROD_SMOKE_ADMIN_EMAIL / PROD_SMOKE_ADMIN_PASSWORD required");
  }
}

function apiHeaders(origin = baseURL) {
  return {
    "Content-Type": "application/json",
    Origin: origin,
    Referer: `${origin}/ru/login`,
  };
}

async function adminSignIn(request: APIRequestContext) {
  const res = await request.post("/api/auth/sign-in/email", {
    data: { email: adminEmail, password: adminPassword },
    headers: apiHeaders(),
  });
  expect(res.ok(), await res.text()).toBeTruthy();
}

test.describe("M5 production smoke", () => {
  test("health is liveness-only (no secrets / DB state leak)", async ({
    request,
  }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as Record<string, unknown>;
    expect(body.status).toBe("ok");
    expect(body.check).toBe("liveness");
    expect(body.database).toBe("not_checked");
    const text = JSON.stringify(body);
    expect(text).not.toMatch(/secret|password|postgres|DATABASE|stack/i);
    expect(text).not.toMatch(/\d+\.\d+\.\d+/); // no version dump
  });

  test("readiness requires Postgres", async ({ request }) => {
    const res = await request.get("/api/ready");
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as Record<string, unknown>;
    expect(body.status).toBe("ready");
    expect(body.database).toBe(true);
    expect(JSON.stringify(body)).not.toMatch(/password|secret|DATABASE_URL/i);
  });

  test("BASE_URL uses https (or loopback)", async () => {
    const u = new URL(baseURL);
    if (u.hostname !== "localhost" && u.hostname !== "127.0.0.1") {
      expect(u.protocol).toBe("https:");
    }
  });

  test("security headers present on HTML shell", async ({ request }) => {
    const res = await request.get("/ru/login");
    expect(res.ok()).toBeTruthy();
    const csp = res.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toContain("unsafe-eval");
    expect(res.headers()["x-content-type-options"]).toBe("nosniff");
    expect(res.headers()["x-frame-options"]).toBe("DENY");
  });

  test("unauthenticated learner APIs are denied", async ({ request }) => {
    const exportRes = await request.post("/api/privacy/export", {
      headers: apiHeaders(),
    });
    expect(exportRes.status()).toBe(401);

    const onboardRes = await request.post("/api/profile/onboarding", {
      data: {},
      headers: apiHeaders(),
    });
    expect(onboardRes.status()).toBe(401);
  });

  test("CSRF origin rejection on privacy export", async ({ request }) => {
    const res = await request.post("/api/privacy/export", {
      headers: {
        ...apiHeaders("https://evil.example"),
        Origin: "https://evil.example",
      },
    });
    expect(res.status()).toBe(403);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toBe("origin_rejected");
  });

  test("public DRAFT module route does not expose curriculum to guests", async ({
    page,
  }) => {
    await page.goto("/ru/learn/modules/pierwsze-spotkanie");
    // Guests should be redirected to login/invite — never see DRAFT lesson chrome.
    await expect(page).not.toHaveURL(/\/exercise\//);
    const body = await page.locator("body").innerText();
    expect(body.toLowerCase()).not.toContain("demo learner");
  });

  test("open registration stays closed in beta", async ({ request }) => {
    const res = await request.post("/api/auth/sign-up/email", {
      data: {
        email: `nosignup-${Date.now()}@example.com`,
        password: "NoSignupAllowed1!",
        name: "Blocked",
      },
      headers: apiHeaders(),
    });
    // Better Auth disableSignUp → 403/400-class; never 200.
    expect(res.ok()).toBeFalsy();
  });

  test("invite → register → onboarding path (operator fixtures)", async ({
    page,
    request,
  }) => {
    test.skip(
      !allowDestructive || !adminEmail || !adminPassword,
      "Operator fixtures not provided — non-destructive checks already ran",
    );
    assertDestructiveAllowed();

    await adminSignIn(request);
    const inviteRes = await request.post("/api/admin/beta/invites", {
      data: {
        expiresInDays: 1,
        label: `prod-smoke-${Date.now()}`,
      },
      headers: apiHeaders(),
    });
    expect(inviteRes.ok(), await inviteRes.text()).toBeTruthy();
    const invite = (await inviteRes.json()) as {
      token: string;
      inviteId: string;
    };
    expect(invite.token).toBeTruthy();

    await request.post("/api/auth/sign-out", {
      data: {},
      headers: apiHeaders(),
    });

    const email = `prod.smoke.${Date.now()}@slowarium.test`;
    const password = `ProdSmoke1!${Date.now().toString().slice(-4)}`;

    await page.goto(`/ru/invite/${invite.token}`);
    await expect(page.getByTestId("invite-accept-form")).toBeVisible({
      timeout: 30_000,
    });
    await page.getByTestId("invite-name").fill("Prod Smoke");
    await page.getByTestId("invite-email").fill(email);
    await page.getByTestId("invite-password").fill(password);
    await page.getByTestId("invite-submit").click();
    await expect(page).toHaveURL(/\/(onboarding|dashboard)/, {
      timeout: 60_000,
    });

    // Cleanup: delete account via privacy API after re-login
    const signIn = await request.post("/api/auth/sign-in/email", {
      data: { email, password },
      headers: apiHeaders(),
    });
    expect(signIn.ok()).toBeTruthy();
    const del = await request.post("/api/privacy/delete", {
      data: { confirm: "DELETE" },
      headers: apiHeaders(),
    });
    expect([200, 202].includes(del.status())).toBeTruthy();
  });
});
