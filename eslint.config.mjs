import eslintAstroPlugin from 'eslint-plugin-astro';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';
import globals from 'globals';

export default [
  eslintJs.configs.recommended, // Base recommended ESLint rules
  ...eslintAstroPlugin.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts,astro}'],
    languageOptions: {
      parser: typescriptEslintPlugin.parser, // Use TypeScript parser
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin, // TypeScript plugin
      prettier: prettierPlugin, // Prettier plugin
    },

    // Customize other rules here if needed
    rules: {
      'prettier/prettier': ['error'], // Enforce Prettier strictly
      ...typescriptEslintPlugin.configs.recommended.rules, // Additional recommended TypeScript rules
    },
  },
];
