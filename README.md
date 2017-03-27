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

### [routes.js](routes.js)

Contains configurations for api routes.

### [methods.js](methods.js)

Exposes routes as Node functions.

### [utils.js](utils.js)

Contains convenience functions that use routes to do things, which are useful for
tests, but not necessarily accomplished by the exposed functions in `methods.js`.
