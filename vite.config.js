import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), react()],
  server: {
    host: true,
    port: 80
  },
  resolve: {
    alias: {
      "simple-peer": "simple-peer/simplepeer.min.js",
    }
  }
})
