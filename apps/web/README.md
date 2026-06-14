# Web app

SvelteKit frontend for the monorepo.

## Role

- Own user-facing routes and UI.
- Use Svelte 5, Vite, Tailwind CSS, and SvelteKit conventions.
- Build to a Node-compatible production server through adapter-node.

## Structure

```
src/
├── routes/           # SvelteKit route tree and route-level styles
├── lib/              # shared web-only modules and assets
└── app.html         # HTML shell
svelte.config.js     # SvelteKit and adapter configuration
vite.config.ts       # Vite plugin configuration
```

## Commands

Run from `apps/web` or through pnpm workspace filters.

| Command          | Purpose                         |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Start the SvelteKit dev server. |
| `pnpm build`     | Build production output.        |
| `pnpm start`     | Run built Node server.          |
| `pnpm preview`   | Preview production build.       |
| `pnpm typecheck` | Validate Svelte and TS types.   |
| `pnpm lint`      | Run ESLint.                     |
| `pnpm check`     | Run type and lint checks.       |
| `pnpm format`    | Format web files.               |

## Development notes

Keep route concerns close to their SvelteKit route. Move reusable UI or web-only helpers into `src/lib`. Keep API integration conceptual at the boundary: the web app consumes API behavior, but should not depend on API internals.
