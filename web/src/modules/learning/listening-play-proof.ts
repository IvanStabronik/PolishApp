/**
 * Server-side listening play evidence.
 * Client play-gate alone is PARTIAL — attempts must carry a short-lived HMAC
 * proof minted when stimulus is issued, or an explicit TTS-unavailable unlock.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export type ListeningPlayKind = "played" | "tts_unavailable";

const PROOF_TTL_MS = 15 * 60 * 1000;
const PROOF_VERSION = "v1";

function proofSecret(): string {
  return (
    process.env.BETTER_AUTH_SECRET ||
    process.env.INVITE_TOKEN_PEPPER ||
    "dev-only-listening-play-proof"
  );
}

function signPayload(payload: string): string {
  return createHmac("sha256", proofSecret())
    .update(payload, "utf8")
    .digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/**
 * Mint a bearer token: v1.userId.moduleId.exerciseId.kind.issuedAt.sig
 * Opaque to the client; only the server verifies.
 */
export function mintListeningPlayToken(input: {
  userId: string;
  moduleId: string;
  exerciseId: string;
  kind: ListeningPlayKind;
  nowMs?: number;
}): string {
  const issuedAt = String(input.nowMs ?? Date.now());
  const body = [
    PROOF_VERSION,
    input.userId,
    input.moduleId,
    input.exerciseId,
    input.kind,
    issuedAt,
  ].join(".");
  const sig = signPayload(body);
  return `${body}.${sig}`;
}

export type ListeningPlayVerifyResult =
  | { ok: true; kind: ListeningPlayKind }
  | { ok: false; reason: string };

export function verifyListeningPlayToken(input: {
  token: string | null | undefined;
  userId: string;
  moduleId: string;
  exerciseId: string;
  nowMs?: number;
}): ListeningPlayVerifyResult {
  const raw = input.token?.trim();
  if (!raw) {
    return { ok: false, reason: "missing_play_proof" };
  }

  const parts = raw.split(".");
  if (parts.length !== 7) {
    return { ok: false, reason: "invalid_play_proof" };
  }

  const [version, userId, moduleId, exerciseId, kind, issuedAt, sig] = parts;
  if (version !== PROOF_VERSION || !sig || !issuedAt || !kind) {
    return { ok: false, reason: "invalid_play_proof" };
  }
  if (kind !== "played" && kind !== "tts_unavailable") {
    return { ok: false, reason: "invalid_play_proof" };
  }
  if (
    userId !== input.userId ||
    moduleId !== input.moduleId ||
    exerciseId !== input.exerciseId
  ) {
    return { ok: false, reason: "play_proof_mismatch" };
  }

  const body = parts.slice(0, 6).join(".");
  const expected = signPayload(body);
  if (!safeEqual(sig, expected)) {
    return { ok: false, reason: "invalid_play_proof" };
  }

  const issued = Number(issuedAt);
  if (!Number.isFinite(issued)) {
    return { ok: false, reason: "invalid_play_proof" };
  }
  const now = input.nowMs ?? Date.now();
  if (now - issued > PROOF_TTL_MS || issued > now + 60_000) {
    return { ok: false, reason: "play_proof_expired" };
  }

  return { ok: true, kind };
}

/** Documented unlock when browser TTS / audio cannot play. */
export const LISTENING_TTS_UNLOCK_DOC =
  "If speechSynthesis and studio audioUrl are both unavailable, POST /api/learning/listening-play-unlock with reason tts_unavailable. Server mints a short-lived unlock token; attempt must still send listeningPlayToken. This unlock is honest interim — not a skip-for-convenience path.";
