/** @type {import('eslint').Flat.Config[]} */

import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    settings: {
      next: {
        rootDir: ".",
      },
    },
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules
    }
  }
];