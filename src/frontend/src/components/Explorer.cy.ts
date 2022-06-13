import { h } from "vue";
import { Spec } from "../main";
import Explorer from "./Explorer.vue";

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
    const onClose = cy.stub()

    const Parent = h("div", { style: "height: 600px; background: gray;" }, [
      h(Explorer, { specs, onClose }),
    ]);

    cy.mount(() => Parent);
    cy.get('#ex-close-explorer').click().then(() => {
      expect(onClose).to.have.been.calledOnce
    })
  });
});
