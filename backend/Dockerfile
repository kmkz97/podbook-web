# Multi-stage Dockerfile for Podbook Backend
FROM node:18-alpine AS base

# Install dependencies for native modules and OpenSSL
RUN apk add --no-cache python3 make g++ openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Development stage
FROM base AS development

ENV PRISMA_QUERY_ENGINE_LIBRARY="/app/node_modules/.prisma/client/libquery_engine-linux-musl-arm64-openssl-1.1.x.so.node" \
    LD_LIBRARY_PATH="/app/node_modules/.prisma/client:$LD_LIBRARY_PATH"

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS build

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init openssl

ENV PRISMA_QUERY_ENGINE_LIBRARY="/app/node_modules/.prisma/client/libquery_engine-linux-musl-arm64-openssl-1.1.x.so.node" \
    LD_LIBRARY_PATH="/app/node_modules/.prisma/client:$LD_LIBRARY_PATH"

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Create uploads directory
RUN mkdir -p uploads

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]
