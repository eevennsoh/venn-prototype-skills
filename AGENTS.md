# AI Agent Instructions for venn-prototype-skills

## 🏗 Architecture & "Big Picture"

- **Stack**: Next.js 15 (App Router) frontend + Express backend (`backend/server.js`).
- **Service Communication**: Frontend (`:3000`) proxies AI requests to Backend (`:8080`), which authenticates via **ASAP** to the Atlassian AI Gateway.
- **Authentication**: ASAP (Atlassian Service Authentication Protocol) is handled in `backend/server.js`. Do not modify auth logic unless explicitly requested.
- **Entry Points**:
  - Frontend: `app/layout.tsx` (wraps `ClientLayout`), `app/page.tsx`.
  - Backend: `backend/server.js`.

## 🎨 UI & Design System (CRITICAL)

**Rule #1: Atlassian Design System (ADS) First.**

- **Components**: Prefer `@atlaskit/*` components over custom HTML or Shadcn.
  - Example: Use `@atlaskit/button` instead of `<button>`.
  - Example: Use `@atlaskit/avatar` instead of `<img>`.
- **Styling**: ALWAYS use **Design Tokens** via `@atlaskit/tokens`.
  - ✅ `style={{ color: token('color.text'), padding: token('space.100') }}`
  - ❌ `style={{ color: '#333', padding: '8px' }}`
  - ❌ Tailwind classes like `text-gray-800` or `p-2` (use only as fallback).
- **Typography**:
  - Headings: Use native `<h1>` to `<h6>`.
  - Body: Use `Text` from `@atlaskit/primitives`.
  - Font: `token('font.body.medium')`, `token('font.heading.large')`.
- **Icons**: Use `@atlaskit/icon` or `@atlaskit/icon-lab`.

## 🛠 Development Workflows

- **Start Dev Server**: `./scripts/start-dev.sh` (runs both Next.js and Express).
- **Environment**: Requires `.env.local` with ASAP credentials (`ASAP_ISSUER`, `ASAP_KID`, `ASAP_PRIVATE_KEY`).
- **Linting**: `npm run lint`.
- **Build**: `npm run build` (Next.js build).

## 📂 Project Structure & Conventions

- `app/`: Next.js App Router pages and API routes.
- `backend/`: Express server for AI Gateway proxying.
- `components/`: React components (ADS based).
- `guides/`: **READ THESE** for detailed ADS and setup info (`ADS_GUIDELINES.md`, `SETUP_GUIDE.md`).
- `lib/`: Shared utilities (`skills.ts`, `api-config.ts`).
- `rovo/`: Rovo-specific configuration.

## ⚠️ Common Pitfalls

- **Do not** use Tailwind for colors or spacing if a Token exists.
- **Do not** hardcode hex values.
- **Do not** bypass the backend proxy for AI calls; the frontend cannot sign ASAP tokens.
