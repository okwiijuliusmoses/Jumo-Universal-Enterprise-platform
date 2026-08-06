# JUMO UEOS Enterprise Production Dockerfile
# Multi-stage build process for optimum build times and minimal image size

# Stage 1: Build static assets and server bundles
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency configs
COPY package*.json ./

# Install development & production packages
RUN npm ci

# Copy full application codebase
COPY . .

# Run production build (compiles Vite client & esbuild Node.js server)
RUN npm run build

# Stage 2: Minimal runtime image
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built artifacts from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/assets ./assets
COPY --from=builder /usr/src/app/experience ./experience

# Install only production dependencies for safety
RUN npm ci --only=production

# Expose canonical internal port
EXPOSE 3000

# Docker health check utilizing native node fetch API
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Boot JUMO UEOS server kernel
CMD ["npm", "start"]
