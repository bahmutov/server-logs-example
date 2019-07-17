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
      // first, let's see if the "console.log" includes a message we expect
      const consoleLogs = filter(messages, {
        type: 'console',
        namespace: 'log'
      })
      console.table(consoleLogs)
      expect(consoleLogs[0], 'GET log message').to.deep.include({
        type: 'console',
        namespace: 'log',
        message: 'GET /?a=2&b=3 pathname /'
      })

      const utilLogs = filter(messages, { type: 'util.debuglog' })
      console.table(utilLogs)
      const queryLog = find(utilLogs, m => /query is/.test(m.message))
      expect(queryLog)
        .property('message')
        .to.include("{ a: '2', b: '3' }")

      const debugLogs = filter(messages, {
        type: 'debug',
        namespace: 'compute'
      })
      console.table(debugLogs)
      expect(debugLogs).to.have.length(1)
      const debugLog = find(debugLogs, m => /2 \+ 3 = 5/.test(m.message))
      expect(debugLog, 'debug log')
        .to.be.an('object')
        .property('message')
        .to.include('2 + 3 = 5')

      // and each message should have a timestamp
    })
  })
})
