import { createAuthClient } from "better-auth/react";

/**
 * Prefer the browser's current origin so login works through a free HTTPS
 * tunnel (cloudflared / ngrok) without baking localhost into the client bundle.
 * Server/SSR falls back to env (local closed-beta or production BASE_URL).
 */
function resolveAuthClientBaseURL(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.BETTER_AUTH_URL ??
    "http://localhost:3000"
  );
}

export const authClient = createAuthClient({
  baseURL: resolveAuthClientBaseURL(),
});

export const { signIn, signUp, signOut, useSession } = authClient;
