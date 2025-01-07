import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optionally specify port
    strictPort: true // Prevent Vite from trying other ports
  },
  build: {
    outDir: 'build'
  }
});
