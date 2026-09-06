import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: [
      "src/**/*.test.ts",
      "tests/unit/**/*.test.ts",
      "tests/unit/**/*.test.tsx",
    ],
    exclude: [
      "node_modules",
      ".next",
      "e2e",
      "tests/e2e",
      "tests/integration/**",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
});
