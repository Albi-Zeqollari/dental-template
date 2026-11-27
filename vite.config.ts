import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two static pages: the clinic site and the privacy policy.
// The build output (dist/) can be dropped on any static host.
export default defineConfig({
  // Relative asset paths, so the build works under any sub-path
  // (GitHub Pages serves it at /dental-template/) and on a clinic's own domain.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
      },
    },
  },
});
