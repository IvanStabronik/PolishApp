import { describe, expect, it } from "vitest";
import { generateInviteToken, hashInviteToken } from "@/modules/beta/token";

describe("closed-beta operator kit helpers", () => {
  it("builds a stable invite path shape for copy/paste URLs", () => {
    const token = generateInviteToken();
    const locale = "ru";
    const path = `/${locale}/invite/${token}`;
    expect(path).toMatch(/^\/ru\/invite\/[A-Za-z0-9_-]+$/);
    expect(hashInviteToken(token)).toHaveLength(64);
  });
});
