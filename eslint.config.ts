import eslintAstroPlugin from 'eslint-plugin-astro';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';
import globals from 'globals';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  ...eslintAstroPlugin.configs.recommended,
  {
    ignores: ['.astro/**'],
  },
  {
    files: ['src/scripts/*.js'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'],
      ...typescriptEslintPlugin.configs.recommended.rules,
    },
  },
];

export default config;
