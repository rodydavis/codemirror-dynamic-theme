import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/codemirror-dynamic-theme/",
  build: {
    lib: {
      entry: "src/code-window.ts",
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
