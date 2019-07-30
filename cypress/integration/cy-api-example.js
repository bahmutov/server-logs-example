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

it('adds 2 + 3 and has logs', function () {
  cy.api({
    url: '/',
    qs: {
      a: 2,
      b: 3
    }
  }).then(({ body, messages }) => {
    expect(body).to.equal('5')
    console.table(messages)
  })
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

it('adds 2 + 3 + 10', () => {
  // we can pass query parameters through url too
  cy.api(
    {
      url: '/?a=2&b=3'
    },
    'first sum'
  )
    .its('body')
    .as('first sum') // save result in shared test context
    .then(function () {
      cy.api(
        {
          url: '/',
          qs: {
            // because we use "function () {...}"
            // callback form, "this" refers to the
            // shared test context where we saved
            // the first sum using ".as('first sum')" command
            // https://on.cypress.io/as
            a: this['first sum'],
            b: 10
          }
        },
        'second sum'
      )
    })
})

it('adds 2 + 3 + 10 with log check', () => {
  // we can pass query parameters through url too
  cy.api(
    {
      url: '/?a=2&b=3'
    },
    'first sum'
  )
    .its('body')
    .as('first sum') // save result in shared test context
    .then(function () {
      cy.api(
        {
          url: '/',
          qs: {
            a: this['first sum'],
            b: 10
          }
        },
        'second sum'
      ).then(({ body, messages }) => {
        console.log('answer', body)
        console.table(messages)
        expect(body, 'result').to.equal('15') // our api returns strings
        // use the Lodash "find" method to search by properties
        const computeLogMessage = Cypress._.find(messages, {
          type: 'debug',
          namespace: 'compute'
        })
        expect(computeLogMessage)
          .to.be.an('object')
          .and.have.property('message', '5 + 10 = 15')
      })
    })
})
