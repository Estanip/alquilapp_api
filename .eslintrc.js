module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for public methods in classes
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused variables starting with underscore
        //'@typescript-eslint/no-explicit-any': 'off', // Allow the use of 'any' type
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }], // Disallow empty functions, except arrow functions
        '@typescript-eslint/no-non-null-assertion': 'off', // Allow non-null assertion operator '!'
        'prettier/prettier': 'error',
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
    ignorePatterns: ['src/**/*.test.ts', 'node_modules', 'dist', '.husky', '.eslintrc.js'],
};
