import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite'

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['./src/styles'],
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: true,
      enabled: true,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [
    tailwindcss(),
    react({
      // Add fast refresh for React components
      fastRefresh: true,
    }),
    environment("all", { prefix: "CANISTER" }),
    environment("all", { prefix: "DFX" }),
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
    dedupe: ['@dfinity/agent'],
  },
});