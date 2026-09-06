import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

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
