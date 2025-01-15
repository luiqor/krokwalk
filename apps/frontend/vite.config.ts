import { type ConfigEnv, defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_APP_API_ORIGIN_URL,
    VITE_APP_DEVELOPMENT_PORT,
    VITE_APP_PROXY_SERVER_URL,
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: "~",
          replacement: fileURLToPath(new URL("src", import.meta.url)),
        },
      ],
    },
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
      proxy: {
        [VITE_APP_API_ORIGIN_URL as string]: {
          changeOrigin: true,
          target: VITE_APP_PROXY_SERVER_URL,
        },
      },
    },
  });
};

export default config;
