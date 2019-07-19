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
      url: '/?a=30&b=-1'
    },
    '30 - 1'
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

it('computes all given examples', () => {
  const list = []
  const addToList = list.push.bind(list)
  ;[
    // all examples to compute
    '/?a=2&b=3',
    '/?a=30&b=-1',
    '/?a=+1&b=+2'
  ].forEach(url => {
    cy.api({ url })
      .then(pickImportantMessages)
      .then(addToList)
  })
  cy.wrap(list).toMatchSnapshot()
})
