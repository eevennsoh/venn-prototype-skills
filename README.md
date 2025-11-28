# venn-prototype-skills

Rovo Chat Panel with skill suggestions - a prototype for venn skills discovery

## AI-Powered Prototyping Template

A Next.js prototype template for creating high-fidelity AI prototypes with real Atlassian Design System components, deployable to internal Atlassian infrastructure.

## 🚀 Getting Started

### ⚡ Quick Start (After Setup)

Once you've set up your configuration files (see setup guides below), you have two ways to start the dev environment:

#### Option A: Using Run and Debug Panel (Easiest)

1. **Open the Run and Debug panel** (Ctrl/Cmd + Shift + D in VS Code / Volt Studio)
2. **Select "Start Dev Environment"** from the dropdown
3. **Click the green play button**

The integrated terminal will start both your backend and frontend automatically.

#### Option B: Using the Command Line

```bash
./scripts/start-dev.sh
```

Both methods start Express backend (:8080) and Next.js frontend (:3000) with ASAP authentication.

Then open http://localhost:3000 and test the AI chat!

**Note:** First-time setup requires generating ASAP credentials and creating `.env.local` - see your setup guide below.

### 📖 Complete Setup Guides

Choose your setup path:

**💻 Local Development**
→ [SETUP_GUIDE.md](./guides/SETUP_GUIDE.md) - Complete setup with ASAP credentials, `.env.local` creation, and local development

**🚀 Production Deployment**
→ [DEPLOYMENT_GUIDE.md](./guides/DEPLOYMENT_GUIDE.md) - Step-by-step guide for deploying to Atlassian Micros (24/7 availability)

### 🌿 Collaborating with Branches (Optional)

After you've explored the template and want to save your changes:

#### Option 1: Create a Personal Branch (Recommended for getting started)

1. **Open the Source Control panel** (Ctrl/Cmd + Shift + G in VS Code)
2. **Click the branch icon** at the top of the Source Control panel (shows "main" by default)
3. **Select "Create new branch"**
4. **Enter a branch name** (e.g., `my-prototype`, `feature/chat-improvements`, etc.)
5. **Choose "main" as the branch you're basing it on**

Your changes will now be saved to your new branch instead of main. The main branch stays clean and read-only for your colleagues.

#### Option 2: Fork the Repository (For full control)

If you want complete independence or plan to make major changes:

1. Go to the repository on GitHub/GitLab
2. Click the **"Fork"** button
3. Clone your fork instead of the original repository

You'll have full control over your copy and can choose what changes to share.

---

**Important:** When you create a branch from main, any uncommitted changes you've made so far will carry over to the new branch. Make sure this is what you want!

---

## 🏗️ Architecture

This project uses a **single Express backend** with **ASAP authentication**:

```
Frontend (Next.js :3000) → Express Backend (:8080) with ASAP → AI Gateway
```

**Why ASAP?**

- ✅ Works in browser-based VMs (Volt Studio)
- ✅ Works in production deployments
- ✅ Works on local laptop
- ✅ Only requires YubiKey authentication (one-time setup)

See [VERIFIED_WORKING.md](./VERIFIED_WORKING.md) for end-to-end test results.

---

## � Additional Resources

- **Atlassian Design System:** https://atlassian.design
- **AI Gateway Documentation:** Ask in #help-ai-gateway on Slack
- **Deployment Best Practices:** [Kevin Grennan OG Master Prototyper](https://hello.atlassian.net/wiki/spaces/~712020bffd994093c8458c89e1e2f0d9abcb3a/pages/5977078534/How+to+Deploy+Design+Prototypes+with+Real+AI+Interactivity)
  > > > > > > > f661367 (Initial commit: Rovo Chat Panel with skill suggestions)
