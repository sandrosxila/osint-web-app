import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  console.log(mode, env);

  return ({
    plugins: [react(), svgr()],
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:3000",
      proxy: {
        "/osint": {
          target: env.VITE_TARGET_PROXY,
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
  })
});
