import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      src: '/src',
    },
  },
  build: {
    outDir: 'build',
  },
});
