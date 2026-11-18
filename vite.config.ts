import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
const root = path.resolve("src");
export default defineConfig(({ mode, isSsrBuild }) => ({
  plugins: [react()],
  define: { global: "globalThis" },
  base: loadEnv(mode, process.cwd(), "").VITE_BASE_PATH || "/",
  resolve: {
    alias: [
      ...[
        "classic",
        "assets",
        "components",
        "views",
        "hoc",
        "store",
        "variables",
        "layouts",
        "routes",
      ].map((name) => ({ find: name, replacement: path.join(root, name) })),
      { find: "aws-amplify", replacement: path.resolve("src/classic/auth.js") },
      {
        find: "aws-sdk/clients/dynamodb",
        replacement: path.resolve("src/classic/dynamo.js"),
      },
      { find: "aws-sdk", replacement: path.resolve("src/classic/aws.js") },
      {
        find: "bootpay-js",
        replacement: path.resolve("src/classic/payment.js"),
      },
    ],
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": { target: "http://127.0.0.1:4173", changeOrigin: false },
      "/classic": { target: "http://127.0.0.1:4173", changeOrigin: false },
    },
  },
  preview: { port: 4173, strictPort: true },
  build: { target: "es2022", copyPublicDir: !isSsrBuild },
}));
