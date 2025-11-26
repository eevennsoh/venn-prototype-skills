# Deployment Guide

Complete guide for deploying the AI prototype to Atlassian Micros platform with seamless local-to-deployment workflow.

---

## 🏗️ Architecture & Workflow Overview

### The Zero-Change Workflow

The project uses a **single codebase** that works seamlessly in two modes **without requiring code changes**:

| Mode                  | Frontend      | Backend       | Connection                                       |
| --------------------- | ------------- | ------------- | ------------------------------------------------ |
| **Local Development** | Next.js :3000 | Express :8080 | Next.js API routes proxy requests                |
| **Production**        | Static files  | Express :8080 | Express serves static files + handles API routes |

**Key Insight:** Both environments use `/api/*` relative paths. The difference is:

- **Local dev**: Next.js API routes intercept and proxy to backend
- **Production**: Express backend handles them directly (same domain)

### How It Works: Relative Paths

```
Local Development:
Browser → http://localhost:3000
          ↓ /api/rovo-chat
        Next.js API Route (proxy)
          ↓ http://localhost:8080
        Express Backend

Production:
Browser → https://your-service.platdev.atl-paas.net
          ↓ /api/rovo-chat
        Express (same domain)
          ↓
        AI Gateway
```

**Zero Code Changes:** Both use the same relative paths and ASAP authentication!

### Build Process: Build-Time Configuration

The `BUILD_MODE` environment variable controls how the app builds:

```bash
# Local development (default)
npm run dev               # Next.js dev server with active API routes

# Production build
BUILD_MODE=export npm run build   # Static export (API routes excluded)
```

During production build:

1. API routes temporarily moved outside `app/` directory
2. Next.js builds static export without API routes
3. API routes automatically restored for continued local development
4. Docker copies static files + Express serves everything

---

## Prerequisites

**🚀 Before you start, choose a service name:**

Your deployed service will be accessible at: `https://<SERVICE-NAME>.us-west-2.platdev.atl-paas.net`

Service name requirements:
- Maximum 26 characters
- Lowercase letters, numbers, and hyphens only
- Examples: `my-prototype`, `chat-demo`, `ai-assistant`, `rovo-test`

**Write down your chosen service name - you'll need it for Steps 1-4 below.**

---

### System Requirements

1. **Docker Desktop** with buildx support
2. **Atlas CLI** installed and authenticated
3. **ASAP credentials** generated (see SETUP_GUIDE.md)
4. **API Key** from https://packages.atlassian.com/ for Docker registry auth

---

## Pre-Deployment Checklist

Before starting deployment, verify these requirements to avoid common issues:

### Verify Dockerfile Builds Locally

```bash
# Test Docker build locally (without platform flag for speed)
docker build -f backend/Dockerfile . -t local-test-build

# If successful, you're ready to build for production
```

### Verify npm Scripts

Check that all scripts referenced in Dockerfile exist in package.json:

```bash
grep "build:export" package.json  # Should show the script
```

### Verify Directory Structure

Ensure all COPY commands in Dockerfile point to existing files/directories:

```bash
ls -la app/ public/ backend/ scripts/ rovo/
```

Common issues caught by this check:
- Missing directories referenced in COPY commands
- Incorrect file paths relative to build context
- Missing configuration files

### Check Service Name Length

Service names must be ≤26 characters, lowercase-with-hyphens only.

---

## Local Development

For local development, start both the Next.js frontend and Express backend:

```bash
# Install dependencies
npm install

# Option 1: Automated (recommended)
./scripts/start-dev.sh

# Option 2: Manual two-terminal setup
# Terminal 1: npm run dev:backend (port 8080)
# Terminal 2: npm run dev:frontend (port 3000)

# Open http://localhost:3000
```

**Important:** In development, the Next.js server (port 3000) has active API routes that proxy to the backend (port 8080). This same architecture is replicated in production where Express serves both the static Next.js build and the API routes.

**Authentication methods are identical** - both development and production use ASAP tokens generated via `jsonwebtoken` library.

---

## Deployment Tutorial

**Using your service name from above, follow these steps in order:**

