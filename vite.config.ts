import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/codemirror-dynamic-theme/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
