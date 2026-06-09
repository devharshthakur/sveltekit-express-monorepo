import config from '@packages/prettier-config';

/** @type {import('prettier').Config} */
export default {
	...config,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	],
	tailwindStylesheet: './src/routes/layout.css'
};
