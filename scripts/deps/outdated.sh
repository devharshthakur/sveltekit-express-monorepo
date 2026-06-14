#!/usr/bin/env bash
set -e

for dir in apps/*/ packages/*/; do
    [ -f "$dir/package.json" ] || continue
    name="${dir%/}"
    echo "=== $name ==="
    (cd "$dir" && pnpm outdated)
    echo

done