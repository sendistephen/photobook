import babelParser from '@babel/eslint-parser';
import importPlugin from 'eslint-plugin-import';
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules/**', 'dist/**', 'eslint.config.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        requireConfigFile: false,
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      jsxA11y,
      prettier,
      react,
      reactHooks,
      'simple-import-sort': simpleImportSort,
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
