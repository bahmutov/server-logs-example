// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Add API', () => {
  it('adds numbers', function () {
    cy.api(
      {
        url: '/',
        qs: {
          a: 2,
          b: 3
        }
      },
      '2 + 3'
    )
  })
})
