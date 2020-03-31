---
to: src/state/modules/<%= h.changeCase.kebab(name) %>.unit.ts
---
<%
  const fileName = h.changeCase.kebab(name)
  const importName = h.changeCase.camel(fileName) + 'Module'
  const stateName = h.changeCase.camel(fileName) + 'State'
%>import { Store } from 'vuex';
import { createModuleStore } from "@/tests/unit/VueHelpers";
import * as <%= importName %> from './<%= fileName %>'

describe('@state/modules/<%= fileName %>', () => {
  it('exports a valid Vuex module', () => {
    expect(<%= importName %>).toBeAVuexModule();
  });

  describe('XXX', () => {
    let store: Store< <%= importName %>.<%= stateName %> >;
    beforeEach(() => {
      store = createModuleStore(<%= importName %>.store);
    })

    it('true is truthy', () => {
      // Arrange
      expect.assertions(1);
      // Act
      const x = true;
      // Assert
      expect(x).toBeTruthy();
    });
  });
});
