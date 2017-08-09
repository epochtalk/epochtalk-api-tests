Manually running tests
======================

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

### Assumptions

The tests assume that the server starts off clean, with just an admin account
seeded.  Admin account should have password `password`

Example:

1. (Re)create the Postgres database

2. Run migrations

3. Start the epochtalk server to seed the admin role

4. Create admin user `{ username: 'admin', password: 'password', ... }`

5. Run tests
