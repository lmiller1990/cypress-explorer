import { defineConfig } from "cypress";
import { startExplorerServer } from "./plugin/server";

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await startExplorerServer();
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
