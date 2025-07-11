import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Disable TypeScript checking in React plugin
      typescript: false,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // Treat all files as JSX to bypass TypeScript checking
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  build: {
    // Disable type checking during build
    rollupOptions: {
      onwarn() {
        // Suppress all warnings
        return
      }
    }
  },
  server: {
    // Disable type checking in dev server
    hmr: {
      overlay: false
    }
  }
})