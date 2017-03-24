Tentative run scheme
====================

`npm test` runs all tests defined in [index.js](index.js) ordered by `require()`;

The tests are run by `mocha` (`node_modules/mocha/bin/mocha`).

[test/index.js](test/index.js)
-----------------------------

Tests paths are defined here.  The top level index will use these paths to
require tests in a particular order.
