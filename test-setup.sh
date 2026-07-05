#!/usr/bin/env bash

TEMP_DIR="temp"
SRC_DIR="$(pwd)"
FAILED=0

cleanup_temp() {
	if [ -d "$TEMP_DIR" ]; then
		rm -rf "$TEMP_DIR"
	fi
}

copy_project() {
	echo "Copying project to $TEMP_DIR/ ..."
	mkdir -p "$TEMP_DIR"

	rsync -a \
		--exclude='node_modules' \
		--exclude='.git' \
		--exclude='.turbo' \
		--exclude='temp' \
		--exclude='dist' \
		--exclude='build' \
		--exclude='.env' \
		--exclude='.env.*' \
		"$SRC_DIR"/ "$TEMP_DIR"/
}

run_setup() {
	echo ""
	echo "Running setup.sh in $TEMP_DIR/ ..."
	(cd "$TEMP_DIR" && bash setup.sh)
	echo ""
}

validate_no_github_folder() {
	if [ ! -d "$TEMP_DIR/.github" ]; then
		echo "  ✓ .github removed"
	else
		echo "  ✗ .github still present"
		FAILED=1
	fi
}

validate_no_changelog() {
	if [ ! -f "$TEMP_DIR/CHANGELOG.md" ]; then
		echo "  ✓ CHANGELOG.md removed"
	else
		echo "  ✗ CHANGELOG.md still present"
		FAILED=1
	fi
}

validate_git_repo() {
	if [ -d "$TEMP_DIR/.git" ] && git -C "$TEMP_DIR" rev-parse --git-dir > /dev/null 2>&1; then
		echo "  ✓ .git is a valid git repo"
	else
		echo "  ✗ .git is missing or invalid"
		FAILED=1
	fi
}

validate_pkg_field() {
	local label="$1" filter="$2"
	if jq -e "$filter" "$TEMP_DIR/package.json" > /dev/null 2>&1; then
		echo "  ✓ $label"
	else
		echo "  ✗ $label"
		FAILED=1
	fi
}

validate_package_json() {
	local pkg="$TEMP_DIR/package.json"
	if [ ! -f "$pkg" ]; then
		echo "  ✗ package.json not found"
		FAILED=1
		return
	fi

	echo ""
	echo "--- package.json validation ---"

	validate_pkg_field "repository removed" '.repository == null'
	validate_pkg_field "bugs removed" '.bugs == null'
	validate_pkg_field "homepage removed" '.homepage == null'
	validate_pkg_field "author removed" '.author == null'
	validate_pkg_field "keywords removed" '.keywords == null'
	validate_pkg_field "scripts.changelog removed" '.scripts.changelog == null'
	validate_pkg_field "scripts.test:setup removed" '.scripts."test:setup" == null'

	local version
	version=$(jq -r '.version' "$pkg")
	if [ "$version" = "0.0.0" ]; then
		echo "  ✓ version reset to 0.0.0"
	else
		echo "  ✗ version is '$version' (expected 0.0.0)"
		FAILED=1
	fi

	local desc
	desc=$(jq -r '.description // ""' "$pkg")
	if [ -z "$desc" ]; then
		echo "  ✓ description reset to empty"
	else
		echo "  ✗ description is '$desc' (expected empty)"
		FAILED=1
	fi
}

show_final_state() {
	echo ""
	echo "--- Final project state ---"
	echo ""
	echo "Directory contents:"
	ls -la "$TEMP_DIR"
	echo ""
	echo "package.json:"
	jq '.' "$TEMP_DIR/package.json"
	echo ""
	echo "Git log:"
	git -C "$TEMP_DIR" log --oneline -3
}

main() {
	echo "============================================"
	echo "  test-setup.sh — validate setup.sh"
	echo "============================================"
	echo ""

	cleanup_temp
	copy_project
	run_setup

	echo "=== Validation ==="
	echo ""
	validate_git_repo
	validate_no_github_folder
	validate_no_changelog
	validate_package_json

	show_final_state

	echo ""
	if [ "$FAILED" -eq 0 ]; then
		echo "✅ All validations passed!"
	else
		echo "❌ Some validations FAILED."
	fi
	echo ""
	echo "Inspect the result at: $SRC_DIR/$TEMP_DIR/"

	exit "$FAILED"
}

main
