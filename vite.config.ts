import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const srcPath = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: srcPath },
      { find: "@components", replacement: resolve(srcPath, "components") },
      { find: "@constants", replacement: resolve(srcPath, "constants") },
      { find: "@context", replacement: resolve(srcPath, "context") },
      { find: "@hooks", replacement: resolve(srcPath, "hooks") },
      { find: "@mocks", replacement: resolve(srcPath, "mocks") },
      { find: "@pages", replacement: resolve(srcPath, "pages") },
      { find: "@assets", replacement: resolve(srcPath, "assets") },
      { find: "@api", replacement: resolve(srcPath, "api") },
    ],
  },
  base: "/react-shopping-products/dist",
});
