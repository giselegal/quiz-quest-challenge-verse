import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Removendo o componentTagger temporariamente para debug
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    open: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  publicDir: path.resolve(__dirname, "client", "public"),
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip'
    ]
  },
  define: {
    global: 'globalThis',
  }
}));
