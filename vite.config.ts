import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd', '@ant-design/icons'],
          state: ['@reduxjs/toolkit', 'react-redux', '@tanstack/react-query']
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
});
