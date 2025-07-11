import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use pure JavaScript mode to bypass TypeScript
      jsxRuntime: 'automatic',
      babel: {
        configFile: false,
        babelrc: false,
        plugins: [],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Completely disable TypeScript processing
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.(jsx?|tsx?)$/,
    exclude: /node_modules/,
    target: 'esnext',
    format: 'esm'
  },
  build: {
    // Disable all checking during build
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      onwarn: () => {} // Ignore all warnings
    }
  }
})