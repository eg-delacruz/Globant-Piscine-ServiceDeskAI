import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@state': path.resolve(__dirname, 'src/state'),
    },
  },

  server: {
    // Other server options...
    watch: {
      // Use polling to detect file changes in the Docker volume
      usePolling: true,
      // Optional: Increase the polling interval if needed, though 100ms is usually fine
      interval: 100,
      ignored: ['**/node_modules/**', '**/.pnpm-store/**', '**/dist/**'],
    },
  },
});
