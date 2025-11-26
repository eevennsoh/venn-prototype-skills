FROM node:18-alpine AS builder

WORKDIR /build

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY postcss.config.mjs ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm ci

COPY app ./app
COPY public ./public
COPY scripts ./scripts

# Build Next.js in export mode to generate static HTML
# The build script temporarily moves API routes during export
# Install bash for the script (Alpine uses sh by default)
RUN apk add --no-cache bash && \
    chmod +x scripts/build-export.sh && \
    npm run build:export

FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/server.js ./
COPY rovo ./rovo

# Copy the Next.js export output (static HTML files)
# The 'out' directory contains the exported static site
COPY --from=builder /build/out ./public

EXPOSE 8080

CMD ["node", "server.js"]
