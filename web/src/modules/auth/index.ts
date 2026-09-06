"use server";

import type { AuthCredentials } from "../types";
import { auth } from "./auth";

/**
 * Auth domain API — Better Auth email/password (ADR-003).
 * Sync helpers (auth client, DEMO_ACCOUNTS) import from ./auth or ./demo — not this barrel.
 */
export async function registerLearner(input: AuthCredentials) {
  if (!input.email || !input.password) {
    return { ok: false as const, error: "missing_fields" };
  }
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email: input.email,
        password: input.password,
        name: input.email.split("@")[0] ?? "Learner",
      },
    });
    return { ok: true as const, userId: result.user.id };
  } catch {
    return { ok: false as const, error: "register_failed" };
  }
}

export async function signInLearner(input: AuthCredentials) {
  if (!input.email || !input.password) {
    return { ok: false as const, error: "missing_fields" };
  }
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
      },
    });
    return { ok: true as const, userId: result.user.id };
  } catch {
    return { ok: false as const, error: "sign_in_failed" };
  }
}
