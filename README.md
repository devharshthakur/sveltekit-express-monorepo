# SvelteKit + Express Monorepo

Developer starter for a full-stack TypeScript app with SvelteKit on the web, Express on the API, and shared workspace tooling.

## What is inside

- `apps/web` — SvelteKit app built with Svelte 5, Vite, Tailwind CSS, and the Node adapter.
- `apps/api` — Express API with typed environment validation, route composition, services, and middleware.
- `packages/eslint-config` — shared ESLint configuration.
- `packages/prettier-config` — shared Prettier configuration.
- `ARCHITECTURE.md` — system boundaries, runtime model, and extension guidance.

## Requirements

- Node.js 24.x
- pnpm 11.5.2

## Common commands

Run commands from the repository root.

| Command             | Purpose                          |
| ------------------- | -------------------------------- |
| `pnpm install`      | Install workspace dependencies.  |
| `pnpm dev`          | Start all dev servers via Turbo. |
| `pnpm build`        | Build all apps.                  |
| `pnpm start`        | Build, then start production.    |
| `pnpm check`        | Run type and lint checks.        |
| `pnpm format`       | Format the workspace.            |
| `pnpm docker:build` | Build and run Docker services.   |

## App docs

- [Web app](apps/web/README.md)
- [API app](apps/api/README.md)
- [Architecture](ARCHITECTURE.md)

## Development model

The root workspace owns orchestration, dependency management, and shared quality gates. Each app owns its runtime concerns and exposes the same core lifecycle: develop, build, start, lint, typecheck, and check.

Keep app-specific decisions inside the relevant app. Move reusable developer tooling into `packages/*`.
