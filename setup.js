import {
	existsSync,
	rmSync,
	unlinkSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { execSync } from "node:child_process";

function removeGitFolder() {
	if (!existsSync(".git")) return false;
	rmSync(".git", { recursive: true, force: true });
	return true;
}

function removeGithubWorkflows() {
	if (!existsSync(".github/workflows")) return false;
	rmSync(".github/workflows", { recursive: true, force: true });
	return true;
}

function removeChangelog() {
	if (!existsSync("CHANGELOG.md")) return false;
	unlinkSync("CHANGELOG.md");
	return true;
}

function cleanPackageJson() {
	if (!existsSync("package.json")) return false;
	const pkg = JSON.parse(readFileSync("package.json", "utf-8"));

	delete pkg.repository;
	delete pkg.bugs;
	delete pkg.homepage;

	if (pkg.scripts?.changelog) {
		delete pkg.scripts.changelog;
	}

	writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
	return true;
}

function reinitGit() {
	execSync("git init", { stdio: "inherit" });
	execSync('git add -A && git commit -m "Initial commit"', {
		stdio: "inherit",
	});
}

function main() {
	console.log("Cleaning template...\n");

	if (removeGitFolder()) console.log("  ✓ Removed .git");
	if (removeGithubWorkflows()) console.log("  ✓ Removed .github/workflows");
	if (removeChangelog()) console.log("  ✓ Removed CHANGELOG.md");
	if (cleanPackageJson()) console.log("  ✓ Cleaned package.json");

	console.log("");
	reinitGit();
	console.log("  ✓ Git repo re-initialised with initial commit");
	console.log("\n✨ Setup complete – fresh template ready!");
}

main();
