#!/bin/bash

# 📦 WORKFLOW PHASE: Production Build (Static Export)
# ─────────────────────────────────────────────────────
# Purpose: Build Next.js as static export for production deployment
# When to use: Before deploying to Micros or building Docker image
# Called by: deploy.sh or manually before docker build
# 
# What it does:
#   1. Backs up API routes (they're dev-only in app/api)
#   2. Builds Next.js in static export mode
#   3. Restores API routes for continued local development
#   4. Outputs static files to ./out for Express to serve

# Build Export Script
# This script builds Next.js in static export mode for production deployment
# It temporarily moves API routes since they're not compatible with static export

set -e  # Exit on any error

echo "======================================"
echo "Building Static Export for Production"
echo "======================================"
echo ""

# Backup API routes directory (they're dev-only)
# Move them OUTSIDE the app directory so Next.js doesn't see them
echo "📦 Backing up API routes (dev-only)..."
if [ -d "app/api" ]; then
    mv app/api .api-routes-backup
    echo "   ✓ Moved app/api → .api-routes-backup"
fi

# Set BUILD_MODE to trigger static export
export BUILD_MODE=export

echo ""
echo "🔨 Building Next.js in static export mode..."
echo "   BUILD_MODE=${BUILD_MODE}"
echo ""

# Clean previous build
if [ -d "out" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf out
fi

# Build the Next.js app
npm run build

# Restore API routes
echo ""
echo "🔄 Restoring API routes..."
if [ -d ".api-routes-backup" ]; then
    mv .api-routes-backup app/api
    echo "   ✓ Restored app/api"
fi

echo ""
echo "✅ Build complete!"
echo ""
echo "📁 Static files exported to: ./out"
echo "   These will be copied to /app/public in the Docker container"
echo ""
echo "ℹ️  API routes restored to app/api (for local development)"
echo ""
echo "🐳 Next step: Build Docker image"
echo "   Run: docker build -f backend/Dockerfile -t your-image-name ."
echo ""
echo "======================================"
