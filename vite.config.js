import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("Env: ", env);
  const proxy = {
    "/api": {
      target: env.VITE_API_URL,
      changeOrigin: true,
      secure: false,
    },
  };

  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    server: {
      port: 3000,
      proxy,
    },
  });
};
