# Records Service

A simple service to retrieve records from a DB with filters

# Requirements

* `npm`
* `node` >= 14.17.0 (will likely work with older versions, but has never been
  tested)

# Installation

`npm install`

# Running

`npm start` will start the application at
[http://localhost:8080](http://localhost:8080) (set environment variable `PORT`
to change the port).

## Cases to execute with curl

```
curl --data '{
"startDate": "2016-01-26", "endDate": "2018-02-02", "minCount": 2800, "maxCount": 3000
}' -H "Content-Type: application/json" http://localhost:8080/records
```
# Testing

Tests can be run with `npm test`.

All tests are colocated with their respective source files in `*.spec.js` files,
using [Jest](https://facebook.github.io/jest/) with default settings.

# Resolution process

- Configure Node API basic config to interact with it as an RestFul API
- Configure model for Record with Mongoose
- Configure MongoDB connection with environment variables
- Create unit test for controller to ensure that the error controll is working fine
- Create service and controller
- Check that the test works fine, improve project configuration for logging and debugging capabilities
- Write documentation
- Deploy yo heroku