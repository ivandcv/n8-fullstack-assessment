import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
   },
   server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://127.0.0.1:8080",
   },
   resolve: {
    alias: {
      "@contexts": "/src/contexts",
      "@components": "/src/components",
      "@lib": "/src/lib",
      "@hooks": "/src/hooks",
    },
   }
})
