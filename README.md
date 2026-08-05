# FerdShop — Frontend (front-ferdshop)

A TypeScript React frontend for the FerdShop application, built with Vite, Tailwind CSS and shadcn components. It provides the UI, routes, and components used by the FerdShop product dashboard and public storefront.

## Tech stack
- Framework: React + TypeScript
- Bundler/dev server: Vite
- Styling: Tailwind CSS (with prettier-plugin-tailwindcss)
- Components: shadcn, Radix primitives, lucide-react
- State / data: zustand, @tanstack/react-query, react-hook-form, zod
- Routing: react-router
- Maps: leaflet + react-leaflet
- Tooling: ESLint, Prettier, TypeScript

## Quick start
Prerequisites:
- Node.js 18+ (recommended)
- npm, yarn or pnpm

Install dependencies:

```bash
npm install
```

Start dev server (Vite):

```bash
npm run dev
```

Open http://localhost:5173 (or the address printed by Vite).

Build for production:

```bash
npm run build
```

Preview a production build (local server):

```bash
npm run preview
```

Lint (ESLint):

```bash
npm run lint
```

## Project structure (important folders)
- src/ — application source
  - src/ui/ — core UI: ferdshop-app, pages, layouts, components, assets
  - src/router/ — route definitions and guards
  - src/contexts/ — global React contexts
  - src/index.css — global styles (Tailwind entry)
  - src/main.tsx — app bootstrap
- public/ — static files served as-is (e.g., vite.svg)
- index.html — Vite entry

Notable files
- tsconfig.app.json — TypeScript configuration for the app
- package.json — scripts: dev, build (runs tsc -b && vite build), preview, lint

## Environment / configuration
This repository does not require any project-specific environment variables by default. If integrating with a backend, add environment variables using Vite conventions (import.meta.env.VITE_*) and document them here.

## Assets
App images and icons are under `src/ui/assets/` and `public/`. Leaflet CSS is imported in `src/main.tsx`.

## Tests
No automated test runner is configured in this repository.

## Contributing
1. Fork and create a feature branch
2. Follow the existing TypeScript and lint rules
3. Run `npm run lint` and `npm run build` before proposing changes

If you want a PR template, tests, or CI added, open an issue describing the desired workflow.

## Notes
- The build script runs `tsc -b` before `vite build` to ensure type-checking and project references are satisfied.
- Tailwind and Prettier are configured — run your editor's formatter or `prettier` to keep style consistent.

---
Created by repository analysis. For questions about running or extending the app, reply with what you'd like to do next.