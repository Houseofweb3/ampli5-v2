# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Ampli5 (`how3-frontend` in package.json) is a Next.js 14 App Router app for an AI‑powered Web3 influencer / PR platform. The site mixes public marketing pages, a brand-facing dashboard, an internal blog CMS under `/manage`, and a token-based proposals viewer.

## Commands

```bash
yarn dev            # next dev — local server on :3000
yarn build          # next build
yarn start          # next start (after build)
yarn lint           # next lint (eslint)
yarn lint --fix     # auto-fix
yarn format         # prettier --write .
yarn format:check   # prettier --check .
```

There is no test runner configured. The `pre-commit` script in `package.json` runs lint+format and re-stages files; the Husky hook in `.husky/pre-commit` is currently commented out, so commits do not auto-run it.

Package manager: both `package-lock.json` and `yarn.lock` exist; the lockfile that ships with the repo and the `pre-commit` script use **yarn**. Prefer yarn to avoid lockfile churn.

## Required environment variables

These are read at runtime — local dev expects a `.env` (already gitignored). Names only:

- `NEXTAUTH_URL`, `AUTH_SECRET`, `NEXTAUTH_SECRET` — NextAuth v5 (beta).
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth provider.
- `TWITTER_CLIENT_ID`, `TWITTER_CLIENT_SECRET` — Twitter OAuth 2.0 provider.
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_URL_BOUNTY`, `NEXT_PUBLIC_DASHBOARD_API_URL` — backend base URLs (the bounty + dashboard URLs are separate axios clients).
- `SPREAD_SHEET_ID`, `SPREAD_SHEET_ID_FOR_CREATOR_ONBOARDING`, `SPREAD_SHEET_ID_FOR_BRABD_INTAKE`, `SPREAD_SHEET_EMAIL`, `GOOGLE_KEY` — Google Sheets service-account writes from API routes under `src/app/api/`.
- `CLOUDINARY_*`, `NEXT_PUBLIC_CLOUDINARY_*` — image upload (`/api/cloudinary`).

## Architecture

### Three coexisting auth systems

Each surface has its **own** axios client + state store, and they do not share tokens. When adding a feature, pick the correct client or the request will be sent unauthenticated:

1. **Public site / bounty** — `auth.ts` (NextAuth v5 with Google + Twitter providers). Twitter sign-in calls `api.kaito.ai` for a Yap score and gates access if score < 10. After Google sign-in, `setUserCookies` writes `userId` / `access_token` / `refresh_token` cookies, and `src/store/auth.ts` (Zustand, `localStorage` persisted) mirrors the user. The axios client is [src/lib/axiosInstance.ts](src/lib/axiosInstance.ts) → `NEXT_PUBLIC_API_URL_BOUNTY`.
2. **Brand dashboard** (`/dashboard/*`) — OTP-based login. Token + client live in **cookies** (`dashboard_client_token`, `dashboard_client`) managed by [src/store/dashboardAuthStore.ts](src/store/dashboardAuthStore.ts) with a custom cookie-backed Zustand persister. The axios client is [src/lib/dashboardClient.ts](src/lib/dashboardClient.ts) → `NEXT_PUBLIC_DASHBOARD_API_URL`. On 401/403 with an auth-related message it clears auth and hard-redirects to `ALLROUTES.SIGN_IN` (`/dashboard/sign-in`). Route protection: [src/app/dashboard/layout.tsx](src/app/dashboard/layout.tsx) wraps everything in `DashboardAuthGuard`.
3. **Blog CMS** (`/manage/*`) — separate OTP-based web-user login. Token in [src/store/manageWebUserAuthStore.ts](src/store/manageWebUserAuthStore.ts); axios client is [src/lib/manageBlogClient.ts](src/lib/manageBlogClient.ts) (same backend URL but different token). Auth failures redirect to `/manage/login`. Protected pages live under `src/app/manage/(protected)/`.

### App Router layout

- Root [src/app/layout.tsx](src/app/layout.tsx) is an **async server component**: it calls `auth()` from NextAuth and wraps everything in `SessionProvider` + `CartProvider` + global `Navbar`/`Footer`. Per-section layouts then add their own guards (dashboard, manage).
- `src/app/api/` holds server route handlers for:
  - `auth/[...nextauth]` — re-exports from `auth.ts`.
  - `brand-intake`, `creator-onboarding-sheet`, `founderfuel`, `user` — Google Sheets writes via `googleapis` + service account (`GOOGLE_KEY`/`SPREAD_SHEET_EMAIL`).
  - `cloudinary/upload` + `cloudinary/delete` — image asset proxy.
  - `clearCookies` — sign-out helper that clears the cookies written by `auth.ts`.
- Public marketing pages live as siblings under `src/app/` (`ampli5`, `for-project`, `case-studies`, `bounty-hunt`, `discover-kols`, `founder-signal`, `founderfuel`, `services`, `creator-onboarding`, etc.). Long marketing copy/components for each landing page lives in a same-named folder under `src/components/` (e.g. `src/components/ampli5`, `src/components/aeo-llm-marketing`).
- `/proposals/[token]/[date]` renders a token-gated proposal view; submission lives at `/proposals/success`. API paths are centralized in [src/lib/proposalApiPaths.ts](src/lib/proposalApiPaths.ts).

### Middleware

[src/middleware.ts](src/middleware.ts) is matcher‑scoped to non-`/api`, non-static routes. It does **not** do auth — it only forwards `x-current-path` and (when present) `x-query-id` headers so server components can read the current pathname / a redirect-target id. Auth gating happens client‑side in the per-section guards.

### State

Zustand is the only state library. Each store owns one auth scope ([auth](src/store/auth.ts), [dashboardAuthStore](src/store/dashboardAuthStore.ts), [manageWebUserAuthStore](src/store/manageWebUserAuthStore.ts)) plus form drafts ([brandIntakeForm](src/store/brandIntakeForm.ts), [creatorOnboardingForm](src/store/creatorOnboardingForm.ts)). Cart + filter state are in React context (`src/context/`).

### Imports

`tsconfig.json` paths: `@/*` → repo root. So `@/src/lib/...`, `@/public/icons`, etc. — note the `@/src/...` prefix (not `@/...` directly into `src`).

## Conventions to keep in mind

- ESLint: `no-unused-vars` is **error** (not warn). When defining interfaces with method signatures, suppress with `// eslint-disable-next-line no-unused-vars` (used throughout the stores) rather than renaming params.
- Prettier: 100 col, double quotes, 2-space, `trailingComma: es5`.
- Next config sets `reactStrictMode: false` and `images.remotePatterns` accepts **any** HTTPS host (`hostname: "**"`), so `next/image` works with arbitrary CDNs without config changes.
- `tsconfig.json` is `"strict": true` but `noEmit` — type errors surface only during `next build` / IDE, not at runtime.
