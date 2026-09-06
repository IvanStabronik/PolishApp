/**
 * Privacy audit subject HMAC — stability, env separation, no source id leak.
 */

import { afterEach, describe, expect, it } from "vitest";
import {
  privacyAuditSubjectId,
  privacyAuditIdsEqual,
} from "@/modules/privacy/audit-id";

const ORIGINAL_PRIVACY = process.env.PRIVACY_AUDIT_SECRET;
const ORIGINAL_AUTH = process.env.BETTER_AUTH_SECRET;

afterEach(() => {
  if (ORIGINAL_PRIVACY === undefined) delete process.env.PRIVACY_AUDIT_SECRET;
  else process.env.PRIVACY_AUDIT_SECRET = ORIGINAL_PRIVACY;
  if (ORIGINAL_AUTH === undefined) delete process.env.BETTER_AUTH_SECRET;
  else process.env.BETTER_AUTH_SECRET = ORIGINAL_AUTH;
});

describe("privacyAuditSubjectId", () => {
  it("is stable for the same userId + secret", () => {
    process.env.PRIVACY_AUDIT_SECRET = "unit-test-privacy-secret-aaaa";
    const a = privacyAuditSubjectId("user-abc");
    const b = privacyAuditSubjectId("user-abc");
    expect(a).toBe(b);
    expect(a.startsWith("v1:")).toBe(true);
    expect(a.length).toBeGreaterThan(10);
  });

  it("differs across environments (secrets)", () => {
    process.env.PRIVACY_AUDIT_SECRET = "unit-test-privacy-secret-aaaa";
    const a = privacyAuditSubjectId("user-abc");
    process.env.PRIVACY_AUDIT_SECRET = "unit-test-privacy-secret-bbbb";
    const b = privacyAuditSubjectId("user-abc");
    expect(a).not.toBe(b);
  });

  it("never embeds the source user id or email in clear", () => {
    process.env.PRIVACY_AUDIT_SECRET = "unit-test-privacy-secret-cccc";
    const userId = "usr_cleartext_should_not_appear_xyz";
    const email = "deleted.user@example.com";
    const id = privacyAuditSubjectId(userId);
    expect(id).not.toContain(userId);
    expect(id).not.toContain("usr_cleartext");
    expect(id).not.toContain(email);
    expect(id).not.toMatch(/@/);
  });

  it("compares equal ids safely", () => {
    process.env.PRIVACY_AUDIT_SECRET = "unit-test-privacy-secret-dddd";
    const id = privacyAuditSubjectId("u1");
    expect(privacyAuditIdsEqual(id, id)).toBe(true);
    expect(privacyAuditIdsEqual(id, "v1:deadbeef")).toBe(false);
  });
});
