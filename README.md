# server-logs-example [![renovate-app badge][renovate-badge]][renovate-app] [![CircleCI](https://circleci.com/gh/bahmutov/server-logs-example/tree/master.svg?style=svg&circle-token=b3c1a73d533c11e7f1cf3bf9bdcfd98518f929f1)](https://circleci.com/gh/bahmutov/server-logs-example/tree/master)
> API testing using Cypress.io test runner with server-side logs

Shows how to use [@bahmutov/cy-api](https://github.com/bahmutov/cy-api) plugin and its custom `cy.api` command to perform end-to-end API testing with full server logs.

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

![Cypress API test](images/logs.png)

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
