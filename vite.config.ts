import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          spline: ['@splinetool/runtime'],
          gsap: ['gsap', 'lenis'],
          motion: ['framer-motion'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
