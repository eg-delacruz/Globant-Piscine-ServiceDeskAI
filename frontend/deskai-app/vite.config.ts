import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // Other server options...
    watch: {
      // Use polling to detect file changes in the Docker volume
      usePolling: true,
      // Optional: Increase the polling interval if needed, though 100ms is usually fine
      interval: 100,
    },
  },
});
