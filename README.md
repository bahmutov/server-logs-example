# server-logs-example
> API testing using Cypress.io test runner with server-side logs

## Server

Server in [server/index.js](server/index.js) adds numbers passed as query parameters.

```shell
npm start
```

From another terminal using curl or [httpie](https://httpie.org/)

```shell
$ http ':7000/?a=1&b=-10'
HTTP/1.1 200 OK
Connection: keep-alive
Date: Tue, 09 Jul 2019 01:37:13 GMT
Transfer-Encoding: chunked

-9
```
