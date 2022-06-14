import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import Debug from "debug";

const debug = Debug("cypress-explorer:server");

const PORT = 9991;

export function startExplorerServer() {
  return new Promise<void>((resolve, reject) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.post<{}, {}, { projectRoot: string; specs: string[] }>(
      "/writeSpec",
      async (req, res) => {
        const { projectRoot, specs } = req.body;
        debug("projectRoot: %s specs %o", projectRoot, specs);

        const e2eDir = path.join(projectRoot, "cypress", "e2e");
        debug("e2eDir is set to %s", e2eDir);

        const isUsingTs = specs.some((x) => x.endsWith(".ts"));

        const imports = specs
          .filter((spec) => {
            // do not include "temp" as a spec - we don't want to
            // import itself, although technically this doesn't seem to
            // do anything anyway.
            return !spec.includes(`_cypress-explorer.cy`);
          })
          .map((spec) => {
            // assumes temp.cy.js is at cypress/e2e
            // and other specs are all inside of cypress/e2e
            // so we need to make them relative to cypress/e2e
            // TODO: generic enough to handle custom directory, etc.
            let relative = spec.replace("cypress/e2e/", "");

            if (relative.endsWith(".ts")) {
              relative = relative.slice(0, relative.length - 3);
            }

            return `import "./${relative}"`;
          })
          .join("\n");

        const specFileName = `_cypress-explorer.cy.${isUsingTs ? "ts" : "js"}`;
        const tempSpec = path.join(e2eDir, specFileName);

        debug("creating temp spec %s containing %s", tempSpec, imports);

        fs.writeFileSync(tempSpec, imports, "utf-8");

        const specFileRel = path.join('cypress', 'e2e', specFileName)

        res.status(200).json({
          specFile: specFileRel,
        });
      }
    );

    app.listen(PORT, () => {
      console.log(`[Cypress Explorer]: Listening on port ${PORT}`);
      resolve();
    });
  });
}
