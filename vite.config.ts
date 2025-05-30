import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {
      VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
      VITE_SUPABASE_ANON_KEY: JSON.stringify(
        process.env.VITE_SUPABASE_ANON_KEY
      ),
      VITE_MODERATION_URL: JSON.stringify(process.env.VITE_MODERATION_URL),
      VITE_PUBLIC_TEST_MODERATION_URL: JSON.stringify(
        process.env.VITE_PUBLIC_TEST_MODERATION_URL
      ),
      VITE_PUBLIC_MODERATION_API_KEY: JSON.stringify(
        process.env.VITE_PUBLIC_MODERATION_API_KEY
      ),
    },
  },
}));

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: "dist",
//   },
//   server: {
//     middlewareMode: true,
//   },
// });
