import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mkcert(), react()],
  server: {
    https: {
      key: './certs/private.key',
      cert: './certs/certificate.crt'
    },
    host: true,
    port: 8443
  },
  resolve: {
    alias: {
      "simple-peer": "simple-peer/simplepeer.min.js",
    }
  }
})
