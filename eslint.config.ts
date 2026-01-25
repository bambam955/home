import eslintAstroPlugin from 'eslint-plugin-astro';
import typescriptEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';
import globals from 'globals';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  eslintJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...eslintAstroPlugin.configs.recommended,
  {
    ignores: ['.astro/**'],
  },
  // {
  //   files: ['src/scripts/*.js'],
  //   languageOptions: {
  //     globals: globals.browser,
  //   },
  // },
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: globals.browser,
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
