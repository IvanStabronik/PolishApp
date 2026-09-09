/**
 * Generate a cryptographically strong BETTER_AUTH_SECRET / INVITE_TOKEN_PEPPER.
 * Usage: `pnpm ops:generate-secret`
 * Never commit the output.
 */
import { randomBytes } from "node:crypto";

const secret = randomBytes(48).toString("base64url");
process.stdout.write(`${secret}\n`);
