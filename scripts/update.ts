#!/usr/bin/env tsx
import { execSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { stdin, stdout } from "node:process";

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

function updatePackages(cwd: string): boolean {
  try {
    execSync("pnpm update --latest", { cwd, stdio: "inherit" });
    return true;
  } catch {
    return false;
  }
}

async function promptUpdate(
  rl: ReturnType<typeof createInterface>,
  name: string,
): Promise<boolean> {
  const answer = await rl.question(`  Update ${name}? [y/N] `);
  return answer.toLowerCase() === "y";
}

async function main(): Promise<void> {
  const rl = createInterface({ input: stdin, output: stdout });
  const members = getWorkspaceMembers();

  // Root check
  const rootOutput = checkOutdated(process.cwd());
  if (rootOutput !== null && rootOutput.trim().length > 0) {
    console.log("=== . ===");
    console.log(rootOutput.trimEnd());
    console.log();

    if (await promptUpdate(rl, "root (.)")) {
      if (updatePackages(process.cwd())) {
        console.log("  ✓ Updated root");
      } else {
        console.log("  ✗ Update failed for root");
      }
    } else {
      console.log("  Skipped");
    }
    console.log();
  }

  // Workspace members
  for (const member of members) {
    console.log(`=== ${member.name} ===`);
    const output = checkOutdated(member.path);

    if (output === null) {
      // Error already printed above
    } else if (output.trim().length === 0) {
      console.log("  ✓ Up to date");
    } else {
      console.log(output.trimEnd());
      console.log();

      if (await promptUpdate(rl, member.name)) {
        if (updatePackages(member.path)) {
          console.log(`  ✓ Updated ${member.name}`);
        } else {
          console.log(`  ✗ Update failed for ${member.name}`);
        }
      } else {
        console.log("  Skipped");
      }
    }

    console.log();
  }

  rl.close();
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
