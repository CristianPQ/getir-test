const express = require("express");
const morgan = require("morgan");
const app = express();
const errorHandler = require("./lib/middleware/error-handler");
const recordsApp = require("./apps/records");

morgan.token("remote-addr", (req) => {
  if (req.headers && req.headers["X-Forwarded-For"])
    return req.headers["X-Forwarded-For"];
  if (req.headers && req.headers["x-forwarded-for"])
    return req.headers["x-forwarded-for"];
  if (req._remoteAddress) return req._remoteAddress;
  return "remote-addr";
});

app.use(morgan("combined"));

app.use("/records", recordsApp);

app.use(errorHandler());

module.exports = app;
