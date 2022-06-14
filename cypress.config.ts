import { defineConfig } from "cypress";
import { startExplorerServer } from "./plugin/server";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      startExplorerServer();
      return config;
    },
  },

  component: {
    specPattern: "src/**/*.cy.*",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
