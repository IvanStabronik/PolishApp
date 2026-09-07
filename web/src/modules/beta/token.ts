import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const TOKEN_BYTES = 32;

export function getInviteTokenPepper(): string {
  return (
    process.env.INVITE_TOKEN_PEPPER ||
    process.env.BETTER_AUTH_SECRET ||
    "dev-only-invite-pepper"
  );
}

/** Generate a URL-safe invite token (plaintext shown once). */
export function generateInviteToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

/** Store only HMAC-SHA256 of the raw token. */
export function hashInviteToken(
  rawToken: string,
  pepper = getInviteTokenPepper(),
): string {
  return createHmac("sha256", pepper).update(rawToken, "utf8").digest("hex");
}

export function inviteTokensEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function redactTokenForLogs(rawToken: string | null | undefined): string {
  if (!rawToken) return "[empty]";
  if (rawToken.length <= 8) return "[redacted]";
  return `${rawToken.slice(0, 4)}…${rawToken.slice(-2)}`;
}
