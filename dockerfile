# syntax=docker/dockerfile:1.7

FROM node:24-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV="production"

RUN corepack enable && corepack prepare pnpm@11.6.0 --activate

WORKDIR /usr/src/app

FROM base AS build

ENV NODE_ENV="production"

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter api build
RUN pnpm --filter web build

FROM base AS api-prod-deps

COPY . .
RUN --mount=type=cache,id=pnpm-prod-api,target=/pnpm/store pnpm install --prod --filter api --frozen-lockfile --ignore-scripts

FROM base AS api

WORKDIR /usr/src/app/apps/api

COPY --from=api-prod-deps /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=api-prod-deps /usr/src/app/apps/api/node_modules ./node_modules
COPY --from=api-prod-deps /usr/src/app/apps/api/package.json ./package.json
COPY --from=build /usr/src/app/apps/api/build ./build

EXPOSE 8000
CMD ["node", "build/main.js"]

FROM base AS web

WORKDIR /usr/src/app/apps/web

COPY --from=build /usr/src/app/apps/web/package.json ./package.json
COPY --from=build /usr/src/app/apps/web/build ./build

EXPOSE 4173
CMD ["node", "build"]
