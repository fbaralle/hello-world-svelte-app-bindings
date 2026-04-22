import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// User's custom Vite configuration
export default defineConfig({
  base: process.env.COSMIC_MOUNT_PATH || process.env.VITE_BASE_PATH || '',
  plugins: [svelte()],
  define: {
    'import.meta.env.APP_PUBLIC_API_PATH': JSON.stringify(process.env.APP_PUBLIC_API_PATH || '')
  },
  build: {
    sourcemap: true,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
  },
});
