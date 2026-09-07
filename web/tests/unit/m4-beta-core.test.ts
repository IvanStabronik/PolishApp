import { describe, expect, it } from "vitest";
import {
  canTransitionInvite,
  deriveInviteStatus,
  inspectInvite,
} from "@/modules/beta/invite-state";
import {
  generateInviteToken,
  hashInviteToken,
  inviteTokensEqual,
  redactTokenForLogs,
} from "@/modules/beta/token";
import { canAccessAdminArea } from "@/modules/admin/roles";
import { canAccessDraftContent } from "@/lib/demo";
import {
  canTransitionFeedback,
  sanitizeFeedbackContext,
  FeedbackCreateSchema,
} from "@/modules/feedback/validation";
import {
  ANALYTICS_METRICS,
  isKnownMetricKey,
  sanitizeAnalyticsDimensions,
} from "@/modules/analytics/metrics";
import { redactAdminDetails } from "@/modules/admin/audit";

describe("invite state machine", () => {
  it("derives pending / expired / revoked / accepted", () => {
    const now = new Date("2026-01-10T12:00:00Z");
    expect(
      deriveInviteStatus(
        {
          status: "pending",
          expiresAt: new Date("2026-01-20T12:00:00Z"),
          revokedAt: null,
          acceptedAt: null,
          useLimit: 1,
          useCount: 0,
        },
        now,
      ),
    ).toBe("pending");
    expect(
      deriveInviteStatus(
        {
          status: "pending",
          expiresAt: new Date("2026-01-01T12:00:00Z"),
          revokedAt: null,
          acceptedAt: null,
          useLimit: 1,
          useCount: 0,
        },
        now,
      ),
    ).toBe("expired");
    expect(
      inspectInvite({
        status: "revoked",
        expiresAt: new Date("2026-01-20T12:00:00Z"),
        revokedAt: now,
        acceptedAt: null,
        useLimit: 1,
        useCount: 0,
      }).ok,
    ).toBe(false);
    expect(canTransitionInvite("pending", "accepted")).toBe(true);
    expect(canTransitionInvite("accepted", "pending")).toBe(false);
  });
});

describe("token hashing", () => {
  it("hashes deterministically and never logs raw tokens", () => {
    process.env.INVITE_TOKEN_PEPPER = "unit-test-pepper-123456";
    const token = generateInviteToken();
    const a = hashInviteToken(token);
    const b = hashInviteToken(token);
    expect(a).toBe(b);
    expect(a).not.toBe(token);
    expect(inviteTokensEqual(a, b)).toBe(true);
    expect(redactTokenForLogs(token)).not.toContain(token);
  });
});

describe("roles", () => {
  it("admin-only for admin area", () => {
    expect(canAccessAdminArea(["admin"])).toBe(true);
    expect(canAccessAdminArea(["learner", "previewer"])).toBe(false);
    expect(canAccessAdminArea(["author", "reviewer"])).toBe(false);
  });

  it("closed-beta invitee roles authorize DRAFT when preview env is on", () => {
    expect(
      canAccessDraftContent({
        roles: ["learner", "previewer"],
        isPreviewEnv: true,
      }),
    ).toBe(true);
    expect(
      canAccessDraftContent({
        roles: ["learner"],
        isPreviewEnv: true,
      }),
    ).toBe(false);
  });
});

describe("feedback validation", () => {
  it("validates payload and strips unsafe context", () => {
    const ok = FeedbackCreateSchema.safeParse({
      category: "bug",
      idempotencyKey: "11111111-1111-4111-8111-111111111111",
      context: { route: "/ru/plan", answer: "secret" },
    });
    expect(ok.success).toBe(true);
    const sanitized = sanitizeFeedbackContext({
      route: "/ru/plan",
      moduleId: "x",
      answer: "nope",
    });
    expect(sanitized).toEqual({ route: "/ru/plan", moduleId: "x" });
    expect(canTransitionFeedback("new", "triaged")).toBe(true);
    expect(canTransitionFeedback("resolved", "new")).toBe(false);
  });
});

describe("analytics defs + redaction", () => {
  it("knows metric keys and redacts sensitive dims/details", () => {
    expect(isKnownMetricKey(ANALYTICS_METRICS.feedback_rate.key)).toBe(true);
    expect(isKnownMetricKey("not_a_metric")).toBe(false);
    expect(
      sanitizeAnalyticsDimensions({ email: "a@b.c", moduleId: "m1" }),
    ).toEqual({ moduleId: "m1" });
    expect(redactAdminDetails({ token: "abc", label: "x" })).toEqual({
      token: "[redacted]",
      label: "x",
    });
  });
});

describe("analytics dimensions canonicalize", () => {
  it("produces stable keys regardless of key insertion order", async () => {
    const { analyticsDimensionsKey, canonicalizeAnalyticsDimensions } =
      await import("@/modules/analytics/dimensions");
    const a = canonicalizeAnalyticsDimensions({ b: 1, a: 2 });
    const b = canonicalizeAnalyticsDimensions({ a: 2, b: 1 });
    expect(a).toEqual(b);
    expect(analyticsDimensionsKey({ z: true, a: "x" })).toBe(
      analyticsDimensionsKey({ a: "x", z: true }),
    );
  });
});

describe("beta access active", () => {
  it("revoked invitee is inactive; admin/demo stay active", async () => {
    const { resolveBetaAccessActive } = await import(
      "@/modules/auth/beta-access"
    );
    expect(
      resolveBetaAccessActive({
        roles: ["learner"],
        email: "invitee@example.com",
        betaAccessRevokedAt: new Date(),
      }),
    ).toBe(false);
    expect(
      resolveBetaAccessActive({
        roles: ["learner"],
        email: "invitee@example.com",
        betaAccessRevokedAt: null,
      }),
    ).toBe(true);
    expect(
      resolveBetaAccessActive({
        roles: ["admin"],
        email: "x@y.z",
        betaAccessRevokedAt: new Date(),
      }),
    ).toBe(true);
  });
});
