# AI-Powered Prototyping Setup Guide

Complete setup guide for local development with ASAP authentication.

---

## 🚀 Quick Start (5 Minutes)

**Prerequisites:**

- Node.js 18+
- ASAP credentials (you'll generate these in the Terminal)

**Architecture:**

**Local Development (what you're doing now):**

```
Browser → Next.js Server (port 3000) with API proxy routes
        → Express Backend (port 8080)
        → AI Gateway
```

**Production (Micros Deployment):**

```
Browser → Single Express Server (port 8080)
        → Serves Next.js static build + API routes
        → AI Gateway
```

The same code works in both environments! Next.js API routes (`/api/rovo-chat`, `/api/health`) run in development directly and are bundled into the Express server for production.

This setup uses **`rad-venn-prototype`** as the hardcoded AI Gateway use case - no need to configure a different one!

### Start Development

⚠️ **Before Starting**: Clean up any existing processes to avoid port conflicts:

```bash
./scripts/stop-dev.sh
# Or manually:
pkill -f 'node backend/server.js' && pkill -f 'next dev'
lsof -ti:3000,8080 | xargs kill -9 2>/dev/null || true
```

**Now start the servers:**

```bash
./scripts/start-dev.sh
```

This starts both Express backend (:8080) and Next.js frontend (:3000).

**To stop:** `./scripts/stop-dev.sh`

**Alternative - Manual startup (if you prefer separate terminals):**

Terminal 1: `npm run dev:backend`
Terminal 2: `npm run dev:frontend`

### Verify It Works

1. **Check backend health:**

   ```bash
   curl http://localhost:8080/api/health
   ```

   **Expected:** All environment variables should show `"SET"`:

   ```json
   {
     "status": "OK",
     "authMethod": "ASAP",
     "envCheck": {
       "AI_GATEWAY_URL": "SET",
       "ASAP_PRIVATE_KEY": "SET",
       ...
     }
   }
   ```

   **If you see "MISSING"**: The `.env.local` file isn't being read. Stop the backend (`pkill -f 'node backend/server.js'`) and restart it.

2. **Open browser:** http://localhost:3000

3. **Test chat:** Click "Ask Rovo" and send a message - you should get a real AI response!

### Common Issues

**"EADDRINUSE: address already in use" error:**

Port 8080 or 3000 is already taken. Clean up existing processes:

```bash
./scripts/stop-dev.sh
# Or manually:
pkill -f 'node backend/server.js' && pkill -f 'next dev'
lsof -ti:3000,8080 | xargs kill -9 2>/dev/null || true
```

**Environment variables showing "MISSING":**

The backend can't read `.env.local`. Solutions:

1. Check file exists: `ls -la .env.local`
2. Verify file permissions: `chmod 644 .env.local`
3. Restart the backend: `pkill -f 'node backend/server.js' && npm run dev:backend`

**"operation not permitted" when creating .env.local:**

File permissions issue. Try:

```bash
touch .env.local
chmod 644 .env.local
# Then create the file content
```

**Frontend fails with "EPERM: operation not permitted" on node_modules:**

Sandbox/permission issue with Next.js. Solutions:

1. Run with full permissions: Start in a regular terminal (not VS Code integrated terminal)
2. Or use the start script: `./scripts/start-dev.sh`

**No AI response in chat:**

1. Check `.env.local` has all ASAP credentials set (ASAP_KID, ASAP_ISSUER, ASAP_PRIVATE_KEY)
2. Verify ASAP key was registered: Should have seen "Saved asap key successfully" in Step 2
3. Check backend logs for auth errors
4. Enable debug mode: Add `DEBUG=true` to `.env.local` and restart backend

### Additional Troubleshooting

**More help:** See detailed troubleshooting sections below or enable `DEBUG=true` in `.env.local` for verbose logs

---

## Authentication Setup: ASAP

**⚠️ This file does NOT exist when you fork the repo!** You must generate your own.

**Note:** The `rad-venn-prototype` use case is pre-configured and ready to use.

**Security Note:**

- The `.asap-config` file is gitignored and will NEVER be committed to the repository
- DO NOT share your ASAP private key with others
- Each person/team must generate their own credentials

### Step 1: Generate the ASAP key pair

In VS Code terminal, run this command (replace TIMESTAMP with a Unix timestamp):

```bash
# Using timestamp for uniqueness to avoid "key already exists" errors
# Replace TIMESTAMP with current Unix timestamp (e.g., 1735075200)
atlas asap key generate --key rad-venn-prototype/TIMESTAMP --file .asap-config
```

Example:

```bash
atlas asap key generate --key rad-venn-prototype/1735075200 --file .asap-config
```

You should see: `Wrote key to config file .asap-config`

**✓ Verify Step 1:** Check that `.asap-config` was created:

```bash
ls -la .asap-config
# Should show the file exists (around 1.5KB)
```

**Tip:** Generate a timestamp with: `date +%s`

### Step 2: Register the key with AI Gateway keyserver

Use the SAME timestamp from Step 1 (use `--temporary` flag for 28-day auto-delete):

```bash
atlas asap key save --key rad-venn-prototype/TIMESTAMP --service rad-venn-prototype --env staging --file .asap-config --temporary
```

Example (using the same timestamp `1735075200` from Step 1):

```bash
atlas asap key save --key rad-venn-prototype/1735075200 --service rad-venn-prototype --env staging --file .asap-config --temporary
```

**⚠️ Authentication Required - WebAuthn/YubiKey Flow:**

When you run this command, you'll see:

```
Opening browser to use yubikey webauthn...
Authenticating using "webauthn" to "browser"
```

**What to do:**

1. A browser window will open automatically with Okta authentication
2. The activation code should be pre-filled - click **"Next"**
3. When prompted, **tap your physical YubiKey** (or use Touch ID/Face ID)
4. Authentication completes automatically

**Important Notes:**

- **You need a YubiKey enrolled in Okta** - check at https://id.atlassian.com → Settings → Security Methods
- **Do NOT try to enter Duo codes** - the WebAuthn flow only accepts YubiKey tap or biometric authentication
- **If you don't have a YubiKey enrolled**, follow the guide at: "How-to: Add your Yubikey to your Okta account" on Confluence
- **Arc Browser may have issues** - use Chrome as your default browser if you encounter problems

You should see: `Saved asap key successfully`

**✓ Verify Step 2:** Confirm the key was registered:

```bash
# If you saw "Saved asap key successfully" - you're good to proceed!
# The key is now registered with AI Gateway for 28 days (--temporary flag)
```

**If you get "Key already exists" error**: Generate a new timestamp and re-run both Step 1 and Step 2 with the new timestamp.

### Step 3: Create `.env.local` with ASAP credentials

**One-command setup** - Run this script to automatically create `.env.local` from your `.asap-config`:

```bash
node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('.asap-config', 'utf8'));
const escaped = config.privateKey.replace(/\n/g, '\\\\n');
const envContent = \`AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-haiku-4-5-20251001-v1:0/invoke
AI_GATEWAY_USE_CASE_ID=rad-venn-prototype
AI_GATEWAY_CLOUD_ID=local-testing
AI_GATEWAY_USER_ID=YOUR_EMAIL@atlassian.com
ASAP_KID=\${config.kid}
ASAP_ISSUER=\${config.issuer}
ASAP_PRIVATE_KEY=\"\${escaped}\"\`;
fs.writeFileSync('.env.local', envContent);
console.log('✓ .env.local created successfully!');
console.log('⚠️  Remember to update AI_GATEWAY_USER_ID with your Atlassian email!');
"
```

**Then update your email:**

```bash
# Replace YOUR_EMAIL@atlassian.com with your actual email
sed -i '' 's/YOUR_EMAIL@atlassian.com/YOUR_ACTUAL_EMAIL@atlassian.com/g' .env.local
# Or manually edit .env.local and change the AI_GATEWAY_USER_ID line
```

**✓ Verify Step 3:** Check that `.env.local` was created correctly:

```bash
# Check file exists and has correct number of lines
wc -l .env.local  # Should show 7 lines

# Verify key fields are present (without exposing the actual key)
grep -q "ASAP_PRIVATE_KEY" .env.local && echo "✓ ASAP_PRIVATE_KEY: Found" || echo "✗ ASAP_PRIVATE_KEY: Missing"
grep -q "BEGIN RSA PRIVATE KEY" .env.local && echo "✓ Valid PEM format: Yes" || echo "✗ Valid PEM format: No"
grep -q "AI_GATEWAY_URL" .env.local && echo "✓ AI_GATEWAY_URL: Found" || echo "✗ AI_GATEWAY_URL: Missing"
```

**Alternative - Manual creation:**

If the automated script fails, manually create `.env.local` (gitignored) in project root:

```
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-haiku-4-5-20251001-v1:0/invoke
AI_GATEWAY_USE_CASE_ID=rad-venn-prototype
AI_GATEWAY_CLOUD_ID=local-testing
AI_GATEWAY_USER_ID=your_email@atlassian.com
ASAP_KID=rad-venn-prototype/YOUR-TIMESTAMP
ASAP_ISSUER=rad-venn-prototype
ASAP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nYOUR-KEY-CONTENT-HERE\n-----END RSA PRIVATE KEY-----"
```

Get the values from `.asap-config` - **CRITICAL:** The `ASAP_PRIVATE_KEY` must use escaped newlines `\n` (literal backslash-n) and be quoted.

### Verifying .env.local (Optional - Advanced Check)

After creating `.env.local`, you can optionally run a more detailed verification:

**Basic verification (works immediately):**

```bash
# Check all required variables are present
grep -q "AI_GATEWAY_URL" .env.local && echo "✓ AI_GATEWAY_URL: Found" || echo "✗ Missing"
grep -q "ASAP_KID" .env.local && echo "✓ ASAP_KID: Found" || echo "✗ Missing"
grep -q "ASAP_ISSUER" .env.local && echo "✓ ASAP_ISSUER: Found" || echo "✗ Missing"
grep -q "ASAP_PRIVATE_KEY" .env.local && echo "✓ ASAP_PRIVATE_KEY: Found" || echo "✗ Missing"
grep -q "BEGIN RSA PRIVATE KEY" .env.local && echo "✓ PEM format: Valid" || echo "✗ Invalid"
```

**Advanced verification (requires npm dependencies installed):**

```bash
# Only run this after you've run 'npm install'
node -e "
require('dotenv').config({ path: '.env.local' });
const key = process.env.ASAP_PRIVATE_KEY;
console.log('✓ ASAP_PRIVATE_KEY loaded:', key ? 'YES' : 'NO');
console.log('✓ Valid PEM format:', key && key.includes('-----BEGIN') ? 'YES' : 'NO');
console.log('✓ Has newlines:', key && key.includes('\n') ? 'YES' : 'NO');
console.log('✓ Key length:', key ? key.length : 0);
"
```

Expected output for advanced check:

```
✓ ASAP_PRIVATE_KEY loaded: YES
✓ Valid PEM format: YES
✓ Has newlines: YES
✓ Key length: 1674
```

### Troubleshooting .env.local

**ASAP_PRIVATE_KEY: MISSING**

- Check if `.env.local` exists: `ls -la .env.local`
- Check format: Must be quoted and use `\n` for newlines
- Verify backend can read it (after npm install):
  ```bash
  node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.ASAP_PRIVATE_KEY?.substring(0,30))"
  ```
- **If still missing**: Restart the backend server to reload environment variables

**Invalid PEM Format Error**

- Key must start with `-----BEGIN RSA PRIVATE KEY-----`
- Key must end with `-----END RSA PRIVATE KEY-----`
- Verify no actual line breaks (only `\n` escape sequences)
- Ensure ALL content is captured (no truncation)

**Auth Token Generation Fails**

- Check ASAP_KID format: Should be `rad-venn-prototype/[timestamp]`
- Check ASAP_ISSUER: Should be `rad-venn-prototype`
- Verify key is in correct RSA format
- Check `.asap-config` file was saved from `atlas asap key generate`

**"operation not permitted" or "EPERM" errors**

These are permission/sandbox issues:

1. **When creating .env.local**:

   - Create the file first: `touch .env.local && chmod 644 .env.local`
   - Then add content using the automated script or manually

2. **When running npm install or starting servers**:

   - Use the provided scripts: `./scripts/start-dev.sh`
   - Or run in a regular terminal (not VS Code integrated terminal)
   - Check file permissions: `ls -la .env.local` (should be `-rw-r--r--`)

3. **When reading node_modules (Frontend EPERM error)**:
   - Clean and reinstall: `rm -rf node_modules && npm install`
   - Start servers with the script: `./scripts/start-dev.sh`

**"Cannot find module 'dotenv'" error**

This happens if you try to run verification scripts before installing dependencies:

1. First run: `npm install`
2. Then run verification commands that use `require('dotenv')`

**Backend shows environment variables as "MISSING" even though .env.local exists**

1. Check file location: `.env.local` must be in project root (not in `backend/` folder)
2. Stop and restart the backend:
   ```bash
   pkill -f 'node backend/server.js'
   npm run dev:backend
   ```
3. Check for syntax errors in `.env.local` (missing quotes, wrong escaping)
4. Verify with: `cat .env.local | head -5` to see first few lines

Need help? Ask in #help-ai-gateway on Slack

---

## Next Steps

More info: [AI Gateway docs](https://developer.atlassian.com/platform/ai-gateway/)

---

## Test Locally

### Start Development Services

**Option 1 - Automated (Recommended):**

```bash
./scripts/start-dev.sh
```

**Option 2 - Manual:**

```bash
# Terminal 1
npm run dev:backend

# Terminal 2
npm run dev:frontend
```

**Option 3 - Concurrent:**

```bash
npm run dev:full
```

### Verify Everything Works

1. **Open** http://localhost:3000
2. **Click** "Ask Rovo" to open chat panel
3. **Send a message** - you should get a real AI response!
4. **Check backend:** `curl http://localhost:8080/api/health` should show `"authMethod": "ASAP"`

**Troubleshooting "Principal not whitelisted" error:**
This should not occur with `rad-venn-prototype` since it's pre-configured. If you do see this error:

1. Verify your `.env.local` has `ASAP_ISSUER=rad-venn-prototype` (not something else)
2. Check your `.asap-config` file exists

**Troubleshooting Authentication Issues:**

**If authentication keeps timing out or failing:**

1. Make sure your YubiKey is enrolled at https://id.atlassian.com
2. Try running the command again with a fresh terminal window
3. If using Arc Browser, try Chrome instead
4. Contact #help-cloudsec on Slack for YubiKey enrollment help

---

## Deploy to Micros (Optional)

For complete step-by-step deployment instructions, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**.

The deployment guide includes:

- First-time deployment walkthrough
- How to update existing deployments
- Environment variable setup
- Docker build and push instructions
- Comprehensive troubleshooting section

**Quick path:**

1. Update `service-descriptor.yml` with your service name
2. Follow the **Path A: First-Time Deployment** section in DEPLOYMENT_GUIDE.md
3. Test your deployment using the verification steps provided
