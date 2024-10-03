import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:3000",
    proxy: {
      "/osint": {
        target: "http://backend:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
