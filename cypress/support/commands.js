// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import * as Explorer from '../../src/frontend/dist/cypress-explorer.es'
// import explorerStyle from '../../src/frontend/dist/style.css'

async function fetchSpecs() {
  const res = await window.fetch("http://localhost:4444/__launchpad/graphql?", {
    headers: {
      accept: "application/json",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "proxy-connection": "keep-alive",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrer: "http://localhost:4444/",
    referrerPolicy: "origin",
    body: '{"query":"query Explorer {\\n  currentProject {\\n    projectRoot\\n    specs {\\n      specType\\n      relative\\n    }\\n  }\\n}","variables":null,"operationName":"Explorer"}',
    method: "POST",
    mode: "cors",
    credentials: "omit",
  });
  return res.json();
}

async function writeSpecs(projectRoot, specs) {
  const data = JSON.stringify({
    projectRoot,
    specs,
  });

  try {
    const res = await window.fetch("http://localhost:9991/writeSpec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    });
    if (res.ok) {
      console.log("ok");
    } else {
      console.log("uh oh", res);
    }
  } catch (e) {
    console.error("Error!", e);
  }
}

Cypress.Commands.add('fetchSpecs', fetchSpecs)
Cypress.Commands.add('writeSpecs', writeSpecs)

before(async () => {
  const runner = window.top;
  const root = runner.document.querySelector("#app");

  const explorer = runner.document.querySelector("#explorer")
  if (explorer) {
    explorer.remove()
  }

  function injectStylesheet (css) {
    const style = document.createElement("style");
    style.textContent = css
    runner.document.head.appendChild(style);
  }

  injectStylesheet(`
    #explorer {
      position: absolute;
      left: 0; 
      right: 0; 
      margin-left: auto; 
      margin-right: auto; 
      width: 800px;
      top: 50px;
      height: 500px;
      z-index: 500;
    }
  `);

  // injectStylesheet(explorerStyle)

  let projectRoot
  let specs

  const explorerMountPoint = document.createElement("div");
  explorerMountPoint.id = "explorer";
  // modal.innerText = "hello " + Math.random().toFixed(5);
  // const button = document.createElement('button')
  // button.innerText = 'ok'
  // modal.appendChild(button)

  // button.onclick = () => {
  //   console.log('make request')
  //   cy.writeSpecs(projectRoot, specs)
  // }

  root.insertAdjacentElement("afterbegin", explorerMountPoint);
  const mount = Explorer.createExplorer(explorerMountPoint, { specs: [] })
  mount()
  return

  // projectRoot: string
  // specs: Array<{ specType: integration | component, relative: cypress/e2e/<spec> }>
  const { data } = await cy.fetchSpecs();
  console.log('ok!1', data)
  // projectRoot = data.currentProject.projectRoot
  // specs = data.currentProject.specs.map(x => x.relative)

});
