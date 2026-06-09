# Architecture

This repository is a pnpm + Turbo monorepo for a TypeScript full-stack app. It separates product surfaces from shared developer tooling while keeping build, lint, and type workflows consistent.

## Workspace shape

```text
apps/
  web/   SvelteKit frontend
  api/   Express backend
packages/
  eslint-config/    shared lint rules
  prettier-config/  shared formatting rules
```

## Boundaries

- `apps/web` owns user-facing UI, SvelteKit routing, browser assets, and web runtime configuration.
- `apps/api` owns HTTP API behavior, request routing, environment validation, services, and API middleware.
- `packages/*` owns reusable development configuration, not product logic.
- Root config owns workspace orchestration, dependency installation, Docker composition, and cross-app checks.

## Runtime model

The web app and API run as separate Node processes.

- Web production runtime uses SvelteKit adapter-node.
- API production runtime runs compiled Express output.
- Docker Compose starts both services independently and exposes their ports separately.
- The web service depends on the API service at container startup, but application-level communication should still handle API availability as a runtime concern.

## Build model

Turbo coordinates workspace tasks and caches build outputs where useful.

- App builds are isolated by package.
- Shared packages are workspace dependencies.
- Production Docker targets copy only the build output and runtime dependencies needed by each app.

## Configuration model

Configuration lives close to the runtime that consumes it.

- API environment variables are validated on startup.
- Web runtime configuration belongs in SvelteKit/Vite conventions.
- Root-level configuration should stay limited to workspace, tooling, and deployment orchestration.

## Extension guidance

- Add API endpoints by grouping route concerns under `apps/api/src/routes`, business logic under `services`, and cross-cutting request behavior under `middlewares`.
- Add web features through SvelteKit routes and colocated UI modules under `apps/web/src`.
- Promote tooling config to `packages/*` only when more than one workspace package needs it.
- Keep app boundaries explicit; avoid coupling web internals to API implementation details.

## Quality gates

Each app exposes consistent lifecycle commands so checks can run from either the app or root workspace.

- `typecheck` verifies TypeScript and framework types.
- `lint` enforces code quality rules.
- `check` combines the required app-level validation.
- `build` verifies production output.
