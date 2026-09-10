/**
 * CLI: create/update the first closed-beta admin against DATABASE_URL.
 * Never sets DEMO_MODE. Refuses if DEMO_MODE or ALLOW_PRODUCTION_DEMO is on.
 *
 * Usage (from web/):
 *   pnpm db:bootstrap-admin -- --email you@example.com --password '…' [--name '…']
 */
import { loadEnvFiles } from "../src/db/load-env";
import {
  assertFirstAdminBootstrapAllowed,
  upsertFirstAdmin,
} from "../src/db/bootstrap-first-admin";
import { getSql } from "../src/db/client";

loadEnvFiles();

function usage(): never {
  console.error(`Usage:
  pnpm db:bootstrap-admin -- --email <email> --password <password> [--name <display name>]

Requires DATABASE_URL (prefer Neon DIRECT). Refuses DEMO_MODE=true / ALLOW_PRODUCTION_DEMO=true.
Never sets DEMO_MODE. Never invents credentials.`);
  process.exit(2);
}

function parseArgs(argv: string[]): {
  email: string;
  password: string;
  name?: string;
} {
  let email = "";
  let password = "";
  let name: string | undefined;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--email" && next) {
      email = next;
      i++;
    } else if (a === "--password" && next) {
      password = next;
      i++;
    } else if (a === "--name" && next) {
      name = next;
      i++;
    } else if (a === "--help" || a === "-h") {
      usage();
    } else if (a.startsWith("-")) {
      console.error(`Unknown arg: ${a}`);
      usage();
    }
  }
  if (!email || !password) usage();
  return { email, password, name };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  // Explicitly keep demo theater off for this process (do not write env files).
  if (process.env.DEMO_MODE === "true" || process.env.DEMO_MODE === "1") {
    // assert below will throw with the same message; fail closed early
  } else {
    process.env.DEMO_MODE = "false";
  }

  assertFirstAdminBootstrapAllowed(process.env);

  const result = await upsertFirstAdmin(args);
  console.log(
    result.created
      ? `Created first admin: ${result.email} (roles: admin, learner, previewer)`
      : `Updated first admin: ${result.email} (roles + password refreshed)`,
  );
  console.log(
    "DEMO_MODE was not enabled. Sign in on live HTTPS → /{locale}/admin/beta → invite-first.",
  );
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await getSql().end({ timeout: 5 });
    } catch {
      /* ignore */
    }
  });
