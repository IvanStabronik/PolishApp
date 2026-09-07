/**
 * Next.js instrumentation — runs once when the Node server starts.
 * Validates production env before serving traffic.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "edge") return;
  if (process.env.SKIP_ENV_VALIDATION === "true") return;
  // `next build` sets NODE_ENV=production but must not fail on CI demo flags.
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { validateRuntimeEnv, structuredLog } = await import(
    "@/modules/ops/runtime"
  );
  try {
    validateRuntimeEnv();
    structuredLog("info", "runtime_env_validated", {
      nodeEnv: process.env.NODE_ENV ?? "undefined",
      betaMode: process.env.BETA_MODE ?? "unset",
      demoMode: process.env.DEMO_MODE ?? "unset",
    });
  } catch (err) {
    structuredLog("error", "runtime_env_validation_failed", {
      error: err instanceof Error ? err.message : "unknown",
    });
    // Fail closed in production so misconfigured deploys do not serve traffic.
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
  }
}
