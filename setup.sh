#!/usr/bin/env bash

remove_git_folder() {
	if [ ! -d .git ]; then return 1; fi
	rm -rf .git
}

remove_github_folder() {
	if [ ! -d .github ]; then return 1; fi
	rm -rf .github
}

remove_changelog() {
	if [ ! -f CHANGELOG.md ]; then return 1; fi
	rm -f CHANGELOG.md
}

clean_package_json() {
	if [ ! -f package.json ]; then return 1; fi
	jq --indent 2 '
		del(.repository, .bugs, .homepage, .author, .keywords,
			.scripts.changelog, .scripts."test:setup")
		| .version = "0.0.0"
		| .description = ""
	' package.json > package.json.tmp &&
		mv package.json.tmp package.json
}

reinit_git() {
	git init
	git add -A
	git commit -m "Initial commit"
}

main() {
	echo "Cleaning template..."
	echo ""

	if remove_git_folder; then echo "  ✓ Removed .git"; fi
	if remove_github_folder; then echo "  ✓ Removed .github"; fi
	if remove_changelog; then echo "  ✓ Removed CHANGELOG.md"; fi
	if clean_package_json; then echo "  ✓ Cleaned package.json"; fi

	echo ""
	reinit_git
	echo "  ✓ Git repo re-initialised with initial commit"
	echo ""
	echo "✨ Setup complete – fresh template ready!"
}

main
