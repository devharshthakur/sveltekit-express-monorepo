import config from '@packages/prettier-config';

/** @type {import('prettier').Config} */
export default {
	...config,
	arrowParens: 'always',
	endOfLine: 'lf'
};
