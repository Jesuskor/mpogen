import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
/*  server: {
    port: 5173,
    https: {
      key: 'key.pem',
      cert: 'cert.pem',
    },
    host: '192.168.3.196',
  },*/
  plugins: [
    vue(),
    VitePWA(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
