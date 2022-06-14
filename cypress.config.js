const { defineConfig } = require("cypress");
const dedent = require("dedent");
const path = require("path");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
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
