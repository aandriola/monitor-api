import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig({
  test: {
    // carrega o .env localmente (no CI vêm do próprio ambiente)
    env: loadEnv('', process.cwd(), ''),
    // os testes de integração usam o mesmo banco: rodar um arquivo por vez
    fileParallelism: false,
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/server.js'],
      thresholds: { lines: 70, functions: 70, branches: 70, statements: 70 },
    },
  },
});
