import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  server: {
    port: 5174,
    open: true,
    host: true // enable network access
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  optimizeDeps: {
    include: ['voximplant-websdk']
  }
}); 