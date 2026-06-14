#!/usr/bin/env bash

# Update root package.json deps
root_name="."
root_outdated_output=$(pnpm outdated 2>&1)
if [ -n "$(echo "$root_outdated_output" | tr -d '[:space:]')" ]; then
    echo "=== $root_name ==="
    echo "$root_outdated_output"
    echo
    read -p "  Update $root_name? [y/N] " -r reply
    if [[ "$reply" =~ ^[Yy]$ ]]; then
        pnpm update --latest || echo "  ✗ Update failed for $root_name"
    else
        echo "  Skipped"
    fi
    echo
fi

# Update apps and packages
for dir in apps/*/ packages/*/; do
    [ -f "$dir/package.json" ] || continue
    name="${dir%/}"
    echo "=== $name ==="
    
    outdated_output=$(cd "$dir" && pnpm outdated 2>&1)
    
    if [ -z "$(echo "$outdated_output" | tr -d '[:space:]')" ]; then
        echo "  ✓ Up to date"
        echo
        continue
    fi
    
    echo "$outdated_output"
    echo
    read -p "  Update $name? [y/N] " -r reply
    if [[ "$reply" =~ ^[Yy]$ ]]; then
        (cd "$dir" && pnpm update --latest) || echo "  ✗ Update failed for $name"
    else
        echo "  Skipped"
    fi
    echo

done