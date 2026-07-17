# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-07-17

### Added
- Add .env.example for web app by @devharshthakur in [#26](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/26)
- Add opencode workflow by @devharshthakur
- Add helmet middleware for security headers by @devharshthakur in [#25](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/25)

### Changed
- Merge branch 'next' by @devharshthakur
- `v1.4.0` by @devharshthakur
- Pin all dependency versions by removing caret ranges by @devharshthakur
- Update deps by @devharshthakur
- Merge branch 'next' of https://github.com/devharshthakur/sveltekit-express-monorepo into next by @devharshthakur
- Wire up `helmet` in main by @devharshthakur
- Install `helmet` by @devharshthakur
- Merge pull request #19 from devharshthakur/6-missing-cors-middleware-on-api by @devharshthakur in [#19](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/19)
- Wired up main for cors by @devharshthakur
- Wired cross origin var in `env.ts` by @devharshthakur
- Install `cors` package by @devharshthakur
- Format by @devharshthakur
- Bump deps by @devharshthakur
- Update CHANGELOG.md for v1.3.0 by @github-actions[bot]

### Fixed
- Sync pnpm version with package.json by @devharshthakur in [#22](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/22)
- Install wget in base image for healthcheck by @devharshthakur in [#21](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/21)
- Changed config variable to baseConfig maintaining the semantics by @devharshthakur

### Removed
- Remove duplicate `sv:check` command by @devharshthakur in [#24](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/24)
- Remove dead code by @devharshthakur in [#20](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/20)

## [1.3.0] - 2026-07-07

### Added
- Add prettier formatting for root and packages by @devharshthakur
- Add setup script file by @devharshthakur

### Changed
- Version bump by @devharshthakur
- Merge pull request #5 from devharshthakur/next by @devharshthakur in [#5](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/5)
- Format by @devharshthakur
- Hoist common TS rules and ignores to baseConfig by @devharshthakur
- Merge branch 'port/sveltekit-vite-config' into next by @devharshthakur
- Update tree and structure to reflect removed svelte.config.js by @devharshthakur
- Pass SvelteKit config to sveltekit() Vite plugin by @devharshthakur
- Rewritten by @devharshthakur
- Rewrite check script removing pnpm call overhead by @devharshthakur
- Format by @devharshthakur
- Unify format scripts across workspaces by @devharshthakur
- Rewritten `CHANGELOG` using `git-cliff` by @devharshthakur
- Move the `CHANGELOG` creation pipeline from `changelogen` to `git-cliff` by @devharshthakur
- Pnpm version bump by @devharshthakur
- Bump deps by @devharshthakur
- Setup testing pipline for `setup.sh` script by @devharshthakur
- Rewritten `setup.js` in bash by @devharshthakur
- Merge branch 'main' of https://github.com/devharshthakur/sveltekit-express-monorepo by @devharshthakur
- Update changelog for v1.2.1 by @github-actions[bot]

### Fixed
- Spread eslint prettier directly by @devharshthakur
- Silence setup output and strip final state dump by @devharshthakur
- It now also self delete the bash scripts by @devharshthakur

### Removed
- Remove experimental cli flag by @devharshthakur
- Remove svelte.config.js by @devharshthakur
- Remove broken prettierConfig export, fix object spread by @devharshthakur
- Removed unreleased by @devharshthakur
- Remove deps scripts from `package.json` by @devharshthakur
- Remove scripts by @devharshthakur

## [1.2.1] - 2026-06-25

### Changed
- Patch version bump by @devharshthakur

### Fixed
- Pnpm version mismatch by @devharshthakur

## [1.2.0] - 2026-06-25

### Added
- Add graceful shutdown by @devharshthakur
- Add health check by @devharshthakur
- Add repo, bugs, homepage by @devharshthakur

### Changed
- Bump deps by @devharshthakur
- Shift from git-cliff to changelogen by @devharshthakur
- Merge pull request #4 from devharshthakur/fixes by @devharshthakur in [#4](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/4)
- Created editorconfig by @devharshthakur
- Rewrite scripts in typescript by @devharshthakur
- Shfted to `tsdown` from `tsc` based build pipeline for api by @devharshthakur
- Merge pull request #3 from devharshthakur/dev by @devharshthakur in [#3](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/3)
- Update  for v1.1.0 by @github-actions[bot]

### Fixed
- Simplified the build pipeline by @devharshthakur
- Fixed some scripts by @devharshthakur
- Preserve old changelog entries with --prepend by @devharshthakur

### Removed
- Removed stale tag by @devharshthakur
- Removed `.env` ffrom vc and instead created a `.env.example` file by @devharshthakur

### New Contributors
* @github-actions[bot] made their first contribution

## [1.1.0] - 2026-06-14

### Added
- Add --experimental-cli to all prettier commands by @devharshthakur
- Add release workflow for git-cliff changelog generation by @devharshthakur
- Add type assertion for JSON.parse in postbuild script by @devharshthakur

### Changed
- Merge pull request #2 from devharshthakur/next by @devharshthakur in [#2](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/2)
- `pnpm` version bump by @devharshthakur
- Merge pull request #1 from devharshthakur/feat/github-workflows by @devharshthakur in [#1](https://github.com/devharshthakur/sveltekit-express-monorepo/pull/1)
- Bumped version to v4 for release step by @devharshthakur
- Update deps by @devharshthakur
- Create scripts by @devharshthakur
- Folder structure now in proper tree format by @devharshthakur
- Refined by @devharshthakur
- Update deps by @devharshthakur
- Update deps by @devharshthakur
- Setup git cliff by @devharshthakur

### Removed
- Removed postbuild script by @devharshthakur
- Removed local `vscode` settings by @devharshthakur

## [1.0.0] - 2026-06-09

### Added
- Add documentation by @devharshthakur
- Add Zod env validation and move error handler to route layer by @devharshthakur

### Changed
- Docker setup by @devharshthakur
- Restructure API routes into dedicated files by @devharshthakur
- Project bootstrap by @devharshthakur
- Initial commit by @devharshthakur

### Fixed
- Config files version tags by @devharshthakur

### New Contributors
* @devharshthakur made their first contribution

[1.4.0]: https://github.com/devharshthakur/sveltekit-express-monorepo/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/devharshthakur/sveltekit-express-monorepo/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/devharshthakur/sveltekit-express-monorepo/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/devharshthakur/sveltekit-express-monorepo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/devharshthakur/sveltekit-express-monorepo/compare/v1.0.0...v1.1.0

<!-- generated by git-cliff -->
