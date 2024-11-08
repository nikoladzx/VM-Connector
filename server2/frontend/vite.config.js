import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows the server to be accessible externally
    port: 3232, // You can change this to any port you prefer
    strictPort: true, // This ensures Vite uses the exact port specified
  },
})