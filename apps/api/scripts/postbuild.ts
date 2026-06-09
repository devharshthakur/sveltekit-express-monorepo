// <refrence node>
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const buildDir = resolve(import.meta.dirname, '../build');
const pkgPath = resolve(buildDir, 'package.json');

const pkg = {
	type: 'module',
	imports: {
		'$lib/*': './lib/*',
		'$middlewares/*': './middlewares/*',
		'$routes/*': './routes/*',
		'$services/*': './services/*'
	}
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, '\t') + '\n');
console.log('Generated build/package.json');
