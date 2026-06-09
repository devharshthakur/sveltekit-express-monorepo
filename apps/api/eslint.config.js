import { baseConfig, prettierConfig, ts } from '@packages/eslint-config';

export default ts.config(
	{
		ignores: ['build/**', 'node_modules/**', 'dist/**', '**/*.d.ts']
	},
	...baseConfig,
	...ts.configs.recommendedTypeChecked,
	prettierConfig,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' }
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error'
		}
	},
	{
		files: ['**/*.js', '**/*.mjs'],
		...ts.configs.disableTypeChecked
	}
);
