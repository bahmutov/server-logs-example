// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
it('adds 2 + 3', function () {
  cy.request({
    url: '/',
    qs: {
      a: 2,
      b: 3
    }
  })
    .its('body')
    .should('equal', '5')
})
