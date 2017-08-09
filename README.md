EpochTalk API Tests
===================

Testing on CircleCI
-------------------

Create a new branch on `epochtalk/epochtalk` and update the
`circleci-docker-compose.yml` images to use your branch's corresponding Quay
build.

**(Be sure to change the tags back when you merge with `master`.)**

ex:
```
...

epochtalk:
  image: quay.io/epochtalk/epochtalk:[your-branch]

...

epoch:
  image: quay.io/epochtalk/epoch:[your-branch]

...
```

Check [CircleCI](https://circleci.com/gh/epochtalk/epochtalk) for the
results when you push to your branch.


Testing locally (from this repo)
--------------------------------

These instructions explain how to use `docker` to test locally.

If you would like to test manually, check out the other README file:
[MANUAL_README.md](./MANUAL_README.md)

1. Use containers for the projects you are changing.

    **If you are only testing api test changes, skip this step!**

    If you are testing changes in any of the dependencies, build them with
    docker locally and specify the branch tag in `docker-compose.yml`.

    It may be useful to build the container and tag it with your branch name.

    ex1: (testing an epochtalk/epochtalk branch)

    /epochtalk/epochtalk
    ```bash
    docker build -t epochtalk:[your-branch] .
    ```

    /epochtalk/epochtalk-api-tests/docker-compose.yml
    ```yaml
    ...

    epochtalk:
      image: epochtalk:[your-branch]

    ...

    epochtalk_seed:
      image: epochtalk:[your-branch]

    ...
    ```

    ex2: (testing an epochtalk/epoch branch)

    /epochtalk/epoch
    ```bash
    docker build -t epoch:[your-branch] .
    ```

    /epochtalk/epochtalk-api-tests/docker-compose.yml
    ```yaml
    ...

    epoch:
      image: epoch:[your-branch]

    ...
    ```

2. Stop previous deployment

    Stop and remove the old containers if you have run them previously.

    ```
    docker-compose down
    ```

3. Build the `docker-compose` image for the api tests.

    ```
    docker-compose build
    ```

4. Run the tests by bringing up the `docker-compose` cluster.

    ```
    docker-compose up
    ```

    This will run the tests and output the results to the console.


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
