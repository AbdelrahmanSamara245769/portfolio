import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite's options are documented at https://vite.dev/config/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
