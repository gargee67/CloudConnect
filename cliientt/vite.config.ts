import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util',
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/thirdweb-api': {
        target: 'https://11155111.rpc.thirdweb.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/thirdweb-api/, ''),
      },
    },
  },
});






/*import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  plugins: [react()],
});*/
