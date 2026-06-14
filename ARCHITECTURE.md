# Architecture

## Workspace shape

```
.
├── apps
│   ├── api
│   └── web
├── packages
│   ├── eslint-config
│   └── prettier-config
```

## Boundaries

| Scope        | Ownership                                         |
| ------------ | ------------------------------------------------- |
| `apps/web`   | UI, routing, assets, web config                   |
| `apps/api`   | HTTP, routing, validation, services, middleware   |
| `packages/*` | Dev config only                                   |
| Root         | Workspace orchestration, Docker, cross-app checks |

## Runtime & build

- Web and API run as separate Node processes
- Web uses SvelteKit adapter-node; API runs compiled Express
- Docker Compose starts services independently with port exposure
- Turbo coordinates workspace tasks with isolated app builds
- Configuration lives near consuming runtime; root config limited to orchestration

## Quality gates

Each app exposes consistent lifecycle commands for unified validation.
