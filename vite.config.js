import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
=======
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
>>>>>>> 2025e0cef77adc3ebc48ebe2a28fef7d40e023b8
  plugins: [react()],
});
