import express from "express";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post<{}, {}, { projectRoot: string; specs: string[] }>(
  "/writeSpec",
  async (req, res) => {
    console.log(req.body)
    const { projectRoot, specs } = req.body;
    const e2eDir = path.join(projectRoot, "cypress", "e2e")

    const imports = specs
    .filter(spec => {
      // do not include "temp" as a spec - we don't want to
      // import itself, although technically this doesn't seem to
      // do anything anyway.
      return !spec.includes('temp.cy.') 
    })
    .map((spec) => {
      // assumes temp.cy.js is at cypress/e2e
      // and other specs are all inside of cypress/e2e
      // so we need to make them relative to cypress/e2e
      // TODO: generic enough to handle custom directory, etc.
      let relative = spec.replace("cypress/e2e/", "");

      if (relative.endsWith('.ts')) {
        relative = relative.slice(0, relative.length - 3)
      }

      return `import "./${relative}"`
    }).join("\n");

    await fs.promises.writeFile(path.join(e2eDir, "temp.cy.js"), imports, "utf-8");

    res.status(200).end()
  }
);

app.listen(9991, () => console.log("listening on 9991"));
