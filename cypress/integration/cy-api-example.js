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

it('adds and subtracts', function () {
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
    .its('body')
    .should('equal', '5')
  cy.api(
    {
      url: '/',
      qs: {
        a: 2,
        b: -6
      }
    },
    '2 - 6'
  )
    .its('body')
    .should('equal', '-4')
  cy.api(
    {
      url: '/',
      qs: {
        a: -10,
        b: 0
      }
    },
    '-10 + 0'
  )
    .its('body')
    .should('equal', '-10')
})
