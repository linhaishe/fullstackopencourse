# part4

# logger

The logger has two functions, info for printing normal log messages, and error for all error messages.

Extracting logging into its own module is a good idea in several ways. If we wanted to start writing logs to a file or send them to an external logging service like graylog or papertrail we would only have to make changes in one place.

# Test

 [unit tests](https://en.wikipedia.org/wiki/Unit_testing)

This kind of testing where multiple components of the system are being tested as a group is called [integration testing](https://en.wikipedia.org/wiki/Integration_testing).

The convention in Node is to define the execution mode of the application with the *NODE_ENV* environment variable. In our current application, we only load the environment variables defined in the *.env* file if the application is *not* in production mode.

It is common practice to define separate modes for development and testing.

```json
{
  // ...
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development node --watch index.js",
    "test": "NODE_ENV=test node --test",
    "lint": "eslint ."
  }
  // ...
}
```

There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the [cross-env](https://www.npmjs.com/package/cross-env) package

```js
{
  // can then achieve cross-platform compatibility by using the cross-env library in our npm scripts defined in package.json
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node --watch index.js",
    "test": "cross-env  NODE_ENV=test node --test",
    "lint": "eslint ."
  },
  // ...
}
```

use the [supertest](https://github.com/visionmedia/supertest) package to help us write our tests for testing the API.

```
// 单独跑某一个文件且log

node --experimental-vm-modules node_modules/.bin/jest --silent=false --verbose --runInBand tests/blog_api.test.js
```

