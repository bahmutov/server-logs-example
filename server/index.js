const http = require('http')
const url = require('url')
// we will use console.log, util.debuglog and debug modules to log stuff
const verbose = require('util').debuglog('verbose')
const debug = require('debug')('compute')

// can return and reset collected logs
const logs = require('@bahmutov/all-logs/middleware/http')

http
  .createServer((req, res) => {
    if (logs(req, res) === true) {
      // the HTTP request was for the server logs
      return
    }

    const { pathname, query } = url.parse(req.url, true)

    // let's just log the basic request parameters
    console.log('%s %s pathname %s', req.method, req.url, pathname)
    // and log the parsed query object in verbose mode
    // visible when NODE_DEBUG=verbose is set
    verbose('query is %o', query)

    const a = parseFloat(query.a)
    const b = parseFloat(query.b)
    const sum = a + b
    // "debug" log only shows the computation if DEBUG=compute is set
    debug('%d + %d = %d', a, b, sum)

    res.writeHead(200)
    res.write(String(sum))
    res.end()
  })
  .listen(7000, () => {
    console.log('listening on port 7000')
  })
