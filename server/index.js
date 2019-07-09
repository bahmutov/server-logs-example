const http = require('http')
const url = require('url')
const verbose = require('util').debuglog('verbose')
const logs = require('@bahmutov/all-logs/middleware/http')

http
  .createServer((req, res) => {
    if (logs(req, res) === true) {
      return
    }

    const { pathname, query } = url.parse(req.url, true)

    console.log(req.url)
    console.log('pathname', pathname)
    verbose('query', query)

    res.writeHead(200)
    res.write(String(parseFloat(query.a) + parseFloat(query.b)))
    res.end()
  })
  .listen(7000, () => {
    console.log('listening on port 7000')
  })
