import eslintAstroPlugin from 'eslint-plugin-astro';
import typescriptEslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...eslintAstroPlugin.configs.recommended,
  {
    ignores: ['.astro/**'],
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  eslintConfigPrettier, // Disables ESLint rules that conflict with Prettier
];

export default config;
