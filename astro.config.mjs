// @ts-check
import { defineConfig } from "astro/config";

import lenis from "astro-lenis";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 4321,
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },

  integrations: [lenis(), react()],
});