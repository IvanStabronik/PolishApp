import { z } from "zod";

const truthy = z
  .string()
  .optional()
  .transform((v) => v === "true" || v === "1");

export const RuntimeEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(16),
  BETTER_AUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  INVITE_TOKEN_PEPPER: z.string().min(8).optional(),
  BETA_MODE: truthy.optional(),
  DEMO_MODE: truthy.optional(),
  DEMO_PREVIEW: truthy.optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  ALLOW_PRODUCTION_DEMO: truthy.optional(),
});

export type RuntimeEnv = z.infer<typeof RuntimeEnvSchema>;

let validated = false;

export function validateRuntimeEnv(
  env: NodeJS.ProcessEnv = process.env,
): RuntimeEnv {
  const parsed = RuntimeEnvSchema.safeParse({
    DATABASE_URL: env.DATABASE_URL,
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: env.BETTER_AUTH_URL,
    NEXT_PUBLIC_APP_URL: env.NEXT_PUBLIC_APP_URL,
    INVITE_TOKEN_PEPPER: env.INVITE_TOKEN_PEPPER,
    BETA_MODE: env.BETA_MODE,
    DEMO_MODE: env.DEMO_MODE,
    DEMO_PREVIEW: env.DEMO_PREVIEW,
    NODE_ENV: env.NODE_ENV,
    ALLOW_PRODUCTION_DEMO: env.ALLOW_PRODUCTION_DEMO,
  });
  if (!parsed.success) {
    const msg = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid runtime environment: ${msg}`);
  }

  if (
    parsed.data.NODE_ENV === "production" &&
    parsed.data.DEMO_MODE &&
    !parsed.data.ALLOW_PRODUCTION_DEMO
  ) {
    throw new Error(
      "DEMO_MODE cannot be enabled in production without ALLOW_PRODUCTION_DEMO=true",
    );
  }

  validated = true;
  return parsed.data;
}

export function assertEnvValidated(): void {
  if (!validated && process.env.SKIP_ENV_VALIDATION !== "true") {
    validateRuntimeEnv();
  }
}

export function getCorrelationId(request?: Request): string {
  const fromHeader = request?.headers.get("x-correlation-id");
  if (fromHeader && /^[a-zA-Z0-9_-]{8,128}$/.test(fromHeader)) return fromHeader;
  return crypto.randomUUID();
}

const SECRETISH = /password|secret|token|authorization|cookie|email/i;

export function structuredLog(
  level: "info" | "warn" | "error",
  message: string,
  fields: Record<string, unknown> = {},
): void {
  const safe: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (SECRETISH.test(k)) {
      safe[k] = "[redacted]";
    } else {
      safe[k] = v;
    }
  }
  const line = JSON.stringify({
    level,
    msg: message,
    ts: new Date().toISOString(),
    ...safe,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/** CSRF / origin check for mutating API routes. */
export function assertSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Non-browser clients (e2e/server) may omit Origin; require auth session separately.
    return true;
  }
  const allowed = new Set<string>();
  for (const key of ["BETTER_AUTH_URL", "NEXT_PUBLIC_APP_URL", "APP_URL"]) {
    const v = process.env[key];
    if (v) {
      try {
        allowed.add(new URL(v).origin);
      } catch {
        /* ignore */
      }
    }
  }
  allowed.add("http://localhost:3000");
  allowed.add("http://127.0.0.1:3000");
  allowed.add("http://localhost:3001");
  allowed.add("http://127.0.0.1:3001");
  try {
    return allowed.has(new URL(origin).origin);
  } catch {
    return false;
  }
}
