// loads Cypress types + definition for custom "cy.api" command
/// <reference types="@bahmutov/cy-api" />

const pickImportantMessages = ({ body, messages }) => {
  const computations = Cypress._.filter(messages, {
    type: 'debug',
    namespace: 'compute'
  })
  return {
    result: body,
    backendMessages: Cypress._.map(computations, 'message')
  }
}

it('performs expected computations', () => {
  cy.api(
    {
      url: '/?a=2&b=3'
    },
    '2 + 3'
  )
    .then(pickImportantMessages)
    .toMatchSnapshot()

  cy.api(
    {
      url: '/?a=-1&b=30'
    },
    '-1 + 30'
  )
    .then(pickImportantMessages)
    .toMatchSnapshot()

  cy.api(
    {
      url: '/?a=+1&b=+2'
    },
    '+1 + 2'
  )
    .then(pickImportantMessages)
    .toMatchSnapshot()
})
