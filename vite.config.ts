import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // Lovable CDN assets — proxied in dev; nginx does the same in production.
      "/__l5e": {
        target: "https://zeta-techs.lovable.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
