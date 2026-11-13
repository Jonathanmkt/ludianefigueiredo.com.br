import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import textosParaOsPais from "./scripts/vite-textos.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react(), textosParaOsPais({ pasta: path.resolve(__dirname, "./src/conteudo/para-os-pais") })],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
