Tentative run scheme
====================


Configuration
-------------

```
cp example.env .env
```

.env
```
HOST=http://localhost:8080
```


Epochtalk configuration
-----------------------

.env
```
...

HOST=localhost
PORT=8080
PUBLIC_URL=http://localhost:8080

...

EMAILER_SENDER=e@ma.il
EMAILER_OPTIONS_HOST=localhost
EMAILER_OPTIONS_PORT=1025
EMAILER_OPTIONS_IGNORE_TLS=true
EMAILER_OPTIONS_SECURE=false

...

# Disable rate limiting for testing
RATE_LIMITING_GET_INTERVAL=-1
RATE_LIMITING_PUT_INTERVAL=-1
RATE_LIMITING_POST_INTERVAL=-1
RATE_LIMITING_DELETE_INTERVAL=-1
```


Running tests
-------------

`npm test`

Assumptions
-----------

The tests assume that the server starts off clean, with just an admin account
seeded.  Admin account should have password `password`

Structure
---------

The tests are run by `mocha` (`node_modules/mocha/bin/mocha`) and written using
[chakram](https://dareid.github.io/chakram/) methods and assertions.

### [index.js](index.js)

Specifies the tests to run, and the order in which to run them.

### [test/index.js](test/index.js)

Tests paths are defined here.  The top level index will use these paths to
require tests in a particular order.

### [methods.js](methods.js)

Exposes routes as Node functions by calling [chakram module methods](https://dareid.github.io/chakram/jsdoc/module-chakram.html)

(ie. `chakram.post` `chakram.get` ... etc.)

### [utils.js](utils.js)

Contains convenience functions that use methods to perform operations, which are
useful for tests, but not necessarily accomplished by the exposed functions in
`methods.js`.

Writing tests
-------------

This testing suite is set up with [yeoman's testing guidelines](http://yeoman.io/contributing/testing-guidelines.html)
in mind.

Generally speaking...

Expose the necessary api routes as Node functions in [methods.js](methods.js).
Tests go in the [test](test) directory and require `../methods.js` to call routes
as Node functions.  Tests also require `chakram` to do assertions.

Each `describe` test checks one behaviour, with any required setup done in a
`before` clause, then descriptions in `it` clauses, followed by cleanup in
`after` clauses.
