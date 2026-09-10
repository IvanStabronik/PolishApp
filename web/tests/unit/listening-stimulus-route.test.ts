/**
 * Listening stimulus API — same-origin, auth, rate-limit, audioUrl-without-textPl.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  assertSameOrigin: vi.fn(),
  getCorrelationId: vi.fn(() => "corr-test"),
  getRequestSession: vi.fn(),
  assertBetaAccessActive: vi.fn(() => null),
  consumeRateLimit: vi.fn(async () => ({
    allowed: true,
    retryAfterMs: 0,
  })),
  clientIpFromRequest: vi.fn(() => "127.0.0.1"),
  getExercise: vi.fn(),
  isDraftLearningEnvEnabled: vi.fn(() => true),
}));

vi.mock("@/modules/ops/runtime", () => ({
  assertSameOrigin: mocks.assertSameOrigin,
  getCorrelationId: mocks.getCorrelationId,
}));

vi.mock("@/modules/auth/session", () => ({
  getRequestSession: mocks.getRequestSession,
}));

vi.mock("@/modules/auth/beta-access", () => ({
  assertBetaAccessActive: mocks.assertBetaAccessActive,
}));

vi.mock("@/modules/ops/rate-limit", () => ({
  consumeRateLimit: mocks.consumeRateLimit,
  clientIpFromRequest: mocks.clientIpFromRequest,
}));

vi.mock("@/lib/content/load-module", () => ({
  getExercise: mocks.getExercise,
}));

vi.mock("@/lib/demo", () => ({
  isDraftLearningEnvEnabled: mocks.isDraftLearningEnvEnabled,
}));

import { POST } from "@/app/api/learning/listening-stimulus/route";

function makeReq(init?: {
  origin?: string;
  body?: unknown;
}): Request {
  return new Request("http://127.0.0.1:3000/api/learning/listening-stimulus", {
    method: "POST",
    headers: {
      Origin: init?.origin ?? "http://127.0.0.1:3000",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(init?.body ?? { moduleId: "w-kawiarni", exerciseId: "ex-wk-listen-01" }),
  });
}

describe("listening-stimulus POST", () => {
  beforeEach(() => {
    mocks.assertSameOrigin.mockReset().mockReturnValue(true);
    mocks.getCorrelationId.mockReset().mockReturnValue("corr-test");
    mocks.getRequestSession.mockReset().mockResolvedValue({
      user: { id: "user-1", email: "learner@example.com" },
      roles: ["learner"],
      betaAccessActive: true,
    });
    mocks.assertBetaAccessActive.mockReset().mockReturnValue(null);
    mocks.consumeRateLimit.mockReset().mockResolvedValue({
      allowed: true,
      retryAfterMs: 0,
    });
    mocks.clientIpFromRequest.mockReset().mockReturnValue("127.0.0.1");
    mocks.getExercise.mockReset().mockReturnValue({
      type: "listening",
      audioTextPl: "Dużą czy małą?",
      audioUrl: undefined,
    });
    mocks.isDraftLearningEnvEnabled.mockReset().mockReturnValue(true);
  });

  it("rejects cross-origin (403 origin_rejected)", async () => {
    mocks.assertSameOrigin.mockReturnValue(false);
    const res = await POST(makeReq({ origin: "https://evil.example" }));
    expect(res.status).toBe(403);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toBe("origin_rejected");
    expect(mocks.getRequestSession).not.toHaveBeenCalled();
  });

  it("rejects unauthenticated (401 unauthorized)", async () => {
    mocks.getRequestSession.mockResolvedValue(null);
    const res = await POST(makeReq());
    expect(res.status).toBe(401);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toBe("unauthorized");
  });

  it("rate-limits (429)", async () => {
    mocks.consumeRateLimit.mockResolvedValue({
      allowed: false,
      retryAfterMs: 12_000,
    });
    const res = await POST(makeReq());
    expect(res.status).toBe(429);
    const body = (await res.json()) as { error?: string };
    expect(body.error).toBe("rate_limited");
    expect(res.headers.get("Retry-After")).toBe("12");
  });

  it("returns audioUrl alone without textPl when studio URL present", async () => {
    mocks.getExercise.mockReturnValue({
      type: "listening",
      audioTextPl: "Dużą czy małą?",
      audioUrl: "https://cdn.example.com/listen/studio-01.mp3",
    });
    const res = await POST(makeReq());
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      audioUrl?: string;
      textPl?: string;
      playToken?: string;
    };
    expect(body.audioUrl).toBe("https://cdn.example.com/listen/studio-01.mp3");
    expect(body.textPl).toBeUndefined();
    expect(body.playToken).toMatch(/^v1\./);
  });

  it("returns textPl for TTS interim when no audioUrl", async () => {
    const res = await POST(makeReq());
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      audioUrl?: string;
      textPl?: string;
      playToken?: string;
    };
    expect(body.textPl).toBe("Dużą czy małą?");
    expect(body.audioUrl).toBeUndefined();
    expect(body.playToken).toMatch(/^v1\./);
  });
});
