# Scripts Documentation

This directory contains utility scripts for managing dependencies in the monorepo.

## Overview

These scripts help you check and update outdated dependencies across the entire monorepo, including the root package and all workspace members.

## Scripts

### `outdated.ts`

**Purpose:** Check for outdated dependencies without making changes.

**What it does:**

- Iterates through all workspace members in `apps/` and `packages/`
- Runs `pnpm outdated` for each directory that contains a `package.json`
- Displays the outdated packages in a readable format
- Shows "✓ Up to date" for directories without outdated packages

**Usage:**

```bash
pnpm deps:outdated
# or
tsx scripts/outdated.ts
```

**Output example:**

```
=== .
┌──────────────┬─────────┬────────┐
│ Package      │ Current │ Latest │
├──────────────┼─────────┼────────┤
│ eslint (dev) │ 10.4.1  │ 10.5.0 │
└──────────────┴─────────┴────────┘

=== apps/web
┌─────────────────────────┬─────────┬────────┐
│ Package                 │ Current │ Latest │
├─────────────────────────┼─────────┼────────┤
│ @tailwindcss/vite (dev) │ 4.3.0   │ 4.3.1  │
├─────────────────────────┼─────────┼────────┤
│ tailwindcss (dev)       │ 4.3.0   │ 4.3.1  │
└─────────────────────────┴─────────┴────────┘
```

### `update.ts`

**Purpose:** Interactively update outdated dependencies with user confirmation.

**What it does:**

- First checks and prompts for root `package.json` updates
- Then iterates through all workspace members in `apps/` and `packages/`
- For each directory with outdated packages:
  - Displays the outdated packages
  - Prompts "Update <name>? [y/N]"
  - Runs `pnpm update --latest` only if user confirms with 'y' or 'Y'
  - Continues to next directory even if individual updates fail
- Shows "✓ Up to date" for directories without outdated packages

**Usage:**

```bash
pnpm deps:update
# or
tsx scripts/update.ts
```

**Interactive prompts:**

- You'll be asked for each workspace member with outdated packages
- Type 'y' or 'Y' to update, anything else to skip
- The script continues even if some updates fail

**Safety features:**

- Requires explicit user confirmation for each update
- Won't update anything without your approval
- Continues processing even if individual updates fail

## Notes

- These scripts work with pnpm workspaces
- The scripts are written in TypeScript and run via `tsx` (already available as a root dev dependency)
- Root `package.json` is checked separately (shown as ".")
- Apps and packages are checked in the order they appear in the workspace
- All changes are made in-place (`package.json` and `pnpm-lock.yaml` files)

## Example workflow

1. Check what's outdated:

   ```bash
   pnpm deps:outdated
   ```

2. Update only what you want:

   ```bash
   echo "y" | pnpm deps:update
   ```

3. Or skip everything:
   ```bash
   echo "N" | pnpm deps:update
   ```
