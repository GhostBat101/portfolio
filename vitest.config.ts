/**
 * VitestConfig: Test runner configuration isolating unit tests from Playwright E2E suites.
 * Communicates with: vite.config.ts, tests/scanner.test.ts, and package.json.
 */
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
