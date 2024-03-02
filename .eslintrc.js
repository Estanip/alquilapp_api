module.exports = {
    root: true,
    env: {
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: { project: ['./tsconfig.json'] },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
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
