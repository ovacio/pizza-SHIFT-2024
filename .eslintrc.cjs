module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'filename-rules', 'prettier', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^react', '^@?\\w'],
        ['^'],
        ['^\\.'],
        ['^.+\\.s?scss$']
      ]
    }],
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
  },
};