⚠️ **CRITICAL: Follow steps 1-3 in exact order. Docker auth (Step 2) MUST complete before building/pushing.**

### Step 1: Check Service Exists & Confirm Deployment Target

**IMPORTANT: You should ALWAYS confirm your deployment target - even if the service already exists.**

First, check if your desired service name exists:

```bash
atlas micros service show --service=<your-service-name> --env=pdev-west2
```

#### If Service Exists

Review the output showing:
- Current deployed version
- Deployment status
- Service URL

**Decision point:**
1. **Update existing service** - Proceed to Step 2, use version > current version
2. **Create NEW service** - Choose a different name and create it below

#### If Service NOT Found

You'll see an error. Confirm you want to create a new service with this name.

**Create the service:**

```bash
atlas micros service create --service=<your-service-name> --no-sd
```

The `--no-sd` flag skips interactive prompts and doesn't create an auto-generated `.sd.yml` file. We'll use our own `service-descriptor.yml` for deployment instead.

#### Version Number Guidelines

- **First deployment**: Use version `1.0.0`
- **Updating existing**: Increment from current version (1.0.0 → 1.0.1 → 1.0.2, etc.)
- **Major changes**: Consider jumping major version (1.0.5 → 2.0.0)

**Record your target version - you'll need it in Step 4.**

### Step 2: Authenticate with Docker Registry

**⚠️ CRITICAL - DO THIS IMMEDIATELY AFTER STEP 1!**

Docker authentication MUST be completed before building and pushing images. Without this, your `docker push` commands will fail with "unauthorized" errors later.

**Run these commands in order:**

```bash
# 1. Login to Docker registry
docker login docker.atl-paas.net
# Username: Your StaffID ONLY (e.g., esoh - NOT your email)
# Password: API Key from https://packages.atlassian.com/

# 2. Verify login succeeded (should output your StaffID)
docker config view --raw | jq '.auths."docker.atl-paas.net".username'

# 3. Grant push permissions (one time setup)
atlas packages permission grant

# 4. Verify you can pull images
docker pull docker.atl-paas.net/ubuntu
```

**⚠️ Common Authentication Issues & Solutions:**

- **"No API Key"**: Create one at https://packages.atlassian.com/ (click your profile → API Tokens → Create token)
- **"Unauthorized: authentication required"**: You used wrong credentials:
  - Username must be your **StaffID only**, NOT email
  - Password must be API Key from packages.atlassian.com, NOT your Okta password
  - Run `docker logout docker.atl-paas.net` then try login again
- **"permission denied"**: Run `atlas packages permission grant` to authorize push access
- **"Cannot connect to Docker daemon"**: Docker Desktop not running. Start it and retry

**Verify Authentication Before Proceeding:**

If the following command returns your StaffID, you're good to go to Step 3:

```bash
docker config view --raw | jq '.auths."docker.atl-paas.net".username'
```

If it returns `null` or is empty, re-run the login command above.

### Step 3: Set Environment Variables

**⚠️ CRITICAL - DO NOT SKIP THIS STEP!**

You MUST set all environment variables BEFORE deploying. If you deploy without setting these, your service will fail with "MISSING" environment variable errors. You'll need to redeploy with a new version to fix it.

**⚠️ Important:** Use YOUR OWN credentials from SETUP_GUIDE.md.

Set SSM parameters for your target environment:

```bash
ENV=pdev-west2
SERVICE_NAME=<your-service-name>  # Same name from Step 1

# Copy these commands, replacing values with YOUR credentials

atlas micros stash set -s $SERVICE_NAME -e $ENV \
  -k AI_GATEWAY_URL \
  -v "https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-haiku-4-5-20251001-v1:0/invoke"

# Use case ID is hardcoded as rad-venn-prototype
atlas micros stash set -s $SERVICE_NAME -e $ENV \
  -k AI_GATEWAY_USE_CASE_ID \
  -v "rad-venn-prototype"

atlas micros stash set -s $SERVICE_NAME -e $ENV \
  -k AI_GATEWAY_CLOUD_ID \
  -v "local-testing"

# REPLACE with YOUR email
atlas micros stash set -s $SERVICE_NAME -e $ENV \
  -k AI_GATEWAY_USER_ID \
  -v "your-email@atlassian.com"
```

