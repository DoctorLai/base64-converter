import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Note: test configuration lives in vitest.config.js.
export default defineConfig({
  base: '/base64-converter/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['crypto-browserify'],
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
});
