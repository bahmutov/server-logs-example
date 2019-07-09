const http = require('http')
const url = require('url')

http
  .createServer(function (req, res) {
    const { pathname, query } = url.parse(req.url, true)

    console.log(req.url)
    console.log('pathname', pathname)
    console.log('query', query)

    res.writeHead(200)
    res.write(String(parseFloat(query.a) + parseFloat(query.b)))
    res.end()
  })
  .listen(7000, () => {
    console.log('listening on port 7000')
  })
