import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import {api } from "@/store/index.js"

//const api = import.meta.env.VITE_API_URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server:{
    port: 3000,
    proxy: {
      '/api':{
         target: "http://localhost:5000/",
        //target: import.meta.env.VITE_API_URL,
        // target: api,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
