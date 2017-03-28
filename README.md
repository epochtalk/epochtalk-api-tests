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
