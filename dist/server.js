"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startExplorerServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)("cypress-explorer:server");
const PORT = 9991;
function startExplorerServer() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
    app.post("/writeSpec", async (req, res) => {
        const { projectRoot, specs } = req.body;
        debug("projectRoot: %s specs %o", projectRoot, specs);
        const e2eDir = path_1.default.join(projectRoot, "cypress", "e2e");
        debug("e2eDir is set to %s", e2eDir);
        const imports = specs
            .filter((spec) => {
            // do not include "temp" as a spec - we don't want to
            // import itself, although technically this doesn't seem to
            // do anything anyway.
            return !spec.includes("temp.cy.");
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
        const tempSpec = path_1.default.join(e2eDir, "temp.cy.js");
        debug("creating temp spec %s containing %s", tempSpec, imports);
        await fs_1.default.promises.writeFile(tempSpec, imports, "utf-8");
        res.status(200).end();
    });
    app.listen(PORT, () => console.log(`[Cypress Explorer]: Listening on port ${PORT}`));
}
exports.startExplorerServer = startExplorerServer;
//# sourceMappingURL=server.js.map