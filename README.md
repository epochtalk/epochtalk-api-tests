Tentative run scheme
====================

`npm test` runs all tests defined in [index.js](index.js) ordered by `require()`;

The tests are run by `mocha` (`node_modules/mocha/bin/mocha`).

Assumptions
-----------

The tests assume that the server starts off clean, with just an admin account
seeded.  Admin account should have password `password`

Structure
---------

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
