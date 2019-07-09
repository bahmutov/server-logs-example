// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Add API', () => {
  it('adds 2 todos', function () {
    cy.get('.new-todo')
      .type('learn testing{enter}')
      .type('be cool{enter}')
    cy.get('.todo-list li').should('have.length', 2)
  })
})
