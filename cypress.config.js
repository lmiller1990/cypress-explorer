const { defineConfig } = require("cypress");
const dedent = require("dedent");
const path = require("path");
const fs = require("fs");
const viteConfig = require("./src/frontend/vite.config");

console.log(viteConfig);

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        runAllSpecs() {
          // const placeholder
          const spec = dedent`
            import './foo.cy.js'
            import './bar.cy.js'
          `;

          try {
            fs.writeFileSync(
              path.join(__dirname, "cypress", "e2e", "temp.cy.js"),
              spec,
              "utf-8"
            );
          } catch (e) {
            console.log("error", e);
          }

          return null;
        },
      });
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig: viteConfig.default,
    },
  },
});
