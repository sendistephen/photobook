import babelParser from '@babel/eslint-parser';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vitest from 'eslint-plugin-vitest';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}', '**/*.test.{js}'],
    ignores: ['node_modules/**', 'dist/**', 'eslint.config.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        requireConfigFile: false,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        document: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      jsxA11y,
      prettier,
      react,
      reactHooks,
      'simple-import-sort': simpleImportSort,
      vitest,
    },
    rules: {
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'no-unused-vars': [
        'error',
        { args: 'after-used', ignoreRestSiblings: true },
      ],

      'prettier/prettier': 'error',
      'react/jsx-uses-react': 2,
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          allowSeparatedGroups: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
