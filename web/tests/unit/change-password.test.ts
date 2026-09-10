import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  assertSameOrigin: vi.fn(),
  getCorrelationId: vi.fn(() => "corr-pw"),
  getRequestSession: vi.fn(),
  consumeRateLimit: vi.fn(async () => ({ allowed: true, retryAfterMs: 0 })),
  clientIpFromRequest: vi.fn(() => "127.0.0.1"),
  changeOwnPassword: vi.fn(),
  getSession: vi.fn(),
}));

vi.mock("@/modules/ops/runtime", () => ({
  assertSameOrigin: mocks.assertSameOrigin,
  getCorrelationId: mocks.getCorrelationId,
  publicErrorBody: (code: string, correlationId: string) => ({
    error: code,
    correlationId,
  }),
}));

vi.mock("@/modules/auth/session", () => ({
  getRequestSession: mocks.getRequestSession,
}));

vi.mock("@/modules/ops/rate-limit", () => ({
  consumeRateLimit: mocks.consumeRateLimit,
  clientIpFromRequest: mocks.clientIpFromRequest,
}));

vi.mock("@/modules/auth/change-password", () => ({
  changeOwnPassword: mocks.changeOwnPassword,
}));

vi.mock("@/modules/auth/auth", () => ({
  auth: {
    api: {
      getSession: mocks.getSession,
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers()),
}));

describe("POST /api/profile/password", () => {
  beforeEach(() => {
    mocks.assertSameOrigin.mockReset().mockReturnValue(true);
    mocks.getRequestSession.mockReset().mockResolvedValue({
      user: { id: "u1", email: "a@b.c", name: "A" },
      roles: ["learner"],
      canPreviewDraft: false,
      isDemoUser: false,
      betaAccessActive: true,
    });
    mocks.consumeRateLimit.mockReset().mockResolvedValue({
      allowed: true,
      retryAfterMs: 0,
    });
    mocks.changeOwnPassword.mockReset().mockResolvedValue({ ok: true });
    mocks.getSession.mockReset().mockResolvedValue({
      session: { token: "tok-1" },
    });
  });

  it("rejects cross-origin", async () => {
    mocks.assertSameOrigin.mockReturnValue(false);
    const { POST } = await import("@/app/api/profile/password/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: "OldPass123!",
          newPassword: "NewPass123!",
        }),
      }),
    );
    expect(res.status).toBe(403);
  });

  it("rejects unauthenticated", async () => {
    mocks.getRequestSession.mockResolvedValue(null);
    const { POST } = await import("@/app/api/profile/password/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: "OldPass123!",
          newPassword: "NewPass123!",
        }),
      }),
    );
    expect(res.status).toBe(401);
  });

  it("maps invalid_current to 400", async () => {
    mocks.changeOwnPassword.mockResolvedValue({
      ok: false,
      reason: "invalid_current",
    });
    const { POST } = await import("@/app/api/profile/password/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: "WrongPass1!",
          newPassword: "NewPass123!",
        }),
      }),
    );
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toMatchObject({ error: "invalid_current" });
  });

  it("changes password when valid", async () => {
    const { POST } = await import("@/app/api/profile/password/route");
    const res = await POST(
      new Request("http://127.0.0.1:3000/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: "OldPass123!",
          newPassword: "NewPass123!",
        }),
      }),
    );
    expect(res.status).toBe(200);
    expect(mocks.changeOwnPassword).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "u1",
        currentSessionToken: "tok-1",
      }),
    );
  });
});
