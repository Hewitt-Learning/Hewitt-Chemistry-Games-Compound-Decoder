import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.vitest": "undefined",
  },
  plugins: [preact()],
  test: {
    includeSource: ["src/**/*.ts", "src/**/*.tsx"],
  },
});
