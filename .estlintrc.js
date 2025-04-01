module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Auto-detect React version
    },
  },
  rules: {
    'react/prop-types': 'off', // TypeScript handles this
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': ['warn'], // Warn on console logs
    'react-hooks/exhaustive-deps': 'warn', // Enforce hook dependencies
    'prettier/prettier': 'error', // Enforce Prettier formatting
  },
}
