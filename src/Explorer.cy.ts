import { h } from "vue";
import type { Spec } from "./types";
import Explorer from "./Explorer.vue";
import { explorerStyle } from "./explorerStyle";

const filenames =
  "foo bar baz qux some-spec-with-a-very-very-very-very-very-long-name".split(
    " "
  );
const specs = filenames.map<Spec>((spec) => {
  const relative = `cypress/e2e/${spec}.cy.ts`;
  return {
    relative,
    absolute: `/${relative}`,
    specType: "integration",
  };
});

describe("Explorer", { viewportWidth: 1000, viewportHeight: 660 }, () => {
  it("works", () => {
    const onClose = cy.stub();

    const Parent = h("div", { style: "height: 600px; background: gray;" }, [
      h(Explorer, { specs, onClose }),
    ]);

    cy.mount(() => Parent, {
      styles: [
        // default to visible for component testing
        explorerStyle.replace("display: none", "display: block"),
      ],
    });
    cy.get("#ex-close-explorer")
      .click()
      .then(() => {
        expect(onClose).to.have.been.calledOnce;
      });
  });

  it("scrolls when too many specs", () => {
    const onClose = cy.stub();

    const specs: Spec[] = []
    for (let i = 0; i < 100; i++) {
      specs.push({
        specType: 'integration',
        relative: `./path/to/spec_${i}.js`,
        absolute: `the/abs/so/lute/path/to/spec_${i}.js`
      })
    }

    const Parent = h("div", { style: "height: 600px; background: gray;" }, [
      h(Explorer, { specs, onClose }),
    ]);

    cy.mount(() => Parent, {
      styles: [
        // default to visible for component testing
        explorerStyle.replace("display: none", "display: block"),
      ],
    });
    cy.get("#ex-close-explorer")
      .click()
      .then(() => {
        expect(onClose).to.have.been.calledOnce;
      });
  });
});
