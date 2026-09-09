import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { loadEnvFiles } from "./src/db/load-env";

const root = path.dirname(fileURLToPath(import.meta.url));

// Local runs: pick up web/.env.local so DATABASE_URL is present (CI sets it explicitly).
loadEnvFiles(root);

/** Run after migrate+seed: `pnpm test:integration` */
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/integration/**/*.test.ts"],
    exclude: ["node_modules", ".next"],
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
});
