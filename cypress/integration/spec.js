// loads definition for the custom "cy.api" command
// https://on.cypress.io/intelligent-code-completion
/// <reference types="@bahmutov/cy-api" />

// grab a couple Lodash methods
const { filter, find } = Cypress._

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
    ).then(({ body, messages }) => {
      // you also have 'status', 'statusText',
      // 'requestHeaders', 'headers', and 'duration'

      // we can check the value returned by the API
      expect(body, 'correct answer').to.equal('5')

      // and we can check different log messages
      const consoleLogs = filter(messages, { type: 'log' })
      console.table(consoleLogs)
      expect(consoleLogs, 'GET log message').to.deep.include({
        type: 'log',
        message: 'GET /?a=2&b=3 pathname /'
      })

      const utilLogs = filter(messages, { type: 'util.debuglog' })
      console.table(utilLogs)
      const queryLog = find(utilLogs, m => /query is/.test(m.message))
      expect(queryLog)
        .property('message')
        .to.include("{ a: '2', b: '3' }")

      const debugLogs = filter(messages, { type: 'debug' })
      console.table(debugLogs)
      expect(debugLogs).to.have.length(1)
      const debugLog = find(debugLogs, m =>
        /compute 2 \+ 3 = 5/.test(m.message)
      )
      expect(debugLog, 'debug log')
        .to.be.an('object')
        .property('message')
        .to.include('compute')
    })
  })
})