For ASAP private key (use YOUR key from YOUR `.asap-config` file):

```bash
# Get YOUR private key from YOUR .asap-config file and create JSON file
# Do NOT reuse someone else's key - it won't work!
cat > /tmp/stash_vars.json << 'EOF'
{
  "ASAP_PRIVATE_KEY": "YOUR_KEY_HERE"
}
EOF

atlas micros stash set -s $SERVICE_NAME -e $ENV -f /tmp/stash_vars.json
rm /tmp/stash_vars.json
```

**Where to find your values:**

- `AI_GATEWAY_USE_CASE_ID`: Hardcoded as `rad-venn-prototype` - no configuration needed
- `ASAP_PRIVATE_KEY`: From your `.asap-config` file (generated via `atlas asap key generate`)
- `AI_GATEWAY_USER_ID`: Your Atlassian email address

**✅ Verification: Before proceeding to Step 4, verify all variables are set:**

```bash
SERVICE_NAME=<your-service-name>
ENV=pdev-west2

# Should output 5 values (if any shows "null" or is missing, go back and set it)
atlas micros stash get -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_URL
atlas micros stash get -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_USE_CASE_ID
atlas micros stash get -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_CLOUD_ID
atlas micros stash get -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_USER_ID
atlas micros stash get -s $SERVICE_NAME -e $ENV -k ASAP_PRIVATE_KEY
```

If any are missing or show "MISSING", set them again before proceeding.

### Step 4: Build Docker Image

**Recommended: Test build locally first** (optional but catches issues faster):

```bash
docker build -f backend/Dockerfile . -t test-build
```

If successful, build for production platform:

```bash
VERSION=1.0.1  # Use version from Step 1
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/<your-service-name>:app-${VERSION} \
  -f backend/Dockerfile . --load
```

**If build fails**, see "Dockerfile Build Issues" in Troubleshooting section below.

### Step 5: Push Docker Image

```bash
docker push docker.atl-paas.net/<your-service-name>:app-${VERSION}
```

### Step 6: Deploy

```bash
export VERSION=1.0.1
atlas micros service deploy \
  --service=<your-service-name> \
  --env=pdev-west2 \
  --file=service-descriptor.yml
```

**First deployment takes 10-15 minutes** (provisioning EC2 instance). Subsequent deployments take ~30 seconds.

**Monitor deployment progress:**

```bash
# Check status periodically:
atlas micros service show --service=<your-service-name> --env=pdev-west2
```

### Step 7: Verify Deployment

```bash
# Get your service URL
atlas micros service show --service=<your-service-name> --env=pdev-west2

# Test health endpoint (replace with your URL)
curl https://<your-service-name>.us-west-2.platdev.atl-paas.net/api/health
```

---

## Updating an Existing Deployment

**Note:** This section assumes you've already confirmed in Step 1 that you want to update the existing service. If you haven't deployed before, start from the beginning of the Deployment Tutorial.

If you've already deployed and want to push new changes:

### Step 1: Increment Version & Build

```bash
VERSION=1.0.2  # Increment from previous version
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/<your-service-name>:app-${VERSION} \
  -f backend/Dockerfile . --load
```

### Step 2: Push

```bash
docker push docker.atl-paas.net/<your-service-name>:app-${VERSION}
```

### Step 3: Deploy

```bash
export VERSION=1.0.2
atlas micros service deploy \
  --service=<your-service-name> \
  --env=pdev-west2 \
  --file=service-descriptor.yml
```

**Subsequent deployments take ~30 seconds (vs 10-15 minutes for first-time deployment).**

---

## Verifying Your Deployment

**Health Check - All values must show "SET":**

```bash
curl https://<your-service-name>.us-west-2.platdev.atl-paas.net/api/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "Backend server is working!",
  "envCheck": {
    "AI_GATEWAY_URL": "SET",
    "AI_GATEWAY_USE_CASE_ID": "SET",
    "AI_GATEWAY_CLOUD_ID": "SET",
    "AI_GATEWAY_USER_ID": "SET",
    "ASAP_PRIVATE_KEY": "SET"
  }
}
```

