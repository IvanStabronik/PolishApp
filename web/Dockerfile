# syntax=docker/dockerfile:1

# Production image for SŁOWARIUM web (Next.js standalone).
# Build from repository root:
#   docker build -f web/Dockerfile -t slowarium:local .
# Runtime requires DATABASE_URL + BETTER_AUTH_SECRET (validated at start).
# Cloud provisioning credentials are EXTERNAL — this package is deployable without them.

FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY web/ ./
COPY content/ /content/
ENV DOCKER_BUILD=1
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time placeholders (overridden at runtime)
ENV BETTER_AUTH_SECRET=build-time-placeholder-not-for-runtime
ENV DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build
RUN pnpm build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/src/db/migrations ./src/db/migrations
COPY --from=builder /content /content
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
