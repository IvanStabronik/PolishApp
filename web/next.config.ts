import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const webRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Keep tracing rooted at web/ even if a parent workspace lockfile exists.
  outputFileTracingRoot: webRoot,
  // File-based content lives outside web/ — allow reading at build/runtime.
  serverExternalPackages: ["yaml"],
};

export default withNextIntl(nextConfig);
