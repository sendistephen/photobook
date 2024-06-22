module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unsafe-assignment': 'off', // Temporarily disable
    '@typescript-eslint/no-unsafe-member-access': 'off', // Temporarily disable
    '@typescript-eslint/no-unsafe-call': 'off', // Temporarily disable
    '@typescript-eslint/no-unsafe-return': 'off', // Temporarily disable
    '@typescript-eslint/no-unsafe-argument': 'off', // Temporarily disable
    '@typescript-eslint/no-misused-promises': 'off', // Temporarily disable
    '@typescript-eslint/no-floating-promises': 'off', // Temporarily disable
    'react-hooks/exhaustive-deps': 'off', // Temporarily disable
  },
};
