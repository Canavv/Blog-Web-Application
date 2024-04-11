import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://simple-book-api.onrender.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/update": {
        target: "https://simple-book-api.onrender.com",
      },
      "/remove": {
        target: "https://simple-book-api.onrender.com",
      },
    },
  },
  plugins: [react()],
});
