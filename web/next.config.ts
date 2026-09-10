import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const webRoot = path.dirname(fileURLToPath(import.meta.url));
/** Monorepo root (sibling of `web/`) — needed so Vercel/NFT can ship `content/`. */
const repoRoot = path.resolve(webRoot, "..");

const isProd = process.env.NODE_ENV === "production";

/**
 * CSP note: Next.js App Router still requires 'unsafe-inline' for styles in
 * many layouts. We keep script-src without 'unsafe-eval' in production builds;
 * turbopack/dev may still need eval locally (non-production NODE_ENV).
 */
const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline'"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const securityHeaders: { key: string; value: string }[] = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

if (isProd) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  // Trace from monorepo root so sibling `content/` (YAML lessons) ships on Vercel.
  // Docker builds still COPY content/ separately (see web/Dockerfile).
  // Includes use ../content from web/ (Next project root); /** covers App Router locales.
  // Also ship root package.json so findRepoRoot can locate the monorepo without docs/.
  outputFileTracingRoot: repoRoot,
  outputFileTracingIncludes: {
    "/**": [
      "../content/**/*",
      "./content/**/*",
      "../package.json",
      "../vercel.json",
    ],
    "/*": [
      "../content/**/*",
      "./content/**/*",
      "../package.json",
      "../vercel.json",
    ],
    "/api/**/*": [
      "../content/**/*",
      "./content/**/*",
      "../package.json",
      "../vercel.json",
    ],
  },
  // File-based content lives outside web/ — allow reading at build/runtime.
  serverExternalPackages: ["yaml"],
  output: process.env.DOCKER_BUILD === "1" ? "standalone" : undefined,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
