import js from '@eslint/js';

export default [
  { ignores: ['node_modules/', 'coverage/'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { process: 'readonly', console: 'readonly', URL: 'readonly' },
    },
  },
  
  {
    files: ['k6/**/*.js'],
    languageOptions: { globals: { __ENV: 'readonly' } },
  },

];
