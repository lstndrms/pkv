# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend SPA for the "Покровский квартал" school admission portal. Built with Vue 3 (Options API) and Vue CLI 5 (webpack). All UI text is in Russian — no i18n library is used.

## Commands

- `npm run serve` — dev server with hot-reload
- `npm run build` — production build
- `npm run lint` — ESLint

No test framework is configured.

## Architecture

### Stack
- **Vue 3** with Options API (no Composition API, no `<script setup>`, no TypeScript)
- **Vuex 4** for state management (single flat store, no modules)
- **Vue Router 4** with `createWebHistory`
- **PrimeVue 4** (Aura theme) — primary UI component library
- **Bootstrap 5** — used only for grid layout (`container`, `row`, `col-lg-*`)
- **PrimeFlex** — flex/spacing utility classes
- **Vuelidate** — form validation in `AuthForm` and `RegisterForm`
- **axios** — HTTP client, base URL set from `VUE_APP_BASE_URL` env var

### Key Directories
- `src/pages/` — route-level page components and dialog modals
- `src/components/` — reusable components; `components/UI/` has layout primitives (TopBar, BottomBar, LogoBlock, MyButton)
- `src/router/router.js` — all route definitions
- `src/store/index.js` — Vuex store (flat, caches current user data)

### Patterns to Know

**No API service layer.** All axios calls are made inline in components. Auth header is manually constructed in every component:
```js
config = { headers: { authorization: 'Bearer ' + this.$store.getters.TOKEN } }
```

**No route-level auth guards.** Each protected page checks auth in its `mounted()` hook with a repeated `setToken()` + `checkUser()` pattern — token from `localStorage`, then `GET /user/me`.

**Admin vs user rendering** is done with inline `v-if="this.$store.getters.USER.role === 'admin'"` in templates. Admin pages redirect non-admins in `mounted()` after the `/user/me` call.

**PrimeVue components are globally registered** in `main.js`. Note aliased names: `PrimeSelect` (is `Select`), `Calendar` (is `DatePicker`).

**File downloads** from the API return `{ content_type, file_content (base64), file_name }` JSON; the client creates a dynamic `<a>` tag to trigger download.

**Styling** is scoped CSS per component + Bootstrap grid + PrimeFlex utilities. Use `::v-deep()` to override PrimeVue internals. No CSS preprocessor.

### Environment Variables
- `VUE_APP_BASE_URL` — API base URL (defined in `.env` and `.env.production`)
