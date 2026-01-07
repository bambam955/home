import eslintAstroPlugin from 'eslint-plugin-astro';
import typescriptEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';
import globals from 'globals';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  ...eslintAstroPlugin.configs.recommended,
  ...typescriptEslint.configs.recommended,
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
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  },
];

export default config;
