import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
      vue(),
    Sitemap({
      hostname: 'https://wenovat.com',  // Remplace par ton domaine
      // Optionnel : routes dynamiques si tu en as
      dynamicRoutes: ["/methode", "/nous-contacter" , "/a-propos"
        // Exemples : '/methode', '/articles/quelque-chose'
      ],
      outDir: 'dist', // par défaut
      extensions: ['html'], // par défaut ; ce qui est généré
      // autres options : changefreq, priority, etc. :contentReference[oaicite:1]{index=1}
    })],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
})