If any show "MISSING", see troubleshooting section.

**Test Chat API:**

```bash
curl -X POST https://<your-service-name>.us-west-2.platdev.atl-paas.net/api/rovo-chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are my work items?"}'
```

Should return streaming data starting with `data: {"type":"message_start"...`

**Test in Browser:**

1. Open: `https://<your-service-name>.us-west-2.platdev.atl-paas.net`
2. Verify images load (no 404s in browser console)
3. Send a message in chat: "What are my work items?"
4. Should receive AI response with work items widget

---

## Key Files

| File                     | Purpose                                                   |
| ------------------------ | --------------------------------------------------------- |
| `backend/Dockerfile`     | Multi-stage: builds Next.js → copies to Express container |
| `backend/server.js`      | Express server: serves static files + API routes          |
| `service-descriptor.yml` | Micros deployment config (EC2, Docker image, env vars)    |
| `next.config.ts`         | Next.js static export configuration                       |
| `.env.local`             | Local dev credentials (ASAP keys, AI Gateway config)      |

**Important Notes:**

- `backend/server.js` includes streaming format transformation (Bedrock SSE → frontend format)
- ASAP token generation includes required `jti` claim for AI Gateway
- Static assets served at both root and `/assets/*` paths

---

## 🔄 Making Changes to Deployed Service

### Adding New API Endpoints

1. **Add to backend** (edit `backend/server.js`):

   ```javascript
   app.post("/api/new-endpoint", async (req, res) => {
     // Handler code
   });
   ```

2. **Add proxy route for local dev** (create `app/api/new-endpoint/route.ts`):

   ```typescript
   export async function POST(request: NextRequest) {
     const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
     const response = await fetch(`${backendUrl}/api/new-endpoint`, {
       method: "POST",
       body: JSON.stringify(await request.json()),
     });
     return NextResponse.json(await response.json());
   }
   ```

3. **Update API config** (edit `app/lib/api-config.ts`):
   ```typescript
   export const API_ENDPOINTS = {
     NEW_ENDPOINT: "/api/new-endpoint",
   };
   ```

### Changing Environment Variables

1. **Local development**: Update `.env.local`
2. **Production**: Update SSM parameters via Micros:
   ```bash
   atlas micros stash set -s $SERVICE_NAME -e pdev-west2 -k VARIABLE_NAME -v "value"
   ```
3. **Restart servers** for changes to take effect

---

## Troubleshooting

### Docker push unauthorized (MOST COMMON ERROR)

**Error message:** `ERROR: denied: requested access to the resource is denied`

This happens when Docker authentication wasn't completed properly in Step 2.

**Solution:**

1. Check if you're logged in:

   ```bash
   docker config view --raw | jq '.auths."docker.atl-paas.net".username'
   ```

   If this returns `null` or is empty, you need to login.

2. Re-authenticate (see Step 2 above):

   ```bash
   docker logout docker.atl-paas.net
   docker login docker.atl-paas.net
   atlas packages permission grant
   ```

3. Verify login worked:

   ```bash
   docker pull docker.atl-paas.net/ubuntu  # Should succeed
   ```

4. Retry push:   
   ```bash
   docker push docker.atl-paas.net/<your-service-name>:app-1.0.0
   ```

### Build fails with TypeScript errors

**You should not see this if deploying from main branch.** Contact the repo maintainer. The main branch should always build successfully.

To verify locally before Docker build:

```bash
npm run build
```

### Dockerfile build fails with "not found" errors

**Error examples:**
- `ERROR: failed to calculate checksum: "/shared": not found`
- `ERROR: failed to calculate checksum: "/some-directory": not found`

**Cause:** Dockerfile COPY commands reference files/directories that don't exist.

**Solution:**

1. Check which files/directories the Dockerfile expects:

   ```bash
   grep "^COPY" backend/Dockerfile
   ```

2. Verify each one exists in your repo:

   ```bash
   ls -la app/ public/ backend/ scripts/ rovo/
   ```

