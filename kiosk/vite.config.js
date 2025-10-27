import { defineConfig } from 'vite';

export default defineConfig({
  base: '/0825/kiosk/',
  server: {
    port: 3001,
    host: true,
  },
  build: {
    outDir: 'dist',
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
  },
});
