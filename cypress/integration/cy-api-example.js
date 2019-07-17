// loads Cypress types + definition for custom "cy.api" command
/// <reference types="@bahmutov/cy-api" />
it('adds 2 + 3 (cy.api)', function () {
  cy.api({
    url: '/',
    qs: {
      a: 2,
      b: 3
    }
  })
    .its('body')
    .should('equal', '5')
})
