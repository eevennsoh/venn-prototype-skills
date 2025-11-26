#!/bin/bash

# 🚀 WORKFLOW PHASE: Production Deployment
# ──────────────────────────────────────────
# Purpose: One-command deployment to Atlassian Micros
# When to use: After SETUP_GUIDE.md and ready to go live
# Usage: ./scripts/deploy.sh <service-name> <version>
# Example: ./scripts/deploy.sh my-prototype 1.0.1
#
# What it does:
#   1. Validates service name matches service-descriptor.yml
#   2. Builds Docker image
#   3. Pushes to docker.atl-paas.net registry
#   4. Deploys to Micros pdev-west2 environment
#
# ⚠️  BEFORE RUNNING: Update service-descriptor.yml with your service name
#
# For detailed steps and troubleshooting, see: DEPLOYMENT_GUIDE.md

# Deploy script for non-technical users

echo "🚀 Prototype Deployment Helper"
echo ""

# Check if service name provided
if [ -z "$1" ]; then
  echo "❌ Please provide a service name"
  echo "Usage: ./scripts/deploy.sh <service-name> <version>"
  echo "Example: ./scripts/deploy.sh my-prototype 1.0.1"
  echo ""
  echo "⚠️  Service name must be ≤26 characters"
  exit 1
fi

SERVICE_NAME=$1
VERSION=${2:-1.0.1}
ENV=${3:-pdev-west2}

# Validate service name length
if [ ${#SERVICE_NAME} -gt 26 ]; then
  echo "❌ Service name too long (${#SERVICE_NAME} chars). Maximum is 26."
  exit 1
fi

echo "Service: $SERVICE_NAME"
echo "Version: $VERSION"
echo "Environment: $ENV"
echo ""

# Check if service descriptor has been updated from kg-prototyping (for forked repos)
if grep -q "docker.atl-paas.net/kg-prototyping" service-descriptor.yml && [ "$SERVICE_NAME" != "kg-prototyping" ]; then
  echo "❌ ERROR: You're trying to deploy '$SERVICE_NAME' but service-descriptor.yml still references 'kg-prototyping'"
  echo ""
  echo "If you forked this repo, you must update service-descriptor.yml before deploying:"
  echo "  1. Replace 'kg-prototyping' with '$SERVICE_NAME'"
  echo "  2. Update notification email (line 7)"
  echo ""
  echo "Update these lines in service-descriptor.yml:"
  echo "  Line 11: image: docker.atl-paas.net/$SERVICE_NAME"
  echo "  Line 16: AI_GATEWAY_URL: ((ssm:/$SERVICE_NAME/AI_GATEWAY_URL))"
  echo "  Line 17: AI_GATEWAY_USE_CASE_ID: ((ssm:/$SERVICE_NAME/AI_GATEWAY_USE_CASE_ID))"
  echo "  Line 18: AI_GATEWAY_CLOUD_ID: ((ssm:/$SERVICE_NAME/AI_GATEWAY_CLOUD_ID))"
  echo "  Line 19: AI_GATEWAY_USER_ID: ((ssm:/$SERVICE_NAME/AI_GATEWAY_USER_ID))"
  echo "  Line 20: ASAP_PRIVATE_KEY: ((ssm:/$SERVICE_NAME/ASAP_PRIVATE_KEY))"
  echo ""
  exit 1
fi

# Check if service exists
if atlas micros service show --service=$SERVICE_NAME --env=$ENV 2>/dev/null; then
  echo "✅ Service exists - will update existing deployment"
  NEW_SERVICE=false
else
  echo "🆕 Service does not exist - will create new service"
  NEW_SERVICE=true
fi

# Build Docker image
echo ""
echo "📦 Building Docker image..."
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/${SERVICE_NAME}:app-${VERSION} \
  -f backend/Dockerfile . --load

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Contact repo maintainer."
  exit 1
fi

# Push image
echo ""
echo "📤 Pushing Docker image..."
docker push docker.atl-paas.net/${SERVICE_NAME}:app-${VERSION}

# Deploy
echo ""
echo "🚀 Deploying..."
export VERSION=$VERSION
atlas micros service deploy \
  --service=$SERVICE_NAME \
  --env=$ENV \
  --file=service-descriptor.yml

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "Your service URL will be:"
echo "https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net"
