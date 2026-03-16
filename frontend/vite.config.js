import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: { usePolling: true },
    proxy: {
      // Forward /api/* → http://backend/api/*
      // No rewrite needed — index.php strips /api itself
      '/api': {
        target: 'http://backend',
        changeOrigin: true,
      }
    }
  }
})
