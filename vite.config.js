import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 89,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 89,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 89,
      },
    }),
  ],
  build: {
    outDir: 'docs',
  },
  base: './'
})
