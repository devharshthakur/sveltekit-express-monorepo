import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const apiPkgPath = resolve(import.meta.dirname, '../package.json');
const buildDir = resolve(import.meta.dirname, '../build');

const { dependencies } = JSON.parse(readFileSync(apiPkgPath, 'utf8')) as {
	dependencies?: Record<string, string>;
};

const pkg = {
	type: 'module',
	main: './main.js',
	dependencies
};

writeFileSync(resolve(buildDir, 'package.json'), JSON.stringify(pkg, null, '\t') + '\n');
console.log('Generated build/package.json');