3. Fix Dockerfile by either:
   - Creating the missing directory
   - Removing the COPY line if not needed
   - Correcting the path

**Common culprits:**
- `COPY shared ./shared` - Often a leftover from template repos
- Wrong path relative to build context
- Directory created locally but not committed to git

### Build fails with "Missing script" errors

**Error example:**
- `npm error Missing script: "build:production"`

**Cause:** Dockerfile references npm script that doesn't exist in package.json.

**Solution:**

1. Check what script the Dockerfile is trying to run:

   ```bash
   grep "npm run" backend/Dockerfile
   ```

2. Verify it exists in package.json:

   ```bash
   grep "scripts" package.json -A 10
   ```

3. Fix by either:
   - Using correct script name (e.g., `build:export` instead of `build:production`)
   - Adding missing script to package.json

### Service name too long error

Maximum 26 characters. Pick a shorter name and start over.

### "Unknown service" when setting environment variables

The service doesn't exist yet. Return to Step 1 and create the service first:

```bash
atlas micros service create --service=<your-service-name> --no-sd
```

Then proceed with Step 3 to set environment variables.

### Auto-generated `.sd.yml` file appears

This is normal. The file `<service-name>.sd.yml` is created by `atlas micros service create`. You can ignore it - we use `service-descriptor.yml` for deployment.

### Health check shows "MISSING" for environment variables

**This means environment variables weren't set before deployment.** Your service is running but misconfigured.

**Solution:**

1. Set the missing variables now (see Step 3 above for full list)

2. **Redeploy with a new version** (just setting vars isn't enough - the running container won't pick them up):

```bash
# Build, push, and deploy with new version
VERSION=1.0.2
docker buildx build --platform linux/amd64 -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} -f backend/Dockerfile . --load
docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}
export VERSION=1.0.2
atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml
```

**Prevention:** Always set ALL environment variables (Step 3) BEFORE your first deployment. Verify with `atlas micros stash get` commands before building and deploying.

### Chat returns 401 Unauthorized or "Principal not whitelisted"

ASAP authentication issue. Common issues:

- **ASAP principal not whitelisted** (most common) - Run:
  ```bash
  atlas ml aigateway usecase auth add -i rad-venn-prototype -e stg-east -p rad-venn-prototype -t ASAP_ISSUER
  ```
  Then wait 5-10 minutes for changes to propagate

- **ASAP key not saved to keyserver** - Run:
  ```bash
  atlas asap key save --key rad-venn-prototype/001 --service rad-venn-prototype --env staging --file .asap-config --temporary
  ```

- Wrong issuer/kid (should match `.env.local`)

### Deployment fails: "Service descriptor is not valid"

Service descriptor format issues. The service descriptor in this repo uses a simplified, working format. Ensure you're using the provided `service-descriptor.yml` without modifications.

### Deployment fails: "Exec format error"

Wrong platform architecture. You must build for `linux/amd64`:

```bash
docker buildx build --platform linux/amd64 --no-cache \
  -t docker.atl-paas.net/<your-service-name>:app-1.0.7 \
  -f backend/Dockerfile . --load
```

### Deployment stuck: "distribution exists and in progress"

ECR distribution lock from previous deploy. Solutions:

1. **Wait 15-20 minutes** for lock to clear
2. **Increment version**: Use `1.0.8` instead of `1.0.7`
3. **Different environment**: Deploy to `pdev-west2` instead of `ddev`

### Check logs

Splunk URL provided in deployment output, or:

```
`micros_<service-name>` env=pdev-west2 m.t=application (error OR "AI Gateway")
```

---

## Success Criteria

✅ **Deployment successful when:**

- Health check returns all "SET" values
- Chat API streams responses in curl test
- Browser shows images loading
- Chat interface displays responses with work items widget
- No errors in browser console or Splunk logs

---

## Additional Resources

- **Micros Documentation**: https://go.atlassian.com/micros
- **Troubleshooting Guide**: https://go.atlassian.com/mdt
- **Help Channel**: #help-micros on Slack
- **AI Gateway**: #help-ai-gateway on Slack
