import { createCustomLayerRenderer } from '../helper/customLayerRenderer';

before(() => {
  cy.visit('/dist');
});

describe('CREATE TYPE', () => {
  const CustomRenderer = createCustomLayerRenderer();
  const data = [
    { name: 'Lee', age: 20 },
    { name: 'Han', age: 28 },
    { name: 'Ryu', age: 22 },
  ];

  ['renderer', 'renderer type'].forEach((option) => {
    it(`create custom renderer by ${option} property`, () => {
      const columns = [
        { name: 'name' },
        {
          name: 'age',
          renderer: option === 'renderer' ? CustomRenderer : { type: CustomRenderer },
        },
      ];

      cy.createGrid({ data, columns });

      cy.get('input[type=range]').should('have.length', data.length);
    });
  });
});
