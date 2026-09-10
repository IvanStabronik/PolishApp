/**
 * Listening play proof — mint/verify HMAC for attempt gate.
 */
import { describe, expect, it } from "vitest";
import {
  mintListeningPlayToken,
  verifyListeningPlayToken,
} from "@/modules/learning/listening-play-proof";

describe("listening play proof", () => {
  const base = {
    userId: "user-1",
    moduleId: "pierwsze-spotkanie",
    exerciseId: "ex-ps-listen-01",
  };

  it("accepts a freshly minted played token", () => {
    const token = mintListeningPlayToken({ ...base, kind: "played" });
    const result = verifyListeningPlayToken({ ...base, token });
    expect(result).toEqual({ ok: true, kind: "played" });
  });

  it("accepts tts_unavailable unlock token", () => {
    const token = mintListeningPlayToken({
      ...base,
      kind: "tts_unavailable",
    });
    const result = verifyListeningPlayToken({ ...base, token });
    expect(result).toEqual({ ok: true, kind: "tts_unavailable" });
  });

  it("rejects missing token", () => {
    expect(verifyListeningPlayToken({ ...base, token: null })).toEqual({
      ok: false,
      reason: "missing_play_proof",
    });
  });

  it("rejects wrong user/exercise", () => {
    const token = mintListeningPlayToken({ ...base, kind: "played" });
    expect(
      verifyListeningPlayToken({
        ...base,
        userId: "other",
        token,
      }).ok,
    ).toBe(false);
    expect(
      verifyListeningPlayToken({
        ...base,
        exerciseId: "ex-other",
        token,
      }).ok,
    ).toBe(false);
  });

  it("rejects expired token", () => {
    const now = 1_700_000_000_000;
    const token = mintListeningPlayToken({
      ...base,
      kind: "played",
      nowMs: now,
    });
    const result = verifyListeningPlayToken({
      ...base,
      token,
      nowMs: now + 16 * 60 * 1000,
    });
    expect(result).toEqual({ ok: false, reason: "play_proof_expired" });
  });

  it("rejects tampered signature", () => {
    const token = mintListeningPlayToken({ ...base, kind: "played" });
    const tampered = `${token.slice(0, -4)}xxxx`;
    expect(verifyListeningPlayToken({ ...base, token: tampered }).ok).toBe(
      false,
    );
  });
});
