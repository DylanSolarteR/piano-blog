// @ts-check
import { defineConfig } from "astro/config";

import lenis from "astro-lenis";

import react from "@astrojs/react";

import svgr from "vite-plugin-svgr";

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
    plugins: [
      svgr({
        include: "**/*.svg?react",
        svgrOptions: {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgoConfig: {
            plugins: [
              "preset-default",
              "removeTitle",
              "removeDesc",
              "removeDoctype",
              "cleanupIds",
            ],
          },
        },
      }),
    ],
  },

  integrations: [lenis(), react()],
});
