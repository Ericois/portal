import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "./");

  return {
    plugins: [react()],
    base: "/",
    css: {
      preprocessorOptions: {
        css: {
          charset: false,
        },
      },
    },
    build: {
      outDir: "dist",
    },
    server: {
      port: 5173,
    },
    envDir: "./",
    envPrefix: "VITE_",
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
    },
  };
});
