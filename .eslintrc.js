module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for public methods in classes
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused variables starting with underscore
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }], // Disallow empty functions, except arrow functions
    '@typescript-eslint/no-non-null-assertion': 'off', // Allow non-null assertion operator '!'
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
  },
  ignorePatterns: ['node_modules', 'dist', '.husky', '.eslintrc.js'],
};
