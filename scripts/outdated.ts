#!/usr/bin/env tsx
import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT_DIRS = ["apps", "packages"] as const;

interface WorkspaceMember {
  path: string;
  name: string;
}

interface ExecError extends Error {
  status: number | null;
  stdout: string;
}

function isOutdatedError(error: unknown): error is ExecError {
  return (
    error instanceof Error &&
    "status" in error &&
    (error as { status: number | null }).status === 1 &&
    "stdout" in error
  );
}

function getWorkspaceMembers(): WorkspaceMember[] {
  const members: WorkspaceMember[] = [];

  for (const rootDir of ROOT_DIRS) {
    try {
      const entries = readdirSync(rootDir);
      for (const entry of entries) {
        const fullPath = join(rootDir, entry);
        const pkgJsonPath = join(fullPath, "package.json");
        if (statSync(fullPath).isDirectory() && existsSync(pkgJsonPath)) {
          members.push({ path: fullPath, name: `${rootDir}/${entry}` });
        }
      }
    } catch {
      // Directory missing or inaccessible — skip
    }
  }

  return members;
}

function checkOutdated(cwd: string): string | null {
  try {
    return execSync("pnpm outdated", { cwd, encoding: "utf-8" });
  } catch (error: unknown) {
    if (isOutdatedError(error)) {
      // pnpm exits with 1 when there are outdated packages
      return error.stdout;
    }
    console.error(`  ✗ Error: ${error instanceof Error ? error.message : error}`);
    return null;
  }
}

function main(): void {
  const members = getWorkspaceMembers();

  if (members.length === 0) {
    console.log("No workspace members found in apps/ or packages/.");
    process.exit(0);
  }

  for (const member of members) {
    console.log(`=== ${member.name} ===`);
    const output = checkOutdated(member.path);

    if (output === null) {
      // Error already printed above
    } else if (output.trim().length === 0) {
      console.log("  ✓ Up to date");
    } else {
      console.log(output.trimEnd());
    }

    console.log();
  }
}

main();
